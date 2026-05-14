"""
Python LangChain RAG 智能客服系统
基于 FastAPI + LangChain + ChromaDB + DeepSeek
"""
import os
import shutil
from pathlib import Path
from typing import List, Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from rag_chain import RAGChain
from document_parser import DocumentParser

app = FastAPI(
    title="RAG 智能客服系统",
    description="基于 LangChain 的多格式文档问答系统",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag_system = None
upload_dir = Path("uploads")
upload_dir.mkdir(exist_ok=True)


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str
    sources: List[dict]


@app.on_event("startup")
async def startup_event():
    """应用启动时初始化 RAG 系统"""
    global rag_system
    try:
        rag_system = RAGChain()
        print("✅ RAG 系统初始化完成")
    except Exception as e:
        print(f"❌ RAG 系统初始化失败: {e}")
        raise


@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "RAG 智能客服系统 API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/api/health")
async def health_check():
    """健康检查"""
    if rag_system is None:
        raise HTTPException(status_code=503, detail="RAG 系统未初始化")

    stats = rag_system.get_stats()
    return {
        "status": "ok",
        "rag_system": "ready",
        **stats
    }


@app.post("/api/upload", response_model=dict)
async def upload_documents(files: List[UploadFile] = File(...)):
    """
    上传文档接口
    支持 .txt, .md, .docx, .pdf 格式
    """
    if rag_system is None:
        raise HTTPException(status_code=503, detail="RAG 系统未初始化")

    if not files:
        raise HTTPException(status_code=400, detail="请上传至少一个文件")

    supported_formats = DocumentParser.get_supported_formats()
    uploaded_count = 0
    error_files = []

    for file in files:
        try:
            # 检查文件格式
            ext = Path(file.filename).suffix.lower()
            if ext not in supported_formats:
                error_files.append(f"{file.filename} (不支持的格式)")
                continue

            # 保存文件
            file_path = upload_dir / file.filename
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)

            # 解析文档
            content = DocumentParser.parse(str(file_path))

            # 添加到知识库
            metadata = [{
                "source": file.filename,
                "type": ext[1:]
            }]
            rag_system.add_documents([content], metadata)

            uploaded_count += 1
            print(f"✅ 已处理: {file.filename}")

        except Exception as e:
            error_files.append(f"{file.filename} ({str(e)})")
            print(f"❌ 处理失败: {file.filename} - {e}")

    return {
        "success": True,
        "uploaded_count": uploaded_count,
        "total_files": len(files),
        "errors": error_files if error_files else None
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    问答接口
    根据已上传的文档回答问题
    """
    if rag_system is None:
        raise HTTPException(status_code=503, detail="RAG 系统未初始化")

    if not request.question.strip():
        raise HTTPException(status_code=400, detail="问题不能为空")

    result = rag_system.query(request.question)

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"]
    )


@app.delete("/api/knowledge-base")
async def clear_knowledge_base():
    """清空知识库"""
    if rag_system is None:
        raise HTTPException(status_code=503, detail="RAG 系统未初始化")

    rag_system.clear_knowledge_base()

    return {
        "success": True,
        "message": "知识库已清空"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

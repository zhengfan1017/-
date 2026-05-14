"""
LangChain RAG 核心模块
基于 LangChain 和 ChromaDB 实现的检索增强生成系统
"""
import os
import shutil
from pathlib import Path
from typing import List, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()


class RAGChain:
    """RAG 链管理器"""

    def __init__(self):
        self.embeddings = None
        self.vectorstore = None
        self.qa_chain = None
        self._initialized = False
        self._initializing = False

    def _ensure_initialized(self):
        """确保系统已初始化"""
        if self._initialized or self._initializing:
            return
        
        self._initializing = True
        try:
            print("正在初始化 LangChain RAG 系统...")

            # 使用 OpenAI Embeddings (通过 DeepSeek API)
            persist_directory = os.getenv("VECTOR_STORE_DIR", "./vector_store")
            self.embeddings = OpenAIEmbeddings(
                model="text-embedding-3-small",
                openai_api_key=os.getenv("OPENAI_API_KEY"),
                openai_api_base=os.getenv("OPENAI_API_BASE", "https://api.deepseek.com/v1")
            )
            
            # 初始化向量数据库
            self.vectorstore = Chroma(
                collection_name="knowledge_base",
                embedding_function=self.embeddings,
                persist_directory=persist_directory
            )
            
            # 初始化 LLM
            llm = ChatOpenAI(
                model=os.getenv("MODEL_NAME", "deepseek-chat"),
                openai_api_key=os.getenv("OPENAI_API_KEY"),
                openai_api_base=os.getenv("OPENAI_API_BASE", "https://api.deepseek.com/v1"),
                temperature=float(os.getenv("TEMPERATURE", 0.7))
            )

            # 自定义 Prompt
            prompt_template = """你是一个专业的客服助手。根据以下参考资料回答用户问题。

参考资料：
{context}

用户问题：{question}

请根据参考资料给出准确、专业的回答。如果参考资料中没有相关信息，请如实说明。"""

            PROMPT = PromptTemplate(
                template=prompt_template,
                input_variables=["context", "question"]
            )

            # 创建检索问答链
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=self.vectorstore.as_retriever(search_kwargs={"k": 3}),
                return_source_documents=True,
                chain_type_kwargs={"prompt": PROMPT}
            )

            self._initialized = True
            print("LangChain RAG 系统初始化完成！")

        except Exception as e:
            print(f"初始化错误: {e}")
            self._initializing = False
            raise

    def add_documents(self, texts: List[str], metadata: Optional[List[dict]] = None) -> int:
        """添加文档到向量数据库"""
        if not texts:
            return 0
        
        self._ensure_initialized()

        # 文本分割
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=int(os.getenv("CHUNK_SIZE", 500)),
            chunk_overlap=int(os.getenv("CHUNK_OVERLAP", 50)),
            length_function=len
        )

        # 创建文档对象
        docs = []
        for i, text in enumerate(texts):
            doc_metadata = metadata[i] if metadata and i < len(metadata) else {}
            docs.append(Document(page_content=text, metadata=doc_metadata))

        # 添加到向量库
        self.vectorstore.add_documents(docs)
        self.vectorstore.persist()

        print(f"已添加 {len(docs)} 个文档片段到知识库")
        return len(docs)

    def query(self, question: str) -> dict:
        """查询问答"""
        self._ensure_initialized()
        
        if not self.qa_chain:
            return {
                "answer": "系统未初始化，请稍后重试",
                "sources": []
            }

        try:
            # 执行查询
            result = self.qa_chain({"query": question})

            # 格式化来源文档
            sources = []
            if result.get("source_documents"):
                for doc in result["source_documents"]:
                    sources.append({
                        "content": doc.page_content[:200] + "..." if len(doc.page_content) > 200 else doc.page_content,
                        "metadata": doc.metadata
                    })

            return {
                "answer": result["result"],
                "sources": sources
            }

        except Exception as e:
            print(f"查询错误: {e}")
            return {
                "answer": f"查询出错: {str(e)}",
                "sources": []
            }

    def get_stats(self) -> dict:
        """获取知识库统计信息"""
        try:
            if not self.vectorstore:
                return {"total_documents": 0, "status": "not_initialized"}
            # 获取向量库中的文档数量
            count = self.vectorstore._collection.count()
            return {
                "total_documents": count,
                "status": "ok"
            }
        except Exception as e:
            return {
                "total_documents": 0,
                "status": f"error: {str(e)}"
            }

    def clear_knowledge_base(self):
        """清空知识库"""
        self._ensure_initialized()
        try:
            # 删除向量数据库存储目录
            persist_directory = os.getenv("VECTOR_STORE_DIR", "./vector_store")
            if os.path.exists(persist_directory):
                shutil.rmtree(persist_directory)
            
            # 重新初始化向量库
            self.vectorstore = Chroma(
                collection_name="knowledge_base",
                embedding_function=self.embeddings,
                persist_directory=persist_directory
            )
            print("知识库已清空")
        except Exception as e:
            print(f"清空知识库错误: {e}")

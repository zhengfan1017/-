# Python LangChain RAG 智能客服系统

基于 Python LangChain 的多格式文档问答系统，支持上传 Word、PDF、TXT、Markdown 等格式的文档，并基于文档内容进行智能问答。

## 技术栈

- **框架**: FastAPI + LangChain
- **向量数据库**: ChromaDB
- **LLM模型**: DeepSeek
- **文档解析**: PyPDF2, python-docx, markdown

## 功能特性

- ✅ 支持多种文档格式上传（.docx, .pdf, .txt, .md）
- ✅ 基于 LangChain 的 RAG 问答系统
- ✅ 使用 ChromaDB 向量数据库存储文档向量
- ✅ 集成 DeepSeek 大语言模型
- ✅ 提供 RESTful API 接口

## 安装依赖

```bash
cd backend_python
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或 venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

## 启动服务

```bash
python main.py
```

服务将在 http://localhost:8000 启动

## API 接口

### 健康检查
```bash
GET /api/health
```

### 上传文档
```bash
POST /api/upload
Content-Type: multipart/form-data

支持的格式: .txt, .md, .docx, .pdf
```

### 问答
```bash
POST /api/chat
Content-Type: application/json

{
  "question": "你们的服务时间是什么？"
}
```

### 清空知识库
```bash
DELETE /api/knowledge-base
```

## 环境变量配置

在 `.env` 文件中配置：

```
OPENAI_API_KEY=your_api_key
OPENAI_API_BASE=https://api.deepseek.com/v1
MODEL_NAME=deepseek-chat
EMBEDDING_MODEL=text-embedding-3-small
TEMPERATURE=0.7
CHUNK_SIZE=500
CHUNK_OVERLAP=50
```

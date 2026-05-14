"""
LangChain RAG 核心模块
基于 LangChain 和简单文本检索实现的问答系统
"""
import os
import shutil
from pathlib import Path
from typing import List, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from langchain_core.documents import Document
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import json

load_dotenv()


class SimpleVectorStore:
    """简单的向量存储实现，使用 TF-IDF 相似性匹配"""
    
    def __init__(self, persist_directory: str = "./vector_store"):
        self.persist_directory = persist_directory
        self.documents = []
        self.metadata = []
        self._load_from_disk()
    
    def _load_from_disk(self):
        """从磁盘加载数据"""
        try:
            os.makedirs(self.persist_directory, exist_ok=True)
            doc_file = os.path.join(self.persist_directory, "documents.json")
            if os.path.exists(doc_file):
                with open(doc_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.documents = data.get("documents", [])
                    self.metadata = data.get("metadata", [])
        except Exception as e:
            print(f"加载数据失败: {e}")
    
    def _save_to_disk(self):
        """保存到磁盘"""
        try:
            os.makedirs(self.persist_directory, exist_ok=True)
            doc_file = os.path.join(self.persist_directory, "documents.json")
            with open(doc_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "documents": self.documents,
                    "metadata": self.metadata
                }, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"保存数据失败: {e}")
    
    def add_documents(self, docs: List[Document]):
        """添加文档"""
        for doc in docs:
            self.documents.append(doc.page_content)
            self.metadata.append(doc.metadata)
        self._save_to_disk()
    
    def similarity_search(self, query: str, k: int = 3) -> List[Document]:
        """简单的相似度搜索"""
        if not self.documents:
            return []
        
        scores = []
        query_tokens = set(query.lower().split())
        
        for i, doc in enumerate(self.documents):
            doc_tokens = set(doc.lower().split())
            overlap = len(query_tokens & doc_tokens)
            if overlap > 0:
                scores.append((i, overlap / max(len(query_tokens), len(doc_tokens))))
        
        scores.sort(key=lambda x: -x[1])
        
        results = []
        for i, score in scores[:k]:
            if score > 0:
                results.append(Document(
                    page_content=self.documents[i],
                    metadata=self.metadata[i]
                ))
        
        return results
    
    def persist(self):
        """持久化"""
        self._save_to_disk()
    
    def count(self):
        """文档数量"""
        return len(self.documents)
    
    @property
    def _collection(self):
        """模拟 chromadb collection"""
        return self
    
    def as_retriever(self, search_kwargs=None):
        """返回检索器"""
        from langchain_core.retrievers import BaseRetriever
        
        class SimpleRetriever(BaseRetriever):
            vectorstore: object
            search_kwargs: dict
            
            def _get_relevant_documents(self, query):
                k = self.search_kwargs.get("k", 3)
                return self.vectorstore.similarity_search(query, k=k)
        
        return SimpleRetriever(vectorstore=self, search_kwargs=search_kwargs or {})


class RAGChain:
    """RAG 链管理器"""

    def __init__(self):
        self.vectorstore = None
        self.qa_chain = None
        self._initialized = False

    def _ensure_initialized(self):
        """确保系统已初始化"""
        if self._initialized:
            return
        
        try:
            print("正在初始化 LangChain RAG 系统...")

            persist_directory = os.getenv("VECTOR_STORE_DIR", "./vector_store")
            self.vectorstore = SimpleVectorStore(persist_directory=persist_directory)
            
            llm = ChatOpenAI(
                model=os.getenv("MODEL_NAME", "deepseek-chat"),
                openai_api_key=os.getenv("OPENAI_API_KEY"),
                openai_api_base=os.getenv("OPENAI_API_BASE", "https://api.deepseek.com/v1"),
                temperature=float(os.getenv("TEMPERATURE", 0.7))
            )

            prompt_template = """你是一个专业的客服助手。根据以下参考资料回答用户问题。

参考资料：
{context}

用户问题：{question}

请根据参考资料给出准确、专业的回答。如果参考资料中没有相关信息，请如实说明。"""

            PROMPT = PromptTemplate(
                template=prompt_template,
                input_variables=["context", "question"]
            )

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
            raise

    def add_documents(self, texts: List[str], metadata: Optional[List[dict]] = None) -> int:
        """添加文档到向量数据库"""
        if not texts:
            return 0
        
        self._ensure_initialized()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=int(os.getenv("CHUNK_SIZE", 500)),
            chunk_overlap=int(os.getenv("CHUNK_OVERLAP", 50)),
            length_function=len
        )

        docs = []
        for i, text in enumerate(texts):
            doc_metadata = metadata[i] if metadata and i < len(metadata) else {}
            docs.append(Document(page_content=text, metadata=doc_metadata))

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
            result = self.qa_chain({"query": question})

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
            count = self.vectorstore.count()
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
            persist_directory = os.getenv("VECTOR_STORE_DIR", "./vector_store")
            if os.path.exists(persist_directory):
                shutil.rmtree(persist_directory)
            self.vectorstore = SimpleVectorStore(persist_directory=persist_directory)
            print("知识库已清空")
        except Exception as e:
            print(f"清空知识库错误: {e}")

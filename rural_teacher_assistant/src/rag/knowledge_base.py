import os
import logging
from typing import List, Dict, Any, Optional
from chromadb import PersistentClient, Client
from chromadb.api.models.Collection import Collection
from chromadb.config import Settings

logger = logging.getLogger(__name__)

class KnowledgeBase:
    def __init__(self, persist_directory: str = "./data/chroma_db"):
        self.persist_directory = persist_directory
        os.makedirs(persist_directory, exist_ok=True)
        
        try:
            self.client = PersistentClient(
                path=persist_directory,
                settings=Settings(anonymized_telemetry=False)
            )
        except Exception as e:
            logger.warning(f"使用持久化 ChromaDB 失败，将使用内存模式: {e}")
            self.client = Client(Settings(anonymized_telemetry=False))
        
        self.collections: Dict[str, Collection] = {}
        self._init_default_collections()
    
    def _init_default_collections(self):
        default_collections = ["curriculum_standards", "teaching_cases", "exercise_bank"]
        for name in default_collections:
            try:
                self.collections[name] = self.client.get_or_create_collection(name=name)
            except Exception as e:
                logger.error(f"创建集合 {name} 失败: {e}")
    
    def add_documents(self, collection_name: str, documents: List[str], 
                     metadatas: Optional[List[Dict[str, Any]]] = None, 
                     ids: Optional[List[str]] = None) -> bool:
        try:
            collection = self._get_or_create_collection(collection_name)
            collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
            logger.info(f"成功添加 {len(documents)} 个文档到集合 {collection_name}")
            return True
        except Exception as e:
            logger.error(f"添加文档失败: {e}")
            return False
    
    def search(self, collection_name: str, query_texts: List[str], 
              n_results: int = 5) -> List[Dict[str, Any]]:
        try:
            collection = self._get_or_create_collection(collection_name)
            results = collection.query(
                query_texts=query_texts,
                n_results=n_results
            )
            return self._format_results(results)
        except Exception as e:
            logger.error(f"搜索文档失败: {e}")
            return []
    
    def _get_or_create_collection(self, name: str) -> Collection:
        if name not in self.collections:
            self.collections[name] = self.client.get_or_create_collection(name=name)
        return self.collections[name]
    
    def _format_results(self, results: Dict[str, Any]) -> List[Dict[str, Any]]:
        formatted = []
        for i in range(len(results['ids'][0])):
            item = {
                'id': results['ids'][0][i],
                'document': results['documents'][0][i],
                'metadata': results['metadatas'][0][i] if results['metadatas'] else None,
                'distance': results['distances'][0][i] if results['distances'] else None
            }
            formatted.append(item)
        return formatted
    
    def list_collections(self) -> List[str]:
        return [col.name for col in self.client.list_collections()]
    
    def clear_collection(self, collection_name: str) -> bool:
        try:
            self.client.delete_collection(collection_name)
            if collection_name in self.collections:
                del self.collections[collection_name]
            logger.info(f"已清空集合 {collection_name}")
            return True
        except Exception as e:
            logger.error(f"清空集合失败: {e}")
            return False

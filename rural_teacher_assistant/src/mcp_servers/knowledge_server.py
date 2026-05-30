import logging
from typing import List, Dict, Any, Optional
from ..rag.knowledge_base import KnowledgeBase

logger = logging.getLogger(__name__)

class KnowledgeServer:
    def __init__(self):
        self.kb = KnowledgeBase()
    
    def add_documents(self, collection_name: str, documents: List[str], 
                     metadatas: Optional[List[Dict[str, Any]]] = None) -> bool:
        return self.kb.add_documents(collection_name, documents, metadatas)
    
    def search(self, collection_name: str, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        return self.kb.search(collection_name, [query], n_results)
    
    def list_collections(self) -> List[str]:
        return self.kb.list_collections()
    
    def create_collection(self, name: str) -> bool:
        try:
            self.kb.client.get_or_create_collection(name)
            logger.info(f"集合 {name} 创建成功")
            return True
        except Exception as e:
            logger.error(f"创建集合失败: {e}")
            return False
    
    def add_sample_data(self):
        sample_standards = [
            "义务教育数学课程标准要求学生掌握基本运算能力",
            "语文课程注重培养学生的阅读和写作能力",
            "科学课程强调实践探究和科学思维"
        ]
        self.add_documents("curriculum_standards", sample_standards)
        
        sample_cases = [
            "通过农田灌溉的例子讲解比例关系",
            "利用农作物产量数据教授统计知识",
            "结合养殖场景讲解数学应用题"
        ]
        self.add_documents("teaching_cases", sample_cases)
        
        logger.info("示例数据添加完成")

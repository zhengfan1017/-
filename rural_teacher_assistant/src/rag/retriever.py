import logging
from typing import List, Dict, Any, Optional
from .knowledge_base import KnowledgeBase

logger = logging.getLogger(__name__)

class EnhancedRetriever:
    def __init__(self, knowledge_base: Optional[KnowledgeBase] = None):
        self.kb = knowledge_base or KnowledgeBase()
    
    def retrieve(self, query: str, collection_names: Optional[List[str]] = None, 
                n_results: int = 5) -> List[Dict[str, Any]]:
        if collection_names is None:
            collection_names = self.kb.list_collections()
        
        all_results = []
        
        for collection in collection_names:
            results = self.kb.search(collection, [query], n_results)
            for result in results:
                result['collection'] = collection
                all_results.append(result)
        
        all_results.sort(key=lambda x: x.get('distance', float('inf')))
        return all_results[:n_results]
    
    def retrieve_for_lesson_plan(self, subject: str, grade: str, chapter: str) -> List[Dict[str, Any]]:
        query = f"{subject} {grade} {chapter} 教案 教学设计"
        return self.retrieve(query, ["curriculum_standards", "teaching_cases"])
    
    def retrieve_for_explanation(self, knowledge_point: str, subject: str) -> List[Dict[str, Any]]:
        query = f"{subject} {knowledge_point} 知识点讲解 教学案例"
        return self.retrieve(query, ["teaching_cases", "curriculum_standards"])
    
    def build_context(self, results: List[Dict[str, Any]]) -> str:
        if not results:
            return ""
        
        context_parts = []
        for i, result in enumerate(results, 1):
            context_parts.append(f"[资料 {i}] {result['document']}")
        
        return "\n\n".join(context_parts)

import logging
from typing import Dict, Any, List
from .base_agent import BaseAgent

logger = logging.getLogger(__name__)

class ResourceCollectorAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="资源搜集员",
            role="教学资源搜集和推荐专家",
            system_prompt="""你是一位专业的教学资源专家，擅长搜集和推荐各类教学资源，包括教案、课件、习题、视频素材等。
请提供贴合乡村教育实际的资源建议。
"""
        )
    
    def collect_resources(self, subject: str, grade: str, chapter: str, resource_types: List[str]) -> str:
        prompt = f"""请为{grade}{subject}的《{chapter}》搜集教学资源。

需要的资源类型：{', '.join(resource_types)}

请提供：
1. 推荐的教学资源列表
2. 资源获取建议（考虑乡村地区的网络条件）
3. 本地化资源开发建议（如何利用当地资源）
4. 多媒体素材建议
"""
        
        return self._call_llm(prompt)
    
    def search_resources(self, query: str) -> str:
        results = self.retriever.retrieve(query)
        context = self.retriever.build_context(results)
        
        prompt = f"""根据搜索查询"{query}"，整理和推荐相关教学资源。

已检索到的资料：
{context}

请提供：
1. 相关资源概述
2. 资源使用建议
3. 延伸学习建议
"""
        
        return self._call_llm(prompt)
    
    def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        task_type = task.get("type", "collect")
        
        if task_type == "search":
            query = task.get("query", "")
            logger.info(f"资源搜集员 Agent 正在搜索资源: {query}")
            result = self.search_resources(query)
        else:
            subject = task.get("subject", "")
            grade = task.get("grade", "")
            chapter = task.get("chapter", "")
            resource_types = task.get("resource_types", ["教案", "课件", "习题"])
            logger.info(f"资源搜集员 Agent 正在搜集资源: {subject} {grade} {chapter}")
            result = self.collect_resources(subject, grade, chapter, resource_types)
        
        return {
            "agent": self.name,
            "task": task,
            "result": result,
            "type": "resources"
        }

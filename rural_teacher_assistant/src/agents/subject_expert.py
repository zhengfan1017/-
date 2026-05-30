import logging
from typing import Dict, Any
from .base_agent import BaseAgent

logger = logging.getLogger(__name__)

class SubjectExpertAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="学科专家",
            role="资深学科教师和教学顾问",
            system_prompt="""你是一位资深的学科专家，擅长从多角度讲解知识点，提供生活化案例，并分析常见错误。
请重点提供贴合乡村生活的实际案例，帮助乡村学生更好地理解知识。
"""
        )
    
    def explain_knowledge_point(self, knowledge_point: str, subject: str, grade: str) -> str:
        retrieved = self.retriever.retrieve_for_explanation(knowledge_point, subject)
        context = self.retriever.build_context(retrieved)
        
        prompt = f"""请为{grade}{subject}的知识点《{knowledge_point}》提供详细讲解。

参考资料：
{context}

请包含以下内容：
1. 多角度讲解策略（直观演示、类比、探究、应用等）
2. 乡村生活化案例（5个以上，结合农田、养殖、农具、农村生活等）
3. 常见错误分析（错误类型、原因、纠正策略）
"""
        
        return self._call_llm(prompt)
    
    def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        knowledge_point = task.get("knowledge_point", "")
        subject = task.get("subject", "")
        grade = task.get("grade", "")
        
        logger.info(f"学科专家 Agent 正在讲解知识点: {subject} {knowledge_point}")
        
        explanation = self.explain_knowledge_point(knowledge_point, subject, grade)
        
        return {
            "agent": self.name,
            "task": task,
            "result": explanation,
            "type": "explanation"
        }

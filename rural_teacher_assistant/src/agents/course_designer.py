import logging
from typing import Dict, Any
from .base_agent import BaseAgent

logger = logging.getLogger(__name__)

class CourseDesignerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="课程设计师",
            role="专业的课程设计专家",
            system_prompt="""你是一位专业的课程设计专家，擅长根据学科、年级和章节设计完整的教案。
请提供包含教学目标、重难点、教学过程、板书设计等完整结构的教案。
"""
        )
    
    def generate_lesson_plan(self, subject: str, grade: str, chapter: str, duration: int = 45) -> str:
        retrieved = self.retriever.retrieve_for_lesson_plan(subject, grade, chapter)
        context = self.retriever.build_context(retrieved)
        
        prompt = f"""请为{grade}{subject}的《{chapter}》设计一份{duration}分钟的教案。

参考资料：
{context}

请按照以下格式输出：
1. 教学目标（知识与技能、过程与方法、情感态度与价值观）
2. 教学重难点
3. 教学过程（分环节，包含时间分配）
4. 板书设计
5. 作业设计
"""
        
        return self._call_llm(prompt)
    
    def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        subject = task.get("subject", "")
        grade = task.get("grade", "")
        chapter = task.get("chapter", "")
        duration = task.get("duration", 45)
        
        logger.info(f"课程设计师 Agent 正在生成教案: {subject} {grade} {chapter}")
        
        lesson_plan = self.generate_lesson_plan(subject, grade, chapter, duration)
        
        return {
            "agent": self.name,
            "task": task,
            "result": lesson_plan,
            "type": "lesson_plan"
        }

import logging
from typing import Dict, Any
from .base_agent import BaseAgent

logger = logging.getLogger(__name__)

class HomeworkAnalystAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            name="作业分析师",
            role="专业的作业批改和学情分析专家",
            system_prompt="""你是一位专业的作业分析专家，擅长批改作业、分析错误类型、提供学情报告和改进建议。
"""
        )
    
    def grade_homework(self, homework_content: str, answer_key: str = "", subject: str = "", grade: str = "") -> str:
        prompt = f"""请批改以下{grade}{subject}作业：

作业内容：
{homework_content}

{'参考答案：' + answer_key if answer_key else ''}

请提供：
1. 整体评价
2. 详细错误分析（错误类型、原因、人数、改进建议）
3. 学情总结（优秀率、良好率、及格率、待提高）
4. 针对性教学建议
"""
        
        return self._call_llm(prompt)
    
    def analyze_learning_status(self, student_works: list) -> str:
        prompt = f"""请分析以下学生作业情况：

{str(student_works)}

请提供：
1. 班级整体学情分析
2. 薄弱知识点分析
3. 分层教学建议
4. 改进措施
"""
        
        return self._call_llm(prompt)
    
    def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        task_type = task.get("type", "grade")
        
        if task_type == "analyze":
            student_works = task.get("student_works", [])
            logger.info("作业分析师 Agent 正在进行学情分析")
            result = self.analyze_learning_status(student_works)
        else:
            homework_content = task.get("homework_content", "")
            answer_key = task.get("answer_key", "")
            subject = task.get("subject", "")
            grade = task.get("grade", "")
            logger.info(f"作业分析师 Agent 正在批改作业: {subject}")
            result = self.grade_homework(homework_content, answer_key, subject, grade)
        
        return {
            "agent": self.name,
            "task": task,
            "result": result,
            "type": "homework_analysis"
        }

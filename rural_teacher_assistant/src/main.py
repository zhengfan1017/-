import logging
from .llm.llm_manager import LLMManager
from .agents.course_designer import CourseDesignerAgent
from .agents.subject_expert import SubjectExpertAgent
from .agents.resource_collector import ResourceCollectorAgent
from .agents.homework_analyst import HomeworkAnalystAgent
from .workflow.workflow_engine import WorkflowEngine
from .mcp_servers.document_server import DocumentServer
from .mcp_servers.knowledge_server import KnowledgeServer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class RuralTeacherAssistant:
    def __init__(self):
        logger.info("初始化乡村教师智能教学助手...")
        
        self.llm_manager = LLMManager.get_instance()
        self.llm_manager.initialize()
        
        self.course_designer = CourseDesignerAgent()
        self.subject_expert = SubjectExpertAgent()
        self.resource_collector = ResourceCollectorAgent()
        self.homework_analyst = HomeworkAnalystAgent()
        
        self.workflow_engine = WorkflowEngine()
        self.document_server = DocumentServer()
        self.knowledge_server = KnowledgeServer()
        
        logger.info("初始化完成！")
    
    def generate_lesson_plan(self, subject: str, grade: str, chapter: str, duration: int = 45) -> str:
        logger.info(f"生成教案: {subject} {grade} {chapter}")
        task = {"subject": subject, "grade": grade, "chapter": chapter, "duration": duration}
        result = self.course_designer.run(task)
        return result['result']
    
    def explain_knowledge_point(self, knowledge_point: str, subject: str, grade: str) -> str:
        logger.info(f"讲解知识点: {subject} {knowledge_point}")
        task = {"knowledge_point": knowledge_point, "subject": subject, "grade": grade}
        result = self.subject_expert.run(task)
        return result['result']
    
    def grade_homework(self, homework_content: str, subject: str = "", grade: str = "", answer_key: str = "") -> str:
        logger.info("批改作业")
        task = {"homework_content": homework_content, "answer_key": answer_key, "subject": subject, "grade": grade}
        result = self.homework_analyst.run(task)
        return result['result']
    
    def execute_task(self, task_description: str) -> dict:
        logger.info(f"执行复杂任务: {task_description}")
        return self.workflow_engine.execute_workflow(task_description)
    
    def save_document(self, content: str, title: str, format: str = "md") -> str:
        return self.document_server.save_to_file(content, title, format)

_assistant = None

def get_assistant() -> RuralTeacherAssistant:
    global _assistant
    if _assistant is None:
        _assistant = RuralTeacherAssistant()
    return _assistant

if __name__ == "__main__":
    print("乡村教师智能教学助手 - 测试模式")
    print("=" * 50)
    
    assistant = get_assistant()
    
    print("\n1. 测试教案生成...")
    lesson_plan = assistant.generate_lesson_plan("数学", "七年级", "一元一次方程")
    print("教案生成成功！")
    print(lesson_plan[:500] + "..." if len(lesson_plan) > 500 else lesson_plan)
    
    print("\n2. 测试知识点讲解...")
    explanation = assistant.explain_knowledge_point("一元一次方程的解法", "数学", "七年级")
    print("讲解生成成功！")
    print(explanation[:500] + "..." if len(explanation) > 500 else explanation)
    
    print("\n3. 测试作业批改...")
    grading = assistant.grade_homework("1. 1+1=2\n2. 2+3=5", "数学", "七年级")
    print("批改成功！")
    print(grading[:500] + "..." if len(grading) > 500 else grading)
    
    print("\n4. 测试复杂任务执行...")
    result = assistant.execute_task("为七年级数学准备一元一次方程的教学方案")
    print("任务执行成功！")
    print(result['final_report'][:500] + "..." if len(result['final_report']) > 500 else result['final_report'])
    
    print("\n" + "=" * 50)
    print("测试完成！")

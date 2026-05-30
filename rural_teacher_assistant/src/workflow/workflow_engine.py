import logging
from typing import Dict, Any, List
from ..agents.course_designer import CourseDesignerAgent
from ..agents.subject_expert import SubjectExpertAgent
from ..agents.resource_collector import ResourceCollectorAgent
from ..agents.homework_analyst import HomeworkAnalystAgent
from ..llm.llm_manager import LLMManager

logger = logging.getLogger(__name__)

class WorkflowEngine:
    def __init__(self):
        self.agents = {
            "course_designer": CourseDesignerAgent(),
            "subject_expert": SubjectExpertAgent(),
            "resource_collector": ResourceCollectorAgent(),
            "homework_analyst": HomeworkAnalystAgent()
        }
        self.llm_manager = LLMManager.get_instance()
    
    def decompose_task(self, task_description: str) -> List[Dict[str, Any]]:
        prompt = f"""请分析以下教学任务，将其分解为可执行的子任务。

任务描述：{task_description}

请返回子任务列表，每个子任务包含：
- agent: 使用的 agent（可选值：course_designer, subject_expert, resource_collector, homework_analyst）
- description: 子任务描述
- params: 子任务参数（JSON 格式）

请以 JSON 格式返回。
"""
        
        mock_subtasks = [
            {
                "agent": "course_designer",
                "description": "生成教案",
                "params": {"subject": "数学", "grade": "七年级", "chapter": "一元一次方程", "duration": 45}
            },
            {
                "agent": "subject_expert",
                "description": "讲解重难点",
                "params": {"knowledge_point": "一元一次方程的解法", "subject": "数学", "grade": "七年级"}
            },
            {
                "agent": "resource_collector",
                "description": "搜集教学资源",
                "params": {"subject": "数学", "grade": "七年级", "chapter": "一元一次方程"}
            }
        ]
        
        return mock_subtasks
    
    def execute_subtask(self, subtask: Dict[str, Any]) -> Dict[str, Any]:
        agent_name = subtask.get("agent")
        agent = self.agents.get(agent_name)
        
        if agent:
            params = subtask.get("params", {})
            return agent.run(params)
        else:
            logger.error(f"未知的 agent: {agent_name}")
            return {"error": f"未知的 agent: {agent_name}"}
    
    def execute_workflow(self, task_description: str) -> Dict[str, Any]:
        logger.info(f"开始执行工作流: {task_description}")
        
        subtasks = self.decompose_task(task_description)
        results = []
        
        for subtask in subtasks:
            logger.info(f"执行子任务: {subtask.get('description')}")
            result = self.execute_subtask(subtask)
            results.append(result)
        
        final_report = self._aggregate_results(task_description, results)
        
        return {
            "task": task_description,
            "subtasks": subtasks,
            "results": results,
            "final_report": final_report
        }
    
    def _aggregate_results(self, task: str, results: List[Dict[str, Any]]) -> str:
        aggregated = "\n\n".join([f"## {r.get('agent', 'Unknown')}\n{r.get('result', '')}" for r in results])
        
        return f"""# 任务执行报告

## 任务描述
{task}

## 执行结果
{aggregated}
"""

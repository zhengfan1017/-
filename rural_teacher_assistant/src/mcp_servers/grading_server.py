import logging
from typing import Dict, Any, List
from ..llm.llm_manager import LLMManager

logger = logging.getLogger(__name__)

class GradingServer:
    def __init__(self):
        self.llm_manager = LLMManager.get_instance()
    
    def grade_homework(self, homework_content: str, answer_key: str = "", subject: str = "", grade: str = "") -> Dict[str, Any]:
        prompt = f"""请批改以下{grade}{subject}作业：

作业内容：
{homework_content}

{'参考答案：' + answer_key if answer_key else ''}

请以 JSON 格式返回，包含以下字段：
- overall_score: 总分或等级
- overall_evaluation: 整体评价
- error_analysis: 错误分析列表（列表）
- learning_status: 学情总结
- suggestions: 教学建议
"""
        
        try:
            result = self.llm_manager.chat(prompt)
            
            return {
                "success": True,
                "content": result
            }
        except Exception as e:
            logger.error(f"作业批改失败: {e}")
            return {
                "success": False,
                "error": str(e)
            }
    
    def batch_grade(self, homeworks: List[Dict[str, str]], subject: str = "", grade: str = "") -> List[Dict[str, Any]]:
        results = []
        for hw in homeworks:
            result = self.grade_homework(
                hw.get("content", ""),
                hw.get("answer_key", ""),
                subject,
                grade
            )
            results.append(result)
        return results
    
    def generate_report(self, grading_results: List[Dict[str, Any]]) -> str:
        prompt = f"""根据以下批改结果生成班级学情报告：

{str(grading_results)}

请提供：
1. 班级整体情况
2. 知识点掌握情况分析
3. 优秀/良好/及格/待提高比例
4. 改进建议
"""
        return self.llm_manager.chat(prompt)

import json
import re
from typing import Dict, List, Any
from llm_setup import get_deepseek_llm, get_quiz_generation_prompt

class QuizEngine:
    """碳纤维复合材料出题引擎"""
    
    def __init__(self):
        self.llm = get_deepseek_llm()
        self.questions = []
        self.user_answers = {}
    
    def generate_quiz(self) -> bool:
        """生成10道选择题"""
        try:
            print("\n正在生成题目，请稍候...")
            prompt = get_quiz_generation_prompt()
            response = self.llm.invoke(prompt)
            
            content = response.content if hasattr(response, 'content') else str(response)
            json_match = re.search(r'\{[\s\S]*"questions"[\s\S]*\}', content)
            
            if json_match:
                json_str = json_match.group()
                quiz_data = json.loads(json_str)
                self.questions = quiz_data.get('questions', [])
                return True
            else:
                print("解析题目失败，请重试。")
                return False
                
        except Exception as e:
            print(f"生成题目时出错: {str(e)}")
            return False
    
    def display_question(self, question_num: int):
        """显示题目"""
        if question_num >= len(self.questions):
            return
        
        q = self.questions[question_num]
        print(f"\n{'='*60}")
        print(f"第 {question_num + 1} 题")
        print(f"{'='*60}")
        print(q['question'])
        print()
        for key, value in q['options'].items():
            print(f"  {key}. {value}")
    
    def get_user_answer(self, question_num: int) -> str:
        """获取用户答案"""
        while True:
            answer = input("\n请输入你的答案 (A/B/C/D，输入q退出): ").upper().strip()
            if answer in ['A', 'B', 'C', 'D']:
                self.user_answers[question_num] = answer
                return answer
            elif answer == 'Q':
                return 'Q'
            else:
                print("无效输入，请输入 A、B、C 或 D")
    
    def grade_quiz(self) -> Dict[str, Any]:
        """评分并返回结果"""
        if not self.questions:
            return {"error": "没有题目可评分"}
        
        correct_count = 0
        wrong_count = 0
        results = []
        
        for i, question in enumerate(self.questions):
            user_answer = self.user_answers.get(i, None)
            correct_answer = question['correct_answer']
            
            is_correct = user_answer == correct_answer if user_answer else False
            
            if is_correct:
                correct_count += 1
            elif user_answer:
                wrong_count += 1
            
            result = {
                "number": i + 1,
                "question": question['question'],
                "your_answer": user_answer if user_answer else "未作答",
                "correct_answer": correct_answer,
                "is_correct": is_correct,
                "explanation": question['explanation']
            }
            results.append(result)
        
        score = (correct_count / len(self.questions)) * 100
        
        return {
            "total_questions": len(self.questions),
            "correct_count": correct_count,
            "wrong_count": wrong_count,
            "not_answered": len(self.questions) - len(self.user_answers),
            "score": score,
            "results": results
        }
    
    def display_results(self, results: Dict[str, Any]):
        """显示评分结果"""
        print("\n" + "="*60)
        print("测验结果")
        print("="*60)
        print(f"总题数: {results['total_questions']}")
        print(f"正确: {results['correct_count']}")
        print(f"错误: {results['wrong_count']}")
        print(f"未作答: {results['not_answered']}")
        print(f"\n得分: {results['score']:.1f} 分")
        print("="*60)
        
        if results['score'] >= 90:
            print("🌟 优秀！对碳纤维复合材料知识掌握得非常扎实！")
        elif results['score'] >= 70:
            print("👍 良好！继续加油！")
        elif results['score'] >= 60:
            print("💪 及格！还需要多加学习。")
        else:
            print("📚 建议加强学习碳纤维复合材料的相关知识。")
        
        print("\n详细答案解析：")
        print("-"*60)
        
        for result in results['results']:
            status = "✓" if result['is_correct'] else "✗"
            print(f"\n{result['number']}. {status} {result['question']}")
            print(f"   你的答案: {result['your_answer']}")
            if not result['is_correct']:
                print(f"   正确答案: {result['correct_answer']}")
            print(f"   解析: {result['explanation']}")
    
    def run_quiz(self):
        """运行测验流程"""
        if not self.generate_quiz():
            return
        
        print(f"\n成功生成 {len(self.questions)} 道选择题！")
        
        for i in range(len(self.questions)):
            self.display_question(i)
            answer = self.get_user_answer(i)
            if answer == 'Q':
                print("\n用户主动退出测验。")
                return
        
        results = self.grade_quiz()
        self.display_results(results)

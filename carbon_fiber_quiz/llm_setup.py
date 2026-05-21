from langchain_community.llms import OpenAI
from langchain_community.chat_models import ChatOpenAI
from config import DEEPSEEK_API_KEY, DEEPSEEK_API_BASE, MODEL_NAME

def get_deepseek_llm():
    """初始化DeepSeek LLM"""
    llm = ChatOpenAI(
        model=MODEL_NAME,
        api_key=DEEPSEEK_API_KEY,
        base_url=DEEPSEEK_API_BASE,
        temperature=0.7,
        max_tokens=2000
    )
    return llm

def get_quiz_generation_prompt():
    """获取生成题目的prompt模板"""
    prompt = """你是一个复合材料碳纤维领域的出题专家。请生成10道选择题，题目内容应该涵盖碳纤维复合材料的：
- 材料特性与结构
- 制备工艺与生产
- 应用领域
- 性能测试与表征
- 工程设计与计算

每道题必须包含：
1. 题目内容（清晰明确）
2. 4个选项（A、B、C、D）
3. 正确答案标注
4. 简要解析

请以JSON格式输出，格式如下：
{{
    "questions": [
        {{
            "number": 1,
            "question": "题目内容",
            "options": {{
                "A": "选项A内容",
                "B": "选项B内容",
                "C": "选项C内容",
                "D": "选项D内容"
            }},
            "correct_answer": "A",
            "explanation": "解析内容"
        }}
    ]
}}

请确保题目难度适中，既有基础概念题也有综合性应用题。"""
    return prompt

import os
import re
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "2a85c025526d427bb6fc55944777bc82")
DEEPSEEK_API_BASE = "https://api.deepseek.com"
MODEL_NAME = "deepseek-chat"

def generate_quiz_questions():
    """调用DeepSeek API生成题目"""
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
{
    "questions": [
        {
            "number": 1,
            "question": "题目内容",
            "options": {
                "A": "选项A内容",
                "B": "选项B内容",
                "C": "选项C内容",
                "D": "选项D内容"
            },
            "correct_answer": "A",
            "explanation": "解析内容"
        }
    ]
}

请确保题目难度适中，既有基础概念题也有综合性应用题。"""

    try:
        response = requests.post(
            f"{DEEPSEEK_API_BASE}/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
            },
            json={
                "model": MODEL_NAME,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 2000
            },
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            
            json_match = re.search(r'\{[\s\S]*"questions"[\s\S]*\}', content)
            if json_match:
                return json.loads(json_match.group())
            else:
                return {"error": "无法解析题目格式"}
        else:
            return {"error": f"API错误: {response.status_code}, {response.text}"}
            
    except Exception as e:
        return {"error": str(e)}

@app.route('/api/generate-quiz', methods=['POST', 'OPTIONS'])
def generate_quiz():
    """生成测验题目"""
    if request.method == 'OPTIONS':
        return '', 200
    
    result = generate_quiz_questions()
    
    if "error" in result:
        return jsonify(result), 500
    else:
        return jsonify(result)

@app.route('/health', methods=['GET'])
def health():
    """健康检查"""
    return jsonify({"status": "ok", "message": "API服务运行正常"})

if __name__ == '__main__':
    print("="*60)
    print("  碳纤维复合材料出题助手 - 后端服务")
    print("  API服务地址: http://localhost:5000")
    print("  DeepSeek API: 已配置")
    print("="*60)
    app.run(host='0.0.0.0', port=5000, debug=True)

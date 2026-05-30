import os
import logging
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv()

class VolcanoLLM:
    def __init__(self, api_key: Optional[str] = None, model: str = "doubao-pro-32k"):
        self.api_key = api_key or os.getenv("VOLC_ENGINE_API_KEY", "")
        self.model = model
        self.endpoint = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
        self.is_available = bool(self.api_key)
        
        if not self.is_available:
            logger.warning("未配置火山引擎 API key，将使用模拟模式")
    
    def chat(self, messages: List[Dict[str, str]], temperature: float = 0.7, max_tokens: int = 2000) -> str:
        if not self.is_available:
            return self._mock_response(messages[-1].get("content", ""))
        
        try:
            import requests
            
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }
            
            payload = {
                "model": self.model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens
            }
            
            response = requests.post(self.endpoint, json=payload, headers=headers, timeout=60)
            response.raise_for_status()
            result = response.json()
            
            return result["choices"][0]["message"]["content"]
            
        except Exception as e:
            logger.error(f"调用火山引擎 API 失败: {e}")
            return self._mock_response(messages[-1].get("content", ""))
    
    def _mock_response(self, prompt: str) -> str:
        if "教案" in prompt:
            return """# 教案示例

## 一、教学目标
### 知识与技能
1. 理解基本概念
2. 掌握解题方法

### 过程与方法
通过实例分析，培养学生的逻辑思维能力

### 情感态度与价值观
激发学习兴趣，培养科学精神

## 二、教学重难点
### 重点
核心概念的理解与应用

### 难点
复杂问题的分析与解决

## 三、教学过程
1. 导入新课（5分钟）
2. 新知讲解（20分钟）
3. 课堂练习（15分钟）
4. 小结与作业（5分钟）

## 四、板书设计
[板书内容]
"""
        elif "讲解" in prompt or "知识点" in prompt:
            return """## 知识点讲解

### 多角度讲解策略
1. **直观演示法**：通过实物或图片展示
2. **类比法**：用生活中的例子类比
3. **探究法**：引导学生自主探索
4. **应用法**：结合实际问题应用

### 乡村生活化案例
1. 案例一：农田灌溉中的应用
2. 案例二：农产品储存中的原理
3. 案例三：农具使用中的科学
4. 案例四：农村生活中的现象
5. 案例五：农业生产中的实践

### 常见错误分析
- **错误类型**：概念混淆
- **原因**：对相似概念区分不清
- **纠正策略**：对比讲解，加强练习
"""
        elif "作业" in prompt or "批改" in prompt:
            return """## 作业批改报告

### 整体评价
本次作业完成情况良好，大部分学生掌握了基本知识点。

### 错误分析
1. **错误类型**：计算错误
   - **人数**：5人
   - **原因**：粗心大意
   - **改进建议**：加强验算习惯

2. **错误类型**：概念理解错误
   - **人数**：3人
   - **原因**：对基本概念理解不深
   - **改进建议**：回归教材，加强概念辨析

### 学情总结
- 优秀率：40%
- 良好率：35%
- 及格率：20%
- 待提高：5%
"""
        else:
            return f"这是对您的问题的回复：{prompt}"

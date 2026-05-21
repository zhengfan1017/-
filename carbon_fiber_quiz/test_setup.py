#!/usr/bin/env python3
"""测试脚本 - 验证基本配置和导入"""

import sys
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
    
    print("✓ 环境配置加载成功")
    
    from config import DEEPSEEK_API_KEY, DEEPSEEK_API_BASE, MODEL_NAME
    print(f"✓ API配置: {MODEL_NAME}")
    print(f"✓ API Base: {DEEPSEEK_API_BASE}")
    print(f"✓ API Key: {DEEPSEEK_API_KEY[:10]}...")
    
    from llm_setup import get_deepseek_llm, get_quiz_generation_prompt
    print("✓ LangChain模块导入成功")
    
    from quiz_engine import QuizEngine
    print("✓ QuizEngine导入成功")
    
    print("\n所有模块测试通过！项目配置正确。")
    print("\n运行方式:")
    print("  cd /workspace/carbon_fiber_quiz")
    print("  python main.py")
    
except Exception as e:
    print(f"✗ 测试失败: {str(e)}")
    sys.exit(1)

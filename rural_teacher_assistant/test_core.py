#!/usr/bin/env python3
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

print("=" * 60)
print("🧪 乡村教师智能教学助手 - 核心功能测试")
print("=" * 60)
print()

print("1. 正在导入模块...")
from src import get_assistant
print("✅ 模块导入成功")
print()

print("2. 正在初始化助手...")
assistant = get_assistant()
print("✅ 助手初始化成功")
print()

print("3. 测试教案生成功能...")
print("   学科: 数学, 年级: 七年级, 课题: 一元一次方程")
result = assistant.generate_lesson_plan("数学", "七年级", "一元一次方程")
print("✅ 教案生成成功!")
print("   结果预览:", result[:200] + "..." if len(result) > 200 else result)
print()

print("4. 测试知识点讲解功能...")
result = assistant.explain_knowledge_point("一元一次方程的解法", "数学", "七年级")
print("✅ 知识点讲解成功!")
print()

print("5. 测试作业批改功能...")
result = assistant.grade_homework("1. 1+1=2\n2. 2+3=5", "数学", "一年级")
print("✅ 作业批改成功!")
print()

print("6. 测试资源搜集功能...")
result = assistant.collect_resources("语文", "三年级", "秋天的雨")
print("✅ 资源搜集成功!")
print()

print("7. 测试智能任务功能...")
result = assistant.execute_task("为七年级数学准备一元一次方程的完整教学方案")
print("✅ 智能任务执行成功!")
print()

print("=" * 60)
print("🎉 所有核心功能测试通过!")
print("=" * 60)
print()
print("你可以运行以下命令来使用不同的版本:")
print("  python cli_app.py          - 命令行交互式版本")
print("  streamlit run src/web/app.py  - Streamlit 图形界面版本 (需要浏览器支持)")
print()

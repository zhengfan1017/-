#!/usr/bin/env python3
"""
简单使用示例
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src import get_assistant

def main():
    print("=" * 60)
    print("乡村教师智能教学助手 - 简单示例")
    print("=" * 60)
    
    assistant = get_assistant()
    
    # 示例 1: 生成教案
    print("\n" + "=" * 60)
    print("示例 1: 生成教案")
    print("=" * 60)
    lesson_plan = assistant.generate_lesson_plan("数学", "七年级", "一元一次方程")
    print(lesson_plan)
    
    # 示例 2: 讲解知识点
    print("\n" + "=" * 60)
    print("示例 2: 讲解知识点")
    print("=" * 60)
    explanation = assistant.explain_knowledge_point("浮力原理", "物理", "八年级")
    print(explanation)
    
    # 示例 3: 批改作业
    print("\n" + "=" * 60)
    print("示例 3: 批改作业")
    print("=" * 60)
    homework = """
    1. 2 + 3 = 5
    2. 10 - 4 = 6
    3. 5 × 3 = 15
    """
    grading = assistant.grade_homework(homework, "数学", "三年级")
    print(grading)
    
    # 示例 4: 保存文档
    print("\n" + "=" * 60)
    print("示例 4: 复杂任务执行")
    print("=" * 60)
    result = assistant.execute_task("为七年级数学准备一元一次方程的教学方案")
    print(result['final_report'])
    
    print("\n" + "=" * 60)
    print("所有示例运行完成！")
    print("=" * 60)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from src import get_assistant

def print_banner():
    print("=" * 60)
    print("🏫 乡村教师智能教学助手 - 命令行版")
    print("=" * 60)
    print()

def print_menu():
    print("请选择功能:")
    print("  1. 教案生成")
    print("  2. 知识点讲解")
    print("  3. 作业批改")
    print("  4. 资源搜集")
    print("  5. 智能任务")
    print("  q. 退出")
    print()

def generate_lesson_plan(assistant):
    print("\n--- 📝 教案生成 ---")
    subject = input("学科 (例如: 数学): ").strip() or "数学"
    grade = input("年级 (例如: 七年级): ").strip() or "七年级"
    chapter = input("章节/课题 (例如: 一元一次方程): ").strip() or "一元一次方程"
    
    print("\n正在生成教案...")
    result = assistant.generate_lesson_plan(subject, grade, chapter)
    print("\n" + "=" * 60)
    print(result)
    print("=" * 60 + "\n")

def explain_knowledge(assistant):
    print("\n--- 🎯 知识点讲解 ---")
    knowledge = input("知识点 (例如: 浮力原理): ").strip() or "一元一次方程的解法"
    subject = input("学科 (例如: 物理): ").strip() or "数学"
    grade = input("年级 (例如: 八年级): ").strip() or "七年级"
    
    print("\n正在生成讲解...")
    result = assistant.explain_knowledge_point(knowledge, subject, grade)
    print("\n" + "=" * 60)
    print(result)
    print("=" * 60 + "\n")

def grade_homework(assistant):
    print("\n--- ✏️ 作业批改 ---")
    print("请输入作业内容 (按 Ctrl+D 或 Ctrl+Z 结束输入):")
    print("提示: 可以直接输入几行文本，比如:")
    print("  1. 1+1=2")
    print("  2. 2+3=5")
    print("输入完成后按 Enter 键两次...")
    
    lines = []
    try:
        while True:
            line = input()
            lines.append(line)
    except (EOFError, KeyboardInterrupt):
        pass
    
    homework = "\n".join(lines)
    if not homework.strip():
        homework = "1. 1+1=2\n2. 2+3=5"
        print("\n使用示例内容:", homework)
    
    subject = input("\n学科 (例如: 数学): ").strip() or "数学"
    grade = input("年级 (例如: 一年级): ").strip() or "一年级"
    
    print("\n正在批改作业...")
    result = assistant.grade_homework(homework, subject, grade)
    print("\n" + "=" * 60)
    print(result)
    print("=" * 60 + "\n")

def collect_resources(assistant):
    print("\n--- 📚 资源搜集 ---")
    subject = input("学科 (例如: 语文): ").strip() or "语文"
    grade = input("年级 (例如: 三年级): ").strip() or "三年级"
    chapter = input("章节 (例如: 秋天的雨): ").strip() or "一元一次方程"
    
    print("\n正在搜集资源...")
    result = assistant.collect_resources(subject, grade, chapter)
    print("\n" + "=" * 60)
    print(result)
    print("=" * 60 + "\n")

def intelligent_task(assistant):
    print("\n--- 🤖 智能任务 ---")
    task = input("请描述您的任务 (例如: 为七年级数学准备完整的教学方案): ").strip()
    if not task:
        task = "为七年级数学准备一元一次方程的完整教学方案"
    
    print("\n正在分析和执行任务...")
    result = assistant.execute_task(task)
    print("\n" + "=" * 60)
    print(result)
    print("=" * 60 + "\n")

def main():
    print_banner()
    
    print("正在初始化助手...")
    assistant = get_assistant()
    print("✅ 助手初始化成功!\n")
    
    while True:
        print_menu()
        choice = input("请输入选项 (1-5 或 q): ").strip().lower()
        
        if choice == "q":
            print("\n👋 再见!")
            break
        elif choice == "1":
            generate_lesson_plan(assistant)
        elif choice == "2":
            explain_knowledge(assistant)
        elif choice == "3":
            grade_homework(assistant)
        elif choice == "4":
            collect_resources(assistant)
        elif choice == "5":
            intelligent_task(assistant)
        else:
            print("❌ 无效选项，请重新选择!\n")

if __name__ == "__main__":
    main()

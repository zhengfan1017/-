#!/usr/bin/env python3
"""
复合材料碳纤维出题小助手
Carbon Fiber Composite Quiz Assistant
"""

from quiz_engine import QuizEngine

def display_welcome():
    """显示欢迎信息"""
    print("\n" + "="*60)
    print("        复合材料碳纤维知识测验系统")
    print("        Carbon Fiber Composite Quiz System")
    print("="*60)
    print("\n欢迎使用碳纤维复合材料出题小助手！")
    print("本系统将为你生成10道关于碳纤维复合材料的选择题，")
    print("涵盖材料特性、制备工艺、应用领域等多个方面。")
    print("\n按提示作答，系统将自动评分并给出详细解析。")
    print("输入 'q' 可以随时退出测验。")
    print("="*60)

def main():
    """主函数"""
    display_welcome()
    
    while True:
        print("\n请选择操作：")
        print("1. 开始新的测验")
        print("2. 退出系统")
        
        choice = input("\n请输入选项 (1/2): ").strip()
        
        if choice == '1':
            quiz = QuizEngine()
            quiz.run_quiz()
            
            print("\n" + "="*60)
            print("测验完成！")
            print("="*60)
            
            again = input("\n是否进行新一轮测验？(y/n): ").strip().lower()
            if again != 'y':
                print("\n感谢使用碳纤维复合材料知识测验系统！")
                print("祝你学习愉快！\n")
                break
                
        elif choice == '2':
            print("\n感谢使用，祝你学习愉快！\n")
            break
        else:
            print("\n无效选项，请输入 1 或 2")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n程序被用户中断，感谢使用！\n")
    except Exception as e:
        print(f"\n程序运行出错: {str(e)}")
        print("请检查网络连接和API配置。\n")

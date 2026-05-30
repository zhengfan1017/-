import streamlit as st
import sys
import os

# 确保正确的模块导入路径
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.dirname(current_dir)
project_root = os.path.dirname(src_dir)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

try:
    from src.agents.course_designer import CourseDesignerAgent
    from src.agents.subject_expert import SubjectExpertAgent
    from src.agents.resource_collector import ResourceCollectorAgent
    from src.agents.homework_analyst import HomeworkAnalystAgent
    from src.workflow.workflow_engine import WorkflowEngine
    from src.mcp_servers.document_server import DocumentServer
    from src.mcp_servers.ocr_server import OCRServer
    from src.mcp_servers.knowledge_server import KnowledgeServer
except ImportError as e:
    st.error(f"模块导入错误: {e}")
    st.info("请确保在项目根目录运行: streamlit run src/web/app.py")
    st.stop()

st.set_page_config(
    page_title="乡村教师智能教学助手",
    page_icon="📚",
    layout="wide"
)

st.title("📚 乡村教师智能教学助手")
st.markdown("---")

def init_services():
    if 'course_designer' not in st.session_state:
        st.session_state.course_designer = CourseDesignerAgent()
    if 'subject_expert' not in st.session_state:
        st.session_state.subject_expert = SubjectExpertAgent()
    if 'resource_collector' not in st.session_state:
        st.session_state.resource_collector = ResourceCollectorAgent()
    if 'homework_analyst' not in st.session_state:
        st.session_state.homework_analyst = HomeworkAnalystAgent()
    if 'workflow_engine' not in st.session_state:
        st.session_state.workflow_engine = WorkflowEngine()
    if 'document_server' not in st.session_state:
        st.session_state.document_server = DocumentServer()
    if 'ocr_server' not in st.session_state:
        st.session_state.ocr_server = OCRServer()
    if 'knowledge_server' not in st.session_state:
        st.session_state.knowledge_server = KnowledgeServer()

init_services()

page = st.sidebar.selectbox(
    "功能页面",
    ["🏠 首页", "📝 教案生成", "🎯 重难点讲解", "✏️ 作业批改", "📚 资源搜集", "🤖 智能任务"]
)

if page == "🏠 首页":
    st.header("欢迎使用乡村教师智能教学助手")
    st.markdown("""
    本系统为乡村教师提供以下智能功能：
    
    - 📝 **教案生成** - 一键生成完整教案
    - 🎯 **重难点讲解** - 多角度讲解配合乡村案例
    - ✏️ **作业批改** - 拍照上传自动批改
    - 📚 **资源搜集** - 智能推荐教学资源
    - 🤖 **智能任务** - 复杂任务自动拆解执行
    """)
    
    st.info("💡 提示：系统支持模拟模式运行，即使没有配置API也能体验完整流程！")

elif page == "📝 教案生成":
    st.header("教案生成")
    
    col1, col2 = st.columns(2)
    with col1:
        subject = st.selectbox("学科", ["语文", "数学", "英语", "科学", "历史", "地理"])
        grade = st.selectbox("年级", ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级"])
    with col2:
        chapter = st.text_input("章节/课题", "一元一次方程")
        duration = st.number_input("课时（分钟）", min_value=30, max_value=90, value=45)
    
    if st.button("生成教案", type="primary"):
        if chapter:
            with st.spinner("正在生成教案..."):
                task = {"subject": subject, "grade": grade, "chapter": chapter, "duration": duration}
                result = st.session_state.course_designer.run(task)
                st.session_state.last_lesson_plan = result['result']
                st.success("教案生成成功！")
                st.markdown(result['result'])
                
                col_dl1, col_dl2 = st.columns(2)
                with col_dl1:
                    if st.button("下载为 Word"):
                        filepath = st.session_state.document_server.generate_word(
                            result['result'], 
                            f"{grade}{subject}_{chapter}_教案"
                        )
                        if filepath:
                            st.success(f"文档已保存至: {filepath}")
                with col_dl2:
                    if st.button("下载为 Markdown"):
                        filepath = st.session_state.document_server.generate_markdown(
                            result['result'],
                            f"{grade}{subject}_{chapter}_教案"
                        )
                        if filepath:
                            st.success(f"文档已保存至: {filepath}")
        else:
            st.warning("请输入章节名称！")

elif page == "🎯 重难点讲解":
    st.header("重难点讲解")
    
    col1, col2 = st.columns(2)
    with col1:
        subject = st.selectbox("学科", ["语文", "数学", "英语", "科学", "历史", "地理"], key="subj_exp")
        grade = st.selectbox("年级", ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级"], key="grade_exp")
    with col2:
        knowledge_point = st.text_input("知识点", "一元一次方程的解法")
    
    if st.button("生成讲解", type="primary"):
        if knowledge_point:
            with st.spinner("正在生成讲解..."):
                task = {"knowledge_point": knowledge_point, "subject": subject, "grade": grade}
                result = st.session_state.subject_expert.run(task)
                st.success("讲解生成成功！")
                st.markdown(result['result'])
        else:
            st.warning("请输入知识点！")

elif page == "✏️ 作业批改":
    st.header("作业批改")
    
    option = st.radio("选择输入方式", ["上传图片", "手动输入"])
    
    if option == "上传图片":
        uploaded_file = st.file_uploader("上传作业图片", type=['png', 'jpg', 'jpeg'])
        if uploaded_file is not None:
            st.image(uploaded_file, caption="上传的作业", use_container_width=True)
            if st.button("开始识别并批改", type="primary"):
                with st.spinner("正在识别和批改..."):
                    # 使用模拟模式
                    text, confidence = "模拟识别到的作业内容\n1. 1+1=2\n2. 2+3=5", 0.85
                    st.info(f"识别置信度: {confidence:.2f}")
                    st.text_area("识别到的内容", text, height=200)
                    
                    task = {"homework_content": text, "subject": "数学", "grade": "七年级"}
                    result = st.session_state.homework_analyst.run(task)
                    st.success("批改完成！")
                    st.markdown(result['result'])
    else:
        subject = st.selectbox("学科", ["语文", "数学", "英语", "科学", "历史", "地理"], key="subj_hw")
        grade = st.selectbox("年级", ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级"], key="grade_hw")
        homework_content = st.text_area("输入作业内容", value="1. 1+1=2\n2. 2+3=5", height=200)
        answer_key = st.text_area("参考答案（可选）", height=100)
        
        if st.button("批改作业", type="primary"):
            if homework_content:
                with st.spinner("正在批改..."):
                    task = {"homework_content": homework_content, "answer_key": answer_key, "subject": subject, "grade": grade}
                    result = st.session_state.homework_analyst.run(task)
                    st.success("批改完成！")
                    st.markdown(result['result'])
            else:
                st.warning("请输入作业内容！")

elif page == "📚 资源搜集":
    st.header("资源搜集")
    
    search_mode = st.radio("搜索模式", ["按章节搜集", "关键词搜索"])
    
    if search_mode == "按章节搜集":
        col1, col2 = st.columns(2)
        with col1:
            subject = st.selectbox("学科", ["语文", "数学", "英语", "科学", "历史", "地理"], key="subj_res")
            grade = st.selectbox("年级", ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级"], key="grade_res")
        with col2:
            chapter = st.text_input("章节", "一元一次方程")
            resource_types = st.multiselect("资源类型", ["教案", "课件", "习题", "视频"], default=["教案", "课件", "习题"])
        
        if st.button("搜集资源", type="primary"):
            if chapter:
                with st.spinner("正在搜集资源..."):
                    task = {"subject": subject, "grade": grade, "chapter": chapter, "resource_types": resource_types}
                    result = st.session_state.resource_collector.run(task)
                    st.success("资源搜集完成！")
                    st.markdown(result['result'])
            else:
                st.warning("请输入章节名称！")
    else:
        query = st.text_input("搜索关键词", "教学资源")
        if st.button("搜索", type="primary"):
            if query:
                with st.spinner("正在搜索..."):
                    task = {"type": "search", "query": query}
                    result = st.session_state.resource_collector.run(task)
                    st.success("搜索完成！")
                    st.markdown(result['result'])
            else:
                st.warning("请输入搜索关键词！")

elif page == "🤖 智能任务":
    st.header("智能任务")
    
    task_description = st.text_area("描述您的任务", "为七年级数学准备一元一次方程的完整教学方案", height=150)
    
    if st.button("执行任务", type="primary"):
        if task_description:
            with st.spinner("正在分析和执行任务..."):
                result = st.session_state.workflow_engine.execute_workflow(task_description)
                st.success("任务执行完成！")
                
                st.subheader("任务分解")
                for i, subtask in enumerate(result['subtasks'], 1):
                    st.markdown(f"{i}. {subtask['agent']}: {subtask['description']}")
                
                st.subheader("执行结果")
                st.markdown(result['final_report'])
        else:
            st.warning("请输入任务描述！")

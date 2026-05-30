import streamlit as st

st.title("🧪 简单测试页面")
st.markdown("---")

st.header("基础功能测试")

col1, col2 = st.columns(2)

with col1:
    st.subheader("输入测试")
    name = st.text_input("请输入您的名字", "乡村教师")
    if name:
        st.success(f"你好，{name}！")

with col2:
    st.subheader("按钮测试")
    if st.button("点击测试"):
        st.balloons()
        st.info("✅ 按钮功能正常！")

st.markdown("---")

st.subheader("📊 数据显示测试")
data = {
    "功能": ["教案生成", "知识点讲解", "作业批改", "资源搜集"],
    "状态": ["✅ 正常", "✅ 正常", "✅ 正常", "✅ 正常"]
}
st.table(data)

st.markdown("---")

st.info("如果这个页面能正常显示，说明 Streamlit 环境完全正常！")

#!/bin/bash

echo "==================================="
echo "乡村教师智能教学助手"
echo "==================================="
echo ""

# 检查虚拟环境
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
source venv/bin/activate

# 安装依赖
echo "安装依赖..."
pip install -r requirements.txt

echo ""
echo "启动 Web 界面..."
echo "请在浏览器中访问: http://localhost:8501"
echo ""

streamlit run src/web/app.py

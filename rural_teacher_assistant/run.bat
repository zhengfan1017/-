@echo off
echo ===================================
echo 乡村教师智能教学助手
echo ===================================
echo.

REM 检查虚拟环境
if not exist "venv" (
    echo 创建虚拟环境...
    python -m venv venv
)

REM 激活虚拟环境
call venv\Scripts\activate.bat

REM 安装依赖
echo 安装依赖...
pip install -r requirements.txt

echo.
echo 启动 Web 界面...
echo 请在浏览器中访问: http://localhost:8501
echo.

streamlit run src/web/app.py

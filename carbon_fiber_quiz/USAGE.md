# 碳纤维复合材料出题小助手使用说明

## 项目结构
```
carbon_fiber_quiz/
├── config.py          # 配置文件（API密钥等）
├── llm_setup.py       # LangChain和DeepSeek集成
├── quiz_engine.py     # 出题和评分引擎
├── main.py           # 主程序入口
├── requirements.txt  # Python依赖
├── .env              # 环境变量
└── test_setup.py     # 测试脚本
```

## 快速开始

### 1. 安装依赖
```bash
cd /workspace/carbon_fiber_quiz
pip install -r requirements.txt
```

### 2. 配置API密钥
API密钥已配置在 `.env` 文件中：
```
DEEPSEEK_API_KEY=2a85c025526d427bb6fc55944777bc82
```

### 3. 运行程序
```bash
python main.py
```

## 功能特点

1. **智能出题**: 使用LangChain + DeepSeek API自动生成10道选择题
2. **内容全面**: 涵盖碳纤维复合材料的材料特性、制备工艺、应用领域等
3. **自动评分**: 答题结束后自动计算得分
4. **详细解析**: 每道题都提供正确答案和详细解析
5. **交互友好**: 支持随时退出，可多次练习

## 使用流程

1. 运行程序后显示欢迎信息
2. 输入 `1` 开始测验
3. 系统自动生成10道选择题
4. 依次作答（A/B/C/D），输入 `q` 可提前退出
5. 全部作答后显示评分结果和详细解析
6. 可选择继续新一轮测验或退出

## 技术架构

- **框架**: LangChain (Python版)
- **AI模型**: DeepSeek Chat API
- **输出格式**: JSON（便于解析和评分）
- **交互方式**: 命令行界面（CLI）

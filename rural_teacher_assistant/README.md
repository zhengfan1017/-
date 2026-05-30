# 乡村教师智能教学助手

一个专为乡村教师设计的 AI 教学辅助系统，帮助减轻教学负担，提升教学质量。

## 功能特点

- 📝 **教案生成**：一键生成完整教案，包含教学目标、重难点、教学过程等
- 🎯 **重难点讲解**：多角度讲解配合乡村生活化案例
- ✏️ **作业批改**：支持图片上传 OCR 识别，自动批改和学情分析
- 📚 **资源搜集**：智能推荐教学资源
- 🤖 **智能任务**：复杂任务自动拆解，多 Agent 协同执行

## 快速开始

### 安装依赖

```bash
pip install -r requirements.txt
```

### 运行 Web 界面

#### Linux/Mac:
```bash
chmod +x run.sh
./run.sh
```

#### Windows:
```cmd
run.bat
```

或直接运行：
```bash
streamlit run src/web/app.py
```

### 使用 Python 调用

```python
from src import get_assistant

assistant = get_assistant()

# 生成教案
lesson_plan = assistant.generate_lesson_plan("数学", "七年级", "一元一次方程")

# 讲解知识点
explanation = assistant.explain_knowledge_point("浮力原理", "物理", "八年级")

# 批改作业
grading = assistant.grade_homework("作业内容...", "数学", "七年级")

# 执行复杂任务
result = assistant.execute_task("为七年级数学准备完整的教学方案")
```

## 配置

### 火山引擎 API（可选）

创建 `.env` 文件：

```
VOLC_ENGINE_API_KEY=your_api_key_here
```

配置后可以使用真实的 LLM，否则系统会使用模拟模式运行。

## 项目结构

```
rural_teacher_assistant/
├── src/
│   ├── llm/              # LLM 接口层
│   ├── rag/              # RAG 知识库
│   ├── agents/           # 智能 Agent
│   ├── workflow/         # 工作流引擎
│   ├── mcp_servers/      # MCP 服务
│   ├── web/              # Web 界面
│   └── main.py           # 主入口
├── tests/                # 测试
├── examples/             # 示例
├── docs/                 # 文档
├── requirements.txt      # 依赖
└── README.md            # 说明文档
```

## 技术栈

- Python 3.9+
- Streamlit (Web UI)
- LangChain (Agent 框架)
- ChromaDB (向量数据库)
- PaddleOCR (文字识别)
- python-docx (文档生成)

## 注意事项

- 系统支持在无网络环境下使用模拟模式
- OCR 功能需要下载 PaddleOCR 模型（首次使用时）
- 建议使用虚拟环境运行项目

## 许可证

MIT License

# 碳纤维复合材料出题助手 - 网页版

基于 React + Flask + DeepSeek AI 的在线测验系统

## 🚀 快速启动

### 1. 启动后端服务（Flask）

```bash
cd /workspace/api
pip install -r requirements.txt
python app.py
```

后端服务运行在：http://localhost:5000

### 2. 启动前端服务（React）

```bash
cd /workspace
npm install
npm run dev
```

前端服务运行在：http://localhost:5173

### 3. 访问应用

打开浏览器访问：http://localhost:5173

## ✨ 功能特点

1. **智能出题**：使用 DeepSeek AI 自动生成10道碳纤维复合材料选择题
2. **内容全面**：涵盖材料特性、制备工艺、应用领域、性能测试等多个方面
3. **自动评分**：答题结束后自动计算得分（百分制）
4. **详细解析**：每道题都提供正确答案和详细解析
5. **科技风格**：深色主题，现代UI设计，流畅动画效果

## 📱 使用流程

1. 打开首页，点击"开始测验"按钮
2. AI 自动生成10道选择题
3. 依次选择答案（A/B/C/D）
4. 最后一题点击"提交测验"
5. 查看得分和详细解析
6. 可选择"重新测验"继续练习

## 🛠 技术栈

- **前端**：React 18 + TypeScript + Tailwind CSS + Vite
- **后端**：Flask (Python) + flask-cors
- **AI**：DeepSeek Chat API
- **状态管理**：Zustand
- **路由**：React Router DOM v6

## 📂 项目结构

```
/workspace/
├── src/                    # React前端源码
│   ├── pages/              # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── Quiz.tsx        # 测验页
│   │   └── Result.tsx      # 结果页
│   ├── hooks/              # 自定义Hooks
│   │   └── useQuizStore.ts # 状态管理
│   ├── services/           # API服务
│   │   └── api.ts          # 后端API调用
│   ├── types/              # TypeScript类型定义
│   │   └── index.ts        # 类型导出
│   ├── App.tsx             # 主应用
│   └── main.tsx            # 入口文件
├── api/                    # Flask后端
│   ├── app.py              # Flask应用
│   ├── requirements.txt    # Python依赖
│   └── .env                # 环境变量
└── package.json            # npm依赖
```

## ⚙️ 配置说明

API密钥已配置在 `/workspace/api/.env` 文件中：

```
DEEPSEEK_API_KEY=2a85c025526d427bb6fc55944777bc82
```

如需更换API密钥，请编辑该文件。

## 🎨 界面预览

- **首页**：深色科技风格，展示系统名称和开始按钮
- **测验页**：卡片式布局，显示题目、选项、进度条
- **结果页**：显示得分、正确/错误统计、可展开的详细解析

## 🔧 开发说明

- 前端热更新已启用，修改代码会自动刷新
- 后端开启debug模式，支持热重载
- 跨域已配置，前端可以直接调用后端API

## 📝 注意事项

1. 确保网络连接正常，以便调用 DeepSeek API
2. 首次加载可能需要等待3-5秒生成题目
3. 每次测验都会生成新的题目组合

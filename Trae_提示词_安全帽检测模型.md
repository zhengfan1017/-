---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: eab8a989cd723cdfe56fa085b6d851d2
    PropagateID: eab8a989cd723cdfe56fa085b6d851d2
    ReservedCode1: 3044022039d1ee6b7bc83a17f6740c5a5d732360d9414ed38d52d39f556af1d02324b5620220742f1b9ba25d4f3c1c4a6536b3d0858e60810a6056a7ceb468b36ec790595ff6
    ReservedCode2: 304502204473ebb591b142f4095d60e261b9c72fe9d749c69955672760d18d208ccdb909022100a7f64d7d3d1c411ce192296c41c2474276b78855322069b3155a3a6e498a2d7f
---

# Trae AI 编程助手提示词

## 安全帽检测模型 Paddle Inference 推理程序

---

请帮我编写一个基于 **Paddle Inference** 的安全帽检测模型推理程序，具体要求如下：

---

## 📋 模型配置信息

### 模型文件路径（在云端IDE本地目录中）

```
/path/to/your/model/          ← 请替换为你在云端IDE的实际模型路径
├── model.pdmodel           # 网络结构文件
├── model.pdiparams         # 模型权重文件
└── infer_cfg.yml           # 推理配置文件
```

### 模型参数

| 参数 | 值 |
|------|-----|
| 模型架构 | YOLOv3 |
| 输入尺寸 | 608 x 608 |
| 类别数量 | 2 类 |
| 类别列表 | `person`（人）、`hat`（帽子） |

### 预处理参数

| 参数 | 值 |
|------|-----|
| 归一化均值 | [0.485, 0.456, 0.406] |
| 归一化标准差 | [0.229, 0.224, 0.225] |
| 图像缩放 | is_scale: true |
| 保持长宽比 | false |

### 模型输入输出节点

**输入节点（3个）：**

- `im_shape` - 图像尺寸
- `image` - 输入图像
- `scale_factor` - 缩放因子

**输出节点（2个）：**

- `multiclass_nms3_1969.tmp_0` - 检测框坐标
- `multiclass_nms3_1969.tmp_2` - 检测框置信度和类别

---

## 🎯 程序功能要求

1. **加载模型**：使用 Paddle Inference 加载模型文件
2. **图像预处理**：读取图片 → Resize(608x608) → 归一化 → 转换格式
3. **推理预测**：输入预处理后的图像，获取检测结果
4. **结果解析**：解析输出节点，提取检测框、置信度和类别
5. **可视化**：在原图上绘制检测框和类别标签
6. **支持功能**：
   - 单张图片推理
   - 批量图片推理（文件夹）
   - 实时摄像头推理（可选）

---

## 💻 环境要求

| 项目 | 版本/要求 |
|------|----------|
| 编程语言 | Python 3.10 |
| 深度学习框架 | PaddlePaddle 2.6.1 |
| CUDA 版本 | 12.0 |
| cuDNN 版本 | 8.8 |

---

## 📁 输出文件结构

```
helmet_detection/
├── infer.py              # 主推理程序
├── config.py             # 配置文件（路径、阈值等）
├── preprocess.py         # 图像预处理模块
├── postprocess.py        # 结果后处理模块
├── visualize.py          # 可视化模块
├── requirements.txt      # 依赖包列表
├── README.md             # 使用说明
└── models/               # 模型文件目录（使用时替换为云端IDE实际路径）
    ├── model.pdmodel
    └── model.pdiparams
```

---

## 🔧 关键配置参数（需可调整）

```python
# 推理阈值配置
CONF_THRESHOLD = 0.5      # 置信度阈值（可调整）
NMS_THRESHOLD = 0.45     # NMS阈值（可调整）

# 路径配置 - 请根据你的云端IDE实际情况修改
MODEL_DIR = "/path/to/your/model/"  # 云端IDE上模型文件所在目录
TEST_IMAGE = "test.jpg"       # 测试图片路径
```

---

## ✅ 代码质量要求

1. 代码结构清晰，模块化设计
2. 添加详细的中文注释
3. 包含异常处理（文件不存在、模型加载失败等）
4. 支持命令行参数配置
5. 打印推理时间统计
6. 包含 README 使用说明

---

## 💡 使用提示

- 请把 `/path/to/your/model/` 替换为云端IDE中模型文件实际存放的路径
- 建议使用相对路径，便于代码迁移
- 首次运行前请确保已安装依赖：`pip install paddlepaddle-gpu`

---

**请根据以上信息生成完整的代码！** 🚀
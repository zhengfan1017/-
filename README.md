---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: b9a4f8cb4b7f3e2e6d342a5e29676dbb
    PropagateID: b9a4f8cb4b7f3e2e6d342a5e29676dbb
    ReservedCode1: 304502210098eac1c877f24fcf303d46e341a578defe755a29d2c69014d89b37ddee44c04f02207c9fdd797fd9a78ced3b1cf14c121996462a37199f69e8e74d6f94b39c32ae61
    ReservedCode2: 3045022100aa3c3d828096d45086ff955543f96e632d6b06060f49c5a5dcd691b2cde0be380220243ef5db31b5e0651987ed397509ad49361c5f4b7192270300c99d7634bda1f5
---

# 复合材料铺丝在线缺陷检测系统

## 项目简介

本系统实现基于2.5D图像的复合材料铺丝在线缺陷检测，包含从相机标定到模型推理的完整流程。

## 项目目录结构

```
carbon_fiber_detection/
├── config/
│   └── system_config.yaml          # 系统配置文件
├── models/
│   ├── model.pdmodel               # Paddle推理模型结构
│   └── model.pdiparams            # Paddle推理模型参数
├── modules/
│   ├── __init__.py
│   ├── calibration.py              # 1. 相机标定模块
│   ├── acquisition.py              # 2. 数据采集模块
│   ├── processor.py                # 3. 数据处理模块
│   ├── inferencer.py               # 4. 模型推理模块
│   └── measurement.py              # 5. 测量模块
├── utils/
│   ├── __init__.py
│   └── logger.py                   # 日志工具
├── data/
│   └── calibration/                # 标定数据目录
├── main.py                         # 主程序入口
└── requirements.txt                # 依赖库
```

## 模块说明

### 1. 标定模块 (calibration.py)
- 功能：标定线激光传感器，获取像素到物理尺寸的转换比例
- 输出：标定结果保存为YAML文件，供后续处理使用

### 2. 数据采集模块 (acquisition.py)
- 功能：封装深视SDK，实现实时轮廓数据采集
- 支持：阻塞采集和连续采集两种模式

### 3. 数据处理模块 (processor.py)
- 功能：将原始轮廓数据转换为2.5D高度映射图
- 包含：滤波、基线漂移校正、高度映射

### 4. 模型推理模块 (inferencer.py)
- 功能：使用Paddle Inference进行目标检测推理
- 包含：模型加载、图像预处理、NMS后处理

### 5. 测量模块 (measurement.py)
- 功能：测量碳纤维缝隙宽度，判断是否大于3mm
- 输出：缺陷检测结果和测量数据

## 安装与配置

### 1. 安装依赖
```bash
pip install -r requirements.txt
```

### 2. 配置参数
修改 `config/system_config.yaml` 中的参数：
- 相机IP地址
- 标定结果路径
- 模型路径
- 检测阈值

### 3. 标定步骤
```bash
python -c "from modules.calibration import Calibration; c = Calibration('config/system_config.yaml'); c.run_calibration()"
```

## 运行说明

### 方式一：离线模式（使用已采集数据）
```bash
python main.py --mode offline --input data/test.ecd
```

### 方式二：在线模式（实时采集推理）
```bash
python main.py --mode online
```

### 方式三：仅推理模式
```bash
python main.py --mode inference --input data/test_image.png
```

## 检测结果说明

系统输出包含以下信息：
- 缺陷类型（间隙、搭接、三角区、翻折、褶皱、夹杂）
- 置信度分数
- 边界框坐标
- **碳纤维缝隙宽度（毫米）**
- 是否超过3mm阈值的判定结果

## 标定结果的使用

标定结果（像素到毫米的转换比例）在以下位置使用：

1. **数据处理模块 (processor.py)**：用于生成2.5D图像时的尺寸映射
2. **测量模块 (measurement.py)**：用于将像素宽度转换为实际物理宽度

具体代码位置见各模块中的 `calibration_params` 参数使用。

## 注意事项

1. 确保深视SDK已正确安装并配置
2. 模型文件需提前导出为Paddle Inference格式
3. 首次使用前必须进行相机标定
4. 根据实际传感器参数调整配置文件

## 技术支持

如有问题，请联系技术支持团队。

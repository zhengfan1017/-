
# 安全帽检测模型 Paddle Inference 推理程序

## 目录结构

```
helmet_detection/
├── infer.py              # 主推理程序
├── config.py             # 配置文件
├── preprocess.py         # 图像预处理模块
├── postprocess.py        # 结果后处理模块
├── visualize.py          # 可视化模块
├── requirements.txt      # 依赖包列表
├── README.md             # 使用说明
└── models/               # 模型文件目录（需手动添加）
    ├── model.pdmodel
    └── model.pdiparams
```

## 安装依赖

```bash
pip install -r requirements.txt
```

## 配置模型

将以下模型文件放入 `models/` 目录下：
- `model.pdmodel`
- `model.pdiparams`

## 使用方法

### 1. 单张图片推理

```bash
python infer.py --mode single --model_dir ./models --image test.jpg --output_dir ./output
```

### 2. 批量图片推理

```bash
python infer.py --mode batch --model_dir ./models --image_dir ./images --output_dir ./output
```

### 3. 实时摄像头推理

```bash
python infer.py --mode camera --model_dir ./models --camera_id 0
```

### 4. 调整置信度阈值

```bash
python infer.py --mode single --model_dir ./models --image test.jpg --conf_threshold 0.7
```

## 参数说明

| 参数 | 说明 | 默认值 |
|------|------|--------|
| --mode | 推理模式 (single/batch/camera) | single |
| --model_dir | 模型目录路径 | ./models |
| --image | 单张图片路径 (single模式) | - |
| --image_dir | 图片目录路径 (batch模式) | - |
| --output_dir | 结果保存目录 | ./output |
| --camera_id | 摄像头ID (camera模式) | 0 |
| --conf_threshold | 置信度阈值 | 0.5 |

## 类别说明

- `person` (绿色框) - 人
- `hat` (红色框) - 安全帽


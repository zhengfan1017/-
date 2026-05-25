# 安全帽检测模型 - 独立版 Notebook 复制指南

## 说明
这是完全独立的版本，所有代码都在这个 Notebook 里，不依赖任何外部文件！
只需要模型文件在 `./models/` 目录下即可。

---

## 单元格 1：导入库和配置

```python
import os
import argparse
import time
import cv2
import numpy as np
from paddle.inference import Config as PaddleConfig
from paddle.inference import create_predictor
import matplotlib.pyplot as plt

# ===================== 配置参数 =====================
class Config:
    MODEL_DIR = './models'
    CONF_THRESHOLD = 0.5
    NMS_THRESHOLD = 0.45
    INPUT_SIZE = (608, 608)
    MEAN = [0.485, 0.456, 0.406]
    STD = [0.229, 0.224, 0.225]
    IS_SCALE = True
    KEEP_RATIO = False
    INPUT_NAMES = ['im_shape', 'image', 'scale_factor']
    OUTPUT_NAMES = ['multiclass_nms3_1969.tmp_0', 'multiclass_nms3_1969.tmp_2']
    CLASSES = ['person', 'hat']
    COLORS = [(0, 255, 0), (0, 0, 255)]

# ===================== 切换工作目录 =====================
os.chdir('/home/bml/storage')
print(f"当前工作目录: {os.getcwd()}")
print(f"\n当前目录下的文件:")
for file in sorted(os.listdir('.')):
    print(f"  - {file}")
```

---

## 单元格 2：检查环境和模型文件

```python
print("=== 检查依赖库 ===\n")

try:
    import paddle
    print(f"✅ PaddlePaddle 安装成功，版本: {paddle.__version__}")
except ImportError as e:
    print(f"❌ PaddlePaddle 未安装: {e}")

print("\n=== 检查模型文件 ===\n")
model_dir = Config.MODEL_DIR
if os.path.exists(model_dir):
    print(f"✅ 模型目录 {model_dir} 存在")
    model_files = os.listdir(model_dir)
    print(f"模型目录下的文件:")
    for f in sorted(model_files):
        print(f"  - {f}")
    
    pdmodel_exists = 'model.pdmodel' in model_files
    pdiparams_exists = 'model.pdiparams' in model_files
    
    if pdmodel_exists and pdiparams_exists:
        print("\n✅ 所有模型文件都存在！")
    else:
        if not pdmodel_exists:
            print("\n❌ 缺少 model.pdmodel 文件")
        if not pdiparams_exists:
            print("\n❌ 缺少 model.pdiparams 文件")
else:
    print(f"❌ 模型目录 {model_dir} 不存在！")
    print("请创建 models 目录并放入模型文件")
```

---

## 单元格 3：定义所有函数

```python
# ===================== 图像预处理 =====================
def preprocess(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"无法读取图片: {image_path}")
    origin_shape = img.shape[:2]
    resized_img = cv2.resize(img, Config.INPUT_SIZE)
    img_data = resized_img.astype(np.float32) / 255.0
    for i in range(3):
        img_data[:, :, i] = (img_data[:, :, i] - Config.MEAN[i]) / Config.STD[i]
    img_data = img_data.transpose(2, 0, 1)
    img_data = np.expand_dims(img_data, axis=0)
    im_shape = np.array([[Config.INPUT_SIZE[0], Config.INPUT_SIZE[1]]], dtype=np.float32)
    scale_factor = np.array(
        [
            [
                float(Config.INPUT_SIZE[0]) / origin_shape[0],
                float(Config.INPUT_SIZE[1]) / origin_shape[1],
            ]
        ],
        dtype=np.float32,
    )
    return img, img_data, im_shape, scale_factor

# ===================== 后处理 =====================
def postprocess(boxes, scores, origin_shape):
    results = []
    for i in range(len(scores)):
        score = scores[i][1]
        cls_id = int(scores[i][0])
        if score >= Config.CONF_THRESHOLD:
            x1, y1, x2, y2 = boxes[i]
            h, w = origin_shape
            scale_y = h / Config.INPUT_SIZE[0]
            scale_x = w / Config.INPUT_SIZE[1]
            x1 = int(x1 * scale_x)
            y1 = int(y1 * scale_y)
            x2 = int(x2 * scale_x)
            y2 = int(y2 * scale_y)
            x1 = max(0, x1)
            y1 = max(0, y1)
            x2 = min(w - 1, x2)
            y2 = min(h - 1, y2)
            results.append(
                {
                    "class_id": cls_id,
                    "class_name": Config.CLASSES[cls_id],
                    "score": score,
                    "bbox": [x1, y1, x2, y2],
                }
            )
    return results

# ===================== 可视化 =====================
def visualize(image, results, output_path=None):
    for result in results:
        x1, y1, x2, y2 = result["bbox"]
        cls_id = result["class_id"]
        cls_name = result["class_name"]
        score = result["score"]
        color = Config.COLORS[cls_id]
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 2)
        label = f"{cls_name}: {score:.2f}"
        (text_w, text_h), baseline = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
        cv2.rectangle(
            image, (x1, y1 - text_h - baseline), (x1 + text_w, y1), color, -1
        )
        cv2.putText(
            image,
            label,
            (x1, y1 - baseline),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (255, 255, 255),
            2,
        )
    if output_path:
        cv2.imwrite(output_path, image)
    return image

# ===================== 加载模型 =====================
def load_model():
    model_file = os.path.join(Config.MODEL_DIR, "model.pdmodel")
    params_file = os.path.join(Config.MODEL_DIR, "model.pdiparams")
    if not os.path.exists(model_file) or not os.path.exists(params_file):
        raise FileNotFoundError(
            f"模型文件不存在: {model_file} 或 {params_file}\n请在 config.py 中正确配置 MODEL_DIR"
        )
    config = PaddleConfig(model_file, params_file)
    config.enable_use_gpu(100, 0)
    config.disable_glog_info()
    config.switch_ir_optim(True)
    config.enable_memory_optim()
    predictor = create_predictor(config)
    return predictor

# ===================== 单张图片推理 =====================
def inference_single(predictor, image_path, output_dir=None):
    start_time = time.time()
    img, img_data, im_shape, scale_factor = preprocess(image_path)
    input_names = predictor.get_input_names()
    for i, name in enumerate(input_names):
        input_tensor = predictor.get_input_handle(name)
        if name == "im_shape":
            input_tensor.copy_from_cpu(im_shape)
        elif name == "image":
            input_tensor.copy_from_cpu(img_data)
        elif name == "scale_factor":
            input_tensor.copy_from_cpu(scale_factor)
    predictor.run()
    output_names = predictor.get_output_names()
    output_boxes = predictor.get_output_handle(output_names[0]).copy_to_cpu()
    output_scores = predictor.get_output_handle(output_names[1]).copy_to_cpu()
    results = postprocess(output_boxes, output_scores, img.shape[:2])
    end_time = time.time()
    infer_time = (end_time - start_time) * 1000
    print(f"推理时间: {infer_time:.2f} ms")
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, os.path.basename(image_path))
        visualize(img, results, output_path)
        print(f"结果保存至: {output_path}")
    return results, img

print("✅ 所有函数定义完成！")
```

---

## 单元格 4：加载模型

```python
print("正在加载模型...")
predictor = load_model()
print("✅ 模型加载成功！")
```

---

## 单元格 5：单张图片推理

```python
# 配置参数
image_path = './test.jpg'              # 你的图片路径
output_dir = './output'                # 输出目录
conf_threshold = 0.5                   # 置信度阈值

# 更新配置
Config.CONF_THRESHOLD = conf_threshold

# 运行推理
print(f"=== 开始推理: {image_path} ===\n")
results, result_img = inference_single(predictor, image_path, output_dir)
print(f"\n检测到 {len(results)} 个目标:")
for i, res in enumerate(results, 1):
    print(f"  {i}. {res['class_name']} - 置信度: {res['score']:.3f} - 位置: {res['bbox']}")
```

---

## 单元格 6：显示检测结果

```python
# 显示结果
if len(results) > 0:
    # BGR 转 RGB 用于 matplotlib 显示
    result_img_rgb = cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB)
    
    plt.figure(figsize=(12, 8))
    plt.imshow(result_img_rgb)
    plt.axis('off')
    plt.title(f'安全帽检测结果 (检测到 {len(results)} 个目标)')
    plt.show()
    print(f"✅ 检测结果已显示！")
else:
    print("未检测到任何目标，可尝试降低 conf_threshold 参数值")
```

---

## 单元格 7：可选 - 多次推理不同参数

```python
# 尝试不同的置信度阈值
thresholds_to_try = [0.3, 0.5, 0.7]

for thresh in thresholds_to_try:
    print(f"\n{'='*50}")
    print(f"使用置信度阈值: {thresh}")
    print(f"{'='*50}")
    
    Config.CONF_THRESHOLD = thresh
    results, result_img = inference_single(predictor, image_path, None)
    print(f"检测到 {len(results)} 个目标")
    
    if len(results) > 0:
        result_img_rgb = cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB)
        plt.figure(figsize=(10, 6))
        plt.imshow(result_img_rgb)
        plt.axis('off')
        plt.title(f'阈值 {thresh} - 检测到 {len(results)} 个目标')
        plt.show()
```

---

## FAQ（文字说明，不需要运行）

### Q1: 提示找不到 paddlepaddle？
**A:** 确保在 Notebook 环境中运行，Notebook 有 paddlepaddle，终端可能没有

### Q2: 提示找不到模型文件？
**A:** 确保模型文件在 `./models/` 目录下，包含 `model.pdmodel` 和 `model.pdiparams`

### Q3: 想调整检测的灵敏度？
**A:** 调整 `conf_threshold` 参数，越低检测越灵敏，越高越严格

### Q4: 如何检测其他图片？
**A:** 修改 `image_path` 变量为你的图片路径即可

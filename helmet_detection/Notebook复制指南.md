# 安全帽检测模型 - Notebook 单元格代码

## 说明
把下面的内容按顺序复制到你的 Notebook 单元格中运行即可。

---

## 单元格 1：切换到正确的目录

```python
import os
os.chdir('/home/bml/storage')
print(f"当前工作目录: {os.getcwd()}")
print(f"\n当前目录下的文件:")
for file in sorted(os.listdir('.')):
    print(f"  - {file}")
```

---

## 单元格 2：检查环境和依赖

```python
print("=== 检查依赖库 ===\n")

try:
    import paddle
    from paddle.inference import Config as PaddleConfig
    from paddle.inference import create_predictor
    print(f"✅ PaddlePaddle 安装成功，版本: {paddle.__version__}")
except ImportError as e:
    print(f"❌ PaddlePaddle 未安装: {e}")

try:
    import cv2
    print(f"✅ OpenCV 安装成功，版本: {cv2.__version__}")
except ImportError as e:
    print(f"❌ OpenCV 未安装: {e}")

try:
    import numpy as np
    print(f"✅ NumPy 安装成功，版本: {np.__version__}")
except ImportError as e:
    print(f"❌ NumPy 未安装: {e}")

print("\n=== 检查模型文件 ===\n")
model_dir = './models'
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

## 单元格 3：单张图片推理（直接运行）

```python
# 方式1：直接运行 infer.py 脚本
print("=== 开始单张图片推理 ===\n")
%run infer.py --mode single --image ./test.jpg --output_dir ./output
```

---

## 单元格 4：查看推理结果

```python
import matplotlib.pyplot as plt
import cv2

output_image_path = './output/test.jpg'

if os.path.exists(output_image_path):
    img = cv2.imread(output_image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    plt.figure(figsize=(12, 8))
    plt.imshow(img_rgb)
    plt.axis('off')
    plt.title('安全帽检测结果')
    plt.show()
    print(f"✅ 检测结果已显示！")
else:
    print(f"❌ 找不到输出图片: {output_image_path}")
    print(f"请检查: 1. test.jpg 是否存在  2. 模型文件是否正确")
```

---

## 单元格 5：可选 - 自定义参数推理

```python
# 自定义参数运行
# 修改下面的参数来尝试不同的设置

image_path = './test.jpg'          # 你的图片路径
conf_threshold = 0.5               # 置信度阈值 (0.3-0.8)
output_dir = './output'            # 输出目录

# 运行推理
import subprocess
import sys

cmd = [
    sys.executable, 'infer.py',
    '--mode', 'single',
    '--model_dir', './models',
    '--image', image_path,
    '--output_dir', output_dir,
    '--conf_threshold', str(conf_threshold)
]

print(f"运行命令: {' '.join(cmd)}")
print()

result = subprocess.run(cmd, capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print("\n错误信息:")
    print(result.stderr)
```

---

## FAQ（文字说明，不需要运行）

### Q1: 提示找不到 paddlepaddle？
**A:** 确保在 Notebook 环境中运行，Notebook 有 paddlepaddle，终端可能没有

### Q2: 提示找不到模型文件？
**A:** 确保模型文件在 `./models/` 目录下，包含 `model.pdmodel` 和 `model.pdiparams`

### Q3: 想调整检测的灵敏度？
**A:** 调整 `conf_threshold` 参数，越低检测越灵敏，越高越严格

### Q4: 如何检测多张图片？
**A:** 修改命令为 `--mode batch --image_dir ./images`

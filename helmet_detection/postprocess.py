
import numpy as np
from config import Config


def postprocess(boxes, num_detections, origin_shape):
    results = []
    num_detections = int(num_detections[0]) if hasattr(num_detections, '__len__') else int(num_detections)
    if num_detections == 0:
        return results
    
    boxes_data = boxes
    h, w = origin_shape
    
    # 计算缩放比例：模型输入尺寸 -> 原图尺寸
    scale_x = w / Config.INPUT_SIZE[1]  # 原图宽度 / 输入宽度
    scale_y = h / Config.INPUT_SIZE[0]  # 原图高度 / 输入高度
    
    for i in range(num_detections):
        if i >= len(boxes_data):
            break
        
        cls_id = int(boxes_data[i][0])
        score = boxes_data[i][1]
        
        # 模型输出的坐标是相对于 INPUT_SIZE (608x608) 的，需要缩放到原图尺寸
        x1 = boxes_data[i][2] * scale_x
        y1 = boxes_data[i][3] * scale_y
        x2 = boxes_data[i][4] * scale_x
        y2 = boxes_data[i][5] * scale_y
        
        if score >= Config.CONF_THRESHOLD:
            x1 = max(0, int(x1))
            y1 = max(0, int(y1))
            x2 = min(w - 1, int(x2))
            y2 = min(h - 1, int(y2))
            results.append(
                {
                    "class_id": cls_id,
                    "class_name": Config.CLASSES[cls_id],
                    "score": score,
                    "bbox": [x1, y1, x2, y2],
                }
            )
    return results


import numpy as np
from config import Config


def postprocess(boxes, num_detections, origin_shape):
    results = []
    num_detections = int(num_detections[0]) if hasattr(num_detections, '__len__') else int(num_detections)
    if num_detections == 0:
        return results
    
    boxes_data = boxes
    h, w = origin_shape
    
    for i in range(num_detections):
        if i &gt;= len(boxes_data):
            break
        
        cls_id = int(boxes_data[i][0])
        score = boxes_data[i][1]
        
        # 根据模型输出，坐标顺序是 [类别ID, 置信度, x1, y1, x2, y2]
        x1 = boxes_data[i][2]
        y1 = boxes_data[i][3]
        x2 = boxes_data[i][4]
        y2 = boxes_data[i][5]
        
        if score &gt;= Config.CONF_THRESHOLD:
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

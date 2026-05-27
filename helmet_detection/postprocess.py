
import numpy as np
from config import Config


def postprocess(boxes, num_detections, origin_shape):
    results = []
    num_detections = int(num_detections[0]) if hasattr(num_detections, '__len__') else int(num_detections)
    if num_detections == 0:
        return results
    
    boxes_data = boxes
    for i in range(num_detections):
        if i >= len(boxes_data):
            break
        cls_id = int(boxes_data[i][0])
        score = boxes_data[i][1]
        x1 = boxes_data[i][2]
        y1 = boxes_data[i][3]
        x2 = boxes_data[i][4]
        y2 = boxes_data[i][5]
        
        if score >= Config.CONF_THRESHOLD:
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


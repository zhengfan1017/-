
import numpy as np
from config import Config


def postprocess(boxes, num_detections, origin_shape):
    results = []
    num_detections = int(num_detections[0]) if hasattr(num_detections, '__len__') else int(num_detections)
    if num_detections == 0:
        return results
    
    h, w = origin_shape
    for i in range(num_detections):
        box = boxes[i]
        cls_id = int(box[0])
        score = box[1]
        x1 = box[2]
        y1 = box[3]
        x2 = box[4]
        y2 = box[5]
        
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



import numpy as np
from config import Config


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



import numpy as np
from config import Config


def postprocess(boxes, num_detections, origin_shape):
    results = []
    num_detections = int(num_detections[0]) if hasattr(num_detections, '__len__') else int(num_detections)
    print(f"[DEBUG] 原始检测数量: {num_detections}")
    print(f"[DEBUG] boxes形状: {boxes.shape if hasattr(boxes, 'shape') else 'N/A'}")
    print(f"[DEBUG] boxes内容: {boxes}")
    
    if num_detections == 0:
        return results
    
    boxes_data = boxes
    for i in range(num_detections):
        if i >= len(boxes_data):
            break
        
        # 根据boxes内容判断坐标顺序
        # 假设boxes_data[i] = [类别ID, 置信度, x1, y1, x2, y2] 或 [类别ID, 置信度, y1, x1, y2, x2]
        raw_data = boxes_data[i]
        cls_id = int(raw_data[0])
        score = raw_data[1]
        
        # 尝试判断坐标顺序：如果y坐标大于x坐标，说明顺序可能是[y1, x1, y2, x2]
        coord_4 = raw_data[2]
        coord_5 = raw_data[3]
        coord_6 = raw_data[4]
        coord_7 = raw_data[5]
        
        # 判断坐标顺序：检查坐标是否在合理范围内
        h, w = origin_shape
        
        # 方案1: [x1, y1, x2, y2] - 标准顺序
        x1_1, y1_1, x2_1, y2_1 = int(coord_4), int(coord_5), int(coord_6), int(coord_7)
        
        # 方案2: [y1, x1, y2, x2] - 交换顺序
        y1_2, x1_2, y2_2, x2_2 = int(coord_4), int(coord_5), int(coord_6), int(coord_7)
        
        # 根据坐标值判断哪个方案更合理
        # 方案1：检查x坐标是否在图像宽度内，y坐标是否在图像高度内
        valid_1 = (0 <= x1_1 < w and 0 <= x2_1 < w and 0 <= y1_1 < h and 0 <= y2_1 < h)
        # 方案2：交换后的坐标
        valid_2 = (0 <= x1_2 < w and 0 <= x2_2 < w and 0 <= y1_2 < h and 0 <= y2_2 < h)
        
        # 如果两个方案都有效，选择框更小的（更精确）
        if valid_1 and valid_2:
            box1_area = (x2_1 - x1_1) * (y2_1 - y1_1)
            box2_area = (x2_2 - x1_2) * (y2_2 - y1_2)
            if box1_area <= box2_area:
                x1, y1, x2, y2 = x1_1, y1_1, x2_1, y2_1
                print(f"[DEBUG] 目标{i}: 使用方案1 [x1,y1,x2,y2], 面积={box1_area}")
            else:
                x1, y1, x2, y2 = x1_2, y1_2, x2_2, y2_2
                print(f"[DEBUG] 目标{i}: 使用方案2 [y1,x1,y2,x2], 面积={box2_area}")
        elif valid_1:
            x1, y1, x2, y2 = x1_1, y1_1, x2_1, y2_1
            print(f"[DEBUG] 目标{i}: 使用方案1 [x1,y1,x2,y2]")
        elif valid_2:
            x1, y1, x2, y2 = x1_2, y1_2, x2_2, y2_2
            print(f"[DEBUG] 目标{i}: 使用方案2 [y1,x1,y2,x2]")
        else:
            print(f"[DEBUG] 目标{i}: 坐标无效，跳过")
            continue
        
        print(f"[DEBUG] 目标{i}: 类别={cls_id}({Config.CLASSES[cls_id]}), 置信度={score:.3f}, 坐标=[{x1},{y1},{x2},{y2}]")
        
        # 降低置信度阈值要求，获取更多检测结果（设置为0.1）
        if score >= 0.1:
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
    print(f"[DEBUG] 最终检测到 {len(results)} 个目标")
    return results


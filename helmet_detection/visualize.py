
import cv2
from config import Config


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


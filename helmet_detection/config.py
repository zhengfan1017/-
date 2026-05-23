
import os


class Config:
    MODEL_DIR = os.getenv("MODEL_DIR", "./models")
    CONF_THRESHOLD = float(os.getenv("CONF_THRESHOLD", 0.5))
    NMS_THRESHOLD = float(os.getenv("NMS_THRESHOLD", 0.45))
    INPUT_SIZE = (608, 608)
    MEAN = [0.485, 0.456, 0.406]
    STD = [0.229, 0.224, 0.225]
    IS_SCALE = True
    KEEP_RATIO = False
    INPUT_NAMES = ["im_shape", "image", "scale_factor"]
    OUTPUT_NAMES = ["multiclass_nms3_1969.tmp_0", "multiclass_nms3_1969.tmp_2"]
    CLASSES = ["person", "hat"]
    COLORS = [(0, 255, 0), (0, 0, 255)]


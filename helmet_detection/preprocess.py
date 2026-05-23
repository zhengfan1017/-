
import cv2
import numpy as np
from config import Config


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


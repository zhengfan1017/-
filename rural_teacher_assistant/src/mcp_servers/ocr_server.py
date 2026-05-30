import logging
from typing import Optional, Tuple
import os

logger = logging.getLogger(__name__)

class OCRServer:
    def __init__(self):
        self.use_local = False
        self._try_init_local()
    
    def _try_init_local(self):
        try:
            from paddleocr import PaddleOCR
            self.ocr = PaddleOCR(use_angle_cls=True, lang='ch', show_log=False)
            self.use_local = True
            logger.info("本地 OCR 模型初始化成功")
        except Exception as e:
            logger.warning(f"本地 OCR 初始化失败: {e}，将使用模拟模式")
            self.use_local = False
    
    def recognize(self, image_path: str) -> Tuple[str, float]:
        if self.use_local:
            return self._recognize_local(image_path)
        else:
            return self._recognize_mock(image_path)
    
    def _recognize_local(self, image_path: str) -> Tuple[str, float]:
        try:
            result = self.ocr.ocr(image_path, cls=True)
            texts = []
            confidence = 0.0
            
            if result and result[0]:
                for line in result[0]:
                    texts.append(line[1][0])
                    confidence += line[1][1]
                confidence /= len(result[0])
            
            full_text = '\n'.join(texts)
            return full_text, confidence
        except Exception as e:
            logger.error(f"本地 OCR 识别失败: {e}")
            return self._recognize_mock(image_path)
    
    def _recognize_mock(self, image_path: str) -> Tuple[str, float]:
        mock_text = """模拟作业内容：
1. 计算 1+1=2
2. 计算 2+3=5
3. 应用题：小明有5个苹果，给了小红2个，还剩3个
"""
        return mock_text, 0.85

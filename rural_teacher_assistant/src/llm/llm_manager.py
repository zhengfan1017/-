import logging
from typing import Optional
from .volcano_llm import VolcanoLLM

logger = logging.getLogger(__name__)

class LLMManager:
    _instance: Optional['LLMManager'] = None
    _llm: Optional[VolcanoLLM] = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    @classmethod
    def get_instance(cls) -> 'LLMManager':
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def initialize(self, api_key: Optional[str] = None, model: str = "doubao-pro-32k"):
        if self._llm is None:
            self._llm = VolcanoLLM(api_key=api_key, model=model)
            logger.info("LLM Manager 初始化完成")
    
    def get_llm(self) -> VolcanoLLM:
        if self._llm is None:
            self.initialize()
        return self._llm
    
    def chat(self, prompt: str, system_prompt: Optional[str] = None, temperature: float = 0.7, max_tokens: int = 2000) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        return self.get_llm().chat(messages, temperature=temperature, max_tokens=max_tokens)

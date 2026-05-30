import logging
from typing import Optional, Dict, Any
from ..llm.llm_manager import LLMManager
from ..rag.retriever import EnhancedRetriever

logger = logging.getLogger(__name__)

class BaseAgent:
    def __init__(self, name: str, role: str, system_prompt: str):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt
        self.llm_manager = LLMManager.get_instance()
        self.retriever = EnhancedRetriever()
        
        self.full_system_prompt = f"""{self.system_prompt}

你是一个专业的教学助手，帮助乡村教师完成教学工作。
始终考虑乡村教育的实际情况，提供贴合乡村生活的案例和建议。
"""
    
    def _call_llm(self, prompt: str, temperature: float = 0.7, max_tokens: int = 3000) -> str:
        return self.llm_manager.chat(
            prompt=prompt,
            system_prompt=self.full_system_prompt,
            temperature=temperature,
            max_tokens=max_tokens
        )
    
    def run(self, task: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError("子类必须实现 run 方法")

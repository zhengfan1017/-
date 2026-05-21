import os
from dotenv import load_dotenv

load_dotenv()

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "2a85c025526d427bb6fc55944777bc82")
DEEPSEEK_API_BASE = "https://api.deepseek.com"
MODEL_NAME = "deepseek-chat"

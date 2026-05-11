import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
}));

app.use(express.json({ limit: '10mb' }));

let knowledgeBase = [
  { content: '欢迎使用智能客服系统，我可以帮助您解答问题。', source: 'welcome' },
  { content: '我们提供7x24小时在线客服服务。', source: 'service' },
  { content: '常见问题可以在知识库中查找答案。', source: 'faq' },
];

let llm = null;

const initLLM = async () => {
  try {
    console.log('Initializing LangChain LLM...');
    
    llm = new ChatOpenAI({
      model: 'deepseek-v4-flash',
      openAIApiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_API_BASE || 'https://api.deepseek.com/v1',
      },
      temperature: 0.7,
    });

    console.log('LangChain LLM initialized successfully');
    console.log('Model: deepseek-v4-flash');
  } catch (error) {
    console.error('Failed to initialize LLM:', error);
  }
};

initLLM();

const createQAChain = async () => {
  const prompt = ChatPromptTemplate.fromMessages([
    ['system', '你是一个专业的客服助手。以下是知识库中的相关内容：\n\n{context}\n\n请根据知识库内容回答用户问题。如果知识库中没有相关信息，请礼貌地说明这一点，并给出一般性的建议。'],
    ['human', '{input}'],
  ]);

  const chain = RunnableSequence.from([
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  return chain;
};

app.post('/api/chat', async (req, res) => {
  console.log('Received chat request:', new Date().toISOString());
  
  try {
    const { message } = req.body;
    
    if (!llm) {
      return res.status(503).json({ 
        reply: '系统正在初始化中，请稍后重试...' 
      });
    }

    const context = knowledgeBase.map(doc => `[${doc.source}]: ${doc.content}`).join('\n');

    console.log('Generating response with DeepSeek...');

    const chain = await createQAChain();
    const response = await chain.invoke({ input: message, context });
    
    console.log('Response generated successfully');
    res.json({ reply: response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      reply: `抱歉，我暂时无法回答您的问题。错误信息：${error.message}` 
    });
  }
});

app.post('/api/add-document', async (req, res) => {
  try {
    const { content, source } = req.body;
    
    if (!content) {
      return res.status(400).json({ success: false, message: '内容为空' });
    }

    const newDocs = [
      { content: content.substring(0, 500), source: source || 'custom' }
    ];
    
    knowledgeBase.push(...newDocs);
    
    console.log(`Added document to knowledge base. Total: ${knowledgeBase.length}`);
    res.json({ success: true, message: '文档添加成功', count: newDocs.length });
  } catch (error) {
    console.error('Add document error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    initialized: llm !== null,
    model: 'deepseek-v4-flash',
    apiBase: process.env.OPENAI_API_BASE || 'https://api.deepseek.com/v1',
    knowledgeCount: knowledgeBase.length
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`========================================`);
  console.log(`API Provider: DeepSeek`);
  console.log(`Model: deepseek-v4-flash`);
  console.log(`Framework: LangChain`);
  console.log(`========================================\n`);
});
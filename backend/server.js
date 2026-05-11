import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

const mockVectorStore = {
  similaritySearch: async (query, k) => {
    const results = knowledgeBase.slice(0, Math.min(k, knowledgeBase.length));
    return results.map(doc => ({ pageContent: doc.content, metadata: { source: doc.source } }));
  },
  addDocuments: async (docs) => {
    docs.forEach(doc => {
      knowledgeBase.push({ content: doc.pageContent, source: doc.metadata.source });
    });
    return { success: true };
  },
};

app.post('/api/chat', async (req, res) => {
  console.log('Received chat request:', req.body);
  try {
    const { message } = req.body;
    
    const docs = await mockVectorStore.similaritySearch(message, 3);
    const context = docs.map(doc => doc.pageContent).join('\n\n');

    const mockReply = `根据知识库内容，我来回答您的问题：\n\n问题：${message}\n\n参考知识：\n${context}\n\n回答：这是一个基于LangChain RAG架构的智能客服系统。您可以添加自定义知识库文档，系统会根据知识库内容进行回答。`;
    
    res.json({ reply: mockReply });
  } catch (error) {
    console.error('Chat error:', error);
    res.json({ reply: `抱歉，我暂时无法回答您的问题。错误信息：${error.message}` });
  }
});

app.post('/api/add-document', async (req, res) => {
  try {
    const { content, source } = req.body;
    
    if (!content) {
      return res.status(400).json({ success: false, message: '内容为空' });
    }

    const chunks = splitText(content, 500);
    
    await mockVectorStore.addDocuments(
      chunks.map((chunk, index) => ({
        pageContent: chunk,
        metadata: { source: `${source}_${index + 1}` }
      }))
    );
    
    res.json({ success: true, message: '文档添加成功', count: chunks.length });
  } catch (error) {
    console.error('Add document error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

function splitText(text, chunkSize) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.substring(start, start + chunkSize));
    start += chunkSize - 50;
  }
  return chunks;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', initialized: true, documentCount: knowledgeBase.length });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Mock RAG system initialized with sample knowledge base');
});
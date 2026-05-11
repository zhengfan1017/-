import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const KnowledgeBase = () => {
  const [documentContent, setDocumentContent] = useState('');
  const [documentSource, setDocumentSource] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentContent.trim() || !documentSource.trim()) {
      setMessage('请填写文档内容和来源');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/add-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: documentContent.trim(),
          source: documentSource.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`文档添加成功！共分割为 ${data.count} 个片段`);
        setMessageType('success');
        setDocumentContent('');
        setDocumentSource('');
      } else {
        setMessage(data.message || '添加失败');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('网络错误，请稍后重试');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">知识库管理</h2>
          <p className="text-sm text-gray-500">添加文档到知识库，支持 RAG 检索</p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
            messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {messageType === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span className="text-sm">{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">文档来源</label>
          <input
            type="text"
            value={documentSource}
            onChange={(e) => setDocumentSource(e.target.value)}
            placeholder="例如：产品手册、FAQ文档、技术文档..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">文档内容</label>
          <textarea
            value={documentContent}
            onChange={(e) => setDocumentContent(e.target.value)}
            placeholder="请输入文档内容，系统会自动进行分段处理..."
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          <span>{isSubmitting ? '上传中...' : '添加到知识库'}</span>
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-sm font-medium text-gray-700 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>• 文档内容会被自动分割为 500 字符左右的片段</li>
          <li>• 每个片段会进行向量化存储，支持语义检索</li>
          <li>• 建议将产品知识、FAQ、技术文档等内容添加到知识库</li>
          <li>• 客服回复会优先参考知识库中的内容</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBase;
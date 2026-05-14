import { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, File, X } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message?: string;
}

const KnowledgeBase = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = selectedFiles.map(file => ({
      name: file.name,
      size: file.size,
      status: 'pending' as const
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('请先选择要上传的文件');
      setMessageType('error');
      return;
    }

    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) {
      setMessage('所有文件已经上传完成');
      setMessageType('error');
      return;
    }

    setIsUploading(true);
    setMessage('');
    setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' })));

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const formData = new FormData();

    for (const file of input.files || []) {
      formData.append('files', file);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`成功上传 ${data.uploaded_count} 个文件！`);
        setMessageType('success');
        setFiles([]);
        if (input) input.value = '';
      } else {
        setMessage(data.errors?.join(', ') || '上传失败');
        setMessageType('error');
        setFiles(prev => prev.map(f => ({ ...f, status: 'error', message: '上传失败' })));
      }
    } catch (error) {
      setMessage('网络错误，请稍后重试');
      setMessageType('error');
      setFiles(prev => prev.map(f => ({ ...f, status: 'error', message: '网络错误' })));
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const colors: { [key: string]: string } = {
      'pdf': 'text-red-500',
      'docx': 'text-blue-500',
      'doc': 'text-blue-500',
      'txt': 'text-gray-500',
      'md': 'text-purple-500'
    };
    return colors[ext || ''] || 'text-gray-400';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">知识库管理</h2>
          <p className="text-sm text-gray-500">上传文档到知识库，支持 RAG 检索</p>
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

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            点击或拖拽文件到此处上传
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            支持 .docx, .pdf, .txt, .md 格式
          </p>
          <label className="px-6 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
            选择文件
            <input
              type="file"
              multiple
              accept=".docx,.pdf,.txt,.md"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            待上传文件 ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <File className={`w-5 h-5 ${getFileIcon(file.name)}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === 'uploading' && (
                    <span className="text-xs text-blue-600">上传中...</span>
                  )}
                  {file.status === 'success' && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  {file.status === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  {file.status === 'pending' && (
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isUploading ? '上传中...' : `上传 ${files.filter(f => f.status === 'pending').length} 个文件`}
        </button>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">使用说明</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 支持上传 .docx, .pdf, .txt, .md 格式的文件</li>
          <li>• 上传后的文档会自动分割并添加到知识库</li>
          <li>• 文档添加成功后，可在 RAG 客服中基于文档内容提问</li>
          <li>• 客服回复会优先参考知识库中的文档内容</li>
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBase;

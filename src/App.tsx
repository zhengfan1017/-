import { useState } from 'react';
import { MessageSquare, Database, Menu, X } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import KnowledgeBase from './components/KnowledgeBase';

type TabType = 'chat' | 'knowledge';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RAG智能客服</h1>
                <p className="text-xs text-gray-500">基于 LangChain 的私有化客服中台</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  客服对话
                </span>
              </button>
              <button
                onClick={() => setActiveTab('knowledge')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'knowledge'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  知识库管理
                </span>
              </button>
            </nav>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => {
                  setActiveTab('chat');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  客服对话
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('knowledge');
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all mt-2 ${
                  activeTab === 'knowledge'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  知识库管理
                </span>
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className={`transition-all duration-300 ${
          activeTab === 'chat' ? 'lg:w-2/3' : 'w-full'
        }`}>
          {activeTab === 'chat' ? (
            <div className="h-[calc(100vh-180px)] min-h-[500px]">
              <ChatInterface />
            </div>
          ) : (
            <KnowledgeBase />
          )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          Powered by LangChain | 私有化部署 | 数据安全可控
        </div>
      </footer>
    </div>
  );
}

export default App;
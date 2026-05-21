import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/hooks/useQuizStore';
import { generateQuiz } from '@/services/api';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { setQuestions, setLoading, setError, resetQuiz } = useQuizStore();

  const handleStartQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      resetQuiz();
      
      const questions = await generateQuiz();
      setQuestions(questions);
      navigate('/quiz');
    } catch (error) {
      setError('生成题目失败，请检查后端服务是否启动');
      setLoading(false);
    }
  };

  const { isLoading } = useQuizStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-white">CF</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            碳纤维复合材料
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-blue-400 mb-6">
            知识测验系统
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            测试你对碳纤维复合材料的专业知识，涵盖材料特性、制备工艺、
            应用领域等多个方面。共10道选择题，AI智能出题。
          </p>

          <button
            onClick={handleStartQuiz}
            disabled={isLoading}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>正在生成题目...</span>
              </>
            ) : (
              <>
                <span className="text-xl">开始测验</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-white font-semibold mb-2">材料特性</h3>
              <p className="text-gray-400 text-sm">了解碳纤维的结构与性能</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-white font-semibold mb-2">制备工艺</h3>
              <p className="text-gray-400 text-sm">掌握生产制造流程</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-white font-semibold mb-2">应用领域</h3>
              <p className="text-gray-400 text-sm">探索各行业应用场景</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Powered by DeepSeek AI • Built with React + Flask</p>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

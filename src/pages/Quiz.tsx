import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { questions } from '@/utils/questions';

export default function Quiz() {
  const navigate = useNavigate();
  const { currentQuestion, answerQuestion, calculateResult } = useAppStore();
  const [showQuestionKey, setShowQuestionKey] = useState(0);

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      calculateResult();
      navigate('/result');
    }
  }, [currentQuestion, calculateResult, navigate]);

  const handleAnswer = (index: number) => {
    const question = questions[currentQuestion];
    answerQuestion(question.options[index]);
    setShowQuestionKey(prev => prev + 1);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!question) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      {/* 星光背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-100 opacity-20"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-300 mb-2 text-lg">
            <span>第 {currentQuestion + 1} 题</span>
            <span>共 {questions.length} 题</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600" style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div
          key={showQuestionKey}
          className="bg-gradient-to-b from-[#2a2a4a] to-[#1f1f3a] rounded-2xl p-8 shadow-2xl border border-yellow-400/30"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-8 text-center font-serif">
            {question.text}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
            <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#3a3a5a] to-[#2a2a4a] text-white text-lg 
                           hover:shadow-[0_0_20px_rgba(238,186,48,0.4)] hover:scale-105 transition-all duration-300
                           border border-yellow-400/30 rounded-xl cursor-pointer text-left"
              >
                {String.fromCharCode(65 + index)}. {option.text}
            </button>
          ))}
          </div>
        </div>
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

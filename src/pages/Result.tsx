import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/hooks/useQuizStore';
import { useMemo } from 'react';
import { Trophy, RotateCcw, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Result() {
  const navigate = useNavigate();
  const { questions, calculateScore, resetQuiz } = useQuizStore();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const { score, results } = useMemo(() => calculateScore(), [questions]);

  const handleRetake = () => {
    resetQuiz();
    navigate('/');
  };

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  if (questions.length === 0) {
    return null;
  }

  const correctCount = results.filter(r => r.is_correct).length;
  const wrongCount = results.length - correctCount;

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (score >= 90) return '优秀！对碳纤维复合材料知识掌握得非常扎实！';
    if (score >= 70) return '良好！继续加油！';
    if (score >= 60) return '及格！还需要多加学习。';
    return '建议加强学习碳纤维复合材料的相关知识。';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6">
            <Trophy className="w-16 h-16 text-yellow-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            测验完成！
          </h1>
          
          <div className={`text-6xl md:text-7xl font-bold ${getScoreColor()} mb-4`}>
            {score} 分
          </div>
          
          <p className="text-xl text-gray-300 mb-8">
            {getScoreMessage()}
          </p>

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">{correctCount}</div>
              <div className="text-gray-400">正确</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400">{wrongCount}</div>
              <div className="text-gray-400">错误</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-400">{results.length}</div>
              <div className="text-gray-400">总计</div>
            </div>
          </div>

          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-lg">重新测验</span>
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">详细答案解析</h2>
          
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 flex items-start gap-4 hover:bg-gray-700/50 transition-colors"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  result.is_correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {result.is_correct ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-sm">第 {result.number} 题</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      result.is_correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.is_correct ? '正确' : '错误'}
                    </span>
                  </div>
                  <p className="text-white font-medium">{result.question}</p>
                </div>

                <div className="flex-shrink-0 text-gray-400">
                  {expandedQuestions.has(index) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {expandedQuestions.has(index) && (
                <div className="px-6 pb-6 border-t border-gray-700 pt-4">
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">你的答案</div>
                      <div className={`font-semibold ${
                        result.is_correct ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {result.your_answer}：{(questions[index].options as Record<string, string>)[result.your_answer] || '未作答'}
                      </div>
                    </div>
                    
                    {!result.is_correct && (
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="text-sm text-green-400 mb-1">正确答案</div>
                        <div className="font-semibold text-green-400">
                          {result.correct_answer}：{(questions[index].options as Record<string, string>)[result.correct_answer]}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-blue-400 mb-1">解析</div>
                      <div className="text-gray-300">{result.explanation}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="text-lg">再测一次</span>
          </button>
        </div>
      </div>
    </div>
  );
}

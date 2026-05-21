import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/hooks/useQuizStore';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function Quiz() {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestion,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    isComplete
  } = useQuizStore();

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
    }
  }, [questions, navigate]);

  if (questions.length === 0) {
    return null;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionClick = (option: string) => {
    setAnswer(currentQuestion, option);
  };

  const handleSubmit = () => {
    if (isComplete()) {
      navigate('/result');
    }
  };

  const optionKeys = ['A', 'B', 'C', 'D'] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              碳纤维复合材料知识测验
            </h2>
            <span className="text-gray-400">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              第 {currentQuestion + 1} 题
            </span>
            <h3 className="text-xl md:text-2xl text-white leading-relaxed">
              {question.question}
            </h3>
          </div>

          <div className="space-y-4">
            {optionKeys.map((key) => {
              const isSelected = answers[currentQuestion] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleOptionClick(key)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {isSelected ? <Check className="w-5 h-5" /> : key}
                    </span>
                    <span className="text-lg">{question.options[key]}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>上一题</span>
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isComplete()}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <span>提交测验</span>
              <Check className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>下一题</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const store = useQuizStore.getState();
                store.currentQuestion !== index && 
                  useQuizStore.setState({ currentQuestion: index });
              }}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                answers[index]
                  ? 'bg-blue-500 text-white'
                  : currentQuestion === index
                  ? 'bg-gray-600 text-white ring-2 ring-blue-500'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>已回答 {Object.keys(answers).length} / {questions.length} 题</p>
        </div>
      </div>
    </div>
  );
}

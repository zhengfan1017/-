
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/hooks/useQuizStore';
import { QUESTIONS } from '@/utils/questions';
import { HOUSES, House } from '@/utils/houses';
import { ArrowLeft, ArrowRight, Check, Wand2 } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    answers,
    currentQuestion,
    setAnswer,
    setCurrentQuestion,
    isComplete
  } = useQuizStore();

  useEffect(() => {
    if (isComplete()) {
      navigate('/result');
    }
  }, [answers, isComplete, navigate]);

  const question = QUESTIONS[currentQuestion];
  const selectedAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  const handleOptionClick = (house: House) => {
    setAnswer(question.id, house);
  };

  const handleNext = () => {
    if (selectedAnswer && currentQuestion < QUESTIONS.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const handleFinish = () => {
    if (isComplete()) {
      navigate('/result');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-amber-300 font-medium">
              问题 {currentQuestion + 1} / {QUESTIONS.length}
            </span>
            <button
              onClick={() => navigate('/')}
              className="text-amber-400/70 hover:text-amber-400 text-sm transition-colors"
            >
              返回首页
            </button>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 border-2 border-amber-500/30 shadow-2xl shadow-purple-500/10">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="h-7 w-7 text-amber-400" />
              <h2 className="text-xl md:text-2xl text-amber-100 font-bold leading-relaxed">
                {question.text}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const houseData = HOUSES[option.house];
                const isSelected = selectedAnswer === option.house;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.house)}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl transition-all duration-300 border-2 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 shadow-lg shadow-amber-500/30'
                        : 'border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 hover:border-amber-500/50'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{houseData.emoji}</span>
                        <span className={`text-base md:text-lg ${isSelected ? 'text-amber-100 font-semibold' : 'text-slate-200'}`}>
                          {option.text}
                        </span>
                      </div>
                      {isSelected && <Check className="h-6 w-6 text-amber-400" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700/50">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed text-slate-500'
                    : 'text-amber-300 hover:bg-slate-800 hover:text-amber-200'
                }`}
              >
                <ArrowLeft className="h-5 w-5" />
                <span>上一题</span>
              </button>

              {currentQuestion === QUESTIONS.length - 1 ? (
                <button
                  onClick={handleFinish}
                  disabled={!selectedAnswer}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                    selectedAnswer
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg shadow-amber-500/30'
                      : 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400'
                  }`}
                >
                  <span>查看结果</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
                    selectedAnswer
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg shadow-amber-500/30'
                      : 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400'
                  }`}
                >
                  <span>下一题</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

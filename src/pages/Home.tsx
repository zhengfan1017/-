
import { Link } from 'react-router-dom';
import { useQuizStore } from '@/hooks/useQuizStore';
import { Sparkles, Wand2 } from 'lucide-react';

const SortingHat = () => {
  return (
    <div className="relative">
      <div className="animate-bounce">
        <div className="text-8xl md:text-9xl">🧙‍♂️</div>
      </div>
      <div className="absolute -top-2 -right-2 animate-pulse">
        <Sparkles className="h-8 w-8 text-yellow-400" />
      </div>
    </div>
  );
};

const Home = () => {
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const handleStart = () => {
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <SortingHat />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 drop-shadow-lg">
              霍格沃茨
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100 tracking-wider">
              分院帽测试器
            </p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-500/30 shadow-2xl shadow-amber-500/10">
            <p className="text-amber-100 text-lg md:text-xl leading-relaxed mb-6">
              "让我看看……啊，很难呐。你很勇敢，对不对？也很聪明，有天赋，而且渴望证明自己……
              那你想去哪里呢？"
            </p>
            <p className="text-amber-300/80 text-sm italic">
              —— 分院帽
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/quiz" onClick={handleStart}>
              <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white text-xl font-bold rounded-2xl shadow-xl shadow-amber-500/30 transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <Wand2 className="h-7 w-7 group-hover:rotate-12 transition-transform" />
                <span>开始测试</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </Link>
            <p className="text-amber-200/70 text-sm">
              回答 12 道问题，发现你属于哪个学院 ✨
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {[
              { emoji: '🦁', name: '格兰芬多' },
              { emoji: '🐍', name: '斯莱特林' },
              { emoji: '🦅', name: '拉文克劳' },
              { emoji: '🦡', name: '赫奇帕奇' }
            ].map((house, index) => (
              <div
                key={house.name}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 hover:border-amber-500/50 transition-all hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2">{house.emoji}</div>
                <div className="text-amber-200 text-sm font-medium">{house.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

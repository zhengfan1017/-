
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuizStore } from '@/hooks/useQuizStore';
import { HOUSES, House } from '@/utils/houses';
import { RotateCcw, Sparkles, Share2 } from 'lucide-react';

const Result = () => {
  const navigate = useNavigate();
  const { isComplete, getDominantHouse, calculateResults, resetQuiz } = useQuizStore();

  useEffect(() => {
    if (!isComplete()) {
      navigate('/quiz');
    }
  }, [isComplete, navigate]);

  const dominantHouse = getDominantHouse();
  const results = calculateResults();
  const houseData = HOUSES[dominantHouse];

  const handleRestart = () => {
    resetQuiz();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '我的霍格沃茨学院',
          text: `我被分到了${houseData.name}！✨ 你属于哪个学院呢？`,
          url: window.location.origin
        });
      } else {
        await navigator.clipboard.writeText(
          `我被分到了${houseData.name}！✨ 你属于哪个学院呢？来测试一下吧！`
        );
        alert('结果已复制到剪贴板！');
      }
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  const sortedHouses = (Object.keys(HOUSES) as House[]).sort(
    (a, b) => results[b] - results[a]
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-950 ${houseData.bgGradient} to-slate-950 p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="animate-bounce">
              <span className="text-9xl md:text-[12rem]">{houseData.emoji}</span>
            </div>
            <div className="absolute -top-4 -right-4 animate-pulse">
              <Sparkles className="h-10 w-10 text-yellow-400" />
            </div>
          </div>

          <p className="text-amber-300 text-lg mb-2 tracking-widest uppercase">
            分院帽决定...
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 mb-4 drop-shadow-lg">
            {houseData.name}
          </h1>
          <p className="text-2xl text-amber-100">{houseData.element}元素</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-amber-200 mb-4">学院简介</h2>
            <p className="text-slate-200 leading-relaxed mb-6">
              {houseData.description}
            </p>

            <h3 className="text-lg font-semibold text-amber-300 mb-3">性格特质</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {houseData.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 bg-amber-500/20 text-amber-200 rounded-full text-sm border border-amber-500/30"
                >
                  {trait}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-amber-300 mb-3">同院名人</h3>
            <div className="flex flex-wrap gap-2">
              {houseData.characters.map((character) => (
                <span
                  key={character}
                  className="px-4 py-2 bg-slate-700/50 text-slate-200 rounded-full text-sm border border-slate-600/50"
                >
                  {character}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-amber-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-amber-200 mb-6">学院匹配度</h2>
            <div className="space-y-6">
              {sortedHouses.map((house) => {
                const data = HOUSES[house];
                const percentage = results[house];
                const isDominant = house === dominantHouse;

                return (
                  <div key={house} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{data.emoji}</span>
                        <span className={`font-semibold ${isDominant ? 'text-amber-200' : 'text-slate-300'}`}>
                          {data.name}
                        </span>
                      </div>
                      <span className={`font-bold text-xl ${isDominant ? 'text-amber-400' : 'text-slate-400'}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 rounded-full ${
                          isDominant
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
                            : 'bg-slate-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
          >
            <Share2 className="h-6 w-6" />
            <span>分享结果</span>
          </button>

          <Link to="/" onClick={handleRestart}>
            <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-500/30 transform hover:scale-105 transition-all duration-300">
              <RotateCcw className="h-6 w-6" />
              <span>重新测试</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { houseInfo } from '@/utils/houses';
import { House } from '@/utils/types';

export default function Result() {
  const navigate = useNavigate();
  const { selectedHouse, scores, reset } = useAppStore();
  const [animatedPercentages, setAnimatedPercentages] = useState<Record<House, number>>({
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0
  });

  useEffect(() => {
    if (!selectedHouse) {
      navigate('/');
      return;
    }

    // 计算百分比
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const percentages = {
      gryffindor: Math.round((scores.gryffindor / totalScore) * 100),
      slytherin: Math.round((scores.slytherin / totalScore) * 100),
      ravenclaw: Math.round((scores.ravenclaw / totalScore) * 100),
      hufflepuff: Math.round((scores.hufflepuff / totalScore) * 100)
    };

    // 动画：数字从0到目标值
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = 1000 / steps;
    
    const timer = setInterval(() => {
      current += increment;
      const progress = Math.min(current / duration, 1);
      
      setAnimatedPercentages({
        gryffindor: Math.round(percentages.gryffindor * progress),
        slytherin: Math.round(percentages.slytherin * progress),
        ravenclaw: Math.round(percentages.ravenclaw * progress),
        hufflepuff: Math.round(percentages.hufflepuff * progress)
      });
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, [selectedHouse, scores, navigate]);

  const handleRestart = () => {
    reset();
    navigate('/');
  };

  if (!selectedHouse) return null;

  const house = houseInfo[selectedHouse];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ background: `linear-gradient(to bottom, ${house.colors.primary}33, #16213e)` }}>
      {/* 星光背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-100 opacity-20"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* 学院徽章 */}
        <div className="mb-8 animate-bounce">
          <div className="text-9xl md:text-[12rem]">{house.emoji}</div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif" style={{ color: house.colors.secondary }}>
          你属于 {house.name}！
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          {house.description}
        </p>

        {/* 百分比显示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(Object.keys(houseInfo) as House[]).map((h) => (
            <div
              key={h}
              className="bg-[#2a2a4a] rounded-xl p-4 border"
              style={{ borderColor: houseInfo[h].colors.primary + '66' }}
            >
              <div className="text-4xl mb-2">{houseInfo[h].emoji}</div>
              <div className="text-lg font-bold mb-1" style={{ color: houseInfo[h].colors.secondary }}>
                {houseInfo[h].name}
              </div>
              <div className="text-2xl font-bold text-white">
                {animatedPercentages[h]}%
              </div>
            </div>
          ))}
        </div>

        {/* 代表人物 */}
        <div className="mb-8">
          <h3 className="text-xl text-gray-400 mb-3">代表人物</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {house.characters.map((char, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-[#3a3a5a] rounded-full text-gray-200"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* 重新测试按钮 */}
        <button
          onClick={handleRestart}
          className="px-10 py-3 bg-gradient-to-r from-[#740001] to-[#9e1e23] text-white text-xl font-bold rounded-full 
                     hover:shadow-[0_0_30px_rgba(238,186,48,0.6)] hover:scale-105 transition-all duration-300 
                     border-2 border-yellow-400 cursor-pointer"
        >
          重新测试
        </button>
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

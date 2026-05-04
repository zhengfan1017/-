import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

export default function Home() {
  const navigate = useNavigate();
  const reset = useAppStore((state) => state.reset);

  const handleStart = () => {
    reset();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      {/* 星光背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-100 opacity-30"
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

      {/* 主内容 */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-8 animate-bounce">
          <div className="text-8xl md:text-9xl">🎩</div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4 font-serif">
          分院帽测试器
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          戴上分院帽，让它来决定你属于霍格沃茨的哪个学院！<br />
          回答12道问题，看看你是格兰芬多、斯莱特林、拉文克劳还是赫奇帕奇？
        </p>
        
        <button
          onClick={handleStart}
          className="px-12 py-4 bg-gradient-to-r from-[#740001] to-[#9e1e23] text-white text-xl md:text-2xl font-bold rounded-full 
                     hover:shadow-[0_0_30px_rgba(238,186,48,0.6)] hover:scale-105 transition-all duration-300 
                     border-2 border-yellow-400 cursor-pointer"
        >
          开始测试
        </button>
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

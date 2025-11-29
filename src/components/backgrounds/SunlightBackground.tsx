import React from 'react';

const SunlightBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 主光源 - 左上角大型柔和光暈 */}
        <div className="absolute sunlight-main" style={{
          width: '80vw',
          height: '80vw',
          top: '-30%',
          left: '-20%',
        }} />

        {/* 次光源 - 稍小的散射光 */}
        <div className="absolute sunlight-secondary sunlight-anim-1" style={{
          width: '45vw',
          height: '45vw',
          top: '-5%',
          left: '5%',
        }} />

        {/* 光暈散射 1 - 帶彩虹色 */}
        <div className="absolute sunlight-bokeh sunlight-anim-2" style={{
          width: '25vw',
          height: '25vw',
          top: '15%',
          left: '20%',
        }} />

        {/* 光暈散射 2 */}
        <div className="absolute sunlight-bokeh sunlight-anim-3" style={{
          width: '18vw',
          height: '18vw',
          top: '35%',
          left: '8%',
        }} />

        {/* 光暈散射 3 - 延伸到中央 */}
        <div className="absolute sunlight-bokeh-soft sunlight-anim-4" style={{
          width: '30vw',
          height: '30vw',
          top: '20%',
          left: '35%',
        }} />

        {/* 小型光點 1 */}
        <div className="absolute sunlight-sparkle sunlight-anim-5" style={{
          width: '8vw',
          height: '8vw',
          top: '10%',
          left: '40%',
        }} />

        {/* 小型光點 2 */}
        <div className="absolute sunlight-sparkle sunlight-anim-6" style={{
          width: '6vw',
          height: '6vw',
          top: '45%',
          left: '15%',
        }} />

        {/* 小型光點 3 */}
        <div className="absolute sunlight-sparkle sunlight-anim-7" style={{
          width: '5vw',
          height: '5vw',
          top: '25%',
          left: '55%',
        }} />

        {/* 光束延伸 - 斜向 */}
        <div className="absolute sunlight-ray sunlight-anim-8" style={{
          width: '120vw',
          height: '40vw',
          top: '-10%',
          left: '-30%',
          transform: 'rotate(-25deg)',
        }} />

        {/* 彩虹光暈 - 微弱 */}
        <div className="absolute sunlight-rainbow sunlight-anim-9" style={{
          width: '35vw',
          height: '35vw',
          top: '5%',
          left: '25%',
        }} />
      </div>

      <style>{`
        /* 主光源 - 大型強烈暖光 */
        .sunlight-main {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.85) 0%,
            rgba(255,255,240,0.7) 15%,
            rgba(255,250,220,0.5) 30%,
            rgba(255,245,200,0.3) 50%,
            rgba(255,240,180,0.15) 70%,
            transparent 85%
          );
          filter: blur(30px);
          mix-blend-mode: screen;
          animation: sunlightBreath 6s ease-in-out infinite;
        }

        /* 次光源 - 集中的強光暈 */
        .sunlight-secondary {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.9) 0%,
            rgba(255,255,250,0.7) 20%,
            rgba(255,252,235,0.45) 40%,
            rgba(255,248,220,0.2) 60%,
            transparent 80%
          );
          filter: blur(25px);
          mix-blend-mode: screen;
        }

        /* 散射光暈 - bokeh 效果 */
        .sunlight-bokeh {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.95) 0%,
            rgba(255,255,255,0.7) 15%,
            rgba(255,255,250,0.5) 30%,
            rgba(200,230,255,0.3) 50%,
            rgba(255,220,240,0.15) 70%,
            transparent 85%
          );
          filter: blur(15px);
          mix-blend-mode: screen;
        }

        /* 柔和散射光 */
        .sunlight-bokeh-soft {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.7) 0%,
            rgba(255,255,250,0.5) 25%,
            rgba(255,250,240,0.35) 45%,
            rgba(240,248,255,0.2) 65%,
            transparent 85%
          );
          filter: blur(30px);
          mix-blend-mode: screen;
        }

        /* 小型閃爍光點 - 更亮 */
        .sunlight-sparkle {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,1) 0%,
            rgba(255,255,255,0.8) 20%,
            rgba(255,255,255,0.5) 40%,
            rgba(255,250,240,0.25) 60%,
            transparent 80%
          );
          filter: blur(5px);
          mix-blend-mode: screen;
        }

        /* 斜向光束 - 更明顯 */
        .sunlight-ray {
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.4) 0%,
            rgba(255,255,240,0.25) 25%,
            rgba(255,250,230,0.12) 45%,
            rgba(255,248,220,0.05) 65%,
            transparent 80%
          );
          filter: blur(20px);
          mix-blend-mode: screen;
        }

        /* 彩虹色光暈 - 更鮮明 */
        .sunlight-rainbow {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.4) 0%,
            rgba(255,220,220,0.25) 20%,
            rgba(220,255,220,0.2) 40%,
            rgba(220,220,255,0.15) 60%,
            transparent 80%
          );
          filter: blur(20px);
          mix-blend-mode: screen;
        }

        /* 陽光呼吸動畫 - 主光源 */
        @keyframes sunlightBreath {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        /* 陽光漂移動畫 */
        @keyframes sunlightDrift1 {
          0%, 100% { opacity: 0.35; transform: translate(0, 0) scale(1); }
          30% { opacity: 1; transform: translate(3%, 5%) scale(1.15); }
          70% { opacity: 0.6; transform: translate(-2%, 3%) scale(1.05); }
        }

        @keyframes sunlightDrift2 {
          0%, 100% { opacity: 0.3; transform: translate(0, 0) scale(1); }
          40% { opacity: 1; transform: translate(5%, -3%) scale(1.2); }
          80% { opacity: 0.45; transform: translate(2%, 4%) scale(0.95); }
        }

        @keyframes sunlightDrift3 {
          0%, 100% { opacity: 0.35; transform: translate(0, 0) scale(1); }
          50% { opacity: 1; transform: translate(-4%, 6%) scale(1.18); }
        }

        @keyframes sunlightDrift4 {
          0%, 100% { opacity: 0.25; transform: translate(0, 0) scale(1); }
          35% { opacity: 0.9; transform: translate(6%, 4%) scale(1.25); }
          70% { opacity: 0.4; transform: translate(3%, -2%) scale(1.08); }
        }

        /* 光點閃爍動畫 */
        @keyframes sunlightSparkle1 {
          0%, 100% { opacity: 0.15; transform: scale(0.6); }
          25% { opacity: 1; transform: scale(1.3); }
          50% { opacity: 0.3; transform: scale(0.9); }
          75% { opacity: 0.95; transform: scale(1.15); }
        }

        @keyframes sunlightSparkle2 {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          30% { opacity: 0.1; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.4); }
        }

        @keyframes sunlightSparkle3 {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        /* 光束漂移動畫 */
        @keyframes sunlightRayDrift {
          0%, 100% { opacity: 0.3; transform: rotate(-25deg) translate(0, 0); }
          50% { opacity: 0.85; transform: rotate(-23deg) translate(2%, 3%); }
        }

        /* 彩虹光暈動畫 */
        @keyframes sunlightRainbow {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(1.15) rotate(5deg); }
        }

        /* 套用動畫到元素 */
        .sunlight-anim-1 { animation: sunlightDrift1 8s ease-in-out infinite; }
        .sunlight-anim-2 { animation: sunlightDrift2 10s ease-in-out infinite; animation-delay: -2s; }
        .sunlight-anim-3 { animation: sunlightDrift3 7s ease-in-out infinite; animation-delay: -3s; }
        .sunlight-anim-4 { animation: sunlightDrift4 12s ease-in-out infinite; animation-delay: -2s; }
        .sunlight-anim-5 { animation: sunlightSparkle1 4s ease-in-out infinite; animation-delay: -1s; }
        .sunlight-anim-6 { animation: sunlightSparkle2 5s ease-in-out infinite; animation-delay: -2s; }
        .sunlight-anim-7 { animation: sunlightSparkle3 3.5s ease-in-out infinite; animation-delay: -1.5s; }
        .sunlight-anim-8 { animation: sunlightRayDrift 12s ease-in-out infinite; }
        .sunlight-anim-9 { animation: sunlightRainbow 9s ease-in-out infinite; animation-delay: -4s; }
      `}</style>
    </>
  );
};

export default SunlightBackground;

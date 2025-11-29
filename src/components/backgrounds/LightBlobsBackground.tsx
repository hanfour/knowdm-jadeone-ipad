import React from 'react';

const LightBlobsBackground: React.FC = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 大型光斑 2 */}
        <div className="absolute light-blob light-2" style={{
          width: '20vw',
          height: '20vw',
          top: '40%',
          right: '60%',
        }} />
        {/* 中型光斑 3 */}
        <div className="absolute light-blob light-3" style={{
          width: '25vw',
          height: '25vw',
          bottom: '10%',
          right: '20%',
        }} />
        {/* 中型光斑 4 */}
        <div className="absolute light-blob light-4" style={{
          width: '15vw',
          height: '15vw',
          top: '70%',
          left: '0%',
        }} />
        {/* 小型光斑 6 - 帶彩虹色 */}
        <div className="absolute light-blob-rainbow light-6" style={{
          width: '30vw',
          height: '30vw',
          top: '50%',
          left: '40%',
        }} />
        {/* 橢圓光帶 8 */}
        <div className="absolute light-streak light-8" style={{
          width: '60vw',
          height: '20vw',
          bottom: '30%',
          right: '-10%',
        }} />
      </div>

      <style>{`
        /* 圓形光斑 - 帶彩虹色漸層，柔和亮度 */
        .light-blob {
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.3) 0%,
            rgba(200,230,255,0.23) 12%,
            rgba(255,200,230,0.17) 28%,
            rgba(200,255,230,0.15) 48%,
            rgba(230,200,255,0.09) 65%,
            transparent 80%
          );
          filter: blur(20px) brightness(1.8);
          mix-blend-mode: screen;
        }

        /* 帶更強彩虹色的光斑 */
        .light-blob-rainbow {
          border-radius: 20%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.5) 0%,
            rgba(150,200,255,0.42) 10%,
            rgba(255,150,220,0.36) 25%,
            rgba(150,255,200,0.3) 42%,
            rgba(255,230,150,0.26) 58%,
            transparent 75%
          );
          filter: blur(30px);
          mix-blend-mode: screen;
        }

        /* 橢圓光帶 - 也加入彩虹色 */
        .light-streak {
          border-radius: 30%;
          background: radial-gradient(ellipse 100% 50%,
            rgba(255,255,255,0.22) 0%,
            rgba(180,220,255,0.15) 18%,
            rgba(255,180,220,0.1) 38%,
            rgba(180,255,220,0.06) 55%,
            transparent 70%
          );
          filter: blur(10px);
          mix-blend-mode: screen;
        }

        /* 光斑飄動動畫 */
        @keyframes lightDrift2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          30% { transform: translate(18%, -15%) scale(1.2); opacity: 0.85; }
          60% { transform: translate(10%, -25%) scale(0.9); opacity: 0.5; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        }
        @keyframes lightDrift3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          50% { transform: translate(-20%, -18%) scale(1.3); opacity: 0.95; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
        }
        @keyframes lightDrift4 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          35% { transform: translate(20%, 15%) scale(1.25); opacity: 0.8; }
          70% { transform: translate(15%, 25%) scale(0.85); opacity: 0.4; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
        }
        @keyframes lightDrift6 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(-12%, 20%) scale(1.4); opacity: 0.85; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
        }
        @keyframes lightDrift8 {
          0% { transform: translate(0, 0) rotate(10deg) scale(1); opacity: 0.25; }
          50% { transform: translate(15%, -12%) rotate(-5deg) scale(1.15); opacity: 0.7; }
          100% { transform: translate(0, 0) rotate(10deg) scale(1); opacity: 0.25; }
        }

        .light-2 { animation: lightDrift2 14s ease-in-out infinite; animation-delay: -2s; }
        .light-3 { animation: lightDrift3 7s ease-in-out infinite; animation-delay: -4s; }
        .light-4 { animation: lightDrift4 9s ease-in-out infinite; animation-delay: -1s; }
        .light-6 { animation: lightDrift6 8s ease-in-out infinite; animation-delay: -5s; }
        .light-8 { animation: lightDrift8 10s ease-in-out infinite; animation-delay: -6s; }
      `}</style>
    </>
  );
};

export default LightBlobsBackground;

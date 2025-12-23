import React, { useMemo } from 'react';

interface LightRaysBackgroundProps {
  // 光線數量
  rayCount?: number;
  // 光線顏色 RGB（預設白色）
  rayColor?: string;
  // 動畫速度（秒）
  animationDuration?: number;
  // 光線角度（deg）
  angle?: number;
  // 整體透明度
  opacity?: number;
}

const LightRaysBackground: React.FC<LightRaysBackgroundProps> = ({
  rayCount = 8,
  rayColor = '245, 230, 184', // 白色 RGB
  animationDuration = 5,
  angle = -65,
  opacity = 0.75,
}) => {
  // 使用 useMemo 固定光線配置，避免 re-render 時重新生成隨機值
  const rays = useMemo(() => {
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: rayCount }, (_, i) => ({
      id: i,
      left: `${5 + (i * 90) / rayCount}%`,
      width: 80 + seededRandom(i * 3 + 1) * 250, // 80-330px 寬度
      delay: seededRandom(i * 3 + 2) * animationDuration, // 隨機延遲
      baseOpacity: 0.2 + seededRandom(i * 3 + 3) * 0.4, // 0.2-0.6 透明度
    }));
  }, [rayCount, animationDuration]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* 光線容器 */}
      <div
        className="absolute inset-0"
        style={{ transform: `rotate(${angle}deg) scale(1.5)` }}
      >
        {rays.map(ray => (
          <div
            key={ray.id}
            className="light-ray"
            style={{
              position: 'absolute',
              left: ray.left,
              top: '-50%',
              width: `${ray.width}px`,
              height: '200%',
              background: `linear-gradient(
                90deg,
                transparent 0%,
                rgba(${rayColor}, ${ray.baseOpacity * 0.2}) 15%,
                rgba(${rayColor}, ${ray.baseOpacity * 0.6}) 35%,
                rgba(${rayColor}, ${ray.baseOpacity}) 50%,
                rgba(${rayColor}, ${ray.baseOpacity * 0.6}) 65%,
                rgba(${rayColor}, ${ray.baseOpacity * 0.2}) 85%,
                transparent 100%
              )`,
              filter: 'blur(15px)',
              animationName: 'rayPulse',
              animationDuration: `${animationDuration}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${-ray.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 動畫樣式 */}
      <style>{`
        @keyframes rayPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-15px) scaleX(0.9);
          }
          50% {
            opacity: 1;
            transform: translateX(15px) scaleX(1.15);
          }
        }
      `}</style>
    </div>
  );
};

export default LightRaysBackground;

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface RippleConfig {
  x: number;
  y: number;
  id: number;
  startTime: number;
}

interface RippleBackgroundProps {
  backgroundImage?: string; // 背景圖片
  rippleColors?: string[]; // 波紋漸層顏色陣列，例如 ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0)']
  rippleDuration?: number; // 波紋持續時間（毫秒）
  maxRippleSize?: number; // 最大波紋尺寸（vw）
  autoRipple?: boolean; // 是否自動產生波紋
  autoRippleInterval?: number; // 自動波紋間隔（毫秒）
  overlayGradient?: string; // 覆蓋層漸層
  onClick?: boolean; // 是否響應點擊產生波紋
}

const RippleBackground: React.FC<RippleBackgroundProps> = ({
  backgroundImage,
  rippleColors = ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)'],
  rippleDuration = 3000,
  maxRippleSize = 150,
  autoRipple = true,
  autoRippleInterval = 2000,
  overlayGradient = 'linear-gradient(to left, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)',
  onClick = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<RippleConfig[]>([]);
  const rippleIdRef = useRef(0);

  // 建立波紋
  const createRipple = useCallback((x: number, y: number) => {
    const newRipple: RippleConfig = {
      x,
      y,
      id: rippleIdRef.current++,
      startTime: Date.now(),
    };
    setRipples(prev => [...prev, newRipple]);

    // 在動畫結束後移除波紋
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, rippleDuration);
  }, [rippleDuration]);

  // 點擊產生波紋
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    createRipple(x, y);
  }, [onClick, createRipple]);

  // 自動產生波紋
  useEffect(() => {
    if (!autoRipple) return;

    const generateAutoRipple = () => {
      // 隨機位置產生波紋
      const x = 20 + Math.random() * 60; // 在 20%-80% 範圍內
      const y = 20 + Math.random() * 60;
      createRipple(x, y);
    };

    // 初始波紋
    const initialTimeout = setTimeout(generateAutoRipple, 500);

    // 定時產生波紋
    const interval = setInterval(generateAutoRipple, autoRippleInterval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [autoRipple, autoRippleInterval, createRipple]);

  // 生成波紋漸層 CSS
  const generateRippleGradient = () => {
    const stops = rippleColors.map((color, index) => {
      const position = (index / (rippleColors.length - 1)) * 100;
      return `${color} ${position}%`;
    }).join(', ');
    return `radial-gradient(circle, ${stops})`;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* 背景圖片 */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* 波紋容器 */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full animate-ripple"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              transform: 'translate(-50%, -50%)',
              background: generateRippleGradient(),
              '--ripple-duration': `${rippleDuration}ms`,
              '--ripple-max-size': `${maxRippleSize}vw`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 覆蓋層漸層 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayGradient }}
      />

      {/* 全域動畫樣式 */}
      <style>{`
        @keyframes ripple-expand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: var(--ripple-max-size);
            height: var(--ripple-max-size);
            opacity: 0;
          }
        }

        .animate-ripple {
          animation: ripple-expand var(--ripple-duration) ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RippleBackground;

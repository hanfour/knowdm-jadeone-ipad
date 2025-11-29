import React from 'react';

interface AuroraBackgroundProps {
  // 條紋顏色（預設白色）
  stripeColor?: string;
  // 彩虹漸層顏色陣列
  gradientColors?: string[];
  // 動畫持續時間（秒）
  animationDuration?: number;
  // 模糊程度
  blurAmount?: number;
  // 是否反轉顏色
  invert?: boolean;
  // 飽和度（%）
  saturation?: number;
  // 透明度（%）
  opacity?: number;
  // 遮罩位置：'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'full'
  maskPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'full';
  // 背景圖片（可選，會疊加在效果上方）
  backgroundImage?: string;
  // 覆蓋層漸層
  overlayGradient?: string;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  stripeColor = '#fff',
  gradientColors = ['#60a5fa', '#e879f9', '#60a5fa', '#5eead4', '#60a5fa'],
  animationDuration = 60,
  blurAmount = 10,
  invert = true,
  saturation = 100,
  opacity = 100,
  maskPosition = 'top-right',
  backgroundImage,
  overlayGradient = 'linear-gradient(to left, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent)',
}) => {

  // 生成遮罩
  const getMaskImage = () => {
    switch (maskPosition) {
      case 'top-right':
        return 'radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)';
      case 'top-left':
        return 'radial-gradient(ellipse at 0% 0%, black 40%, transparent 70%)';
      case 'bottom-right':
        return 'radial-gradient(ellipse at 100% 100%, black 40%, transparent 70%)';
      case 'bottom-left':
        return 'radial-gradient(ellipse at 0% 100%, black 40%, transparent 70%)';
      case 'center':
        return 'radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%)';
      case 'full':
        return 'none';
      default:
        return 'radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)';
    }
  };

  const stripesGradient = `repeating-linear-gradient(
    100deg,
    ${stripeColor} 0%,
    ${stripeColor} 7%,
    transparent 10%,
    transparent 12%,
    ${stripeColor} 16%
  )`;

  // 為每個顏色生成漸層停止點
  const rainbowWithStops = `repeating-linear-gradient(
    100deg,
    ${gradientColors[0]} 10%,
    ${gradientColors[1] || gradientColors[0]} 15%,
    ${gradientColors[2] || gradientColors[0]} 20%,
    ${gradientColors[3] || gradientColors[0]} 25%,
    ${gradientColors[4] || gradientColors[0]} 30%
  )`;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 主要極光效果層 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `${stripesGradient}, ${rainbowWithStops}`,
          backgroundSize: '300% 100%, 200% 100%',
          backgroundPosition: '50% 50%, 50% 50%',
          filter: `blur(${blurAmount}px) ${invert ? 'invert(100%)' : ''} saturate(${saturation}%) opacity(${opacity}%)`,
          maskImage: getMaskImage(),
          WebkitMaskImage: getMaskImage(),
        }}
      />

      {/* 動畫疊加層 */}
      <div
        className="absolute inset-0 aurora-animate"
        style={{
          backgroundImage: `${stripesGradient}, ${rainbowWithStops}`,
          backgroundSize: '200% 100%, 100% 100%',
          backgroundAttachment: 'fixed',
          mixBlendMode: 'difference',
          '--animation-duration': `${animationDuration}s`,
        } as React.CSSProperties}
      />

      {/* 背景圖片層（可選） */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            mixBlendMode: 'overlay',
            opacity: 0.5,
          }}
        />
      )}

      {/* 覆蓋層漸層 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayGradient }}
      />

      {/* 動畫樣式 */}
      <style>{`
        @keyframes smoothBg {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }

        .aurora-animate {
          animation: smoothBg var(--animation-duration, 60s) linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;

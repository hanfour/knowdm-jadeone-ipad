import React, { useEffect, useRef, useState } from 'react';

interface ParallaxCarouselBackgroundProps {
  images: string[];
  autoPlayInterval?: number; // 自動輪播間隔（毫秒），設為 0 則不自動輪播
  parallaxIntensity?: number; // 視差效果強度，預設 30
  currentIndex?: number; // 外部控制的當前索引
  onIndexChange?: (index: number) => void; // 索引變化回調
}

const ParallaxCarouselBackground: React.FC<ParallaxCarouselBackgroundProps> = ({
  images,
  autoPlayInterval = 0,
  parallaxIntensity = 30,
  currentIndex: externalIndex,
  onIndexChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalIndex, setInternalIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 使用外部索引或內部索引
  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;

  // 自動輪播
  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      if (externalIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onIndexChange?.(newIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, currentIndex, images.length, externalIndex, onIndexChange]);

  // 滑鼠/觸控移動追蹤（視差效果）- 持續監聽，平滑過渡
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // 平滑插值函數
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // 動畫循環
    const animate = () => {
      currentX = lerp(currentX, targetX, 0.05);
      currentY = lerp(currentY, targetY, 0.05);

      setMousePosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        targetY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (containerRef.current && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = containerRef.current.getBoundingClientRect();
        targetX = (touch.clientX - rect.left - rect.width / 2) / rect.width;
        targetY = (touch.clientY - rect.top - rect.height / 2) / rect.height;
      }
    };

    // 開始動畫循環
    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-[-50px] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${-mousePosition.x * parallaxIntensity}px, ${-mousePosition.y * parallaxIntensity}px) scale(1.1)`,
        }}
      >
        {images.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt={`背景 ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      {/* 右側漸層遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-transparent" />
    </div>
  );
};

export default ParallaxCarouselBackground;

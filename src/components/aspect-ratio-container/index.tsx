import React, { useState, useEffect, useRef } from 'react';

interface AspectRatioContainerProps {
  children: React.ReactNode;
  baseWidth?: number;   // 設計稿基準寬度
  baseHeight?: number;  // 設計稿基準高度
}

const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({
  children,
  baseWidth = 1920,
  baseHeight = 1080,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: baseWidth, height: baseHeight, scale: 1 });

  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = baseWidth / baseHeight; // 16:9
      const windowRatio = windowWidth / windowHeight;

      let displayWidth: number;
      let displayHeight: number;
      let scaleValue: number;

      if (windowRatio > aspectRatio) {
        // 視窗比較寬（如橫向桌面），以高度為基準
        displayHeight = windowHeight;
        displayWidth = windowHeight * aspectRatio;
        scaleValue = windowHeight / baseHeight;
      } else {
        // 視窗比較高（如直向手機），以寬度為基準
        displayWidth = windowWidth;
        displayHeight = windowWidth / aspectRatio;
        scaleValue = windowWidth / baseWidth;
      }

      setDimensions({
        width: displayWidth,
        height: displayHeight,
        scale: scaleValue,
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, [baseWidth, baseHeight]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        {/* 內部容器使用固定的設計稿尺寸，然後縮放 */}
        <div
          style={{
            width: baseWidth,
            height: baseHeight,
            transform: `scale(${dimensions.scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AspectRatioContainer;

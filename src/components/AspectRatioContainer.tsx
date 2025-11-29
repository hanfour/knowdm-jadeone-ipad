import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface AspectRatioContainerProps {
  children: React.ReactNode;
  aspectRatio?: number; // 16:9 = 16/9
  baseWidth?: number;   // 設計稿基準寬度
}

// 擴展 CSSProperties 以支援 CSS 變數
interface CustomCSSProperties extends CSSProperties {
  '--scale'?: number;
}

const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({
  children,
  aspectRatio = 16 / 9,
  baseWidth = 1920, // 以 1920x1080 為設計基準
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, scale: 1 });

  useEffect(() => {
    const calculateDimensions = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const windowRatio = windowWidth / windowHeight;

      let width: number;
      let height: number;

      if (windowRatio > aspectRatio) {
        // 視窗太寬，以高度為基準
        height = windowHeight;
        width = height * aspectRatio;
      } else {
        // 視窗太高，以寬度為基準
        width = windowWidth;
        height = width / aspectRatio;
      }

      // 計算縮放比例（相對於設計稿基準寬度）
      const scale = width / baseWidth;

      setDimensions({ width, height, scale });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, [aspectRatio, baseWidth]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          // 使用 CSS 變數傳遞縮放比例，讓子元件可以使用
          '--scale': dimensions.scale,
          // 設定基準字體大小，讓 rem 單位可以正確縮放
          fontSize: `${16 * dimensions.scale}px`,
        } as CustomCSSProperties}
      >
        {children}
      </div>
    </div>
  );
};

export default AspectRatioContainer;

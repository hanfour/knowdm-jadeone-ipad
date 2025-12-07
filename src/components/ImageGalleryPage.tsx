import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubpageMenuBar from './SubpageMenuBar';

interface ImageData {
  src: string;
  label: string;
}

interface ImageGalleryPageProps {
  images: ImageData[];
  title: string;
  description: string;
}

const ImageGalleryPage: React.FC<ImageGalleryPageProps> = ({ images, title, description }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  // 當路徑改變時，重置到第一張圖片
  useEffect(() => {
    setActiveIndex(0);
  }, [location.pathname]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 右上角子頁面導航列 + MenuButton */}
      <SubpageMenuBar />

      {/* 背景圖片 - 切換效果 */}
      <div className="absolute inset-0" style={{ top: '80px' }}>
        {images.map((image, index) => (
          <React.Fragment key={image.src}>
            <img
              src={image.src}
              alt={image.label}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* 右側漸層遮罩 - 僅第一張顯示 */}
            <div
              className={`absolute inset-0 bg-gradient-to-l from-[#0b2d2a]/15 to-transparent duration-700 ${
                activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          </React.Fragment>
        ))}
      </div>

      {/* 右側內容區 - 僅第一張圖顯示 */}
      <div
        className={`absolute right-0 bottom-0 w-1/2 flex items-center justify-center transition-opacity duration-500 ${
          activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '80px', padding: '4rem' }}
      >
        <div className="text-white" style={{ maxWidth: '32rem' }}>
          {/* 主標題 */}
          <h1
            className="font-light leading-tight"
            style={{ fontSize: '3rem', letterSpacing: '0.05em', marginBottom: '1rem' }}
          >
            {title}
          </h1>

          {/* 內文 */}
          <p
            className="text-white leading-relaxed"
            style={{ fontSize: '1rem', marginTop: '1.5rem', filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.25))' }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* 右下角縮圖選擇器 */}
      <div
        className="absolute z-20 flex flex-col items-end"
        style={{ right: '2rem', bottom: '2rem', gap: '0.5rem' }}
      >
        {/* 當前圖片標籤 - 固定在縮圖上方 */}
        <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span className="bg-white/60" style={{ width: '0.5rem', height: '0.5rem' }} />
          <span className="text-white" style={{ fontSize: '0.875rem', letterSpacing: '0.05em' }}>{images[activeIndex].label}</span>
        </div>

        {/* 縮圖網格 - 4 列排列 */}
        <div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setActiveIndex(index)}
              className="group relative"
            >
              {/* 縮圖容器 */}
              <div
                className="relative overflow-hidden transition-all duration-300 active:scale-105"
                style={{
                  width: '4rem',
                  height: '3rem',
                  opacity: index === activeIndex ? 1 : 0.6
                }}
              >
                {/* Shine 邊框效果 - 僅選中時顯示 */}
                {index === activeIndex && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 border border-white/40" />
                    <div className="absolute inset-0 shine-border" />
                  </div>
                )}

                {/* 縮圖 */}
                <img
                  src={image.src}
                  alt={image.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shine 邊框動畫 CSS */}
      <style>{`
        .shine-border {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shine 2s ease-in-out infinite;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
        }

        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

    </div>
  );
};

export default ImageGalleryPage;

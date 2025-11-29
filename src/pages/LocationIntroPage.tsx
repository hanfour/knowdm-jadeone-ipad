import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullscreenMenu from '../components/FullscreenMenu';

const images = [
  { src: '/images/a1/IMG_001.jpg', label: '水湳經貿園區' },
  { src: '/images/a1/IMG_002.jpg', label: '國際會展中心' },
  { src: '/images/a1/IMG_003.jpg', label: '綠美圖' },
  { src: '/images/a1/IMG_004.jpg', label: '水湳轉運站' },
];

const LocationIntroPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // 關閉按鈕：清除 sessionStorage 並回到首頁（播放開場動畫）
  const handleClose = () => {
    sessionStorage.removeItem('hasPlayedIntro');
    navigate('/');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 背景圖片 - 切換效果 */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* 右側漸層遮罩 */}
        <div className="absolute top-0 right-0 w-[65%] h-full bg-gradient-to-l from-[#0b2d2a]/90 to-transparent" />
      </div>

      {/* Logo - 左上 */}
      <div
        className="absolute z-20"
        style={{ top: '2rem', left: '2rem' }}
      >
        <Link to="/" className="block">
          <img
            src="/images/logo-white.svg"
            alt="聚碩仁玉"
            style={{ height: '4rem', width: 'auto' }}
          />
        </Link>
      </div>

      {/* 關閉按鈕 - 右上 */}
      <button
        onClick={handleClose}
        className="absolute z-20 text-white opacity-60 hover:opacity-100 transition-opacity"
        style={{ top: '2rem', right: '2rem' }}
      >
        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* MENU 按鈕 - 左側 */}
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-1/2 -translate-y-1/2 z-20 text-white flex flex-col items-center hover:opacity-70 transition-opacity"
        style={{ left: '2rem', gap: '1rem' }}
      >
        <div className="flex flex-col" style={{ gap: '0.375rem' }}>
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
        </div>
        <div className="writing-mode-vertical" style={{ fontSize: '0.75rem', letterSpacing: '0.3em' }}>MENU</div>
      </button>

      {/* BACK 按鈕 - 左下 */}
      <Link
        to="/"
        className="!hidden absolute z-20 text-white opacity-60 hover:opacity-100 transition-opacity"
        style={{ left: '2rem', bottom: '2rem', fontSize: '0.75rem', letterSpacing: '0.2em' }}
      >
        BACK
      </Link>

      {/* 右側內容區 - 僅第一張圖顯示 */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center transition-opacity duration-500 ${
          activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ padding: '4rem' }}
      >
        <div className="text-white" style={{ maxWidth: '32rem' }}>
          {/* 主標題 */}
          <h1
            className="font-light leading-tight"
            style={{ fontSize: '3rem', letterSpacing: '0.05em', marginBottom: '1rem' }}
          >
            齊步世界 亮眼軸線
          </h1>

          {/* 副標題 */}
          <p
            className="text-white drop-shadow-sm leading-relaxed"
            style={{ fontSize: '0.875rem', marginTop: '1.5rem' }}
          >
            對水湳經貿園區將以國際AI經貿城市的姿態，開啟大台中核心新未來，齊聚經貿、商業與文化藝術的國際化價值，奠定國際核心地位，全球注目時代標的，國際建築大師作品齊聚爭豔，大巨蛋、綠美圖、流行音樂中心、國際會展中心、水湳轉運站落址，產官學500億投資、創造千億經濟產值，運載全球 AI 科技產業能量，水湳智慧城重新定義國際生活價值。
          </p>
        </div>
      </div>

      {/* 右下角縮圖選擇器 */}
      <div
        className="absolute z-20 flex items-end"
        style={{ right: '2rem', bottom: '2rem', gap: '0.75rem' }}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setActiveIndex(index)}
            className="group relative"
          >
            {/* 縮圖容器 */}
            <div
              className="relative overflow-hidden transition-all duration-300"
              style={{
                width: index === activeIndex ? '5rem' : '4rem',
                height: index === activeIndex ? '3.5rem' : '3rem',
                opacity: index === activeIndex ? 1 : 0.7
              }}
            >
              {/* Shine 邊框效果 - 僅選中時顯示 */}
              {index === activeIndex && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* 邊框容器 */}
                  <div className="absolute inset-0 border border-white/40" />
                  {/* Shine 動畫效果 */}
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

        {/* 當前圖片標籤 */}
        <div className="flex items-center" style={{ gap: '0.5rem', marginLeft: '0.5rem' }}>
          <span className="bg-white/60" style={{ width: '0.5rem', height: '0.5rem' }} />
          <span className="text-white" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>{images[activeIndex].label}</span>
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

      {/* 全屏選單 */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default LocationIntroPage;

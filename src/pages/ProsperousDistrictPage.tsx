import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullscreenMenu from '../components/FullscreenMenu';
import { safeSessionStorage, STORAGE_KEYS } from '../utils/storage';

// 圖片資料
const images = [
  { src: '/images/a4/01_台積電.jpg', label: '台積電' },
  { src: '/images/a4/02_科琴橋.jpg', label: '科琴橋' },
  { src: '/images/a4/03_中清路商圈-星巴克.jpg', label: '中清路商圈-星巴克' },
  { src: '/images/a4/04_中清路商圈-愛買.jpg', label: '中清路商圈-愛買' },
  { src: '/images/a4/05_逢甲商圈.jpg', label: '逢甲商圈' },
  { src: '/images/a4/06_逢甲夜市.jpg', label: '逢甲夜市' },
  { src: '/images/a4/07_逢甲大學.jpg', label: '逢甲大學' },
  { src: '/images/a4/08_中國醫藥大學.jpg', label: '中國醫藥大學' },
];

const ProsperousDistrictPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // 關閉按鈕：清除 sessionStorage 並回到首頁（播放開場動畫）
  const handleClose = () => {
    safeSessionStorage.removeItem(STORAGE_KEYS.HAS_PLAYED_INTRO);
    navigate('/');
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* 背景圖片 - 切換效果 */}
      <div className="absolute inset-0">
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
            {index === 0 && (
              <div
                className={`absolute inset-0 bg-gradient-to-l from-[#0b2d2a]/40 via-[#0b2d2a]/20 to-transparent transition-opacity duration-700 ${
                  activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            )}
          </React.Fragment>
        ))}
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
            style={{ height: '5rem', width: 'auto' }}
          />
        </Link>
      </div>

      {/* 關閉按鈕 - 右上 */}
      <button
        onClick={handleClose}
        className="absolute z-20 text-white opacity-60 hover:opacity-100 active:opacity-100 transition-opacity"
        style={{ top: '2rem', right: '2rem' }}
        aria-label="返回首頁並播放開場動畫"
      >
        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* MENU 按鈕 - 左側 */}
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-1/2 -translate-y-1/2 z-20 text-white flex flex-col items-center hover:opacity-70 active:opacity-70 transition-opacity"
        style={{ left: '2rem', gap: '1rem' }}
        aria-label="開啟主選單"
      >
        <div className="flex flex-col" style={{ gap: '0.375rem' }} aria-hidden="true">
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
        </div>
        <div className="writing-mode-vertical" style={{ fontSize: '0.75rem', letterSpacing: '0.3em' }}>MENU</div>
      </button>

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
            涵養人文 豐饒商圈
          </h1>

          {/* 內文 */}
          <p
            className="text-white leading-relaxed"
            style={{ fontSize: '1rem', marginTop: '1.5rem', filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.25))' }}
          >
            緊鄰台中科技園區、74 快速道路與國道，迅速接軌七期、逢甲、12期生活圈，擁有最舒適的生活距離。生活採買約2分鐘抵達愛買、約6分鐘抵達西屯傳統市場、約10分鐘可達逢甲商圈，約5-10分鐘可抵達中清路商圈，富裕精華聚落，生活機能精彩奪目。
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

      {/* 全屏選單 */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default ProsperousDistrictPage;

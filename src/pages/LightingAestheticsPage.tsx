import React, { useState, useEffect } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';
import CloseButton from '../components/close-button';

// 作品圖片資料
const portfolioImages = [
  { src: '/images/b6/works/冠軍磁磚台中展示中心.jpg', label: '冠軍磁磚台中展示中心' },
  { src: '/images/b6/works/理合建設時光嶼.jpg', label: '理合建設 時光嶼' },
  { src: '/images/b6/works/惠宇建設千曦.jpg', label: '惠宇建設 千曦' },
  { src: '/images/b6/works/惠宇建設大其心.jpg', label: '惠宇建設 大其心' },
];

const LightingAestheticsPage: React.FC = () => {
  // 背景圖片 URL
  const backgroundImage = '/images/b6/lighting-bg.jpg';

  // ===== 飛入動畫設定 =====
  const charDelay = 0.12;  // 每個字的延遲時間（秒）- 較慢以產生交錯重疊效果
  const titleText = '光影共生';
  const subtitleText = '為城市而生的溫柔尺度';
  const subtitleStartDelay = titleText.length * charDelay + 0.2;

  // 動畫狀態
  const [isAnimated, setIsAnimated] = useState(false);

  // 頁面載入時觸發動畫
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 燈箱狀態
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    currentIndex: number;
  }>({
    isOpen: false,
    currentIndex: 0,
  });

  // 開啟燈箱（可指定起始圖片索引）
  const openLightbox = (index: number = 0) => {
    setLightbox({ isOpen: true, currentIndex: index });
  };

  // 關閉燈箱
  const closeLightbox = () => {
    setLightbox({ isOpen: false, currentIndex: 0 });
  };

  // 切換到指定圖片
  const goToImage = (index: number) => {
    setLightbox(prev => ({ ...prev, currentIndex: index }));
  };

  // 下一張
  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % portfolioImages.length,
    }));
  };

  // 上一張
  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + portfolioImages.length) % portfolioImages.length,
    }));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 循環漸變動畫 CSS */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .gradient-text-animate {
          background: linear-gradient(
            90deg,
            #d4a853 0%,
            #f5e6b8 25%,
            #ffffff 50%,
            #f5e6b8 75%,
            #d4a853 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }

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

      {/* 全螢幕背景圖片 */}
      <div
        className="absolute inset-0"
        style={{ top: '80px' }}
      >
        <img
          src={backgroundImage}
          alt="燈光設計背景"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'left center' }}
        />
        {/* 右側漸層遮罩 - 讓文字更清晰 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={1} />

      {/* 右側內容區 - 帶滿版高度半透明黑色遮罩 */}
      <div
        className="absolute right-0 h-full flex flex-col justify-center"
        style={{
          top: '80px',
          width: '45%',
        }}
      >
        {/* 滿版高度半透明黑色遮罩 */}
        <div
          className="absolute inset-0 bg-black/0"
        />

        {/* 內容 */}
        <div
          className="relative z-10 flex flex-col justify-center h-full"
          style={{
            padding: '4rem',
            paddingRight: '6%',
          }}
        >
          {/* 標題區 */}
          <div className="mb-4">
            <p
              className="text-[#f5e6b8] text-large font-medium"
              style={{
                letterSpacing: '0.15em',
              }}
            >
              <span className="italic text-small">燈光設計 / </span>
              <br/>
              偶得設計
            </p>
          </div>

          {/* 主要描述文字 */}
          <div
            className="text-white/85 text-body text-justify leading-relaxed"
            style={{
              maxWidth: '28rem',
            }}
          >
            <p className="text-justify">
              以光為筆，為建築描繪一種介於城市與自然之間的從容姿態。一面溫潤靜謐，一面鮮明有力，讓建築在日與夜的轉換中，始終保持恰到好處的尺度。當步行自公園歸返，東向立面以低色溫燈光層層鋪展，宛如樹影輕落，溫柔勾勒建築輪廓；入口暖光靜靜迎候，如同家人佇立門前，在回家的一瞬間，歸屬感與安心感自然湧現。頂部光帶如一頂內斂的冠冕，為水湳夜景留下最耀眼的歸心之所。
            </p>
          </div>

          {/* 底部按鈕 - 作品代表，點擊開啟燈箱 */}
          <div className="mt-12">
            <div
              className="inline-flex flex-col items-start border border-white/30 px-8 py-4 bg-white/10 backdrop-blur-sm"
              style={{ letterSpacing: '0.08em' }}
            >
              <span
                className="gradient-text-animate text-small"
              >
                作品代表<br/>
                <span onClick={() => openLightbox(0)} className="cursor-pointer hover:underline">冠軍磁磚台中展示中心</span>、
                <span onClick={() => openLightbox(1)} className="cursor-pointer hover:underline">理合建設 時光嶼</span><br/>
                <span onClick={() => openLightbox(2)} className="cursor-pointer hover:underline">惠宇建設 千曦</span>、
                <span onClick={() => openLightbox(3)} className="cursor-pointer hover:underline">惠宇建設 大其心</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 橫向飛入文字區域 - 左下角 */}
      <div
        className="absolute z-10 flex flex-col items-start"
        style={{
          left: '6%',
          bottom: '12%',
        }}
      >
        {/* 第一行：光影共生 - 橫排，每字從左上飛入 */}
        <h2
          className="text-white text-h2 font-light"
          style={{
            letterSpacing: '0.2em',
          }}
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                textShadow: '2px 2px 15px rgba(0,0,0,0.7)',
                transform: isAnimated
                  ? 'translate(0, 0) scale(1)'
                  : 'translate(-100px, -100px) scale(1.8)',
                opacity: isAnimated ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * charDelay}s, opacity 0.6s ease-out ${index * charDelay}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* 第二行：為城市而生的溫柔尺度 - 橫排，每字從左上飛入 */}
        <h2
          className="text-white text-h2 font-light"
          style={{
            letterSpacing: '0.2em',
          }}
        >
          {subtitleText.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                textShadow: '2px 2px 15px rgba(0,0,0,0.7)',
                transform: isAnimated
                  ? 'translate(0, 0) scale(1)'
                  : 'translate(-100px, -100px) scale(1.8)',
                opacity: isAnimated ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${subtitleStartDelay + index * charDelay}s, opacity 0.6s ease-out ${subtitleStartDelay + index * charDelay}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* 燈箱 */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90"
          style={{ zIndex: 9999 }}
          onClick={closeLightbox}
        >
          {/* 主圖片區域 */}
          <div
            className="relative w-full h-full flex items-center justify-center p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 背景圖片 - 切換效果 */}
            {portfolioImages.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.label}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                  index === lightbox.currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <CloseButton onClick={(e) => { e.stopPropagation(); closeLightbox(); }} />

          {/* 上一張按鈕 */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            style={{ zIndex: 10 }}
            aria-label="上一張"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 下一張按鈕 */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            style={{ zIndex: 10 }}
            aria-label="下一張"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* 右下角縮圖選擇器 + 圖說 */}
          <div
            className="absolute z-20 flex flex-col items-end"
            style={{ right: '2rem', bottom: '2rem', gap: '0.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 當前圖片標籤 */}
            <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="bg-white/60" style={{ width: '0.5rem', height: '0.5rem' }} />
              <span className="text-white text-xsmall" style={{ letterSpacing: '0.05em' }}>
                {portfolioImages[lightbox.currentIndex].label}
              </span>
            </div>

            {/* 縮圖網格 - 最多 4 列 */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${Math.min(portfolioImages.length, 4)}, 1fr)`, gap: '0.5rem' }}
            >
              {portfolioImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => goToImage(index)}
                  className="group relative"
                >
                  {/* 縮圖容器 */}
                  <div
                    className="relative overflow-hidden transition-all duration-300 active:scale-105"
                    style={{
                      width: '4rem',
                      height: '3rem',
                      opacity: index === lightbox.currentIndex ? 1 : 0.6
                    }}
                  >
                    {/* Shine 邊框效果 - 僅選中時顯示 */}
                    {index === lightbox.currentIndex && (
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

          {/* 圖片計數器 */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm"
            style={{ zIndex: 10 }}
          >
            {lightbox.currentIndex + 1} / {portfolioImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default LightingAestheticsPage;

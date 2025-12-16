import React, { useState, useEffect } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

// 作品圖片資料（暫用 picsum.photos）
const portfolioImages = [
  { src: 'https://picsum.photos/2560/1440?random=1', label: '作品一' },
  { src: 'https://picsum.photos/2560/1440?random=2', label: '作品二' },
  { src: 'https://picsum.photos/2560/1440?random=3', label: '作品三' },
  { src: 'https://picsum.photos/2560/1440?random=4', label: '作品四' },
  { src: 'https://picsum.photos/2560/1440?random=5', label: '作品五' },
  { src: 'https://picsum.photos/2560/1440?random=6', label: '作品六' },
];

const ArchitectAestheticsPage: React.FC = () => {
  // 人物圖片 URL
  const personImage = '/images/b2/蔡長恩建築師.jpg';

  // ===== 飛入動畫設定 =====
  const charDelay = 0.12;  // 每個字的延遲時間（秒）- 較慢以產生交錯重疊效果

  // 文字內容
  const titleText = '美學工藝起筆';
  const subtitleText = '淬鍊城市地標';

  // 動畫狀態
  const [isAnimated, setIsAnimated] = useState(false);

  // 頁面載入時觸發動畫
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); // 延遲 100ms 開始動畫
    return () => clearTimeout(timer);
  }, []);

  // 計算副標題開始動畫的延遲（主標題所有字動畫完成後）
  const subtitleStartDelay = titleText.length * charDelay + 0.2;

  // 燈箱狀態
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    currentIndex: number;
  }>({
    isOpen: false,
    currentIndex: 0,
  });

  // 開啟燈箱
  const openLightbox = () => {
    setLightbox({ isOpen: true, currentIndex: 0 });
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
    <div className="relative w-full h-full overflow-hidden bg-[#1a1a1a]">
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

      {/* 背景裝飾 - 模糊的人物圖片 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${personImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(50px) brightness(0.3)',
          transform: 'scale(1.3)',
          opacity: 0.6,
        }}
      />

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={1} />

      {/* 主要內容區域 */}
      <div
        className="relative w-full h-full flex"
        style={{ paddingTop: '80px' }}
      >
        {/* 左側內容區 - 約 50% */}
        <div
          className="relative flex flex-col justify-center"
          style={{
            width: '50%',
            padding: '4rem',
            paddingLeft: '6%',
          }}
        >
          {/* 標題區 */}
          <div className="mb-6">
            <p
              className="text-[#f5e6b8]"
              style={{
                fontSize: '1.25rem',
                letterSpacing: '0.1em',
              }}
            >
              <span className='italic' style={{fontSize: '0.9rem'}}>建築美學 / </span><br/>
              艸引子聯合建築師事務所 蔡長恩
            </p>
          </div>

          {/* 主要描述文字 */}
          <div
            className="text-white/85 text-justify"
            style={{
              fontSize: '1rem',
              lineHeight: '2',
              maxWidth: '28rem',
            }}
          >
            <p>擅長運用 BIM 與參數化技術提升建築設計精準度，作品橫跨集合住宅、公共建築與私人住宅，具有豐富中大型建案與地區性公共工程實務經驗。</p>
          </div>

          {/* 底部按鈕 - 循環漸變文字，點擊開啟燈箱 */}
          <div className="mt-16">
            <div
              // onClick={openLightbox}
              className="inline-flex flex-col items-start border border-white/25 px-8 py-4 hover:border-white/40 transition-all"
              style={{ letterSpacing: '0.08em' }}
            >
              <span
                className="gradient-text-animate"
                style={{ fontSize: '0.9rem' }}
              >
                作品代表<br/>
                有春建設「青田芯、青田蒔」<br/>
                匠泰開發「日日」、「琢力自然」
              </span>
              <span
                className="!hidden gradient-text-animate italic mt-1"
                style={{ fontSize: '0.75rem', fontFamily: 'serif' }}
              >
                Collection
              </span>
            </div>
          </div>

        </div>

        {/* 右側人物照片區 - 約 50% */}
        <div
          className="relative h-full w-1/2"
        >
          {/* 圖片左側直排文字 - 每字從左上飛入 */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 pt-32 flex items-start gap-3 z-10"
          >
            {/* 左側，直排，每字從左上飛入 */}
            <h3
              className="text-white font-light -mt-32"
              style={{
                writingMode: 'vertical-rl',
                fontSize: '3rem',
                letterSpacing: '0.25em',
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
            </h3>

            {/* 右側：主持建築師 蔡長恩建築師 - 直排，每字從左上飛入 */}
            <h3
              className="text-white font-light"
              style={{
                writingMode: 'vertical-rl',
                fontSize: '3rem',
                letterSpacing: '0.25em',
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
                      : 'translate(-80px, -80px) scale(1.5)',
                    opacity: isAnimated ? 1 : 0,
                    transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${subtitleStartDelay + index * charDelay}s, opacity 0.6s ease-out ${subtitleStartDelay + index * charDelay}s`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h3>
          </div>

          {/* 人物照片 - 帶漸層遮罩 */}
          <div className="absolute inset-0">
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full">
                <img
                  src={personImage}
                  alt="蔡長恩建築師"
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: 'center top',
                    maskImage: 'linear-gradient(to left, black 50%, transparent 95%)',
                    WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 95%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 右下角署名 */}
          <div
            className="!hidden absolute right-12 bottom-10 text-right"
          >
            <p
              className="text-white/50"
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
              }}
            >
              建築師/ 蔡長恩
            </p>
          </div>
        </div>
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

          {/* 關閉按鈕 */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300"
            style={{ zIndex: 10 }}
            aria-label="關閉"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

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
              <span className="text-white" style={{ fontSize: '0.875rem', letterSpacing: '0.05em' }}>
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

export default ArchitectAestheticsPage;

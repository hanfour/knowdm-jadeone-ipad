import React, { useState, useEffect } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

// 作品圖片資料（暫用 picsum.photos）
const portfolioImages = [
  { src: 'https://picsum.photos/2560/1440?random=30', label: '結構作品一' },
  { src: 'https://picsum.photos/2560/1440?random=31', label: '結構作品二' },
  { src: 'https://picsum.photos/2560/1440?random=32', label: '結構作品三' },
  { src: 'https://picsum.photos/2560/1440?random=33', label: '結構作品四' },
];

const StructuralEngineeringPage: React.FC = () => {
  // 人物圖片 URL
  const personImage = '/images/b5/許庭偉.jpg';

  // ===== 飛入動畫設定 =====
  const charDelay = 0.12;  // 每個字的延遲時間（秒）- 較慢以產生交錯重疊效果
  const titleText = '精工建築舵手';
  const subtitleText = '鑄造百年地標';
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
          src={personImage}
          alt="許庭偉結構技師"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'right center' }}
        />
        {/* 左側漸層遮罩 - 讓文字更清晰 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={1} />

      {/* 人物右側直排文字 - 設計師簽名 */}
      <div
        className="!hidden absolute flex flex-col items-start gap-2 z-10"
        style={{
          right: '3%',
          top: '50%',
          transform: 'translateY(-50%)',
          writingMode: 'vertical-rl',
        }}
      >
        <p
          className="text-white/70"
          style={{
            fontSize: '0.9rem',
            letterSpacing: '0.2em',
          }}
        >
          結構設計師/
        </p>
        <p
          className="text-white mt-12"
          style={{
            fontSize: '0.9rem',
            letterSpacing: '0.25em',
            fontWeight: '300',
          }}
        >
          許庭偉結構技師
        </p>
      </div>

      {/* 左側內容區 */}
      <div
        className="absolute left-0 h-full flex flex-col justify-center"
        style={{
          top: '80px',
          width: '45%',
          padding: '4rem',
          paddingLeft: '6%',
        }}
      >
        {/* 標題區 */}
        <div className="mb-4">
          <p
            className="text-[#f5e6b8] font-medium"
            style={{
              fontSize: '1.25rem',
              letterSpacing: '0.15em',
            }}
          >
            <span className="italic" style={{fontSize: '0.9rem'}}>大匠工程團隊 / </span>
            <br/>
            世界級頂尖結構標準，同步台北101
          </p>
        </div>

        {/* 主要描述文字 */}
        <div
          className="text-white/85"
          style={{
            fontSize: '1rem',
            lineHeight: '2.4',
            maxWidth: '28rem',
          }}
        >
          <p className="text-justify">
            建築結構安全為建築百年大計，面對地震與氣候變遷的挑戰，鼎匠-大匠工程顧問以世界級地標台北101結構安全顧問團隊經驗，將國際級安全標準帶入個案中，頂尖結構設計與嚴謹品管，以超越業界的標準，全程導入精準數據與嚴格審查流程，致力於打守護城市、資產與家人的安全顧問與結構守護者。
          </p>
        </div>

        {/* 底部按鈕 - 循環漸變文字，點擊開啟燈箱 */}
        <div className="mt-12">
          <div
            // onClick={openLightbox}
            className="inline-flex flex-col items-start border border-white/30 px-8 py-4 hover:border-white/50 transition-all bg-white/10 backdrop-blur-sm"
            style={{ letterSpacing: '0.08em' }}
          >
            <span
              className="gradient-text-animate"
              style={{ fontSize: '0.9rem' }}
            >
              作品代表<br/>
              九川建設「四方研」結構設計<br/>
              多項中大型集合住宅結構工程
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

      {/* 右下角大字 - 公司名稱 - 直排，每字從左上飛入 */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-10 flex items-start gap-3 pt-32"
        style={{
          right: '37%',
        }}
      >
        {/* 主標題 - 直排，每字從左上飛入 */}
        <h3
          className="text-white font-light -mt-32"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '3rem',
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
        </h3>

        {/* 副標題 - 直排，每字從左上飛入 */}
        <h3
          className="text-white font-light"
          style={{
            writingMode: 'vertical-rl',
            fontSize: '3rem',
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

export default StructuralEngineeringPage;

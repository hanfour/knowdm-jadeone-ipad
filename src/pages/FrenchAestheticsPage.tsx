import React, { useState, useEffect, useCallback } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

// 影片資料
const videos = [
  { id: 'Rdk1lS1z9UE', label: '影片 1' },
  { id: 'XdKCF_gmRQ0', label: '影片 2' },
  { id: 'WxMWRceTrbQ', label: '影片 3' },
  { id: 'v2fKSaiUS50', label: '影片 4' },
  { id: 'WIAxxPPi15w', label: '影片 5' },
];

// 輪播圖片資料
const carouselImages = [
  { src: '/images/c1/3D渲染_0000_正面.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D渲染_0001_左.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D渲染_0002_右.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D渲染_0003_仰角.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D透視_0000_立面正門.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D透視_0001_立面仰角.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D透視_0002_立面正面.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D透視_0003_立面側面.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D透視_0004_立面左.jpg', label: '立面3D透視圖，實際以施工為準' },
  { src: '/images/c1/3D透視_0005_立面右.jpg', label: '立面3D透視圖，實際以施工為準' },
];

const FrenchAestheticsPage: React.FC = () => {
  // ===== 飛入動畫設定 =====
  const charDelay = 0.12;
  const titleText = '美學序列';
  const subtitleText = '黃金剪裁';
  const smallTextDelay = 0;
  const titleStartDelay = 0.6;
  const subtitleStartDelay = titleStartDelay + titleText.length * charDelay + 0.3;

  // 動畫狀態
  const [isAnimated, setIsAnimated] = useState(false);

  // 輪播狀態 - 使用兩層圖片實現平滑過渡
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 燈箱狀態
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    currentIndex: number;
  }>({
    isOpen: false,
    currentIndex: 0,
  });

  // 影片彈窗狀態 - 存儲當前播放的影片 ID
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // 頁面載入時觸發動畫
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 自動輪播 - scale 1.1 → 1，然後淡出（下一張在底層已準備好）
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      // 淡出完成後，更新 index
      setCurrentIndex(nextIndex);
      setNextIndex((nextIndex + 1) % carouselImages.length);
      setIsTransitioning(false);
    }, 800); // 淡出時間
  }, [nextIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // 每 6 秒切換一次（5 秒縮放 + 0.5 秒淡出 + 0.5 秒緩衝）
    return () => clearInterval(interval);
  }, [nextSlide]);

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
      currentIndex: (prev.currentIndex + 1) % carouselImages.length,
    }));
  };

  // 上一張
  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + carouselImages.length) % carouselImages.length,
    }));
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 輪播動畫 CSS */}
      <style>{`
        @keyframes zoomIn {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .carousel-zoom {
          animation: zoomIn 5.5s ease-out forwards;
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

      {/* 全螢幕輪播背景 - 兩層結構實現平滑過渡 */}
      <div
        className="absolute inset-0"
        style={{ top: '80px' }}
      >
        {/* 底層：下一張圖片（始終在底層等待） */}
        <div className="absolute inset-0">
          <img
            src={carouselImages[nextIndex].src}
            alt={carouselImages[nextIndex].label}
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
          />
        </div>

        {/* 上層：當前圖片（縮放動畫 + 淡出） */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          key={currentIndex}
        >
          <img
            src={carouselImages[currentIndex].src}
            alt={carouselImages[currentIndex].label}
            className="w-full h-full object-cover carousel-zoom"
          />
        </div>

        {/* 暗色漸層遮罩 - 讓文字更清晰 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={3} />

      {/* 左側飛入文字區域 */}
      <div
        className="absolute z-10 flex flex-col items-start"
        style={{
          left: '6%',
          bottom: '15%',
        }}
      >
        {/* 第一行：美學序列 - 橫排，每字從左上飛入 */}
        <h2
          className="text-white font-light"
          style={{
            fontSize: '3.5rem',
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
                transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${titleStartDelay + index * charDelay}s, opacity 0.6s ease-out ${titleStartDelay + index * charDelay}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* 第二行：法式美學 / - 小字，淡入 */}
        <p
          className="text-[#f5e6b8] italic font-medium"
          style={{
            fontSize: '1rem',
            fontFamily: '"Apple Chancery", "Lucida Calligraphy", cursive',
            letterSpacing: '0.05em',
            marginLeft: '0.5rem',
            opacity: isAnimated ? 1 : 0,
            transition: `opacity 0.6s ease-out ${smallTextDelay}s`,
          }}
        >
          Trends fade, but style endures
        </p>

        {/* 第三行：黃金剪裁 - 橫排，每字從左上飛入 */}
        <h2
          className="text-white font-light"
          style={{
            fontSize: '3.5rem',
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

      {/* 右側內容區 */}
      <div
        className="absolute right-0 h-full flex flex-col justify-center"
        style={{ top: '80px', width: '35%', padding: '4rem', paddingLeft: '2rem', paddingRight: '6%' }}
      >
        <div className="text-white" style={{ maxWidth: '32rem' }}>
          {/* 內容文字 */}
          <div
            className="relative mt-6 text-white/85 text-justify"
            style={{
              fontSize: '1rem',
              lineHeight: '2',
              paddingLeft: '1rem',
            }}
          >

            {/* 左側裝飾線 */}
            <div
              className=" absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4a853]/80 via-[#f5e6b8]/60 to-transparent"
            />
            <p>
              用建築為美學載體，打開巴黎的世界之窗，建築規格與尺度皆媲美法式都會美學，細緻的長序列，讓冷冽外牆於是有了輕盈唯美的曲線，從法式長型序列語彙著眼，演繹黃金比例，成就如同寶格麗酒店的浪漫氣息的法式風格建築誕生的，標誌恆久美學的點，風格生活在此優雅落籍。
            </p>
          </div>

          {/* 按鈕區域 */}
          <div className="mt-10 grid grid-cols-3 gap-1" style={{ paddingLeft: '1rem' }}>
            {/* 外觀透視按鈕 - 點擊開啟燈箱 */}
            <button
              onClick={openLightbox}
              className="inline-flex items-center justify-center gap-2 bg-[#d4a853]/75 border border-[#d4a853]/50 py-1.5 hover:border-[#d4a853] hover:bg-white/5 transition-all group"
              style={{ letterSpacing: '0.08em' }}
            >
              <span
                className="text-white"
                style={{ fontSize: '0.85rem' }}
              >
                外觀透視
              </span>
              <svg
                className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 觀賞影片按鈕群組 */}
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setCurrentVideoId(video.id)}
                className="inline-flex items-center justify-center gap-2 bg-[#d4a853]/75 border border-[#d4a853]/50 py-1.5 hover:border-[#d4a853] hover:bg-white/5 transition-all group"
                style={{ letterSpacing: '0.08em' }}
              >
                <span
                  className="text-white"
                  style={{ fontSize: '0.85rem' }}
                >
                  觀賞影片 {index + 1}
                </span>
                <svg
                className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              </button>
            ))}
          </div>
          

          {/* 獎項照片區域 */}
          <div className="mt-14 flex gap-2">
            {[
              { src: '/images/awards/london-design-awards.png', alt: 'London Design Awards' },
              { src: '/images/awards/muse.png', alt: 'MUSE Design Awards' },
              { src: '/images/awards/rda-design-awards.png', alt: 'RDA Design Awards' },
              { src: '/images/awards/undesign.png', alt: 'UNDESIGN Awards' },
              { src: '/images/awards/european-design-awards-2025.png', alt: 'European Design Awards 2025' },
              { src: '/images/awards/ny-architectural-design-awards-2025.png', alt: 'NY Architectural Design Awards 2025' },
            ].map((award, index) => (
              <div
                key={index}
                className="relative p-.5 overflow-hidden"
                // style={{
                //   background: 'linear-gradient(135deg, rgba(212, 168, 83, 0.6), rgba(245, 230, 184, 0.4), rgba(212, 168, 83, 0.6))',
                //   boxShadow: '0 0 15px rgba(212, 168, 83, 0.3), inset 0 0 10px rgba(245, 230, 184, 0.2)',
                // }}
              >
                {/* 模糊白色底層 */}
                <div
                  className="absolute inset-0"
                  // style={{
                  //   background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)',
                  //   filter: 'blur(8px)',
                  // }}
                />
                {/* 圖片容器 */}
                <div
                  className="relative overflow-hidden"
                  style={{ width: '4rem', height: '4rem' }}
                >
                  <img
                    src={award.src}
                    alt={award.alt}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute z-10 text-gray-100" style={{ fontSize: '0.75rem', right: '5rem', bottom: '0.5rem' }}>
        立面3D透視圖，實際以施工為準
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
            {carouselImages.map((image, index) => (
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
                {carouselImages[lightbox.currentIndex].label}
              </span>
            </div>

            {/* 縮圖網格 - 最多 5 列 */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(5, 1fr)`, gap: '0.5rem' }}
            >
              {carouselImages.map((image, index) => (
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
                      height: '2.25rem',
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
            {lightbox.currentIndex + 1} / {carouselImages.length}
          </div>
        </div>
      )}

      {/* 影片彈窗 */}
      {currentVideoId && (
        <>
          <style>{`
            @keyframes videoSlideDown {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(0);
              }
            }

            @keyframes backdropFadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .video-slide-animation {
              animation: videoSlideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            .backdrop-fade-animation {
              animation: backdropFadeIn 0.3s ease-out forwards;
            }
          `}</style>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-fade-animation"
            style={{ zIndex: 9999 }}
            onClick={() => setCurrentVideoId(null)}
          >
            {/* 影片容器 */}
            <div
              className="relative w-full h-full video-slide-animation"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                key={currentVideoId}
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                title="影片播放"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* 關閉按鈕 */}
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentVideoId(null); }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300"
              style={{ zIndex: 10 }}
              aria-label="關閉"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FrenchAestheticsPage;

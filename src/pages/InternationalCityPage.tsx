import React, { useState, useEffect, useRef } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';
import CloseButton from '../components/close-button';
import RippleButton from '../components/ripple-button';

// 地標資料結構
interface LandmarkData {
  id: string;
  name: string;
  images: { src: string; alt: string }[];
}

// 可點擊的地標（_水湳轉運中心 到 _台中超巨蛋）
const landmarks: LandmarkData[] = [
  { id: '_水湳轉運中心', name: '水湳轉運中心', images: [
    { src: '/images/a1/IMG_004.webp', alt: '水湳轉運中心實景拍攝' },
    { src: '/images/a1/international-city-01.webp', alt: '水湳轉運中心' },
  ]},
  { id: '_台中國際會議中心', name: '台中國際會議中心', images: [
    { src: '/images/a1/IMG_002.webp', alt: '台中國際會議中心實景拍攝' },
    { src: '/images/a1/international-city-02.webp', alt: '台中國際會議中心' },
  ]},
  { id: '_台中綠美圖', name: '綠美圖', images: [
    { src: '/images/a1/IMG_003.webp', alt: '綠美圖實景拍攝' },
    { src: '/images/a1/international-city-03.webp', alt: '綠美圖' },
  ]},
  { id: '_中央公園', name: '中央公園', images: [
    { src: '/images/a3/03.webp', alt: '中央公園實景拍攝' },
    { src: '/images/a1/international-city-04.webp', alt: '中央公園' },
  ]},
  { id: '_台中流行影音中心', name: '台中流行影音中心', images: [
    { src: '/images/a3/02.webp', alt: '台中流行影音中心實景拍攝' },
    { src: '/images/a1/international-city-05.webp', alt: '台中流行影音中心' },
  ]},
  { id: '_台中超巨蛋', name: '台中超巨蛋', images: [
    { src: '/images/a1/157f7b46-031b-9a6a-f3be-cba5a4aea814.webp', alt: '政府示意圖' },
    { src: '/images/a1/international-city-06.webp', alt: '台中超巨蛋' },
  ]},
];

const InternationalCityPage: React.FC = () => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkData | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // 設置 SVG 互動事件
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const svgObject = container.querySelector('object');
    if (!svgObject) return;

    const handleSvgLoad = () => {
      const svgDoc = (svgObject as HTMLObjectElement).contentDocument;
      if (!svgDoc) return;

      // 添加水波紋外散動畫樣式（最大 60px）
      const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = `
        @keyframes ripple-wave {
          0% {
            filter:
              drop-shadow(0 0 2px rgba(255, 220, 0, 1))
              drop-shadow(0 0 5px rgba(255, 200, 0, 1));
          }
          25% {
            filter:
              drop-shadow(0 0 8px rgba(255, 220, 0, 1))
              drop-shadow(0 0 18px rgba(255, 200, 0, 0.9))
              drop-shadow(0 0 30px rgba(255, 180, 0, 0.7));
          }
          50% {
            filter:
              drop-shadow(0 0 15px rgba(255, 220, 0, 0.9))
              drop-shadow(0 0 30px rgba(255, 200, 0, 0.7))
              drop-shadow(0 0 45px rgba(255, 180, 0, 0.5))
              drop-shadow(0 0 60px rgba(255, 150, 0, 0.3));
          }
          75% {
            filter:
              drop-shadow(0 0 20px rgba(255, 220, 0, 0.5))
              drop-shadow(0 0 35px rgba(255, 200, 0, 0.3))
              drop-shadow(0 0 50px rgba(255, 180, 0, 0.1));
          }
          100% {
            filter:
              drop-shadow(0 0 2px rgba(255, 220, 0, 1))
              drop-shadow(0 0 5px rgba(255, 200, 0, 1));
          }
        }
        #_水湳轉運中心, #_台中國際會議中心, #_台中綠美圖, #_中央公園, #_台中流行影音中心, #_台中超巨蛋 {
          animation: ripple-wave 1.8s ease-in-out infinite;
          cursor: pointer;
          transition: filter 0.3s ease;
        }
        #_台中國際會議中心 { animation-delay: 0.3s; }
        #_台中綠美圖 { animation-delay: 0.6s; }
        #_中央公園 { animation-delay: 0.9s; }
        #_台中流行影音中心 { animation-delay: 1.2s; }
        #_台中超巨蛋 { animation-delay: 1.5s; }
        #_水湳轉運中心:hover, #_台中國際會議中心:hover, #_台中綠美圖:hover, #_中央公園:hover, #_台中流行影音中心:hover, #_台中超巨蛋:hover {
          animation: none;
          filter:
            drop-shadow(0 0 20px rgba(255, 220, 0, 1))
            drop-shadow(0 0 40px rgba(255, 200, 0, 0.9))
            drop-shadow(0 0 60px rgba(255, 180, 0, 0.7));
        }
      `;
      svgDoc.querySelector('svg')?.appendChild(style);

      // 為每個地標添加點擊事件
      landmarks.forEach((landmark) => {
        const element = svgDoc.getElementById(landmark.id);
        if (element) {
          element.addEventListener('click', () => {
            setCarouselIndex(0);
            setSelectedLandmark(landmark);
          });
        }
      });
    };

    svgObject.addEventListener('load', handleSvgLoad);

    if ((svgObject as HTMLObjectElement).contentDocument) {
      handleSvgLoad();
    }

    return () => {
      svgObject.removeEventListener('load', handleSvgLoad);
    };
  }, []);

  // 渲染地標彈窗（輪播 - 與 FrenchAestheticsPage 燈箱風格一致）
  const renderLandmarkModal = () => {
    if (!selectedLandmark) return null;

    const { images } = selectedLandmark;

    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/90"
        style={{ zIndex: 9999 }}
        onClick={() => setSelectedLandmark(null)}
      >
        {/* 主圖片區域 */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                index === carouselIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* 上一張按鈕 */}
          <button
            onClick={() => setCarouselIndex(i => (i - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            style={{ zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
            aria-label="上一張"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 下一張按鈕 */}
          <button
            onClick={() => setCarouselIndex(i => (i + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            style={{ zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
            aria-label="下一張"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* 圖片計數器 */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm"
            style={{ zIndex: 10 }}
          >
            {carouselIndex + 1} / {images.length}
          </div>
        </div>

        <CloseButton onClick={(e) => { e.stopPropagation(); setSelectedLandmark(null); }} />
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f5f0e6]">
      {/* 背景底色 */}
      <div
        className="absolute inset-0 bg-[#f5f0e6]"
        style={{ top: '80px' }}
      />

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={0} />

      {/* 主要內容區 */}
      <div className="absolute inset-0 flex" style={{ top: '80px' }}>
        {/* 左側：文字內容 */}
        <div className="w-2/5 h-full flex items-center px-16">
          <div className="text-[#0b2d2a]" style={{ maxWidth: '28rem' }}>
            {/* 主標題 */}
            <h1
              className="font-light text-h2 leading-tight"
              style={{ letterSpacing: '0.05em', marginBottom: '1rem' }}
            >
              齊步世界 亮眼軸線
            </h1>

            {/* 內文 */}
            <p
              className="leading-relaxed-custom text-body text-text-tertiary"
              style={{ marginTop: '1.5rem' }}
            >
              水湳經貿園區以國際新都姿態，開啟大台中核心新未來，齊聚經貿、商業與文化藝術的國際化價值，奠定國際核心地位，全球注目時代標的，國際建築大師作品齊聚爭豔，是台中國際建築密度最高的重劃區，兩大文化建：綠美圖、台中國際會展中心陸續啟用，最受矚目的超巨蛋、台灣智慧營塔等重大建設逐步到位，未來水湳轉運中心及未來捷運橘線的雙交通利多加持下，蓬勃商機發展不可限量。
            </p>

            {/* 影片按鈕 */}
            <div className="flex gap-3" style={{ marginTop: '2rem' }}>
              <RippleButton onClick={() => setCurrentVideoId('drDVqO48eJo')}>
                <span>水湳空拍</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </RippleButton>
            </div>
          </div>
        </div>

        {/* 右側：SVG 圖片 */}
        <div
          ref={svgContainerRef}
          className="flex-1 h-full flex items-center justify-center"
        >
          <object
            data="/images/a1/map2-2.svg"
            type="image/svg+xml"
            className="w-full h-full"
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            aria-label="水湳經貿園區地圖"
          />
        </div>
      </div>

      {/* 地標彈窗 */}
      {renderLandmarkModal()}

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

            <CloseButton onClick={(e) => { e.stopPropagation(); setCurrentVideoId(null); }} />
          </div>
        </>
      )}

      {/* 動畫樣式 */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InternationalCityPage;

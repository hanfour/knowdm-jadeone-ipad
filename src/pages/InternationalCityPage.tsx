import React, { useState, useEffect, useRef } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';
import CloseButton from '../components/close-button';
import RippleButton from '../components/ripple-button';

// 地標資料結構
interface LandmarkData {
  id: string;
  name: string;
  image: string;
  alt?: string; // 圖片說明
}

// 可點擊的地標（_水湳轉運中心 到 _台中超巨蛋）
const landmarks: LandmarkData[] = [
  { id: '_水湳轉運中心', name: '水湳轉運中心', image: '/images/a1/IMG_004.jpg', alt: '水湳轉運中心實景拍攝' },
  { id: '_台中國際會議中心', name: '台中國際會議中心', image: '/images/a1/IMG_002.jpg', alt: '台中國際會議中心實景拍攝' },
  { id: '_台中綠美圖', name: '綠美圖', image: '/images/a1/IMG_003.jpg', alt: '綠美圖實景拍攝' },
  { id: '_中央公園', name: '中央公園', image: '/images/a3/03.jpg', alt: '中央公園實景拍攝' },
  { id: '_台中流行影音中心', name: '台中流行影音中心', image: '/images/a3/02.jpg', alt: '台中流行影音中心實景拍攝' },
  { id: '_台中超巨蛋', name: '台中超巨蛋', image: '/images/a1/157f7b46-031b-9a6a-f3be-cba5a4aea814.jpg', alt: '政府示意圖' },
];

const InternationalCityPage: React.FC = () => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkData | null>(null);
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

  // 渲染地標彈窗（類似重劃區比較表）
  const renderLandmarkModal = () => {
    if (!selectedLandmark) return null;

    return (
      <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
        <CloseButton onClick={() => setSelectedLandmark(null)} />

        {/* 滿版圖片 */}
        <div className="h-full flex items-center justify-center p-8 relative">
          <img
            src={selectedLandmark.image}
            alt={selectedLandmark.name}
            className="w-full max-w-full max-h-full object-contain animate-fade-in"
          />
          <div className="absolute z-10 text-[#0b2d2a]/50 text-micro" style={{ right: '5rem', bottom: '1rem' }}>{selectedLandmark.alt}</div>
        </div>
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

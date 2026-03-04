import React, { useState, useEffect, useRef } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';
import CloseButton from '../components/close-button';
import RippleButton from '../components/ripple-button';

// 生態專用區介紹輪播圖片
const ecoGalleryImages = [
  '/images/precious-collection/eco-gallery/01.webp',
  '/images/precious-collection/eco-gallery/02.webp',
  '/images/precious-collection/eco-gallery/03.webp',
  '/images/precious-collection/eco-gallery/04.webp',
  '/images/precious-collection/eco-gallery/05.webp',
  '/images/precious-collection/eco-gallery/06.webp',
  '/images/precious-collection/eco-gallery/07.webp',
  '/images/precious-collection/eco-gallery/08.webp',
];

// 生態專用區1 實景照片起始索引
const ECO_ZONE1_START_INDEX = 4;

// 可點擊區域的詳細資料
interface AreaDetail {
  title: string;
  items: { name: string; coverage: string; far: string }[];
}

// SVG 區域 ID 對應表
const svgAreaMapping: Record<string, string> = {
  '_生態住宅專用區': 'eco-residential',
  '_文化商用專業區': 'cultural-commercial',
  '_創新研發專用區': 'innovation-rd',
};

// 各區域對應的 SVG 底色
const areaColors: Record<string, string> = {
  'eco-residential': '#f7b27d80',      // 橘色
  'cultural-commercial': '#f9c9c980',  // 粉紅色
  'innovation-rd': '#a894c180',        // 紫色
};

// 各區域詳細資料
const areaDetails: Record<string, AreaDetail> = {
  'eco-residential': {
    title: '生態住宅專用區',
    items: [
      { name: '第一種生態住宅專用區', coverage: '50%', far: '140%' },
      { name: '第二種生態住宅專用區', coverage: '50%', far: '200%' },
      { name: '第三種生態住宅專用區', coverage: '50%', far: '280%' },
    ],
  },
  'cultural-commercial': {
    title: '文化商業專用區',
    items: [
      { name: '第一種文化商業專用區', coverage: '40%', far: '500%' },
      { name: '第二種文化商業專用區', coverage: '40%', far: '500%' },
      { name: '第三種文化商業專用區', coverage: '60%', far: '300%' },
    ],
  },
  'innovation-rd': {
    title: '創新研發專用區',
    items: [
      { name: '第一種創新研發專用區', coverage: '50%', far: '250%' },
      { name: '第二種創新研發專用區', coverage: '50%', far: '200%' },
      { name: '第三種創新研發專用區', coverage: '50%', far: '630%' },
    ],
  },
};

const PreciousCollectionPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [showEcoModal, setShowEcoModal] = useState(false);
  const [ecoGalleryIndex, setEcoGalleryIndex] = useState(0);
  const svgRef = useRef<HTMLObjectElement>(null);

  // 縮放與拖曳狀態
  const [ecoScale, setEcoScale] = useState(1);
  const [ecoPosition, setEcoPosition] = useState({ x: 0, y: 0 });
  const [isEcoDragging, setIsEcoDragging] = useState(false);
  const [ecoDragStart, setEcoDragStart] = useState({ x: 0, y: 0 });

  // 生態專用區 Modal 控制
  const openEcoModal = () => {
    setShowEcoModal(true);
    setEcoGalleryIndex(0);
    setEcoScale(1);
    setEcoPosition({ x: 0, y: 0 });
  };

  const closeEcoModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowEcoModal(false);
    setEcoScale(1);
    setEcoPosition({ x: 0, y: 0 });
    setIsEcoDragging(false);
  };

  const goToPrevEcoImage = () => {
    setEcoGalleryIndex((prev) => (prev > 0 ? prev - 1 : ecoGalleryImages.length - 1));
    setEcoScale(1);
    setEcoPosition({ x: 0, y: 0 });
  };

  const goToNextEcoImage = () => {
    setEcoGalleryIndex((prev) => (prev < ecoGalleryImages.length - 1 ? prev + 1 : 0));
    setEcoScale(1);
    setEcoPosition({ x: 0, y: 0 });
  };

  // 縮放控制
  const handleEcoZoomIn = () => {
    setEcoScale((prev) => Math.min(prev + 0.5, 4));
  };

  const handleEcoZoomOut = () => {
    setEcoScale((prev) => {
      const newScale = Math.max(prev - 0.5, 1);
      if (newScale === 1) setEcoPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleEcoReset = () => {
    setEcoScale(1);
    setEcoPosition({ x: 0, y: 0 });
  };

  // 拖曳處理
  const handleEcoMouseDown = (e: React.MouseEvent) => {
    if (ecoScale > 1) {
      setIsEcoDragging(true);
      setEcoDragStart({ x: e.clientX - ecoPosition.x, y: e.clientY - ecoPosition.y });
    }
  };

  const handleEcoMouseMove = (e: React.MouseEvent) => {
    if (isEcoDragging && ecoScale > 1) {
      setEcoPosition({ x: e.clientX - ecoDragStart.x, y: e.clientY - ecoDragStart.y });
    }
  };

  const handleEcoMouseUp = () => setIsEcoDragging(false);

  // 處理區域點擊（切換展開/收起）
  const handleAreaClick = (areaId: string) => {
    setSelectedArea(prev => prev === areaId ? null : areaId);
  };

  // SVG 載入完成後設定互動
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const handleLoad = () => {
      const svgDoc = svgElement.contentDocument;
      if (!svgDoc) return;

      // 注入 CSS 樣式到 SVG
      const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
      style.textContent = `
        @keyframes textShine {
          0% {
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.5));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
          }
        }
        @keyframes iconBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes iconPulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(229, 57, 53, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(255, 23, 68, 1)) drop-shadow(0 0 16px rgba(255, 23, 68, 0.7));
          }
        }
        .clickable-area {
          cursor: pointer;
        }
        .clickable-area text {
          fill: #0b2d2a;
          animation: textShine 2s ease-in-out infinite;
          font-weight: bold;
        }
        .clickable-area:hover text {
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 1)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 36px rgba(255, 200, 50, 0.6)) !important;
          animation: none !important;
        }
        .selected-area text {
          filter: drop-shadow(0 0 10px rgba(255, 215, 0, 1)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) !important;
          animation: none !important;
        }
        .map-icon {
          fill: #e53935 !important;
          transform-origin: center bottom;
          transform-box: fill-box;
          animation: iconBounce 1.5s ease-in-out infinite, iconPulse 2s ease-in-out infinite;
        }
        .clickable-area:hover .map-icon {
          fill: #ff1744 !important;
          animation: iconBounce 0.6s ease-in-out infinite, iconPulse 0.8s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(255, 23, 68, 0.9)) drop-shadow(0 0 16px rgba(255, 23, 68, 0.6)) !important;
        }
        .selected-area .map-icon {
          fill: #d50000 !important;
          animation: none !important;
          filter: drop-shadow(0 0 10px rgba(213, 0, 0, 1)) drop-shadow(0 0 20px rgba(213, 0, 0, 0.8)) !important;
        }
      `;
      svgDoc.querySelector('svg')?.appendChild(style);

      // 設定可點擊區域
      Object.entries(svgAreaMapping).forEach(([svgId, areaId]) => {
        const group = svgDoc.getElementById(svgId);
        if (group) {
          group.classList.add('clickable-area');
          group.addEventListener('click', () => handleAreaClick(areaId));

          // 為該群組內的 map_icon 元素添加動畫 class
          const mapIcons = group.querySelectorAll('[id^="map_x5F_icon"], [id^="map_icon"], path.st8');
          mapIcons.forEach((icon) => {
            // 只為 pin 圖標添加 class (排除區域路徑)
            const pathData = icon.getAttribute('d');
            if (pathData && pathData.includes('M') && pathData.length < 800) {
              icon.classList.add('map-icon');
            }
          });
        }
      });

      setSvgLoaded(true);
    };

    svgElement.addEventListener('load', handleLoad);

    // 如果已經載入完成
    if (svgElement.contentDocument) {
      handleLoad();
    }

    return () => {
      svgElement.removeEventListener('load', handleLoad);
    };
  }, []);

  // 更新選中狀態
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement || !svgLoaded) return;

    const svgDoc = svgElement.contentDocument;
    if (!svgDoc) return;

    // 移除所有選中狀態
    Object.keys(svgAreaMapping).forEach((svgId) => {
      const group = svgDoc.getElementById(svgId);
      if (group) {
        group.classList.remove('selected-area');
      }
    });

    // 設定選中狀態
    if (selectedArea) {
      const svgId = Object.entries(svgAreaMapping).find(([, areaId]) => areaId === selectedArea)?.[0];
      if (svgId) {
        const group = svgDoc.getElementById(svgId);
        if (group) {
          group.classList.add('selected-area');
        }
      }
    }
  }, [selectedArea, svgLoaded]);

  // 切換區域選擇（點擊相同區域則收起）
  const toggleAreaSelection = (areaId: string) => {
    setSelectedArea(prev => prev === areaId ? null : areaId);
  };

  // 渲染展開的詳細資料
  const renderExpandedDetail = (areaId: string) => {
    if (selectedArea !== areaId || !areaDetails[areaId]) return null;

    const detail = areaDetails[areaId];
    const bgColor = areaColors[areaId] || '#f5f0e6';
    return (
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: selectedArea === areaId ? '500px' : '0',
          opacity: selectedArea === areaId ? 1 : 0,
        }}
      >
        <div
          className="p-2 space-y-2"
          style={{ backgroundColor: bgColor }}
        >
          {detail.items.map((item, index) => (
            <div key={index} className="text-xsmall">
              <p className="font-medium text-[#0b2d2a]">{item.name}</p>
              <div className="flex gap-3 text-[#0b2d2a]/70">
                <span>建蔽率 <span className="font-medium text-[#0b2d2a]">{item.coverage}</span></span>
                <span>容積率 <span className="font-medium text-[#0b2d2a]">{item.far}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染右側面板內容
  const renderPanelContent = () => {
    return (
      <div className="text-[#0b2d2a]">
        {/* 細部計畫內容概要 */}
        <h2
          className="font-medium text-large"
          style={{ marginBottom: '1rem' }}
        >
          細部計畫內容概要
        </h2>

        {/* 統計數據 */}
        <div className="space-y-3">
          {/* 水湳重劃區 */}
          <div>
            <p className="text-body font-medium">水湳重劃區約253公頃</p>
          </div>

          {/* 公共設施用地 */}
          <div>
            <p className="text-small text-[#0b2d2a]/70">公共設施用地（含綠地）</p>
            <p className="text-body font-medium">共50.03%</p>
          </div>

          {/* 綠覆型用地 */}
          <div>
            <p className="text-small text-[#0b2d2a]/70">綠覆型用地（公園、綠地、國道）</p>
            <p className="text-body font-medium">共33.01%</p>
          </div>

          {/* 土地使用分區 */}
          <div className="border-b border-[#0b2d2a]/20 pb-2">
            <p className="text-small text-[#0b2d2a]/70">土地使用分區</p>
            <p className="text-body font-medium mb-2">共49.97%</p>
          </div>
          <div>
            {/* 分區細項 - 可點擊展開 */}
            <div className="space-y-1 text-xsmall">
              {/* 生態專用區 - 可展開 */}
              <div>
                <button
                  onClick={() => toggleAreaSelection('eco-residential')}
                  className={`w-full flex justify-between items-center py-0.5 transition-colors text-left ${
                    selectedArea === 'eco-residential'
                      ? 'text-[#0b2d2a]'
                      : 'hover:bg-[#0b2d2a]/5 hover:text-[#0b2d2a]'
                  }`}
                >
                  <span className={`flex items-center ${selectedArea === 'eco-residential' ? 'text-[#0b2d2a] font-medium' : 'text-[#0b2d2a]/70'}`}>
                    <span className="mr-2 text-body transition-colors duration-300" style={{ color: '#f7b27d' }}>◆</span>
                    生態住宅專用區
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium w-14 text-right">9.43%</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform duration-300 ${selectedArea === 'eco-residential' ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                {renderExpandedDetail('eco-residential')}
              </div>

              {/* 文化商業專用區 - 可展開 */}
              <div>
                <button
                  onClick={() => toggleAreaSelection('cultural-commercial')}
                  className={`w-full flex justify-between items-center py-0.5 transition-colors text-left ${
                    selectedArea === 'cultural-commercial'
                      ? 'text-[#0b2d2a]'
                      : 'hover:bg-[#0b2d2a]/5 hover:text-[#0b2d2a]'
                  }`}
                >
                  <span className={`flex items-center ${selectedArea === 'cultural-commercial' ? 'text-[#0b2d2a] font-medium' : 'text-[#0b2d2a]/70'}`}>
                    <span className="mr-2 text-body transition-colors duration-300" style={{ color: '#f9c9c9' }}>◆</span>
                    文化商業專用區
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium w-14 text-right">7.89%</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform duration-300 ${selectedArea === 'cultural-commercial' ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                {renderExpandedDetail('cultural-commercial')}
              </div>

              {/* 創新研發專用區 - 可展開 */}
              <div>
                <button
                  onClick={() => toggleAreaSelection('innovation-rd')}
                  className={`w-full flex justify-between items-center py-0.5 transition-colors text-left ${
                    selectedArea === 'innovation-rd'
                      ? 'text-[#0b2d2a]'
                      : 'hover:bg-[#0b2d2a]/5 hover:text-[#0b2d2a]'
                  }`}
                >
                  <span className={`flex items-center ${selectedArea === 'innovation-rd' ? 'text-[#0b2d2a] font-medium' : 'text-[#0b2d2a]/70'}`}>
                    <span className="mr-2 text-body transition-colors duration-300" style={{ color: '#a894c1' }}>◆</span>
                    創新研發專用區
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium w-14 text-right">14.14%</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform duration-300 ${selectedArea === 'innovation-rd' ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>
                {renderExpandedDetail('innovation-rd')}
              </div>

              {/* 經貿專用區 - 不可展開 */}
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center text-[#0b2d2a]/70">
                  <span className="mr-2 text-body" style={{ color: '#946133' }}>◆</span>
                  經貿專用區
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium w-14 text-right">8.64%</span>
                  <span className="w-3"></span>
                </div>
              </div>

              {/* 文教區 - 不可展開 */}
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center text-[#0b2d2a]/70">
                  <span className="mr-2 text-body" style={{ color: '#d7a6b6' }}>◆</span>
                  文教專用區
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium w-14 text-right">9.85%</span>
                  <span className="w-3"></span>
                </div>
              </div>

              {/* 其他專區 - 不可展開 */}
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center text-[#0b2d2a]/70">
                  <span className="mr-2 text-body text-gray-400">◆</span>
                  其他專區
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium w-14 text-right">0.02%</span>
                  <span className="w-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f5f0e6]">
      {/* 動畫樣式 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .svg-container {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes pinBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes pinPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .location-pin {
          animation: pinBounce 1.5s ease-in-out infinite, pinPulse 2s ease-in-out infinite;
        }
        .location-pin-selected {
          animation: none;
          filter: drop-shadow(0 0 4px rgba(186, 78, 56, 0.6));
        }
      `}</style>

      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/a5/background.webp)', top: '80px' }}
      />

      {/* 左側 SVG 地圖容器 - 左下角定位 */}
      <div
        className="absolute svg-container z-[1]"
        style={{
          left: '0',
          bottom: '0',
          width: '75%',
        }}
      >
        <object
          ref={svgRef}
          type="image/svg+xml"
          data="/images/precious-collection/map.svg"
          className="w-full object-contain"
          style={{ objectPosition: 'bottom left' }}
        >
          地圖載入中...
        </object>
      </div>

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={0} />

      {/* 左上方文字區 - 標題和描述（圖片上方） */}
      <div
        className="absolute z-20"
        style={{ left: '5%', top: '20%', maxWidth: '50%' }}
      >
        <div className="text-[#0b2d2a]">
          {/* 主標題 */}
          <h1
            className="font-light text-h2 leading-tight"
            style={{ letterSpacing: '0.05em', marginBottom: '1rem' }}
          >
            水湳珍稀 最美收藏
          </h1>

          {/* 原本描述文字 */}
          <p
            className="leading-relaxed text-body text-justify"
          >
            水湳智慧城細分為經貿、文商、文教、創研、生態住宅五大專用區，在64公頃的中央公園與商業大道之間，劃出一片低密度佔比不到10%的生態住宅區，為水湳生態最具國際感的豪宅聚落。低密度、高綠覆的高級住宅聚落，堪稱水湳最精華之地，以綠建築、景觀綠廊為核心，稀有價值遠勝七期新市政中心，每一棟建築都將是限量絕版品。
          </p>

          {/* 生態專用區介紹按鈕 */}
          <div style={{ marginTop: '2rem' }}>
            <RippleButton onClick={openEcoModal}>
              <span>生態專用區介紹</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </RippleButton>
          </div>
        </div>
      </div>

      {/* 右側文字區 - 細部計畫內容概要 */}
      <div
        className="absolute z-20 bg-white/60 backdrop-blur-md p-6 shadow"
        style={{ right: '5rem', top: '8rem', maxWidth: '26rem' }}
      >
        {renderPanelContent()}
      </div>

      {/* 右下角註解 */}
      <div className="absolute z-10 text-[#0b2d2a]/50 text-micro" style={{ right: '5rem', bottom: '1rem' }}>
        示意圖僅供參考
      </div>

      {/* 生態專用區介紹 Modal */}
      {showEcoModal && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden p-8"
            style={{ cursor: ecoGalleryIndex >= 1 && ecoScale > 1 ? (isEcoDragging ? 'grabbing' : 'grab') : 'default' }}
            onMouseDown={ecoGalleryIndex >= 1 ? handleEcoMouseDown : undefined}
            onMouseMove={ecoGalleryIndex >= 1 ? handleEcoMouseMove : undefined}
            onMouseUp={ecoGalleryIndex >= 1 ? handleEcoMouseUp : undefined}
            onMouseLeave={ecoGalleryIndex >= 1 ? handleEcoMouseUp : undefined}
          >
            <div className="relative max-w-full max-h-full flex items-center justify-center"
              style={ecoGalleryIndex >= 1 ? {
                transform: `translate(${ecoPosition.x}px, ${ecoPosition.y}px) scale(${ecoScale})`,
                transition: isEcoDragging ? 'none' : 'transform 0.3s ease-out',
              } : undefined}
            >
              <img
                key={ecoGalleryIndex}
                src={ecoGalleryImages[ecoGalleryIndex]}
                alt={`生態專用區介紹 ${ecoGalleryIndex + 1}`}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-full object-contain select-none animate-fade-in"
                draggable={false}
              />
              {/* 生態專用區1 可點擊熱區 - 僅在第一張地圖顯示 */}
              {ecoGalleryIndex === 0 && (
                <button
                  onClick={() => {
                    setEcoGalleryIndex(ECO_ZONE1_START_INDEX);
                    setEcoScale(1);
                    setEcoPosition({ x: 0, y: 0 });
                  }}
                  className="absolute cursor-pointer hover:bg-white/20 transition-colors duration-300 rounded"
                  style={{
                    left: '35.5%',
                    top: '50%',
                    width: '14.75%',
                    height: '20.5%',
                  }}
                  aria-label="查看生態專用區1實景照片"
                  title="點擊查看實景照片"
                />
              )}
            </div>
          </div>

          <CloseButton onClick={closeEcoModal} />

          {/* 縮放控制按鈕 - 右側中央（僅第 2、3、4 張圖顯示） */}
          {ecoGalleryIndex >= 1 && (
            <div
              className="absolute z-20 flex flex-col gap-2"
              style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              <button
                onClick={handleEcoZoomIn}
                className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="放大"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button
                onClick={handleEcoZoomOut}
                disabled={ecoScale <= 1}
                className={`w-10 h-10 bg-white shadow-md flex items-center justify-center transition-colors ${
                  ecoScale <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
                aria-label="縮小"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <button
                onClick={handleEcoReset}
                className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="還原"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          )}

          {/* 箭頭導航 - 固定在右下角 */}
          <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
            <button
              onClick={goToPrevEcoImage}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goToNextEcoImage}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* 頁碼指示 - 左下角 */}
          <div className="absolute bottom-8 left-8 text-body text-gray-600 z-20">
            {ecoGalleryIndex + 1} / {ecoGalleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreciousCollectionPage;

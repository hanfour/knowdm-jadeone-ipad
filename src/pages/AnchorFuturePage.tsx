import React, { useState, useEffect, useRef } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

// 重劃區詳細資料結構
interface DistrictDetail {
  id: string;
  name: string;
  color: string;
  adminArea: string; // 行政區
  majorProjects: string[]; // 重大建設
  development: {
    totalArea: string;
    publicRatio: string;
    residentialRatio: string;
    greenRatio: string;
    greenArea?: string;
  };
  images: string[];
}

// 重劃區區塊資料（含詳細內容）
const districts: DistrictDetail[] = [
  {
    id: '_水湳',
    name: '水湳經貿園區',
    color: '#a1d3c1',
    adminArea: '西屯區',
    majorProjects: [
      '綠美圖',
      '台中流行影音中心',
      '水湳轉運中心',
      '臺中中央公園',
      '臺中國際會展中心',
      '台灣智慧營運塔',
      '超巨蛋',
      '捷運橘線',
    ],
    development: {
      totalArea: '253.34公頃',
      publicRatio: '約50.05%',
      residentialRatio: '約49.95%',
      greenRatio: '約33.01%',
      greenArea: '約83.63公頃',
    },
    images: [
      '/images/anchor-future/shuinan-01.jpg',
      '/images/anchor-future/shuinan-02.jpg',
      '/images/anchor-future/shuinan-03.jpg',
    ],
  },
  {
    id: '_十四期',
    name: '十四期重劃區',
    color: '#f4b882',
    adminArea: '北屯區',
    majorProjects: [
      '台中巨蛋',
    ],
    development: {
      totalArea: '約404公頃',
      publicRatio: '約45.30%',
      residentialRatio: '約54.70%',
      greenRatio: '約6.38%',
      greenArea: '約25.73公頃',
    },
    images: [
      '/images/anchor-future/14th-01.jpg',
      '/images/anchor-future/14th-02.jpg',
      '/images/anchor-future/14th-03.jpg',
    ],
  },
  {
    id: '_機捷特區',
    name: '機捷特區',
    color: '#bfcc72',
    adminArea: '北屯區',
    majorProjects: [
      '台中捷運綠線',
    ],
    development: {
      totalArea: '約104.55公頃',
      publicRatio: '約44.25%',
      residentialRatio: '約55.75%',
      greenRatio: '約14.97%',
      greenArea: '約15.65公頃',
    },
    images: [
      '/images/anchor-future/mrt-01.jpg',
      '/images/anchor-future/mrt-02.jpg',
      '/images/anchor-future/mrt-03.jpg',
    ],
  },
  {
    id: '_十二期',
    name: '十二期重劃區',
    color: '#eebcab',
    adminArea: '西屯區',
    majorProjects: [
      '綠美圖',
      '台中流行影音中心',
      '水湳轉運中心',
      '臺中中央公園',
      '臺中國際會展中心',
      '台灣智慧營運塔',
      '超巨蛋',
      '捷運橘線',
    ],
    development: {
      totalArea: '約88.65公頃',
      publicRatio: '約47.14%',
      residentialRatio: '約52.86%',
      greenRatio: '約5.91%',
      greenArea: '約5.27公頃',
    },
    images: [
      '/images/anchor-future/12th-01.jpg',
      '/images/anchor-future/12th-02.jpg',
      '/images/anchor-future/12th-03.jpg',
    ],
  },
  {
    id: '_七期',
    name: '七期重劃區',
    color: '#ed9471',
    adminArea: '西屯區',
    majorProjects: [
      '新市政中心(市府/議會大樓)',
      '臺中國家歌劇院',
      '秋紅谷廣場景觀綠美化工程',
      '朝馬國民運動中心',
    ],
    development: {
      totalArea: '約353.39公頃',
      publicRatio: '約42.69%',
      residentialRatio: '約57.31%',
      greenRatio: '約17.70%',
      greenArea: '約19.13公頃',
    },
    images: [
      '/images/anchor-future/7th-01.jpg',
      '/images/anchor-future/7th-02.jpg',
      '/images/anchor-future/7th-03.jpg',
    ],
  },
  {
    id: '_八期',
    name: '八期重劃區',
    color: '#fff878',
    adminArea: '南屯區',
    majorProjects: [
      '公園改善(豐樂雕塑公園)',
      '綠線G12(豐樂公園站)',
    ],
    development: {
      totalArea: '約156.97公頃',
      publicRatio: '約47.5%',
      residentialRatio: '約52.5%',
      greenRatio: '約8.35%',
      greenArea: '約13.11公頃',
    },
    images: [
      '/images/anchor-future/8th-01.jpg',
      '/images/anchor-future/8th-02.jpg',
      '/images/anchor-future/8th-03.jpg',
    ],
  },
  {
    id: '_十三期',
    name: '十三期重劃區',
    color: '#b7cae8',
    adminArea: '南屯區',
    majorProjects: [
      '重劃區內道路、橋梁、生態渠道、雨污水下水道等公共工程',
      'G13(大慶站)',
      '捷運—台鐵連通道工程',
    ],
    development: {
      totalArea: '約230公頃',
      publicRatio: '約46.52%',
      residentialRatio: '約53.48%',
      greenRatio: '約16.22%',
      greenArea: '約37.22公頃',
    },
    images: [
      '/images/anchor-future/13th-01.jpg',
      '/images/anchor-future/13th-02.jpg',
      '/images/anchor-future/13th-03.jpg',
    ],
  },
];

const AnchorFuturePage: React.FC = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // 開啟燈箱
  const openModal = (districtId: string) => {
    setShowModal(districtId);
    setCurrentImageIndex(0);
  };

  // 關閉燈箱
  const closeModal = () => {
    setShowModal(null);
  };

  // 上一張圖片
  const goToPrevImage = () => {
    const district = districts.find((d) => d.id === showModal);
    if (!district) return;
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : district.images.length - 1
    );
  };

  // 下一張圖片
  const goToNextImage = () => {
    const district = districts.find((d) => d.id === showModal);
    if (!district) return;
    setCurrentImageIndex((prev) =>
      prev < district.images.length - 1 ? prev + 1 : 0
    );
  };

  // 設置 SVG 互動事件
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const svgObject = container.querySelector('object');
    if (!svgObject) return;

    const handleSvgLoad = () => {
      const svgDoc = (svgObject as HTMLObjectElement).contentDocument;
      if (!svgDoc) return;

      // 為 74路線 添加 Shine effect
      const route74 = svgDoc.getElementById('_74路線');
      if (route74) {
        const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
        style.textContent = `
          @keyframes shine-flow {
            0% {
              filter: drop-shadow(0 0 2px rgba(249, 190, 61, 0.4));
            }
            50% {
              filter: drop-shadow(0 0 8px rgba(249, 190, 61, 0.9)) drop-shadow(0 0 16px rgba(249, 190, 61, 0.6));
            }
            100% {
              filter: drop-shadow(0 0 2px rgba(249, 190, 61, 0.4));
            }
          }
          #_74路線 {
            animation: shine-flow 2s ease-in-out infinite;
          }
        `;
        svgDoc.querySelector('svg')?.appendChild(style);
      }

      // 為每個重劃區添加互動
      districts.forEach((district) => {
        const element = svgDoc.getElementById(district.id);
        if (element) {
          element.style.cursor = 'pointer';
          element.style.transition = 'opacity 0.3s ease, filter 0.3s ease';

          element.addEventListener('mouseenter', () => {
            setHoveredDistrict(district.id);
          });

          element.addEventListener('mouseleave', () => {
            setHoveredDistrict(null);
          });

          element.addEventListener('click', () => {
            openModal(district.id);
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

  // 更新 SVG 樣式（僅 hover 效果）
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    const svgObject = container.querySelector('object') as HTMLObjectElement;
    if (!svgObject?.contentDocument) return;

    const svgDoc = svgObject.contentDocument;

    districts.forEach((district) => {
      const element = svgDoc.getElementById(district.id);
      if (element) {
        const isHovered = hoveredDistrict === district.id;

        if (isHovered) {
          element.style.opacity = '1';
          element.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))';
        } else {
          element.style.opacity = '1';
          element.style.filter = 'none';
        }
      }
    });
  }, [hoveredDistrict]);

  // 取得當前燈箱的區域資料
  const modalDistrictData = districts.find((d) => d.id === showModal);

  // 渲染燈箱
  const renderModal = () => {
    if (!showModal || !modalDistrictData) return null;

    return (
      <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
        {/* 關閉按鈕 */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300 z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 主要內容區 */}
        <div className="h-full flex">
          {/* 左側：文字內容 */}
          <div className="w-1/2 h-full px-16 py-12 overflow-y-auto">
            {/* 區域標籤 */}
            <div
              className="inline-block px-4 py-1 rounded-full text-white mb-6"
              style={{ backgroundColor: modalDistrictData.color, fontSize: '0.9rem' }}
            >
              {modalDistrictData.adminArea}
            </div>

            {/* 標題 */}
            <h2 className="text-h2 tracking-wide-custom font-bold text-text-primary mb-8">
              {modalDistrictData.name}
            </h2>

            {/* 重大建設 */}
            <div className="mb-8">
              <h3 className="text-large tracking-wide-custom font-medium text-text-secondary mb-4">
                重大建設
              </h3>
              <ul className="space-y-1">
                {modalDistrictData.majorProjects.map((project, index) => (
                  <li
                    key={index}
                    className="flex text-body leading-relaxed-custom text-text-primary"
                  >
                    <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 開發比例 */}
            <div>
              <h3 className="text-large tracking-wide-custom font-medium text-text-secondary mb-4">
                開發比例
              </h3>
              <div className="space-y-1">
                <div className="flex text-body leading-relaxed-custom text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>重劃區面積：{modalDistrictData.development.totalArea}</span>
                </div>
                <div className="flex text-body leading-relaxed-custom text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>公共建設比例：{modalDistrictData.development.publicRatio}</span>
                </div>
                <div className="flex text-body leading-relaxed-custom text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>住宅面積比例：{modalDistrictData.development.residentialRatio}</span>
                </div>
                <div className="flex text-body leading-relaxed-custom text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>綠化面積：{modalDistrictData.development.greenRatio}（{modalDistrictData.development.greenArea}）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：圖片輪播 */}
          <div className="w-1/2 h-full flex items-center justify-center bg-gray-100 relative">
            {/* 圖片 */}
            <img
              key={currentImageIndex}
              src={modalDistrictData.images[currentImageIndex]}
              alt={`${modalDistrictData.name} ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain animate-fade-in"
            />

            {/* 圖片指示器 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {modalDistrictData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-text-primary w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* 箭頭導航 */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3">
              <button
                onClick={goToPrevImage}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={goToNextImage}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f5f0e6]">
      {/* 整體背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/a5/background.webp)', top: '80px' }}
      />

      {/* SVG 地圖容器 */}
      <div
        ref={svgContainerRef}
        className="absolute left-[-15%]"
        style={{
          top: '80px',
          width: '100%',
          height: 'calc(100% - 80px)',
        }}
      >
        <object
          data="/images/anchor-future/map.svg"
          type="image/svg+xml"
          className="w-full h-full"
          style={{ objectFit: 'contain', objectPosition: 'left center' }}
          aria-label="台中重劃區地圖"
        />
      </div>

      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={0} />

      {/* 右下角內容區 */}
      <div
        className="absolute z-20"
        style={{ right: '5rem', bottom: '8rem' }}
      >
        <div className="text-[#0b2d2a]" style={{ maxWidth: '28rem' }}>
          {/* 主標題 */}
          <h1
            className="font-light leading-tight"
            style={{ fontSize: '3rem', letterSpacing: '0.05em', marginBottom: '1rem' }}
          >
            重劃之姿 定錨未來
          </h1>

          {/* 內文 */}
          <p
            className="leading-relaxed"
            style={{ fontSize: '1rem', marginTop: '1.5rem' }}
          >
            台中重劃區共伴效應帶動地段價值提升，隨著台中市基礎建設捷運藍線與綠線的逐步完善，吸引建商推案、人口移入，形成機能成熟、環境優美、交通便捷的重劃發展區域，水湳經貿園區與十四期重劃區等地的發展，七期、八期、十三期、十四期、單元等重劃區都因為磁吸效應，成為都市發展熱點。
          </p>

          {/* 區塊圖例 */}
          {/* <div className="flex flex-wrap" style={{ marginTop: '2rem', gap: '0.5rem' }}>
            {districts.map((district) => (
              <button
                key={district.id}
                onClick={() => openModal(district.id)}
                className="px-3 py-1 rounded-full transition-all duration-300 text-[#0b2d2a]/80 hover:text-[#0b2d2a] hover:shadow-md"
                style={{
                  fontSize: '0.85rem',
                  backgroundColor: `${district.color}80`,
                  borderWidth: '1px',
                  borderColor: district.color,
                }}
              >
                {district.name.replace('重劃區', '')}
              </button>
            ))}
          </div> */}
        </div>
      </div>

      {/* 燈箱 */}
      {renderModal()}

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

export default AnchorFuturePage;

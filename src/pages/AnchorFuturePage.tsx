import React, { useState, useEffect, useRef } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';
import CloseButton from '../components/close-button';
import RippleButton from '../components/ripple-button';

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
  alt?: string; // 圖片說明
}

// 重劃區區塊資料（含詳細內容）
const districts: DistrictDetail[] = [
  {
    id: '_水湳',
    name: '水湳經貿園區',
    color: '#ed9471',
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
      '/images/a1/IMG_004.webp',
      '/images/a1/IMG_003.webp',
      '/images/a1/IMG_002.webp',
    ],
  },
  {
    id: '_十四期',
    name: '十四期重劃區',
    color: '#f4b982',
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
      '/images/anchor-future/_0005_pixta_38952988_M.webp',
    ],
    alt: '情境示意圖',
  },
  {
    id: '_機捷特區',
    name: '機捷特區',
    color: '#f4b982',
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
      '/images/anchor-future/mrt-01.webp',
    ],
    alt: '台中捷運綠線',
  },
  {
    id: '_十二期',
    name: '十二期重劃區',
    color: '#ed9471',
    adminArea: '西屯區',
    majorProjects: [
      '低密度開發住宅區',
      '舊市區商圈',
    ],
    development: {
      totalArea: '約88.65公頃',
      publicRatio: '約47.14%',
      residentialRatio: '約52.86%',
      greenRatio: '約5.91%',
      greenArea: '約5.27公頃',
    },
    images: [
      '/images/anchor-future/_0001_pixta_118049052_M.webp',
    ],
    alt: '情境示意圖',
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
      '/images/anchor-future/_0002_pixta_97838656_M.webp',
    ],
    alt: '臺中國家歌劇院',
  },
  {
    id: '_八期',
    name: '八期重劃區',
    color: '#f8941e',
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
      '/images/anchor-future/_0000_pixta_121496522_M.webp',
    ],
    alt: '情境示意圖',
  },
  {
    id: '_十三期',
    name: '十三期重劃區',
    color: '#f8941e',
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
      '/images/anchor-future/_0004_pixta_69952978_M.webp',
    ],
    alt: '情境示意圖',
  },
];

const AnchorFuturePage: React.FC = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [specialModal, setSpecialModal] = useState<'highway74' | 'comparison' | null>(null);
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

      // 為 74路線 和 水湳 添加 Shine effect
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
        @keyframes shuinan-shine {
          0% {
            filter: drop-shadow(0 0 4px rgba(161, 211, 193, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(161, 211, 193, 1)) drop-shadow(0 0 24px rgba(161, 211, 193, 0.7)) drop-shadow(0 0 36px rgba(255, 255, 255, 0.4));
          }
          100% {
            filter: drop-shadow(0 0 4px rgba(161, 211, 193, 0.5));
          }
        }
        #_74路線 {
          animation: shine-flow 2s ease-in-out infinite;
        }
        #_水湳 {
          animation: shuinan-shine 2s ease-in-out infinite;
        }
      `;
      svgDoc.querySelector('svg')?.appendChild(style);

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
        <CloseButton onClick={closeModal} />

        {/* 主要內容區 */}
        <div className="h-full flex">
          {/* 左側：文字內容 */}
          <div className="w-2/5 h-full px-16 py-12 overflow-y-auto">
            {/* 區域標籤 */}
            <div
              className="inline-block px-4 py-1 rounded-full text-white text-small mb-6"
              style={{ backgroundColor: modalDistrictData.color }}
            >
              {modalDistrictData.adminArea}
            </div>

            {/* 標題 */}
            <h2 className="text-h2 tracking-wide-custom font-bold text-text-primary mb-8">
              {modalDistrictData.name}
            </h2>

            {/* 重大建設 */}
            {modalDistrictData.majorProjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-large tracking-wide-custom font-medium text-text-secondary mb-4">
                  重大建設
                </h3>
                <ul className="space-y-1">
                  {modalDistrictData.majorProjects.map((project, index) => (
                    <li
                      key={index}
                      className="flex text-body leading-relaxed text-text-primary"
                    >
                      <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                      <span>{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 開發比例 */}
            <div>
              <h3 className="text-large tracking-wide-custom font-medium text-text-secondary mb-4">
                開發比例
              </h3>
              <div className="space-y-1">
                <div className="flex text-body leading-relaxed text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>重劃區面積：{modalDistrictData.development.totalArea}</span>
                </div>
                <div className="flex text-body leading-relaxed text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>公共建設比例：{modalDistrictData.development.publicRatio}</span>
                </div>
                <div className="flex text-body leading-relaxed text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>住宅面積比例：{modalDistrictData.development.residentialRatio}</span>
                </div>
                <div className="flex text-body leading-relaxed text-text-primary">
                  <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                  <span>綠化面積：{modalDistrictData.development.greenRatio}（{modalDistrictData.development.greenArea}）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右側：圖片輪播 */}
          <div className="flex-1 h-full flex items-center justify-center bg-gray-100 relative">
            {/* 圖片 */}
            <img
              key={currentImageIndex}
              src={modalDistrictData.images[currentImageIndex]}
              alt={`${modalDistrictData.name} ${currentImageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover animate-fade-in"
            />

            {/* 圖片說明 */}
            <div className="absolute z-10 text-white text-micro" style={{ right: '5rem', bottom: '1rem' }}>{modalDistrictData.alt}</div>

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
            {modalDistrictData.images.length > 1 && (
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
            )}
          </div>
        </div>
      </div>
    );
  };

  // 渲染特殊燈箱（74快速道路 / 重劃區比較表）
  const renderSpecialModal = () => {
    if (!specialModal) return null;

    if (specialModal === 'highway74') {
      return (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
          <CloseButton onClick={() => setSpecialModal(null)} />

          {/* 主要內容區 */}
          <div className="h-full flex">
            {/* 左側：文字內容 */}
            <div className="w-2/5 h-full px-16 py-12 overflow-y-auto">
              {/* 區域標籤 */}
              <div
                className="inline-block px-4 py-1 rounded-full text-white text-small mb-6"
                style={{ backgroundColor: '#0b2d2a' }}
              >
                交通建設
              </div>

              {/* 標題 */}
              <h2 className="text-h2 tracking-wide-custom font-bold text-text-primary mb-8">
                74 黃金軸線・定錨未來版圖
              </h2>

              {/* 說明內容 */}
              <div className="space-y-4">
                <p className="text-body leading-relaxed-custom text-text-primary text-justify">
                  台中以 74 快速道路為城市發展主動脈，東西串聯、南北貫通，全面改寫台中住宅與產業版圖。隨著 74 號快速道路沿線交通效率到位，不僅加速重劃區開發節奏，更有效拉近各屯區之間的生活距離，帶動人口移入、產業進駐與房市價值穩健上行。
                </p>
                <p className="text-body leading-relaxed-custom text-text-primary text-justify">
                  從水湳經貿園區、十四期重劃區，到七期、八期、十三期及各大單元重劃區，74 快速道路所形成的磁吸效應，促使區域機能迅速到位，商業、教育、醫療與綠地資源相繼成熟，形塑交通便捷、生活完整的城市新核心。在建設持續兌現下，74 軸線不只是道路，更是推動台中重劃區共伴成長、引領各屯區價值躍升的關鍵引擎。
                </p>
              </div>
            </div>

            {/* 右側：圖片 */}
            <div className="flex-1 h-full flex items-center justify-center bg-gray-100 relative">
              {/* TODO: 請替換為 74 快速道路實際圖片 */}
              <img
                src="/images/anchor-future/_0003_pixta_97593564_M.webp"
                alt="情境示意圖"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>
          </div>
        </div>
      );
    }

    if (specialModal === 'comparison') {
      return (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
          <CloseButton onClick={() => setSpecialModal(null)} />

          {/* 滿版圖片 */}
          <div className="h-full flex items-center justify-center p-8">
            <img
              src="/images/anchor-future/聚碩-重劃區比較表.webp"
              alt="重劃區比較表"
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain animate-fade-in"
            />
          </div>
        </div>
      );
    }

    return null;
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
            className="font-light text-h2 leading-tight"
            style={{ letterSpacing: '0.05em', marginBottom: '1rem' }}
          >
            重劃之姿 定錨未來
          </h1>

          {/* 內文 */}
          <p
            className="leading-relaxed text-body"
            style={{ marginTop: '1.5rem' }}
          >
            台中重劃區共伴效應帶動地段價值提升，隨著台中市基礎建設捷運藍線與綠線的逐步完善，吸引建商推案、人口移入，形成機能成熟、環境優美、交通便捷的重劃發展區域，水湳經貿園區與十四期重劃區等地的發展，七期、八期、十三期、十四期、單元等重劃區都因為磁吸效應，成為都市發展熱點。
          </p>

          {/* 按鈕區 */}
          <div className="flex gap-3" style={{ marginTop: '2rem' }}>
            <RippleButton onClick={() => setSpecialModal('highway74')}>
              <span>74快速道路</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </RippleButton>
            <RippleButton onClick={() => setSpecialModal('comparison')}>
              <span>重劃區比較表</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </RippleButton>
          </div>
        </div>
      </div>

      {/* 燈箱 */}
      {renderModal()}
      {renderSpecialModal()}

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

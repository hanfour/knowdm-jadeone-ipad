import React, { useState, useRef, useEffect } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

// 特色項目結構
interface FeatureItem {
  title: string;
  desc: string;
}

// Tab 資料結構
interface TabData {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  content?: string;
  features?: FeatureItem[];
  image?: string;
  video?: string;
  videoLoop?: { start: number; end: number };
  layout?: 'default' | 'side-by-side'; // 版面配置
}

// 三個章節的資料
const tabs: TabData[] = [
  {
    id: 'water-storage',
    name: '總儲水彎規劃',
    title: '總儲水彎規劃',
    subtitle: 'Water Storage Planning',
    content: '（內容待補充）',
  },
  {
    id: 'pipe-insulation',
    name: '冷熱水管披覆',
    title: '冷熱水管披覆',
    subtitle: 'Pipe Insulation',
    features: [
      {
        title: '冷水管 PVC',
        desc: '具有抗腐蝕、不生鏽特性，提供長時間水質穩定性。'
      },
      {
        title: '熱水管披覆',
        desc: '具有保溫效果，集中熱能輸送，減少熱水器頻頻提高水溫，造成電力或瓦斯的浪費。'
      },
    ],
    image: '/images/piping/pipe-insulation.png',
    video: '/images/piping/pipe-insulation.mov',
    videoLoop: { start: 0, end: 7 },
    layout: 'side-by-side',
  },
  {
    id: 'exposed-concealed',
    name: '明暗管施工',
    title: '明暗管施工',
    subtitle: 'Exposed & Concealed Piping',
    content: '全棟平頂採部分明管設計。給水管路明暗管設計施工，及管路天花板出口設計，變更彈性大，方便日後維護施工重新調整。',
    video: '/images/piping/exposed-concealed.mov',
    videoLoop: { start: 0, end: 10 },
  },
];

const PipingEngineeringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pipe-insulation');
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 影片 loop 播放
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (currentTab.videoLoop) {
        const { start, end } = currentTab.videoLoop;
        if (video.currentTime >= end) {
          video.currentTime = start;
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentTab]);

  // 切換 tab 時自動播放影片
  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !currentTab.video) return;

      video.currentTime = 0;
      video.play();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // 監聽影片結束事件
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (currentTab.videoLoop) {
        video.currentTime = currentTab.videoLoop.start;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentTab]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundColor: '#e8e4df' }}
    >
      {/* 動畫樣式 */}
      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
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
          padding: 2px;
        }

        .tab-item {
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-item:hover:not(.active) {
          background-color: rgba(75, 85, 99, 0.9);
        }
      `}</style>

      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 */}
      <div className="absolute inset-0 flex" style={{ top: '80px' }}>
        {/* 內容區（文字+圖片/影片） */}
        <div className="flex-1 flex">
          {/* 左側文字區塊 */}
          <div className="w-[40%] flex flex-col justify-center px-16">
            <div className="max-w-lg">
              {/* 標題 */}
              <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-2">
                {currentTab.title}
              </h1>

              {/* 英文副標題 */}
              {currentTab.subtitle && (
                <p className="!hidden text-small tracking-wide-custom text-text-muted mb-8 italic">
                  {currentTab.subtitle}
                </p>
              )}

              {/* 內文（純文字） */}
              {currentTab.content && (
                <p className="text-body leading-loose-custom text-text-primary text-justify">
                  {currentTab.content}
                </p>
              )}

              {/* 特色列表 */}
              {currentTab.features && currentTab.features.length > 0 && (
                <div className="space-y-6">
                  {currentTab.features.map((feature, index) => (
                    <div key={index}>
                      <h3 className="text-large font-medium text-text-primary mb-2">
                        {feature.title}
                      </h3>
                      {feature.desc && (
                        <p className="text-body text-text-primary leading-loose-custom text-justify">
                          {feature.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右側媒體區 */}
          <div className="flex-1 h-full overflow-hidden flex items-center justify-center p-8">
            {/* side-by-side 版面：圖片與影片左右排列 */}
            {currentTab.layout === 'side-by-side' && currentTab.image && currentTab.video && (
              <div className="flex gap-2 items-center justify-center h-[60vh]">
                {/* 圖片 */}
                <img
                  src={currentTab.image}
                  alt={currentTab.title}
                  className="h-full w-auto object-contain mix-blend-darken"
                />
                {/* 影片 */}
                <video
                  ref={videoRef}
                  src={currentTab.video}
                  className="h-full w-auto object-contain border-0 outline-none mix-blend-darken"
                  style={{ border: 'none', outline: 'none' }}
                  playsInline
                  muted
                  autoPlay
                />
              </div>
            )}

            {/* 預設版面：單一影片 */}
            {currentTab.layout !== 'side-by-side' && currentTab.video && (
              <video
                ref={videoRef}
                src={currentTab.video}
                className="max-w-full max-h-[80vh] object-contain border-0 outline-none scale-[1.02] mix-blend-darken"
                style={{ border: 'none', outline: 'none' }}
                playsInline
                muted
                autoPlay
              />
            )}

            {/* 預設版面：單一圖片 */}
            {currentTab.layout !== 'side-by-side' && currentTab.image && !currentTab.video && (
              <img
                src={currentTab.image}
                alt={currentTab.title}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* 右下角 Tabs 區 + 註解 */}
        <div className="absolute right-8 bottom-6 flex flex-col items-end gap-4">
          {/* Tabs 列表 - 橫向排列 */}
          <div className="flex items-end gap-3">
            {tabs.map((tab) => (
              <div key={tab.id} className="relative">
                {/* Shine 邊框效果 - 僅選中時顯示 */}
                {activeTab === tab.id && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 border border-white/40" />
                    <div className="absolute inset-0 shine-border" />
                  </div>
                )}
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    tab-item px-2 py-4 h-28 text-micro tracking-normal-custom
                    [writing-mode:vertical-rl] [text-orientation:mixed]
                    ${activeTab === tab.id
                      ? 'active bg-[#0b2d2a] text-gold'
                      : 'bg-[#0b2d2a] text-white/80'
                    }
                  `}
                >
                  {tab.name}
                </button>
              </div>
            ))}
          </div>

          {/* 右下角註解 */}
          <p className="text-micro text-text-light">
            示意圖僅供參考，實際依現場施工為準
          </p>
        </div>
      </div>
    </div>
  );
};

export default PipingEngineeringPage;

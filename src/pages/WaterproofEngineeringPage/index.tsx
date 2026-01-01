import React, { useState, useRef, useEffect } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

// 特色項目結構
interface FeatureItem {
  title: string;
  desc: string;
}

// 影片時間段結構
interface VideoSegment {
  label: string;
  start: number;
  end: number;
  loopFrom?: number;
}

// 影片 loop 設定（無 step 按鈕時使用）
interface VideoLoop {
  start: number;
  end: number;
}

// Tab 資料結構
interface TabData {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  content?: string;
  features?: FeatureItem[];
  advantages?: string[];
  image?: string;
  images?: string[];
  video?: string;
  videoSegments?: VideoSegment[];
  videoLoop?: VideoLoop;
  videoFullHeight?: boolean;
  videoShowReplay?: boolean;
  contentImage?: string;
}

// 七個章節的資料
const tabs: TabData[] = [
  {
    id: 'water-tank',
    name: '水箱防水',
    title: '水箱防水',
    subtitle: 'Water Tank Waterproofing',
    content: '地下水箱規劃高於樓版並設置清洗排水口，可避免生活用水被汙染，確保住戶用水乾淨。水箱底版及牆面一次澆置混凝土減少接縫滲水機會。',
    video: '/images/waterproof/water-tank.mov',
    videoShowReplay: true,
  },
  {
    id: 'cold-joint',
    name: '冷縫防水',
    title: '冷縫防水',
    subtitle: 'Cold Joint Waterproofing',
    content: '外牆於樓層灌漿接縫處施作液態膜底塗+彈性水泥打底，以抵抗樓層間裂痕產生，有效防止外牆漏水現象。',
    video: '/images/waterproof/cold-joint.mov',
    videoShowReplay: true,
  },
  {
    id: 'roof',
    name: '屋頂防水',
    title: '屋頂防水',
    subtitle: 'Roof Waterproofing',
    content: '待補充內容',
  },
  {
    id: 'bathroom',
    name: '浴室防水',
    title: '浴室防水',
    subtitle: 'Bathroom Waterproofing',
    content: '一般浴室淋浴間防水高度僅施作 100cm，長期使用後將因水分滲入，而導致牆壁發霉。本案對浴室全室乾、溼區加強防水，全室施作220cm有效防止浴室水氣滲透牆後問題。',
    video: '/images/waterproof/bathroom.mov',
    videoShowReplay: true,
  },
  {
    id: 'window-frame',
    name: '窗框防水',
    title: '窗框防水',
    subtitle: 'Window Frame Waterproofing',
    content: '於對外窗均嚴密施作窗框防水工法，可確保雨水不會滲露至屋內。外牆上開口（門、窗）角落設置補強鋼筋，以抵抗角落壓力集中，減少剪力裂縫，並於窗框組立填縫完後，再崁縫處施作波利膠防水層，形成兩道嚴密防護，有效阻絕窗框滲水。',
    video: '/images/waterproof/window-frame.mov',
    videoShowReplay: true,
  },
  {
    id: 'balcony',
    name: '陽台防水',
    title: '陽台防水',
    subtitle: 'Balcony Waterproofing',
    content: '待補充內容',
  },
  {
    id: 'drain',
    name: '落水頭設置',
    title: '落水頭設置',
    subtitle: 'Drain Installation',
    content: '待補充內容',
  },
];

const WaterproofEngineeringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('water-tank');
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [showReplayButton, setShowReplayButton] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stopTimeRef = useRef<number | null>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 影片時間更新監聽 - loop 播放
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // videoLoop 模式（無 step 按鈕，指定區間 loop）
      if (currentTab.videoLoop) {
        const { start, end } = currentTab.videoLoop;
        if (video.currentTime >= end) {
          video.currentTime = start;
        }
        return;
      }

      // videoSegments 模式（有 step 按鈕）
      const segments = currentTab.videoSegments;
      if (!segments || activeSegment < 0) return;

      const segment = segments[activeSegment];
      if (!segment) return;

      if (video.currentTime >= segment.end) {
        const loopPoint = segment.loopFrom ?? (segment.end - 1);
        video.currentTime = Math.max(segment.start, loopPoint);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [currentTab, activeSegment]);

  // 切換 tab 時重置 segment 並自動播放
  useEffect(() => {
    setActiveSegment(0);
    stopTimeRef.current = null;
    setShowReplayButton(false);

    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !currentTab.video) return;

      if (currentTab.videoSegments) {
        playSegment(0);
      } else if (currentTab.videoLoop) {
        video.currentTime = 0;
        video.play();
      } else if (currentTab.videoShowReplay) {
        video.currentTime = 0;
        video.play();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // 監聽影片結束事件
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (currentTab.videoShowReplay) {
        setShowReplayButton(true);
        return;
      }
      if (currentTab.videoLoop) {
        video.currentTime = currentTab.videoLoop.start;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentTab]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowReplayButton(false);
    video.currentTime = 0;
    video.play();
  };

  const playSegment = (index: number) => {
    const video = videoRef.current;
    const segments = currentTab.videoSegments;
    if (!video || !segments || !segments[index]) return;

    const segment = segments[index];
    setActiveSegment(index);
    video.currentTime = segment.start;
    stopTimeRef.current = segment.end;
    video.play();
  };

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
        {/* 內容區（文字+圖片） */}
        <div className="flex-1 flex">
          {/* 左側文字區塊 */}
          <div className="w-[45%] flex flex-col justify-center px-16">
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
                <div className="space-y-3 mt-4">
                  {currentTab.features.map((feature, index) => (
                    <div key={index}>
                      <div className="flex items-start">
                        <span className="text-body font-medium text-text-primary mr-1 shrink-0">
                          {index + 1}.
                        </span>
                        <span className="text-body font-medium text-text-primary">
                          {feature.title}
                        </span>
                      </div>
                      {feature.desc && (
                        <p className="text-small text-text-primary mt-1 pl-4 leading-relaxed-custom">
                          {feature.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 優點列表 */}
              {currentTab.advantages && currentTab.advantages.length > 0 && (
                <div className="mt-6 p-4 bg-text-primary/5 border-l-4 border-text-primary/30">
                  <p className="text-body font-medium text-text-secondary mb-2">
                    優點
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {currentTab.advantages.map((adv, index) => (
                      <span key={index} className="text-body text-text-primary">
                        ({index + 1}) {adv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 按鈕列（影片章節用） */}
              {currentTab.videoSegments && currentTab.videoSegments.length > 0 && (
                <div className="flex gap-3 mt-8">
                  {currentTab.videoSegments.map((segment, index) => (
                    <button
                      key={index}
                      onClick={() => playSegment(index)}
                      className={`
                        px-5 py-2 text-small font-medium transition-all
                        ${activeSegment === index
                          ? 'bg-[#d4a853] text-white'
                          : 'bg-white/80 text-text-secondary hover:bg-white'
                        }
                      `}
                    >
                      {segment.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 內容區下方小圖片 */}
              {currentTab.contentImage && (
                <div className="mt-8">
                  <img
                    src={currentTab.contentImage}
                    alt={currentTab.title}
                    className="max-w-full h-auto mix-blend-darken"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 右側示意圖 */}
          <div className="flex-1 h-full overflow-hidden flex items-center justify-center p-8">
            {/* 影片播放器 */}
            {currentTab.video && (
              <div className={`relative overflow-hidden flex items-center justify-center ${currentTab.videoFullHeight ? 'h-full w-full' : ''}`}>
                <video
                  ref={videoRef}
                  src={currentTab.video}
                  className={`object-contain border-0 outline-none scale-[1.02] mix-blend-darken ${currentTab.videoFullHeight ? 'h-full' : 'max-w-full max-h-[80vh]'}`}
                  style={{ border: 'none', outline: 'none' }}
                  playsInline
                  muted
                />
                {/* 重播按鈕 */}
                {showReplayButton && currentTab.videoShowReplay && (
                  <button
                    onClick={handleReplay}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <svg
                        className="w-10 h-10 text-text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            )}

            {/* 單張圖片 */}
            {currentTab.image && !currentTab.images && !currentTab.video && (
              <img
                src={currentTab.image}
                alt={currentTab.title}
                className="max-w-full max-h-full object-contain"
              />
            )}

            {/* 多張圖片 - 上圖靠右、下圖靠左 */}
            {currentTab.images && currentTab.images.length > 0 && (
              <div className="w-full h-full flex flex-col justify-center p-8">
                {currentTab.images[0] && (
                  <div className="flex justify-end">
                    <img
                      src={currentTab.images[0]}
                      alt={`${currentTab.title} 1`}
                      className="w-[55%] max-w-md h-auto object-contain"
                    />
                  </div>
                )}
                {currentTab.images[1] && (
                  <div className="flex justify-start">
                    <img
                      src={currentTab.images[1]}
                      alt={`${currentTab.title} 2`}
                      className="w-[60%] max-w-lg h-auto object-contain mix-blend-darken"
                    />
                  </div>
                )}
              </div>
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
            3D示意圖僅供參考，實際依現場施工為準
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterproofEngineeringPage;

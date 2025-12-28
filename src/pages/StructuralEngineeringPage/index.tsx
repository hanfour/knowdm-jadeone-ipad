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
  start: number;    // 開始時間（秒）
  end: number;      // 結束時間（秒）
  loopFrom?: number; // loop 起點（秒），預設為 end - 1
}

// 影片 loop 設定（無 step 按鈕時使用）
interface VideoLoop {
  start: number;  // loop 回跳點（秒）- 當播放到 end 時跳回此處
  end: number;    // loop 結束點（秒）- 播放到此處時觸發 loop
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
  images?: string[]; // 支援多張圖片
  video?: string;    // 影片路徑
  videoSegments?: VideoSegment[]; // 影片時間段（有 step 按鈕）
  videoLoop?: VideoLoop; // 影片 loop 設定（無 step 按鈕，自動 loop）
  videoFullHeight?: boolean; // 影片是否高度滿版
  videoShowReplay?: boolean; // 影片播完後顯示重播按鈕
  contentImage?: string; // 內容區下方的小圖片
}

// 八個章節的資料
const tabs: TabData[] = [
  {
    id: 'raft-foundation',
    name: '筏式基礎',
    title: '筏式基礎',
    subtitle: 'Raft Foundation',
    content: '',
    features: [
      { title: '穩若磐石的地質基礎', desc: '本案基礎深達地下 GL−10.75 米，穩穩座落於 N 值超過 50 的堅實卵礫石地層之上。' },
      { title: '超越地質的考驗', desc: '經過專業嚴謹的地質評估，此地層不僅承載力足夠，更驗證無土壤液化之虞，為您提供最可靠的地基保障。' },
      { title: '嚴謹的結構設計', desc: '地下結構之設計，需考量沉陷量、土壤承載力、開挖深度、以及側向土壓力等工程條件。基礎部分則採用筏式基礎，地樑深度250cm，頂版版厚20cm，筏式基底厚60cm。' },
    ],
    advantages: ['減少差異沉陷', '防水，阻水滲透', '對荷重有補償作用'],
    images: [
      '/images/structural/raft-foundation-01.png',
      '/images/structural/raft-foundation-02.jpg',
    ],
  },
  {
    id: 'beam-reinforcement',
    name: '結構梁補強',
    title: '結構梁補強',
    subtitle: 'Beam Reinforcement',
    content: '梁屬結構行為中不可或缺之要件，故穿梁之動作，將影響結構強度。本案將穿梁補強列為重點，能將管線穿梁之孔徑補強，並使結構梁回復原始結構強度。針對工程上必須穿梁配管開口部分，於結構體施工加強開口部份做配筋補強，避免產生結構弱點，並嚴格執行。',
    video: '/images/structural/beam-reinforcement.mov',
    videoLoop: { start: 0, end: 7 },
    videoFullHeight: true,
  },
  {
    id: 'corner-reinforcement',
    name: '樓板角隅補強',
    title: '樓板角隅補強',
    subtitle: 'Corner Reinforcement',
    content: '在樓板的角隅處施作補強鋼筋，可防止樓板龜裂。補強鋼筋端部應彎曲插入梁內30cm。',
    features: [
      { title: '補強鋼筋大小之間距與樓版主筋相同', desc: '' },
      { title: '上層鋼筋平行於板角對角線', desc: '' },
      { title: '下層鋼筋垂直於板角對角線', desc: '' },
      { title: '補強鋼筋置於板上層', desc: '' },
    ],
    video: '/images/structural/corner-reinforcement.mov',
    videoLoop: { start: 0, end: 8 }, // 請調整實際秒數
  },
  {
    id: 'rebar-spacer',
    name: '鋼筋分隔器',
    title: '鋼筋分隔器',
    subtitle: 'Rebar Spacer',
    content: '所有梁與柱於鋼筋主筋中皆有配置鋼筋分隔器。',
    features: [
      { title: '使鋼筋主筋維持正確之垂直度，避免主筋偏心，導致結構損壞', desc: '' },
      { title: '鋼筋分隔器之設置可預防鋼筋保護層不足，避免鋼筋裸露，造成鏽蝕，導致混凝土中性化', desc: '' },
    ],
    image: '/images/structural/rebar-spacer.png',
  },
  {
    id: 'rebar-tying',
    name: '鋼筋綁紮',
    title: '鋼筋綁紮',
    subtitle: 'Rebar Tying',
    features: [
      { title: '抗震核心，緊密圍束', desc: '柱體採用符合最高耐震規定的緊密箍筋與繫筋，形成強大的鋼筋籠。' },
      { title: '135° 耐震彎鉤', desc: '箍筋與繫筋均採 135 度耐震彎鉤工法，有效圍束核心混凝土，在地震劇烈搖晃時防止柱體爆裂，大幅提升生命安全。針對高軸力柱，額外增加繫筋加強圍束，穩固性無庸置疑。' },
      { title: '高拉力耐震鋼筋', desc: '箍筋採用韌性極佳的SD420高拉力鋼筋，具備優異的延展性與強度，符合最新耐震鋼筋標準。' },
    ],
    video: '/images/structural/rebar-tying.mov',
    videoSegments: [
      { label: 'Step 1', start: 0, end: 4 },
      { label: 'Step 2', start: 4, end: 7 },
      { label: 'Step 3', start: 8, end: 12 },
      { label: 'Step 4', start: 12, end: 18 },
    ],
  },
  {
    id: 'rebar-coupler',
    name: '鋼筋續接器',
    title: '鋼筋續接器',
    subtitle: 'Rebar Coupler',
    content: '考量傳統柱搭接方式，於搭接處鋼筋過密，易造成混凝土搗實不良，直接影響鋼筋握裹力；每只鋼筋的續接點應分佈在兩個不同斷面上，並採用國家認證之（SA）級施作，當受到外力時，柱體較不易發生挫屈或破壞的情況，以達成耐震設計規範，大幅提升結構耐震度。採二層續接一次（錯開一半）位置一律續接於樓板至樑下淨高中間1/2範圍內。',
    contentImage: '/images/structural/rebar-coupler.png',
    video: '/images/structural/rebar-coupler.mov',
    videoLoop: { start: 0, end: 5 },
    videoFullHeight: true,
  },
  {
    id: 'staggered-splice',
    name: '鋼筋錯層續接',
    title: '鋼筋錯層續接',
    subtitle: 'Staggered Splice',
    content: '考量傳統柱搭接方式，於搭接處鋼筋過密，易造成混凝土搗實不良，直接影響鋼筋握裹力；今本案全面採用鋼筋續接器，直接提升結構品質，並錯層續接。',
    video: '/images/structural/staggered-splice.mov',
    videoLoop: { start: 0, end: 5 },
    videoFullHeight: true,
  },
  {
    id: 'double-layer-rebar',
    name: '雙層配筋',
    title: '雙層配筋',
    subtitle: 'Double Layer Rebar',
    content: '加強隔音、隔熱，居家更舒適。採用雙層配筋、15cm加厚樓板，加強隔音、隔熱功能，減少龜裂、漏水現象發生。加厚樓地板，抵抗地震橫向拉力，雙層雙向鋼筋編織，鋼筋每平方公分可達4200kg抗拉強度，安心加倍。',
    video: '/images/structural/double-layer-rebar.mov',
    videoShowReplay: true,
  },
  {
    id: 'window-frame-reinforcement',
    name: '窗框補強',
    title: '窗框補強',
    subtitle: 'Window Frame Reinforcement',
    content: '外牆上開口（門、窗）角落設置補強鋼筋，以抵抗角落壓力集中，減少剪力裂縫。',
    video: '/images/structural/window-frame-reinforcement.mov',
    videoLoop: { start: 0, end: 7 },
  },
];

const StructuralEngineeringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('raft-foundation');
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [showReplayButton, setShowReplayButton] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stopTimeRef = useRef<number | null>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 影片時間更新監聯 - loop 播放
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // videoLoop 模式（無 step 按鈕，指定區間 loop）
      // 影片從頭播放，當播放到 end 時跳回 start 繼續 loop
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

      // 當播放到結束時間，跳回 loopFrom 位置繼續播放
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

    // 延遲一下確保 video element 已經載入
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !currentTab.video) return;

      if (currentTab.videoSegments) {
        // 有 step 按鈕，播放 Step 1
        playSegment(0);
      } else if (currentTab.videoLoop) {
        // 無 step 按鈕，從頭開始播放（loop 只在指定區間）
        video.currentTime = 0;
        video.play();
      } else if (currentTab.videoShowReplay) {
        // 播放一次，播完顯示重播按鈕
        video.currentTime = 0;
        video.play();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // 監聯影片結束事件
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // videoShowReplay 模式：顯示重播按鈕
      if (currentTab.videoShowReplay) {
        setShowReplayButton(true);
        return;
      }
      // videoLoop 模式：自動重播
      if (currentTab.videoLoop) {
        video.currentTime = currentTab.videoLoop.start;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentTab]);

  // 重播影片
  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowReplayButton(false);
    video.currentTime = 0;
    video.play();
  };

  // 播放指定時間段
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
                <p className="text-small tracking-wide-custom text-text-muted mb-8 italic">
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
                    筏式基礎優點
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
                  className={`object-contain border-0 outline-none scale-[1.02] mix-blend-darken ${currentTab.videoFullHeight ? 'h-full' : 'max-w-full max-h-[70vh]'}`}
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
                {/* 第一張圖 - 靠右對齊 */}
                {currentTab.images[0] && (
                  <div className="flex justify-end">
                    <img
                      src={currentTab.images[0]}
                      alt={`${currentTab.title} 1`}
                      className="w-[55%] max-w-md h-auto object-contain"
                    />
                  </div>
                )}

                {/* 第二張圖 - 靠左對齊 */}
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
            {/* 頁面標題 */}
            <div className="!hidden text-text-secondary text-small tracking-widest-custom mr-4 pb-2">
              結構工學
            </div>

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

export default StructuralEngineeringPage;

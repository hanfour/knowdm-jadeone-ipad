import React, { useState, useEffect } from 'react';
import {
  EngineeringPageShell,
  VerticalTabList,
  VideoPlayer,
} from '../../components/EngineeringPage';
import { useVideoPlayer, VideoSegment, VideoLoop } from '../../hooks/useVideoPlayer';

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
  advantages?: string[];
  image?: string;
  images?: string[];
  video?: string;
  videoSegments?: VideoSegment[];
  videoLoop?: VideoLoop;
  videoFullHeight?: boolean;
  videoShowReplay?: boolean;
  contentImage?: string;
  // 動畫圖層模式
  animatedLayers?: {
    baseImage: string;
    layers: { line?: string; font: string }[];
    showRain?: boolean; // 是否顯示下雨效果
  };
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
    content: '針對頂樓住戶最顧慮的漏水及隔熱問題，於屋頂全面施作液態膜防水層。並於防水層施作完成前，屋頂全面存水，進行屋頂試水檢驗。確認無漏水後鋪設水泥砂漿，最後表面鋪設表面裝修材，達到最佳防水隔熱效果。',
    animatedLayers: {
      baseImage: '/images/waterproof/roof/屋頂防水_img.png',
      layers: [
        { line: '/images/waterproof/roof/屋頂防水_line01.png', font: '/images/waterproof/roof/屋頂防水_font01.png' },
        { line: '/images/waterproof/roof/屋頂防水_line02.png', font: '/images/waterproof/roof/屋頂防水_font02.png' },
        { line: '/images/waterproof/roof/屋頂防水_line03.png', font: '/images/waterproof/roof/屋頂防水_font03.png' },
        { line: '/images/waterproof/roof/屋頂防水_line04.png', font: '/images/waterproof/roof/屋頂防水_font04.png' },
        { font: '/images/waterproof/roof/屋頂防水_font05.png' },
      ],
    },
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
    content: '針對漏水及隔熱問題，於露臺施作複合式防水材。並於防水層施工後露臺存水進行試水檢驗。檢驗通過後再以水泥砂漿壓層，同時表面鋪設地磚達到最佳防水隔熱效果。門框填縫完後，再崁縫處施作波利膠防水層，形成兩道嚴密防護，有效阻絕門框滲水。',
    video: '/images/waterproof/balcony.mov',
    videoShowReplay: true,
  },
  {
    id: 'drain',
    name: '落水頭設置',
    title: '落水頭設置',
    subtitle: 'Drain Installation',
    content: '本案露臺及頂樓安裝落水頭，以防排水管阻塞反冒或落水頭阻塞時，雨水反而溢入室內。地坪洩水坡度為 1% 確保排水順暢。',
    animatedLayers: {
      baseImage: '/images/waterproof/drain/落水頭_img.png',
      layers: [
        { line: '/images/waterproof/drain/落水頭_line.png', font: '/images/waterproof/drain/落水頭_font.png' },
      ],
      showRain: true,
    },
  },
];

// 動畫圖層元件
const AnimatedLayersDisplay: React.FC<{
  baseImage: string;
  layers: { line?: string; font: string }[];
  isActive: boolean;
  showRain?: boolean;
}> = ({ baseImage, layers, isActive, showRain = false }) => {
  const [visibleLayers, setVisibleLayers] = useState<number>(-1); // -1 = 底圖未顯示
  const [showRainEffect, setShowRainEffect] = useState(false);

  // 重置並開始動畫
  useEffect(() => {
    if (!isActive) {
      setVisibleLayers(-1);
      setShowRainEffect(false);
      return;
    }

    // 重置
    setVisibleLayers(-1);
    setShowRainEffect(false);

    // 底圖淡入
    const baseTimer = setTimeout(() => {
      setVisibleLayers(0);
      // 底圖出現後開始下雨
      if (showRain) {
        setShowRainEffect(true);
      }
    }, 100);

    // 依序顯示各層
    const layerTimers = layers.map((_, index) => {
      return setTimeout(() => {
        setVisibleLayers(index + 1);
      }, 800 + index * 600); // 底圖後 800ms 開始，每層間隔 600ms
    });

    return () => {
      clearTimeout(baseTimer);
      layerTimers.forEach(timer => clearTimeout(timer));
    };
  }, [isActive, layers, showRain]);

  // 生成雨滴數據
  const rainDrops = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100, // 隨機水平位置 (%)
    delay: Math.random() * 2, // 隨機延遲 (秒)
    duration: 0.5 + Math.random() * 0.5, // 隨機下落時間 (0.5-1秒)
    opacity: 0.3 + Math.random() * 0.4, // 隨機透明度 (0.3-0.7)
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 動畫樣式 */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes drawLine {
          from {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes rainFall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(80vh + 100%));
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .animate-draw-line {
          animation: drawLine 0.4s ease-out forwards;
        }

        .rain-drop {
          position: absolute;
          top: 0;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, transparent, rgba(174, 194, 224, 0.8), rgba(174, 194, 224, 0.4));
          border-radius: 0 0 2px 2px;
          animation: rainFall linear infinite;
          pointer-events: none;
        }
      `}</style>

      {/* 圖層容器 */}
      <div className="relative max-w-full max-h-[80vh]">
        {/* 下雨效果 */}
        {showRain && showRainEffect && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {rainDrops.map((drop) => (
              <div
                key={drop.id}
                className="rain-drop"
                style={{
                  left: `${drop.left}%`,
                  animationDelay: `${drop.delay}s`,
                  animationDuration: `${drop.duration}s`,
                  opacity: drop.opacity,
                }}
              />
            ))}
          </div>
        )}

        {/* 底圖 */}
        <img
          src={baseImage}
          alt="動畫底圖"
          className={`max-w-full max-h-[80vh] object-contain transition-opacity duration-700 ${
            visibleLayers >= 0 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 疊加圖層 */}
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center ${
              visibleLayers > index ? 'pointer-events-none' : 'pointer-events-none opacity-0'
            }`}
          >
            {/* 線條 */}
            {layer.line && (
              <img
                src={layer.line}
                alt={`line ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-contain ${
                  visibleLayers > index ? 'animate-draw-line' : 'opacity-0'
                }`}
                style={{ animationDelay: '0ms' }}
              />
            )}
            {/* 文字 */}
            <img
              src={layer.font}
              alt={`font ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain ${
                visibleLayers > index ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: layer.line ? '200ms' : '0ms' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const WaterproofEngineeringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('water-tank');

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const { videoRef, activeSegment, showReplayButton, playSegment, handleReplay } = useVideoPlayer(
    activeTab,
    {
      video: currentTab.video,
      videoLoop: currentTab.videoLoop,
      videoSegments: currentTab.videoSegments,
      videoShowReplay: currentTab.videoShowReplay,
    }
  );

  return (
    <EngineeringPageShell sectionIndex={2}>
      {/* 內容區（文字+圖片） */}
      <div className="flex-1 flex">
        {/* 左側文字區塊 */}
        <div className="w-[45%] flex flex-col justify-center ps-24 pe-8">
          <div className="max-w-lg">
            {/* 標題 */}
            <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-2">
              {currentTab.title}
            </h1>

            {/* 英文副標題 */}
            {currentTab.subtitle && (
              <p className="!hidden text-body tracking-wide-custom text-text-muted mb-8 italic">
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
                      <p className="text-body text-text-primary mt-1 ps-4 leading-relaxed-custom">
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
                      px-5 py-2 text-body font-medium transition-all
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
          {/* 動畫圖層模式 */}
          {currentTab.animatedLayers && (
            <AnimatedLayersDisplay
              baseImage={currentTab.animatedLayers.baseImage}
              layers={currentTab.animatedLayers.layers}
              isActive={currentTab.id === activeTab}
              showRain={currentTab.animatedLayers.showRain}
            />
          )}

          {/* 影片播放器 */}
          {currentTab.video && (
            <VideoPlayer
              src={currentTab.video}
              videoRef={videoRef}
              fullHeight={currentTab.videoFullHeight}
              showReplayButton={showReplayButton && currentTab.videoShowReplay}
              onReplay={handleReplay}
            />
          )}

          {/* 單張圖片 */}
          {currentTab.image && !currentTab.images && !currentTab.video && !currentTab.animatedLayers && (
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

      {/* Tab 導航 */}
      <VerticalTabList
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        footnote="3D示意圖僅供參考，實際依現場施工為準"
      />
    </EngineeringPageShell>
  );
};

export default WaterproofEngineeringPage;

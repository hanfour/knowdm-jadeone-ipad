import React, { useState } from 'react';
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
  },
  {
    id: 'drain',
    name: '落水頭設置',
    title: '落水頭設置',
    subtitle: 'Drain Installation',
    content: '本案露臺及頂樓安裝落水頭，以防排水管阻塞反冒或落水頭阻塞時，雨水反而溢入室內。地坪洩水坡度為 1% 確保排水順暢。',
  },
];

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

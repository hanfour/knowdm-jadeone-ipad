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
    videoLoop: { start: 0, end: 8 },
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
      { title: '柱箍筋', desc: '柱箍筋以135°彎鉤配置，箍筋間距依建築技術規範，嚴格執行，充分發揮樑柱體抵抗剪力、扭力之強度，符合耐震要求。' },
      { title: '柱輔筋繫筋', desc: '柱輔筋繫筋依規定確實施工，一端90°，一端135°交錯配置橫樑主鋼筋與縱樑主鋼筋交叉穿過。橫樑腹筋採用U型，端部以180°彎鉤繞縱向主鋼筋，確實錨定U型開口，另以單支各彎135°及90°彎鉤之鋼筋，交錯配置成一完整圍束箍筋。' },
      { title: '箍筋間距', desc: '箍筋間距依據建築技術規定，嚴格執行，充分發揮樑抵抗剪力、扭力之強度，符合耐震要求。' },
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
                      <span className="text-body text-text-primary mr-1 shrink-0">
                        {index + 1}.
                      </span>
                      <span className="text-body text-text-primary">
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

export default StructuralEngineeringPage;

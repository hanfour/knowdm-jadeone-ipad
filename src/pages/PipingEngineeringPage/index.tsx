import React, { useState } from 'react';
import {
  EngineeringPageShell,
  VerticalTabList,
  VideoPlayer,
} from '../../components/EngineeringPage';
import { useVideoPlayer, VideoLoop } from '../../hooks/useVideoPlayer';

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
  videoLoop?: VideoLoop;
  layout?: 'default' | 'side-by-side';
}

// 三個章節的資料
const tabs: TabData[] = [
  {
    id: 'water-storage',
    name: '總儲水彎規劃',
    title: '總儲水彎規劃',
    subtitle: 'Water Storage Planning',
    content: '污、廢水多管分流分排，衛生工程排水分管各司其職，污水、廢水分開，採多管分流分排，排水不致造成阻塞、逆流，排水更順暢。',
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

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const { videoRef } = useVideoPlayer(activeTab, {
    video: currentTab.video,
    videoLoop: currentTab.videoLoop,
  });

  return (
    <EngineeringPageShell sectionIndex={2}>
      {/* 內容區（文字+圖片/影片） */}
      <div className="flex-1 flex">
        {/* 左側文字區塊 */}
        <div className="w-[40%] flex flex-col justify-center ps-24 pe-8">
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
            <VideoPlayer
              src={currentTab.video}
              videoRef={videoRef}
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

      {/* Tab 導航 */}
      <VerticalTabList
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </EngineeringPageShell>
  );
};

export default PipingEngineeringPage;

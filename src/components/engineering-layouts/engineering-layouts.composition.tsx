import React, { useState, useRef } from 'react';
import {
  VerticalTabList,
  ComparisonLayout,
  NumberedFeatureList,
  TitledFeatureList,
  BulletLabelList,
  AdvantagesList,
  StepButtons,
  FullBgImageLayout,
  LeftTextRightMedia,
  VideoPlayer,
} from './index';
import type { TabItem, ComparisonItem, FeatureItem, FeatureLabelItem } from './index';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  minHeight: '400px',
  backgroundColor: '#f5f5f5',
  padding: '2rem',
};

// 示例數據
const sampleTabs: TabItem[] = [
  { id: 'tab1', name: '隔音工法' },
  { id: 'tab2', name: '防水工法' },
  { id: 'tab3', name: '隔熱工法' },
];

const sampleFeatures: FeatureItem[] = [
  { title: '高效隔音', desc: '採用專業隔音材料，有效阻隔噪音傳遞' },
  { title: '環保材質', desc: '使用環保認證材料，無毒無害' },
  { title: '耐久性強', desc: '經久耐用，長期維持效能' },
];

const sampleLabelFeatures: FeatureLabelItem[] = [
  { label: '材質', text: '高密度隔音棉' },
  { label: '厚度', text: '50mm 專業規格' },
  { label: '認證', text: '通過 ISO 國際認證' },
];

const sampleComparison: { left: ComparisonItem; right: ComparisonItem } = {
  left: {
    image: '/images/placeholder.webp',
    title: '傳統工法',
    description: '傳統施工方式，效果一般',
  },
  right: {
    image: '/images/placeholder.webp',
    title: '新式工法',
    description: '採用創新技術，效果顯著提升',
  },
};

export const VerticalTabListDemo = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <div style={{ ...containerStyle, height: '300px', backgroundColor: '#0b2d2a' }}>
      <VerticalTabList
        tabs={sampleTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <p style={{ color: '#fff', position: 'absolute', top: '1rem', left: '1rem' }}>
        當前選中：{activeTab}
      </p>
    </div>
  );
};

export const NumberedFeatureListDemo = () => (
  <div style={containerStyle}>
    <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>編號式特色列表</h3>
    <NumberedFeatureList features={sampleFeatures} />
  </div>
);

export const TitledFeatureListDemo = () => (
  <div style={containerStyle}>
    <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>標題式特色列表</h3>
    <TitledFeatureList features={sampleFeatures} />
  </div>
);

export const BulletLabelListDemo = () => (
  <div style={containerStyle}>
    <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>圓點標籤式列表</h3>
    <BulletLabelList features={sampleLabelFeatures} />
  </div>
);

export const AdvantagesListDemo = () => (
  <div style={containerStyle}>
    <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>優點列表</h3>
    <AdvantagesList
      title="主要優勢"
      advantages={['隔音效果佳', '施工快速', '價格合理', '保固完善']}
    />
  </div>
);

export const StepButtonsDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const segments = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ];
  return (
    <div style={containerStyle}>
      <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>步驟按鈕</h3>
      <StepButtons
        segments={segments}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </div>
  );
};

export const ComparisonLayoutDemo = () => (
  <div style={{ ...containerStyle, minHeight: '600px' }}>
    <ComparisonLayout
      title="工法比較"
      subtitle="了解傳統與新式工法的差異"
      left={sampleComparison.left}
      right={sampleComparison.right}
    />
  </div>
);

export const FullBgImageLayoutDemo = () => (
  <div style={{ ...containerStyle, minHeight: '500px', padding: 0 }}>
    <FullBgImageLayout
      bgImage="/images/placeholder.webp"
      title="全幅背景佈局"
      content="這是一個帶有全屏背景圖的版面配置，適合用於展示大型視覺內容。"
      details={['特點一：視覺衝擊力強', '特點二：文字清晰可讀']}
    />
  </div>
);

export const LeftTextRightMediaDemo = () => (
  <div style={{ ...containerStyle, minHeight: '400px' }}>
    <LeftTextRightMedia
      title="左文右圖佈局"
      subtitle="Layout Component"
      showSubtitle={true}
      content="這是一個左側文字、右側媒體的標準版面配置。"
      details={['可自訂左側寬度', '右側可放置任何內容']}
    >
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        右側媒體區域
      </div>
    </LeftTextRightMedia>
  </div>
);

export const VideoPlayerDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div style={containerStyle}>
      <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>影片播放器</h3>
      <VideoPlayer
        src="/videos/sample.mp4"
        videoRef={videoRef}
        showReplayButton={true}
        onReplay={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        }}
      />
    </div>
  );
};

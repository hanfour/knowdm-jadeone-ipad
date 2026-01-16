import React, { useState, useRef } from 'react';
import { MemoryRouter } from 'react-router-dom';
import EngineeringPageShell from '../components/EngineeringPage/EngineeringPageShell';
import VerticalTabList from '../components/EngineeringPage/VerticalTabList';
import ComparisonLayout from '../components/EngineeringPage/ComparisonLayout';
import LeftTextRightMedia from '../components/EngineeringPage/LeftTextRightMedia';
import FullBgImageLayout from '../components/EngineeringPage/FullBgImageLayout';
import VideoPlayer from '../components/EngineeringPage/VideoPlayer';
import {
  NumberedFeatureList,
  TitledFeatureList,
  BulletLabelList,
  AdvantagesList,
  StepButtons,
} from '../components/EngineeringPage/FeatureList';

/**
 * 工程頁面元件集合
 * 用於精品工學、結構工學等技術展示頁面的共用元件
 */
export default {
  title: 'EngineeringPage',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

// ============================================
// Engineering Page Shell
// ============================================

/**
 * 工程頁面外殼
 * 提供統一的頁面結構與導航列
 */
export const PageShell = {
  render: () => (
    <MemoryRouter>
      <div style={{ width: '100vw', height: '100vh' }}>
        <EngineeringPageShell sectionIndex={2} backgroundColor="#e8e4df">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-h2 text-text-primary mb-4">工程頁面外殼</h1>
              <p className="text-body text-text-secondary">
                EngineeringPageShell 提供統一的頁面結構
              </p>
            </div>
          </div>
        </EngineeringPageShell>
      </div>
    </MemoryRouter>
  ),
};

/**
 * 工程頁面外殼 - 深色背景
 */
export const PageShellDark = {
  render: () => (
    <MemoryRouter>
      <div style={{ width: '100vw', height: '100vh' }}>
        <EngineeringPageShell sectionIndex={2} backgroundColor="#1a1a1a">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-h2 text-gold mb-4">深色背景版本</h1>
              <p className="text-body text-white/70">
                適用於需要深色背景的頁面
              </p>
            </div>
          </div>
        </EngineeringPageShell>
      </div>
    </MemoryRouter>
  ),
};

// ============================================
// Vertical Tab List
// ============================================

/**
 * 垂直分頁列表
 * 右下角的直排分頁選擇器，帶 Shine 邊框效果
 */
export const VerticalTabs = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const tabs = [
      { id: 'tab1', name: '結構介紹' },
      { id: 'tab2', name: '材料說明' },
      { id: 'tab3', name: '施工流程' },
      { id: 'tab4', name: '品質保證' },
    ];

    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#e8e4df' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-body text-text-secondary">
            當前選中: {tabs.find(t => t.id === activeTab)?.name}
          </p>
        </div>
        <VerticalTabList
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          footnote="示意圖僅供參考，實際依現場施工為準"
        />
      </div>
    );
  },
};

// ============================================
// Comparison Layout
// ============================================

/**
 * 比較佈局
 * 左右兩欄的圖片與說明比較
 */
export const Comparison = {
  render: () => (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e4df' }}>
      <ComparisonLayout
        title="結構比較"
        subtitle="傳統工法與新式工法的差異"
        left={{
          image: 'https://picsum.photos/400/300?random=1',
          title: '傳統結構',
          description: '傳統結構採用一般混凝土，強度與耐久性相對較低，長期使用可能產生裂縫。',
        }}
        right={{
          image: 'https://picsum.photos/400/300?random=2',
          title: '新式結構',
          description: '新式結構採用高強度混凝土配合精密配筋，大幅提升結構耐久性與抗震能力。',
        }}
      />
    </div>
  ),
};

// ============================================
// Full Background Image Layout
// ============================================

/**
 * 滿版背景圖佈局
 * 全螢幕背景圖片配合左側文字說明
 */
export const FullBackgroundImage = {
  render: () => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FullBgImageLayout
        bgImage="https://picsum.photos/1920/1080?random=10"
        title="精品工學"
        content="採用頂級建材與精密工法，每一個細節都經過嚴格把關。從基礎結構到表面裝飾，確保品質達到國際標準，為您打造經得起時間考驗的居所。"
        details={[
          '・採用日本進口鋼材',
          '・符合耐震七級標準',
          '・通過 SGS 品質認證',
        ]}
      />
    </div>
  ),
};

/**
 * 滿版背景圖佈局 - 簡潔版
 * 僅顯示標題
 */
export const FullBackgroundImageSimple = {
  render: () => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FullBgImageLayout
        bgImage="https://picsum.photos/1920/1080?random=11"
        title="結構工學"
      />
    </div>
  ),
};

// ============================================
// Left Text Right Media Layout
// ============================================

/**
 * 左文右媒體佈局
 * 左側文字說明，右側為圖片或影片
 */
export const LeftTextRightMediaLayout = {
  render: () => (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e4df' }}>
      <LeftTextRightMedia
        title="精品工學"
        subtitle="Boutique Engineering"
        showSubtitle={true}
        content="採用頂級建材與精密工法，每一個細節都經過嚴格把關。從基礎結構到表面裝飾，確保品質達到國際標準，為您打造經得起時間考驗的居所。"
        details={[
          '・採用日本進口鋼材',
          '・符合耐震七級標準',
          '・通過 SGS 品質認證',
        ]}
      >
        <img
          src="https://picsum.photos/800/600?random=3"
          alt="示意圖"
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
        />
      </LeftTextRightMedia>
    </div>
  ),
};

// ============================================
// Video Player
// ============================================

/**
 * 影片播放器
 * 支援重播按鈕與循環播放
 */
export const VideoPlayerDemo = {
  render: () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showReplay, setShowReplay] = useState(false);

    const handleReplay = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        // eslint-disable-next-line storybook/context-in-play-function
        videoRef.current.play();
        setShowReplay(false);
      }
    };

    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e4df', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <VideoPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            videoRef={videoRef}
            showReplayButton={showReplay}
            onReplay={handleReplay}
            loop={false}
          />
          <p className="text-center text-body text-text-secondary mt-4">
            VideoPlayer 元件 - 用於工程說明影片
          </p>
        </div>
      </div>
    );
  },
};

// ============================================
// Feature Lists
// ============================================

/**
 * 編號式特色列表
 */
export const NumberedFeatures = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#e8e4df', minHeight: '100vh' }}>
      <h2 className="text-h3 text-text-primary mb-6">編號式特色列表</h2>
      <NumberedFeatureList
        features={[
          { title: '高強度混凝土', desc: '採用 4000psi 以上高強度混凝土，確保結構安全。' },
          { title: '精密配筋設計', desc: '經由結構技師精算，最佳化鋼筋配置。' },
          { title: '品質檢驗', desc: '每批材料皆經過 SGS 認證實驗室檢驗。' },
        ]}
      />
    </div>
  ),
};

/**
 * 標題式特色列表
 */
export const TitledFeatures = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#e8e4df', minHeight: '100vh' }}>
      <h2 className="text-h3 text-text-primary mb-6">標題式特色列表</h2>
      <TitledFeatureList
        features={[
          { title: '結構安全', desc: '採用最新耐震設計規範，通過嚴格結構審查，確保居住安全無虞。' },
          { title: '材料品質', desc: '選用頂級建材，所有材料皆有完整檢驗報告與產地證明。' },
          { title: '施工品管', desc: '專業監造團隊全程監督，確保每一道工序符合設計規範。' },
        ]}
      />
    </div>
  ),
};

/**
 * 圓點標籤式特色列表
 */
export const BulletLabelFeatures = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#e8e4df', minHeight: '100vh' }}>
      <h2 className="text-h3 text-text-primary mb-6">圓點標籤式特色列表</h2>
      <BulletLabelList
        features={[
          { label: '鋼筋', text: '採用 SD420W 級耐震鋼筋' },
          { label: '混凝土', text: '4000psi 高強度混凝土' },
          { label: '防水', text: 'SEKISUI 日本進口防水材' },
          { label: '門窗', text: 'YKK 鋁窗系統' },
        ]}
      />
    </div>
  ),
};

/**
 * 優點列表
 */
export const AdvantagesDemo = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#e8e4df', minHeight: '100vh' }}>
      <h2 className="text-h3 text-text-primary mb-6">優點列表</h2>
      <AdvantagesList
        title="採用此工法的優點："
        advantages={['延長建物壽命', '減少維修成本', '提升居住品質', '增加保值空間']}
      />
    </div>
  ),
};

/**
 * Step 按鈕列
 */
export const StepButtonsDemo = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const segments = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];

    return (
      <div style={{ padding: '2rem', backgroundColor: '#e8e4df', minHeight: '100vh' }}>
        <h2 className="text-h3 text-text-primary mb-6">Step 按鈕列</h2>
        <StepButtons
          segments={segments}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
        <p className="text-body text-text-secondary mt-4">
          當前步驟: {segments[activeIndex].label}
        </p>
      </div>
    );
  },
};

// ============================================
// 組合展示
// ============================================

/**
 * 工程頁面完整範例
 */
export const FullPageExample = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');
    const tabs = [
      { id: 'overview', name: '工法概述' },
      { id: 'materials', name: '材料說明' },
      { id: 'process', name: '施工流程' },
    ];

    return (
      <MemoryRouter>
        <div style={{ width: '100vw', height: '100vh' }}>
          <EngineeringPageShell sectionIndex={2} backgroundColor="#e8e4df">
            <LeftTextRightMedia
              title="結構工學"
              subtitle="Structural Engineering"
              showSubtitle={true}
              content="本案採用最先進的結構工程技術，從基礎到主體結構，每一個環節都經過嚴密計算與品質控管，打造安全耐久的居住空間。"
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="https://picsum.photos/600/400?random=5"
                  alt="結構示意圖"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            </LeftTextRightMedia>
            <VerticalTabList
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </EngineeringPageShell>
        </div>
      </MemoryRouter>
    );
  },
};

/**
 * 所有元件總覽
 */
export const AllComponents = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#d4a853' }}>工程頁面元件總覽</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {[
          { name: 'EngineeringPageShell', desc: '頁面外殼，提供統一結構與導航' },
          { name: 'VerticalTabList', desc: '垂直分頁選擇器，帶 Shine 效果' },
          { name: 'ComparisonLayout', desc: '左右比較佈局' },
          { name: 'LeftTextRightMedia', desc: '左文右媒體佈局' },
          { name: 'FullBgImageLayout', desc: '滿版背景圖佈局' },
          { name: 'VideoPlayer', desc: '影片播放器，支援重播' },
          { name: 'NumberedFeatureList', desc: '編號式特色列表' },
          { name: 'TitledFeatureList', desc: '標題式特色列表' },
          { name: 'BulletLabelList', desc: '圓點標籤式列表' },
          { name: 'AdvantagesList', desc: '優點列表（帶邊框）' },
          { name: 'StepButtons', desc: '步驟按鈕列' },
        ].map(comp => (
          <div key={comp.name} style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{comp.name}</h3>
            <p style={{ color: '#888' }}>{comp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

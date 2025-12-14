import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface TabData {
  id: string;
  name: string;
  logo?: string;
  title?: string;
  content?: string;
  backgroundImage: string;
}

const tabs: TabData[] = [
  {
    id: 'taya',
    name: '大雅廚具',
    logo: '/images/kitchen/taya-logo.avif',
    title: 'MIT高品質廚具美學',
    content: '大雅廚具堅持全程MIT的台灣品牌,堅持產品品質,藉由時尚設計及貼心的售後服務,不僅是全台建商愛用廠商,更跨足代理國際精品品牌義大利Rastelli和德國Pronorm,台灣MiiX合作聯名,產品供應深廣並進。',
    backgroundImage: '/images/kitchen/taya-bg.jpg',
  },
  {
    id: 'cabinet',
    name: '櫃體檯面',
    title: '櫃體檯面',
    content: '待補充內容',
    backgroundImage: '/images/kitchen/taya-bg.jpg',
  },
  {
    id: 'equipment',
    name: '廚具設備',
    title: '廚具設備',
    content: '待補充內容',
    backgroundImage: '/images/kitchen/taya-bg.jpg',
  },
];

const KitchenBrandPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('taya');

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 背景圖片 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('${currentTab.backgroundImage}')`,
          backgroundColor: '#1a1a1a',
          top: '80px',
        }}
      />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* 左側文字區塊 */}
        <div className="flex-1 flex items-center justify-start pl-16">
          <div
            className="max-w-lg p-10"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            }}
          >
            {/* Logo */}
            {currentTab.logo && (
              <div className="mb-8">
                <img
                  src={currentTab.logo}
                  alt="Brand Logo"
                  className="h-16 object-contain"
                />
              </div>
            )}

            {/* 標題 */}
            {currentTab.title && (
              <h1
                className="text-[#f5e6b8] mb-6"
                style={{
                  fontSize: '2rem',
                  letterSpacing: '0.1em',
                  fontWeight: 500,
                }}
              >
                {currentTab.title}
              </h1>
            )}

            {/* 內文 */}
            {currentTab.content && (
              <p
                className="text-white/90 leading-relaxed"
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                }}
              >
                {currentTab.content}
              </p>
            )}
          </div>
        </div>

        {/* 右側頁籤區 */}
        <div className="flex items-center pr-8">
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3 py-6 border-2 transition-all duration-300
                  ${activeTab === tab.id
                    ? 'border-[#f5e6b8] bg-[#f5e6b8]/10 text-[#f5e6b8]'
                    : 'border-white/30 bg-black/30 text-white/70 hover:border-white/50 hover:text-white'
                  }
                `}
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  letterSpacing: '0.15em',
                  fontSize: '1rem',
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenBrandPage;

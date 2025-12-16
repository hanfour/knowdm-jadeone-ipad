import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface CabinetItem {
  category: string;
  content: string;
  images: string[];
}

interface TabData {
  id: string;
  name: string;
  logo?: string;
  title?: string;
  content?: string;
  backgroundImage: string;
  layout: 'default' | 'cabinet';
  cabinetItems?: CabinetItem[];
}

const cabinetItems: CabinetItem[] = [
  {
    category: '檯面介紹',
    content: '源自韓國樂天的頂級人造石，採一體成型無接縫工藝，表裡一致的實心結構告別傳統板材剝落問題。吸水率僅0.03%，有效抵禦潮濕與細菌，具備耐熱、抗紫外線特性，表面打磨即可恢復如新，是廚房及衛浴空間的理想選擇。',
    images: ['/images/kitchen/countertop.jpg'],
  },
  {
    category: '門板介紹',
    content: '傳承五十年西班牙工藝，以業界頂尖7.5牛頓高耐刮塗層重新定義門板品質。95度高光澤面呈現超越鋼琴烤漆的鏡面效果，專利工藝確保色彩歷久不褪，100%可回收材質獲綠建材認證，兼具美感與環保價值。',
    images: ['/images/kitchen/door-panel.jpg'],
  },
  {
    category: '烤漆玻璃介紹',
    content: '採用歐洲進口E1級V313防潮塑合板，甲醛含量低於0.1ppm，外覆白色美耐皿處理。無異味、無毛細孔、質地堅硬不變形，24小時浸泡膨脹率僅6%，完美對應台灣潮濕氣候，是兼顧環保與安全的高科技建材。',
    images: ['/images/kitchen/painted-glass.jpg'],
  },
  {
    category: '桶身介紹',
    content: '清玻璃背面施以特殊漆料，經強化爐高溫烘烤定色，賦予空間無限色彩可能。具備耐高溫、耐酸鹼、抗刮耐磨等優異性能，表面光滑不易掉色且易清潔，輕量化設計適用於牆面、檯面及廚房空間。',
    images: ['/images/kitchen/cabinet-body.jpg'],
  },
];

const tabs: TabData[] = [
  {
    id: 'taya',
    name: '大雅廚具',
    logo: '/images/kitchen/taya-logo.avif',
    title: 'MIT高品質廚具美學',
    content: '大雅廚具堅持全程MIT的台灣品牌,堅持產品品質,藉由時尚設計及貼心的售後服務,不僅是全台建商愛用廠商,更跨足代理國際精品品牌義大利Rastelli和德國Pronorm,台灣MiiX合作聯名,產品供應深廣並進。',
    backgroundImage: '/images/kitchen/taya-bg.jpg',
    layout: 'default',
  },
  {
    id: 'cabinet',
    name: '櫃體檯面',
    backgroundImage: '/images/kitchen/cabinet-bg.jpg',
    layout: 'cabinet',
    cabinetItems: cabinetItems,
  },
  // {
  //   id: 'equipment',
  //   name: '廚具設備',
  //   title: '廚具設備',
  //   content: '待補充內容',
  //   backgroundImage: '/images/kitchen/taya-bg.jpg',
  //   layout: 'default',
  // },
];

const KitchenBrandPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('taya');

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 渲染預設布局（大雅廚具、廚具設備）
  const renderDefaultLayout = () => (
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
              fontSize: '1.25rem',
              letterSpacing: '0.1em',
            }}
          >
            {currentTab.title}
          </h1>
        )}

        {/* 內文 */}
        {currentTab.content && (
          <p
            className="text-white"
            style={{
              fontSize: '1rem',
              lineHeight: '2',
              textAlign: 'justify',
            }}
          >
            {currentTab.content}
          </p>
        )}
      </div>

      {/* 右下角註解 */}
      <div className="absolute bottom-4 right-12">
        <p className="text-gray-100" style={{fontSize: '0.75em'}}>
          產品情境示意圖僅供參考，以實際施工及合約為準
        </p>
      </div>
    </div>
  );

  // 渲染櫃體檯面四欄布局
  const renderCabinetLayout = () => (
    <div className="flex-1 flex flex-col relative ps-20">
      {/* 主要內容區 */}
      <div className="flex-1 flex px-12 py-16 gap-4">
        {currentTab.cabinetItems?.map((item, index) => (
          <>
            <div className="h-full w-px bg-gray-300 mx-1"></div>
            <div
              key={index}
              className="flex-1 flex flex-col"
            >
              {/* 圖片區 - 垂直堆疊 */}
              <div className="flex flex-col gap-2 mb-6">
                {item.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`${item.category} ${imgIndex + 1}`}
                    className="w-full h-auto object-contain"
                  />
                ))}
              </div>

              {/* 類別標題 */}
              <h3
                className="text-black mb-4"
                style={{
                  fontSize: '1.25rem',
                  letterSpacing: '0.1em',
                }}
              >
                {item.category}
              </h3>

              {/* 內文 */}
              <p
                className="text-gray-800	 text-justify"
                style={{
                  fontSize: '1rem',
                  lineHeight: '2',
                }}
              >
                {item.content}
              </p>
            </div>
            {index === currentTab.cabinetItems!.length - 1 ? <div className="h-full w-px bg-gray-300 mx-1"></div> : null}
          </>
        ))}
      </div>

      {/* 右下角註解 */}
      <div className="absolute bottom-4 right-12">
        <p className="text-gray-500" style={{fontSize: '0.75em'}}>
          產品情境示意圖僅供參考，以實際施工及合約為準
        </p>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 背景圖片 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('${currentTab.backgroundImage}')`,
          backgroundColor: currentTab.layout === 'cabinet' ? '#f5f5f5' : '#1a1a1a',
          top: '80px',
        }}
      />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* 根據布局類型渲染不同內容 */}
        {currentTab.layout === 'cabinet' ? renderCabinetLayout() : renderDefaultLayout()}

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
                    ? currentTab.layout === 'cabinet'
                      ? 'border-[#1a1a1a] bg-[#1a1a1a]/10 text-[#1a1a1a]'
                      : 'border-[#f5e6b8] bg-[#f5e6b8]/10 text-[#f5e6b8]'
                    : currentTab.layout === 'cabinet'
                      ? 'border-gray-400 bg-white/50 text-gray-600 hover:border-gray-600 hover:text-gray-800'
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

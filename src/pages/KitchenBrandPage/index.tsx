import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface CabinetItem {
  category: string;
  content: string;
  image: string;
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
    content: '源自韓國樂天的頂級人造石，以一體成型無接縫工藝打造，表裡一致的實心同質化結構，徹底告別傳統層積板材的剝落困擾。吸水率僅0.03%，無毛細孔特性有效抵禦潮濕與細菌侵蝕，是廚房、浴室及醫療空間的理想選擇。可透過熱加工塑造多元3D造型，兼具耐熱、抗紫外線及氣候穩定性，表面經打磨後即可恢復如新光澤，為現代空間注入歷久彌新的優雅質感。',
    image: '/images/kitchen/countertop.jpg',
  },
  {
    category: '門板介紹',
    content: '傳承五十年西班牙工藝精髓，ALVIC以業界頂尖的7.5牛頓高耐刮塗層，重新定義門板品質標準。95度高光澤面呈現超越鋼琴烤漆的純淨鏡面效果，專利工藝確保色彩歷久不褪。100%可回收材質獲綠建材認證，兼具卓越化學抗性與高應用彈性，無論居家或商業空間，都能為設計作品增添恆久亮點與價值。',
    image: '/images/kitchen/door-panel.jpg',
  },
  {
    category: '桶身介紹',
    content: '採用歐洲進口E1級V313防潮塑合板，以85%寒帶針葉木屑與15%樹脂經高溫高壓製成，外覆白色美耐皿處理。甲醛含量低於0.1ppm，遠優於國家標準，無辛辣異味、無毛細孔，質地堅硬不變形。24小時浸泡膨脹率僅6%，完美對應台灣海島型潮濕氣候，具備防潮、耐磨、耐燃特性，是兼顧環保與安全的高科技建材首選。',
    image: '/images/kitchen/cabinet-body.jpg',
  },
  {
    category: '烤漆玻璃介紹',
    content: '將清玻璃背面施以特殊漆料，經強化爐高溫烘烤定色而成，賦予空間無限色彩可能。強化處理後具備耐高溫、耐酸鹼、抗刮耐磨等優異性能，表面平坦光滑且不易掉色。輕量化特性讓施工更靈活便捷，廣泛適用於牆面、檯面及廚房空間，以多元色澤與易清潔特性，為現代居家打造兼具美觀與實用的設計亮點。',
    image: '/images/kitchen/painted-glass.jpg',
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
  {
    id: 'equipment',
    name: '廚具設備',
    title: '廚具設備',
    content: '待補充內容',
    backgroundImage: '/images/kitchen/taya-bg.jpg',
    layout: 'default',
  },
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
              lineHeight: '2.4',
              textAlign: 'justify',
            }}
          >
            {currentTab.content}
          </p>
        )}
      </div>
    </div>
  );

  // 渲染櫃體檯面四欄布局
  const renderCabinetLayout = () => (
    <div className="flex-1 flex items-stretch px-8 py-8 gap-4">
      {currentTab.cabinetItems?.map((item, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col bg-white/95 overflow-hidden"
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* 圖片區 */}
          <div className="h-48 overflow-hidden">
            <img
              src={item.image}
              alt={item.category}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 文字區 */}
          <div className="flex-1 p-6 flex flex-col">
            {/* 類別標題 */}
            <h3
              className="text-[#1a1a1a] mb-4 pb-3 border-b border-gray-200"
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {item.category}
            </h3>

            {/* 內文 */}
            <p
              className="text-gray-700 flex-1"
              style={{
                fontSize: '0.85rem',
                lineHeight: '1.8',
                textAlign: 'justify',
              }}
            >
              {item.content}
            </p>
          </div>
        </div>
      ))}
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

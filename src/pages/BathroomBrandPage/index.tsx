import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

// 子品牌資料結構（用於多品牌項目）
interface SubBrand {
  brand: string;
  brandLogo?: string;
  features: string[];
}

// 衛浴設備資料結構
interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  brandLogo?: string;
  brandColor?: string;
  image: string;
  description?: string;
  features: string[];
  featureImage?: string; // SVG 功能圖片
  subBrands?: SubBrand[];
  clickable?: boolean; // 預設為 true，設為 false 時不可點擊
}

interface TabData {
  id: string;
  name: string;
  logo?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  backgroundImage: string;
  layout: 'default' | 'equipment';
  equipmentItems?: EquipmentItem[];
}

// 主浴設備資料
const masterBathroomItems: EquipmentItem[] = [
  {
    id: 'master-toilet',
    name: 'TOTO 全自動馬桶',
    brand: 'TOTO 全自動馬桶',
    brandColor: '#1a5276',
    image: '/images/bathroom/master/toiletG5.png',
    featureImage: '/images/bathroom/master/toilet-g5-features.svg',
    features: [],
  },
  {
    id: 'master-mirror-cabinet',
    name: '鏡櫃',
    brand: '發泡鏡櫃(W60xH80)CM',
    brandColor: '#000',
    image: '/images/bathroom/master/mirror-cabinet.png',
    description: '',
    features: [
      '發泡材質,防潮防水性優異',
      '鏡+收納二合一,完美整合功能與美觀',
      '隱藏式設計,收納不外露,視覺更俐落',
      '下層開放設計,常用物品觸手可及',
      '分層收納設計',
    ],
  },
  {
    id: 'master-vanity',
    name: 'TOTO面盆+浴櫃',
    brand: 'TOTO面盆+雙門發泡浴櫃60CM',
    brandColor: '#000',
    image: '/images/bathroom/master/vanity.png',
    features: [
      '發泡材質,防潮防水性優異',
      '搭配TOTO瓷盆耐用好清潔',
      '櫃體設計收納方便',
      '懸空設計好整理、視覺輕盈',
      '側邊衛生紙孔,貼心設計',
    ],
  },
  {
    id: 'master-heater',
    name: '國際牌浴室暖風機',
    brand: '國際牌浴室暖風機',
    brandColor: '#000',
    image: '/images/bathroom/master/heater.png',
    features: [
      '高效換氣、暖風、涼風、乾燥四合一功能',
      'DC馬達',
      '5重安全裝置',
      '採用陶瓷加熱器,可快速升溫',
      '定時功能',
    ],
  },
  {
    id: 'master-basin-faucet',
    name: '臉盆用單槍龍頭',
    brand: '',
    image: '/images/bathroom/master/basin-faucet.png',
    features: [],
    clickable: false,
  },
  {
    id: 'master-shower-faucet',
    name: '淋浴用單槍龍頭',
    brand: '',
    image: '/images/bathroom/master/shower-faucet.png',
    features: [],
    clickable: false,
  },
  {
    id: 'master-slide-bar',
    name: '滑桿組',
    brand: '',
    image: '/images/bathroom/master/slide-bar.png',
    features: [],
    clickable: false,
  },
  {
    id: 'master-towel-rack',
    name: '雙層毛巾架',
    brand: '',
    image: '/images/bathroom/master/towel-rack.png',
    features: [],
    clickable: false,
  },
];

// 客浴設備資料
const guestBathroomItems: EquipmentItem[] = [
  {
    id: 'guest-toilet',
    name: 'TOTO 單體馬桶',
    brand: 'TOTO 單體馬桶',
    brandColor: '#1a5276',
    image: '/images/bathroom/guest/toilet.png',
    featureImage: '/images/bathroom/guest/toilet-c2-features.svg',
    features: [],
  },
  {
    id: 'guest-mirror-cabinet',
    name: '鏡櫃',
    brand: '發泡鏡櫃(W50xH80)CM',
    brandColor: '#000',
    image: '/images/bathroom/guest/mirror-cabinet.png',
    description: '',
    features: [
      '發泡材質,防潮防水性優異',
      '鏡+收納二合一,完美整合功能與美觀',
      '隱藏式設計,收納不外露,視覺更俐落',
      '下層開放設計,常用物品觸手可及',
      '分層收納設計',
    ],
  },
  {
    id: 'guest-vanity',
    name: 'TOTO面盆+浴櫃',
    brand: 'TOTO面盆+單門發泡浴櫃50CM',
    brandColor: '#000',
    image: '/images/bathroom/guest/vanity.png',
    features: [
      '發泡材質,防潮防水性優異',
      '上方瓷盆耐用好清潔',
      '櫃體設計收納方便',
      '懸空設計好整理、視覺輕盈',
      '側邊衛生紙孔,貼心設計',
    ],
  },
  {
    id: 'guest-ventilator',
    name: '國際牌靜音換氣扇',
    brand: '國際牌靜音換氣扇',
    brandColor: '#000',
    image: '/images/bathroom/guest/ventilator.png',
    features: [
      '電容器馬達',
      '風倒流防止裝置',
      '鍍亞鉛防銹鋼板機體',
      '內藏溫度保險絲',
    ],
  },
  {
    id: 'guest-basin-faucet',
    name: '臉盆用單槍龍頭',
    brand: '',
    image: '/images/bathroom/guest/basin-faucet.png',
    features: [],
    clickable: false,
  },
  {
    id: 'guest-shower-faucet',
    name: '淋浴用單槍龍頭',
    brand: '',
    image: '/images/bathroom/guest/shower-faucet.png',
    features: [],
    clickable: false,
  },
  {
    id: 'guest-slide-bar',
    name: '滑桿組',
    brand: '',
    image: '/images/bathroom/guest/slide-bar.png',
    features: [],
    clickable: false,
  },
  {
    id: 'guest-towel-rack',
    name: '雙層毛巾架',
    brand: '',
    image: '/images/bathroom/guest/towel-rack.png',
    features: [],
    clickable: false,
  },
];

const tabs: TabData[] = [
  {
    id: 'toto',
    name: 'TOTO',
    logo: '/images/bathroom/toto-logo.png',
    title: 'TOTO',
    subtitle: '日本第一衛浴品牌，TOTO衛浴',
    content: '同步飯店等級TOTO衛浴，打造極致舒適的沐浴體驗，智慧沖洗、抗菌材質與節能系統，展現日本對日常細節的極致講究，讓每一次沐浴，都是生活的儀式。',
    backgroundImage: '/images/bathroom/toto情境示意圖.jpg',
    layout: 'default',
  },
  {
    id: 'master',
    name: '主浴設備',
    title: '主浴',
    backgroundImage: '/images/kitchen/cabinet-bg.jpg',
    layout: 'equipment',
    equipmentItems: masterBathroomItems,
  },
  {
    id: 'guest',
    name: '客浴設備',
    title: '客浴',
    backgroundImage: '/images/kitchen/cabinet-bg.jpg',
    layout: 'equipment',
    equipmentItems: guestBathroomItems,
  },
];

const BathroomBrandPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('toto');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [hoveredEquipment, setHoveredEquipment] = useState<string | null>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 渲染 TOTO 預設布局（左圖右文）
  const renderDefaultLayout = () => (
    <div className="flex-1 flex">
      {/* 左側：情境示意圖 */}
      <div className="w-[60%] h-full overflow-hidden">
        <img
          src={currentTab.backgroundImage}
          alt="TOTO 衛浴情境"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 右側：文字區塊 */}
      <div className="flex-1 flex flex-col justify-center px-16">
        <div className="max-w-xl">
          {/* Logo */}
          {currentTab.logo && (
            <div className="mb-8">
              <img
                src={currentTab.logo}
                alt="TOTO Logo"
                className="h-14 object-contain"
              />
            </div>
          )}

          {/* 標題 */}
          {currentTab.subtitle && (
            <h1 className="text-h4 tracking-wider-custom font-medium text-gray-800 mb-6">
              {currentTab.subtitle}
            </h1>
          )}

          {/* 內文 */}
          {currentTab.content && (
            <p className="text-body leading-loose-custom text-gray-700 text-justify">
              {currentTab.content}
            </p>
          )}
        </div>

        {/* 右下角註解 */}
        <div className="absolute bottom-4 right-12">
          <p className="text-micro text-gray-500">
            產品情境示意圖僅供參考，以實際施工及合約為準
          </p>
        </div>
      </div>
    </div>
  );

  // 渲染設備網格布局（主浴/客浴共用）
  const renderEquipmentLayout = () => (
    <div className="flex-1 flex flex-col relative pl-[60px]">
      {/* 標題 */}
      <div className="text-center pt-8 pb-6">
        <h1 className="text-h3 tracking-widest-custom text-gray-800">
          {currentTab.title}｜<span className="font-bold">衛浴設備</span>
        </h1>
      </div>

      {/* 設備網格 */}
      <div className="flex-1 px-12 pb-8 overflow-auto">
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {currentTab.equipmentItems?.map((item) => {
            const isClickable = item.clickable !== false;
            return (
              <div
                key={item.id}
                className={`
                  transition-all duration-300 group
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                  ${isClickable && hoveredEquipment === item.id ? 'scale-[1.02]' : ''}
                `}
                onClick={() => isClickable && setSelectedEquipment(item)}
                onMouseEnter={() => isClickable && setHoveredEquipment(item.id)}
                onMouseLeave={() => isClickable && setHoveredEquipment(null)}
              >
                {/* 產品圖片區 */}
                <div
                  className={`
                    relative bg-white aspect-square flex items-center justify-center p-4
                    border-4 transition-all duration-300
                    ${isClickable && hoveredEquipment === item.id
                      ? 'border-[#f5e6b8]'
                      : 'border-transparent'
                    }
                  `}
                  style={{
                    backgroundColor: isClickable && hoveredEquipment === item.id ? '#f5e6b8' : 'white',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{
                      filter: isClickable && hoveredEquipment === item.id ? 'brightness(1.05)' : 'none',
                    }}
                  />
                </div>

                {/* 產品名稱 */}
                <p
                  className={`
                    text-center mt-3 transition-colors duration-300 text-xsmall tracking-normal-custom
                    ${isClickable && hoveredEquipment === item.id ? 'text-gray-900 font-medium' : 'text-gray-700'}
                  `}
                >
                  {item.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 右下角註解 */}
      <div className="absolute bottom-4 right-12">
        <p className="text-micro text-gray-500">
          產品情境示意圖僅供參考，以實際施工及合約為準
        </p>
      </div>
    </div>
  );

  // 渲染燈箱 Modal
  const renderEquipmentModal = () => {
    if (!selectedEquipment) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center animate-slide-down-full"
        onClick={() => setSelectedEquipment(null)}
      >
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

        {/* Modal 內容 */}
        <div
          className="relative bg-white max-w-4xl w-full mx-4 flex flex-col shadow-2xl overflow-hidden min-h-[300px]"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '85vh' }}
        >
          {/* 頂部：品牌名稱（橫跨整個寬度） */}
          <div className="px-8 pt-8">
            {selectedEquipment.subBrands?.length ? (
              <div className="flex flex-row gap-6 items-center">
                {selectedEquipment.subBrands.map((subBrand, idx) => (
                  subBrand.brandLogo && (
                    <div key={idx} className="h-10 flex items-center">
                      <img
                        src={subBrand.brandLogo}
                        alt={subBrand.brand}
                        className="h-full max-w-[120px] object-contain"
                      />
                    </div>
                  )
                ))}
              </div>
            ) : selectedEquipment.brandLogo ? (
              <div className="w-52 flex items-center">
                <img
                  src={selectedEquipment.brandLogo}
                  alt={selectedEquipment.brand}
                  className="h-full max-w-[160px] object-contain"
                />
              </div>
            ) : (
              <h2
                className="text-h3 tracking-normal-custom font-bold"
                style={{ color: selectedEquipment.brandColor || '#000' }}
              >
                {selectedEquipment.brand}
              </h2>
            )}
          </div>

          {/* 下方：圖片 + 資訊 */}
          <div className="flex flex-1 overflow-hidden">
            {/* 左側：產品圖片 */}
            <div className="w-2/5 p-8 flex items-center justify-center">
              <img
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                className="max-w-full max-h-72 object-contain"
              />
            </div>

            {/* 右側：產品資訊 */}
            <div className="w-3/5 p-8 pl-0 flex flex-col justify-center overflow-y-auto">
              {/* 如果有 featureImage，顯示 SVG 功能圖 */}
              {selectedEquipment.featureImage ? (
                <div className="flex items-center justify-center h-full">
                  <img
                    src={selectedEquipment.featureImage}
                    alt={`${selectedEquipment.name} 功能說明`}
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </div>
              ) : (
                <>
                  {/* 產品名稱（多品牌時不顯示） */}
                  {/* {!selectedEquipment.subBrands?.length && (
                    <h3 className="text-large tracking-wide-custom text-gray-900 font-medium mb-4">
                      {selectedEquipment.name}
                    </h3>
                  )} */}

                  {/* 產品說明（如有） */}
                  {selectedEquipment.description && (
                    <p className="text-small leading-normal-custom text-gray-700 mb-4">
                      {selectedEquipment.description}
                    </p>
                  )}

                  {/* 多品牌區塊 */}
                  {selectedEquipment.subBrands && selectedEquipment.subBrands.length > 0 ? (
                    <div className="space-y-5">
                      {selectedEquipment.subBrands.map((subBrand, idx) => (
                        <div key={idx}>
                          {/* 子品牌產品名稱 */}
                          <h4 className="text-large tracking-normal-custom font-medium text-gray-900 mb-2">
                            {subBrand.brand}
                          </h4>
                          {/* 子品牌特色列表 */}
                          <ul className="space-y-1">
                            {subBrand.features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-start text-xsmall leading-normal-custom text-gray-700"
                              >
                                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* 一般產品特色列表 */
                    <ul className="space-y-1">
                      {selectedEquipment.features.map((feature, index) => (
                        <li
                          key={index}
                          className={`flex items-start text-small leading-normal-custom text-gray-700 ${feature.startsWith('【') ? 'font-medium mt-3' : ''}`}
                        >
                          {!feature.startsWith('【') && (
                            <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0" />
                          )}
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/images/kitchen/cabinet-bg.jpg)' }}>
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* 根據布局類型渲染不同內容 */}
        {currentTab.layout === 'default' && renderDefaultLayout()}
        {currentTab.layout === 'equipment' && renderEquipmentLayout()}

        {/* 右側頁籤區 */}
        <div className="flex items-center pr-8">
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-2 py-4 border-2 transition-all duration-300 text-body tracking-wider-custom
                  [writing-mode:vertical-rl] [text-orientation:mixed]
                  ${activeTab === tab.id
                    ? 'border-text-primary bg-text-primary/10 text-text-primary'
                    : 'border-gray-400 bg-white/50 text-gray-600 hover:border-gray-600 hover:text-gray-800'
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 設備燈箱 Modal */}
      {renderEquipmentModal()}

      {/* 動畫樣式 */}
      <style>{`
        @keyframes wipe-down {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
        .animate-slide-down-full {
          animation: wipe-down 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default BathroomBrandPage;

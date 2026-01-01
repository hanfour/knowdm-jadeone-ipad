import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface CabinetItem {
  category: string;
  content: string;
  images: string[];
}

// 子品牌資料結構（用於精品五金等多品牌項目）
interface SubBrand {
  brand: string;
  brandLogo?: string;
  features: string[];
}

// 廚具設備資料結構
interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  brandLogo?: string;
  brandColor?: string;
  image: string;
  description?: string;
  features: string[];
  subBrands?: SubBrand[];
}

interface TabData {
  id: string;
  name: string;
  logo?: string;
  title?: string;
  content?: string;
  backgroundImage: string;
  layout: 'default' | 'cabinet' | 'equipment' | 'spec';
  cabinetItems?: CabinetItem[];
  equipmentItems?: EquipmentItem[];
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

// 廚具設備資料
const equipmentItems: EquipmentItem[] = [
  {
    id: 'glemgas-hood',
    name: 'GlemGas 掛壁式油機',
    brand: 'GlemGas',
    brandLogo: '/images/kitchen/equipment/glemgas-logo.png',
    brandColor: '#1a1a1a',
    image: '/images/kitchen/equipment/掛壁式油機.png',
    features: [
      '近吸式設計',
      '材質：不鏽鋼+強化玻璃',
      '觸控式電子操作介面',
      '3 段風速',
      '2x1.5W LED燈',
      '5 層複合結構鋁製可洗油網',
    ],
  },
  {
    id: 'glemgas-ih',
    name: 'GlemGas 橫式雙口感應爐',
    brand: 'GlemGas',
    brandLogo: '/images/kitchen/equipment/glemgas-logo.png',
    brandColor: '#1a1a1a',
    image: '/images/kitchen/equipment/橫式雙口感應爐.png',
    features: [
      '九段火力調整',
      'Eurokera玻璃面板',
      '自動偵測、自動停機保護',
      '過熱斷電保護裝置',
      '過載保護',
      '餘溫安全指示',
      '電子計時器',
      '兒童安全鎖',
      '滑動觸控裝置',
      '快速加熱功能',
      '鍋具偵測功能',
    ],
  },
  {
    id: 'glemgas-dishwasher',
    name: 'GlemGas 全嵌洗碗機（滑門）',
    brand: 'GlemGas',
    brandLogo: '/images/kitchen/equipment/glemgas-logo.png',
    brandColor: '#1a1a1a',
    image: '/images/kitchen/equipment/洗碗機.png',
    features: [
      '八種洗程適合不同需求：強力、一般、節能、玻璃、90分鐘、30分鐘快洗、預洗、自動',
      'LED螢幕觸控功能',
      '符合歐盟能源消耗A+++等級',
      '24小時延時功能',
      '內部照明燈和照地燈',
      '獨特3D風扇乾燥方式（非獨立烘乾）',
      '三層碗籃（架）、可調節上碗籃',
    ],
  },
  {
    id: 'glemgas-microwave',
    name: 'GlemGas 嵌入式微波烤箱（選配）',
    brand: 'GlemGas',
    brandLogo: '/images/kitchen/equipment/glemgas-logo.png',
    brandColor: '#1a1a1a',
    image: '/images/kitchen/equipment/微波烤箱.png',
    features: [
      '電子計時器 0 到 95"',
      '按重量/時間進行解凍',
      '數位控制',
      '八種火力模式',
      '燒烤功能',
      '8個自動菜單',
      '數位時鐘',
      '31.5cm 旋轉板',
      '內部使用不鏽鋼內膽',
    ],
  },
  {
    id: 'jtl-cabinet',
    name: 'JTL 豪華型收納櫃（選配）',
    brand: 'JTL',
    brandLogo: '/images/kitchen/equipment/jtl-logo.png',
    brandColor: '#c41230',
    image: '/images/kitchen/equipment/收納櫃.png',
    features: [
      '獨特「橫流扇」設計，有效排出蒸氣延長廚櫃壽命',
      '嵌入式收納設計，與廚櫃完美搭配',
      '智慧型自動排氣功能',
      '獨家隱藏式排氣孔，更增美觀',
      '無段式門板鉸鍊，使用順手無障礙',
      '桶身及托盤不鏽鋼材質，外觀時尚簡約，使用壽命長',
      '表面防指紋處理，清潔容易保養輕鬆',
      '冷光觸控面板，操作簡便',
    ],
  },
  {
    id: 'tub-faucet',
    name: 'TUB 英國廚房龍頭',
    brand: 'TUB',
    brandLogo: '/images/kitchen/equipment/tub-logo.png',
    brandColor: '#1a5276',
    image: '/images/kitchen/equipment/水龍頭.png',
    description: '累積40年衛浴優良產品製造經驗，並同時為多家知名衛浴品牌代工，獲得多項專利及獎項認證，從產品設計、使用材料、表面處理、功能檢測，皆依照歐美知名衛浴大廠標準，致力於提供消費者獨一無二的生活化體驗',
    features: [
      'SUS304不鏽鋼主體 - 抗腐蝕、抗氧化、持久耐用',
      '通過CNS8088認證 - 國家無鉛標章有保障',
      '三層電鍍表面處理 - 抵抗礦物質堆積，日久彌新',
      '360度旋轉抽拉式龍頭 - 自由清洗水槽各角落',
      '三種出水方式 - 瀑布式/橫幅噴灑/強力沖洗',
      '瑞士Neoperl起泡器 - 出水均勻柔順不噴濺，有效節水',
      '知名陶瓷閥芯大廠 - 閥芯壽命達50萬次開關無滴漏測試',
    ],
  },
  {
    id: 'sink',
    name: '不鏽鋼水槽',
    brand: 'TUB',
    brandLogo: '/images/kitchen/equipment/tub-logo.png',
    brandColor: '#1a5276',
    image: '/images/kitchen/equipment/水槽.png',
    features: [
      'SUS304不鏽鋼，通過CUPC認證耐久持用',
      'R10 - 小R角設計，清潔方便',
      '無瀝青橡膠墊 - 隔音效果更好',
      '噴灰色防鏽漆 - 防水滴凝露，有效防止生鏽',
    ],
  },
  {
    id: 'hardware',
    name: '精品五金',
    brand: 'Taya / BLUM',
    brandColor: '#ee6611',
    image: '/images/kitchen/equipment/薄牆抽&緩衝式後鈕.jpg',
    features: [],
    subBrands: [
      {
        brand: 'Taya薄牆抽',
        brandLogo: '/images/kitchen/equipment/taya-logo.png',
        features: [
          '緩衝系統結合三節同步滑軌且載重量35KG，壽命長且通過德國萊茵標準測試',
          '垂直式設計不僅外觀美麗，更增加了內部橫向空間',
          '緩衝系統採用降噪結構，使抽屜關閉時的噪音降至最低',
          '減震系統採用雙滑板設計，使滑軌在開關時更輕柔',
          '抽屜擁有快拆、快裝功能可左右上下調整，調整快速',
          '通過6萬次以上之重覆開關測試',
        ],
      },
      {
        brand: 'BLUM緩衝式後鈕',
        brandLogo: '/images/kitchen/equipment/blum-logo.png',
        features: [
          '廚具門板專用 緩衝靜音角鍊',
          '結構安全（三支安全桿能防止門片下垂）',
          '全金屬鉸鍊，通過開啓二十萬次的耐用測試',
          '18~27mm板材適用，另有6分、3分及入柱規格',
          '開啓角度100度',
          '3D立體調整可讓門片縫隙最小',
        ],
      },
    ],
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
    backgroundImage: '/images/kitchen/cabinet-bg.jpg',
    layout: 'equipment',
    equipmentItems: equipmentItems,
  },
  {
    id: 'spec',
    name: '規格尺寸圖',
    backgroundImage: '/images/kitchen/cabinet-bg.jpg',
    layout: 'spec',
  },
];

// 規格尺寸圖資料
const specImages = [
  { id: 'A', label: 'A戶', image: '/images/kitchen/specs/A.jpg' },
  { id: 'B', label: 'B戶', image: '/images/kitchen/specs/B.jpg' },
  { id: 'C', label: 'C戶', image: '/images/kitchen/specs/C.jpg' },
  { id: 'D', label: 'D戶', image: '/images/kitchen/specs/D.jpg' },
];

const KitchenBrandPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('taya');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [hoveredEquipment, setHoveredEquipment] = useState<string | null>(null);
  const [subBrandIndex, setSubBrandIndex] = useState(0);
  const [specImageIndex, setSpecImageIndex] = useState(0);
  const [showSpecViewer, setShowSpecViewer] = useState(false);
  const [specViewerScale, setSpecViewerScale] = useState(1);
  const [specViewerPosition, setSpecViewerPosition] = useState({ x: 0, y: 0 });
  const [isSpecDragging, setIsSpecDragging] = useState(false);
  const [specDragStart, setSpecDragStart] = useState({ x: 0, y: 0 });

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
          <h1 className="text-large tracking-wide-custom text-gold mb-6">
            {currentTab.title}
          </h1>
        )}

        {/* 內文 */}
        {currentTab.content && (
          <p className="text-body leading-loose-custom text-white text-justify">
            {currentTab.content}
          </p>
        )}
      </div>

      {/* 右下角註解 */}
      <div className="absolute bottom-4 right-12">
        <p className="text-micro text-gray-100">
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
              <h3 className="text-large tracking-wide-custom text-black mb-4">
                {item.category}
              </h3>

              {/* 內文 */}
              <p className="text-body leading-loose-custom text-gray-800 text-justify">
                {item.content}
              </p>
            </div>
            {index === currentTab.cabinetItems!.length - 1 ? <div className="h-full w-px bg-gray-300 mx-1"></div> : null}
          </>
        ))}
      </div>

      {/* 右下角註解 */}
      <div className="absolute bottom-4 right-12">
        <p className="text-micro text-gray-500">
          產品情境示意圖僅供參考，以實際施工及合約為準
        </p>
      </div>
    </div>
  );

  // 渲染廚具設備布局
  const renderEquipmentLayout = () => (
    <div className="flex-1 flex flex-col relative pl-[60px]">
      {/* 標題 */}
      <div className="text-center pt-8 pb-6">
        <h1 className="text-h3 tracking-widest-custom text-gray-800">
          {currentTab.title}
        </h1>
      </div>

      {/* 設備網格 */}
      <div className="flex-1 px-12 pb-8 overflow-auto">
        <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {currentTab.equipmentItems?.map((item) => (
            <div
              key={item.id}
              className={`
                cursor-pointer transition-all duration-300 group
                ${hoveredEquipment === item.id ? 'scale-[1.02]' : ''}
              `}
              onClick={() => { setSelectedEquipment(item); setSubBrandIndex(0); }}
              onMouseEnter={() => setHoveredEquipment(item.id)}
              onMouseLeave={() => setHoveredEquipment(null)}
            >
              {/* 產品圖片區 */}
              <div
                className={`
                  relative bg-white aspect-square flex items-center justify-center p-4
                  border-4 transition-all duration-300
                  ${hoveredEquipment === item.id
                    ? 'border-[#f5e6b8]'
                    : 'border-transparent'
                  }
                `}
                style={{
                  backgroundColor: hoveredEquipment === item.id ? '#f5e6b8' : 'white',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-all duration-300"
                  style={{
                    filter: hoveredEquipment === item.id ? 'brightness(1.05)' : 'none',
                  }}
                />
              </div>

              {/* 產品名稱 */}
              <p
                className={`
                  text-center mt-3 transition-colors duration-300 text-xsmall tracking-normal-custom
                  ${hoveredEquipment === item.id ? 'text-gray-900 font-medium' : 'text-gray-700'}
                `}
              >
                {item.name}
              </p>
            </div>
          ))}
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

  // 渲染規格尺寸圖輪播布局
  const renderSpecLayout = () => (
    <div className="flex-1 flex flex-col relative pl-[60px]">
      {/* 滿版圖片輪播 */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* 當前圖片 - 可點擊放大 */}
        <img
          src={specImages[specImageIndex].image}
          alt={specImages[specImageIndex].label}
          className="max-w-full max-h-full object-contain transition-opacity duration-500 cursor-pointer hover:opacity-90"
          onClick={() => { setShowSpecViewer(true); setSpecViewerScale(1); }}
        />

        {/* 左側切換按鈕 */}
        <button
          onClick={() => setSpecImageIndex((prev) => (prev - 1 + specImages.length) % specImages.length)}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 text-gray-700 hover:bg-white transition-all rounded-full shadow-md"
          aria-label="上一張"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 右側切換按鈕 */}
        <button
          onClick={() => setSpecImageIndex((prev) => (prev + 1) % specImages.length)}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/80 text-gray-700 hover:bg-white transition-all rounded-full shadow-md"
          aria-label="下一張"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 底部指示器和戶別標籤 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          {/* 當前戶別標籤 */}
          <div className="px-6 py-2 bg-black/60 text-white text-large tracking-wide-custom">
            {specImages[specImageIndex].label}
          </div>

          {/* 圓點指示器 */}
          <div className="flex gap-3">
            {specImages.map((spec, idx) => (
              <button
                key={spec.id}
                onClick={() => setSpecImageIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === specImageIndex ? 'bg-gray-800 scale-125' : 'bg-gray-400 hover:bg-gray-600'
                }`}
                aria-label={`切換到 ${spec.label}`}
              />
            ))}
          </div>
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

  // 渲染規格尺寸圖燈箱
  const renderSpecViewer = () => {
    if (!showSpecViewer) return null;

    const handleZoomIn = () => setSpecViewerScale(prev => Math.min(prev + 0.5, 8));
    const handleZoomOut = () => setSpecViewerScale(prev => Math.max(prev - 0.5, 1));
    const handleReset = () => {
      setSpecViewerScale(1);
      setSpecViewerPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      if (specViewerScale > 1) {
        setIsSpecDragging(true);
        setSpecDragStart({ x: e.clientX - specViewerPosition.x, y: e.clientY - specViewerPosition.y });
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isSpecDragging && specViewerScale > 1) {
        setSpecViewerPosition({ x: e.clientX - specDragStart.x, y: e.clientY - specDragStart.y });
      }
    };

    const handleMouseUp = () => setIsSpecDragging(false);

    const handleSwitchImage = (direction: 'prev' | 'next') => {
      if (direction === 'prev') {
        setSpecImageIndex((prev) => (prev - 1 + specImages.length) % specImages.length);
      } else {
        setSpecImageIndex((prev) => (prev + 1) % specImages.length);
      }
      setSpecViewerScale(1);
      setSpecViewerPosition({ x: 0, y: 0 });
    };

    return (
      <div
        className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-40 transition-transform duration-500 ease-out ${
          showSpecViewer ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ top: '80px' }}
      >
        {/* 左上角標籤 */}
        <div className="absolute z-20 bg-[#d4a853]/50 text-black px-6 py-4">
          <h3 className="font-bold text-center" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
            {specImages[specImageIndex].label}
          </h3>
          <p className="mt-1 text-center" style={{ fontSize: '0.85rem' }}>規格尺寸圖</p>
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={() => setShowSpecViewer(false)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
          aria-label="關閉"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 右側縮放控制 */}
        <div
          className="absolute z-10 flex flex-col gap-2"
          style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="放大"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            disabled={specViewerScale <= 1}
            className={`w-10 h-10 bg-white shadow-md flex items-center justify-center transition-colors ${
              specViewerScale <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="縮小"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
            </svg>
          </button>
          <button
            onClick={handleReset}
            className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="復原"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* 圖片顯示區 - 支援拖曳 */}
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden p-8"
          style={{ cursor: specViewerScale > 1 ? (isSpecDragging ? 'grabbing' : 'grab') : 'default' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={specImages[specImageIndex].image}
            alt={specImages[specImageIndex].label}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
            style={{
              transform: `translate(${specViewerPosition.x}px, ${specViewerPosition.y}px) scale(${specViewerScale})`,
              transition: isSpecDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          />
        </div>

        {/* 左右切換按鈕 */}
        <button
          onClick={() => handleSwitchImage('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
          aria-label="上一張"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => handleSwitchImage('next')}
          className="absolute right-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
          aria-label="下一張"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* 底部頁碼 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
          {specImageIndex + 1} / {specImages.length}
        </div>

        {/* 右下角註解 */}
        <div
          className="absolute z-10 text-gray-400"
          style={{ fontSize: '0.75rem', right: '5rem', bottom: '0.5rem' }}
        >
          此為示意圖僅供參考，實際以施工為準
        </div>
      </div>
    );
  };

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
          className="relative bg-white max-w-4xl w-full mx-4 flex shadow-2xl overflow-hidden min-h-[300px]"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '85vh' }}
        >
          {/* 左側：品牌 Logo + 產品圖片 */}
          <div className="w-2/5 p-8 flex flex-col">
            {/* 品牌 Logo（多品牌時顯示多個） */}
            {selectedEquipment.subBrands?.length ? (
              <div className="mb-6 flex flex-row gap-6 items-center">
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
              <div className="mb-6 w-52 flex items-center">
                <img
                  src={selectedEquipment.brandLogo}
                  alt={selectedEquipment.brand}
                  className="h-full max-w-[160px] object-contain"
                />
              </div>
            ) : (
              <h2
                className="text-h3 tracking-normal-custom font-bold mb-6"
                style={{ color: selectedEquipment.brandColor || '#c41230' }}
              >
                {selectedEquipment.brand}
              </h2>
            )}

            {/* 產品圖片 */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={selectedEquipment.image}
                alt={selectedEquipment.name}
                className="w-full max-w-full max-h-72 object-contain"
              />
            </div>
          </div>

          {/* 右側：產品資訊 */}
          <div className="w-3/5 p-16 flex flex-col justify-center overflow-y-auto max-h-[80vh]">
            {/* 產品名稱（多品牌時不顯示） */}
            {!selectedEquipment.subBrands?.length && (
              <h3 className="text-large tracking-wide-custom text-gray-900 font-medium mb-4">
                {selectedEquipment.name}
              </h3>
            )}

            {/* 產品說明（如有） */}
            {selectedEquipment.description && (
              <p className="text-xsmall leading-relaxed-custom text-gray-600 mb-4">
                {selectedEquipment.description}
              </p>
            )}

            {/* 多品牌區塊（如精品五金）- 輪播形式 */}
            {selectedEquipment.subBrands && selectedEquipment.subBrands.length > 0 ? (
              <div className="relative flex flex-col h-full">
                {/* 輪播內容 */}
                <div className="flex-1 overflow-hidden">
                  {selectedEquipment.subBrands.map((subBrand, idx) => (
                    <div
                      key={idx}
                      className={`transition-all duration-500 ${
                        idx === subBrandIndex ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                      }`}
                    >
                      {/* 子品牌產品名稱 */}
                      <h4 className="text-large tracking-normal-custom font-medium text-gray-900 mb-3">
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

                {/* 底部控制區：Dotted 指示器 + 左右按鈕 */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                  {/* Dotted 指示器（菱形） */}
                  <div className="flex gap-3">
                    {selectedEquipment.subBrands.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSubBrandIndex(idx)}
                        className={`w-2.5 h-2.5 rotate-45 transition-all duration-300 ${
                          idx === subBrandIndex ? 'scale-110' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        style={idx === subBrandIndex ? { backgroundColor: '#0b2d2a' } : undefined}
                        aria-label={`切換到品牌 ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* 左右切換按鈕 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSubBrandIndex((prev) => (prev - 1 + selectedEquipment.subBrands!.length) % selectedEquipment.subBrands!.length)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-800 transition-all"
                      aria-label="上一個品牌"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSubBrandIndex((prev) => (prev + 1) % selectedEquipment.subBrands!.length)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-800 transition-all"
                      aria-label="下一個品牌"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 背景圖片 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('${currentTab.backgroundImage}')`,
          backgroundColor: (currentTab.layout === 'cabinet' || currentTab.layout === 'equipment' || currentTab.layout === 'spec') ? '#e8e4dd' : '#1a1a1a',
          top: '80px',
        }}
      />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* 根據布局類型渲染不同內容 */}
        {currentTab.layout === 'cabinet' && renderCabinetLayout()}
        {currentTab.layout === 'equipment' && renderEquipmentLayout()}
        {currentTab.layout === 'default' && renderDefaultLayout()}
        {currentTab.layout === 'spec' && renderSpecLayout()}

        {/* 右側頁籤區 */}
        <div className="flex items-center pr-8">
          <div className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'spec') {
                    // 規格尺寸圖：直接打開燈箱
                    setShowSpecViewer(true);
                    setSpecViewerScale(1);
                    setSpecViewerPosition({ x: 0, y: 0 });
                    setSpecImageIndex(0);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`
                  px-2 py-4 border-2 transition-all duration-300 text-body tracking-wider-custom
                  [writing-mode:vertical-rl] [text-orientation:mixed]
                  ${activeTab === tab.id
                    ? (currentTab.layout === 'cabinet' || currentTab.layout === 'equipment')
                      ? 'border-text-primary bg-text-primary/10 text-text-primary'
                      : 'border-gold bg-gold/10 text-gold'
                    : (currentTab.layout === 'cabinet' || currentTab.layout === 'equipment')
                      ? 'border-gray-400 bg-white/50 text-gray-600 hover:border-gray-600 hover:text-gray-800'
                      : 'border-white/30 bg-black/30 text-white/70 hover:border-white/50 hover:text-white'
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 廚具設備燈箱 Modal */}
      {renderEquipmentModal()}

      {/* 規格尺寸圖燈箱 */}
      {renderSpecViewer()}

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

export default KitchenBrandPage;

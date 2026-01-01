import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

// 產品資料結構
interface ProductItem {
  id: string;
  name: string;
  image: string;
  description?: string;
  features: string[];
}

interface TabData {
  id: string;
  name: string;
  logo: string;
  logoAlt: string;
  title: string;
  subtitle?: string;
  content: string;
  contentType: 'paragraph' | 'list';
  productImage: string;
  products?: ProductItem[];
}

// 永賀能源科技產品資料
const yunghoProducts: ProductItem[] = [
  {
    id: 'filter-bag',
    name: '中央濾袋式過濾器',
    image: '/images/water/filter-bag.jpg',
    features: [
      '成本效益高：投資成本和運營費用相對較低，且濾袋更換便捷，減少了停機時間。',
      '處理量大、容污量大：在小體積下能實現大流量的過濾，並能容納較多雜質。',
      '維護簡便：更換濾袋方便快捷，且過濾器免清洗，節省人力和時間。',
    ],
  },
  {
    id: 'dual-filter',
    name: '不鏽鋼雙效過濾',
    image: '/images/water/product.png',
    description: '過濾器通常安裝在水塔或自來水進水處，處理整個家庭的用水，可用來淨化日常的洗滌用水。',
    features: [
      '10吋大胖不鏽鋼全戶型單道雙效水塔過濾器：採用 SUS304 不鏽鋼桶身，並配備雙效複合式濾芯，可過濾泥沙、鐵鏽、氯氣、異味、重金屬等物質。',
      '濾心特色：濾心以摺疊式設計，增加過濾面積與容污量，並結合活性碳棒，提升除氯效果。',
    ],
  },
];

const tabs: TabData[] = [
  {
    id: 'yungho',
    name: '永賀能源科技',
    logo: '/images/water/yungho-logo.png',
    logoAlt: '永賀能源科技',
    title: '',
    subtitle: '全方位水處理專家\n用水點滴純淨',
    content: '提供水處理過濾系統與全方位的熱水節能服務，涵蓋：電能熱水器、水塔、泵浦、家用型熱泵與太陽能熱水器等居家設備，並提供從前期評估、系統設計、整體規劃、專業施工到後續服務的一條龍作業，全面提升用水品質，確保長期穩定與安心使用。',
    contentType: 'paragraph',
    productImage: '',
    products: yunghoProducts,
  },
  {
    id: 'sakura',
    name: 'SAKURA 櫻花',
    logo: '/images/water/sakura-logo.png',
    logoAlt: 'SAKURA 櫻花',
    title: '廚下雙溫淨熱飲',
    content: '免費淨水器健檢服務，把關飲水品質\n創新專利，淨水+熱水雙機合一\n內建軟水淨水模組，可安心生飲\n獨特進水設計，熱水使用不降溫\n貼心溫度模式，可設定保溫溫度\n節能省電模式，8小時保溫不加熱',
    contentType: 'list',
    productImage: '/images/water/sakura-product.png',
  },
];

const WaterBrandPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('yungho');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 渲染產品 Modal
  const renderProductModal = () => {
    if (!selectedProduct) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center animate-slide-down-full"
        onClick={() => setSelectedProduct(null)}
      >
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

        {/* Modal 內容 */}
        <div
          className="relative bg-white max-w-4xl w-full mx-4 flex shadow-2xl overflow-hidden min-h-[300px]"
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: '85vh' }}
        >
          {/* 左側：產品圖片 */}
          <div className="w-2/5 p-8 flex items-center justify-center">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-full max-h-72 object-contain"
            />
          </div>

          {/* 右側：產品資訊 */}
          <div className="w-3/5 p-8 flex flex-col justify-center overflow-y-auto">
            {/* 產品名稱 */}
            <h3 className="text-h4 tracking-wide-custom text-gray-900 font-bold mb-4">
              {selectedProduct.name}
            </h3>

            {/* 產品說明（如有） */}
            {selectedProduct.description && (
              <p className="text-body leading-relaxed-custom text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
            )}

            {/* 產品特色列表 */}
            <ul className="space-y-2">
              {selectedProduct.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-small leading-relaxed-custom text-gray-700"
                >
                  <span className="mr-3 mt-2 w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 - 滿版背景圖 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          top: '80px',
          backgroundImage: 'url(/images/water/water-bg.jpg)',
        }}
      >
        {/* 左側內容區塊 - 文字 */}
        <div className="absolute left-0 top-0 bottom-0 w-[40%] flex items-center px-16">
          <div className="max-w-md">
            {/* 品牌 Logo */}
            <div className="mb-6 flex items-center gap-4">
              <img
                src={currentTab.logo}
                alt={currentTab.logoAlt}
                className="h-12 object-contain"
              />
              {currentTab.id === 'yungho' && (
                <h1 className="text-h2 tracking-wider-custom">{currentTab.title}</h1>
              )}
            </div>

            {/* 標題/副標題 */}
            {currentTab.subtitle ? (
              <h2 className="text-h3 tracking-wide-custom text-gray-900 font-bold mb-6 whitespace-pre-line">
                {currentTab.subtitle}
              </h2>
            ) : (
              <h2 className="text-h3 tracking-wide-custom text-gray-900 font-bold mb-6">
                {currentTab.title}
              </h2>
            )}

            {/* 內文 */}
            {currentTab.contentType === 'paragraph' ? (
              <p className="text-body leading-loose-custom text-gray-700 text-justify">
                {currentTab.content}
              </p>
            ) : (
              <ul className="space-y-2">
                {currentTab.content.split('\n').map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-body leading-relaxed-custom text-gray-700"
                  >
                    <span className="mr-3 mt-2 w-1.5 h-1.5 bg-brand-sakura rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* 產品縮圖區 - 僅永賀能源科技顯示 */}
            {currentTab.products && currentTab.products.length > 0 && (
              <div className="mt-8 flex gap-4">
                {currentTab.products.map((product) => (
                  <div
                    key={product.id}
                    className={`
                      cursor-pointer transition-all duration-300
                      ${hoveredProduct === product.id ? 'scale-105' : ''}
                    `}
                    onClick={() => setSelectedProduct(product)}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* 產品縮圖 */}
                    <div
                      className={`
                        w-28 h-28 bg-white rounded-lg flex items-center justify-center p-2
                        border-2 transition-all duration-300 shadow-md
                        ${hoveredProduct === product.id
                          ? 'border-[#1a5276]'
                          : 'border-transparent'
                        }
                      `}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* 產品名稱 */}
                    <p
                      className={`
                        text-center mt-2 text-xsmall tracking-normal-custom
                        transition-colors duration-300
                        ${hoveredProduct === product.id ? 'text-gray-900 font-medium' : 'text-gray-600'}
                      `}
                    >
                      {product.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 商品圖 - 獨立定位 */}
        {!currentTab.productImage ? null : (
          <div className="absolute right-[35%] top-1/2 -translate-y-1/2">
            <img
              src={currentTab.productImage}
              alt={currentTab.title}
              className="h-[80vh] object-contain"
            />
          </div>
        )}

        {/* 右側頁籤區 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
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

        {/* 右下角註解 */}
        <div className="absolute bottom-4 right-8">
          <p className="text-micro text-gray-500">
            情境示意圖僅供參考，以實際施工及合約為準
          </p>
        </div>
      </div>

      {/* 產品燈箱 Modal */}
      {renderProductModal()}

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

export default WaterBrandPage;

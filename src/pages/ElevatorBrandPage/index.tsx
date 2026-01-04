import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

// 功能項目資料結構
interface FeatureItem {
  id: string;
  name: string;
}

// 功能項目列表
const featureItems: FeatureItem[] = [
  {
    id: 'elevator-feature',
    name: '電梯特色',
  },
  {
    id: 'air-purifier',
    name: 'SHARP 空氣清淨機',
  },
];

// 電梯特色內容
const elevatorFeatures = [
  '傳動效能提高，小型輕量化，可降低能源消耗，極佳節能減碳效果。',
  '無減速齒輪機構，不會產生囓合噪音，不需齒輪油潤滑。',
  '雙煞車器。',
  '繞組自鎖裝置：即時煞車器失效下，電梯會以緩慢速度滑行，直至擠壓緩衝台而停止滑行，不會發生暴衝撞頂之嚴重危害。',
  '溜梯自救：永大安全技術發明專利。當電梯在開門區時，系統即時監測車廂狀態，若車廂發生溜梯情況，電梯主機自動輸出保持轉矩，使車廂維持在門區不動後，立即開門並提醒乘客離開電梯。當乘客全部離開後，電梯關門且運行到頂樓(最安全的位置)，產生故障代碼並停止服務。',
  '車廂意外移動保護裝置(UCMP)：當電梯門開啟乘客出入過程中，一旦電梯發生非預期之移動，立即啟動煞車器將電梯停住，待專業人員進行維修檢測後方可恢復正常運行，確保乘客安全。消除電梯在開門狀態下，意外移動的安全隱患，確保乘客安全，防止意外發生。',
  '上行超速保護裝置(ACOP)：電梯上行時當限速器偵測到上行速度超過限定值時，就會啟動煞車器將電梯停止住，確保電梯在額定速度下安全運行。',
  '煞車力自動偵測系統：永大安全技術發明專利。每日於預設排程自動對馬達主機進行煞車力檢測。當煞車力減弱初期，自動發出預警代碼通知維保人員提早預防處理；若煞車力不足時，將產生故障代碼並通知維保人員進行故障處理，確保煞車器可靠有效。',
];

// 分頁設定：第一頁4項，第二頁2項，第三頁2項
const pageConfig = [
  { start: 0, count: 4 },  // 第一頁：1-4
  { start: 4, count: 2 },  // 第二頁：5-6
  { start: 6, count: 2 },  // 第三頁：7-8
];

// SHARP 空氣清淨機圖片
const sharpImages = [
  '/images/elevator/sharp-01.jpg',
  '/images/elevator/sharp-02.jpg',
  '/images/elevator/sharp-03.jpg',
  '/images/elevator/sharp-04.jpg',
  '/images/elevator/sharp-05.jpg',
];

const ElevatorBrandPage: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sharpImageIndex, setSharpImageIndex] = useState(0);

  const totalPages = pageConfig.length;

  const handleItemClick = (id: string) => {
    setShowModal(id);
    setCurrentPage(0); // 重置到第一頁
    setSharpImageIndex(0); // 重置圖片索引
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const goToPrevSharpImage = () => {
    setSharpImageIndex((prev) => (prev > 0 ? prev - 1 : sharpImages.length - 1));
  };

  const goToNextSharpImage = () => {
    setSharpImageIndex((prev) => (prev < sharpImages.length - 1 ? prev + 1 : 0));
  };

  // 取得當前頁面的特色項目
  const getCurrentPageFeatures = () => {
    const { start, count } = pageConfig[currentPage];
    return elevatorFeatures.slice(start, start + count);
  };

  // 渲染電梯特色 Modal
  const renderElevatorFeatureModal = () => {
    if (showModal !== 'elevator-feature') return null;

    return (
      <div className="fixed inset-0 z-50 bg-white animate-fade-in">
        {/* 品牌 Logo - 左上角 */}
        <div className="absolute top-24 left-8">
          <img
            src="/images/elevator/logo-hitachi.png"
            alt="日立永大電梯"
            className="h-12 object-contain"
          />
        </div>

        {/* 關閉按鈕 - 右上角 */}
        <button
          onClick={closeModal}
          className="absolute top-20 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300 z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 主要內容區 */}
        <div className="h-full flex">
          {/* 左側：文字內容 */}
          <div className="w-1/2 h-full ps-24 pe-8 pt-24 relative">
            {/* 標題區 - 固定位置 */}
            <div className="absolute top-1/4 left-16 right-16">
              {/* 標題 */}
              <h2 className="text-h3 tracking-wide-custom font-bold text-text-primary mb-4">
                日立永大電梯
              </h2>

              {/* 副標題 */}
              <h3 className="text-large tracking-wide-custom font-medium text-text-secondary">
                永磁式無齒輪主機特色
              </h3>
            </div>

            {/* 特色列表 - 固定位置 */}
            <div className="absolute top-[45%] left-16 right-16">
              <ul key={currentPage} className="space-y-4 animate-slide-in">
                {getCurrentPageFeatures().map((feature, index) => (
                  <li
                    key={index}
                    className="flex text-body leading-relaxed-custom text-text-primary"
                  >
                    {/* 第一頁顯示編號，第二三頁不顯示 */}
                    {currentPage === 0 ? (
                      <span className="mr-3 text-text-primary font-bold flex-shrink-0">
                        {index + 1}.
                      </span>
                    ) : (
                      <span className="mr-3 text-gray-400 flex-shrink-0">◆</span>
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 箭頭導航 - 固定在文字區塊右下角 */}
            <div className="absolute bottom-12 right-8 flex items-center gap-3">
              <button
                onClick={goToPrevPage}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={goToNextPage}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* 右側：產品圖片 */}
          <div className="w-1/2 pt-24 h-full flex items-center justify-center bg-gray-50 p-12">
            <img
              src="/images/elevator/elevator-product.jpg"
              alt="日立電梯"
              className="max-w-full max-h-full object-contain"
            />
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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          top: '80px',
          backgroundImage: 'url(/images/elevator/elevator-bg.jpg)',
          backgroundColor: '#1a1a1a',
        }}
      >
        {/* 右側半透明白底內容區 */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[40%] flex flex-col justify-center px-12"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <div className="max-w-lg">
            {/* 標題 */}
            <h1 className="text-h3 tracking-wide-custom font-bold text-text-primary mb-2">
              日立靜音升降電梯，科技藏於無聲
            </h1>

            {/* 內文 */}
            <p className="text-body leading-loose-custom text-text-primary text-justify mb-12">
              以高階豪宅標準為本，日立電梯融合極致靜音技術與安全，從運行速度到停層精度，皆體現日本精密工學的極致，讓每一次乘載都成為優雅體驗。
            </p>

            {/* 功能項目列表 - 菱形 */}
            <ul className="space-y-3">
              {featureItems.map((item) => (
                <li
                  key={item.id}
                  className={`
                    flex items-center cursor-pointer transition-all duration-300
                    ${hoveredItem === item.id ? 'translate-x-2' : ''}
                  `}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* 菱形標記 */}
                  <span
                    className={`
                      mr-3 text-body transition-colors duration-300
                      ${hoveredItem === item.id ? 'text-text-primary' : 'text-gray-400'}
                    `}
                  >
                    ◆
                  </span>
                  {/* 項目名稱 */}
                  <span
                    className={`
                      text-body tracking-wide-custom transition-colors duration-300
                      ${hoveredItem === item.id ? 'text-text-primary font-medium' : 'text-text-primary'}
                    `}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右下角註解 */}
        <div className="absolute bottom-4 right-8">
          <p className="text-micro text-gray-600">
            情境示意圖僅供參考，以實際施工及合約為準
          </p>
        </div>
      </div>

      {/* 電梯特色 Modal */}
      {renderElevatorFeatureModal()}

      {/* SHARP 空氣清淨機 Modal */}
      {showModal === 'air-purifier' && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
          <div className="w-full h-full flex items-center justify-center p-8">
            <img
              key={sharpImageIndex}
              src={sharpImages[sharpImageIndex]}
              alt={`SHARP 空氣清淨機 ${sharpImageIndex + 1}`}
              className="w-[75%] h-auto object-contain animate-fade-in"
            />
          </div>

          {/* 關閉按鈕 - 右上角 */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300 z-20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* 箭頭導航 - 固定在右下角 */}
          <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
            <button
              onClick={goToPrevSharpImage}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goToNextSharpImage}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 動畫樣式 */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ElevatorBrandPage;

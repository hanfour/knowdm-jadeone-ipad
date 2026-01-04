import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface ProjectPhoto {
  id: string;
  image: string;
  name: string;
}

interface TabData {
  id: string;
  name: string;
}

const tabs: TabData[] = [
  { id: 'ykk', name: 'YKK氣密窗' },
  { id: 'robin', name: 'ROBINA地板' },
  { id: 'sekisui', name: 'SEKISUI靜音墊' },
];

const ykkProjects: ProjectPhoto[] = [
  { id: '1', image: '/images/window-flooring/ykk/projects/國家美術館.jpg', name: '國家美術館' },
  { id: '2', image: '/images/window-flooring/ykk/projects/東騰信義.jpg', name: '東騰信義' },
  { id: '3', image: '/images/window-flooring/ykk/projects/森林摩天41.jpg', name: '森林摩天41' },
  { id: '4', image: '/images/window-flooring/ykk/projects/若山三期若蒔山.jpg', name: '若山三期若蒔山' },
  { id: '5', image: '/images/window-flooring/ykk/projects/鑫輝昕奕居.jpg', name: '鑫輝昕奕居' },
];

const WindowFlooringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ykk');

  // 燈箱狀態
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* Tab 內容區 */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'ykk' && (
            <div className="h-full flex">
              {/* 左側：情境圖 + Logo */}
              <div className="w-[50%] h-full overflow-hidden relative">
                <img
                  src="/images/window-flooring/ykk/context.jpg"
                  alt="YKK氣密窗情境"
                  className="w-full h-full object-cover"
                />
                {/* YKK Logo 壓在右上角 */}
                <div className="absolute top-6 right-6">
                  <img
                    src="/images/window-flooring/ykk/logo.png"
                    alt="YKK AP"
                    className="h-12 object-contain"
                  />
                </div>
                {/* 左下角警示文字 */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-micro text-gray-600">
                    產品情境示意圖僅供參考，以實際施工及合約為準
                  </p>
                </div>
              </div>

              {/* 右側：產品資訊 */}
              <div
                className="w-[50%] h-full overflow-y-auto ps-12 pe-28 py-8 flex flex-col justify-center"
                style={{ backgroundColor: '#f8f8f8' }}
              >
                {/* 產品標題 */}
                <h2 className="text-h4 tracking-wide-custom text-gray-900 font-bold mb-4">
                  YRB-A氣密窗 超高水密靜謐恆久
                </h2>

                {/* 產品介紹 */}
                <p className="text-body leading-loose-custom text-gray-700 mb-6 text-justify">
                  日本YKK精密工學，以嚴苛的氣密與水密標準，運用新等壓原理開發高水密性能，『高耐風壓』提升內外部隔音效果，節省冷暖氣能源消耗，冷暖氣運轉負擔減輕，提供靜謐安穩的舒適生活。
                </p>

                {/* 基本性能圖 */}
                <div className="mb-8">
                  <div className="w-full flex justify-between items-center">
                    <p className="text-body leading-loose-custom text-gray-900 font-medium">基本性能</p>
                    <p className="text-micro">＊通風門的水密性能為750Pa、耐風壓性能為2800Pa、隔音性能為25dB</p>
                  </div>
                  <img
                    src="/images/window-flooring/ykk/performance.jpg"
                    alt="基本性能"
                    className="w-full max-w-2xl rounded-lg shadow-sm"
                  />
                </div>

                {/* 實績照片標題 */}
                <p className="text-body leading-loose-custom text-gray-900 font-medium mb-4">
                  實績照片
                </p>

                {/* 實績照片 - 五張並排 */}
                <div className="grid grid-cols-5 gap-3">
                  {ykkProjects.map((project) => (
                    <div key={project.id} className="group">
                      <div className="overflow-hidden rounded-lg mb-2">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-micro text-gray-800 text-center truncate">
                        {project.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'robin' && (
            <div className="h-full flex">
              {/* 左側：文字區塊 (40%) */}
              <div
                className="w-[40%] h-full relative overflow-hidden"
                style={{ backgroundColor: '#f5f0e8' }}
              >
                {/* 背景情境圖 */}
                <div
                  className="absolute inset-0 bg-cover bg-left bg-no-repeat"
                  style={{ backgroundImage: 'url(/images/window-flooring/robina/context.jpg)' }}
                />

                {/* 文字內容 */}
                <div className="relative h-full flex flex-col justify-center items-center">
                  <div className="max-w-lg p-10 bg-white/75">
                    {/* 品牌 Logo */}
                    <div className="mb-8 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                      <img
                        src="/images/window-flooring/robina/logo.png"
                        alt="Robina"
                        className="h-24 object-contain"
                      />
                    </div>

                    {/* 標題 */}
                    <p
                      className="text-h4 tracking-wide-custom text-brand-sekisui mb-6 animate-fade-in-left"
                      style={{ animationDelay: '0.3s' }}
                    >
                      Robina溫潤木質，沉穩格調的起點
                    </p>

                    {/* 介紹 */}
                    <p
                      className="text-body leading-loose-custom text-gray-800 text-justify animate-fade-in-left"
                      style={{ animationDelay: '0.4s' }}
                    >
                      美國Robina羅賓木地板，符合歐盟低甲醛、綠建材標章、國家CNS防焰一級保證，使用熱帶快生複合硬木種，最適台灣氣候的超耐潮地板，獨創真空邊緣防護系統「專利雙卡扣設計」有效防滲漏，10年耐白蟻保證。
                    </p>
                  </div>
                </div>

                {/* 左下角警示文字 */}
                <div className="absolute bottom-4 left-8">
                  <p className="text-micro text-gray-500">
                    產品情境示意圖僅供參考，以實際施工及合約為準
                  </p>
                </div>
              </div>

              {/* 右側：產品結構圖說區 (60%) */}
              <div
                className="w-[60%] h-full overflow-hidden flex items-center justify-center pe-16"
                style={{ backgroundColor: '#faf8f5' }}
              >
                <div className="w-full px-20">
                  <img
                    src="/images/window-flooring/robina/product-structure.jpg"
                    alt="ROBINA 地板結構圖說"
                    className="max-h-[90%] w-auto object-contain animate-fade-in-left cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ animationDelay: '0.4s', mixBlendMode: 'darken' }}
                    onClick={() => setLightboxOpen(true)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sekisui' && (
            <div
              className="h-full relative bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/images/window-flooring/robina/context.jpg)' }}
            >
              {/* 半透明遮罩 */}
              {/* <div className="absolute inset-0 bg-white/40" /> */}

              {/* 內容區 */}
              <div className="relative h-full flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center px-20 py-12 bg-white/75">
                  {/* 品牌 Logo */}
                  <div className="mb-8 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                    <img
                      src="/images/window-flooring/sekisui-logo.png"
                      alt="sekisui"
                      className="h-14 object-contain"
                    />
                  </div>

                  {/* 介紹 */}
                  <p
                    className="text-body leading-loose-custom text-black text-justify max-w-[600px] mb-6 animate-fade-in-left"
                    style={{ animationDelay: '0.4s' }}
                  >
                    有效降低地面回響與共振音，降噪表現最高可達 20dB，明顯改善行走噪音與空間安靜度。同時具備優異防潮效果，阻隔地面濕氣，減少潮濕對地板的影響，讓使用環境更安心、更耐久。
                  </p>

                  {/* 五個特色圖示 */}
                  <div className="flex justify-center gap-8">
                    {/* 抗潮效果 */}
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <img
                        src="/images/window-flooring/sekisui/icons/防潮.png"
                        alt="抗潮效果"
                        className="w-20 h-20 object-contain mb-4"
                      />
                      <h3 className="text-h4 tracking-wide-custom text-brand-sekisui font-bold mb-2">抗潮效果</h3>
                      <p className="text-body leading-loose-custom text-gray-800 text-justify max-w-[200px]">
                        對水氣具有極好的抵抗，對台灣潮濕氣候所造成材料腐化具有極好的效果。
                      </p>
                    </div>

                    {/* 抗壓強度 */}
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                      <img
                        src="/images/window-flooring/sekisui/icons/抗壓.png"
                        alt="抗壓強度"
                        className="w-20 h-20 object-contain mb-4"
                      />
                      <h3 className="text-h4 tracking-wide-custom text-brand-sekisui font-bold mb-2">抗壓強度</h3>
                      <p className="text-body leading-loose-custom text-gray-800 text-justify max-w-[200px]">
                        低壓縮永久變型率，極高的抗壓程度，具有出色的承重性能。
                      </p>
                    </div>

                    {/* 行走聲響 */}
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                      <img
                        src="/images/window-flooring/sekisui/icons/行走聲響.png"
                        alt="行走聲響"
                        className="w-20 h-20 object-contain mb-4"
                      />
                      <h3 className="text-h4 tracking-wide-custom text-brand-sekisui font-bold mb-2">行走聲響</h3>
                      <p className="text-body leading-loose-custom text-gray-800 text-justify max-w-[200px]">
                        有效隔絕行走時的響聲，消除各種硬質鞋底發出的共振。
                      </p>
                    </div>

                    {/* 極佳彈性 */}
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                      <img
                        src="/images/window-flooring/sekisui/icons/彈性.png"
                        alt="極佳彈性"
                        className="w-20 h-20 object-contain mb-4"
                      />
                      <h3 className="text-h4 tracking-wide-custom text-brand-sekisui font-bold mb-2">極佳彈性</h3>
                      <p className="text-body leading-loose-custom text-gray-800 text-justify max-w-[200px]">
                        即使在使用數年後，仍具有良好的彈性，也不會降低聲學性能。
                      </p>
                    </div>

                    {/* 結構隔音 */}
                    <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                      <img
                        src="/images/window-flooring/sekisui/icons/隔音.png"
                        alt="結構隔音"
                        className="w-20 h-20 object-contain mb-4"
                      />
                      <h3 className="text-h4 tracking-wide-custom text-brand-sekisui font-bold mb-2">結構隔音</h3>
                      <p className="text-body leading-loose-custom text-gray-800 text-justify max-w-[200px]">
                        出色的結構隔音效果，在低頻範圍內有最佳的性能。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右下角警示文字 */}
              <div className="absolute bottom-4 right-12">
                <p className="text-micro text-gray-500">
                  產品情境示意圖僅供參考，以實際施工及合約為準
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 右側垂直頁籤區 */}
        <div className="absolute top-0 bottom-0 right-0 my-auto flex items-center pe-8">
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

      {/* 燈箱 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90"
          style={{ zIndex: 9999 }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* 主圖片區域 */}
          <div
            className="relative w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/window-flooring/robina/product-structure.jpg"
              alt="ROBINA 地板結構圖說"
              className="max-w-[90%] max-h-[90%] object-contain"
            />
          </div>

          {/* 關閉按鈕 */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300"
            style={{ zIndex: 10 }}
            aria-label="關閉"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

// 動畫樣式
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fade-in-left {
    opacity: 0;
    animation: fadeInLeft 0.6s ease-out forwards;
  }
`;

// 注入樣式
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  if (!document.head.querySelector('[data-window-flooring-styles]')) {
    styleSheet.setAttribute('data-window-flooring-styles', 'true');
    document.head.appendChild(styleSheet);
  }
}

export default WindowFlooringPage;

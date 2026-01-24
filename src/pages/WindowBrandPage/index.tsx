import React, { useState } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface ProjectPhoto {
  id: string;
  image: string;
  name: string;
}

const ykkProjects: ProjectPhoto[] = [
  { id: '1', image: '/images/window-flooring/ykk/projects/國家美術館.jpg', name: '國家美術館' },
  { id: '2', image: '/images/window-flooring/ykk/projects/東騰信義.jpg', name: '東騰信義' },
  { id: '3', image: '/images/window-flooring/ykk/projects/森林摩天41.jpg', name: '森林摩天41' },
  { id: '4', image: '/images/window-flooring/ykk/projects/若山三期若蒔山.jpg', name: '若山三期若蒔山' },
  { id: '5', image: '/images/window-flooring/ykk/projects/鑫輝昕奕居.jpg', name: '鑫輝昕奕居' },
];

// YKK 更多介紹輪播圖片
const ykkGalleryImages = [
  '/images/window-flooring/ykk/gallery/img_001.jpg',
  '/images/window-flooring/ykk/gallery/img_002.jpg',
  '/images/window-flooring/ykk/gallery/img_003.jpg',
  '/images/window-flooring/ykk/gallery/img_004.jpg',
  '/images/window-flooring/ykk/gallery/img_005.jpg',
  '/images/window-flooring/ykk/gallery/img_006.jpg',
];

const WindowBrandPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openModal = () => {
    setShowModal(true);
    setGalleryIndex(0);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToPrevImage = () => {
    setGalleryIndex((prev) => (prev > 0 ? prev - 1 : ykkGalleryImages.length - 1));
  };

  const goToNextImage = () => {
    setGalleryIndex((prev) => (prev < ykkGalleryImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* YKK 氣密窗內容 */}
        <div className="h-full flex w-full">
          {/* 左側：情境圖 + Logo */}
          <div className="w-[50%] h-full overflow-hidden relative">
            <img
              src="/images/window-flooring/ykk/context.jpg"
              alt="YKK氣密窗情境"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            {/* YKK Logo 壓在右上角 */}
            <div className="absolute top-6 right-6">
              <img
                src="/images/window-flooring/ykk/logo.png"
                alt="YKK AP"
                loading="lazy"
                decoding="async"
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
            <h2 className="text-large tracking-wide-custom text-gray-900 font-bold mb-4">
              YRB-A氣密窗 超高水密靜謐恆久
            </h2>

            {/* 產品介紹 */}
            <p className="text-body text-justify leading-relaxed text-gray-700 mb-6 text-justify">
              日本YKK精密工學，以嚴苛的氣密與水密標準，運用新等壓原理開發高水密性能，『高耐風壓』提升內外部隔音效果，節省冷暖氣能源消耗，冷暖氣運轉負擔減輕，提供靜謐安穩的舒適生活。
            </p>

            {/* 基本性能圖 */}
            <div className="mb-8">
              <div className="w-full flex justify-between items-center">
                <p className="text-body text-justify leading-relaxed text-gray-900 font-medium">基本性能</p>
                <p className="text-micro">＊通風門的水密性能為750Pa、耐風壓性能為2800Pa、隔音性能為25dB</p>
              </div>
              <img
                src="/images/window-flooring/ykk/performance.jpg"
                alt="基本性能"
                loading="lazy"
                decoding="async"
                className="w-full max-w-2xl rounded-lg shadow-sm"
              />
            </div>

            {/* 實績照片標題 */}
            <p className="text-body text-justify leading-relaxed text-gray-900 font-medium mb-4">
              實績照片
            </p>

            {/* 實績照片 - 五張並排 */}
            <div className="grid grid-cols-5 gap-3 mb-8">
              {ykkProjects.map((project) => (
                <div key={project.id} className="group">
                  <div className="overflow-hidden rounded-lg mb-2">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-micro text-gray-800 text-center truncate">
                    {project.name}
                  </p>
                </div>
              ))}
            </div>

            {/* 更多介紹按鈕 */}
            <div className="flex justify-center">
              <button
                onClick={openModal}
                className="px-4 py-1.5 border-2 border-text-primary text-text-primary text-xsmall tracking-wide-custom hover:bg-text-primary hover:text-white transition-all duration-300"
              >
                更多介紹
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* YKK 更多介紹 Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-white animate-fade-in" style={{ top: '80px' }}>
          <div className="w-full h-full flex items-center justify-center p-8">
            <img
              key={galleryIndex}
              src={ykkGalleryImages[galleryIndex]}
              alt={`YKK 氣密窗介紹 ${galleryIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full max-h-[90%] object-contain animate-fade-in"
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
              onClick={goToPrevImage}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={goToNextImage}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 text-gray-500 hover:border-text-primary hover:text-text-primary transition-colors bg-white/80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* 頁碼指示 - 左下角 */}
          <div className="absolute bottom-8 left-8 text-body text-gray-600 z-20">
            {galleryIndex + 1} / {ykkGalleryImages.length}
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
      `}</style>
    </div>
  );
};

export default WindowBrandPage;

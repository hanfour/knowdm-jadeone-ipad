import React, { useState, useEffect } from 'react';
import { GalleryButtonData } from '../types';
import Compass from './Compass';

interface GalleryViewerProps {
  isOpen: boolean;
  gallery: GalleryButtonData | null;
  currentIndex: number;
  scale: number;
  floorLabel: string;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const GalleryViewer: React.FC<GalleryViewerProps> = ({
  isOpen,
  gallery,
  currentIndex,
  scale,
  floorLabel,
  onClose,
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
  onPrev,
  onNext,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 拖曳處理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // 縮放時重置位置
  useEffect(() => {
    if (scale === 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

  // 切換圖片時重置位置
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [currentIndex, gallery?.id]);

  // 復原
  const handleResetAll = () => {
    setPosition({ x: 0, y: 0 });
    onReset();
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-40 transition-transform duration-500 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ top: '80px' }}
    >
      {gallery && (
        <>
          <div className="absolute top-0 left-0 z-10 bg-[#f5e6b8] text-black px-6 py-4">
            <h3 className="font-bold text-center" style={{ fontSize: '1.75rem' }}>
              {floorLabel}
            </h3>
            <p className="text-sm" style={{ color: '#c41e3a' }}>{gallery.label}</p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            aria-label="關閉"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="absolute z-10 flex flex-col gap-2"
            style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
          >
            <button
              onClick={onZoomIn}
              className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="放大"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              onClick={onZoomOut}
              disabled={scale <= 1}
              className={`w-10 h-10 bg-white shadow-md flex items-center justify-center transition-colors ${
                scale <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              aria-label="縮小"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
              </svg>
            </button>
            <button
              onClick={handleResetAll}
              className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="復原"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              onClick={onFullscreen}
              className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="全螢幕"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
              </svg>
            </button>
          </div>

          <div
            className="w-full h-full flex items-center justify-center overflow-hidden p-8"
            style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {gallery.images.length > 0 && (
              <img
                src={gallery.images[currentIndex].src}
                alt={gallery.images[currentIndex].label}
                className="max-w-full max-h-full object-contain select-none"
                draggable={false}
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                }}
              />
            )}
          </div>

          {gallery.images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                aria-label="上一張"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={onNext}
                className="absolute right-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                aria-label="下一張"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <Compass style={{ right: '8%', bottom: '5%', transform: 'translate(-50%, -50%)' }} />

          <div
            className="absolute z-10 text-xs text-gray-400 text-right"
            style={{ right: '5rem', bottom: '1.5rem', maxWidth: '400px' }}
          >
            本圖面僅供參考，實際以合約圖面為準
          </div>

          {gallery.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
              {currentIndex + 1} / {gallery.images.length}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GalleryViewer;

import React, { useState, useEffect, useRef } from 'react';
import { GalleryButtonData } from '../types';
import Compass from './Compass';
import CloseButton from '../../../components/close-button';

interface GalleryViewerProps {
  isOpen: boolean;
  gallery: GalleryButtonData | null;
  currentIndex: number;
  scale: number;
  floorLabel: string;
  hasParent?: boolean;
  devMode?: boolean;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenNested?: (gallery: GalleryButtonData) => void;
}

const GalleryViewer: React.FC<GalleryViewerProps> = ({
  isOpen,
  gallery,
  currentIndex,
  scale,
  floorLabel,
  hasParent = false,
  devMode = false,
  onClose,
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
  onPrev,
  onNext,
  onOpenNested,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const [devPoints, setDevPoints] = useState<{ x: number; y: number }[]>([]);
  const [devCopied, setDevCopied] = useState(false);

  const currentImage = gallery?.images[currentIndex];
  const regions = currentImage?.regions;

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

  // DEV：點擊圖片取得百分比座標
  const handleDevClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!devMode || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(2));
    const y = parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(2));
    setDevPoints(prev => [...prev, { x, y }]);
  };
  const devUndo = () => setDevPoints(prev => prev.slice(0, -1));
  const devClear = () => setDevPoints([]);
  const devCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(devPoints, null, 2));
    setDevCopied(true);
    setTimeout(() => setDevCopied(false), 2000);
  };

  // 切換圖片時清空 dev points
  useEffect(() => {
    setDevPoints([]);
  }, [currentIndex, gallery?.id]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-40 transition-transform duration-500 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ top: '80px' }}
    >
      {gallery && (
        <>
          <div className="absolute z-20 bg-[#d4a853]/50 text-black px-6 py-4">
            <h3 className="font-bold text-h1 text-center leading-none">
              {floorLabel}
            </h3>
            <p className="mt-1 text-center text-xsmall">{gallery.label}</p>
          </div>

          {hasParent ? (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 px-4 py-2 bg-white/90 hover:bg-white text-gray-800 text-xsmall shadow-md flex items-center gap-2 transition-colors"
              aria-label="返回公設規劃"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>返回公設規劃</span>
            </button>
          ) : (
            <CloseButton onClick={onClose} />
          )}

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
            className="relative w-full h-full flex items-center justify-center overflow-hidden p-8"
            style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {gallery.images.length > 0 && (
              <>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${gallery.images[currentIndex].src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(40px) brightness(0.7)',
                    transform: 'scale(1.1)',
                  }}
                />
                <div
                  className="relative"
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    display: 'inline-block',
                    lineHeight: 0,
                  }}
                >
                  <img
                    ref={imageRef}
                    src={gallery.images[currentIndex].src}
                    alt={gallery.images[currentIndex].label}
                    loading="lazy"
                    decoding="async"
                    className="select-none block"
                    draggable={false}
                    onClick={handleDevClick}
                    style={{
                      maxWidth: 'calc(100vw - 4rem)',
                      maxHeight: 'calc(100vh - 80px - 4rem)',
                      width: 'auto',
                      height: 'auto',
                      cursor: devMode ? 'crosshair' : undefined,
                    }}
                  />

                  {/* 區域點擊熱區（巢狀圖庫入口） */}
                  {!devMode && regions && regions.length > 0 && (
                    <svg
                      className="absolute inset-0"
                      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      {regions.map((region, idx) => (
                        <polygon
                          key={idx}
                          points={region.points.map(p => `${p.x},${p.y}`).join(' ')}
                          className="region-highlight pointer-events-auto"
                          stroke="rgba(255, 215, 0, 0.6)"
                          strokeWidth="0.3"
                          onClick={() => onOpenNested?.(region.gallery)}
                        />
                      ))}
                    </svg>
                  )}

                  {/* DEV：取座標視覺化 */}
                  {devMode && devPoints.length > 0 && (
                    <svg
                      className="absolute inset-0"
                      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      {devPoints.length >= 3 && (
                        <polygon
                          points={devPoints.map(p => `${p.x},${p.y}`).join(' ')}
                          fill="rgba(255, 215, 0, 0.2)"
                          stroke="rgba(255, 215, 0, 0.8)"
                          strokeWidth="0.3"
                        />
                      )}
                      {devPoints.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="0.6" fill="red" stroke="white" strokeWidth="0.15" />
                      ))}
                    </svg>
                  )}
                </div>
              </>
            )}
          </div>

          {/* DEV 面板 */}
          {devMode && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/90 text-white px-4 py-2 rounded shadow-lg text-xs font-mono">
              <div className="mb-2">🔧 點擊圖片建立座標 ({devPoints.length} 點)</div>
              <div className="flex gap-2">
                <button onClick={devUndo} disabled={devPoints.length === 0} className="px-2 py-1 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-600 rounded">↩ 復原</button>
                <button onClick={devClear} disabled={devPoints.length === 0} className="px-2 py-1 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 rounded">🗑 清除</button>
                <button onClick={devCopy} disabled={devPoints.length === 0} className="px-2 py-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 rounded">{devCopied ? '✓ 已複製' : '📋 複製 JSON'}</button>
              </div>
            </div>
          )}

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

          {gallery.id !== '1F-facilities' && (
            <Compass style={{ right: '8%', bottom: '5%', transform: 'translate(-50%, -50%)' }} />
          )}

          {/* 景觀空拍不顯示警語 */}
          {!gallery.label.includes('景觀空拍') && (
            <div
              className="absolute z-10 text-gray-100 text-micro text-right"
              style={{ right: '8rem', bottom: '2.5rem' }}
            >
              {gallery.id === 'B2F-lobby' && (
                <div>地下室置物櫃尺寸：50cm(寬)*45cm(深)*105cm(高)</div>
              )}
              <div>此為示意圖僅供參考，實際以施工為準</div>
            </div>
          )}

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

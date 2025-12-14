import React, { useState } from 'react';
import { UnitData } from '../types';
import { units } from '../data';
import Compass from './Compass';
import UnitIndicator from './UnitIndicator';

interface FurnitureSheetProps {
  isOpen: boolean;
  unit: UnitData | null;
  scale: number;
  floorId: string;
  onClose: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onSelectUnit: (unit: UnitData) => void;
  getFurnitureImage: () => string;
}

const FurnitureSheet: React.FC<FurnitureSheetProps> = ({
  isOpen,
  unit,
  scale,
  floorId,
  onClose,
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
  onSelectUnit,
  getFurnitureImage,
}) => {
  const [isVrOpen, setIsVrOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const vrUrl = unit?.getVrUrl?.(floorId) || null;

  const handleVrClick = () => {
    if (vrUrl) {
      setIsVrOpen(true);
    }
  };

  const closeVrViewer = () => {
    setIsVrOpen(false);
  };

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

  // 復原
  const handleResetAll = () => {
    setPosition({ x: 0, y: 0 });
    onReset();
  };

  // 縮放時重置位置
  React.useEffect(() => {
    if (scale === 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

  // 切換單位時重置位置
  React.useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [unit?.id]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-40 transition-transform duration-500 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ top: '80px' }}
    >
      {unit && (
        <>
          <div className="absolute top-0 left-0 z-10 bg-[#d4a853]/50 text-black px-6 py-4">
            <h3 className="font-bold text-center" style={{ fontSize: '1.75rem' }}>
              {unit.id}戶
            </h3>
            <p className="text-sm">傢俱配置參考圖</p>
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
            {vrUrl && (
              <button
                onClick={handleVrClick}
                className="w-10 h-10 bg-[#d4a853] shadow-md flex items-center justify-center hover:bg-[#c49843] transition-colors"
                aria-label="VR 實境"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 8a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4h-2l-2 2-2-2H7a4 4 0 01-4-4V8z" />
                  <circle cx="9" cy="11" r="2" />
                  <circle cx="15" cy="11" r="2" />
                </svg>
              </button>
            )}
          </div>

          <div
            className="w-full h-full flex items-center justify-center overflow-hidden p-8"
            style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={getFurnitureImage()}
              alt={`${unit.label} 傢俱配置圖`}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              }}
            />
          </div>

          <UnitIndicator
            units={units}
            selectedUnitId={unit.id}
            onSelectUnit={onSelectUnit}
          />

          <div
            className="absolute z-10 text-xs text-gray-400 text-right"
            style={{ right: '5rem', bottom: '1.5rem', maxWidth: '400px' }}
          >
            本圖僅提供傢俱配置參考，實際建築格局仍應依建築主管機關最終核定圖為準 ｜ 本戶傢配置參考圖由室內設計公司提供
          </div>

          <Compass style={{ right: '8%', bottom: '5%', transform: 'translate(-50%, -50%)' }} />

          {/* VR 燈箱 */}
          {isVrOpen && vrUrl && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
              <button
                onClick={closeVrViewer}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                aria-label="關閉 VR"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute top-4 left-4 z-10 bg-[#d4a853] text-white px-4 py-2">
                <span className="font-bold">{unit.id}戶</span>
                <span className="ml-2 text-sm">VR 實境</span>
              </div>
              <iframe
                src={vrUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                allowFullScreen
                title={`${unit.id}戶 VR 實境`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FurnitureSheet;

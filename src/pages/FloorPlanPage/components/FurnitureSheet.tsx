import React from 'react';
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
  onFullscreen,
  onSelectUnit,
  getFurnitureImage,
}) => {
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
              onClick={onFullscreen}
              className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="全螢幕"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
              </svg>
            </button>
          </div>

          <div className="w-full h-full flex items-center justify-center overflow-hidden p-8">
            <img
              src={getFurnitureImage()}
              alt={`${unit.label} 傢俱配置圖`}
              className="max-w-full max-h-full object-contain"
              style={{
                transform: `scale(${scale})`,
                transition: 'transform 0.3s ease-out',
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
        </>
      )}
    </div>
  );
};

export default FurnitureSheet;

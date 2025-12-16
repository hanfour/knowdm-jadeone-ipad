import React from 'react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  isZoomOutDisabled: boolean;
  isFullscreen: boolean;
  style?: React.CSSProperties;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
  isZoomOutDisabled,
  isFullscreen,
  style,
}) => {
  return (
    <div className="absolute z-20 flex flex-col gap-2" style={style}>
      <button
        onClick={onZoomIn}
        className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="放大"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <button
        onClick={onZoomOut}
        disabled={isZoomOutDisabled}
        className={`w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center transition-colors ${
          isZoomOutDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
        aria-label="縮小"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" />
        </svg>
      </button>
      <button
        onClick={onReset}
        className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="復原"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button
        onClick={onFullscreen}
        className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="全螢幕"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isFullscreen ? (
            <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3" />
          ) : (
            <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
          )}
        </svg>
      </button>
    </div>
  );
};

export default ZoomControls;

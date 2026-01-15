import React, { useEffect, useRef, useState } from 'react';
import CloseButton from '../../../components/CloseButton';

// Pannellum 需要動態載入
declare global {
  interface Window {
    pannellum: any;
  }
}

interface PanoramaViewerProps {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  floorLabel: string;
  onClose: () => void;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  isOpen,
  imageSrc,
  title,
  floorLabel,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    // 動態載入 pannellum
    const loadPannellum = async () => {
      if (!window.pannellum) {
        // 載入 CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
        document.head.appendChild(link);

        // 載入 JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
        script.async = true;

        await new Promise<void>((resolve, reject) => {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load pannellum'));
          document.head.appendChild(script);
        });
      }

      // 初始化 viewer
      if (containerRef.current && window.pannellum) {
        viewerRef.current = window.pannellum.viewer(containerRef.current, {
          type: 'equirectangular',
          panorama: imageSrc,
          autoLoad: true,
          autoRotate: -2, // 自動旋轉速度
          compass: false,
          showZoomCtrl: true,
          showFullscreenCtrl: true,
          mouseZoom: true,
          hfov: 100, // 初始水平視野
          minHfov: 50, // 最小水平視野 (最大放大)
          maxHfov: 120, // 最大水平視野 (最小放大)
          pitch: 0, // 初始垂直角度
          yaw: 0, // 初始水平角度
        });
        setIsLoaded(true);
      }
    };

    loadPannellum();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
      setIsLoaded(false);
    };
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes panoramaFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .panorama-fade-animation {
          animation: panoramaFadeIn 0.3s ease-out forwards;
        }
        .pnlm-container {
          background: #1a1a1a !important;
        }
        .pnlm-load-box {
          background: rgba(0,0,0,0.7) !important;
        }
        .pnlm-lbox {
          color: #d4a853 !important;
        }
        .pnlm-load-box p {
          color: #d4a853 !important;
        }
        .pnlm-zoom-controls {
          right: 100px !important;
          left: auto !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
        .pnlm-zoom-in, .pnlm-zoom-out {
          background: rgba(255,255,255,0.9) !important;
          border: 1px solid #ccc !important;
          width: 36px !important;
          height: 36px !important;
        }
        .pnlm-fullscreen-toggle-button {
          display: none !important;
        }
      `}</style>

      <div
        className="fixed inset-0 flex items-center justify-center bg-black/95 panorama-fade-animation"
        style={{ zIndex: 9999 }}
      >
        {/* 標題區 */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6">
          <div className="text-center">
            <p className="text-gold text-h4 tracking-wide-custom">{floorLabel}</p>
            <p className="text-white/70 text-small mt-1">{title}</p>
          </div>
        </div>

        {/* Pannellum 容器 */}
        <div
          ref={containerRef}
          className="w-full h-full"
          style={{ cursor: 'grab' }}
        />

        {/* 操作提示 */}
        {isLoaded && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-full">
            <p className="text-white/70 text-xsmall">拖曳旋轉 • 滾輪縮放</p>
          </div>
        )}

        {/* 載入中提示 */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gold text-small">載入環景中...</p>
            </div>
          </div>
        )}

        <CloseButton onClick={onClose} />
      </div>
    </>
  );
};

export default PanoramaViewer;

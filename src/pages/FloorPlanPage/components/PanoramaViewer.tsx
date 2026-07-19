import React, { useEffect, useRef, useState } from 'react';
import CloseButton from '../../../components/close-button';

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
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let isMounted = true;

    const loadPannellum = async () => {
      try {
        // 載入 Pannellum CSS
        if (!document.querySelector('link[href*="pannellum"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
          document.head.appendChild(link);
        }

        // 載入 Pannellum JS
        if (!(window as any).pannellum) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Pannellum 載入失敗'));
            document.head.appendChild(script);
          });
        }

        // 等待腳本初始化
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!isMounted || !containerRef.current) return;

        const pannellum = (window as any).pannellum;
        if (!pannellum) {
          throw new Error('Pannellum 未正確載入');
        }

        // 建立 viewer
        viewerRef.current = pannellum.viewer(containerRef.current, {
          type: 'equirectangular',
          panorama: imageSrc,
          autoLoad: true,
          autoRotate: -2,
          compass: false,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          mouseZoom: true,
          hfov: 100,
          minHfov: 50,
          maxHfov: 120,
          pitch: 0,
          yaw: 0,
        });

        // 監聽載入完成
        viewerRef.current.on('load', () => {
          if (isMounted) {
            setIsLoaded(true);
          }
        });

        // 監聯錯誤
        viewerRef.current.on('error', (err: any) => {
          console.error('Pannellum error:', err);
          if (isMounted) {
            setLoadError(true);
          }
        });

      } catch (error) {
        console.error('360 環景載入失敗:', error);
        if (isMounted) setLoadError(true);
      }
    };

    loadPannellum();

    return () => {
      isMounted = false;
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          // 忽略銷毀錯誤
        }
        viewerRef.current = null;
      }
      setIsLoaded(false);
      setLoadError(false);
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
        .pnlm-render-container {
          cursor: grab !important;
        }
        .pnlm-render-container:active {
          cursor: grabbing !important;
        }
        .pnlm-load-box {
          display: none !important;
        }
        .pnlm-about-msg {
          display: none !important;
        }
        .pnlm-error-msg {
          display: none !important;
        }
      `}</style>

      <div
        className="fixed inset-0 flex items-center justify-center bg-black/95 panorama-fade-animation"
        style={{ zIndex: 9999 }}
      >
        {/* 標題 */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6 pointer-events-none">
          <div className="text-center">
            <p className="text-gold text-large tracking-wide-custom">{floorLabel}</p>
            <p className="text-white/70 text-small mt-1">{title}</p>
          </div>
        </div>

        {/* Pannellum 容器 */}
        <div
          ref={containerRef}
          className="w-full h-full"
        />

        {/* 操作提示 */}
        {isLoaded && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-full pointer-events-none">
            <p className="text-white/70 text-xsmall">拖曳旋轉 • 滾輪縮放</p>
          </div>
        )}

        {/* 載入中 */}
        {!isLoaded && !loadError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gold text-small">載入環景中...</p>
            </div>
          </div>
        )}

        {/* 錯誤 */}
        {loadError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-red-400 text-small">載入失敗，請重試</p>
            </div>
          </div>
        )}

        <CloseButton onClick={onClose} />
      </div>
    </>
  );
};

export default PanoramaViewer;

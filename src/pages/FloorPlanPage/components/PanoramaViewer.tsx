import React, { useEffect, useRef, useState } from 'react';
import CloseButton from '../../../components/CloseButton';

// Photo Sphere Viewer 動態載入
declare global {
  interface Window {
    PhotoSphereViewer: any;
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
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    let isMounted = true;

    const loadPhotoSphereViewer = async () => {
      try {
        // 載入 Photo Sphere Viewer CSS
        if (!document.querySelector('link[href*="photo-sphere-viewer"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.min.css';
          document.head.appendChild(link);
        }

        // 載入 Three.js (Photo Sphere Viewer 依賴)
        if (!window.hasOwnProperty('THREE')) {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
          await new Promise<void>((resolve, reject) => {
            threeScript.onload = () => resolve();
            threeScript.onerror = () => reject(new Error('Failed to load Three.js'));
            document.head.appendChild(threeScript);
          });
        }

        // 載入 Photo Sphere Viewer
        if (!window.PhotoSphereViewer) {
          const psvScript = document.createElement('script');
          psvScript.src = 'https://cdn.jsdelivr.net/npm/@photo-sphere-viewer/core@5/index.min.js';
          await new Promise<void>((resolve, reject) => {
            psvScript.onload = () => resolve();
            psvScript.onerror = () => reject(new Error('Failed to load Photo Sphere Viewer'));
            document.head.appendChild(psvScript);
          });
        }

        // 等待一小段時間確保腳本完全載入
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!isMounted || !containerRef.current) return;

        // 初始化 viewer
        const Viewer = window.PhotoSphereViewer?.Viewer;
        if (Viewer) {
          viewerRef.current = new Viewer({
            container: containerRef.current,
            panorama: imageSrc,
            defaultZoomLvl: 50,
            minFov: 30,
            maxFov: 90,
            navbar: false,
            loadingTxt: '載入中...',
            touchmoveTwoFingers: false,
            mousewheelCtrlKey: false,
          });

          viewerRef.current.addEventListener('ready', () => {
            if (isMounted) {
              setIsLoaded(true);
              // 開始自動旋轉
              viewerRef.current.rotate({ longitude: '+0.001rad' });
            }
          });
        }
      } catch (error) {
        console.error('Failed to load Photo Sphere Viewer:', error);
        if (isMounted) setLoadError(true);
      }
    };

    loadPhotoSphereViewer();

    return () => {
      isMounted = false;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
      setIsLoaded(false);
      setLoadError(false);
    };
  }, [isOpen, imageSrc]);

  // 自動旋轉效果
  useEffect(() => {
    if (!isLoaded || !viewerRef.current) return;

    let animationId: number;
    let lastTime = 0;
    const rotateSpeed = 0.0003; // 旋轉速度

    const animate = (time: number) => {
      if (lastTime) {
        const delta = time - lastTime;
        const position = viewerRef.current.getPosition();
        viewerRef.current.rotate({
          longitude: position.longitude + rotateSpeed * delta,
          latitude: position.latitude,
        });
      }
      lastTime = time;
      animationId = requestAnimationFrame(animate);
    };

    // 延遲啟動自動旋轉
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 1000);

    // 使用者互動時暫停自動旋轉
    const handleInteraction = () => {
      cancelAnimationFrame(animationId);
      lastTime = 0;
      // 5秒後重新開始自動旋轉
      setTimeout(() => {
        if (viewerRef.current) {
          animationId = requestAnimationFrame(animate);
        }
      }, 5000);
    };

    const container = containerRef.current;
    container?.addEventListener('mousedown', handleInteraction);
    container?.addEventListener('touchstart', handleInteraction);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      container?.removeEventListener('mousedown', handleInteraction);
      container?.removeEventListener('touchstart', handleInteraction);
    };
  }, [isLoaded]);

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
        .psv-container {
          background: #1a1a1a !important;
        }
        .psv-loader {
          color: #d4a853 !important;
        }
        .psv-loader-container {
          background: rgba(0,0,0,0.7) !important;
        }
      `}</style>

      <div
        className="fixed inset-0 flex items-center justify-center bg-black/95 panorama-fade-animation"
        style={{ zIndex: 9999 }}
      >
        {/* 標題區 */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6 pointer-events-none">
          <div className="text-center">
            <p className="text-gold text-h4 tracking-wide-custom">{floorLabel}</p>
            <p className="text-white/70 text-small mt-1">{title}</p>
          </div>
        </div>

        {/* Photo Sphere Viewer 容器 */}
        <div
          ref={containerRef}
          className="w-full h-full"
          style={{ cursor: 'grab' }}
        />

        {/* 操作提示 */}
        {isLoaded && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-full pointer-events-none">
            <p className="text-white/70 text-xsmall">拖曳旋轉 • 滾輪縮放</p>
          </div>
        )}

        {/* 載入中提示 */}
        {!isLoaded && !loadError && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gold text-small">載入環景中...</p>
            </div>
          </div>
        )}

        {/* 錯誤提示 */}
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

import React, { useEffect, useRef, useState } from 'react';
import CloseButton from './close-button';

interface SocketDesignSVGProps {
  className?: string;
}

const SocketDesignSVG: React.FC<SocketDesignSVGProps> = ({ className = '' }) => {
  const objectRef = useRef<HTMLObjectElement>(null);
  const lightboxObjectRef = useRef<HTMLObjectElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const applyAnimation = (svgDoc: Document | null) => {
    if (!svgDoc) return;

    // 定義要動畫的群組和延遲時間（秒）
    const groups = [
      { id: 'origin', delay: 0 },
      { id: 'light-blue', delay: 0.3 },
      { id: 'blue', delay: 0.6 },
      { id: 'ac', delay: 0.9 },
    ];

    // 為每個群組添加動畫樣式
    groups.forEach(({ id, delay }) => {
      const group = svgDoc.getElementById(id);
      if (group) {
        group.style.opacity = '0';
        group.style.animation = `fadeIn 0.6s ease-out ${delay}s forwards`;
      }
    });

    // 添加 keyframes 到 SVG 的 style 標籤
    const styleElement = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.textContent = `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    svgDoc.querySelector('defs')?.appendChild(styleElement);
  };

  useEffect(() => {
    const handleLoad = () => {
      if (!objectRef.current) return;
      const svgDoc = objectRef.current.contentDocument;
      applyAnimation(svgDoc);
    };

    const obj = objectRef.current;
    if (obj) {
      obj.addEventListener('load', handleLoad);
    }

    return () => {
      if (obj) {
        obj.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleLightboxLoad = () => {
      if (!lightboxObjectRef.current) return;
      const svgDoc = lightboxObjectRef.current.contentDocument;
      applyAnimation(svgDoc);
    };

    const obj = lightboxObjectRef.current;
    if (obj) {
      obj.addEventListener('load', handleLightboxLoad);
    }

    return () => {
      if (obj) {
        obj.removeEventListener('load', handleLightboxLoad);
      }
    };
  }, [isLightboxOpen]);

  // 縮放時重置位置
  useEffect(() => {
    if (scale === 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

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

  // 縮放控制
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // 關閉燈箱時重置狀態
  const handleClose = () => {
    setIsLightboxOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className={`bg-white/80 p-8 flex items-center justify-center cursor-pointer hover:bg-white/90 transition-colors ${className}`}
        onClick={() => setIsLightboxOpen(true)}
      >
        <object
          ref={objectRef}
          data="/images/thoughtful/socket-design.svg"
          type="image/svg+xml"
          className="w-full h-full pointer-events-none"
          style={{ maxHeight: '70vh' }}
          aria-label="插座設計示意圖"
        />
      </div>

      {/* 燈箱 - 從底部滑入 */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-[60] transition-transform duration-500 ease-out ${
          isLightboxOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ top: '80px' }}
      >
        {/* 標題 */}
        <div className="absolute z-20 bg-gold-deep/50 text-black px-6 py-4">
          <h3 className="font-bold text-h1 text-center leading-none">插座設計</h3>
          <p className="mt-1 text-center text-xsmall">電氣規劃示意圖</p>
        </div>

        {/* 關閉按鈕 */}
        <CloseButton onClick={handleClose} />

        {/* 縮放控制按鈕 */}
        <div
          className="absolute z-10 flex flex-col gap-2"
          style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
        >
          <button
            onClick={handleZoomIn}
            disabled={scale >= 3}
            className={`w-10 h-10 bg-white shadow-md flex items-center justify-center transition-colors ${
              scale >= 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            aria-label="放大"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
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
            onClick={handleReset}
            className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="復原"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* SVG 圖片顯示區域 */}
        <div
          className="w-full h-full flex items-center justify-center overflow-hidden p-8"
          style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <object
            ref={lightboxObjectRef}
            data="/images/thoughtful/socket-design.svg"
            type="image/svg+xml"
            className="select-none"
            style={{
              width: '80%',
              height: '80%',
              maxHeight: 'calc(100vh - 200px)',
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              pointerEvents: 'none',
            }}
            aria-label="插座設計示意圖（放大）"
          />
        </div>

        {/* 警語 */}
        <div
          className="absolute z-10 text-text-light text-micro"
          style={{ right: '5rem', bottom: '0.5rem' }}
        >
          此為示意圖僅供參考，實際以施工為準
        </div>
      </div>
    </>
  );
};

export default SocketDesignSVG;

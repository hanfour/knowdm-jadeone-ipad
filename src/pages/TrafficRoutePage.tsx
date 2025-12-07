import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullscreenMenu from '../components/FullscreenMenu';
import { safeSessionStorage, STORAGE_KEYS } from '../utils/storage';

// 頁籤資料 - 四個交通類別
const categories = [
  {
    id: 'highway1',
    name: '國道一號',
    image: '/images/a6/國道一號.webp',
  },
  {
    id: 'highway74',
    name: '快速道路',
    image: '/images/a6/台74線快速道路.webp',
  },
  {
    id: 'airport',
    name: '國際機場',
    image: '/images/a6/台中國際機場.webp',
  },
  {
    id: 'mrt',
    name: '捷運路線',
    image: '/images/a6/捷運路線圖.webp',
  },
];

const TrafficRoutePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  // 是否可拖拉（放大超過1或全螢幕時）
  const canDrag = scale > 1 || isFullscreen;

  // 縮放控制
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    if (scale <= 1) return; // 最小為原尺寸
    const newScale = Math.max(scale - 0.2, 1);
    setScale(newScale);
    // 如果縮小到1，重置位置
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  // 是否可縮小（大於原尺寸時才能縮小）
  const canZoomOut = scale > 1;

  // 拖拉開始
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canDrag) return;
    e.preventDefault();
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  // 拖拉中
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !canDrag) return;
    e.preventDefault();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  // 拖拉結束
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 全螢幕切換
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 監聽全螢幕變化
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 關閉按鈕：清除 sessionStorage 並回到首頁（播放開場動畫）
  const handleClose = () => {
    safeSessionStorage.removeItem(STORAGE_KEYS.HAS_PLAYED_INTRO);
    navigate('/');
  };

  // 點擊頁籤
  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      // 再次點擊取消選擇
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#f5f0e6]">
      {/* 整體背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/a5/background.webp)' }}
      />

      {/* 內容圖層容器 - 靠左對齊、100%高度、可縮放、可拖拉 */}
      <div
        ref={mapRef}
        className={`absolute left-0 top-0 bottom-0 origin-top-left ${isDragging ? '' : 'transition-transform duration-300'} ${canDrag ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          aspectRatio: '1366 / 768',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* 背景圖（地圖） */}
        <img
          src="/images/a6/背景圖.webp"
          alt="交通動線地圖"
          className="absolute inset-0 w-full h-full object-contain object-left transition-all duration-500"
          style={{
            filter: activeCategory ? 'grayscale(100%)' : 'grayscale(0%)',
            opacity: activeCategory ? 0.3 : 1,
          }}
        />

        {/* 圖層疊加區域 - 四個類別的圖片 */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="absolute inset-0 transition-all duration-500 pointer-events-none"
            style={{
              filter:
                activeCategory && activeCategory !== category.id
                  ? 'grayscale(100%)'
                  : 'grayscale(0%)',
              opacity:
                activeCategory && activeCategory !== category.id ? 0.3 : 1,
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-contain object-left"
            />
          </div>
        ))}

        {/* 最上層圖示 */}
        <img
          src="/images/a6/最上層圖示.webp"
          alt="圖示"
          className="absolute inset-0 w-full h-full object-contain object-left pointer-events-none"
          style={{
            filter: activeCategory ? 'grayscale(100%)' : 'grayscale(0%)',
            opacity: activeCategory ? 0.3 : 1,
          }}
        />

        {/* 聚碩仁玉 - 建案插畫（呼吸燈效果） */}
        <img
          src="/images/a6/聚碩仁玉.png"
          alt="聚碩仁玉"
          className="absolute inset-0 w-full h-full object-contain object-left pointer-events-none animate-breathing"
        />

        {/* 大標 - 地圖右上角 */}
        <div
          className="absolute z-20"
          style={{ top: '4rem', right: '16rem' }}
        >
          <img
            src="/images/a6/大標.svg"
            alt="交通動線圖"
            style={{ height: '3rem', width: 'auto' }}
          />
        </div>
      </div>

      {/* Logo - 左上 */}
      <div
        className="absolute z-20"
        style={{ top: '2rem', left: '2rem' }}
      >
        <Link to="/" className="block">
          <img
            src="/images/logo-gold.svg"
            alt="聚碩仁玉"
            style={{ height: '5rem', width: 'auto' }}
          />
        </Link>
      </div>

      {/* 關閉按鈕 - 右上 */}
      <button
        onClick={handleClose}
        className="absolute z-20 text-[#68583f] opacity-60 hover:opacity-100 active:opacity-100 transition-opacity"
        style={{ top: '2rem', right: '2rem' }}
        aria-label="返回首頁並播放開場動畫"
      >
        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* MENU 按鈕 - 左側 */}
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-1/2 -translate-y-1/2 z-20 text-[#68583f] flex flex-col items-center hover:opacity-70 active:opacity-70 transition-opacity"
        style={{ left: '2rem', gap: '1rem' }}
        aria-label="開啟主選單"
      >
        <div className="flex flex-col" style={{ gap: '0.375rem' }} aria-hidden="true">
          <div className="bg-[#68583f]" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-[#68583f]" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-[#68583f]" style={{ width: '1.75rem', height: '0.125rem' }} />
        </div>
        <div className="writing-mode-vertical" style={{ fontSize: '0.75rem', letterSpacing: '0.3em' }}>MENU</div>
      </button>

      {/* 頁籤按鈕 - 右側垂直置中 */}
      <div
        className="absolute z-20 top-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{ right: '3rem', gap: '0.75rem' }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-6 py-1 rounded-full border-2 transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-[#68583f] text-white border-[#68583f]'
                : activeCategory === null
                ? 'bg-white/80 text-[#68583f] border-[#68583f]/30 hover:border-[#68583f] hover:text-white hover:bg-[#68583f]'
                : 'bg-white/50 text-[#68583f]/50 border-[#68583f]/20'
            }`}
            style={{ fontSize: '0.875rem', letterSpacing: '0.05em' }}
          >
            {category.name}
          </button>
        ))}

        {/* 縮放與全螢幕控制按鈕 */}
        <div className="flex items-center" style={{ gap: '0.5rem', marginTop: '1rem' }}>
          {/* 縮小按鈕 */}
          <button
            onClick={handleZoomOut}
            disabled={!canZoomOut}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              canZoomOut
                ? 'border-[#68583f]/30 bg-white/80 text-[#68583f] hover:bg-[#68583f] hover:text-white hover:border-[#68583f] cursor-pointer'
                : 'border-[#68583f]/10 bg-white/40 text-[#68583f]/30 cursor-not-allowed'
            }`}
            aria-label="縮小"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* 放大按鈕 */}
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-full border-2 border-[#68583f]/30 bg-white/80 text-[#68583f] flex items-center justify-center hover:bg-[#68583f] hover:text-white hover:border-[#68583f] transition-all duration-300"
            aria-label="放大"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* 全螢幕按鈕 */}
          <button
            onClick={handleFullscreen}
            className="w-8 h-8 rounded-full border-2 border-[#68583f]/30 bg-white/80 text-[#68583f] flex items-center justify-center hover:bg-[#68583f] hover:text-white hover:border-[#68583f] transition-all duration-300"
            aria-label={isFullscreen ? '退出全螢幕' : '全螢幕'}
          >
            {isFullscreen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>

          {/* 重置位置按鈕 - 只在可拖拉時顯示 */}
          {canDrag && (position.x !== 0 || position.y !== 0) && (
            <button
              onClick={() => setPosition({ x: 0, y: 0 })}
              className="w-8 h-8 rounded-full border-2 border-[#68583f]/30 bg-white/80 text-[#68583f] flex items-center justify-center hover:bg-[#68583f] hover:text-white hover:border-[#68583f] transition-all duration-300"
              aria-label="重置位置"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 全屏選單 */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* 呼吸燈動畫 CSS */}
      <style>{`
        @keyframes breathing {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(243, 207, 154, 0.4)) drop-shadow(0 0 16px rgba(243, 207, 154, 0.2));
            opacity: 1;
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(243, 207, 154, 0.8)) drop-shadow(0 0 40px rgba(243, 207, 154, 0.4));
            opacity: 0.95;
          }
        }

        .animate-breathing {
          animation: breathing 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TrafficRoutePage;

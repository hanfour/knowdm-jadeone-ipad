import React, { useState } from 'react';
// import PageHeader from '../components/PageHeader';
import SubpageMenuBar from '../components/SubpageMenuBar';

// 頁籤資料
const categories = [
  {
    id: 'leisure',
    name: '休閒購物',
    images: [
      '/images/a5/休閒購物/中清商圈.png',
      '/images/a5/休閒購物/中科商圈.png',
      '/images/a5/休閒購物/中部科學園區餐飲.png',
      '/images/a5/休閒購物/市場.png',
      '/images/a5/休閒購物/逢甲商圈.png',
    ],
  },
  {
    id: 'development',
    name: '建設發展',
    images: ['/images/a5/建設發展/建設發展.png'],
  },
  {
    id: 'education',
    name: '書香校園',
    images: ['/images/a5/書香校園/學校.png'],
  },
  {
    id: 'industry',
    name: '產業園區',
    images: ['/images/a5/產業園區/中部科學園區.png'],
  },
];

// 燈箱圖片配置
const lightboxImages: Record<string, string[]> = {
  // 休閒購物
  '中清商圈': [
    '/images/a5/燈箱/_0000_中清商圈.jpg',
    '/images/a5/燈箱/_0001_中清商圈.jpg',
  ],
  '中科商圈': [
    '/images/a5/燈箱/_0002_中科商圈.jpg',
    '/images/a5/燈箱/_0003_中科商圈.jpg',
  ],
  '逢甲商圈': [
    '/images/a5/燈箱/_0004_逢甲商圈.jpg',
    '/images/a5/燈箱/_0005_逢甲商圈.jpg',
  ],
  // 建設發展
  '綠美圖': [
    '/images/a5/燈箱/未命名-1_0004_綠美圖.jpg',
  ],
  '水湳轉運站': [
    '/images/a5/燈箱/未命名-1_0002_水湳轉運中心.jpg',
  ],
  '流行影音中心': [
    '/images/a5/燈箱/未命名-1_0003_流行影音中心.jpg',
  ],
  '國際會議展覽中心': [
    '/images/a5/燈箱/未命名-1_0005_會展中心.jpg',
  ],
  // 產業園區
  '中部科學園區': [
    '/images/a5/燈箱/未命名-1_0000_中科.jpg',
    '/images/a5/燈箱/未命名-1_0001_中科.jpg',
  ],
  // 書香校園
  '中國醫藥大學': [
    '/images/a5/燈箱/_0000_中國醫藥大學02.jpg',
  ],
  '僑光科技大學': [
    '/images/a5/燈箱/_0003_僑光科大02.jpg',
  ],
  '逢甲大學': [
    '/images/a5/燈箱/_0002_逢甲大學01.jpg',
  ],
  '西屯小學': [
    '/images/a5/燈箱/_0001_西屯國小01.jpg',
  ],
};

const LifeFunctionPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; images: string[]; currentIndex: number }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });
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

  // 點擊頁籤
  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory === categoryId) {
      // 再次點擊取消選擇
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  // 燈箱控制
  const openLightbox = (areaId: string) => {
    const images = lightboxImages[areaId];
    if (images && images.length > 0) {
      setLightbox({ isOpen: true, images, currentIndex: 0 });
    }
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, images: [], currentIndex: 0 });
  };

  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  // 判斷點是否在多邊形內（射線法）
  const isPointInPolygon = (x: number, y: number, polygon: { x: number; y: number }[]) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x, yi = polygon[i].y;
      const xj = polygon[j].x, yj = polygon[j].y;
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    return inside;
  };

  // 點擊區域定義（多邊形，以百分比表示）
  const clickableAreas = [
    // 休閒購物類別
    {
      id: '中清商圈',
      category: 'leisure',
      polygon: [
        { x: 53.9, y: 35.65 }, { x: 60.84, y: 29.28 }, { x: 65.31, y: 38.44 },
        { x: 69.94, y: 44.94 }, { x: 65.76, y: 52.1 }, { x: 60.84, y: 58.07 },
        { x: 56.88, y: 61.39 }, { x: 57.26, y: 57.54 }, { x: 57.63, y: 53.56 },
        { x: 57.41, y: 48.39 }, { x: 56.66, y: 43.61 }, { x: 55.69, y: 39.76 },
      ]
    },
    {
      id: '中科商圈',
      category: 'leisure',
      polygon: [
        { x: 17.27, y: 36.18 }, { x: 15.33, y: 37.11 }, { x: 13.92, y: 38.44 },
        { x: 12.87, y: 40.29 }, { x: 11.75, y: 42.55 }, { x: 10.78, y: 44.81 },
        { x: 10.34, y: 49.05 }, { x: 10.48, y: 51.71 }, { x: 10.86, y: 54.23 },
        { x: 11.75, y: 57.01 }, { x: 13.24, y: 58.47 }, { x: 15.18, y: 57.94 },
        { x: 16.15, y: 56.35 }, { x: 17.35, y: 53.56 }, { x: 18.69, y: 50.78 },
        { x: 19.73, y: 47.99 }, { x: 21.38, y: 45.73 }, { x: 21.9, y: 44.28 },
        { x: 21.75, y: 41.62 }, { x: 21.38, y: 38.84 }, { x: 20.18, y: 36.85 },
        { x: 19.14, y: 36.05 },
      ]
    },
    {
      id: '逢甲商圈',
      category: 'leisure',
      polygon: [
        { x: 26.08, y: 59 }, { x: 31, y: 58.34 }, { x: 34.95, y: 58.87 },
        { x: 36.22, y: 60.46 }, { x: 36.37, y: 66.83 }, { x: 36.37, y: 74.66 },
        { x: 36.44, y: 78.77 }, { x: 36.59, y: 86.86 }, { x: 31.67, y: 87.13 },
        { x: 23.39, y: 86.86 }, { x: 17.5, y: 86.86 }, { x: 19.59, y: 77.18 },
        { x: 21.3, y: 71.47 }, { x: 22.79, y: 67.89 }, { x: 24.36, y: 62.98 },
      ]
    },
    // 建設發展類別
    {
      id: '綠美圖',
      category: 'development',
      polygon: [
        { x: 48.83, y: 39.5 }, { x: 48.75, y: 42.02 }, { x: 49.95, y: 41.75 },
        { x: 50.54, y: 42.42 }, { x: 51.66, y: 42.15 }, { x: 52.41, y: 42.42 },
        { x: 53.45, y: 41.75 }, { x: 54.2, y: 42.15 }, { x: 54.65, y: 41.62 },
        { x: 54.5, y: 40.56 }, { x: 54.94, y: 40.29 }, { x: 54.94, y: 38.04 },
        { x: 53.68, y: 37.51 }, { x: 51.59, y: 37.51 },
      ]
    },
    {
      id: '水湳轉運站',
      category: 'development',
      polygon: [
        { x: 48.98, y: 29.81 }, { x: 51.81, y: 28.49 }, { x: 52.11, y: 27.16 },
        { x: 51.51, y: 24.77 }, { x: 48.98, y: 23.84 }, { x: 46.51, y: 24.9 },
        { x: 46.07, y: 26.1 }, { x: 46.07, y: 27.43 },
      ]
    },
    {
      id: '流行影音中心',
      category: 'development',
      polygon: [
        { x: 52.63, y: 68.16 }, { x: 54.35, y: 68.16 }, { x: 55.24, y: 69.62 },
        { x: 59.79, y: 70.41 }, { x: 60.61, y: 71.61 }, { x: 60.31, y: 74.26 },
        { x: 58.9, y: 75.45 }, { x: 56.96, y: 73.07 }, { x: 55.84, y: 73.2 },
        { x: 54.05, y: 73.07 }, { x: 52.78, y: 71.61 },
      ]
    },
    {
      id: '國際會議展覽中心',
      category: 'development',
      polygon: [
        { x: 39.95, y: 37.38 }, { x: 42.19, y: 37.11 }, { x: 43.31, y: 37.91 },
        { x: 43.53, y: 39.5 }, { x: 43.98, y: 39.23 }, { x: 43.61, y: 36.98 },
        { x: 44.13, y: 36.45 }, { x: 48.53, y: 36.98 }, { x: 50.39, y: 36.31 },
        { x: 50.17, y: 34.32 }, { x: 48.6, y: 32.47 }, { x: 46.96, y: 32.6 },
        { x: 45.32, y: 32.33 }, { x: 44.05, y: 33 }, { x: 42.19, y: 33 },
        { x: 40.77, y: 32.2 }, { x: 41.14, y: 34.59 }, { x: 40.84, y: 35.65 },
      ]
    },
    // 產業園區類別
    {
      id: '中部科學園區',
      category: 'industry',
      polygon: [
        { x: 30.48, y: 5.53 }, { x: 28.16, y: 7.26 }, { x: 23.24, y: 10.84 },
        { x: 23.32, y: 14.16 }, { x: 21.23, y: 17.87 }, { x: 21.15, y: 19.73 },
        { x: 24.21, y: 21.06 }, { x: 26.22, y: 19.6 }, { x: 26, y: 22.65 },
        { x: 26.82, y: 26.5 }, { x: 28.16, y: 27.82 }, { x: 30.03, y: 28.22 },
        { x: 32.04, y: 27.69 }, { x: 33.53, y: 26.23 }, { x: 35.4, y: 25.17 },
        { x: 38.08, y: 23.84 }, { x: 40.1, y: 23.18 }, { x: 42.49, y: 21.32 },
        { x: 43.53, y: 20 }, { x: 44.57, y: 16.41 }, { x: 44.28, y: 14.02 },
        { x: 43.38, y: 12.17 }, { x: 42.19, y: 10.97 }, { x: 41.59, y: 9.51 },
        { x: 39.05, y: 7.26 }, { x: 37.71, y: 7.39 }, { x: 35.77, y: 8.58 },
        { x: 34.36, y: 6.73 },
      ]
    },
    // 書香校園類別
    {
      id: '中國醫藥大學',
      category: 'education',
      polygon: [
        { x: 58.67, y: 81.29 }, { x: 56.88, y: 82.75 }, { x: 56.73, y: 84.87 },
        { x: 56.73, y: 85.94 }, { x: 60.69, y: 86.07 },
      ]
    },
    {
      id: '僑光科技大學',
      category: 'education',
      polygon: [
        { x: 37.04, y: 46.66 }, { x: 35.03, y: 49.98 },
        { x: 35.1, y: 51.17 }, { x: 38.91, y: 50.91 },
      ]
    },
    {
      id: '逢甲大學',
      category: 'education',
      polygon: [
        { x: 31.37, y: 68.82 }, { x: 31.37, y: 72.14 },
        { x: 33.98, y: 72.14 }, { x: 33.01, y: 67.36 },
      ]
    },
    {
      id: '西屯小學',
      category: 'education',
      polygon: [
        { x: 23.76, y: 69.88 }, { x: 23.54, y: 71.61 },
        { x: 27.49, y: 71.74 }, { x: 27.49, y: 70.01 },
      ]
    },
  ];

  // 處理地圖點擊
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();

    // 計算點擊位置相對於容器的百分比
    // rect 已經是經過 transform 後的實際尺寸，所以直接計算即可
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // 也用繪製工具的方式計算（基於目標元素）
    const targetElement = document.querySelector('[data-map-container]');
    let drawerX = 0, drawerY = 0;
    if (targetElement) {
      const targetRect = targetElement.getBoundingClientRect();
      drawerX = ((e.clientX - targetRect.left) / targetRect.width) * 100;
      drawerY = ((e.clientY - targetRect.top) / targetRect.height) * 100;
    }

    console.log(`[地圖點擊] x=${x.toFixed(2)}%, y=${y.toFixed(2)}% | 目前類別: ${activeCategory || '無'}`);

    // 檢查是否點擊到商圈區域
    for (const area of clickableAreas) {
      // 只在對應類別被選中時才能點擊
      if (activeCategory !== area.category) continue;
      if (area.polygon.length === 0) continue;

      const isInside = isPointInPolygon(x, y, area.polygon);
      console.log(`  檢查 ${area.id}: ${isInside ? '✓ 在區域內' : '✗ 不在區域內'}`);

      if (isInside) {
        console.log(`[點擊成功] ${area.id}`, {
          position: { x: x.toFixed(2), y: y.toFixed(2) },
          timestamp: new Date().toISOString()
        });
        // 打開燈箱
        openLightbox(area.id);
        return;
      }
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#f5f0e6]">
      {/* 整體背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/a5/background.webp)', top: '80px' }}
      />

      {/* 內容圖層容器 - 靠左對齊、100%高度、可縮放、可拖拉 */}
      <div
        ref={mapRef}
        data-map-container
        className={`absolute left-0 bottom-0 origin-top-left ${isDragging ? '' : 'transition-transform duration-300'} ${canDrag ? 'cursor-grab' : ''} ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{
          top: '80px',
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
        onClick={handleMapClick}
      >
        {/* 背景圖（地圖） */}
        <img
          src="/images/a5/背景圖.webp"
          alt="生活機能地圖"
          className="absolute inset-0 w-full h-full object-contain object-left transition-all duration-500"
          style={{
            filter: activeCategory ? 'grayscale(100%)' : 'grayscale(0%)',
            opacity: activeCategory ? 0.3 : 1,
          }}
        />

        {/* 水波漣漪效果層 - 在圖層下方顯示 */}
        {activeCategory && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
              </filter>
              <filter id="glow-blur-medium" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
              </filter>
              <filter id="glow-blur-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
              </filter>
            </defs>

            {/* 水波漣漪效果 - 由內而外擴散 */}
            {clickableAreas
              .filter(area => area.category === activeCategory)
              .map((area) => (
                <g key={area.id}>
                  {/* 第5波 - 最外層，最淡 */}
                  <polygon
                    points={area.polygon.map(p => `${p.x},${p.y}`).join(' ')}
                    className="animate-ripple-5"
                    fill="rgba(218, 165, 32, 0.2)"
                    stroke="none"
                    filter="url(#glow-blur-strong)"
                  />
                  {/* 第4波 */}
                  <polygon
                    points={area.polygon.map(p => `${p.x},${p.y}`).join(' ')}
                    className="animate-ripple-4"
                    fill="rgba(218, 165, 32, 0.125)"
                    stroke="none"
                    filter="url(#glow-blur-strong)"
                  />
                  {/* 第3波 */}
                  <polygon
                    points={area.polygon.map(p => `${p.x},${p.y}`).join(' ')}
                    className="animate-ripple-3"
                    fill="rgba(218, 165, 32, 0.25)"
                    stroke="none"
                    filter="url(#glow-blur-medium)"
                  />
                  {/* 第2波 */}
                  <polygon
                    points={area.polygon.map(p => `${p.x},${p.y}`).join(' ')}
                    className="animate-ripple-2"
                    fill="rgba(218, 165, 32, 0.5)"
                    stroke="none"
                    filter="url(#glow-blur-soft)"
                  />
                  {/* 第1波 - 最內層，最亮 */}
                  <polygon
                    points={area.polygon.map(p => `${p.x},${p.y}`).join(' ')}
                    className="animate-ripple-1"
                    fill="rgba(218, 165, 32, 0.7)"
                    stroke="none"
                    filter="url(#glow-blur-soft)"
                  />
                </g>
              ))}
          </svg>
        )}

        {/* 圖層疊加區域 - 四個類別的圖片 */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="absolute inset-0 transition-all duration-500 pointer-events-none"
            style={{
              zIndex: 2,
              filter:
                activeCategory && activeCategory !== category.id
                  ? 'grayscale(100%)'
                  : 'grayscale(0%)',
              opacity:
                activeCategory && activeCategory !== category.id ? 0.3 : 1,
            }}
          >
            {category.images.map((imageSrc, idx) => (
              <img
                key={idx}
                src={imageSrc}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-contain object-left"
              />
            ))}
          </div>
        ))}

        {/* 聚碩仁玉 - 建案插畫（呼吸燈效果） */}
        <img
          src="/images/a5/聚碩仁玉.png"
          alt="聚碩仁玉"
          className="absolute inset-0 w-full h-full object-contain object-left pointer-events-none animate-breathing"
        />

        {/* 樹木群 */}
        <img
          src="/images/a5/樹木群.png"
          alt="聚碩仁玉"
          className="absolute inset-0 w-full h-full object-contain object-left pointer-events-none"
          style={{
            filter: activeCategory ? 'grayscale(100%)' : 'grayscale(0%)',
            opacity: activeCategory ? 0.3 : 1,
          }}
        />

        {/* 大標 - 地圖右上角 */}
        <div
          className="absolute z-20 !hidden"
          style={{ top: '4rem', right: '16rem' }}
        >
          <img
            src="/images/a5/大標.svg"
            alt="生活機能圖"
            style={{ height: '3rem', width: 'auto' }}
          />
        </div>
      </div>

      {/* 頁面 Header */}
      {/* <PageHeader theme="gold" /> */}

      {/* 右上角子頁面導航列 + MenuButton */}
      <SubpageMenuBar sectionIndex={0} />

      {/* 頁籤按鈕 - 右側垂直置中 */}
      <div
        className="absolute z-20 top-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{ right: '6rem', gap: '0.75rem' }}
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

      {/* 水波漣漪動畫 CSS */}
      <style>{`
        @keyframes breathing {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(243, 207, 154, 0.05)) drop-shadow(0 0 16px rgba(243, 207, 154, 0.1));
            opacity: 0.9;
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(243, 207, 154, 0.4)) drop-shadow(0 0 52px rgba(243, 207, 154, 0.8));
            opacity: 1;
          }
        }

        .animate-breathing {
          animation: breathing 3s ease-in-out infinite;
        }

        /* 水波漣漪動畫 - 滑順的呼吸脈動效果 */
        @keyframes ripple-pulse {
          0%, 100% {
            opacity: 0.025;
            transform: scale(0.92);
          }
          50% {
            opacity: 0.375;
            transform: scale(1.02);
          }
        }

        /* 所有波紋使用相同的滑順動畫，但不同相位 */
        .animate-ripple-1 {
          animation: ripple-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-origin: center;
          transform-box: fill-box;
        }

        .animate-ripple-2 {
          animation: ripple-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-origin: center;
          transform-box: fill-box;
          animation-delay: -0.6s;
        }

        .animate-ripple-3 {
          animation: ripple-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-origin: center;
          transform-box: fill-box;
          animation-delay: -1.2s;
        }

        .animate-ripple-4 {
          animation: ripple-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-origin: center;
          transform-box: fill-box;
          animation-delay: -1.8s;
        }

        .animate-ripple-5 {
          animation: ripple-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          transform-origin: center;
          transform-box: fill-box;
          animation-delay: -2.4s;
        }
      `}</style>

      {/* 燈箱 - z-index 設為 9999 確保高於所有選單 */}
      {lightbox.isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90"
          style={{ zIndex: 9999 }}
          onClick={closeLightbox}
        >
          {/* 圖片容器 - 100% 寬高 */}
          <div
            className="relative w-full h-full flex items-center justify-center p-0 pointer-events-none"
          >
            <img
              src={lightbox.images[lightbox.currentIndex]}
              alt="燈箱圖片"
              className="w-full h-full object-contain pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* 關閉按鈕 - 獨立於圖片容器外 */}
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 background-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300"
            style={{ zIndex: 10 }}
            aria-label="關閉"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* 上一張按鈕 */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              style={{ zIndex: 10 }}
              aria-label="上一張"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* 下一張按鈕 */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              style={{ zIndex: 10 }}
              aria-label="下一張"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* 圖片計數器 */}
          {lightbox.images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm"
              style={{ zIndex: 10 }}
            >
              {lightbox.currentIndex + 1} / {lightbox.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LifeFunctionPage;

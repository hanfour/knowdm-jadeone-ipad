import React, { useState, useRef, useEffect, useCallback } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

// ⚠️ 開發模式開關 - 點擊圖片顯示座標，正式上線時設為 false
const DEV_MODE = false;

// 樓層資料配置
interface FloorData {
  id: string;
  label: string;
  image: string | null;
  markers?: MarkerData[];
  galleryButtons?: GalleryButtonData[]; // 公設/景觀照片按鈕
}

interface MarkerData {
  id: string;
  unitId: string;
  x: number; // 百分比位置
  y: number;
  label: string;
}

interface GalleryButtonData {
  id: string;
  label: string;
  images: { src: string; label: string }[];
}

interface UnitData {
  id: string;
  label: string;
  getImage: (floor: string) => string;
  position: { row: number; col: number }; // 在位置圖中的位置
}

// 戶別資料
const units: UnitData[] = [
  { id: 'A', label: 'A戶', getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/A-2F.jpg' : '/images/c2/furniture-layouts/A-3~11.jpg', position: { row: 2, col: 0 } },
  { id: 'B', label: 'B戶', getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/B-2F.jpg' : '/images/c2/furniture-layouts/B-3~11.jpg', position: { row: 1, col: 0 } },
  { id: 'C', label: 'C戶', getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/C-2F.jpg' : '/images/c2/furniture-layouts/C-3~11.jpg', position: { row: 1, col: 1 } },
  { id: 'D', label: 'D戶', getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/D-2F.jpg' : '/images/c2/furniture-layouts/D-3~11.jpg', position: { row: 1, col: 2 } },
];

// 樓層資料
const floors: FloorData[] = [
  { id: 'RF', label: 'RF', image: null },
  { id: '11F', label: '11F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '11F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '11F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '11F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '11F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '10F', label: '10F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '10F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '10F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '10F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '10F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '9F', label: '9F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '9F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '9F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '9F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '9F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '8F', label: '8F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '8F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '8F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '8F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '8F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '7F', label: '7F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '7F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '7F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '7F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '7F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '6F', label: '6F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '6F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '6F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '6F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '6F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '5F', label: '5F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '5F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '5F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '5F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '5F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '4F', label: '4F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '4F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '4F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '4F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '4F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '3F', label: '3F', image: '/images/c2/floor-plans/3-11F.png', markers: [
    { id: '3F-A', unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
    { id: '3F-B', unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
    { id: '3F-C', unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
    { id: '3F-D', unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' }
  ]},
  { id: '2F', label: '2F', image: '/images/c2/floor-plans/2F.png', markers: [
    { id: '2F-A', unitId: 'A', x: 27.85, y: 39.59, label: 'A戶' },
    { id: '2F-B', unitId: 'B', x: 39.21, y: 57.83, label: 'B戶' },
    { id: '2F-C', unitId: 'C', x: 46.49, y: 57.83, label: 'C戶' },
    { id: '2F-D', unitId: 'D', x: 58.02, y: 39.33, label: 'D戶' }
  ]},
  { id: '1F', label: '1F', image: '/images/c2/floor-plans/1F.png', galleryButtons: [
    { id: '1F-garden', label: '戶外園藝區', images: [{ src: 'https://picsum.photos/1920/1080?random=101', label: '戶外園藝區' }] },
    { id: '1F-spa', label: 'SPA池', images: [{ src: 'https://picsum.photos/1920/1080?random=102', label: 'SPA池' }] },
    { id: '1F-pool', label: '室內溫水泳池', images: [{ src: 'https://picsum.photos/1920/1080?random=103', label: '室內溫水泳池' }] },
    { id: '1F-sauna', label: '蒸氣室及烤箱', images: [{ src: 'https://picsum.photos/1920/1080?random=104', label: '蒸氣室及烤箱' }] },
    { id: '1F-lobby', label: 'LOBBY', images: [{ src: 'https://picsum.photos/1920/1080?random=105', label: 'LOBBY' }] },
    { id: '1F-entrance', label: '入口水池', images: [{ src: 'https://picsum.photos/1920/1080?random=106', label: '入口水池' }] },
  ]},
  { id: 'B1F', label: 'B1F', image: '/images/c2/floor-plans/B1.png' },
  { id: 'B2F', label: 'B2F', image: '/images/c2/floor-plans/B2.png' },
  { id: 'B3F', label: 'B3F', image: '/images/c2/floor-plans/B3.png' },
];

const FloorPlanPage: React.FC = () => {
  // 當前選擇的樓層
  const [selectedFloor, setSelectedFloor] = useState<FloorData>(floors.find(f => f.id === '1F')!);

  // 縮放和平移狀態（預設 1.5 倍）
  const [scale, setScale] = useState(1.5);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 全螢幕狀態
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 開發模式 - 點擊座標
  const [clickedCoords, setClickedCoords] = useState<{ x: number; y: number } | null>(null);

  // 底部面板狀態（傢俱配置圖）
  const [bottomSheet, setBottomSheet] = useState<{
    isOpen: boolean;
    unit: UnitData | null;
    scale: number;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    unit: null,
    scale: 1,
    position: { x: 0, y: 0 },
  });

  // 圖庫查看器狀態（公設/景觀照片）
  const [galleryViewer, setGalleryViewer] = useState<{
    isOpen: boolean;
    gallery: GalleryButtonData | null;
    currentIndex: number;
    scale: number;
  }>({
    isOpen: false,
    gallery: null,
    currentIndex: 0,
    scale: 1,
  });

  // 縮放控制
  const handleZoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.25, 1));
  }, []);

  // 全螢幕切換
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // 監聽全螢幕變化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 拖曳開始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  // 拖曳中
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // 拖曳結束
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 重置位置當縮放為 1
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale]);

  // 切換樓層時重置縮放（保持預設 2.8 倍）
  useEffect(() => {
    setScale(2.8);
    setPosition({ x: 0, y: 60 });
  }, [selectedFloor]);

  // 打開底部面板
  const openBottomSheet = (marker: MarkerData) => {
    const unit = units.find(u => u.id === marker.unitId);
    if (unit) {
      setBottomSheet({
        isOpen: true,
        unit,
        scale: 1,
        position: { x: 0, y: 0 },
      });
    }
  };

  // 關閉底部面板
  const closeBottomSheet = () => {
    setBottomSheet(prev => ({ ...prev, isOpen: false }));
  };

  // 開發模式 - 點擊圖片獲取座標
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!DEV_MODE || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const coords = { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) };
    setClickedCoords(coords);

    // 複製到剪貼板
    const coordStr = `{ id: '${selectedFloor.id}-X', unitId: 'X', x: ${coords.x}, y: ${coords.y}, label: 'X' }`;
    navigator.clipboard.writeText(coordStr);
    console.log('座標已複製:', coordStr);
  };

  // 底部面板縮放
  const handleSheetZoomIn = () => {
    setBottomSheet(prev => ({ ...prev, scale: Math.min(prev.scale + 0.25, 3) }));
  };

  const handleSheetZoomOut = () => {
    setBottomSheet(prev => ({ ...prev, scale: Math.max(prev.scale - 0.25, 1) }));
  };

  // 獲取傢俱配置圖
  const getFurnitureImage = () => {
    if (!bottomSheet.unit) return '';
    const floorNum = parseInt(selectedFloor.id.replace('F', ''));
    if (floorNum === 2) {
      return bottomSheet.unit.getImage('2F');
    }
    return bottomSheet.unit.getImage('3-11F');
  };

  // 開啟圖庫查看器
  const openGalleryViewer = (gallery: GalleryButtonData) => {
    setGalleryViewer({
      isOpen: true,
      gallery,
      currentIndex: 0,
      scale: 1,
    });
  };

  // 關閉圖庫查看器
  const closeGalleryViewer = () => {
    setGalleryViewer(prev => ({ ...prev, isOpen: false }));
  };

  // 圖庫縮放
  const handleGalleryZoomIn = () => {
    setGalleryViewer(prev => ({ ...prev, scale: Math.min(prev.scale + 0.25, 3) }));
  };

  const handleGalleryZoomOut = () => {
    setGalleryViewer(prev => ({ ...prev, scale: Math.max(prev.scale - 0.25, 1) }));
  };

  // 圖庫切換
  const nextGalleryImage = () => {
    if (!galleryViewer.gallery) return;
    setGalleryViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.gallery!.images.length,
    }));
  };

  const prevGalleryImage = () => {
    if (!galleryViewer.gallery) return;
    setGalleryViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.gallery!.images.length) % prev.gallery!.images.length,
    }));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#f5f5f5]"
    >
      {/* 右上角子頁面導航列 */}
      <SubpageMenuBar sectionIndex={3} />

      {/* 左上角旗幟 */}
      <div
        className="absolute z-20 bg-[#d4a853]/50 text-black"
        style={{
          top: '80px',
          left: 0,
          padding: '1.5rem 2rem',
          minWidth: '120px',
        }}
      >
        <p className="font-bold text-center" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
          {selectedFloor.label}
        </p>
        <p className="mt-1" style={{ fontSize: '0.85rem' }}>
          平面配置參考圖
        </p>
      </div>

      {/* 右側樓層選擇器 */}
      <div
        className="absolute z-20 flex flex-col bg-white/90 backdrop-blur-sm shadow-lg"
        style={{
          top: '80px',
          right: 0,
          height: 'calc(100% - 80px)',
          width: '80px',
        }}
      >
        <div className="flex-1 overflow-y-auto">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => floor.image && setSelectedFloor(floor)}
              disabled={!floor.image}
              className={`w-full py-3 text-center transition-all ${
                selectedFloor.id === floor.id
                  ? 'bg-[#f5e6b8] text-black font-bold'
                  : floor.image
                  ? 'hover:bg-gray-100 text-gray-700'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              style={{ fontSize: '0.9rem' }}
            >
              {floor.label}
            </button>
          ))}
        </div>
      </div>

      {/* 縮放控制按鈕 */}
      <div
        className="absolute z-20 flex flex-col gap-2"
        style={{ right: '100px', top: '50%', transform: 'translateY(-50%)' }}
      >
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="放大"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className={`w-10 h-10 bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center transition-colors ${
            scale <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
          aria-label="縮小"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </button>
        <button
          onClick={toggleFullscreen}
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

      {/* 主要平面圖區域 */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{
          top: '80px',
          right: '80px',
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {selectedFloor.image ? (
          <div
            className="relative"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            <img
              ref={imageRef}
              src={selectedFloor.image}
              alt={`${selectedFloor.label} 平面圖`}
              className="select-none"
              style={{ width: '500px', height: 'auto', cursor: DEV_MODE ? 'crosshair' : undefined }}
              draggable={false}
              onClick={handleImageClick}
            />

            {/* 標記點 */}
            {selectedFloor.markers?.map((marker) => (
              <button
                key={marker.id}
                onClick={(e) => {
                  e.stopPropagation();
                  openBottomSheet(marker);
                }}
                className="absolute w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-[#FFD700]/50"
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-label={`查看 ${marker.label} 戶`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-lg">此樓層無平面圖</div>
        )}
      </div>

      {/* 左下角圖例 */}
      <div
        className="!hidden absolute z-10 text-xs text-gray-500"
        style={{ left: '1.5rem', bottom: '1.5rem' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-3 bg-[#f5f0c4] border border-gray-300" />
          <span>空調主機設置位置示意(店舖A)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-3 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#999_2px,#999_4px)]" />
          <span>捷運設施範圍</span>
        </div>
      </div>

      {/* 左下角指北針 */}
      <div
        className="absolute z-10"
        style={{ left: '1.5rem', bottom: '1.5rem' }}
      >
        <div className="w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center relative bg-white/80">
          <span className="absolute -top-5 text-xs text-gray-500 font-medium">N</span>
          <div className="w-px h-7 bg-gray-400 transform -translate-y-1" />
          <div className="absolute top-1.5 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-transparent border-b-gray-600" />
        </div>
      </div>

      {/* 右下角提示文字 */}
      <div
        className="absolute z-10 text-xs text-gray-400"
        style={{ right: '100px', bottom: '1.5rem' }}
      >
        本圖面僅供參考，實際以合約圖面為準
      </div>

      {/* 左下角公設/景觀按鈕列表 */}
      {selectedFloor.galleryButtons && selectedFloor.galleryButtons.length > 0 && (
        <div
          className="absolute z-20 flex flex-col gap-2"
          style={{ left: '5%', bottom: '15%' }}
        >
          {selectedFloor.galleryButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => openGalleryViewer(btn)}
              className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
              style={{ minWidth: '140px' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* 開發模式 - 座標顯示面板 */}
      {DEV_MODE && (
        <div
          className="absolute z-30 bg-black/80 text-white p-4 rounded-lg shadow-lg"
          style={{ left: '1.5rem', top: '200px', minWidth: '280px' }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-yellow-400">🔧 開發模式</h4>
            <span className="text-xs text-gray-400">點擊圖片獲取座標</span>
          </div>
          <div className="text-sm space-y-1">
            <p>樓層: <span className="text-cyan-400">{selectedFloor.id}</span></p>
            {clickedCoords ? (
              <>
                <p>X: <span className="text-green-400 font-mono">{clickedCoords.x}%</span></p>
                <p>Y: <span className="text-green-400 font-mono">{clickedCoords.y}%</span></p>
                <div className="mt-2 p-2 bg-gray-900 rounded text-xs font-mono break-all">
                  {`{ id: '${selectedFloor.id}-X', unitId: 'X', x: ${clickedCoords.x}, y: ${clickedCoords.y}, label: 'X' }`}
                </div>
                <p className="text-xs text-gray-400 mt-1">✓ 已複製到剪貼板</p>
              </>
            ) : (
              <p className="text-gray-400">點擊平面圖任意位置...</p>
            )}
          </div>
        </div>
      )}

      {/* 底部面板 - 傢俱配置圖 */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-40 transition-transform duration-500 ease-out ${
          bottomSheet.isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ top: '80px' }}
      >
        {bottomSheet.unit && (
          <>
            {/* 面板標題列 */}
            <div className="absolute top-0 left-0 z-10 bg-[#d4a853]/50 text-black px-6 py-4">
              <h3 className="font-bold text-center" style={{ fontSize: '1.75rem' }}>
                {bottomSheet.unit.id}戶
              </h3>
              <p className="text-sm">傢俱配置參考圖</p>
            </div>

            {/* 關閉按鈕 */}
            <button
              onClick={closeBottomSheet}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              aria-label="關閉"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* 縮放控制 */}
            <div
              className="absolute z-10 flex flex-col gap-2"
              style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              <button
                onClick={handleSheetZoomIn}
                className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="放大"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button
                onClick={handleSheetZoomOut}
                disabled={bottomSheet.scale <= 1}
                className={`w-10 h-10 bg-white shadow-md flex items-center justify-center transition-colors ${
                  bottomSheet.scale <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
                aria-label="縮小"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="全螢幕"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
              </button>
            </div>

            {/* 傢俱配置圖 */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden p-8">
              <img
                src={getFurnitureImage()}
                alt={`${bottomSheet.unit.label} 傢俱配置圖`}
                className="max-w-full max-h-full object-contain"
                style={{
                  transform: `scale(${bottomSheet.scale})`,
                  transition: 'transform 0.3s ease-out',
                }}
              />
            </div>

            {/* 左下角位置指示圖 - 對應實際平面圖標點位置，可點擊切換 */}
            <div
              className="absolute z-10 bg-white p-3 shadow-lg"
              style={{ left: '1.5rem', bottom: '1.5rem' }}
            >
              {/* 上排：A 和 D（左右兩側） */}
              <div className="flex justify-between mb-1" style={{ width: '80px' }}>
                {['A', 'D'].map((unitId) => {
                  const unit = units.find(u => u.id === unitId);
                  return (
                    <button
                      key={unitId}
                      onClick={() => unit && setBottomSheet(prev => ({ ...prev, unit, scale: 1 }))}
                      className={`w-6 h-6 flex items-center justify-center text-xs font-medium border transition-all hover:scale-110 ${
                        bottomSheet.unit?.id === unitId
                          ? 'bg-[#f5e6b8] border-[#d4a853]'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {unitId}
                    </button>
                  );
                })}
              </div>
              {/* 下排：B 和 C（置中） */}
              <div className="flex justify-center gap-1" style={{ width: '80px' }}>
                {['B', 'C'].map((unitId) => {
                  const unit = units.find(u => u.id === unitId);
                  return (
                    <button
                      key={unitId}
                      onClick={() => unit && setBottomSheet(prev => ({ ...prev, unit, scale: 1 }))}
                      className={`w-6 h-6 flex items-center justify-center text-xs font-medium border transition-all hover:scale-110 ${
                        bottomSheet.unit?.id === unitId
                          ? 'bg-[#f5e6b8] border-[#d4a853]'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {unitId}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 右下角提示文字 */}
            <div
              className="absolute z-10 text-xs text-gray-400 text-right"
              style={{ right: '5rem', bottom: '1.5rem', maxWidth: '400px' }}
            >
              本圖僅提供傢俱配置參考，實際建築格局仍應依建築主管機關最終核定圖為準 ｜ 本戶傢配置參考圖由室內設計公司提供
            </div>

            {/* 指北針 */}
            <div
              className="absolute z-10"
              style={{ right: '5rem', bottom: '4rem' }}
            >
              <div className="w-10 h-10 border border-gray-400 rounded-full flex items-center justify-center relative">
                <span className="absolute -top-4 text-xs text-gray-500">N</span>
                <div className="w-px h-6 bg-gray-400 transform -translate-y-1" />
                <div className="absolute top-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-600" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* 圖庫查看器面板 - 公設/景觀照片 */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white shadow-2xl z-40 transition-transform duration-500 ease-out ${
          galleryViewer.isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ top: '80px' }}
      >
        {galleryViewer.gallery && (
          <>
            {/* 面板標題列 */}
            <div className="absolute top-0 left-0 z-10 bg-[#f5e6b8] text-black px-6 py-4">
              <h3 className="font-bold" style={{ fontSize: '1.75rem' }}>
                {selectedFloor.label}
              </h3>
              <p className="text-sm" style={{ color: '#c41e3a' }}>全區平面圖</p>
            </div>

            {/* 關閉按鈕 */}
            <button
              onClick={closeGalleryViewer}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              aria-label="關閉"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* 縮放控制 */}
            <div
              className="absolute z-10 flex flex-col gap-2"
              style={{ right: '2rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              <button
                onClick={handleGalleryZoomIn}
                className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="放大"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button
                onClick={handleGalleryZoomOut}
                disabled={galleryViewer.scale <= 1}
                className={`w-10 h-10 bg-white shadow-md flex items-center justify-center transition-colors ${
                  galleryViewer.scale <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                }`}
                aria-label="縮小"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="全螢幕"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
              </button>
            </div>

            {/* 圖庫照片 */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden p-8">
              {galleryViewer.gallery.images.length > 0 && (
                <img
                  src={galleryViewer.gallery.images[galleryViewer.currentIndex].src}
                  alt={galleryViewer.gallery.images[galleryViewer.currentIndex].label}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: `scale(${galleryViewer.scale})`,
                    transition: 'transform 0.3s ease-out',
                  }}
                />
              )}
            </div>

            {/* 左右切換按鈕（多張圖片時顯示） */}
            {galleryViewer.gallery.images.length > 1 && (
              <>
                <button
                  onClick={prevGalleryImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                  aria-label="上一張"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextGalleryImage}
                  className="absolute right-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
                  aria-label="下一張"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            {/* 左下角指北針 */}
            <div
              className="absolute z-10"
              style={{ left: '1.5rem', bottom: '1.5rem' }}
            >
              <div className="w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center relative bg-white/80">
                <span className="absolute -top-5 text-xs text-gray-500 font-medium">N</span>
                <div className="w-px h-7 bg-gray-400 transform -translate-y-1" />
                <div className="absolute top-1.5 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px] border-transparent border-b-gray-600" />
              </div>
            </div>

            {/* 右下角提示文字 */}
            <div
              className="absolute z-10 text-xs text-gray-400 text-right"
              style={{ right: '5rem', bottom: '1.5rem', maxWidth: '400px' }}
            >
              本圖面僅供參考，實際以合約圖面為準
            </div>

            {/* 圖片計數器（多張圖片時顯示） */}
            {galleryViewer.gallery.images.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm"
              >
                {galleryViewer.currentIndex + 1} / {galleryViewer.gallery.images.length}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FloorPlanPage;

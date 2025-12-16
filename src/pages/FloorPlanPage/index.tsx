import React, { useState, useRef, useEffect, useCallback } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';
import { FloorData, SubFloorData, MarkerData, GalleryButtonData, AnchorPoint, UnitData, BottomSheetState, GalleryViewerState } from './types';
import { floors, floorDefaults, units } from './data';
import { floorPlanStyles } from './styles';
import Compass from './components/Compass';
import ZoomControls from './components/ZoomControls';
import FloorSelector from './components/FloorSelector';
import DevPanel from './components/DevPanel';
import FurnitureSheet from './components/FurnitureSheet';
import GalleryViewer from './components/GalleryViewer';

// 開發模式開關
const DEV_MODE = false;

const FloorPlanPage: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState<FloorData>(floors.find(f => f.id === '1F')!);
  const [selectedSubFloor, setSelectedSubFloor] = useState<SubFloorData | null>(null);
  const [scale, setScale] = useState(floorDefaults['1F'].scale);
  const [position, setPosition] = useState({ x: floorDefaults['1F'].x, y: floorDefaults['1F'].y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 開發模式狀態
  const [anchorPoints, setAnchorPoints] = useState<AnchorPoint[]>([]);
  const [clickedCoords, setClickedCoords] = useState<{ x: number; y: number } | null>(null);

  // 面板狀態
  const [bottomSheet, setBottomSheet] = useState<BottomSheetState>({
    isOpen: false, unit: null, scale: 1, position: { x: 0, y: 0 },
  });
  const [galleryViewer, setGalleryViewer] = useState<GalleryViewerState>({
    isOpen: false, gallery: null, currentIndex: 0, scale: 1,
  });

  // 縮放控制
  const handleZoomIn = useCallback(() => setScale(prev => Math.min(prev + 0.5, 8)), []);
  const handleZoomOut = useCallback(() => setScale(prev => Math.max(prev - 0.5, 1)), []);
  const handleReset = useCallback(() => {
    const defaults = floorDefaults[selectedFloor.id] || { x: 0, y: 0, scale: 2.5 };
    setScale(defaults.scale);
    setPosition({ x: defaults.x, y: defaults.y });
  }, [selectedFloor.id]);

  // 全螢幕
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // 拖曳
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

  useEffect(() => { if (scale === 1) setPosition({ x: 0, y: 0 }); }, [scale]);

  // 樓層切換
  useEffect(() => {
    const defaults = floorDefaults[selectedFloor.id] || { x: 0, y: 0, scale: 2.5 };
    setScale(defaults.scale);
    setPosition({ x: defaults.x, y: defaults.y });
    if (selectedFloor.subFloors?.length) {
      setSelectedSubFloor(selectedFloor.subFloors[0]);
    } else {
      setSelectedSubFloor(null);
    }
  }, [selectedFloor]);

  // 底部面板
  const openBottomSheet = (marker: MarkerData) => {
    const unit = units.find(u => u.id === marker.unitId);
    if (unit) setBottomSheet({ isOpen: true, unit, scale: 1, position: { x: 0, y: 0 } });
  };
  const closeBottomSheet = () => setBottomSheet(prev => ({ ...prev, isOpen: false }));
  const handleSheetZoomIn = () => setBottomSheet(prev => ({ ...prev, scale: Math.min(prev.scale + 0.5, 8) }));
  const handleSheetZoomOut = () => setBottomSheet(prev => ({ ...prev, scale: Math.max(prev.scale - 0.5, 1) }));
  const handleSheetReset = () => setBottomSheet(prev => ({ ...prev, scale: 1 }));
  const getFurnitureImage = () => {
    if (!bottomSheet.unit) return '';
    const floorNum = parseInt(selectedFloor.id.replace('F', ''));
    return floorNum === 2 ? bottomSheet.unit.getImage('2F') : bottomSheet.unit.getImage('3-11F');
  };

  // 圖庫查看器
  const openGalleryViewer = (gallery: GalleryButtonData) => {
    const isAerial = gallery.id.includes('-east') || gallery.id.includes('-south') || gallery.id.includes('-west') || gallery.id.includes('-north');
    setGalleryViewer({ isOpen: true, gallery, currentIndex: 0, scale: isAerial ? 1.325 : 1 });
  };
  const closeGalleryViewer = () => setGalleryViewer(prev => ({ ...prev, isOpen: false }));
  const handleGalleryZoomIn = () => setGalleryViewer(prev => ({ ...prev, scale: Math.min(prev.scale + 0.5, 8) }));
  const handleGalleryZoomOut = () => setGalleryViewer(prev => ({ ...prev, scale: Math.max(prev.scale - 0.5, 1) }));
  const handleGalleryReset = () => {
    const isAerial = galleryViewer.gallery?.id.includes('-east') || galleryViewer.gallery?.id.includes('-south') || galleryViewer.gallery?.id.includes('-west') || galleryViewer.gallery?.id.includes('-north');
    setGalleryViewer(prev => ({ ...prev, scale: isAerial ? 1.325 : 1 }));
  };
  const nextGalleryImage = () => {
    if (!galleryViewer.gallery) return;
    setGalleryViewer(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.gallery!.images.length }));
  };
  const prevGalleryImage = () => {
    if (!galleryViewer.gallery) return;
    setGalleryViewer(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.gallery!.images.length) % prev.gallery!.images.length }));
  };

  // 開發模式
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!DEV_MODE || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const coords = {
      x: parseFloat((((e.clientX - rect.left) / rect.width) * 100).toFixed(2)),
      y: parseFloat((((e.clientY - rect.top) / rect.height) * 100).toFixed(2)),
    };
    setClickedCoords(coords);
    setAnchorPoints(prev => [...prev, coords]);
  };
  const clearAnchorPoints = () => { setAnchorPoints([]); setClickedCoords(null); };
  const undoLastPoint = () => setAnchorPoints(prev => prev.slice(0, -1));
  const copyAllPoints = () => navigator.clipboard.writeText(JSON.stringify(anchorPoints, null, 2));
  const copyAsPolygon = () => navigator.clipboard.writeText(`polygon(${anchorPoints.map(p => `${p.x}% ${p.y}%`).join(', ')})`);

  const currentImage = selectedSubFloor?.image || selectedFloor.image;

  // 合併樓層與子層的 galleryButtons（子層優先）
  const activeGalleryButtons = [
    ...(selectedSubFloor?.galleryButtons || []),
    ...(selectedFloor.galleryButtons || []),
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#f5f5f5]">
      <style>{floorPlanStyles}</style>
      <SubpageMenuBar sectionIndex={3} />

      {/* 左上角旗幟 */}
      <div className="absolute z-20 bg-[#d4a853]/50 text-black px-6 py-4" style={{ top: '80px', left: 0 }}>
        <p className="font-bold text-center" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
          {selectedFloor.id === 'RF' ? 'RF' : selectedFloor.label}
        </p>
        <p className="mt-1 text-center" style={{ fontSize: '0.85rem' }}>
          {selectedSubFloor ? `${selectedSubFloor.label}平面圖` : '平面配置參考圖'}
        </p>
      </div>

      <FloorSelector floors={floors} selectedFloor={selectedFloor} onSelectFloor={setSelectedFloor} />
      <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} onFullscreen={toggleFullscreen} isZoomOutDisabled={scale <= 1} isFullscreen={isFullscreen} style={{ right: '100px', top: '50%', transform: 'translateY(-50%)' }} />

      {/* 主要平面圖區域 */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{ top: '80px', right: '80px', cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {currentImage ? (
          <div className="relative" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}>
            <img
              ref={imageRef}
              src={currentImage}
              alt={`${selectedSubFloor?.label || selectedFloor.label} 平面圖`}
              className="select-none"
              style={{ width: '500px', height: 'auto', cursor: DEV_MODE ? 'crosshair' : undefined }}
              draggable={false}
              onClick={handleImageClick}
            />

            {/* 開發模式錨點視覺化 */}
            {DEV_MODE && anchorPoints.length > 0 && (
              <>
                <svg className="absolute inset-0 pointer-events-none" style={{ width: '500px', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  {anchorPoints.length >= 3 && <polygon points={anchorPoints.map(p => `${p.x},${p.y}`).join(' ')} fill="rgba(255, 215, 0, 0.2)" stroke="rgba(255, 215, 0, 0.8)" strokeWidth="0.3" />}
                  {anchorPoints.length >= 2 && anchorPoints.map((point, i) => i > 0 && (
                    <line key={i} x1={anchorPoints[i-1].x} y1={anchorPoints[i-1].y} x2={point.x} y2={point.y} stroke="rgba(255, 215, 0, 0.4)" strokeWidth="0.3" strokeDasharray="1,0.5" />
                  ))}
                </svg>
                {anchorPoints.map((point, i) => (
                  <div key={i} className="absolute w-1 h-1 bg-red-500/80 rounded-full shadow-lg pointer-events-none" style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)', zIndex: 50 }}>
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-1 rounded whitespace-nowrap">{i + 1}</span>
                  </div>
                ))}
              </>
            )}

            {/* 區域高亮 */}
            {activeGalleryButtons.filter(btn => btn.region?.length).map(btn => (
              <svg key={btn.id} className="absolute inset-0 pointer-events-none" style={{ width: '500px', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon
                  points={btn.region!.map(p => `${p.x},${p.y}`).join(' ')}
                  className={btn.noHighlight ? 'cursor-pointer pointer-events-auto' : 'region-highlight pointer-events-auto'}
                  fill={btn.noHighlight ? 'transparent' : undefined}
                  stroke={btn.noHighlight ? 'transparent' : 'rgba(255, 215, 0, 0.1)'}
                  strokeWidth="0.3"
                  onClick={() => openGalleryViewer(btn)}
                />
              </svg>
            ))}

            {/* 標記點 */}
            {selectedFloor.markers?.map(marker => (
              <button
                key={marker.id}
                onClick={(e) => { e.stopPropagation(); openBottomSheet(marker); }}
                className="absolute w-4 h-4 bg-[#FFD700] rounded-full flex items-center justify-center hover:scale-125 transition-transform marker-glow marker-ring"
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: 'translate(-50%, -50%)' }}
                aria-label={`查看 ${marker.label}`}
              >
                <span className="text-[0.4rem] font-bold text-black/80">{marker.unitId}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-lg">此樓層無平面圖</div>
        )}
      </div>

      <Compass style={{ right: '8%', bottom: '5%', transform: 'translate(-50%, -50%)' }} className="z-20" />

      <div className="absolute z-10 text-gray-400" style={{ fontSize: '0.75rem', right: '5rem', bottom: '0.5rem' }}>
        此為示意圖僅供參考，實際以施工為準
      </div>

      {/* 子層切換按鈕 */}
      {selectedFloor.subFloors?.length && (
        <div className="absolute z-20 flex gap-1" style={{ left: '5%', top: '25%' }}>
          {selectedFloor.subFloors.map(sub => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubFloor(sub)}
              className={`px-4 py-2 transition-all ${selectedSubFloor?.id === sub.id ? 'bg-[#d4a853] text-white' : 'bg-white/90 text-gray-700 hover:bg-gray-100'}`}
              style={{ fontSize: '0.85rem' }}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      {/* 公設/景觀按鈕 */}
      {activeGalleryButtons.filter(btn => !btn.region?.length).length > 0 && (
        <div className="absolute z-20 flex flex-col gap-2" style={{ left: '5%', bottom: '10%' }}>
          {activeGalleryButtons.filter(btn => !btn.region?.length).map(btn => (
            <button
              key={btn.id}
              onClick={() => openGalleryViewer(btn)}
              className="px-4 py-2 backdrop-blur-sm border transition-all shadow-sm bg-white/90 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              style={{ fontSize: '0.85rem' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {DEV_MODE && (
        <DevPanel
          floorId={selectedFloor.id}
          anchorPoints={anchorPoints}
          clickedCoords={clickedCoords}
          onUndo={undoLastPoint}
          onClear={clearAnchorPoints}
          onCopyJson={copyAllPoints}
          onCopyPolygon={copyAsPolygon}
        />
      )}

      <FurnitureSheet
        isOpen={bottomSheet.isOpen}
        unit={bottomSheet.unit}
        scale={bottomSheet.scale}
        floorId={selectedFloor.id}
        onClose={closeBottomSheet}
        onZoomIn={handleSheetZoomIn}
        onZoomOut={handleSheetZoomOut}
        onReset={handleSheetReset}
        onFullscreen={toggleFullscreen}
        onSelectUnit={(unit) => setBottomSheet(prev => ({ ...prev, unit, scale: 1 }))}
        getFurnitureImage={getFurnitureImage}
      />

      <GalleryViewer
        isOpen={galleryViewer.isOpen}
        gallery={galleryViewer.gallery}
        currentIndex={galleryViewer.currentIndex}
        scale={galleryViewer.scale}
        floorLabel={selectedFloor.label}
        onClose={closeGalleryViewer}
        onZoomIn={handleGalleryZoomIn}
        onZoomOut={handleGalleryZoomOut}
        onReset={handleGalleryReset}
        onFullscreen={toggleFullscreen}
        onPrev={prevGalleryImage}
        onNext={nextGalleryImage}
      />
    </div>
  );
};

export default FloorPlanPage;

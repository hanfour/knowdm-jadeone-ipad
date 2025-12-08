import React, { useState, useCallback, useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Polygon {
  id: string;
  points: Point[];
  name: string;
  color: string;
}

interface PolygonDrawerProps {
  /** 是否啟用繪製工具 */
  enabled?: boolean;
  /** 容器的基準寬度（用於計算百分比座標） */
  baseWidth?: number;
  /** 容器的基準高度（用於計算百分比座標） */
  baseHeight?: number;
  /** 是否輸出百分比座標（預設 true） */
  usePercentage?: boolean;
  /** 目標容器的 CSS 選擇器（例如：'[data-map-container]'），用於精確對齊座標 */
  targetSelector?: string;
}

const COLORS = [
  'rgba(255, 0, 0, 0.6)',
  'rgba(0, 255, 0, 0.6)',
  'rgba(0, 0, 255, 0.6)',
  'rgba(255, 255, 0, 0.6)',
  'rgba(255, 0, 255, 0.6)',
  'rgba(0, 255, 255, 0.6)',
  'rgba(255, 128, 0, 0.6)',
  'rgba(128, 0, 255, 0.6)',
];

/**
 * 開發用多邊形繪製工具
 *
 * 使用方式：
 * 1. 點擊畫布添加頂點
 * 2. 雙擊或按 Enter 完成當前多邊形
 * 3. 按 Escape 取消當前繪製
 * 4. 按 Z 撤銷最後一個頂點
 * 5. 點擊「複製座標」按鈕取得 JSON 格式的座標
 *
 * ⚠️ 此組件僅供開發使用，正式上線時請移除或關閉
 */
const PolygonDrawer: React.FC<PolygonDrawerProps> = ({
  enabled = true,
  baseWidth = 1920,
  baseHeight = 1080,
  usePercentage = true,
  targetSelector,
}) => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [mousePosition, setMousePosition] = useState<Point | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [polygonName, setPolygonName] = useState('');
  const [copied, setCopied] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 更新目標元素的位置資訊
  useEffect(() => {
    if (!targetSelector) return;

    const updateTargetRect = () => {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        setTargetRect(targetElement.getBoundingClientRect());
      }
    };

    updateTargetRect();
    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect);

    // 使用 ResizeObserver 監聽目標元素大小變化
    const targetElement = document.querySelector(targetSelector);
    let resizeObserver: ResizeObserver | null = null;
    if (targetElement) {
      resizeObserver = new ResizeObserver(updateTargetRect);
      resizeObserver.observe(targetElement);
    }

    return () => {
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
      resizeObserver?.disconnect();
    };
  }, [targetSelector]);

  const getRelativePosition = useCallback((e: React.MouseEvent): Point => {
    // 如果有指定目標選擇器，直接查詢目標元素的即時位置
    if (targetSelector) {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (usePercentage) {
          return {
            x: Number(((x / rect.width) * 100).toFixed(2)),
            y: Number(((y / rect.height) * 100).toFixed(2)),
          };
        }

        return {
          x: Number(((x / rect.width) * baseWidth).toFixed(0)),
          y: Number(((y / rect.height) * baseHeight).toFixed(0)),
        };
      }
    }

    // 沒有目標選擇器時，使用容器自身的位置
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (usePercentage) {
      return {
        x: Number(((x / rect.width) * 100).toFixed(2)),
        y: Number(((y / rect.height) * 100).toFixed(2)),
      };
    }

    return {
      x: Number(((x / rect.width) * baseWidth).toFixed(0)),
      y: Number(((y / rect.height) * baseHeight).toFixed(0)),
    };
  }, [baseWidth, baseHeight, usePercentage, targetSelector]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!enabled) return;

    const point = getRelativePosition(e);
    setCurrentPoints(prev => [...prev, point]);
    setIsDrawing(true);
  }, [enabled, getRelativePosition]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!enabled || currentPoints.length < 3) return;

    // 完成多邊形
    const newPolygon: Polygon = {
      id: `polygon-${Date.now()}`,
      points: currentPoints,
      name: polygonName || `區域 ${polygons.length + 1}`,
      color: COLORS[polygons.length % COLORS.length],
    };

    setPolygons(prev => [...prev, newPolygon]);
    setCurrentPoints([]);
    setIsDrawing(false);
    setPolygonName('');
  }, [enabled, currentPoints, polygons.length, polygonName]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enabled) return;
    setMousePosition(getRelativePosition(e));
  }, [enabled, getRelativePosition]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;

    switch (e.key) {
      case 'Escape':
        // 取消當前繪製
        setCurrentPoints([]);
        setIsDrawing(false);
        break;
      case 'Enter':
        // 完成多邊形
        if (currentPoints.length >= 3) {
          const newPolygon: Polygon = {
            id: `polygon-${Date.now()}`,
            points: currentPoints,
            name: polygonName || `區域 ${polygons.length + 1}`,
            color: COLORS[polygons.length % COLORS.length],
          };
          setPolygons(prev => [...prev, newPolygon]);
          setCurrentPoints([]);
          setIsDrawing(false);
          setPolygonName('');
        }
        break;
      case 'z':
      case 'Z':
        if (e.ctrlKey || e.metaKey) {
          // Ctrl+Z 撤銷最後一個頂點
          setCurrentPoints(prev => prev.slice(0, -1));
          if (currentPoints.length <= 1) {
            setIsDrawing(false);
          }
        }
        break;
    }
  }, [enabled, currentPoints, polygons.length, polygonName]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const deletePolygon = (id: string) => {
    setPolygons(prev => prev.filter(p => p.id !== id));
  };

  const copyToClipboard = () => {
    const output = polygons.map(p => ({
      name: p.name,
      points: p.points,
    }));

    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPolygons([]);
    setCurrentPoints([]);
    setIsDrawing(false);
  };

  // SVG points 屬性不支援百分比，但因為 viewBox 設為 "0 0 100 100"，
  // 所以直接使用數值（0-100）就等同於百分比
  const getPointsString = (points: Point[]): string => {
    return points.map(p => `${p.x},${p.y}`).join(' ');
  };

  if (!enabled) return null;

  // 計算繪製層的樣式（對齊目標容器或全螢幕）
  const overlayStyle: React.CSSProperties = targetSelector && targetRect
    ? {
        position: 'fixed',
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        zIndex: 9998,
        cursor: isDrawing ? 'crosshair' : 'default',
      }
    : {
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        cursor: isDrawing ? 'crosshair' : 'default',
      };

  // 處理點擊並穿透到下層
  const handleClickWithPassthrough = (e: React.MouseEvent) => {
    // 繪製工具的座標（已經是正確的）
    const drawerPoint = getRelativePosition(e);

    // 同時計算 mapRef 方式的座標（用於比較）
    const mapContainer = document.querySelector('[data-map-container]');
    if (mapContainer) {
      const rect = mapContainer.getBoundingClientRect();
      const mapX = ((e.clientX - rect.left) / rect.width) * 100;
      const mapY = ((e.clientY - rect.top) / rect.height) * 100;

      console.log(`[座標比較] 繪製工具: x=${drawerPoint.x}%, y=${drawerPoint.y}% | mapRef: x=${mapX.toFixed(2)}%, y=${mapY.toFixed(2)}%`);
    }

    handleClick(e);

    // 讓事件穿透到下層元素
    const overlay = containerRef.current;
    if (overlay) {
      overlay.style.pointerEvents = 'none';
      setTimeout(() => {
        const underlyingElement = document.elementFromPoint(e.clientX, e.clientY);
        if (underlyingElement) {
          underlyingElement.dispatchEvent(new MouseEvent('click', {
            bubbles: true,
            clientX: e.clientX,
            clientY: e.clientY,
          }));
        }
        overlay.style.pointerEvents = 'auto';
      }, 0);
    }
  };

  return (
    <>
      {/* 繪製層 - 對齊目標容器或覆蓋整個畫面 */}
      <div
        ref={containerRef}
        style={overlayStyle}
        onClick={handleClickWithPassthrough}
        onDoubleClick={handleDoubleClick}
        onMouseMove={handleMouseMove}
      >
        <svg
          className="w-full h-full"
          style={{ pointerEvents: 'none' }}
          viewBox={usePercentage ? "0 0 100 100" : `0 0 ${baseWidth} ${baseHeight}`}
          preserveAspectRatio="none"
        >
          {/* 已完成的多邊形 */}
          {polygons.map((polygon) => (
            <g key={polygon.id}>
              <polygon
                points={getPointsString(polygon.points)}
                fill={polygon.color}
                stroke={polygon.color.replace('0.6', '1')}
                strokeWidth={usePercentage ? "0.2" : "2"}
              />
              {/* 頂點標記 */}
              {polygon.points.map((point, idx) => (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={usePercentage ? 0.5 : 5}
                  fill="white"
                  stroke={polygon.color.replace('0.6', '1')}
                  strokeWidth={usePercentage ? 0.1 : 1}
                />
              ))}
            </g>
          ))}

          {/* 正在繪製的多邊形 */}
          {currentPoints.length > 0 && (
            <g>
              {/* 已繪製的線段 */}
              <polyline
                points={getPointsString(currentPoints)}
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth={usePercentage ? "0.15" : "2"}
                strokeDasharray={usePercentage ? "0.5" : "5"}
              />

              {/* 預覽線段（到滑鼠位置） */}
              {mousePosition && currentPoints.length > 0 && (
                <line
                  x1={currentPoints[currentPoints.length - 1].x}
                  y1={currentPoints[currentPoints.length - 1].y}
                  x2={mousePosition.x}
                  y2={mousePosition.y}
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth={usePercentage ? 0.1 : 1}
                  strokeDasharray={usePercentage ? "0.3" : "3"}
                />
              )}

              {/* 閉合預覽線 */}
              {mousePosition && currentPoints.length >= 2 && (
                <line
                  x1={currentPoints[0].x}
                  y1={currentPoints[0].y}
                  x2={mousePosition.x}
                  y2={mousePosition.y}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth={usePercentage ? 0.1 : 1}
                  strokeDasharray={usePercentage ? "0.3" : "3"}
                />
              )}

              {/* 頂點標記 */}
              {currentPoints.map((point, idx) => (
                <circle
                  key={idx}
                  cx={point.x}
                  cy={point.y}
                  r={usePercentage ? 0.6 : 6}
                  fill={idx === 0 ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
                  stroke="white"
                  strokeWidth={usePercentage ? 0.15 : 2}
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* 控制面板 */}
      <div
        className="fixed top-4 right-4 z-[9999] bg-gray-900/95 text-white rounded-lg shadow-2xl"
        style={{
          maxWidth: '320px',
          maxHeight: '80vh',
          pointerEvents: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 標題列 */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-gray-700 cursor-pointer"
          onClick={() => setShowPanel(!showPanel)}
        >
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">⚠️</span>
            <span className="font-bold text-sm">開發工具 - 多邊形繪製</span>
          </div>
          <span className="text-gray-400">{showPanel ? '▼' : '▲'}</span>
        </div>

        {showPanel && (
          <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 50px)' }}>
            {/* 使用說明 */}
            <div className="text-xs text-gray-400 space-y-1 bg-gray-800 p-3 rounded">
              <p><strong>使用方式：</strong></p>
              <p>• 點擊添加頂點</p>
              <p>• 雙擊或 Enter 完成多邊形</p>
              <p>• Escape 取消繪製</p>
              <p>• Ctrl+Z 撤銷頂點</p>
            </div>

            {/* 當前座標 */}
            {mousePosition && (
              <div className="text-xs bg-gray-800 p-2 rounded">
                <span className="text-gray-400">目前位置：</span>
                <span className="text-green-400 ml-2">
                  {mousePosition.x}{usePercentage ? '%' : ''}, {mousePosition.y}{usePercentage ? '%' : ''}
                </span>
              </div>
            )}

            {/* 區域名稱輸入 */}
            <div>
              <label className="text-xs text-gray-400 block mb-1">區域名稱（選填）</label>
              <input
                type="text"
                value={polygonName}
                onChange={(e) => setPolygonName(e.target.value)}
                placeholder="輸入區域名稱..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* 當前繪製狀態 */}
            {currentPoints.length > 0 && (
              <div className="text-xs bg-blue-900/50 p-2 rounded">
                <span className="text-blue-300">正在繪製：{currentPoints.length} 個頂點</span>
                {currentPoints.length < 3 && (
                  <span className="text-yellow-400 block mt-1">（至少需要 3 個頂點）</span>
                )}
              </div>
            )}

            {/* 已完成的多邊形列表 */}
            {polygons.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-gray-400">已完成區域：</div>
                {polygons.map((polygon) => (
                  <div
                    key={polygon.id}
                    className="flex items-center justify-between bg-gray-800 p-2 rounded text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: polygon.color }}
                      />
                      <span>{polygon.name}</span>
                      <span className="text-gray-500 text-xs">({polygon.points.length}點)</span>
                    </div>
                    <button
                      onClick={() => deletePolygon(polygon.id)}
                      className="text-red-400 hover:text-red-300 text-xs px-2"
                    >
                      刪除
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 操作按鈕 */}
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                disabled={polygons.length === 0}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors"
              >
                {copied ? '✓ 已複製' : '複製座標'}
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-2 bg-red-600 hover:bg-red-500 rounded text-sm transition-colors"
              >
                清除全部
              </button>
            </div>

            {/* 輸出預覽 */}
            {polygons.length > 0 && (
              <div className="text-xs">
                <div className="text-gray-400 mb-1">輸出預覽：</div>
                <pre className="bg-gray-800 p-2 rounded overflow-x-auto text-green-400 max-h-40 overflow-y-auto">
                  {JSON.stringify(
                    polygons.map(p => ({
                      name: p.name,
                      points: p.points,
                    })),
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PolygonDrawer;

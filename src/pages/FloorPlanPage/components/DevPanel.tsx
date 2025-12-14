import React from 'react';
import { AnchorPoint } from '../types';

interface DevPanelProps {
  floorId: string;
  anchorPoints: AnchorPoint[];
  clickedCoords: { x: number; y: number } | null;
  onUndo: () => void;
  onClear: () => void;
  onCopyJson: () => void;
  onCopyPolygon: () => void;
}

const DevPanel: React.FC<DevPanelProps> = ({
  floorId,
  anchorPoints,
  clickedCoords,
  onUndo,
  onClear,
  onCopyJson,
  onCopyPolygon,
}) => {
  return (
    <div
      className="absolute z-30 bg-black/90 text-white p-3 rounded-lg shadow-lg"
      style={{ right: '100px', bottom: '1.5rem', width: '280px', maxHeight: '300px', overflowY: 'auto' }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-yellow-400">🔧 多錨點模式</h4>
        <span className="text-xs text-gray-400">點擊圖片新增錨點</span>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={onUndo}
          disabled={anchorPoints.length === 0}
          className="px-3 py-1 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-xs transition-colors"
        >
          ↩ 復原
        </button>
        <button
          onClick={onClear}
          disabled={anchorPoints.length === 0}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-xs transition-colors"
        >
          🗑 清除全部
        </button>
      </div>

      <div className="text-sm mb-3">
        <p>樓層: <span className="text-cyan-400 font-bold">{floorId}</span></p>
        <p>錨點數量: <span className="text-green-400 font-bold">{anchorPoints.length}</span></p>
      </div>

      {clickedCoords && (
        <div className="mb-3 p-2 bg-green-900/50 rounded border border-green-600">
          <p className="text-xs text-green-300 mb-1">最新錨點 #{anchorPoints.length}</p>
          <p className="font-mono text-sm">
            X: <span className="text-green-400">{clickedCoords.x}%</span>,
            Y: <span className="text-green-400">{clickedCoords.y}%</span>
          </p>
        </div>
      )}

      {anchorPoints.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-2">所有錨點:</p>
          <div className="max-h-32 overflow-y-auto bg-gray-900 rounded p-2">
            {anchorPoints.map((point, index) => (
              <div key={index} className="text-xs font-mono text-gray-300 py-0.5">
                <span className="text-yellow-400">{index + 1}.</span> ({point.x}, {point.y})
              </div>
            ))}
          </div>
        </div>
      )}

      {anchorPoints.length > 0 && (
        <div className="space-y-2">
          <button
            onClick={onCopyJson}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded text-xs transition-colors"
          >
            📋 複製 JSON 格式
          </button>
          <button
            onClick={onCopyPolygon}
            className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded text-xs transition-colors"
          >
            📐 複製 CSS clip-path
          </button>
        </div>
      )}

      {anchorPoints.length === 0 && (
        <p className="text-gray-500 text-xs text-center py-4">
          點擊平面圖任意位置開始建立錨點...
        </p>
      )}

      {anchorPoints.length >= 3 && (
        <div className="mt-3 p-2 bg-gray-900 rounded">
          <p className="text-xs text-gray-400 mb-1">CSS clip-path:</p>
          <p className="text-xs font-mono text-purple-300 break-all">
            polygon({anchorPoints.map(p => `${p.x}% ${p.y}%`).join(', ')})
          </p>
        </div>
      )}
    </div>
  );
};

export default DevPanel;

import React from 'react';
import { FloorData } from '../types';

interface FloorSelectorProps {
  floors: FloorData[];
  selectedFloor: FloorData;
  onSelectFloor: (floor: FloorData) => void;
}

const FloorSelector: React.FC<FloorSelectorProps> = ({
  floors,
  selectedFloor,
  onSelectFloor,
}) => {
  return (
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
            onClick={() => floor.image && onSelectFloor(floor)}
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
  );
};

export default FloorSelector;

import React from 'react';
import { UnitData } from '../types';

interface UnitIndicatorProps {
  units: UnitData[];
  selectedUnitId: string | undefined;
  onSelectUnit: (unit: UnitData) => void;
}

const UnitIndicator: React.FC<UnitIndicatorProps> = ({
  units,
  selectedUnitId,
  onSelectUnit,
}) => {
  return (
    <div
      className="absolute z-10 bg-white p-2"
      style={{ left: '1.5rem', bottom: '1.5rem' }}
    >
      <svg width="275" height="230" viewBox="0 0 86 82" className="block">
        {units.map((unit) => {
          const isSelected = selectedUnitId === unit.id;
          const points = unit.region.map(p => `${p.x},${p.y}`).join(' ');
          const centerX = unit.region.reduce((sum, p) => sum + p.x, 0) / unit.region.length;
          const centerY = unit.region.reduce((sum, p) => sum + p.y, 0) / unit.region.length;
          return (
            <g key={unit.id}>
              <polygon
                points={points}
                fill={isSelected ? '#f5e6b8' : '#f9fafb'}
                stroke={isSelected ? '#d4a853' : '#e5e7eb'}
                strokeWidth="1"
                className="cursor-pointer hover:fill-gray-100 transition-colors"
                onClick={() => onSelectUnit(unit)}
              />
              <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fontWeight="500"
                fill={isSelected ? '#92400e' : '#374151'}
                className="pointer-events-none select-none"
              >
                {unit.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default UnitIndicator;

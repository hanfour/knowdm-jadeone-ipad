import React from 'react';

interface CompassProps {
  className?: string;
  style?: React.CSSProperties;
}

const Compass: React.FC<CompassProps> = ({ className = '', style }) => {
  return (
    <div className={`absolute z-10 ${className}`} style={style}>
      <svg width="80" height="80" viewBox="0 0 40 40">
        <g transform="rotate(30, 20, 20)">
          <polygon
            points="20,5 13,22 20,18 27,22"
            fill="#1a1a1a"
            stroke="#1a1a1a"
            strokeWidth="1"
          />
        </g>
        <text
          x="32"
          y="8"
          fontSize="10"
          fontWeight="500"
          fill="#1a1a1a"
          fontStyle="italic"
        >
          N
        </text>
      </svg>
    </div>
  );
};

export default Compass;

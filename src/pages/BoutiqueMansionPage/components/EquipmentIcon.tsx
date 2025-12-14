import React from 'react';

interface EquipmentIconProps {
  name: string;
  englishName: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const EquipmentIcon: React.FC<EquipmentIconProps> = ({
  name,
  englishName,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-4 transition-all duration-300"
    >
      {/* 圓形圖標容器 */}
      <div
        className={`relative w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'border-[#f3cf9a] shadow-[0_0_30px_rgba(243,207,154,0.5)]'
            : 'border-[#0b2d2a] group-hover:border-[#f3cf9a]/50'
        }`}
        style={{
          background: isActive
            ? 'radial-gradient(circle, rgba(243,207,154,0.15) 0%, transparent 70%)'
            : 'transparent',
        }}
      >
        {/* 圖標 */}
        <div
          className={`transition-all duration-300 ${
            isActive ? 'text-[#f3cf9a]' : 'text-[#0b2d2a] group-hover:text-[#f3cf9a]/70'
          }`}
        >
          {icon}
        </div>

        {/* 光暈效果 */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              boxShadow: '0 0 40px rgba(243,207,154,0.4), 0 0 60px rgba(243,207,154,0.2)',
            }}
          />
        )}
      </div>

      {/* 文字標籤 */}
      <div className="text-center">
        <p
          className={`text-lg font-medium tracking-wide transition-colors duration-300 ${
            isActive ? 'text-[#f3cf9a]' : 'text-[#0b2d2a] group-hover:text-[#f3cf9a]/70'
          }`}
        >
          {name}
        </p>
        <p
          className={`text-xs uppercase tracking-widest mt-1 transition-colors duration-300 ${
            isActive ? 'text-[#f3cf9a]/80' : 'text-[#0b2d2a]/60 group-hover:text-[#f3cf9a]/50'
          }`}
        >
          {englishName}
        </p>
      </div>
    </button>
  );
};

export default EquipmentIcon;

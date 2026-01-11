import React from 'react';

interface CloseButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * 統一的關閉按鈕元件
 * 用於燈箱、Modal 等需要關閉功能的介面
 */
const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = '',
  ariaLabel = '關閉',
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:rotate-180 transition-all duration-300 z-20 ${className}`}
      aria-label={ariaLabel}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export default CloseButton;

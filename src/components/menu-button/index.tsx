import React from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  size?: number;
  position?: 'fixed' | 'relative';
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, onClick, size = 60, position = 'fixed' }) => {
  const isFixed = position === 'fixed';

  return (
    <>
      <button
        onClick={onClick}
        className={`${isFixed ? 'fixed z-[200]' : 'relative'} flex items-center justify-center transition-transform duration-300 hover:scale-9`}
        style={{
          ...(isFixed ? { top: 0, right: 0 } : {}),
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: '#0b2d2a',
        }}
        aria-label={isOpen ? '關閉選單' : '開啟選單'}
        aria-expanded={isOpen}
      >
        <div
          className="relative"
          style={{
            width: `${size * 0.4}px`,
            height: `${size * 0.35}px`,
          }}
        >
          {/* 三條線 / X 動畫 */}
          <span
            className="absolute left-0 right-0 bg-white transition-all duration-300 ease-in-out"
            style={{
              height: '2px',
              top: isOpen ? '50%' : '0',
              transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(0) rotate(0)',
            }}
          />
          <span
            className="absolute left-0 right-0 bg-white transition-all duration-300 ease-in-out"
            style={{
              height: '2px',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: isOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute left-0 right-0 bg-white transition-all duration-300 ease-in-out"
            style={{
              height: '2px',
              bottom: isOpen ? 'auto' : '0',
              top: isOpen ? '50%' : 'auto',
              transform: isOpen ? 'translateY(-50%) rotate(-45deg)' : 'translateY(0) rotate(0)',
            }}
          />
        </div>
      </button>
    </>
  );
};

export default MenuButton;

import React, { useState, useRef } from 'react';

interface RippleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const RippleButton: React.FC<RippleButtonProps> = ({ onClick, children, className = '' }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
  };

  const handleMouseLeave = () => {
    // 延遲清除以完成動畫
    setTimeout(() => {
      setRipples([]);
    }, 600);
  };

  return (
    <>
      <style>{`
        @keyframes rippleSpread {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 1;
          }
        }
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: #d4a853;
          width: 100px;
          height: 100px;
          pointer-events: none;
          animation: rippleSpread 0.5s ease-out forwards;
        }
      `}</style>
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden px-6 py-2.5 bg-brand-sekisui text-white text-small tracking-wide-custom transition-colors duration-300 flex items-center gap-2 ${className}`}
      >
        {/* 漣漪效果層 */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple-effect"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
        {/* 按鈕內容 */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    </>
  );
};

export default RippleButton;

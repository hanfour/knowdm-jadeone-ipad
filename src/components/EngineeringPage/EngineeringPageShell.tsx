import React from 'react';
import SubpageMenuBar from '../SubpageMenuBar';

interface EngineeringPageShellProps {
  sectionIndex: number;
  backgroundColor?: string;
  children: React.ReactNode;
}

const EngineeringPageShell: React.FC<EngineeringPageShellProps> = ({
  sectionIndex,
  backgroundColor = '#e8e4df',
  children,
}) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundColor }}
    >
      {/* 共用動畫樣式 */}
      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .shine-border {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shine 2s ease-in-out infinite;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: xor;
          mask-composite: exclude;
          padding: 2px;
        }

        .tab-item {
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-item:hover:not(.active) {
          background-color: rgba(75, 85, 99, 0.9);
        }

        .service-circle {
          transition: all 0.3s ease;
        }

        .service-circle:hover {
          transform: scale(1.05);
        }

        .service-circle.active {
          box-shadow: 0 0 0 3px rgba(11, 45, 42, 0.3);
        }
      `}</style>

      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={sectionIndex} />

      {/* 主要內容區 */}
      <div className="absolute inset-0 flex flex-col" style={{ top: '80px' }}>
        {children}
      </div>
    </div>
  );
};

export default EngineeringPageShell;

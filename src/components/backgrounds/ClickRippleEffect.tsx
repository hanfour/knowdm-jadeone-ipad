import React from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

interface ClickRippleEffectProps {
  ripples: ClickRipple[];
}

const ClickRippleEffect: React.FC<ClickRippleEffectProps> = ({ ripples }) => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="click-ripple"
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <style>{`
        /* 點擊鑽石折射光芒效果 */
        .click-ripple {
          position: relative;
        }
        .click-ripple::before,
        .click-ripple::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }
        /* 中心光芒 */
        .click-ripple::before {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle,
            rgba(255,255,255,0.9) 0%,
            rgba(255,255,255,0.5) 15%,
            rgba(200,220,255,0.3) 30%,
            rgba(255,200,220,0.2) 45%,
            rgba(220,255,200,0.1) 60%,
            transparent 75%
          );
          filter: blur(8px);
          animation: diamondFlash 0.8s ease-out forwards;
        }
        /* 外圈光暈 */
        .click-ripple::after {
          width: 150%;
          height: 150%;
          background: radial-gradient(circle,
            transparent 30%,
            rgba(255,255,255,0.15) 50%,
            rgba(200,230,255,0.1) 65%,
            transparent 80%
          );
          filter: blur(15px);
          animation: diamondGlow 1.2s ease-out forwards;
        }

        @keyframes diamondFlash {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes diamondGlow {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
        }
        @keyframes clickExpand {
          0% { width: 0; height: 0; }
          100% { width: 400px; height: 400px; }
        }
        .click-ripple {
          animation: clickExpand 1.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ClickRippleEffect;

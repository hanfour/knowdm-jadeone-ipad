import React, { useState } from 'react';
import IntroAnimation from './index';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '500px',
  backgroundColor: '#1a1a1a',
  overflow: 'hidden',
};

export const IntroAnimationLogoPhase = () => {
  const [completed, setCompleted] = useState(false);
  return (
    <div style={containerStyle}>
      {!completed ? (
        <IntroAnimation
          onComplete={() => setCompleted(true)}
          config={{ phase6: true }}
          skipText="點擊跳過"
        />
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#fff',
          fontSize: '1.5rem'
        }}>
          動畫完成！
        </div>
      )}
    </div>
  );
};

export const IntroAnimationMainTitle = () => {
  const [completed, setCompleted] = useState(false);
  return (
    <div style={containerStyle}>
      {!completed ? (
        <IntroAnimation
          onComplete={() => setCompleted(true)}
          config={{ phase3: true }}
          mainTitle="品味生活"
          subtitle="打造理想居住空間"
        />
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#fff',
          fontSize: '1.5rem'
        }}>
          動畫完成！
        </div>
      )}
    </div>
  );
};

export const IntroAnimationFullSequence = () => {
  const [completed, setCompleted] = useState(false);
  return (
    <div style={containerStyle}>
      {!completed ? (
        <IntroAnimation
          onComplete={() => setCompleted(true)}
          config={{ phase0: true, phase1: true, phase3: true, phase6: true }}
        />
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#fff',
          fontSize: '1.5rem'
        }}>
          完整動畫序列完成！
        </div>
      )}
    </div>
  );
};

export const IntroAnimationCustomText = () => {
  const [completed, setCompleted] = useState(false);
  return (
    <div style={containerStyle}>
      {!completed ? (
        <IntroAnimation
          onComplete={() => setCompleted(true)}
          config={{ phase3: true, phase6: true }}
          mainTitle="自訂標題文字"
          subtitle="這是自訂的副標題內容"
          skipText="Skip Animation"
        />
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#fff',
          fontSize: '1.5rem'
        }}>
          動畫完成！
        </div>
      )}
    </div>
  );
};

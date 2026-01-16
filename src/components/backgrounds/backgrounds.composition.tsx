import React from 'react';
import {
  AuroraBackground,
  RippleBackground,
  LightRaysBackground,
  SunlightBackground,
  LightBlobsBackground,
  ClickRippleEffect,
} from './index';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '400px',
  backgroundColor: '#0b2d2a',
  overflow: 'hidden',
};

const labelStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '1rem',
  left: '1rem',
  color: '#fff',
  fontSize: '14px',
  zIndex: 10,
  backgroundColor: 'rgba(0,0,0,0.5)',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
};

export const AuroraBackgroundDemo = () => (
  <div style={containerStyle}>
    <AuroraBackground
      maskPosition="top-right"
      animationDuration={30}
      saturation={120}
    />
    <div style={labelStyle}>Aurora Background - 極光效果</div>
  </div>
);

export const RippleBackgroundDemo = () => (
  <div style={containerStyle}>
    <RippleBackground
      autoRipple={true}
      autoRippleInterval={1500}
      rippleDuration={2500}
      maxRippleSize={100}
    />
    <div style={labelStyle}>Ripple Background - 點擊或自動產生漣漪</div>
  </div>
);

export const LightRaysBackgroundDemo = () => (
  <div style={containerStyle}>
    <LightRaysBackground />
    <div style={labelStyle}>Light Rays Background - 光線效果</div>
  </div>
);

export const SunlightBackgroundDemo = () => (
  <div style={containerStyle}>
    <SunlightBackground />
    <div style={labelStyle}>Sunlight Background - 陽光效果</div>
  </div>
);

export const LightBlobsBackgroundDemo = () => (
  <div style={containerStyle}>
    <LightBlobsBackground />
    <div style={labelStyle}>Light Blobs Background - 光球效果</div>
  </div>
);

export const ClickRippleEffectDemo = () => (
  <div style={{ ...containerStyle, cursor: 'pointer' }}>
    <ClickRippleEffect />
    <div style={{ ...labelStyle, bottom: 'auto', top: '1rem' }}>
      Click Ripple Effect - 點擊任意位置
    </div>
  </div>
);

import React from 'react';
import AspectRatioContainer from './index';

export const Default16x9Container = () => (
  <AspectRatioContainer baseWidth={1920} baseHeight={1080}>
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#d4a853',
      fontSize: '48px',
      fontWeight: 'bold'
    }}>
      16:9 容器 (1920×1080)
    </div>
  </AspectRatioContainer>
);

export const Square1x1Container = () => (
  <AspectRatioContainer baseWidth={1000} baseHeight={1000}>
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0b2d2a 0%, #1a4a45 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '36px',
      fontWeight: 'bold'
    }}>
      1:1 正方形容器
    </div>
  </AspectRatioContainer>
);

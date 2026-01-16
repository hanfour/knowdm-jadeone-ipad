import React from 'react';
import AspectRatioContainer from '../components/AspectRatioContainer';

/**
 * 等比例容器元件
 * 保持設計稿比例，自動縮放適應視窗大小
 */
export default {
  title: 'Components/AspectRatioContainer',
  component: AspectRatioContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    baseWidth: {
      control: { type: 'number' },
      description: '設計稿基準寬度',
    },
    baseHeight: {
      control: { type: 'number' },
      description: '設計稿基準高度',
    },
  },
};

/**
 * 16:9 比例（預設）
 */
export const Default16x9 = {
  args: {
    baseWidth: 1920,
    baseHeight: 1080,
  },
  render: (args: { baseWidth: number; baseHeight: number }) => (
    <AspectRatioContainer {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0b2d2a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>16:9 Container</h1>
        <p style={{ fontSize: '24px', opacity: 0.7 }}>
          {args.baseWidth} x {args.baseHeight}
        </p>
        <p style={{ fontSize: '16px', opacity: 0.5, marginTop: '8px' }}>
          調整視窗大小查看自動縮放效果
        </p>
      </div>
    </AspectRatioContainer>
  ),
};

/**
 * 4:3 比例
 */
export const Ratio4x3 = {
  args: {
    baseWidth: 1600,
    baseHeight: 1200,
  },
  render: (args: { baseWidth: number; baseHeight: number }) => (
    <AspectRatioContainer {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#2d0b2a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>4:3 Container</h1>
        <p style={{ fontSize: '24px', opacity: 0.7 }}>
          {args.baseWidth} x {args.baseHeight}
        </p>
      </div>
    </AspectRatioContainer>
  ),
};

/**
 * 21:9 超寬比例
 */
export const UltraWide21x9 = {
  args: {
    baseWidth: 2560,
    baseHeight: 1080,
  },
  render: (args: { baseWidth: number; baseHeight: number }) => (
    <AspectRatioContainer {...args}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0b1a2d',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>21:9 Ultra Wide</h1>
        <p style={{ fontSize: '24px', opacity: 0.7 }}>
          {args.baseWidth} x {args.baseHeight}
        </p>
      </div>
    </AspectRatioContainer>
  ),
};

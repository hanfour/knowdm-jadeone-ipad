import React from 'react';
import CloseButton from '../components/CloseButton';

/**
 * 統一的關閉按鈕元件
 * 用於燈箱、Modal 等需要關閉功能的介面
 */
export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#f5f5f5' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    className: {
      control: 'text',
      description: '額外的 CSS class',
    },
    ariaLabel: {
      control: 'text',
      description: '無障礙標籤',
    },
  },
};

/**
 * 預設樣式 - 黑色半透明背景配上白色 X 圖示
 */
export const Default = {
  args: {
    onClick: () => console.log('Close clicked'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Hover 效果展示 - 滑鼠移上去會旋轉 180 度
 */
export const HoverEffect = {
  args: {
    onClick: () => console.log('Close clicked'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <p style={{ color: 'white', marginBottom: '1rem', fontSize: '14px' }}>
          Hover 時會旋轉 180 度
        </p>
        <Story />
      </div>
    ),
  ],
};

/**
 * 淺色背景 - 在淺色背景上的效果
 */
export const OnLightBackground = {
  args: {
    onClick: () => console.log('Close clicked'),
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 自訂無障礙標籤
 */
export const CustomAriaLabel = {
  args: {
    onClick: () => console.log('Close clicked'),
    ariaLabel: '關閉影片播放器',
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

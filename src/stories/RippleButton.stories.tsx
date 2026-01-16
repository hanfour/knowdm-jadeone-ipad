import React from 'react';
import RippleButton from '../components/RippleButton';

/**
 * 帶有漣漪效果的按鈕元件
 * Hover 時會從滑鼠進入位置向外擴散金色漣漪效果
 */
export default {
  title: 'Components/RippleButton',
  component: RippleButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#f5f0e6' },
        { name: 'white', value: '#ffffff' },
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
    children: {
      control: 'text',
      description: '按鈕內容',
    },
  },
};

/**
 * 預設樣式 - 深綠色背景，hover 時金色漣漪擴散
 */
export const Default = {
  args: {
    onClick: () => console.log('Button clicked'),
    children: '按鈕文字',
  },
};

/**
 * 帶箭頭圖示 - 常用於導航按鈕
 */
export const WithArrowIcon = {
  args: {
    onClick: () => console.log('Button clicked'),
  },
  render: (args: { onClick: () => void }) => (
    <RippleButton {...args}>
      <span>查看更多</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </RippleButton>
  ),
};

/**
 * 74快速道路按鈕樣式
 */
export const Highway74Button = {
  args: {
    onClick: () => console.log('Highway 74 clicked'),
  },
  render: (args: { onClick: () => void }) => (
    <RippleButton {...args}>
      <span>74快速道路</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </RippleButton>
  ),
};

/**
 * 重劃區比較表按鈕樣式
 */
export const ComparisonButton = {
  args: {
    onClick: () => console.log('Comparison clicked'),
  },
  render: (args: { onClick: () => void }) => (
    <RippleButton {...args}>
      <span>重劃區比較表</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </RippleButton>
  ),
};

/**
 * 生態專用區介紹按鈕樣式
 */
export const EcoZoneButton = {
  args: {
    onClick: () => console.log('Eco zone clicked'),
  },
  render: (args: { onClick: () => void }) => (
    <RippleButton {...args}>
      <span>生態專用區介紹</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </RippleButton>
  ),
};

/**
 * 影片按鈕樣式
 */
export const VideoButton = {
  args: {
    onClick: () => console.log('Video clicked'),
  },
  render: (args: { onClick: () => void }) => (
    <RippleButton {...args}>
      <span>水湳空拍</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </RippleButton>
  ),
};

/**
 * 多個按鈕並排 - 展示按鈕群組效果
 */
export const ButtonGroup = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <RippleButton onClick={() => console.log('Button 1')}>
        <span>74快速道路</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </RippleButton>
      <RippleButton onClick={() => console.log('Button 2')}>
        <span>重劃區比較表</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </RippleButton>
    </div>
  ),
};

/**
 * 深色背景 - 在深色背景上的效果
 */
export const OnDarkBackground = {
  args: {
    onClick: () => console.log('Button clicked'),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args: { onClick: () => void }) => (
    <RippleButton {...args}>
      <span>深色背景按鈕</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </RippleButton>
  ),
};

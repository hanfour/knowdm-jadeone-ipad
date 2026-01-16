import React, { useState } from 'react';
import MenuButton from '../components/MenuButton';

/**
 * 漢堡選單按鈕元件
 * 點擊時會從三條線動畫變成 X 圖示
 */
export default {
  title: 'Components/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#f5f0e6' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '選單是否開啟',
    },
    onClick: { action: 'clicked' },
    size: {
      control: { type: 'range', min: 40, max: 100, step: 10 },
      description: '按鈕尺寸（px）',
    },
    position: {
      control: { type: 'radio' },
      options: ['fixed', 'relative'],
      description: '定位方式',
    },
  },
};

/**
 * 預設狀態 - 三條線（選單關閉）
 */
export const Default = {
  args: {
    isOpen: false,
    onClick: () => {},
    size: 60,
    position: 'relative',
  },
};

/**
 * 開啟狀態 - X 圖示
 */
export const Open = {
  args: {
    isOpen: true,
    onClick: () => {},
    size: 60,
    position: 'relative',
  },
};

/**
 * 大尺寸按鈕
 */
export const LargeSize = {
  args: {
    isOpen: false,
    onClick: () => {},
    size: 80,
    position: 'relative',
  },
};

/**
 * 小尺寸按鈕
 */
export const SmallSize = {
  args: {
    isOpen: false,
    onClick: () => {},
    size: 40,
    position: 'relative',
  },
};

/**
 * 互動展示 - 點擊切換狀態
 */
export const Interactive = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <MenuButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          size={60}
          position="relative"
        />
        <p style={{ fontSize: '14px', color: '#666' }}>
          點擊按鈕切換狀態（目前：{isOpen ? '開啟' : '關閉'}）
        </p>
      </div>
    );
  },
};

/**
 * 尺寸比較
 */
export const SizeComparison = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <MenuButton isOpen={false} onClick={() => {}} size={40} position="relative" />
        <p style={{ fontSize: '12px', marginTop: '8px' }}>40px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MenuButton isOpen={false} onClick={() => {}} size={60} position="relative" />
        <p style={{ fontSize: '12px', marginTop: '8px' }}>60px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MenuButton isOpen={false} onClick={() => {}} size={80} position="relative" />
        <p style={{ fontSize: '12px', marginTop: '8px' }}>80px</p>
      </div>
    </div>
  ),
};

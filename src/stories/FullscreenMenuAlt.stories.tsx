import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import FullscreenMenuAlt from '../components/FullscreenMenuAlt';

/**
 * 全螢幕選單元件（Alt 版本）
 * 帶有淡入淡出動畫效果的選單
 * 左側 15% 留白 + 四欄選單內容
 */
export default {
  title: 'Components/FullscreenMenuAlt',
  component: FullscreenMenuAlt,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '選單是否開啟',
    },
    onClose: { action: 'closed' },
  },
};

/**
 * 開啟狀態 - 顯示完整選單（帶動畫）
 */
export const Open = {
  args: {
    isOpen: true,
    onClose: () => console.log('Menu closed'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 關閉狀態 - 完全透明隱藏
 */
export const Closed = {
  args: {
    isOpen: false,
    onClose: () => console.log('Menu closed'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
          <p style={{ color: 'white', padding: '2rem' }}>選單已關閉（帶淡出動畫）</p>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 互動式展示 - 可切換開關狀態，觀察動畫效果
 */
export const Interactive = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: isOpen ? '#e74c3c' : '#d4a853',
              color: isOpen ? 'white' : '#0b2d2a',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              zIndex: 200,
            }}
          >
            {isOpen ? '關閉選單' : '開啟選單'}
          </button>
          <FullscreenMenuAlt isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </MemoryRouter>
    );
  },
};

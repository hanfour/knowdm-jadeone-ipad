import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import FullscreenMenu from '../components/FullscreenMenu';

/**
 * 全螢幕選單元件
 * 五欄 grid 佈局，左側空白區域 + 四個選單區塊
 * 包含 Logo、BACK 按鈕及選單項目
 */
export default {
  title: 'Components/FullscreenMenu',
  component: FullscreenMenu,
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
 * 開啟狀態 - 顯示完整選單
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
 * 關閉狀態 - 不顯示任何內容
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
          <p style={{ color: 'white', padding: '2rem' }}>選單已關閉（isOpen: false）</p>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 互動式展示 - 可切換開關狀態
 */
export const Interactive = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#d4a853',
              color: '#0b2d2a',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            開啟選單
          </button>
          <FullscreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </MemoryRouter>
    );
  },
};

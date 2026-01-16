import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

/**
 * 頁面標頭元件
 * 包含 Logo 和可選的 MENU 按鈕，支援白色和金色主題
 */
export default {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['white', 'gold'],
      description: '主題顏色',
    },
    showMenuButton: {
      control: 'boolean',
      description: '是否顯示 MENU 按鈕',
    },
    onMenuOpen: { action: 'menuOpened' },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter>
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#1a1a1a' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 白色主題 - 深色背景使用
 */
export const WhiteTheme = {
  args: {
    theme: 'white',
    showMenuButton: true,
    onMenuOpen: () => console.log('Menu opened'),
  },
};

/**
 * 金色主題 - 淺色背景使用
 */
export const GoldTheme = {
  args: {
    theme: 'gold',
    showMenuButton: true,
    onMenuOpen: () => console.log('Menu opened'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#f5f0e6' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 無 MENU 按鈕
 */
export const WithoutMenuButton = {
  args: {
    theme: 'white',
    showMenuButton: false,
  },
};

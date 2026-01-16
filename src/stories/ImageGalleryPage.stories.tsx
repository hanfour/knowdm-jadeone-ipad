import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ImageGalleryPage from '../components/ImageGalleryPage';

// 範例圖片資料
const sampleImages = [
  { src: '/images/a1/IMG_001.jpg', label: '外觀透視' },
  { src: '/images/a1/IMG_002.jpg', label: '大廳實景' },
  { src: '/images/a1/IMG_003.jpg', label: '中庭花園' },
  { src: '/images/a1/IMG_004.jpg', label: '空中花園' },
];

/**
 * 圖片藝廊頁面元件
 * 全螢幕背景圖片切換，右下角縮圖選擇器
 * 支援影片按鈕彈窗功能
 */
export default {
  title: 'Components/ImageGalleryPage',
  component: ImageGalleryPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '頁面標題',
    },
    description: {
      control: 'text',
      description: '頁面描述文字',
    },
    images: {
      control: 'object',
      description: '圖片陣列 { src, label }[]',
    },
    videoButton: {
      control: 'object',
      description: '影片按鈕設定 { label, videoId }',
    },
  },
};

/**
 * 預設展示 - 基本圖片藝廊
 */
export const Default = {
  args: {
    title: '國際新都',
    description: '水湳智慧城以「智慧、低碳、創新」為核心，規劃生態住宅、文化商業、創新研發等多元機能。本案座落於水湳核心區位，盡享 67 公頃中央公園綠意，打造都市中的自然生態宅。',
    images: sampleImages,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/fu-ju-shui-nan/guo-ji-xin-du']}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 含影片按鈕 - 點擊可開啟 YouTube 影片
 */
export const WithVideoButton = {
  args: {
    title: '國際新都',
    description: '水湳智慧城以「智慧、低碳、創新」為核心，規劃生態住宅、文化商業、創新研發等多元機能。本案座落於水湳核心區位，盡享 67 公頃中央公園綠意，打造都市中的自然生態宅。',
    images: sampleImages,
    videoButton: {
      label: '水湳空拍',
      videoId: 'dQw4w9WgXcQ', // 範例影片 ID
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/fu-ju-shui-nan/guo-ji-xin-du']}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 多張圖片 - 展示縮圖網格排列
 */
export const ManyImages = {
  args: {
    title: '景觀規劃',
    description: '整體景觀設計以「城市綠洲」為概念，結合水景、植栽與休憩空間，營造舒適宜人的居住環境。',
    images: [
      { src: '/images/a1/IMG_001.jpg', label: '外觀透視' },
      { src: '/images/a1/IMG_002.jpg', label: '大廳實景' },
      { src: '/images/a1/IMG_003.jpg', label: '中庭花園' },
      { src: '/images/a1/IMG_004.jpg', label: '空中花園' },
      { src: '/images/a1/IMG_001.jpg', label: '夜景照明' },
      { src: '/images/a1/IMG_002.jpg', label: '入口門廳' },
      { src: '/images/a1/IMG_003.jpg', label: '休憩區' },
      { src: '/images/a1/IMG_004.jpg', label: '景觀步道' },
    ],
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/test']}>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 功能說明
 */
export const Features = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#d4a853' }}>ImageGalleryPage 功能說明</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>圖片切換</h3>
          <p style={{ color: '#888' }}>點擊右下角縮圖可切換背景圖片，帶有淡入淡出效果</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>內容區域</h3>
          <p style={{ color: '#888' }}>僅在第一張圖片時顯示標題、描述及影片按鈕</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Shine 邊框</h3>
          <p style={{ color: '#888' }}>選中的縮圖有 Shine 動畫邊框效果</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>影片彈窗</h3>
          <p style={{ color: '#888' }}>支援 YouTube 影片嵌入，帶有下滑動畫效果</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>RippleButton</h3>
          <p style={{ color: '#888' }}>影片按鈕使用 RippleButton 元件，hover 時有金色漣漪效果</p>
        </div>
      </div>
    </div>
  ),
};

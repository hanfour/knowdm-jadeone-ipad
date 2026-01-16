import React, { useState } from 'react';
import IntroAnimation from '../components/IntroAnimation';

/**
 * 開場動畫元件
 * 包含多個階段的動畫效果：
 * - Phase 0: 聽樹先生唱歌
 * - Phase 1: 公園在宅休閒
 * - Phase 3: 高訂品味 對味不凡（含 Shine 掃光）
 * - Phase 6: Logo 展示（循環 Shine）
 */
export default {
  title: 'Components/IntroAnimation',
  component: IntroAnimation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onComplete: { action: 'completed' },
  },
};

/**
 * 完整動畫展示
 * 點擊畫面可跳過動畫
 */
export const Default = {
  args: {
    onComplete: () => console.log('Animation completed'),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 互動式展示 - 可重新播放動畫
 */
export const Interactive = {
  render: () => {
    const [key, setKey] = useState(0);
    const [completed, setCompleted] = useState(false);

    const handleComplete = () => {
      setCompleted(true);
    };

    const handleReplay = () => {
      setCompleted(false);
      setKey((prev) => prev + 1);
    };

    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
        {completed ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <p style={{ color: 'white', fontSize: '1.25rem' }}>動畫已完成</p>
            <button
              onClick={handleReplay}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#d4a853',
                color: '#0b2d2a',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              重新播放
            </button>
          </div>
        ) : (
          <IntroAnimation key={key} onComplete={handleComplete} />
        )}
      </div>
    );
  },
};

/**
 * 說明各階段
 */
export const PhaseDescription = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#d4a853' }}>開場動畫階段說明</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Phase 0: 聽樹先生唱歌</h3>
          <p style={{ color: '#888' }}>綠色背景，文字逐字顯示，搭配樹木插圖</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Phase 1: 公園在宅休閒</h3>
          <p style={{ color: '#888' }}>綠色背景，文字逐字顯示，搭配城市剪影</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Phase 3: 高訂品味 對味不凡</h3>
          <p style={{ color: '#888' }}>深色鑽石紋背景，主標題打字效果 + 副標題淡入 + Shine 掃光效果</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Phase 6: Logo 展示</h3>
          <p style={{ color: '#888' }}>深色背景，Logo 放大淡入，循環 Shine 效果</p>
        </div>
      </div>
      <p style={{ marginTop: '1.5rem', color: '#666', fontSize: '0.875rem' }}>
        * 動畫設定可在 ANIMATION_CONFIG 中調整各階段開關
      </p>
    </div>
  ),
};

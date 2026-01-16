import React from 'react';
import CloseButton from './index';

// 模擬 Tailwind CSS 樣式
const styles = `
  .close-btn-demo {
    position: relative;
    padding: 60px;
    min-height: 200px;
  }
  .close-btn-demo button {
    position: absolute;
    top: 16px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;
  }
  .close-btn-demo button:hover {
    transform: rotate(180deg);
  }
`;

export const BasicCloseButton = () => (
  <>
    <style>{styles}</style>
    <div className="close-btn-demo" style={{ background: '#1a1a1a' }}>
      <CloseButton onClick={() => alert('Clicked!')} />
      <p style={{ color: '#888', fontSize: '14px' }}>深色背景上的關閉按鈕</p>
    </div>
  </>
);

export const CloseButtonOnLightBackground = () => (
  <>
    <style>{styles}</style>
    <div className="close-btn-demo" style={{ background: '#f5f5f5' }}>
      <CloseButton onClick={() => alert('Clicked!')} />
      <p style={{ color: '#666', fontSize: '14px' }}>淺色背景上的關閉按鈕</p>
    </div>
  </>
);

export const CloseButtonOnImage = () => (
  <>
    <style>{styles}</style>
    <div
      className="close-btn-demo"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <CloseButton onClick={() => alert('Clicked!')} />
      <p style={{ color: '#fff', fontSize: '14px' }}>漸層背景上的關閉按鈕</p>
    </div>
  </>
);

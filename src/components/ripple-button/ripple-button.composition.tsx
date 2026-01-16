import React from 'react';
import RippleButton from './index';

const styles = `
  .ripple-demo {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .ripple-demo button {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    background-color: #0b2d2a;
    color: white;
    font-size: 14px;
    letter-spacing: 0.1em;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ripple-demo .label {
    color: #888;
    font-size: 12px;
    margin-top: 8px;
  }
  @keyframes rippleSpread {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, -50%) scale(4);
      opacity: 1;
    }
  }
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background-color: #d4a853;
    width: 100px;
    height: 100px;
    pointer-events: none;
    animation: rippleSpread 0.5s ease-out forwards;
  }
`;

export const BasicRippleButton = () => (
  <>
    <style>{styles}</style>
    <div className="ripple-demo" style={{ background: '#1a1a1a' }}>
      <RippleButton onClick={() => alert('Clicked!')}>
        按鈕文字
      </RippleButton>
      <span className="label">滑鼠移入時會產生金色漣漪效果</span>
    </div>
  </>
);

export const RippleButtonWithIcon = () => (
  <>
    <style>{styles}</style>
    <div className="ripple-demo" style={{ background: '#1a1a1a' }}>
      <RippleButton onClick={() => alert('Clicked!')}>
        <span>了解更多</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>
      </RippleButton>
      <span className="label">帶箭頭圖標的按鈕</span>
    </div>
  </>
);

export const MultipleRippleButtons = () => (
  <>
    <style>{styles}</style>
    <div className="ripple-demo" style={{ background: '#1a1a1a', flexDirection: 'row', gap: '16px', flexWrap: 'wrap' }}>
      <RippleButton onClick={() => {}}>確認</RippleButton>
      <RippleButton onClick={() => {}}>取消</RippleButton>
      <RippleButton onClick={() => {}}>了解更多</RippleButton>
    </div>
  </>
);

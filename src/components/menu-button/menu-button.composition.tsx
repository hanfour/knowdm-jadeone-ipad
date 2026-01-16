import React, { useState } from 'react';
import MenuButton from './index';

const styles = `
  .menu-btn-demo {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .menu-btn-demo button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .menu-btn-demo button:hover {
    transform: scale(0.95);
  }
  .menu-btn-demo .label {
    color: #888;
    font-size: 14px;
    margin-top: 12px;
  }
`;

export const ClosedMenuButton = () => (
  <>
    <style>{styles}</style>
    <div className="menu-btn-demo" style={{ background: '#1a1a1a' }}>
      <MenuButton isOpen={false} onClick={() => {}} position="relative" />
      <span className="label">選單關閉狀態（☰）</span>
    </div>
  </>
);

export const OpenMenuButton = () => (
  <>
    <style>{styles}</style>
    <div className="menu-btn-demo" style={{ background: '#1a1a1a' }}>
      <MenuButton isOpen={true} onClick={() => {}} position="relative" />
      <span className="label">選單開啟狀態（✕）</span>
    </div>
  </>
);

export const InteractiveMenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <style>{styles}</style>
      <div className="menu-btn-demo" style={{ background: '#1a1a1a' }}>
        <MenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} position="relative" />
        <span className="label">
          點擊切換：{isOpen ? '開啟' : '關閉'}
        </span>
      </div>
    </>
  );
};

export const DifferentSizes = () => (
  <>
    <style>{styles}</style>
    <div className="menu-btn-demo" style={{ background: '#1a1a1a', flexDirection: 'row', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <MenuButton isOpen={false} onClick={() => {}} position="relative" size={40} />
        <p className="label">40px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MenuButton isOpen={false} onClick={() => {}} position="relative" size={60} />
        <p className="label">60px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <MenuButton isOpen={false} onClick={() => {}} position="relative" size={80} />
        <p className="label">80px</p>
      </div>
    </div>
  </>
);

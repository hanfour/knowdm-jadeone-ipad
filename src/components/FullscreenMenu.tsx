import React from 'react';
import { Link } from 'react-router-dom';
import { menuSections } from '../config/menu';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenMenu: React.FC<FullscreenMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] bg-black/55 backdrop-blur-lg overflow-hidden">
      {/* Logo - 左上角 */}
      <div
        className="absolute z-[60]"
        style={{ top: '2rem', left: '2rem' }}
      >
        <Link to="/" onClick={onClose}>
          <img
            src="/images/logo-gold.svg"
            alt="聚碩仁玉"
            style={{ height: '5rem', width: 'auto' }}
          />
        </Link>
      </div>

      {/* BACK 按鈕 - 左側中間 */}
      <button
        onClick={onClose}
        className="absolute top-1/2 -translate-y-1/2 text-white flex items-center hover:opacity-70 active:opacity-70 transition-opacity z-[60]"
        style={{ left: '2rem', gap: '0.75rem' }}
      >
        <span style={{ fontSize: '1rem' }}>—</span>
        <span style={{ letterSpacing: '0.3em', fontSize: '0.75rem' }}>BACK</span>
      </button>

      {/* 五欄 grid - 所有尺寸都維持，間距隨螢幕調整 */}
      <div className="w-full h-full grid grid-cols-5">
        {/* 第一欄：空白區域 */}
        <div className="border-r border-white/10" />

        {/* 第 2-5 欄：選單內容 */}
        {menuSections.map((section, idx) => (
          <div
            key={idx}
            className="border-r border-white/10 last:border-r-0"
            style={{ paddingTop: '30vh', paddingLeft: '2rem', paddingRight: '2rem' }}
          >
            <div className="text-white">
              <div
                className="opacity-50"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '1.5rem' }}
              >
                {section.category}
              </div>
              <div style={{ marginBottom: '2rem' }}>
                {section.title.map((line, lineIdx) => (
                  <div
                    key={lineIdx}
                    className="font-light"
                    style={{ fontSize: '1.875rem', letterSpacing: '0.05em' }}
                  >
                    {line}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    onClick={onClose}
                    className="block border border-transparent hover:border-white/60 active:border-white/60 transition-colors"
                    style={{
                      fontSize: '1rem',
                      padding: '0.375rem 0.75rem',
                      marginLeft: '-0.75rem'
                    }}
                  >
                    <span className="opacity-50" style={{ marginRight: '0.5rem' }}>{item.id}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullscreenMenu;

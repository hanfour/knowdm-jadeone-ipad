import React from 'react';
import { Link } from 'react-router-dom';
import { menuSections } from '../config/menu';

interface FullscreenMenuAltProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullscreenMenuAlt: React.FC<FullscreenMenuAltProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-[150] bg-black/55 backdrop-blur-lg overflow-hidden transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Logo - 左上角 */}
      <div
        className={`absolute z-[60] transition-all duration-500 delay-100 !hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
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

      {/* 四欄 grid - 左側 15% margin */}
      <div
        className="h-full grid"
        style={{
          gridTemplateColumns: '15% 1fr 1fr 1fr 1fr',
        }}
      >
        {/* 第一欄：15% 左側留白 */}
        <div className="border-r border-white/10" />

        {/* 第 2-5 欄：選單內容 */}
        {menuSections.map((section, idx) => (
          <div
            key={idx}
            className={`border-r border-white/10 last:border-r-0 transition-all duration-500 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              paddingTop: '30vh',
              paddingLeft: '2rem',
              paddingRight: '2rem',
              transitionDelay: isOpen ? `${150 + idx * 75}ms` : '0ms',
            }}
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
                      marginLeft: '-0.75rem',
                    }}
                  >
                    <span className="opacity-50" style={{ marginRight: '0.5rem' }}>
                      {item.id}
                    </span>
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

export default FullscreenMenuAlt;

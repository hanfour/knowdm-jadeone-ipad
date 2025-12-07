import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuSections, MenuItem } from '../config/menu';
import MenuButton from './MenuButton';
import FullscreenMenuAlt from './FullscreenMenuAlt';

interface SubpageMenuBarProps {
  // 可選：如果提供則使用，否則自動從 URL 偵測
  sectionIndex?: number;
}

const SubpageMenuBar: React.FC<SubpageMenuBarProps> = ({ sectionIndex }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // 自動偵測當前所屬的 section
  const detectSectionIndex = (): number => {
    if (sectionIndex !== undefined) return sectionIndex;

    // 根據 URL 路徑判斷所屬 section
    const path = location.pathname;
    for (let i = 0; i < menuSections.length; i++) {
      const section = menuSections[i];
      for (const item of section.items) {
        if (path === item.link || path.startsWith(item.link + '/')) {
          return i;
        }
      }
    }
    return 0; // 預設第一個 section
  };

  const currentSectionIndex = detectSectionIndex();
  const currentSection = menuSections[currentSectionIndex];
  const items: MenuItem[] = currentSection?.items || [];

  // 判斷是否為當前頁面
  const isCurrentPage = (link: string) => {
    return location.pathname === link;
  };

  return (
    <>
      {/* 右上角導航列容器 */}
      <div
        className="fixed top-0 right-0 z-[200] flex justify-between items-stretch w-full backdrop-blur-md bg-[#0b2d2a]"
      >
        <div className="logo flex items-center" style={{ paddingLeft: '2rem' }}>
          <Link to="/">
            <img
            src="/images/logo.svg"
            alt="聚碩仁玉"
            style={{ height: '1.75rem', width: 'auto' }}
          />
          </Link>
        </div>
        <div className="relative flex ">
          {/* 子頁面導航列 - blur 背景 */}
          <div
            className="flex items-center"
            style={{
              height: '80px',
              paddingLeft: '1.5rem',
              paddingRight: '0.5rem',
              gap: '0.25rem',
            }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className={`nav-link relative px-3 py-1.5 transition-all duration-300 whitespace-nowrap ${
                  isCurrentPage(item.link)
                    ? 'text-white active'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                }}
              >
                <span className='text-white/50 me-1'>
                  {item.id}
                </span>
                {item.name}
                {/* 底線動畫元素 */}
                <span className="nav-underline absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] bg-white transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* MenuButton */}
          <MenuButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            size={80}
            position="relative"
          />
        </div>
      </div>

      {/* 全屏選單 */}
      <FullscreenMenuAlt isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* 底線動畫樣式 */}
      <style>{`
        .nav-link .nav-underline {
          width: 5%;
          opacity: 0;
        }

        .nav-link:hover .nav-underline,
        .nav-link:active .nav-underline {
          width: 40%;
          opacity: 0.5;
        }

        .nav-link.active .nav-underline {
          width: 40%;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default SubpageMenuBar;

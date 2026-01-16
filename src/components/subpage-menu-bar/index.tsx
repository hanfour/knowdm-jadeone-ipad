import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItem {
  id: string;
  name: string;
  link: string;
}

export interface SubpageMenuBarProps {
  items: NavItem[];
  logo?: string;
  logoAlt?: string;
  homeLink?: string;
  menuButton?: React.ReactNode;
  fullscreenMenu?: React.ReactNode;
  backgroundColor?: string;
  height?: string;
}

const SubpageMenuBar: React.FC<SubpageMenuBarProps> = ({
  items,
  logo = '/images/logo.svg',
  logoAlt = 'Logo',
  homeLink = '/',
  menuButton,
  fullscreenMenu,
  backgroundColor = '#0b2d2a',
  height = '80px',
}) => {
  const location = useLocation();

  // 判斷是否為當前頁面
  const isCurrentPage = (link: string) => {
    return location.pathname === link;
  };

  return (
    <>
      {/* 右上角導航列容器 */}
      <div
        className="fixed top-0 right-0 z-[200] flex justify-between items-stretch w-full backdrop-blur-md"
        style={{ backgroundColor }}
      >
        <div className="logo flex items-center" style={{ paddingLeft: '2rem' }}>
          <Link to={homeLink}>
            <img
              src={logo}
              alt={logoAlt}
              style={{ height: '1.75rem', width: 'auto' }}
            />
          </Link>
        </div>
        <div className="relative flex">
          {/* 子頁面導航列 - blur 背景 */}
          <div
            className="flex items-center"
            style={{
              height,
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
                } text-xsmall`}
                style={{
                  letterSpacing: '0.05em',
                }}
              >
                <span className="text-white/50 me-1">
                  {item.id}
                </span>
                {item.name}
                {/* 底線動畫元素 */}
                <span className="nav-underline absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] bg-white transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* MenuButton slot */}
          {menuButton}
        </div>
      </div>

      {/* 全屏選單 slot */}
      {fullscreenMenu}

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

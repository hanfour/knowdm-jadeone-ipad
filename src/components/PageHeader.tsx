import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { safeSessionStorage, STORAGE_KEYS } from '../utils/storage';

interface PageHeaderProps {
  theme?: 'white' | 'gold';
  onMenuOpen: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ theme = 'white', onMenuOpen }) => {
  const navigate = useNavigate();

  // 關閉按鈕：清除 sessionStorage 並回到首頁（播放開場動畫）
  const handleClose = () => {
    safeSessionStorage.removeItem(STORAGE_KEYS.HAS_PLAYED_INTRO);
    navigate('/');
  };

  // 根據主題決定樣式
  const themeStyles = {
    white: {
      logo: '/images/logo-white.svg',
      textColor: 'text-white',
      bgColor: 'bg-white',
    },
    gold: {
      logo: '/images/logo-gold.svg',
      textColor: 'text-[#68583f]',
      bgColor: 'bg-[#68583f]',
    },
  };

  const styles = themeStyles[theme];

  return (
    <>
      {/* Logo - 左上 */}
      <div
        className="absolute z-20"
        style={{ top: '2rem', left: '2rem' }}
      >
        <Link to="/" className="block">
          <img
            src={styles.logo}
            alt="聚碩仁玉"
            style={{ height: '5rem', width: 'auto' }}
          />
        </Link>
      </div>

      {/* 關閉按鈕 - 右上 */}
      {/* <button
        onClick={handleClose}
        className={`absolute z-20 ${styles.textColor} opacity-60 hover:opacity-100 active:opacity-100 transition-opacity`}
        style={{ top: '2rem', right: '2rem' }}
        aria-label="返回首頁並播放開場動畫"
      >
        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button> */}

      {/* MENU 按鈕 - 左側 */}
      <button
        onClick={onMenuOpen}
        className={`menu-button absolute top-1/2 -translate-y-1/2 z-20 ${styles.textColor} flex flex-col items-center group transition-opacity`}
        style={{ left: '2rem', gap: '1rem' }}
        aria-label="開啟主選單"
      >
        <div className="flex items-center" style={{ gap: '0.3rem', height: '2.5rem' }} aria-hidden="true">
          <div className={`${styles.bgColor} transition-all duration-300 menu-line-1`} style={{ width: '0.0725rem', height: '2rem' }} />
          <div className={`${styles.bgColor} transition-all duration-300 menu-line-2`} style={{ width: '0.0725rem', height: '2rem' }} />
          <div className={`${styles.bgColor} transition-all duration-300 menu-line-3`} style={{ width: '0.0725rem', height: '2rem' }} />
        </div>
        <div className="writing-mode-vertical" style={{ fontSize: '0.75rem', letterSpacing: '0.3em' }}>MENU</div>
      </button>

      {/* MENU 按鈕動畫樣式 */}
      <style>{`
        .menu-button:hover .menu-line-1,
        .menu-button:active .menu-line-1 {
          height: 1.6rem !important;
          margin-bottom: 0.4rem;
        }

        .menu-button:hover .menu-line-2,
        .menu-button:active .menu-line-2 {
          height: 1.6rem !important;
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
        }

        .menu-button:hover .menu-line-3,
        .menu-button:active .menu-line-3 {
          height: 1.6rem !important;
          margin-top: 0.4rem;
        }
      `}</style>
    </>
  );
};

export default PageHeader;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FullscreenMenu from '../components/FullscreenMenu';
import { safeSessionStorage, STORAGE_KEYS } from '../utils/storage';

const VideoPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 關閉按鈕：清除 sessionStorage 並回到首頁（播放開場動畫）
  const handleClose = () => {
    safeSessionStorage.removeItem(STORAGE_KEYS.HAS_PLAYED_INTRO);
    navigate('/');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/green-diamond-pattern.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Logo - 左上 */}
      <div
        className="absolute z-20"
        style={{ top: '2rem', left: '2rem' }}
      >
        <Link to="/" className="block">
          <img
            src="/images/logo-gold.svg"
            alt="聚碩仁玉"
            style={{ height: '5rem', width: 'auto' }}
          />
        </Link>
      </div>

      {/* 關閉按鈕 - 右上 */}
      <button
        onClick={handleClose}
        className="absolute z-20 text-white opacity-60 hover:opacity-100 active:opacity-100 transition-opacity"
        style={{ top: '2rem', right: '2rem' }}
        aria-label="返回首頁並播放開場動畫"
      >
        <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* MENU 按鈕 - 左側 */}
      <button
        onClick={() => setMenuOpen(true)}
        className="absolute top-1/2 -translate-y-1/2 z-20 text-white flex flex-col items-center hover:opacity-70 active:opacity-70 transition-opacity"
        style={{ left: '2rem', gap: '1rem' }}
        aria-label="開啟主選單"
      >
        <div className="flex flex-col" style={{ gap: '0.375rem' }} aria-hidden="true">
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
          <div className="bg-white" style={{ width: '1.75rem', height: '0.125rem' }} />
        </div>
        <div className="writing-mode-vertical" style={{ fontSize: '0.75rem', letterSpacing: '0.3em' }}>MENU</div>
      </button>

      {/* 中央內容 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1
            className="font-light"
            style={{ fontSize: '3rem', letterSpacing: '0.2em', marginBottom: '1rem' }}
          >
            企業影片
          </h1>
          <p
            className="text-white/60"
            style={{ fontSize: '1rem', letterSpacing: '0.1em' }}
          >
            頁面建置中
          </p>
        </div>
      </div>

      {/* 全屏選單 */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default VideoPage;

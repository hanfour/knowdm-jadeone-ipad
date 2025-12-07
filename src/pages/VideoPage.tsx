import React, { useState } from 'react';
import FullscreenMenu from '../components/FullscreenMenu';
import PageHeader from '../components/PageHeader';

const VideoPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/green-diamond-pattern.jpg)' }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* 頁面 Header */}
      <PageHeader theme="white" onMenuOpen={() => setMenuOpen(true)} />

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

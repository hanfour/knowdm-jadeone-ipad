import React from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

const VideoPage: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/green-diamond-pattern.jpg)', top: '80px' }}
      />
      <div className="absolute inset-0 bg-black/60" style={{ top: '80px' }} />

      {/* 右上角子頁面導航列 + MenuButton */}
      <SubpageMenuBar />

      {/* 中央內容 */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ top: '80px' }}>
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
    </div>
  );
};

export default VideoPage;

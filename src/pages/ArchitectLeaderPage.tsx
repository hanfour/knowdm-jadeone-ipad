import React, { useState } from 'react';
import FullscreenMenu from '../components/FullscreenMenu';
import PageHeader from '../components/PageHeader';

const ArchitectLeaderPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // 人物圖片 URL
  const personImage = 'https://picsum.photos/g/600/1080';

  // 歷年項目列表
  const projectHistory = [
    '2015福樺閱、2012福樺謙邸、2010福樺謙禮、2010福樺雲朗、',
    '2008福樺至善、2007福樺謙璽、2006大觀文明、',
    '2005福樺君悅、2004福樺水悅',
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 左側背景 - 模糊放大的人物圖片 */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${personImage})`,
            filter: 'blur(20px)',
            transform: 'scale(1.3)',
          }}
        />
        {/* 暗色遮罩 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 左側人物圖片 - 左邊留空 15%，圖片佔 35% */}
      <div
        className="absolute top-0 h-full"
        style={{ left: '15%', width: '35%' }}
      >
        <img
          src={personImage}
          alt="業主形象照"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 右側內容區 */}
      <div
        className="absolute right-0 top-0 h-full w-1/2 flex flex-col justify-center"
        style={{ padding: '4rem', paddingLeft: '3rem' }}
      >
        <div className="text-white" style={{ maxWidth: '36rem' }}>
          {/* 標題 */}
          <h1
            className="font-light"
            style={{ fontSize: '2.5rem', letterSpacing: '0.15em', marginBottom: '2rem' }}
          >
            獨領經典 風格執筆
          </h1>

          {/* 主要描述 */}
          <div
            className="mt-12 relative"
            style={{ paddingLeft: '1rem' }}
          >
            {/* 左側裝飾線 */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-600/80 via-amber-400/60 to-transparent"
            />
            <div style={{ fontSize: '1rem', lineHeight: '2',filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.25))', }}>
              <p>
                以建築，塑造國際的生活高度。在聚碩建築眼中，住宅不是被複製的格局，而是一件獨一無二、經得起時間考驗的藝術品。從比例的拿捏中尋找和諧，讓空間在尺度之間呼吸；在光影的流動裡，創造日夜的韻律與生活的詩意；透過材質的打磨，賦予建築高度質感，讓居者觸摸到時光的厚度。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 頁面 Header */}
      <PageHeader theme="white" onMenuOpen={() => setMenuOpen(true)} />

      {/* 全屏選單 */}
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default ArchitectLeaderPage;

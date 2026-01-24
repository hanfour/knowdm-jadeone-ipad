import React, { useState, useEffect } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';
import CloseButton from '../components/close-button';
import RippleButton from '../components/ripple-button';

const ArchitectLeaderPage: React.FC = () => {

  // 滿版背景圖片 URL
  const backgroundImage = '/images/b1/architect-leader-bg.webp';

  // ===== 飛入動畫設定 =====
  const charDelay = 0.12;  // 每個字的延遲時間（秒）- 較慢以產生交錯重疊效果
  const titleText = '琢藝之心';
  const subtitleText = '創作名宅界經典';
  const smallTextDelay = 0;  // 小字先出現
  const titleStartDelay = 0.6;  // 小字淡入後，第一行開始飛入
  const subtitleStartDelay = titleStartDelay + titleText.length * charDelay + 0.3; // 第一行完成後，第三行開始飛入

  // 動畫狀態
  const [isAnimated, setIsAnimated] = useState(false);

  // 影片彈窗狀態
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  // 頁面載入時觸發動畫
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 滿版背景圖片 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ top: '80px' }}>
        <img
          src={backgroundImage}
          alt="建築領導者背景"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center center',
            transform: isAnimated
              ? 'scale(1) translateX(0)'
              : 'scale(1.05) translateX(-1%)',
            transition: 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        {/* 右側漸層遮罩 - 讓右側文字更清晰 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, transparent 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>

      {/* 右上角子頁面導航列 + MenuButton */}
      <SubpageMenuBar sectionIndex={1} />

      {/* 橫向飛入文字區域 */}
      <div
        className="absolute z-10 flex flex-col items-start"
        style={{
          left: '6%',
          bottom: '12%',
        }}
      >
        {/* 第一行：琢藝之心 - 橫排，每字從左上飛入 */}
        <h2
          className="text-white text-h2 font-light"
          style={{
            letterSpacing: '0.2em',
          }}
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                textShadow: '2px 2px 15px rgba(0,0,0,0.7)',
                transform: isAnimated
                  ? 'translate(0, 0) scale(1)'
                  : 'translate(-100px, -100px) scale(1.8)',
                opacity: isAnimated ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${titleStartDelay + index * charDelay}s, opacity 0.6s ease-out ${titleStartDelay + index * charDelay}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* 第二行：New House New Life - 小字，不需要飛入動態，只淡入 */}
        <p
          className="text-[#f5e6b8] text-body italic font-extrabold"
          style={{
            fontFamily: '"Apple Chancery", "Lucida Calligraphy", cursive',
            letterSpacing: '0.025em',
            marginLeft: '0.5rem',
            opacity: isAnimated ? 1 : 0,
            transition: `opacity 0.6s ease-out ${smallTextDelay}s`,
          }}
        >
          New House New Life
        </p>

        {/* 第三行：創作名宅界經典 - 橫排，每字從左上飛入 */}
        <h2
          className="text-white text-h2 font-light"
          style={{
            letterSpacing: '0.2em',
          }}
        >
          {subtitleText.split('').map((char, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                textShadow: '2px 2px 15px rgba(0,0,0,0.7)',
                transform: isAnimated
                  ? 'translate(0, 0) scale(1)'
                  : 'translate(-100px, -100px) scale(1.8)',
                opacity: isAnimated ? 1 : 0,
                transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${subtitleStartDelay + index * charDelay}s, opacity 0.6s ease-out ${subtitleStartDelay + index * charDelay}s`,
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* 右側內容區 */}
      <div
        className="absolute right-0 h-full w-1/2 flex flex-col justify-center"
        style={{ top: '80px', padding: '4rem', paddingLeft: '3rem' }}
      >
        <div className="text-white" style={{ maxWidth: '36rem' }}>
          {/* 標題 */}
          <div 
            className="mt-6 relative"
            style={{ paddingLeft: '1rem' }}>
            {/* 左側裝飾線 */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d4a853]/80 via-[#f5e6b8]/60 to-transparent"
            />
            <h1
              className="text-[#f5e6b8] text-h2"
              style={{ letterSpacing: '0.15em', }}
            >
              聚碩建設 李碩祺 董事長
            </h1>
            <h3
              className="text-[#f5e6b8] text-large font-medium mt-4"
              style={{ letterSpacing: '0.15em', }}
            >
              獨領經典 風格執筆
            </h3>
            <div className='mt-2 text-body text-justify leading-relaxed' style={{ filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.25))', }}>
              <p>
                以建築，塑造國際的生活高度。在聚碩建築眼中，住宅不是被複製的格局，而是一件獨一無二、經得起時間考驗的藝術品。從比例的拿捏中尋找和諧，讓空間在尺度之間呼吸；在光影的流動裡，創造日夜的韻律與生活的詩意；透過材質的打磨，賦予建築高度質感，讓居者觸摸到時光的厚度。
              </p>
            </div>

            {/* 團隊訪談按鈕 */}
            <div className="mt-8">
              <RippleButton onClick={() => setCurrentVideoId('VB6m9Kb6ha4')}>
                <span>團隊訪談</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </RippleButton>
            </div>
          </div>
        </div>
      </div>

      {/* 影片彈窗 */}
      {currentVideoId && (
        <>
          <style>{`
            @keyframes videoSlideDown {
              0% {
                transform: translateY(-100%);
              }
              100% {
                transform: translateY(0);
              }
            }

            @keyframes backdropFadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .video-slide-animation {
              animation: videoSlideDown 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            .backdrop-fade-animation {
              animation: backdropFadeIn 0.3s ease-out forwards;
            }
          `}</style>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-fade-animation"
            style={{ zIndex: 9999 }}
            onClick={() => setCurrentVideoId(null)}
          >
            {/* 影片容器 */}
            <div
              className="relative w-full h-full video-slide-animation"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                key={currentVideoId}
                className="w-full h-full border-0"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                title="團隊訪談影片"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <CloseButton onClick={(e) => { e.stopPropagation(); setCurrentVideoId(null); }} />
          </div>
        </>
      )}
    </div>
  );
};

export default ArchitectLeaderPage;

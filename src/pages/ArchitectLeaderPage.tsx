import React, { useState, useEffect } from 'react';
import SubpageMenuBar from '../components/SubpageMenuBar';

const ArchitectLeaderPage: React.FC = () => {

  // 人物圖片 URL
  const personImage = '/images/b1/李碩祺董事長-2.jpg';

  // ===== 飛入動畫設定 =====
  const charDelay = 0.12;  // 每個字的延遲時間（秒）- 較慢以產生交錯重疊效果
  const titleText = '琢藝之心';
  const subtitleText = '創作名宅界經典';
  const smallTextDelay = 0;  // 小字先出現
  const titleStartDelay = 0.6;  // 小字淡入後，第一行開始飛入
  const subtitleStartDelay = titleStartDelay + titleText.length * charDelay + 0.3; // 第一行完成後，第三行開始飛入

  // 動畫狀態
  const [isAnimated, setIsAnimated] = useState(false);

  // 頁面載入時觸發動畫
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* 左側背景 - 模糊放大的人物圖片 */}
      <div className="absolute left-0 w-full h-full overflow-hidden" style={{ top: '80px' }}>
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${personImage})`,
            filter: 'blur(30px)',
            transform: 'scale(1.88)',
            backgroundPosition: '50% -12%'
          }}
        />
        {/* 暗色遮罩 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 右上角子頁面導航列 + MenuButton */}
      <SubpageMenuBar sectionIndex={1} />

      {/* 左側人物圖片 - 左邊留空 15%，圖片佔 35% */}
      <div
        className="absolute h-full overflow-hidden"
        style={{ top: '80px', left: '15%', width: '35%' }}
      >
        <img
          src={personImage}
          alt="業主形象照"
          className="w-full h-full object-cover"
          style={{
            objectPosition: 'center center',
            transform: isAnimated
              ? 'scale(1) translateX(0)'
              : 'scale(1.1) translateX(-3%)',
            transition: 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>

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
          className="text-white font-light"
          style={{
            fontSize: '3.5rem',
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
          className="text-[#f5e6b8] italic font-extrabold"
          style={{
            fontSize: '1rem',
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
          className="text-white font-light"
          style={{
            fontSize: '3.5rem',
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
              className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4a853]/80 via-[#f5e6b8]/60 to-transparent"
            />
            <h1
              className="text-[#f5e6b8]"
              style={{ fontSize: '2rem', letterSpacing: '0.15em', }}
            >
              聚碩建設
            </h1>
            <h3
              className="font-light text-white mt-4"
              style={{ fontSize: '2rem', letterSpacing: '0.15em', }}
            >
              獨領經典 風格執筆
            </h3>
            <div className='mt-2 pb-12' style={{ fontSize: '1rem', lineHeight: '2',filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.25))', }}>
              <p>
                以建築，塑造國際的生活高度。在聚碩建築眼中，住宅不是被複製的格局，而是一件獨一無二、經得起時間考驗的藝術品。從比例的拿捏中尋找和諧，讓空間在尺度之間呼吸；在光影的流動裡，創造日夜的韻律與生活的詩意；透過材質的打磨，賦予建築高度質感，讓居者觸摸到時光的厚度。
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ArchitectLeaderPage;

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

// 動畫開關設定
const ANIMATION_CONFIG = {
  phase0: false,  // 第一幕：聽樹先生唱歌
  phase1: false,  // 第二幕：公園在宅休閒
  phase3: true,  // 第二段：高訂品味 對味不凡
  phase6: true,  // Logo 階段
};

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  // 根據設定決定起始階段
  const getInitialPhase = () => {
    if (ANIMATION_CONFIG.phase0) return 0;
    if (ANIMATION_CONFIG.phase1) return 1;
    if (ANIMATION_CONFIG.phase3) return 3;
    if (ANIMATION_CONFIG.phase6) return 6;
    return -1; // 全部關閉
  };

  const [phase, setPhase] = useState(getInitialPhase);
  const [textVisible, setTextVisible] = useState<number[]>([]);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // 第一段動畫文字
  const introText1 = '聽樹先生唱歌，看花小姐飛舞。';
  const introText2 = '公園在宅休閒　都會輕旅建築。';

  // 第二段動畫文字
  const mainTitle = '高訂品味 對味不凡';
  const subtitle = '水湳生態核心｜限量 40 席｜25 坪法式寓邸';

  // 清除所有 timeout
  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  }, []);

  // 取得下一個啟用的階段
  const getNextPhase = (currentPhase: number): number => {
    if (currentPhase === 0 && ANIMATION_CONFIG.phase1) return 1;
    if (currentPhase <= 1 && ANIMATION_CONFIG.phase3) return 3;
    if (currentPhase <= 3 && ANIMATION_CONFIG.phase6) return 6;
    return -1; // 結束
  };

  // 跳過開場動畫
  const skipIntro = useCallback(() => {
    clearAllTimeouts();
    setSkipped(true);
    onComplete();
  }, [clearAllTimeouts, onComplete]);

  // 如果所有動畫都關閉，直接完成
  useEffect(() => {
    if (phase === -1) {
      onComplete();
    }
  }, [phase, onComplete]);

  // 開場動畫效果
  useEffect(() => {
    if (skipped || phase === -1) return;

    if (phase === 0 && ANIMATION_CONFIG.phase0) {
      // 第一幕：第一段文字
      const chars = introText1.split('');
      chars.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setTextVisible(prev => [...prev, index]);
        }, index * 150);
        timeoutRefs.current.push(timeout);
      });
      const phaseTimeout = setTimeout(() => {
        setFadeOut(true);
        const nextTimeout = setTimeout(() => {
          setTextVisible([]);
          setFadeOut(false);
          const next = getNextPhase(0);
          if (next === -1) {
            onComplete();
          } else {
            setPhase(next);
          }
        }, 800);
        timeoutRefs.current.push(nextTimeout);
      }, chars.length * 150 + 2000);
      timeoutRefs.current.push(phaseTimeout);
    } else if (phase === 1 && ANIMATION_CONFIG.phase1) {
      // 第二幕：第二段文字
      const chars = introText2.split('');
      chars.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setTextVisible(prev => [...prev, index]);
        }, index * 100);
        timeoutRefs.current.push(timeout);
      });
      const phaseTimeout = setTimeout(() => {
        setFadeOut(true);
        const nextTimeout = setTimeout(() => {
          setTextVisible([]);
          setFadeOut(false);
          const next = getNextPhase(1);
          if (next === -1) {
            onComplete();
          } else {
            setPhase(next);
          }
        }, 800);
        timeoutRefs.current.push(nextTimeout);
      }, chars.length * 100 + 2000);
      timeoutRefs.current.push(phaseTimeout);
    } else if (phase === 3 && ANIMATION_CONFIG.phase3) {
      // 第二段：主標題打字效果
      const chars = mainTitle.split('');
      chars.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setTextVisible(prev => [...prev, index]);
        }, index * 200);
        timeoutRefs.current.push(timeout);
      });
      // 主標題完成後顯示副標題
      const subtitleTimeout = setTimeout(() => {
        setSubtitleVisible(true);
        // 停頓後淡出
        const fadeTimeout = setTimeout(() => {
          setFadeOut(true);
          const logoTimeout = setTimeout(() => {
            setTextVisible([]);
            setSubtitleVisible(false);
            setFadeOut(false);
            const next = getNextPhase(3);
            if (next === -1) {
              onComplete();
            } else {
              setPhase(next);
            }
          }, 1000);
          timeoutRefs.current.push(logoTimeout);
        }, 4000);
        timeoutRefs.current.push(fadeTimeout);
      }, chars.length * 120 + 500);
      timeoutRefs.current.push(subtitleTimeout);
    } else if (phase === 6 && ANIMATION_CONFIG.phase6) {
      // Logo 階段 - 持續停留在此畫面，shine 動畫循環播放
      // 只有點擊跳過才會離開
      const showLogoTimeout = setTimeout(() => {
        setLogoVisible(true);
      }, 300);
      timeoutRefs.current.push(showLogoTimeout);
    }

    return () => {
      clearAllTimeouts();
    };
  }, [phase, skipped, clearAllTimeouts, onComplete]);

  // 如果階段無效，不渲染
  if (phase === -1) return null;

  // 背景組件 - 用於所有階段的共同背景，防止看到主頁面
  const BackgroundLayer = ({ type }: { type: 'green' | 'pattern' }) => (
    <>
      {type === 'green' ? (
        <>
          <div className="absolute inset-0 bg-[#c5cbb8]" />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/green-diamond-pattern.jpg)' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}
    </>
  );

  // 第一幕
  if (phase === 0) {
    return (
      <div
        className="absolute inset-0 cursor-pointer z-[200]"
        onClick={skipIntro}
      >
        <BackgroundLayer type="green" />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="relative z-10 flex items-center">
            <div
              className="text-[#244525] font-light"
              style={{ fontSize: '3rem', letterSpacing: '0.3em', marginRight: '4rem' }}
            >
              {introText1.split('').map((char, index) => (
                <span
                  key={index}
                  className={`transition-opacity duration-500 ${
                    textVisible.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="relative" style={{ width: '16rem', height: '16rem' }}>
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-t from-[#8fbc8f] to-transparent rounded-full opacity-60"
                style={{ bottom: 0, width: '8rem', height: '5rem' }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-[#8b7355]"
                style={{ bottom: '4rem', width: '0.5rem', height: '6rem' }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-[#228b22] rounded-full"
                style={{ bottom: '8rem', width: '10rem', height: '10rem' }}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute text-[#244525] opacity-60 z-10"
          style={{ bottom: '2rem', right: '2rem', fontSize: '0.875rem' }}
        >
          點擊跳過
        </div>
      </div>
    );
  }

  // 第二幕
  if (phase === 1) {
    return (
      <div
        className="absolute inset-0 cursor-pointer z-[200]"
        onClick={skipIntro}
      >
        <BackgroundLayer type="green" />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div
            className="absolute text-[#244525] font-light"
            style={{ top: '25%', right: '25%', fontSize: '2.5rem', letterSpacing: '0.2em' }}
          >
            {introText2.split('').map((char, index) => (
              <span
                key={index}
                className={`transition-opacity duration-300 ${
                  textVisible.includes(index) ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="absolute left-0 right-0" style={{ bottom: 0, height: '12rem' }}>
            <div className="absolute left-0 bottom-0 flex items-end" style={{ gap: '0.25rem' }}>
              <div className="bg-gray-400/40" style={{ width: '2rem', height: '8rem' }} />
              <div className="bg-gray-400/40" style={{ width: '1.5rem', height: '10rem' }} />
              <div className="bg-gray-400/40" style={{ width: '2.5rem', height: '7rem' }} />
              <div className="bg-gray-400/40" style={{ width: '2rem', height: '9rem' }} />
              <div className="bg-gray-400/40" style={{ width: '3rem', height: '6rem' }} />
            </div>
            <div
              className="absolute right-0 bg-[#2d5a2d] rounded-tl-full"
              style={{ bottom: 0, left: '6rem', height: '4rem' }}
            />
            <div
              className="absolute bg-[#228b22] rounded-t-full"
              style={{ bottom: '3rem', left: '12rem', width: '5rem', height: '6rem' }}
            />
            <div
              className="absolute bg-[#32cd32] rounded-t-full"
              style={{ bottom: '3rem', left: '14rem', width: '4rem', height: '5rem' }}
            />
            <div className="absolute flex" style={{ bottom: '4rem', left: '60%', gap: '1rem' }}>
              <div className="bg-white/80 rounded-t-full" style={{ width: '0.75rem', height: '2rem' }} />
              <div className="bg-white/80 rounded-t-full" style={{ width: '0.75rem', height: '1.5rem' }} />
              <div className="bg-white/80 rounded-t-full" style={{ width: '0.75rem', height: '1.75rem' }} />
              <div className="bg-white/80 rounded-t-full" style={{ width: '0.75rem', height: '1.25rem' }} />
            </div>
          </div>
        </div>
        <div
          className="absolute text-[#244525] opacity-60 z-10"
          style={{ bottom: '2rem', right: '2rem', fontSize: '0.875rem' }}
        >
          點擊跳過
        </div>
      </div>
    );
  }

  // 第二段動畫：主標題 + 副標題
  if (phase === 3) {
    return (
      <div
        className="absolute inset-0 cursor-pointer z-[200]"
        onClick={skipIntro}
      >
        <BackgroundLayer type="pattern" />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="relative z-10 text-center flex flex-col justify-center items-center">
            {/* 主標題 - 打字效果 */}
            <div
              className="text-white font-light"
              style={{ fontSize: '3.75rem', letterSpacing: '0.3em', marginBottom: '2rem' }}
            >
              {mainTitle.split('').map((char, index) => (
                <span
                  key={index}
                  className={`transition-opacity duration-300 ${
                    textVisible.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* 副標題 - Fade up */}
            <div
              className={`text-white/80 transition-all duration-700 ${
                subtitleVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ fontSize: '1.5rem', letterSpacing: '0.2em' }}
            >
              {subtitle}
            </div>
          </div>
        </div>
        <div
          className="absolute text-white/60 z-10"
          style={{ bottom: '2rem', right: '2rem', fontSize: '0.875rem' }}
        >
          點擊跳過
        </div>
      </div>
    );
  }

  // Logo 階段
  if (phase === 6) {
    return (
      <div
        className="absolute inset-0 cursor-pointer z-[200]"
        onClick={skipIntro}
      >
        <BackgroundLayer type="pattern" />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {/* Logo with shine effect */}
          <div
            className={`relative z-10 transition-all duration-1000 ${
              logoVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            {/* Logo 容器 - 使用 CSS mask 讓 shine 只作用在 logo 上 */}
            <div className="logo-container">
              {/* 基礎 Logo */}
              <img
                src="/images/logo-gold.svg"
                alt="聚碩仁玉"
                className="logo-base"
                style={{ height: '12rem', width: 'auto' }}
              />
              {/* Shine 層 - 使用相同的 logo 作為遮罩 */}
              <div className="logo-shine-layer">
                <img
                  src="/images/logo-gold.svg"
                  alt=""
                  style={{ height: '12rem', width: 'auto', visibility: 'hidden' }}
                />
                <div className="shine-effect" />
              </div>
            </div>
          </div>
        </div>

        {/* Shine 效果的 CSS */}
        <style>{`
          .logo-container {
            position: relative;
            display: inline-block;
          }

          .logo-base {
            display: block;
          }

          .logo-shine-layer {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            /* 使用 logo 圖片作為遮罩 */
            -webkit-mask-image: url('/images/logo-gold.svg');
            mask-image: url('/images/logo-gold.svg');
            -webkit-mask-size: contain;
            mask-size: contain;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
          }

          .shine-effect {
            position: absolute;
            top: 0;
            left: -100%;
            width: 60%;
            height: 100%;
            background: linear-gradient(
              105deg,
              transparent 20%,
              rgba(255, 255, 255, 0.1) 35%,
              rgba(255, 255, 255, 0.4) 45%,
              rgba(255, 255, 255, 0.8) 50%,
              rgba(255, 255, 255, 0.4) 55%,
              rgba(255, 255, 255, 0.1) 65%,
              transparent 80%
            );
            animation: shineMove 3.5s ease-in-out infinite;
          }

          @keyframes shineMove {
            0% {
              left: -100%;
            }
            60%, 100% {
              left: 200%;
            }
          }
        `}</style>

        <div
          className="absolute text-white/60 z-10"
          style={{ bottom: '2rem', right: '2rem', fontSize: '0.875rem' }}
        >
          點擊跳過
        </div>
      </div>
    );
  }

  // 預設（不應該到達這裡）
  return null;
};

export default IntroAnimation;

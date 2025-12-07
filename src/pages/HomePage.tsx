import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  LightRaysBackground,
  SunlightBackground,
  LightBlobsBackground,
  ClickRippleEffect
} from '../components/backgrounds';
import FullscreenMenu from '../components/FullscreenMenu';
import IntroAnimation from '../components/IntroAnimation';
import { menuSections } from '../config/menu';
import { safeSessionStorage, STORAGE_KEYS } from '../utils/storage';

// 點擊水波紋介面
interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

// 背景效果類型
type BackgroundEffectType = 'light-blobs' | 'light-rays' | 'sunlight';

const HomePage: React.FC = () => {
  // 檢查是否已經播放過動畫（使用 sessionStorage）
  const hasPlayedIntro = safeSessionStorage.getItem(STORAGE_KEYS.HAS_PLAYED_INTRO) === 'true';
  const [showIntro, setShowIntro] = useState(!hasPlayedIntro);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [clickRipples, setClickRipples] = useState<ClickRipple[]>([]);
  const [pressedArrow, setPressedArrow] = useState<'prev' | 'next' | null>(null);
  const rippleIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 背景效果切換
  const [backgroundEffect] = useState<BackgroundEffectType>('light-blobs');

  // 重新播放開場動畫
  const restartIntro = useCallback(() => {
    safeSessionStorage.removeItem(STORAGE_KEYS.HAS_PLAYED_INTRO);
    setShowIntro(true);
  }, []);

  const nextMenu = () => {
    setCurrentMenuIndex(prev => (prev + 1) % menuSections.length);
  };

  const prevMenu = () => {
    setCurrentMenuIndex(prev => (prev - 1 + menuSections.length) % menuSections.length);
  };

  // 處理點擊產生水波紋
  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: ClickRipple = {
      id: rippleIdRef.current++,
      x,
      y,
    };

    setClickRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setClickRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2500);
  }, []);

  const currentMenu = menuSections[currentMenuIndex];

  // 渲染背景效果
  const renderBackgroundEffect = () => {
    switch (backgroundEffect) {
      case 'light-rays':
        return (
          <LightRaysBackground
            rayCount={12}
            animationDuration={7.5}
            angle={-35}
            opacity={0.5}
          />
        );
      case 'sunlight':
        return <SunlightBackground />;
      case 'light-blobs':
      default:
        return <LightBlobsBackground />;
    }
  };

  return (
    <>
      {/* 開場動畫 */}
      {showIntro && (
        <IntroAnimation onComplete={() => {
          safeSessionStorage.setItem(STORAGE_KEYS.HAS_PLAYED_INTRO, 'true');
          setShowIntro(false);
        }} />
      )}

      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden bg-black cursor-pointer"
        onClick={handleBackgroundClick}
      >
        {/* 背景底圖 - 綠色菱格底紋 */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: 'url(/images/green-diamond-pattern.jpg)' }}
        />

        {/* 背景效果 */}
        {renderBackgroundEffect()}

        {/* 點擊水波紋效果 */}
        <ClickRippleEffect ripples={clickRipples} />

        {/* 覆蓋層漸層 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0.2), transparent)' }}
        />

        {/* Logo - 左上 */}
        <div
          className="absolute z-20"
          style={{ top: '2rem', left: '2rem' }}
          onClick={e => e.stopPropagation()}
        >
          <img
            src="/images/logo-gold.svg"
            alt="聚碩仁玉"
            style={{ height: '5rem', width: 'auto' }}
          />
        </div>

        {/* 開場動畫按鈕 - 右上 */}
        <button
          onClick={(e) => { e.stopPropagation(); restartIntro(); }}
          className="absolute z-20 text-white/60 hover:text-white active:text-white border border-white/40 hover:border-white active:border-white transition-all"
          style={{
            top: '2rem',
            right: '2rem',
            padding: '0.25rem 1rem',
            fontSize: '0.875rem',
            letterSpacing: '0.1em',
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          開場動畫
        </button>

        {/* MENU 按鈕 - 左側 */}
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(true); }}
          className="menu-button absolute top-1/2 -translate-y-1/2 z-20 text-white flex flex-col items-center group transition-opacity"
          style={{ left: '2rem', gap: '1rem' }}
          aria-label="開啟主選單"
        >
          <div className="flex items-center" style={{ gap: '0.3rem', height: '2.5rem' }} aria-hidden="true">
            <div className="bg-white transition-all duration-300 menu-line-1" style={{ width: '0.0725rem', height: '2rem' }} />
            <div className="bg-white transition-all duration-300 menu-line-2" style={{ width: '0.0725rem', height: '2rem' }} />
            <div className="bg-white transition-all duration-300 menu-line-3" style={{ width: '0.0725rem', height: '2rem' }} />
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

        {/* 右側頁碼指示器 */}
        <nav
          className="absolute z-20 flex flex-col items-end"
          style={{ right: '2rem', bottom: '25%', gap: '0.5rem' }}
          onClick={e => e.stopPropagation()}
          aria-label="選單頁碼"
        >
          <span className="text-white tracking-widest" style={{ fontSize: '1rem', marginBottom: '0.5rem' }} aria-live="polite">
            0{currentMenuIndex + 1}
          </span>
          {menuSections.map((section, idx) => (
            <button
              key={`page-${idx}`}
              onClick={() => setCurrentMenuIndex(idx)}
              className="flex items-center justify-end transition-all duration-300"
              style={{
                minHeight: '1.25rem',
                width: idx === currentMenuIndex ? '2rem' : '1rem'
              }}
              aria-label={`前往${section.title.join('')}`}
              aria-current={idx === currentMenuIndex ? 'true' : undefined}
            >
              <div
                className={`w-full transition-all duration-300 ${
                  idx === currentMenuIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60 active:bg-white/60'
                }`}
                style={{ height: '1px' }}
                aria-hidden="true"
              />
            </button>
          ))}
        </nav>

        {/* 右側內容區 */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex flex-col" onClick={e => e.stopPropagation()}>
          {/* 上區塊：25% 留白 */}
          <div className="h-[25%]" />

          {/* 中區塊：50% 選單內容 */}
          <div
            className="h-[50%] flex flex-col justify-end relative"
            style={{ paddingLeft: '3rem', paddingRight: '5rem' }}
          >
            {/* 分類標籤 */}
            <div
              className="text-[#f3cf9a]"
              style={{ fontSize: '1.25rem', letterSpacing: '0.3em', marginBottom: '1rem' }}
            >
              {currentMenu.category}
            </div>

            {/* 主標題與子選單容器 */}
            <div
              className="text-left"
              onMouseEnter={() => setHoveredMenu(currentMenuIndex)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {/* 主標題 - 可點擊區域 */}
              <div
                className="font-light text-white cursor-pointer"
                style={{ fontSize: '3.75rem', letterSpacing: '0.2em', lineHeight: '1.25em' }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setHoveredMenu(prev => prev === currentMenuIndex ? null : currentMenuIndex);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHoveredMenu(prev => prev === currentMenuIndex ? null : currentMenuIndex);
                }}
              >
                {currentMenu.title[0]}<br/>
                {currentMenu.title[1]}
              </div>

              {/* 子選單 - hover 時向下展開 */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  hoveredMenu === currentMenuIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  maxHeight: hoveredMenu === currentMenuIndex ? '31.25rem' : '0',
                  marginTop: hoveredMenu === currentMenuIndex ? '1.5rem' : '0'
                }}
              >
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(4, max-content)',
                    gap: '0.25rem 0.75rem'
                  }}
                >
                  {currentMenu.items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="text-white/80 hover:text-white active:text-white border border-transparent hover:border-white/60 active:border-white/60 transition-colors whitespace-nowrap"
                      style={{
                        fontSize: '1rem',
                        padding: '0.375rem 0.75rem'
                      }}
                    >
                      <span className="opacity-50" style={{ marginRight: '0.5rem' }}>{item.id}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 下區塊：25% 箭頭按鈕 */}
          <div
            className="h-[25%] flex items-start"
            style={{ paddingTop: '2rem', paddingLeft: '3rem' }}
            role="navigation"
            aria-label="選單切換"
          >
            <div className="flex items-center text-white" style={{ gap: '1.5rem' }}>
              <button
                onClick={prevMenu}
                onTouchStart={() => setPressedArrow('prev')}
                onTouchEnd={() => setPressedArrow(null)}
                onMouseDown={() => setPressedArrow('prev')}
                onMouseUp={() => setPressedArrow(null)}
                onMouseLeave={() => setPressedArrow(null)}
                className={`transition-all duration-150 ${
                  pressedArrow === 'prev' ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-125'
                }`}
                style={{ fontSize: '1.5rem' }}
                aria-label="上一個選單"
              >
                <span
                  className="inline-block transition-transform duration-150"
                  style={{ transform: pressedArrow === 'prev' ? 'translateY(-4px)' : 'translateY(0)' }}
                  aria-hidden="true"
                >
                  ∧
                </span>
              </button>
              <button
                onClick={nextMenu}
                onTouchStart={() => setPressedArrow('next')}
                onTouchEnd={() => setPressedArrow(null)}
                onMouseDown={() => setPressedArrow('next')}
                onMouseUp={() => setPressedArrow(null)}
                onMouseLeave={() => setPressedArrow(null)}
                className={`transition-all duration-150 ${
                  pressedArrow === 'next' ? 'opacity-100 scale-110' : 'opacity-60 hover:opacity-100 hover:scale-125'
                }`}
                style={{ fontSize: '1.5rem' }}
                aria-label="下一個選單"
              >
                <span
                  className="inline-block transition-transform duration-150"
                  style={{ transform: pressedArrow === 'next' ? 'translateY(4px)' : 'translateY(0)' }}
                  aria-hidden="true"
                >
                  ∨
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 全屏選單 */}
        <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
};

export default HomePage;

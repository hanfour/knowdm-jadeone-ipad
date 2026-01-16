import React, { useState } from 'react';
import AuroraBackground from '../components/backgrounds/AuroraBackground';
import LightRaysBackground from '../components/backgrounds/LightRaysBackground';
import RippleBackground from '../components/backgrounds/RippleBackground';
import SunlightBackground from '../components/backgrounds/SunlightBackground';
import LightBlobsBackground from '../components/backgrounds/LightBlobsBackground';
import ClickRippleEffect from '../components/backgrounds/ClickRippleEffect';
import ParallaxCarouselBackground from '../components/backgrounds/ParallaxCarouselBackground';

/**
 * 背景效果元件集合
 * 包含多種視覺特效背景，用於頁面裝飾與視覺增強
 */
export default {
  title: 'Backgrounds',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

// ============================================
// Aurora Background
// ============================================

/**
 * 極光背景效果
 * 帶有條紋與彩虹漸層的動態背景
 */
export const Aurora = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <AuroraBackground />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>極光背景效果</h1>
        <p>Aurora Background - 動態漸層條紋效果</p>
      </div>
    </div>
  ),
};

/**
 * 極光背景 - 自訂顏色
 */
export const AuroraCustomColors = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#0b2d2a' }}>
      <AuroraBackground
        gradientColors={['#d4a853', '#f5e6b8', '#ffffff', '#f5e6b8', '#d4a853']}
        maskPosition="center"
        saturation={120}
        blurAmount={15}
      />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>金色極光</h1>
        <p>使用品牌金色的極光效果</p>
      </div>
    </div>
  ),
};

// ============================================
// Light Rays Background
// ============================================

/**
 * 光線背景效果
 * 斜向光線照射效果，帶有脈動動畫
 */
export const LightRays = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <LightRaysBackground />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>光線背景效果</h1>
        <p>Light Rays Background - 斜向光線照射效果</p>
      </div>
    </div>
  ),
};

/**
 * 光線背景 - 金色光線
 */
export const LightRaysGold = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#0b2d2a' }}>
      <LightRaysBackground
        rayColor="212, 168, 83"
        rayCount={12}
        animationDuration={4}
        angle={-45}
      />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>金色光線</h1>
        <p>使用品牌金色的光線效果</p>
      </div>
    </div>
  ),
};

// ============================================
// Ripple Background
// ============================================

/**
 * 漣漪背景效果
 * 點擊或自動產生水波漣漪效果
 */
export const Ripple = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <RippleBackground autoRipple={true} autoRippleInterval={1500} />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>漣漪背景效果</h1>
        <p>Ripple Background - 點擊畫面產生漣漪</p>
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>自動漣漪已啟用，也可點擊產生漣漪</p>
      </div>
    </div>
  ),
};

/**
 * 漣漪背景 - 金色漣漪
 */
export const RippleGold = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#0b2d2a' }}>
      <RippleBackground
        rippleColors={['rgba(212, 168, 83, 0.5)', 'rgba(212, 168, 83, 0.2)', 'rgba(212, 168, 83, 0)']}
        autoRipple={true}
        autoRippleInterval={2000}
        maxRippleSize={120}
      />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>金色漣漪</h1>
        <p>使用品牌金色的漣漪效果</p>
      </div>
    </div>
  ),
};

// ============================================
// Sunlight Background
// ============================================

/**
 * 陽光背景效果
 * 模擬從左上角照射的暖陽光暈效果
 */
export const Sunlight = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <SunlightBackground />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>陽光背景效果</h1>
        <p>Sunlight Background - 左上角暖陽光暈效果</p>
      </div>
    </div>
  ),
};

// ============================================
// Light Blobs Background
// ============================================

/**
 * 光斑背景效果
 * 帶有彩虹色的漂浮光斑效果
 */
export const LightBlobs = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <LightBlobsBackground />
      <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>光斑背景效果</h1>
        <p>Light Blobs Background - 漂浮彩虹光斑效果</p>
      </div>
    </div>
  ),
};

// ============================================
// Click Ripple Effect
// ============================================

/**
 * 點擊漣漪效果
 * 用於頁面點擊反饋的鑽石折射光芒效果
 */
export const ClickRipple = {
  render: () => {
    const [ripples, setRipples] = useState<Array<{id: number; x: number; y: number}>>([]);
    let rippleId = 0;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const newRipple = {
        id: rippleId++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1200);
    };

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#1a1a1a',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <ClickRippleEffect ripples={ripples} />
        <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>點擊漣漪效果</h1>
          <p>Click Ripple Effect - 點擊畫面產生鑽石折射光芒</p>
          <p style={{ marginTop: '1rem', opacity: 0.7 }}>點擊任意位置查看效果</p>
        </div>
      </div>
    );
  },
};

// ============================================
// Parallax Carousel Background
// ============================================

/**
 * 視差輪播背景
 * 帶有滑鼠視差效果的圖片輪播背景
 */
export const ParallaxCarousel = {
  render: () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
      'https://picsum.photos/1920/1080?random=1',
      'https://picsum.photos/1920/1080?random=2',
      'https://picsum.photos/1920/1080?random=3',
    ];

    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <ParallaxCarouselBackground
          images={images}
          autoPlayInterval={4000}
          parallaxIntensity={20}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
        />
        <div style={{ position: 'relative', zIndex: 10, padding: '4rem', color: 'white' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>視差輪播背景</h1>
          <p>Parallax Carousel Background - 移動滑鼠查看視差效果</p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: idx === currentIndex ? '#d4a853' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ============================================
// 組合展示
// ============================================

/**
 * 所有背景效果展示
 */
export const AllBackgrounds = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#d4a853' }}>背景效果元件總覽</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {[
          { name: 'AuroraBackground', desc: '極光動態漸層效果' },
          { name: 'LightRaysBackground', desc: '斜向光線照射效果' },
          { name: 'RippleBackground', desc: '水波漣漪效果' },
          { name: 'SunlightBackground', desc: '暖陽光暈效果' },
          { name: 'LightBlobsBackground', desc: '漂浮彩虹光斑效果' },
          { name: 'ClickRippleEffect', desc: '點擊鑽石折射效果' },
          { name: 'ParallaxCarouselBackground', desc: '視差輪播背景' },
        ].map(bg => (
          <div key={bg.name} style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{bg.name}</h3>
            <p style={{ color: '#888' }}>{bg.desc}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

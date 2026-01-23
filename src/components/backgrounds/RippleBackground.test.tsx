import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RippleBackground from './RippleBackground';

describe('RippleBackground', () => {
  test('應該正確渲染', () => {
    const { container } = render(<RippleBackground autoRipple={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該響應點擊產生波紋', () => {
    const { container } = render(
      <RippleBackground onClick={true} autoRipple={false} />
    );

    const clickableArea = container.firstChild as HTMLElement;
    fireEvent.click(clickableArea, {
      clientX: 100,
      clientY: 100,
    });

    // 檢查是否產生波紋元素
    const ripple = container.querySelector('.animate-ripple');
    expect(ripple).toBeInTheDocument();
  });

  test('應該限制波紋數量不超過 maxRipples', () => {
    const { container } = render(
      <RippleBackground maxRipples={3} autoRipple={false} onClick={true} />
    );

    const clickableArea = container.firstChild as HTMLElement;

    // 產生 5 個波紋
    for (let i = 0; i < 5; i++) {
      fireEvent.click(clickableArea, {
        clientX: 100 + i * 10,
        clientY: 100 + i * 10,
      });
    }

    // 應該只有 3 個波紋（maxRipples）
    const ripples = container.querySelectorAll('.animate-ripple');
    expect(ripples.length).toBeLessThanOrEqual(3);
  });

  test('應該套用 GPU 加速樣式', () => {
    const { container } = render(
      <RippleBackground onClick={true} autoRipple={false} />
    );

    const clickableArea = container.firstChild as HTMLElement;
    fireEvent.click(clickableArea, {
      clientX: 100,
      clientY: 100,
    });

    const ripple = container.querySelector('.animate-ripple') as HTMLElement;
    expect(ripple?.style.willChange).toContain('transform');
  });

  test('應該支援自訂波紋顏色', () => {
    const customColors = ['rgba(255,0,0,0.5)', 'rgba(255,0,0,0)'];
    const { container } = render(
      <RippleBackground rippleColors={customColors} autoRipple={false} />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該支援背景圖片', () => {
    const { container } = render(
      <RippleBackground
        backgroundImage="/test-bg.jpg"
        autoRipple={false}
      />
    );

    const bgImage = container.querySelector('[style*="background-image"]');
    expect(bgImage).toBeInTheDocument();
  });
});

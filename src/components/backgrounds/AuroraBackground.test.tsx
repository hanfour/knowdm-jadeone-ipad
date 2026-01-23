import React from 'react';
import { render } from '@testing-library/react';
import AuroraBackground from './AuroraBackground';

describe('AuroraBackground', () => {
  test('應該正確渲染', () => {
    const { container } = render(<AuroraBackground />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該套用 GPU 加速樣式', () => {
    const { container } = render(<AuroraBackground />);
    const auroraLayer = container.querySelector('.absolute.inset-0');

    expect(auroraLayer).toBeInTheDocument();
  });

  test('應該接受自訂動畫時間', () => {
    const customDuration = 30;
    const { container } = render(
      <AuroraBackground animationDuration={customDuration} />
    );

    const animateLayer = container.querySelector('.aurora-animate');
    expect(animateLayer).toBeInTheDocument();
  });

  test('應該支援自訂遮罩位置', () => {
    const { container } = render(<AuroraBackground maskPosition="center" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該支援背景圖片', () => {
    const { container } = render(
      <AuroraBackground backgroundImage="/test-image.jpg" />
    );

    const bgImage = container.querySelector('[style*="background-image"]');
    expect(bgImage).toBeInTheDocument();
  });

  test('應該正確設定模糊程度', () => {
    const blurAmount = 20;
    const { container } = render(<AuroraBackground blurAmount={blurAmount} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

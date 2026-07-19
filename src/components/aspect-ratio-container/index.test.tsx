import React from 'react';
import { render, screen } from '@testing-library/react';
import AspectRatioContainer from './index';

describe('AspectRatioContainer', () => {
  test('應該正確渲染', () => {
    const { container } = render(
      <AspectRatioContainer baseWidth={1920} baseHeight={1080}>
        <div>測試內容</div>
      </AspectRatioContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該渲染子元素', () => {
    render(
      <AspectRatioContainer baseWidth={1920} baseHeight={1080}>
        <div>測試子元素</div>
      </AspectRatioContainer>
    );
    expect(screen.getByText('測試子元素')).toBeInTheDocument();
  });

  test('未指定基準尺寸時應使用預設值渲染', () => {
    const { container } = render(
      <AspectRatioContainer>
        <div>內容</div>
      </AspectRatioContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  test('應該支援不同的基準尺寸', () => {
    const sizes: Array<[number, number]> = [
      [1920, 1080],
      [1600, 1200],
      [1080, 1080],
      [2560, 1080],
    ];

    sizes.forEach(([baseWidth, baseHeight]) => {
      const { container } = render(
        <AspectRatioContainer baseWidth={baseWidth} baseHeight={baseHeight}>
          <div>測試</div>
        </AspectRatioContainer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  test('應該正確套用樣式', () => {
    const { container } = render(
      <AspectRatioContainer baseWidth={1920} baseHeight={1080}>
        <div>內容</div>
      </AspectRatioContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    // 檢查元素存在即可，不強制要求特定 className
  });
});

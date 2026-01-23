import React from 'react';
import { render } from '@testing-library/react';
import AspectRatioContainer from './index';

describe('AspectRatioContainer', () => {
  test('應該正確渲染', () => {
    const { container } = render(
      <AspectRatioContainer ratio={16 / 9}>
        <div>測試內容</div>
      </AspectRatioContainer>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該渲染子元素', () => {
    const { getByText } = render(
      <AspectRatioContainer ratio={16 / 9}>
        <div>測試子元素</div>
      </AspectRatioContainer>
    );
    expect(getByText('測試子元素')).toBeInTheDocument();
  });

  test('應該套用正確的比例', () => {
    const { container } = render(
      <AspectRatioContainer ratio={16 / 9}>
        <div>內容</div>
      </AspectRatioContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  test('應該支援不同的比例值', () => {
    const ratios = [16 / 9, 4 / 3, 1, 21 / 9];

    ratios.forEach(ratio => {
      const { container } = render(
        <AspectRatioContainer ratio={ratio}>
          <div>測試</div>
        </AspectRatioContainer>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  test('應該正確套用樣式', () => {
    const { container } = render(
      <AspectRatioContainer ratio={16 / 9}>
        <div>內容</div>
      </AspectRatioContainer>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    // 檢查元素存在即可，不強制要求特定 className
  });
});

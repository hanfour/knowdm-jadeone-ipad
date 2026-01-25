import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CloseButton from './index';

describe('CloseButton', () => {
  test('應該正確渲染', () => {
    const { container } = render(<CloseButton onClick={() => {}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該響應點擊事件', () => {
    const handleClick = vi.fn();
    const { container } = render(<CloseButton onClick={handleClick} />);

    const button = container.firstChild as HTMLElement;
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('應該包含關閉圖示元素', () => {
    const { container } = render(<CloseButton onClick={() => {}} />);

    // 檢查是否包含圖示元素
    const spans = container.querySelectorAll('span, div, svg');
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  test('應該有基本樣式類別', () => {
    const { container } = render(<CloseButton onClick={() => {}} />);

    const button = container.firstChild as HTMLElement;
    // 檢查是否有樣式類別（任何類別都可以）
    expect(button.className.length).toBeGreaterThan(0);
  });

  test('應該接受自訂 className', () => {
    const { container } = render(
      <CloseButton onClick={() => {}} className="custom-close" />
    );

    const button = container.firstChild as HTMLElement;
    expect(button.className).toContain('custom-close');
  });
});

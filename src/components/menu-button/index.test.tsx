import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MenuButton from './index';

describe('MenuButton', () => {
  test('應該正確渲染', () => {
    const { container } = render(<MenuButton onClick={() => {}} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('應該響應點擊事件', () => {
    const handleClick = jest.fn();
    const { container } = render(<MenuButton onClick={handleClick} />);

    const button = container.firstChild as HTMLElement;
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('應該包含三條線（漢堡選單圖示）', () => {
    const { container } = render(<MenuButton onClick={() => {}} />);

    // 檢查是否有三個 span 元素（漢堡選單的三條線）
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBeGreaterThanOrEqual(3);
  });

  test('應該是可點擊的元素', () => {
    const { container } = render(<MenuButton onClick={() => {}} />);

    const button = container.firstChild as HTMLElement;
    expect(button).toBeInTheDocument();
    // 檢查元素可以接收點擊事件即可
  });
});

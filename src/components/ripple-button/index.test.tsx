import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RippleButton from './index';

describe('RippleButton', () => {
  test('應該正確渲染按鈕', () => {
    render(<RippleButton onClick={() => {}}>測試按鈕</RippleButton>);
    expect(screen.getByText('測試按鈕')).toBeInTheDocument();
  });

  test('應該響應點擊事件', () => {
    const handleClick = vi.fn();
    render(
      <RippleButton onClick={handleClick}>點擊我</RippleButton>
    );

    const button = screen.getByText('點擊我');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('應該產生波紋效果', () => {
    const { container } = render(
      <RippleButton onClick={() => {}}>波紋按鈕</RippleButton>
    );

    const button = screen.getByText('波紋按鈕');
    fireEvent.click(button);

    // 檢查波紋容器存在
    const rippleContainer = container.querySelector('.relative.overflow-hidden');
    expect(rippleContainer).toBeInTheDocument();
  });

  test('應該正確傳遞子元素', () => {
    render(
      <RippleButton onClick={() => {}}>
        <span>複雜子元素</span>
      </RippleButton>
    );

    expect(screen.getByText('複雜子元素')).toBeInTheDocument();
  });

  test('應該接受自訂 className', () => {
    const { container } = render(
      <RippleButton onClick={() => {}} className="custom-class">自訂樣式</RippleButton>
    );

    const button = container.querySelector('.custom-class');
    expect(button).toBeInTheDocument();
  });
});

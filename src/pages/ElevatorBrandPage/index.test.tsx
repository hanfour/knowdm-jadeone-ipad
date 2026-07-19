import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ElevatorBrandPage from './index';

const renderPage = () =>
  render(
    <MemoryRouter>
      <ElevatorBrandPage />
    </MemoryRouter>
  );

// 取得關閉鈕所屬的彈窗容器（CloseButton 為容器直接子元素）
const getOpenModal = () => {
  const closeButton = screen.getByLabelText('關閉');
  return { closeButton, modal: closeButton.parentElement as HTMLElement };
};

describe('ElevatorBrandPage 彈窗定位一致性', () => {
  test('電梯特色彈窗：容器自 header 下方開始、關閉鈕用預設定位', () => {
    renderPage();
    fireEvent.click(screen.getByText('電梯特色'));

    const { closeButton, modal } = getOpenModal();
    expect(modal.style.top).toBe('80px');
    expect(closeButton.className).toContain('top-4');
    expect(closeButton.className).not.toContain('top-20');
  });

  test('SHARP 彈窗與電梯特色彈窗的定位方式相同', () => {
    renderPage();
    fireEvent.click(screen.getByText('SHARP 空氣清淨機'));

    const { closeButton, modal } = getOpenModal();
    expect(modal.style.top).toBe('80px');
    expect(closeButton.className).toContain('top-4');
  });
});

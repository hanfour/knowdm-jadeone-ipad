import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('根路徑應渲染首頁（lazy load 完成後出現開場動畫按鈕）', async () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    expect(
      await screen.findByText('開場動畫', undefined, { timeout: 5000 })
    ).toBeInTheDocument();
  });

  test('未知路徑應由 catch-all 導回首頁', async () => {
    window.history.pushState({}, '', '/this-route-does-not-exist');
    render(<App />);

    expect(
      await screen.findByText('開場動畫', undefined, { timeout: 5000 })
    ).toBeInTheDocument();
  });

  test('品牌子頁路由應渲染電梯品牌頁', async () => {
    window.history.pushState({}, '', '/you-ya-jing-zhuo/jing-pin-gong-xue/elevator');
    render(<App />);

    expect(
      await screen.findByText('日立靜音升降電梯，科技藏於無聲', undefined, { timeout: 5000 })
    ).toBeInTheDocument();
  });
});

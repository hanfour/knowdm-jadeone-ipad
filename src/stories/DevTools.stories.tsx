import React from 'react';
import PolygonDrawer from '../components/dev/PolygonDrawer';

/**
 * 開發工具元件集合
 * 用於開發階段的輔助工具
 */
export default {
  title: 'DevTools',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

// ============================================
// Polygon Drawer
// ============================================

/**
 * 多邊形繪製工具
 * 用於在地圖或圖片上繪製區域並輸出座標
 *
 * 使用方式：
 * 1. 點擊畫布添加頂點
 * 2. 雙擊或按 Enter 完成當前多邊形
 * 3. 按 Escape 取消當前繪製
 * 4. 按 Ctrl+Z 撤銷最後一個頂點
 * 5. 點擊「複製座標」按鈕取得 JSON 格式的座標
 */
export const PolygonDrawerDemo = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 背景圖片示意 */}
      <img
        src="https://picsum.photos/1920/1080?random=20"
        alt="背景圖"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* 多邊形繪製工具 */}
      <PolygonDrawer
        enabled={true}
        usePercentage={true}
      />
    </div>
  ),
};

/**
 * 多邊形繪製工具 - 絕對座標模式
 * 輸出基於 baseWidth/baseHeight 的絕對座標
 */
export const PolygonDrawerAbsolute = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 背景圖片示意 */}
      <img
        src="https://picsum.photos/1920/1080?random=21"
        alt="背景圖"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* 多邊形繪製工具 - 絕對座標 */}
      <PolygonDrawer
        enabled={true}
        usePercentage={false}
        baseWidth={1920}
        baseHeight={1080}
      />
    </div>
  ),
};

/**
 * 多邊形繪製工具 - 停用狀態
 * 展示停用時工具會隱藏
 */
export const PolygonDrawerDisabled = {
  render: () => (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 背景圖片示意 */}
      <img
        src="https://picsum.photos/1920/1080?random=22"
        alt="背景圖"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      {/* 停用的繪製工具（不會顯示） */}
      <PolygonDrawer enabled={false} />
      {/* 說明文字 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>繪製工具已停用</h2>
        <p>設定 enabled=false 時，工具不會顯示</p>
      </div>
    </div>
  ),
};

/**
 * 所有開發工具總覽
 */
export const AllDevTools = {
  render: () => (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#d4a853' }}>開發工具元件總覽</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#2a2a2a', borderLeft: '3px solid #d4a853' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>PolygonDrawer</h3>
          <p style={{ color: '#888', marginBottom: '1rem' }}>多邊形繪製工具，用於在地圖或圖片上繪製區域並輸出座標</p>
          <div style={{ color: '#666', fontSize: '0.85rem' }}>
            <p>功能：</p>
            <ul style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
              <li>點擊添加頂點</li>
              <li>雙擊/Enter 完成多邊形</li>
              <li>Escape 取消繪製</li>
              <li>Ctrl+Z 撤銷頂點</li>
              <li>支援百分比/絕對座標</li>
              <li>輸出 JSON 格式座標</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#332200', borderLeft: '3px solid #ffaa00', borderRadius: '4px' }}>
        <p style={{ color: '#ffaa00', fontWeight: 'bold' }}>⚠️ 注意</p>
        <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
          這些工具僅供開發階段使用，正式上線時請確保已停用或移除。
        </p>
      </div>
    </div>
  ),
};

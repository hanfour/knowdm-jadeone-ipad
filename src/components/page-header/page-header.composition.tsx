import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PageHeader from './index';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '300px',
  overflow: 'hidden',
};

export const PageHeaderWhiteTheme = () => (
  <MemoryRouter>
    <div style={{ ...containerStyle, backgroundColor: '#0b2d2a' }}>
      <PageHeader
        theme="white"
        onMenuOpen={() => alert('Menu opened!')}
      />
      <p style={{ color: '#fff', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '14px' }}>
        白色主題 - 適用於深色背景
      </p>
    </div>
  </MemoryRouter>
);

export const PageHeaderGoldTheme = () => (
  <MemoryRouter>
    <div style={{ ...containerStyle, backgroundColor: '#f5f0e6' }}>
      <PageHeader
        theme="gold"
        onMenuOpen={() => alert('Menu opened!')}
      />
      <p style={{ color: '#333', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '14px' }}>
        金色主題 - 適用於淺色背景
      </p>
    </div>
  </MemoryRouter>
);

export const PageHeaderWithoutMenu = () => (
  <MemoryRouter>
    <div style={{ ...containerStyle, backgroundColor: '#0b2d2a' }}>
      <PageHeader
        theme="white"
        showMenuButton={false}
      />
      <p style={{ color: '#fff', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '14px' }}>
        無選單按鈕版本
      </p>
    </div>
  </MemoryRouter>
);

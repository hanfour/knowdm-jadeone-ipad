import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SubpageMenuBar from './index';
import type { NavItem } from './index';

const sampleItems: NavItem[] = [
  { id: '01', name: '隔音工法', link: '/engineering/soundproofing' },
  { id: '02', name: '防水工法', link: '/engineering/waterproofing' },
  { id: '03', name: '隔熱工法', link: '/engineering/thermal' },
  { id: '04', name: '綠建材', link: '/engineering/green' },
];

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '200px',
  backgroundColor: '#1a1a1a',
  overflow: 'hidden',
};

export const SubpageMenuBarDefault = () => (
  <MemoryRouter initialEntries={['/engineering/soundproofing']}>
    <div style={containerStyle}>
      <SubpageMenuBar items={sampleItems} />
      <p style={{ color: '#fff', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '14px' }}>
        預設樣式 - 第一項被選中
      </p>
    </div>
  </MemoryRouter>
);

export const SubpageMenuBarDifferentRoute = () => (
  <MemoryRouter initialEntries={['/engineering/waterproofing']}>
    <div style={containerStyle}>
      <SubpageMenuBar items={sampleItems} />
      <p style={{ color: '#fff', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '14px' }}>
        第二項被選中
      </p>
    </div>
  </MemoryRouter>
);

export const SubpageMenuBarCustomBackground = () => (
  <MemoryRouter initialEntries={['/engineering/thermal']}>
    <div style={containerStyle}>
      <SubpageMenuBar
        items={sampleItems}
        backgroundColor="#1a5276"
      />
      <p style={{ color: '#fff', position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '14px' }}>
        自訂背景色
      </p>
    </div>
  </MemoryRouter>
);

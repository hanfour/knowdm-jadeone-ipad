import React, { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import FullscreenMenu, { MenuSection } from './index';

const sampleSections: MenuSection[] = [
  {
    category: '關於我們',
    title: ['品牌故事', '企業理念'],
    items: [
      { id: '01', name: '公司介紹', link: '/about/intro' },
      { id: '02', name: '團隊成員', link: '/about/team' },
      { id: '03', name: '發展歷程', link: '/about/history' },
    ]
  },
  {
    category: '產品服務',
    title: ['專業方案', '全方位服務'],
    items: [
      { id: '01', name: '服務項目', link: '/services/list' },
      { id: '02', name: '案例展示', link: '/services/cases' },
    ]
  },
  {
    category: '最新消息',
    title: ['即時動態', '新聞中心'],
    items: [
      { id: '01', name: '公司新聞', link: '/news/company' },
      { id: '02', name: '活動資訊', link: '/news/events' },
    ]
  },
  {
    category: '聯絡我們',
    title: ['諮詢服務', '歡迎洽詢'],
    items: [
      { id: '01', name: '聯絡方式', link: '/contact' },
      { id: '02', name: '服務據點', link: '/locations' },
    ]
  },
];

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '600px',
  backgroundColor: '#0b2d2a',
  overflow: 'hidden',
};

export const FullscreenMenuOpen = () => (
  <MemoryRouter>
    <div style={containerStyle}>
      <FullscreenMenu
        isOpen={true}
        onClose={() => {}}
        sections={sampleSections}
      />
    </div>
  </MemoryRouter>
);

export const FullscreenMenuInteractive = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MemoryRouter>
      <div style={containerStyle}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#d4a853',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            zIndex: 50,
          }}
        >
          開啟選單
        </button>
        <FullscreenMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={sampleSections}
        />
      </div>
    </MemoryRouter>
  );
};

import React from 'react';

// 衛浴品牌圖標
const BathroomIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8 24h32" />
    <path d="M10 24v10c0 2 2 4 4 4h20c2 0 4-2 4-4V24" />
    <path d="M12 24V12c0-2 2-4 4-4h4c2 0 4 2 4 4v12" />
    <circle cx="18" cy="16" r="2" />
    <path d="M12 38v4M36 38v4" />
  </svg>
);

// 廚具品牌圖標
const KitchenIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 20h28v16c0 2-2 4-4 4H14c-2 0-4-2-4-4V20z" />
    <path d="M8 20h32" />
    <path d="M18 20V8M24 20V10M30 20V8" />
    <path d="M18 6v2M24 8v2M30 6v2" />
    <path d="M16 28h16M16 34h12" />
  </svg>
);

// 木地板品牌圖標
const FlooringIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="10" width="36" height="28" rx="2" />
    <path d="M6 18h36M6 26h36M6 34h36" />
    <path d="M16 10v8M28 10v8" />
    <path d="M22 18v8M34 18v8M10 18v8" />
    <path d="M16 26v8M28 26v8" />
    <path d="M22 34v4M10 34v4M34 34v4" />
  </svg>
);

// 淨水設備圖標
const WaterIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M24 6c0 0-12 14-12 24a12 12 0 0 0 24 0c0-10-12-24-12-24z" />
    <path d="M18 28c0-4 6-10 6-10s6 6 6 10" />
    <circle cx="24" cy="32" r="3" />
  </svg>
);

// 電子鎖圖標
const LockIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="20" width="28" height="20" rx="3" />
    <path d="M16 20V14a8 8 0 0 1 16 0v6" />
    <circle cx="24" cy="30" r="3" />
    <path d="M24 33v4" />
    <path d="M18 26h2M28 26h2" />
  </svg>
);

export interface EquipmentItemData {
  id: string;
  name: string;
  englishName: string;
  icon: React.ReactNode;
  link: string;
}

export const equipmentItems: EquipmentItemData[] = [
  {
    id: 'bathroom',
    name: '衛浴品牌',
    englishName: 'BATHROOM',
    icon: <BathroomIcon />,
    link: '/you-ya-jing-zhuo/jing-pin-gong-xue/bathroom',
  },
  {
    id: 'kitchen',
    name: '廚具品牌',
    englishName: 'KITCHEN',
    icon: <KitchenIcon />,
    link: '/you-ya-jing-zhuo/jing-pin-gong-xue/kitchen',
  },
  {
    id: 'flooring',
    name: '木地板品牌',
    englishName: 'FLOORING',
    icon: <FlooringIcon />,
    link: '/you-ya-jing-zhuo/jing-pin-gong-xue/flooring',
  },
  {
    id: 'water',
    name: '淨水設備',
    englishName: 'WATER PURIFICATION',
    icon: <WaterIcon />,
    link: '/you-ya-jing-zhuo/jing-pin-gong-xue/water',
  },
  {
    id: 'lock',
    name: '電子鎖',
    englishName: 'ELECTRONIC LOCK',
    icon: <LockIcon />,
    link: '/you-ya-jing-zhuo/jing-pin-gong-xue/lock',
  },
];

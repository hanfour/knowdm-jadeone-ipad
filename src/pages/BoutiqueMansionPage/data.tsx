import React from 'react';

const STROKE_WIDTH = 2;

// 衛浴品牌圖標
const BathroomIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* 浴缸主體 */}
    <path d="M8 32h48" />
    <path d="M12 32v12c0 4 4 8 8 8h24c4 0 8-4 8-8V32" />
    {/* 水龍頭 */}
    <path d="M16 32V16c0-2 2-4 4-4h6c2 0 4 2 4 4v16" />
    <path d="M22 16h8c2 0 3 1 3 3v2" />
    <circle cx="22" cy="22" r="2" />
    {/* 浴缸腳 */}
    <path d="M16 52v4M48 52v4" />
  </svg>
);

// 廚具品牌圖標
const KitchenIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* 鍋子主體 */}
    <path d="M12 28h40v20c0 4-4 8-8 8H20c-4 0-8-4-8-8V28z" />
    {/* 鍋蓋 */}
    <path d="M8 28h48" />
    {/* 把手 */}
    <path d="M52 36h6M6 36h6" />
    {/* 蒸氣 */}
    <path d="M24 8c0 4 4 6 4 10M32 10c0 4 4 6 4 10M40 8c0 4 4 6 4 10" />
  </svg>
);

// 木地板品牌圖標
const FlooringIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* 外框 */}
    <rect x="8" y="12" width="48" height="40" rx="2" />
    {/* 橫線 */}
    <path d="M8 22h48M8 32h48M8 42h48" />
    {/* 縱線 - 第一排 */}
    <path d="M24 12v10M40 12v10" />
    {/* 縱線 - 第二排 */}
    <path d="M16 22v10M32 22v10M48 22v10" />
    {/* 縱線 - 第三排 */}
    <path d="M24 32v10M40 32v10" />
    {/* 縱線 - 第四排 */}
    <path d="M16 42v10M32 42v10M48 42v10" />
  </svg>
);

// 淨水設備圖標
const WaterIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* 外層水滴 */}
    <path d="M32 6C32 6 16 24 16 38c0 8.8 7.2 16 16 16s16-7.2 16-16C48 24 32 6 32 6z" />
    {/* 內層水滴 */}
    <path d="M32 22c0 0-8 10-8 18c0 4.4 3.6 8 8 8s8-3.6 8-8C40 32 32 22 32 22z" />
    {/* 中心圓點 */}
    <circle cx="32" cy="42" r="3" />
  </svg>
);

// 電子鎖圖標
const LockIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round">
    {/* 鎖身 */}
    <rect x="12" y="28" width="28" height="28" rx="4" />
    {/* 鎖孔 */}
    <circle cx="26" cy="38" r="4" />
    <path d="M26 42v8" />
    {/* 把手 */}
    <path d="M40 42h12" />
    {/* 信號波 */}
    <path d="M48 32c4 0 8 4 8 10s-4 10-8 10" />
    <path d="M48 38c2 0 4 2 4 4s-2 4-4 4" />
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

/**
 * 測試用假資料 (Fixtures)
 */

export const mockImageData = {
  images: [
    { src: '/images/test/001.jpg', label: '測試圖片 1' },
    { src: '/images/test/002.jpg', label: '測試圖片 2' },
    { src: '/images/test/003.jpg', label: '測試圖片 3' },
  ],
  title: '測試標題',
  description: '這是測試用的描述文字，用於驗證元件渲染是否正確。',
};

export const mockBrandData = {
  name: '測試品牌',
  color: '#ff0000',
  logo: '/images/brands/test.png',
  description: '測試品牌描述',
};

export const mockFloorPlanData = {
  floorNumber: '3F',
  rooms: 3,
  area: 25,
  layout: '/images/floorplans/test.jpg',
};

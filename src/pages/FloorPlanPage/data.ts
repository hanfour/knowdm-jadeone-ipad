import { FloorData, GalleryButtonData, UnitData } from './types';

// 戶別資料（含精確區域座標）
export const units: UnitData[] = [
  {
    id: 'A',
    label: 'A戶',
    getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/A-2F.jpg' : '/images/c2/furniture-layouts/A-3~11.jpg',
    region: [
      { x: 18.61, y: 10.4 }, { x: 27.26, y: 10.4 }, { x: 27.26, y: 13.55 }, { x: 31.12, y: 13.55 },
      { x: 31.12, y: 20.57 }, { x: 35.33, y: 20.57 }, { x: 35.33, y: 36.85 }, { x: 36.61, y: 36.85 },
      { x: 36.61, y: 45.35 }, { x: 20.01, y: 45.35 }, { x: 20.01, y: 33.7 }, { x: 18.61, y: 33.7 },
    ],
  },
  {
    id: 'B',
    label: 'B戶',
    getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/B-2F.jpg' : '/images/c2/furniture-layouts/B-3~11.jpg',
    region: [
      { x: 20.95, y: 71.79 }, { x: 35.68, y: 71.79 }, { x: 35.68, y: 70.13 }, { x: 42.81, y: 70.13 },
      { x: 42.81, y: 45.35 }, { x: 27.38, y: 45.35 }, { x: 27.38, y: 52.0 }, { x: 23.05, y: 52.0 },
      { x: 23.05, y: 57.93 }, { x: 20.95, y: 57.93 },
    ],
  },
  {
    id: 'C',
    label: 'C戶',
    getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/C-2F.jpg' : '/images/c2/furniture-layouts/C-3~11.jpg',
    region: [
      { x: 43.05, y: 70.13 }, { x: 43.05, y: 45.35 }, { x: 58.59, y: 45.35 }, { x: 58.59, y: 52.01 },
      { x: 63.05, y: 52.01 }, { x: 63.05, y: 57.8 }, { x: 65.37, y: 57.8 }, { x: 65.37, y: 71.8 },
      { x: 50.29, y: 71.8 }, { x: 50.29, y: 70.13 },
    ],
  },
  {
    id: 'D',
    label: 'D戶',
    getImage: (f) => f === '2F' ? '/images/c2/furniture-layouts/D-2F.jpg' : '/images/c2/furniture-layouts/D-3~11.jpg',
    region: [
      { x: 67.24, y: 10.59 }, { x: 58.82, y: 10.59 }, { x: 58.82, y: 13.55 }, { x: 54.96, y: 13.55 },
      { x: 54.96, y: 20.76 }, { x: 50.87, y: 20.76 }, { x: 50.87, y: 36.48 }, { x: 49.59, y: 36.48 },
      { x: 49.59, y: 45.17 }, { x: 66.07, y: 45.17 }, { x: 66.07, y: 33.89 }, { x: 67.24, y: 33.89 },
    ],
  },
];

// 樓層預設定位與縮放設定
export const floorDefaults: Record<string, { x: number; y: number; scale: number }> = {
  'RF': { x: 140, y: 93, scale: 3 },
  '11F': { x: 140, y: 90, scale: 3 },
  '10F': { x: 140, y: 90, scale: 3 },
  '9F': { x: 140, y: 90, scale: 3 },
  '8F': { x: 140, y: 90, scale: 3 },
  '7F': { x: 140, y: 90, scale: 3 },
  '6F': { x: 140, y: 90, scale: 3 },
  '5F': { x: 140, y: 90, scale: 3 },
  '4F': { x: 140, y: 90, scale: 3 },
  '3F': { x: 140, y: 90, scale: 3 },
  '2F': { x: 70, y: 90, scale: 3 },
  '1F': { x: -50, y: 80, scale: 2.9 },
  'B1F': { x: 0, y: -10, scale: 2.5 },
  'B2F': { x: 0, y: -10, scale: 2.5 },
  'B3F': { x: 0, y: -10, scale: 2.5 },
};

// 生成空拍實景按鈕資料
export const getAerialButtons = (floorId: string): GalleryButtonData[] => [
  { id: `${floorId}-east`, label: '東向空拍實景', images: [{ src: `/images/c2/aerial/仁玉-${floorId}(東向).jpg`, label: '東向空拍實景' }] },
  { id: `${floorId}-south`, label: '南向空拍實景', images: [{ src: `/images/c2/aerial/仁玉-${floorId}(南向).jpg`, label: '南向空拍實景' }] },
  { id: `${floorId}-west`, label: '西向空拍實景', images: [{ src: `/images/c2/aerial/仁玉-${floorId}(西向).jpg`, label: '西向空拍實景' }] },
  { id: `${floorId}-north`, label: '北向空拍實景', images: [{ src: `/images/c2/aerial/仁玉-${floorId}(北向).jpg`, label: '北向空拍實景' }] },
];

// 標準樓層標記點
const standardMarkers = (floorId: string) => [
  { id: `${floorId}-A`, unitId: 'A', x: 27.68, y: 39.86, label: 'A戶' },
  { id: `${floorId}-B`, unitId: 'B', x: 39.21, y: 58.09, label: 'B戶' },
  { id: `${floorId}-C`, unitId: 'C', x: 46.66, y: 58.36, label: 'C戶' },
  { id: `${floorId}-D`, unitId: 'D', x: 58.36, y: 39.59, label: 'D戶' },
];

// 樓層資料
export const floors: FloorData[] = [
  {
    id: 'RF',
    label: 'RF',
    image: '/images/c2/floor-plans/RF-1.png',
    subFloors: [
      {
        id: 'RF-1',
        label: '屋突一層',
        image: '/images/c2/floor-plans/RF-1.png',
        galleryButtons: [
          {
            id: 'RF-lobby',
            label: 'RF梯廳',
            images: [
              { src: '/images/c2/facilities/05-RF梯廳-01.webp', label: 'RF梯廳 1' },
              { src: '/images/c2/facilities/05-RF梯廳-02.webp', label: 'RF梯廳 2' },
              { src: '/images/c2/facilities/05-RF梯廳-03.webp', label: 'RF梯廳 3' },
              { src: '/images/c2/facilities/05-RF梯廳-04.webp', label: 'RF梯廳 4' },
              { src: '/images/c2/facilities/05-RF梯廳-05.webp', label: 'RF梯廳 5' },
              { src: '/images/c2/facilities/05-RF梯廳-06.webp', label: 'RF梯廳 6' },
            ],
            region: [
              { x: 40.54, y: 16.56 },
              { x: 45.91, y: 16.56 },
              { x: 45.91, y: 23.05 },
              { x: 50.90, y: 23.03 },
              { x: 50.90, y: 44.67 },
              { x: 40.54, y: 44.67 },
            ],
          },
        ],
      },
      { id: 'RF-2', label: '屋突二層', image: '/images/c2/floor-plans/RF-2.png' },
      { id: 'RF-3', label: '屋突三層', image: '/images/c2/floor-plans/RF-3.png' },
    ],
    galleryButtons: getAerialButtons('RF'),
  },
  { id: '11F', label: '11F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('11F'), galleryButtons: getAerialButtons('11F') },
  { id: '10F', label: '10F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('10F'), galleryButtons: getAerialButtons('10F') },
  { id: '9F', label: '9F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('9F'), galleryButtons: getAerialButtons('9F') },
  { id: '8F', label: '8F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('8F'), galleryButtons: getAerialButtons('8F') },
  { id: '7F', label: '7F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('7F'), galleryButtons: getAerialButtons('7F') },
  { id: '6F', label: '6F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('6F'), galleryButtons: getAerialButtons('6F') },
  { id: '5F', label: '5F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('5F'), galleryButtons: getAerialButtons('5F') },
  { id: '4F', label: '4F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('4F'), galleryButtons: getAerialButtons('4F') },
  { id: '3F', label: '3F', image: '/images/c2/floor-plans/3-11F.png', markers: standardMarkers('3F'), galleryButtons: getAerialButtons('3F') },
  {
    id: '2F',
    label: '2F',
    image: '/images/c2/floor-plans/2F.png',
    markers: [
      { id: '2F-A', unitId: 'A', x: 27.85, y: 39.59, label: 'A戶' },
      { id: '2F-B', unitId: 'B', x: 39.21, y: 57.83, label: 'B戶' },
      { id: '2F-C', unitId: 'C', x: 46.49, y: 57.83, label: 'C戶' },
      { id: '2F-D', unitId: 'D', x: 58.02, y: 39.33, label: 'D戶' },
    ],
    galleryButtons: getAerialButtons('2F')
  },
  {
    id: '1F',
    label: '1F',
    image: '/images/c2/floor-plans/1F.png',
    galleryButtons: [
      {
        id: '1F-lobby',
        label: '入口門廳',
        images: [
          { src: '/images/c2/facilities/01-大廳-01.webp', label: '入口門廳 1' },
          { src: '/images/c2/facilities/01-大廳-02.webp', label: '入口門廳 2' },
          { src: '/images/c2/facilities/01-大廳-03.webp', label: '入口門廳 3' },
          { src: '/images/c2/facilities/01-大廳-04.webp', label: '入口門廳 4' },
          { src: '/images/c2/facilities/01-大廳-05.webp', label: '入口門廳 5' },
        ],
        region: [
          { x: 20.86, y: 7.6 }, { x: 20.73, y: 41.28 }, { x: 22.86, y: 41.28 }, { x: 22.99, y: 42.27 },
          { x: 35.14, y: 42.27 }, { x: 35.14, y: 17.9 }, { x: 45.78, y: 18.1 }, { x: 45.78, y: 7.6 },
          { x: 40.9, y: 7.4 }, { x: 40.9, y: 9.38 }, { x: 33.38, y: 9.38 }, { x: 33.26, y: 7.6 },
        ],
      },
      {
        id: '1F-lounge',
        label: '交誼廳',
        images: [
          { src: '/images/c2/facilities/02-交誼廳-01.webp', label: '交誼廳 1' },
          { src: '/images/c2/facilities/02-交誼廳-02.webp', label: '交誼廳 2' },
          { src: '/images/c2/facilities/02-交誼廳-03.webp', label: '交誼廳 3' },
          { src: '/images/c2/facilities/02-交誼廳-04.webp', label: '交誼廳 4' },
          { src: '/images/c2/facilities/02-交誼廳-05.webp', label: '交誼廳 5' },
          { src: '/images/c2/facilities/02-交誼廳-06.webp', label: '交誼廳 6' },
        ],
        region: [
          { x: 20.59, y: 63.12 }, { x: 26.52, y: 63.12 }, { x: 26.52, y: 71.15 }, { x: 20.59, y: 71.15 },
        ],
        noHighlight: true,
      },
    ]
  },
  {
    id: 'B1F',
    label: 'B1F',
    image: '/images/c2/floor-plans/B1.png',
    galleryButtons: [
      {
        id: 'B1F-lobby',
        label: 'BF梯廳',
        images: [
          { src: '/images/c2/facilities/04-BF梯廳-01.webp', label: 'BF梯廳 1' },
          { src: '/images/c2/facilities/04-BF梯廳-02.webp', label: 'BF梯廳 2' },
        ],
        region: [
          { x: 35.39, y: 17.9 }, { x: 45.91, y: 17.9 }, { x: 46.03, y: 43.65 },
          { x: 40.52, y: 43.65 }, { x: 40.52, y: 34.94 }, { x: 35.31, y: 34.94 },
        ],
      },
    ]
  },
  {
    id: 'B2F',
    label: 'B2F',
    image: '/images/c2/floor-plans/B2.png',
    galleryButtons: [
      {
        id: 'B2F-lobby',
        label: '第二門廳',
        images: [
          { src: '/images/c2/facilities/03-第二門廳-01.webp', label: '第二門廳 1' },
          { src: '/images/c2/facilities/03-第二門廳-02.webp', label: '第二門廳 2' },
          { src: '/images/c2/facilities/03-第二門廳-03.webp', label: '第二門廳 3' },
          { src: '/images/c2/facilities/03-第二門廳-04.webp', label: '第二門廳 4' },
          { src: '/images/c2/facilities/03-第二門廳-05.webp', label: '第二門廳 5' },
          { src: '/images/c2/facilities/03-第二門廳-06.webp', label: '第二門廳 6' },
          { src: '/images/c2/facilities/03-第二門廳-07.webp', label: '第二門廳 7' },
        ],
        region: [
          { x: 33.77, y: 45.76 }, { x: 36.68, y: 45.76 }, { x: 36.68, y: 44.3 }, { x: 48.88, y: 44.3 },
          { x: 48.88, y: 45.51 }, { x: 51.87, y: 45.51 }, { x: 51.87, y: 69.05 }, { x: 33.77, y: 69.05 },
        ],
      },
    ]
  },
  { id: 'B3F', label: 'B3F', image: '/images/c2/floor-plans/B3.png' },
];

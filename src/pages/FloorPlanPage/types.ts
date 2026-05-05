// 錨點資料介面
export interface AnchorPoint {
  x: number;
  y: number;
}

// 子層資料（用於 RF 屋突層）
export interface SubFloorData {
  id: string;
  label: string;
  image: string;
  galleryButtons?: GalleryButtonData[];
}

// 樓層資料配置
export interface FloorData {
  id: string;
  label: string;
  image: string | null;
  markers?: MarkerData[];
  galleryButtons?: GalleryButtonData[];
  subFloors?: SubFloorData[];
}

// 標記點資料
export interface MarkerData {
  id: string;
  unitId: string;
  x: number;
  y: number;
  label: string;
}

// 圖片內的點擊區域（可開啟巢狀圖庫）
export interface ImageRegion {
  points: { x: number; y: number }[];
  gallery: GalleryButtonData;
}

// 圖庫圖片
export interface GalleryImage {
  src: string;
  label: string;
  regions?: ImageRegion[];
}

// 圖庫按鈕資料
export interface GalleryButtonData {
  id: string;
  label: string;
  images: GalleryImage[];
  region?: { x: number; y: number }[];
  noHighlight?: boolean;
}

// 戶別資料
export interface UnitData {
  id: string;
  label: string;
  getImage: (floor: string) => string;
  getVrUrl?: (floor: string) => string | null;
  region: { x: number; y: number }[];
}

// 底部面板狀態
export interface BottomSheetState {
  isOpen: boolean;
  unit: UnitData | null;
  scale: number;
  position: { x: number; y: number };
}

// 圖庫查看器狀態
export interface GalleryViewerState {
  isOpen: boolean;
  gallery: GalleryButtonData | null;
  currentIndex: number;
  scale: number;
}

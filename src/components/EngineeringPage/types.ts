import type { ComparisonItem } from './ComparisonLayout';

// 影片時間段結構
export interface VideoSegment {
  label: string;
  start: number;
  end: number;
  loopFrom?: number;
}

// 影片 loop 設定
export interface VideoLoop {
  start: number;
  end: number;
}

// 特色項目結構 - 標題+描述
export interface FeatureItem {
  title: string;
  desc: string;
}

// 特色項目結構 - 標籤+文字
export interface FeatureLabelItem {
  label: string;
  text: string;
}

// 基礎 Tab 資料結構
export interface BaseTabData {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  content?: string;
}

// 影片相關屬性
export interface VideoTabProps {
  video?: string;
  videoLoop?: VideoLoop;
  videoSegments?: VideoSegment[];
  videoShowReplay?: boolean;
  videoFullHeight?: boolean;
}

// 圖片相關屬性
export interface ImageTabProps {
  image?: string;
  images?: string[];
  contentImage?: string;
  fullBgImage?: string;
}

// 列表相關屬性
export interface ListTabProps {
  features?: FeatureItem[];
  advantages?: string[];
  details?: string[];
}

// 比較模式屬性
export interface ComparisonTabProps {
  comparison?: {
    left: ComparisonItem;
    right: ComparisonItem;
  };
}

// 樣式相關屬性
export interface StyleTabProps {
  bgColor?: string;
  layout?: 'default' | 'side-by-side';
}

// 完整的 Tab 資料結構（組合所有屬性）
export type EngineeringTabData = BaseTabData &
  VideoTabProps &
  ImageTabProps &
  ListTabProps &
  ComparisonTabProps &
  StyleTabProps;

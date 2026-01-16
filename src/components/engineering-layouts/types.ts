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

// 比較項目結構
export interface ComparisonItem {
  image: string;
  title: string;
  description: string;
}

// Tab 項目結構
export interface TabItem {
  id: string;
  name: string;
}

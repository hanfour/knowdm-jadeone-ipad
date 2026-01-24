# 網站效能優化設計文件

> 建立日期：2026-01-24
> 狀態：待實作

## 概述

本文件描述聚碩仁玉企業網站的效能優化計畫，主要目標是改善網站載入速度和動畫流暢度。

## 現況分析

### 問題摘要

| 問題 | 影響程度 | 說明 |
|------|----------|------|
| 圖片資源過大 | 極高 | 365MB / 348 張圖片，未優化 |
| 無程式碼分割 | 極高 | 30+ 頁面同時載入 |
| 無圖片延遲載入 | 高 | 所有圖片立即載入 |
| 動畫效能 | 中 | blur(500px) 濾鏡較耗效能 |

### 技術棧

- React 19 + TypeScript
- Create React App (react-scripts 5.0.1)
- Tailwind CSS 3.4
- React Router 7

---

## 優化方案：遷移至 Vite + 全面優化

### 第一階段：Vite 遷移

#### 1.1 安裝依賴

```bash
npm install -D vite @vitejs/plugin-react
npm uninstall react-scripts
```

#### 1.2 建立 vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

#### 1.3 移動 index.html

將 `public/index.html` 移至專案根目錄，並調整內容：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>聚碩仁玉</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

#### 1.4 更新 package.json 腳本

```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

#### 1.5 環境變數調整

如有使用環境變數，需從 `REACT_APP_` 改為 `VITE_`：

```typescript
// 優化前
process.env.REACT_APP_API_URL

// 優化後
import.meta.env.VITE_API_URL
```

---

### 第二階段：程式碼分割

#### 2.1 懶載入頁面元件

修改 `src/App.tsx`：

```typescript
import React, { Suspense, lazy } from 'react';

// 懶載入頁面
const HomePage = lazy(() => import('./pages/HomePage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const FloorPlanPage = lazy(() => import('./pages/FloorPlanPage'));
// ... 其他頁面

// 載入中元件
const PageLoading = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black">
    <div className="text-gold text-h4">載入中...</div>
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ... */}
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}
```

#### 2.2 預載入策略

在選單元件中加入預載入：

```typescript
// 滑鼠 hover 時預載入
const handleMouseEnter = (path: string) => {
  if (path === '/video') {
    import('./pages/VideoPage');
  }
  // ...
};
```

---

### 第三階段：圖片優化

#### 3.1 格式轉換

使用 WebP 格式，減少 60-70% 檔案大小：

```bash
# 使用 sharp 或 imagemin 批次轉換
npx sharp-cli -i public/images/**/*.jpg -o public/images -f webp -q 80
```

#### 3.2 圖片懶載入

為所有圖片加入原生懶載入：

```tsx
<img
  loading="lazy"
  src={imageSrc}
  alt={alt}
  decoding="async"
/>
```

#### 3.3 響應式圖片（選用）

對關鍵圖片提供多尺寸版本：

```tsx
<picture>
  <source
    srcSet="/images/hero-640.webp 640w, /images/hero-1024.webp 1024w, /images/hero-1920.webp 1920w"
    type="image/webp"
  />
  <img src="/images/hero.jpg" alt="Hero" />
</picture>
```

#### 3.4 建置時壓縮（選用）

安裝 vite-plugin-imagemin：

```bash
npm install -D vite-plugin-imagemin
```

---

### 第四階段：動畫優化

#### 4.1 減少 blur 半徑

修改 `src/components/intro-animation/index.tsx`：

```css
/* 優化前 */
filter: blur(500px);

/* 優化後 */
filter: blur(80px);
```

#### 4.2 啟用硬體加速

為動畫元素加入 GPU 加速提示：

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

#### 4.3 抽離 CSS 動畫

將內聯 `<style>` 標籤內容移至獨立的 CSS 檔案：

```
src/components/intro-animation/
├── index.tsx
└── intro-animation.css  # 新增
```

---

## 實作順序

1. **Vite 遷移**（預估 1-2 小時）
   - 安裝依賴
   - 配置檔案
   - 調整 index.html
   - 驗證開發伺服器

2. **程式碼分割**（預估 1 小時）
   - 改寫 App.tsx 使用 lazy/Suspense
   - 建立 PageLoading 元件
   - 驗證路由分割

3. **圖片優化**（預估 2-3 小時）
   - 批次轉換 WebP
   - 加入 loading="lazy"
   - 驗證載入效果

4. **動畫優化**（預估 1 小時）
   - 調整 blur 數值
   - 抽離 CSS
   - 驗證動畫流暢度

---

## 預期效益

| 指標 | 優化前 | 優化後（預估） |
|------|--------|---------------|
| 首次載入 JS | ~500KB+ | ~100KB |
| 圖片大小 | 365MB | ~100MB |
| 開發伺服器啟動 | 30-60 秒 | < 1 秒 |
| HMR 速度 | 2-5 秒 | < 100ms |
| 動畫 FPS | 30-40 | 60 |

---

## 驗證方式

1. **Lighthouse 測試**：比較優化前後分數
2. **Network 面板**：確認 chunk 分割正確
3. **Coverage 工具**：確認未使用程式碼減少
4. **FPS 監測**：確認動畫流暢度

---

## 風險與備案

| 風險 | 機率 | 備案 |
|------|------|------|
| Vite 相容性問題 | 低 | 保留 CRA 配置可回滾 |
| 圖片轉換品質 | 低 | 調整壓縮品質參數 |
| 懶載入閃爍 | 中 | 調整 Suspense fallback |

---

## 相關文件

- `CLAUDE.md` - 開發規範
- `.claude/DEVELOPMENT_GUIDE.md` - 開發指南
- `tailwind.config.js` - Tailwind 配置

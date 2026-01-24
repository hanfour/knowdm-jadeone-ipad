# Vite 遷移與效能優化實作計畫

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 將專案從 Create React App 遷移到 Vite，並實作程式碼分割、圖片懶載入、動畫優化。

**Architecture:** 使用 Vite 作為建置工具，配合 React.lazy + Suspense 實現路由級程式碼分割，所有頁面按需載入。圖片使用原生 loading="lazy" 屬性。動畫優化透過減少 blur 半徑和啟用 GPU 加速。

**Tech Stack:** Vite 5.x, React 19, TypeScript, Tailwind CSS 3.4, React Router 7

---

## Phase 1: Vite 遷移

### Task 1: 安裝 Vite 依賴

**Files:**
- Modify: `package.json`

**Step 1: 安裝 Vite 和相關依賴**

```bash
npm install -D vite @vitejs/plugin-react @types/node
```

Expected: 安裝成功，無錯誤

**Step 2: 驗證安裝**

```bash
npm ls vite
```

Expected: 顯示 vite@5.x.x

---

### Task 2: 建立 Vite 配置檔

**Files:**
- Create: `vite.config.ts`

**Step 1: 建立 vite.config.ts**

建立檔案 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Step 2: 驗證檔案已建立**

```bash
cat vite.config.ts
```

Expected: 顯示配置內容

---

### Task 3: 移動並調整 index.html

**Files:**
- Move: `public/index.html` → `index.html` (根目錄)
- Modify: `index.html`

**Step 1: 複製 index.html 到根目錄**

```bash
cp public/index.html index.html
```

**Step 2: 修改 index.html**

將 `index.html` 修改為：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="聚碩仁玉 - 水湳生態核心" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>聚碩仁玉</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

**關鍵變更：**
- 移除 `%PUBLIC_URL%` 改為 `/`
- 新增 `<script type="module" src="/src/index.tsx"></script>`
- 更新 title 和 description

---

### Task 4: 建立 TypeScript 配置

**Files:**
- Create: `tsconfig.vite.json`
- Modify: `tsconfig.json`

**Step 1: 建立 tsconfig.vite.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 2: 建立 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

---

### Task 5: 更新 package.json 腳本

**Files:**
- Modify: `package.json`

**Step 1: 更新 scripts 區塊**

將 `package.json` 的 scripts 改為：

```json
{
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

**Step 2: 移除 react-scripts 依賴**

```bash
npm uninstall react-scripts
```

---

### Task 6: 建立 Vite 環境類型定義

**Files:**
- Create: `src/vite-env.d.ts`
- Delete: `src/react-app-env.d.ts`

**Step 1: 建立 vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

**Step 2: 刪除舊的類型定義**

```bash
rm src/react-app-env.d.ts
```

---

### Task 7: 驗證 Vite 開發伺服器

**Step 1: 啟動開發伺服器**

```bash
npm start
```

Expected:
- 伺服器在 < 1 秒內啟動
- 瀏覽器自動開啟 http://localhost:3000
- 頁面正常顯示

**Step 2: 測試熱更新**

修改任意元件，確認 HMR 在 < 100ms 內更新

**Step 3: Commit**

```bash
git add -A
git commit -m "build: 從 CRA 遷移到 Vite

- 安裝 Vite 和 @vitejs/plugin-react
- 建立 vite.config.ts 配置
- 移動 index.html 到根目錄
- 更新 TypeScript 配置
- 更新 package.json scripts

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 2: 程式碼分割

### Task 8: 建立 Loading 元件

**Files:**
- Create: `src/components/PageLoading.tsx`

**Step 1: 建立 PageLoading 元件**

```tsx
import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-gold text-body tracking-wide-custom">載入中...</p>
      </div>
    </div>
  );
};

export default PageLoading;
```

---

### Task 9: 改寫 App.tsx 使用懶載入

**Files:**
- Modify: `src/App.tsx`

**Step 1: 將所有頁面改為懶載入**

修改 `src/App.tsx` 的 import 區塊：

```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageLoading from './components/PageLoading';

// 懶載入所有頁面
const HomePage = lazy(() => import('./pages/HomePage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const ImageGalleryPage = lazy(() => import('./components/ImageGalleryPage'));
const LifeFunctionPage = lazy(() => import('./pages/LifeFunctionPage'));
const TrafficRoutePage = lazy(() => import('./pages/TrafficRoutePage'));
const ArchitectLeaderPage = lazy(() => import('./pages/ArchitectLeaderPage'));
const ArchitectAestheticsPage = lazy(() => import('./pages/ArchitectAestheticsPage'));
const PublicFacilityPage = lazy(() => import('./pages/PublicFacilityPage'));
const LandscapeTastePage = lazy(() => import('./pages/LandscapeTastePage'));
const StructuralMechanicsPage = lazy(() => import('./pages/StructuralEngineeringPage'));
const StructuralEngineeringPage = lazy(() => import('./pages/StructuralEngineeringPage/index'));
const LightingAestheticsPage = lazy(() => import('./pages/LightingAestheticsPage'));
const FrenchAestheticsPage = lazy(() => import('./pages/FrenchAestheticsPage'));
const FloorPlanPage = lazy(() => import('./pages/FloorPlanPage'));
const BoutiqueMansionPage = lazy(() => import('./pages/BoutiqueMansionPage'));
const KitchenBrandPage = lazy(() => import('./pages/KitchenBrandPage'));
const BathroomBrandPage = lazy(() => import('./pages/BathroomBrandPage'));
const LockBrandPage = lazy(() => import('./pages/LockBrandPage'));
const WaterBrandPage = lazy(() => import('./pages/WaterBrandPage'));
const WindowBrandPage = lazy(() => import('./pages/WindowBrandPage'));
const FlooringBrandPage = lazy(() => import('./pages/FlooringBrandPage'));
const ElevatorBrandPage = lazy(() => import('./pages/ElevatorBrandPage'));
const PipingEngineeringPage = lazy(() => import('./pages/PipingEngineeringPage'));
const WaterproofEngineeringPage = lazy(() => import('./pages/WaterproofEngineeringPage'));
const FireProtectionEngineeringPage = lazy(() => import('./pages/FireProtectionEngineeringPage'));
const ThoughtfulEngineeringPage = lazy(() => import('./pages/ThoughtfulEngineeringPage'));
const AnchorFuturePage = lazy(() => import('./pages/AnchorFuturePage'));
const InternationalCityPage = lazy(() => import('./pages/InternationalCityPage'));
const PreciousCollectionPage = lazy(() => import('./pages/PreciousCollectionPage'));
const PolygonDrawer = lazy(() => import('./components/dev/PolygonDrawer'));
```

**Step 2: 用 Suspense 包裝 Routes**

```tsx
function App() {
  return (
    <Router>
      {/* 開發工具：多邊形繪製器 */}
      {DEV_MODE && (
        <Suspense fallback={null}>
          <PolygonDrawer enabled={DEV_MODE} targetSelector="[data-map-container]" />
        </Suspense>
      )}
      <MainLayout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {/* 所有路由保持不變 */}
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}
```

**Step 3: 驗證分割**

```bash
npm run build
```

Expected: build 資料夾出現多個 chunk 檔案

**Step 4: Commit**

```bash
git add -A
git commit -m "perf: 實作路由級程式碼分割

- 建立 PageLoading 元件
- 將所有頁面改為 React.lazy 懶載入
- 使用 Suspense 包裝路由

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 3: 圖片懶載入

### Task 10: 建立 LazyImage 元件

**Files:**
- Create: `src/components/LazyImage.tsx`

**Step 1: 建立 LazyImage 元件**

```tsx
import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
};

export default LazyImage;
```

---

### Task 11: 為現有圖片加入懶載入

**Files:**
- Modify: 所有使用 `<img>` 標籤的元件

**Step 1: 全域搜尋並替換**

搜尋所有 `<img` 標籤，加入 `loading="lazy"` 屬性。

**優先處理的檔案：**
- `src/pages/HomePage.tsx`
- `src/components/ImageGalleryPage.tsx`
- `src/pages/FloorPlanPage/components/GalleryViewer.tsx`
- `src/pages/BoutiqueMansionPage/index.tsx`

**範例修改：**

```tsx
// 修改前
<img src={imageSrc} alt={alt} className="w-full h-full object-cover" />

// 修改後
<img
  src={imageSrc}
  alt={alt}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover"
/>
```

**Step 2: Commit**

```bash
git add -A
git commit -m "perf: 為所有圖片加入懶載入

- 建立 LazyImage 元件
- 為現有 img 標籤加入 loading='lazy'

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 4: 動畫優化

### Task 12: 優化 IntroAnimation blur 效果

**Files:**
- Modify: `src/components/intro-animation/index.tsx`

**Step 1: 減少 blur 半徑**

搜尋 `filter: blur(500px)` 並替換為 `filter: blur(80px)`

**修改位置：**
- 第 394 行：`filter: blur(500px);` → `filter: blur(80px);`

**Step 2: 加入硬體加速**

在動畫元素的 CSS 中加入：

```css
.text-shine-sweep {
  /* 原有樣式 */
  will-change: transform;
  transform: translateZ(0);
}

.shine-effect {
  /* 原有樣式 */
  will-change: transform;
  transform: translateZ(0);
}
```

---

### Task 13: 抽離 CSS 動畫到獨立檔案

**Files:**
- Create: `src/components/intro-animation/intro-animation.css`
- Modify: `src/components/intro-animation/index.tsx`

**Step 1: 建立 CSS 檔案**

```css
/* intro-animation.css */

.text-shine-sweep {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(243, 207, 154, 0.2) 30%,
    rgba(243, 207, 154, 0.4) 43%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(243, 207, 154, 0.6) 57%,
    rgba(244, 244, 244, 0.2) 70%,
    transparent 80%
  );
  filter: blur(80px);
  animation: textShineMove 1.5s ease-in-out forwards;
  will-change: transform;
  transform: translateZ(0);
}

@keyframes textShineMove {
  0% { left: -100%; }
  100% { left: 200%; }
}

.logo-container {
  position: relative;
  display: inline-block;
}

.logo-base {
  display: block;
}

.logo-shine-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.shine-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 20%,
    rgba(255, 255, 255, 0.1) 35%,
    rgba(255, 255, 255, 0.4) 45%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.4) 55%,
    rgba(255, 255, 255, 0.1) 65%,
    transparent 80%
  );
  animation: shineMove 3.5s ease-in-out infinite;
  will-change: transform;
  transform: translateZ(0);
}

@keyframes shineMove {
  0% { left: -100%; }
  60%, 100% { left: 200%; }
}
```

**Step 2: 在元件中引入 CSS**

在 `index.tsx` 開頭加入：

```tsx
import './intro-animation.css';
```

**Step 3: 移除內聯 style 標籤**

刪除元件中的 `<style>{...}</style>` 區塊。

**Step 4: Commit**

```bash
git add -A
git commit -m "perf: 優化 IntroAnimation 動畫效能

- 減少 blur 半徑從 500px 到 80px
- 抽離 CSS 到獨立檔案
- 加入 will-change 和 translateZ 硬體加速

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 5: 建置驗證

### Task 14: 建置並驗證

**Step 1: 執行生產建置**

```bash
npm run build
```

Expected: 建置成功，無錯誤

**Step 2: 檢查 chunk 分割**

```bash
ls -la build/assets/*.js | head -20
```

Expected: 看到多個 chunk 檔案（vendor, pages 等）

**Step 3: 本地預覽**

```bash
npm run preview
```

Expected: 預覽伺服器啟動，頁面正常運作

**Step 4: 最終 Commit**

```bash
git add -A
git commit -m "build: 完成 Vite 遷移與效能優化

完成項目：
- Vite 遷移
- 路由級程式碼分割
- 圖片懶載入
- 動畫效能優化

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## 驗證清單

- [ ] Vite 開發伺服器在 < 1 秒內啟動
- [ ] HMR 更新在 < 100ms 內完成
- [ ] 建置產生多個 chunk 檔案
- [ ] 首頁載入只請求必要資源
- [ ] 圖片在捲動到可視區域時才載入
- [ ] 動畫流暢無卡頓

---

## 回滾計畫

如需回滾到 CRA：

```bash
git revert HEAD~n  # n = 需要回滾的 commit 數量
npm install react-scripts
# 恢復 public/index.html
# 刪除 vite.config.ts 和相關檔案
```

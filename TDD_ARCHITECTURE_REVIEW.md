# TDD 架構檢視與效能優化報告

> **專案**: RichPark 聚碩仁玉企業網站
> **日期**: 2026-01-23
> **目標**: 提高網站效能、保持動畫流暢與吸引人
> **迭代**: #1

---

## 📊 專案現況分析

### 1. 測試覆蓋率狀況 ❌

**測試統計**:
```
測試檔案: 1 個 (App.test.tsx)
測試套件: 1 failed, 1 total
測試案例: 0 total
程式碼覆蓋率: 0%
```

**問題診斷**:
- ✗ 現有測試已過時，無法執行
- ✗ 測試內容與實際 App 元件不符
- ✗ 無測試基礎設施 (test-utils, mocks)
- ✗ 無整合測試、無 E2E 測試

**覆蓋率報告摘要**:
| 類型 | Stmts | Branch | Funcs | Lines |
|------|-------|--------|-------|-------|
| 所有檔案 | 0% | 0% | 0% | 0% |
| 元件 | 0% | 0% | 0% | 0% |
| 頁面 | 0% | 0% | 0% | 0% |
| 工具函數 | 0% | 0% | 0% | 0% |

---

### 2. 架構分析

#### 專案結構
```
src/
├── components/               # 可重用元件
│   ├── backgrounds/          # 背景效果 (Aurora, Ripple, Sunlight)
│   ├── EngineeringPage/      # 工程頁面元件 ⚠️ 重複
│   ├── engineering-layouts/  # 工程布局元件 ⚠️ 重複
│   ├── intro-animation/      # 開場動畫
│   ├── aspect-ratio-container/
│   ├── ripple-button/
│   └── ...
├── pages/                    # 20+ 頁面元件
│   ├── HomePage.tsx
│   ├── BoutiqueMansionPage/
│   ├── FloorPlanPage/
│   ├── KitchenBrandPage/
│   └── ...
├── layouts/                  # MainLayout
├── hooks/                    # useVideoPlayer
├── config/                   # menu.ts
└── utils/                    # storage.ts
```

#### 技術棧
- **前端框架**: React 19.2.0
- **型別系統**: TypeScript 4.9.5
- **路由**: React Router 7.9.6
- **樣式**: Tailwind CSS 3.4.18
- **測試**: Jest + React Testing Library
- **建置工具**: React Scripts 5.0.1

#### 架構優點 ✅
1. 使用 TypeScript 提供型別安全
2. Tailwind CSS 統一樣式規範 (參考 CLAUDE.md)
3. 元件化設計，模組化良好
4. 使用 React Router 進行路由管理

#### 架構問題 ⚠️
1. **重複程式碼**: `EngineeringPage/` 與 `engineering-layouts/` 功能重疊
2. **缺少錯誤處理**: 無 Error Boundary
3. **無狀態管理**: 大型元件狀態管理複雜 (IntroAnimation 528 行)
4. **缺少 logging**: 無錯誤追蹤機制

---

### 3. 效能瓶頸分析 🔍

#### A. 動畫元件效能問題

##### IntroAnimation.tsx (528 行) ⚠️
```typescript
問題識別:
1. 大量使用 setTimeout 進行動畫控制 (非最佳實踐)
2. 複雜的狀態管理,可能導致不必要的重新渲染
3. 缺少 requestAnimationFrame 優化
4. 未使用 CSS transitions/animations

效能影響:
- CPU 使用率高
- 動畫可能不流暢 (非 60fps)
- 記憶體洩漏風險 (timeout 未清理)
```

**優化建議**:
```typescript
// ❌ 現在
setTimeout(() => setPhase(1), 1000);
setTimeout(() => setPhase(2), 2000);

// ✅ 建議
- 使用 CSS animations + onAnimationEnd
- 使用 Framer Motion 進行複雜動畫
- 使用 requestAnimationFrame 進行平滑更新
```

##### AuroraBackground.tsx ⚠️
```typescript
問題識別:
1. 使用 filter: blur() + invert() - GPU 密集運算
2. 多層背景疊加 (3-4 層 div)
3. 60秒無限動畫循環
4. mix-blend-mode: difference - 效能開銷大

效能測試建議:
- Chrome DevTools > Performance > 記錄動畫
- 檢查 FPS (目標 60fps)
- 檢查 GPU 使用率
```

**優化方案**:
```css
/* 方案 1: 減少 filter 使用 */
.aurora {
  /* 改用預處理圖片或 Canvas */
  will-change: transform;
  transform: translateZ(0); /* 強制 GPU 加速 */
}

/* 方案 2: 使用 WebGL shader (進階) */
- 使用 react-three-fiber
- 自訂 fragment shader
```

##### RippleBackground.tsx ⚠️
```typescript
問題識別:
1. setInterval 自動產生波紋 - 可能累積過多 DOM 元素
2. 每個波紋獨立的 div + animation
3. 無波紋數量限制

效能影響:
- DOM 節點累積 > 50+ 個會造成卡頓
- 動畫計算量隨波紋數增加

優化建議:
- 限制同時存在的波紋數量 (max 10-15)
- 使用 Canvas 繪製波紋 (更高效)
- 使用 requestAnimationFrame 替代 setInterval
```

#### B. 圖片載入優化

##### ImageGalleryPage.tsx (230 行) ⚠️
```typescript
問題識別:
1. 無 lazy loading - 所有圖片立即載入
2. 無圖片預載入策略
3. 無響應式圖片 (srcset)
4. 無圖片壓縮/優化

效能影響:
- LCP (Largest Contentful Paint) 過長
- 初始載入時間長
- 行動網路下體驗差
```

**優化方案**:
```tsx
// ✅ React 19 原生優化
<img
  src={image.src}
  loading="lazy"           // 瀏覽器原生 lazy loading
  decoding="async"         // 非同步解碼
  fetchpriority="high"     // 首屏圖片優先
/>

// ✅ 響應式圖片
<img
  srcSet="image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w"
  sizes="(max-width: 640px) 100vw, 640px"
/>

// ✅ 使用圖片優化庫
- next/image (如遷移到 Next.js)
- react-lazy-load-image-component
```

#### C. 程式碼分割 (Code Splitting)

**現況**: 無程式碼分割，所有頁面打包在一起

**優化方案**:
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

// ✅ 動態載入頁面
const HomePage = lazy(() => import('./pages/HomePage'));
const BoutiqueMansionPage = lazy(() => import('./pages/BoutiqueMansionPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boutique" element={<BoutiqueMansionPage />} />
      </Routes>
    </Suspense>
  );
}
```

**預期效果**:
- 初始 bundle 大小減少 50-70%
- FCP (First Contentful Paint) 提升
- TTI (Time to Interactive) 提升

---

## 🎯 TDD 架構優化計劃

### 階段 1: 建立測試基礎設施 (優先 ⭐⭐⭐)

#### 1.1 修復測試環境
```bash
任務清單:
- [x] 分析測試失敗原因
- [ ] 更新 App.test.tsx
- [ ] 確保 Jest 配置正確
- [ ] 設定測試覆蓋率目標 (初期 50%+)
```

#### 1.2 建立測試工具
```typescript
// src/test-utils/render.tsx
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

export function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

// src/test-utils/fixtures.ts
export const mockImageData = {
  images: [
    { src: '/test.jpg', label: 'Test' }
  ],
  title: 'Test Title',
  description: 'Test Description'
};
```

#### 1.3 優先測試核心功能
```typescript
測試優先順序:
1. [P0] App.tsx - 路由正確性
2. [P0] HomePage.tsx - 首頁渲染
3. [P1] PageHeader - 導覽元件
4. [P1] SubpageMenuBar - 子頁面選單
5. [P2] BoutiqueMansionPage - 關鍵業務頁面
```

#### 1.4 測試覆蓋率目標
```
階段 1 (迭代 1-3):  達到 30% 覆蓋率
階段 2 (迭代 4-6):  達到 60% 覆蓋率
階段 3 (迭代 7-10): 達到 80% 覆蓋率
```

---

### 階段 2: 效能優化 (動畫流暢度) (優先 ⭐⭐⭐)

#### 2.1 動畫優化策略

**原則**: 只優化 `transform` 和 `opacity`

```css
/* ✅ GPU 加速屬性 (60fps) */
transform: translate3d(x, y, z);
transform: scale(s);
transform: rotate(deg);
opacity: 0-1;

/* ❌ 避免動畫這些屬性 (會觸發 layout/paint) */
width, height, top, left, margin, padding
```

**實作檢查清單**:
```
- [ ] IntroAnimation: 改用 CSS animations
- [ ] AuroraBackground: 啟用 will-change
- [ ] RippleBackground: 限制波紋數量
- [ ] 所有動畫元件加上 transform: translateZ(0)
```

#### 2.2 圖片優化實作
```tsx
實作步驟:
1. [ ] 壓縮所有圖片 (TinyPNG / ImageOptim)
2. [ ] 生成響應式圖片 (320w, 640w, 1280w)
3. [ ] 實作 lazy loading
4. [ ] 首屏圖片加上 fetchpriority="high"
5. [ ] 非首屏圖片加上 loading="lazy"
```

#### 2.3 Code Splitting 實作
```tsx
實作步驟:
1. [ ] 修改 App.tsx 使用 React.lazy()
2. [ ] 加上 Suspense fallback 元件
3. [ ] 測試各路由載入是否正常
4. [ ] 測量 bundle size 改善
```

#### 2.4 效能基準測試
```bash
測試步驟:
1. npm run build
2. npx serve -s build
3. Chrome DevTools > Lighthouse
4. 記錄效能指標

目標指標:
- FCP < 1.8s
- LCP < 2.5s
- TBT < 200ms
- CLS < 0.1
- FPS = 60
```

---

### 階段 3: 架構重構 (次要 ⭐⭐)

#### 3.1 消除重複程式碼
```
問題: EngineeringPage/ 與 engineering-layouts/ 重複

解決方案:
- [ ] 統一使用 engineering-layouts/
- [ ] 刪除舊的 EngineeringPage/ 元件
- [ ] 更新所有引用
- [ ] 執行測試確保無破壞性變更
```

#### 3.2 建立 Design System (可選)
```
src/design-system/
├── components/
│   ├── Button/
│   ├── Card/
│   └── ...
├── animations/
│   ├── FadeIn/
│   ├── SlideIn/
│   └── ...
└── tokens/
    ├── colors.ts
    ├── spacing.ts
    └── typography.ts
```

#### 3.3 加入錯誤處理
```tsx
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // 記錄錯誤到監控服務
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

// App.tsx
<ErrorBoundary>
  <Router>
    <App />
  </Router>
</ErrorBoundary>
```

---

## 📈 效能指標目標

| 指標 | 現況 | 目標 | 優化方法 |
|------|------|------|----------|
| **FCP** (First Contentful Paint) | ? | < 1.8s | Code splitting, 字型優化 |
| **LCP** (Largest Contentful Paint) | ? | < 2.5s | 圖片優化, lazy loading |
| **TBT** (Total Blocking Time) | ? | < 200ms | 減少 JS 執行時間 |
| **CLS** (Cumulative Layout Shift) | ? | < 0.1 | 固定尺寸, 骨架屏 |
| **FPS** (Frames Per Second) | ? | 60 fps | GPU 加速, 減少重繪 |
| **Bundle Size** | ? | < 500KB | Code splitting, Tree shaking |
| **Test Coverage** | 0% | 80%+ | 撰寫單元/整合測試 |

---

## 🚀 行動計劃

### ✅ 立即執行 (迭代 1)
- [x] 完成專案架構分析
- [x] 識別效能瓶頸
- [x] 制定 TDD 優化計劃
- [ ] 修復 App.test.tsx
- [ ] 建立 test-utils
- [ ] 新增 HomePage 測試
- [ ] 執行 Lighthouse 基準測試

### 📅 短期 (迭代 2-3)
- [ ] IntroAnimation 動畫優化
- [ ] AuroraBackground GPU 加速
- [ ] RippleBackground 波紋限制
- [ ] 圖片 lazy loading 實作
- [ ] Code splitting 主要頁面
- [ ] 測試覆蓋率達 30%+

### 📅 中期 (迭代 4-6)
- [ ] 測試覆蓋率達 60%+
- [ ] 建立 E2E 測試 (Playwright)
- [ ] 效能監控 (Web Vitals)
- [ ] 建立 CI/CD 測試管道
- [ ] 消除重複元件
- [ ] 實作 Error Boundary

### 📅 長期 (迭代 7+)
- [ ] 測試覆蓋率達 80%+
- [ ] 完整的 Design System
- [ ] 自動化效能回歸測試
- [ ] 國際化 (i18n) 支援
- [ ] 無障礙 (a11y) 優化
- [ ] PWA 支援

---

## 💡 技術債務清單

### 高優先級 🔴
1. **測試債務**
   - [ ] 0% 測試覆蓋率
   - [ ] 無整合測試
   - [ ] 無 E2E 測試
   - [ ] 測試環境損壞

2. **效能債務**
   - [ ] IntroAnimation 使用 setTimeout
   - [ ] AuroraBackground 使用高成本 filter
   - [ ] 圖片未優化/壓縮
   - [ ] 無 Code Splitting

### 中優先級 🟡
3. **架構債務**
   - [ ] 重複元件 (EngineeringPage)
   - [ ] 缺少 Error Boundary
   - [ ] 無 logging 機制
   - [ ] 大型元件未拆分 (IntroAnimation 528 行)

### 低優先級 🟢
4. **開發體驗債務**
   - [ ] 無 Storybook/Bit 預覽
   - [ ] 無 ESLint 嚴格規則
   - [ ] 無 Prettier 統一格式
   - [ ] 無 pre-commit hooks

---

## 📝 參考資源

### 效能優化
- [Web Vitals](https://web.dev/vitals/)
- [CSS Triggers](https://csstriggers.com/)
- [React Performance](https://react.dev/learn/render-and-commit)

### 測試
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### 動畫
- [Framer Motion](https://www.framer.com/motion/)
- [React Spring](https://www.react-spring.dev/)
- [GSAP](https://greensock.com/react/)

---

*報告產生時間: 2026-01-23*
*下次更新: 迭代 2 完成後*

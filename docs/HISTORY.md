# 專案歷史紀錄（2026-01 迭代開發濃縮版）

> 本文件濃縮自 12 份迭代工作記錄（完整原文見 git 歷史，2026-07-19 前）。
> 原始文件：FINAL_REPORT、FINAL_STATUS、IMAGE_OPTIMIZATION_PLAN、ITERATION_1~6_SUMMARY、PERFORMANCE_BASELINE、PROJECT_STATUS、RALPH_LOOP_PROGRESS、TDD_ARCHITECTURE_REVIEW。

---

## 一、專案演進時間線

2026-01-23 以「Ralph Loop」自動化模式執行 6 輪迭代，目標為「提高網站效能、保持動畫流暢與吸引人」。當時技術棧：React 19.2.0、TypeScript 4.9.5、React Router 7.9.6、Tailwind CSS 3.4.18、React Scripts 5.0.1、Jest + React Testing Library。

- **迭代 1 — 架構檢視與測試環境重建**：完成全站架構分析，修復損壞的測試環境，建立 `src/test-utils/`。識別主要瓶頸：IntroAnimation（528 行、12 個嵌套 setTimeout）、AuroraBackground（GPU 密集 filter）、RippleBackground（波紋無上限）、圖片無 lazy loading、無 code splitting。
- **迭代 2 — GPU 加速與圖片載入優化**：對 AuroraBackground、RippleBackground、ImageGalleryPage 三個元件套用 GPU 加速；波紋數量以 FIFO 限制在 10 個以內；圖庫頁實作首圖 eager、其餘 lazy 的載入策略。
- **迭代 3 — 元件測試擴展**：小型 UI 元件與配置模組測試補齊，覆蓋率達 3.21%（46 測試）。
- **迭代 4 — Hook 測試與效能基準**：完成 useVideoPlayer 完整測試（14 個，hook 覆蓋率 76%），覆蓋率達 5.41%（60 測試，100% 通過），建立 PERFORMANCE_BASELINE.md。
- **迭代 5 — 實測與瓶頸定位**：以 Playwright 對 production build 首次實測，發現背景圖 `green-diamond-pattern.jpg`（1.2 MB）佔傳輸量 87.6%，FCP 高達 6.3 秒（主因為 IntroAnimation 延遲顯示內容）。
- **迭代 6 — IntroAnimation 時序優化**：建立集中式 `TIMING_CONFIG`，縮短各階段延遲、Logo 改為自動完成（不再無限停留），總動畫時間 6.3s → 4.0s（-37%），bundle 僅增 48 bytes。
- **後續（2026-01-24）**：迭代中列為 P0 的背景圖壓縮已完成——`green-diamond-pattern.jpg`（1.2 MB）轉為 WebP（約 91 KB，-92%）。

---

## 二、效能基準數據（日後效能比對的基準）

### 量測條件

- **量測日期**：2026-01-23（迭代 4-6）
- **環境**：本地 production build（`npm run build` + `npx serve -s build`），Desktop，localhost:3000，以 Playwright 量測（非 Lighthouse；**Lighthouse 完整測試從未實際執行**，當時文件中的 Lighthouse 分數皆為預估值）

### Bundle 大小（gzipped，迭代 4 建置，尚未 code splitting）

| 檔案 | 大小 |
|------|------|
| main.js | 152.36 kB（迭代 6 後為 152.41 kB） |
| main.css | 8.33 kB |
| chunk.js | 1.77 kB |
| **JS 總計** | **約 154 kB** |

### 首頁載入指標（Playwright 實測，迭代 5）

| 指標 | 實測值 | 目標值 | 狀態 |
|------|--------|--------|------|
| First Paint / FCP | 6356 ms | < 1800 ms | 未達標（+353%） |
| DOM Interactive | 40 ms | - | 優秀 |
| DOM Content Loaded | 173 ms | - | 優秀 |
| Load Complete | 174 ms | - | 優秀 |
| Server Response | 33 ms | - | 優秀 |
| JS Heap | 4 MB / 7 MB | - | 正常 |

註：FCP 過長主因是 IntroAnimation 設計上延遲顯示內容；迭代 6 時序優化後推估約 4000 ms（未實測驗證）。

### 資源傳輸分析（迭代 5，共 8 個資源、1368 KB）

| 資源 | 大小 | 佔比 |
|------|------|------|
| green-diamond-pattern.jpg（CSS 背景圖） | 1199 KB | 87.6% |
| main.js | 146 KB | 10.7% |
| CSS 樣式 | 9 KB | 0.7% |
| logo-gold.svg 等 | ~14 KB | 1.0% |

### 效能目標值（作為後續比對標準）

FCP < 1.8s、LCP < 2.5s、TBT < 200ms、CLS < 0.1、SI < 3.4s、TTI < 3.8s、動畫 60fps、Lighthouse Performance > 85。

---

## 三、仍然有效的設計決策

### GPU 加速標準模式（已套用於 AuroraBackground、RippleBackground、ImageGalleryPage）

```css
will-change: transform, opacity;   /* 僅用於即將動畫的元素，過度使用浪費 GPU 記憶體 */
transform: translateZ(0);          /* 強制建立合成層 */
backface-visibility: hidden;
```

原則：只動畫 `transform` 與 `opacity`，避免動畫會觸發 layout 的屬性（width/height/top/left）。

### 圖片載入策略（ImageGalleryPage）

```tsx
loading={index === 0 ? 'eager' : 'lazy'}
fetchPriority={index === 0 ? 'high' : 'auto'}
decoding="async"
```

### 其他機制

- **RippleBackground 波紋上限**：`maxRipples` 預設 10，達上限時 FIFO 移除最舊波紋，防止 DOM 累積。
- **IntroAnimation `TIMING_CONFIG`**：所有動畫時序集中於單一配置物件（charDelay 50 / titleHoldTime 1000 / subtitleDelay 300 / shineDelay 600 / fadeOutTime 400 / logoDelay 400 / logoHoldTime 800，單位 ms），調整時序請改配置而非散落的 setTimeout。
- **測試基礎設施**：當時建立的 `src/test-utils/index.tsx`（renderWithRouter，處理 React Router v7 與 Jest 的 ES modules 相容性）已於 2026-07 清理移除——遷移到 Vitest 後不再需要，僅保留 `test-utils/setup.ts`。

---

## 四、已知限制與未完成事項（截至 2026-01 迭代結束）

### 架構層面的已知問題

- `EngineeringPage/` 與 `engineering-layouts/` 功能重疊（後者已於 2026-07 確認為零引用死碼並刪除）。
- 無 Error Boundary、無 logging / 錯誤追蹤機制。
- IntroAnimation 仍為大型元件（528 行、setTimeout 驅動），僅做時序優化，未重構為 CSS animations。
- AuroraBackground 使用 `filter: blur() + invert()` 與 `mix-blend-mode: difference`，低階裝置仍可能吃緊；長期方案（WebGL shader）未實作。

### 迭代結束時的未完成清單與現況

| 項目 | 當時優先級 | 現況 |
|------|-----------|------|
| 背景圖壓縮（1.2 MB → <200 KB） | P0 | 2026-01-24 完成（WebP 約 91 KB） |
| Code Splitting（React.lazy 路由分割） | P1 | **2026-07 已完成**（全頁面 lazy + vendor chunk） |
| IntroAnimation 徹底重構 | P1 | 未實作（僅時序優化） |
| localStorage 記住「跳過動畫」選擇 | P2 | 未實作 |
| Responsive images（srcset 多尺寸） | P2 | 未實作 |
| 測試覆蓋率 30%（中期）/ 80%（長期）、E2E 測試 | - | 未達成 |
| Lighthouse 實測與 CI 效能回歸 | - | 未執行 |

---

## 五、後記（2026-07-19 大規模整頓）

本輪整頓後的專案狀態（詳見當日 commit 記錄）：

- 建置遷移至 **Vite 7 + Vitest 4**，移除 react-scripts 與全部 CRA 殘留；TypeScript 升級 **5.9**（此前 tsconfig 使用 TS5 語法導致型別檢查失效逾半年）。
- 路由級 code splitting 完成：vendor chunk 43.5 kB gzip 15.7 kB，各頁面獨立 chunk。
- 樣式系統全站對齊 CLAUDE.md design token（text-gray-*/硬編碼色 → 自訂 class）。
- 圖片兩輪優化：修復 CMYK 轉檔缺圖、全站 jpg/png 轉 WebP、清理未使用資產，`public/` 238MB → 191MB。
- 品質基線：`tsc` / `eslint --max-warnings 0` / Vitest 46 測試全綠；npm audit 漏洞歸零。
- Bit 元件化實驗（`.bitmap`、小寫元件目錄、*.composition.tsx）確認棄用並全數移除。

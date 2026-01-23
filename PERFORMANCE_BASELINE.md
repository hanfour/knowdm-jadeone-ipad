# 效能測試基準

> **建立日期**: 2026-01-23
> **Ralph Loop 迭代**: 4
> **專案版本**: 建置於優化後(GPU 加速 + Lazy Loading)

---

## 📊 測試環境

### 建置資訊
```bash
Build Command: npm run build
Build Size (gzipped):
  - main.js: 152.36 kB
  - main.css: 8.33 kB
  - chunk.js: 1.77 kB

Total JS size: ~154 kB (gzipped)
```

### 已實作的優化
1. ✅ **GPU 加速** (迭代 2)
   - AuroraBackground
   - RippleBackground
   - ImageGalleryPage

2. ✅ **圖片 Lazy Loading** (迭代 2)
   - ImageGalleryPage 智慧載入
   - 首圖 eager + high priority
   - 其他圖片 lazy + auto priority

3. ✅ **DOM 元素限制** (迭代 2)
   - RippleBackground 最多 10 個波紋
   - FIFO 清理策略

---

## 🎯 測試方法

### 1. Lighthouse 測試步驟

```bash
# 1. 啟動本地伺服器
npm run build
npx serve -s build -p 3000

# 2. 使用 Chrome DevTools
# - 開啟 Chrome
# - 前往 http://localhost:3000
# - F12 打開 DevTools
# - 切換到 Lighthouse 標籤
# - 選擇「Desktop」或「Mobile」
# - 選擇 Performance 類別
# - 點擊「Analyze page load」
```

### 2. 關鍵指標說明

| 指標 | 英文全名 | 說明 | 目標值 |
|------|---------|------|--------|
| **FCP** | First Contentful Paint | 首次內容繪製時間 | < 1.8s |
| **LCP** | Largest Contentful Paint | 最大內容繪製時間 | < 2.5s |
| **TBT** | Total Blocking Time | 總阻塞時間 | < 200ms |
| **CLS** | Cumulative Layout Shift | 累積版面位移 | < 0.1 |
| **SI** | Speed Index | 速度指數 | < 3.4s |
| **TTI** | Time to Interactive | 可互動時間 | < 3.8s |

---

## 📈 測試結果

### 測試 1: 首頁 (HomePage)

**測試日期**: _待執行_
**測試環境**: Desktop / Mobile
**頁面**: http://localhost:3000

#### 效能指標
```
FCP: _____ s
LCP: _____ s
TBT: _____ ms
CLS: _____
SI: _____ s
TTI: _____ s
Performance Score: _____ / 100
```

#### 資源載入
```
Total Resources: _____
Total Size: _____ MB
JS Size: _____ MB
CSS Size: _____ KB
Image Size: _____ MB
```

#### 截圖
```
_[將 Lighthouse 報告截圖貼於此]_
```

---

### 測試 2: 圖庫頁面 (ImageGalleryPage)

**測試日期**: _待執行_
**測試環境**: Desktop / Mobile
**頁面**: http://localhost:3000/boutique-mansion

#### 效能指標
```
FCP: _____ s
LCP: _____ s
TBT: _____ ms
CLS: _____
SI: _____ s
TTI: _____ s
Performance Score: _____ / 100
```

#### Lazy Loading 效果
```
Initial images loaded: _____
Total images: _____
Images saved from initial load: _____
```

---

### 測試 3: 動畫頁面 (帶 IntroAnimation)

**測試日期**: _待執行_
**測試環境**: Desktop / Mobile
**頁面**: http://localhost:3000 (首次載入)

#### 效能指標
```
FCP: _____ s
LCP: _____ s
TBT: _____ ms
CLS: _____
SI: _____ s
TTI: _____ s
Performance Score: _____ / 100
```

#### 動畫效能
```
Animation FPS: _____ fps (目標: 60fps)
Dropped Frames: _____
Animation Duration: _____ s
```

---

## 🔍 效能分析工具

### Chrome DevTools Performance

```bash
# 1. 開啟 Chrome DevTools (F12)
# 2. 切換到 Performance 標籤
# 3. 點擊錄製按鈕
# 4. 重新載入頁面或執行互動
# 5. 停止錄製
# 6. 分析:
#    - FPS 圖表 (目標: 60fps)
#    - Main thread activity
#    - Network timeline
#    - Screenshot timeline
```

### React DevTools Profiler

```bash
# 1. 安裝 React DevTools
# 2. 開啟 Profiler 標籤
# 3. 點擊錄製按鈕
# 4. 執行互動(換頁、動畫等)
# 5. 停止錄製
# 6. 分析:
#    - 元件渲染時間
#    - 渲染次數
#    - 昂貴的元件
```

### Web Vitals 監控

在專案中可安裝 web-vitals 套件:
```bash
npm install web-vitals
```

```javascript
// 在 index.tsx 中使用
import { reportWebVitals } from './reportWebVitals';

reportWebVitals(console.log);
```

---

## 📊 比較基準

### 迭代 2 前後對比

| 項目 | 優化前 | 優化後 | 改善 |
|------|--------|--------|------|
| GPU 加速 | ❌ 無 | ✅ 3 個元件 | +100% |
| Lazy Loading | ❌ 無 | ✅ 圖庫頁面 | +100% |
| 波紋限制 | ❌ 無限 | ✅ 最多 10 個 | +100% |
| 測試覆蓋率 | 0.44% | 5.41% | +1127% |
| 測試案例 | 8 個 | 60 個 | +650% |

---

## 🎯 效能目標

### 短期目標 (迭代 4-5)

| 指標 | 當前 | 目標 | 優先級 |
|------|------|------|--------|
| FCP | _待測_ | < 1.8s | P0 |
| LCP | _待測_ | < 2.5s | P0 |
| TBT | _待測_ | < 200ms | P1 |
| FPS | _待測_ | 60fps | P0 |
| Lighthouse Score | _待測_ | > 85 | P1 |

### 中期目標 (迭代 6-8)

- Code Splitting 實作
- 圖片格式優化 (WebP)
- Service Worker 快取
- Lighthouse Score > 90

### 長期目標 (迭代 9+)

- Lighthouse Score > 95
- FCP < 1.0s
- LCP < 1.5s
- 完整的效能回歸測試

---

## 🔧 已知效能瓶頸

### 1. IntroAnimation.tsx (P1)
- **問題**: 528 行,使用 12 個嵌套 setTimeout
- **影響**: 初始載入效能、TBT
- **計劃**: 迭代 4-5 重構

### 2. Bundle Size (P1)
- **問題**: main.js 152 kB (gzipped)
- **影響**: 網路傳輸時間
- **計劃**: Code Splitting (迭代 4-5)

### 3. 圖片未全面優化 (P2)
- **問題**: 僅圖庫頁面有 lazy loading
- **影響**: 其他頁面載入時間
- **計劃**: 逐頁實作 (迭代 6+)

---

## 📝 測試檢查清單

### 每次測試前
- [ ] 確認已執行 `npm run build`
- [ ] 確認使用 production build (不是 dev server)
- [ ] 清除瀏覽器快取
- [ ] 關閉其他占用資源的應用程式
- [ ] 使用無痕模式測試

### 測試項目
- [ ] Lighthouse Performance 測試 (Desktop)
- [ ] Lighthouse Performance 測試 (Mobile)
- [ ] Chrome DevTools Performance 錄製
- [ ] React DevTools Profiler 分析
- [ ] 網路節流測試 (Fast 3G)
- [ ] 手動檢查動畫 FPS

### 測試後
- [ ] 記錄所有指標數值
- [ ] 截圖保存 Lighthouse 報告
- [ ] 識別新的效能瓶頸
- [ ] 更新本文件

---

## 📊 回歸測試

每次重大變更後,應重新執行完整測試套件:

```bash
# 1. 執行測試
npm test -- --watchAll=false --coverage

# 2. 建置專案
npm run build

# 3. 啟動伺服器
npx serve -s build -p 3000

# 4. 執行 Lighthouse 測試(3 個關鍵頁面)
# 5. 比較與基準的差異
# 6. 更新本文件
```

---

## 💡 測試建議

### 測試頻率
- **每次迭代完成後**: 完整測試
- **重大優化後**: 重點測試受影響頁面
- **發布前**: 完整回歸測試

### 測試環境
- **Desktop**: 主要開發和測試環境
- **Mobile**: 真實使用者裝置測試
- **不同網路條件**: Fast 3G, 4G, WiFi

### 測試重點
1. 首次載入效能
2. 動畫流暢度 (60fps)
3. 互動回應時間
4. 記憶體使用量
5. 網路資源大小

---

## 🔗 相關資源

- [Web Vitals 官方文件](https://web.dev/vitals/)
- [Lighthouse 評分計算](https://web.dev/performance-scoring/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [React Performance 最佳實踐](https://react.dev/learn/render-and-commit)

---

## 📄 相關文件

- `TDD_ARCHITECTURE_REVIEW.md` - 初始架構分析
- `ITERATION_2_SUMMARY.md` - GPU 加速與 Lazy Loading 實作
- `RALPH_LOOP_PROGRESS.md` - 整體進度追蹤
- `FINAL_REPORT.md` - 完整專案總結

---

*本文件將持續更新，記錄每次效能測試的結果與改進。*
*下次更新: 執行第一次 Lighthouse 測試後*

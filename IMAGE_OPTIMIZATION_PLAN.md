# 圖片優化計劃

> **建立日期**: 2026-01-23
> **優先級**: P0 (緊急)
> **預期效果**: 傳輸量減少 78%,FCP 改善 68%

---

## 🚨 問題識別

### 關鍵問題: green-diamond-pattern.jpg

**檔案資訊**:
```
位置: /public/images/green-diamond-pattern.jpg
大小: 1.2 MB (1,227,776 bytes)
格式: JPEG
佔總傳輸量: 87.6%
```

**影響**:
- ❌ 嚴重拖慢頁面載入
- ❌ FCP 高達 6.3 秒
- ❌ 浪費使用者流量
- ❌ 影響 SEO 和使用者體驗

**使用位置** (5 處):
1. `src/components/IntroAnimation.tsx` - 開場動畫背景
2. `src/components/intro-animation/index.tsx` - 動畫元件
3. `src/pages/VideoPage.tsx` - 影片頁面背景
4. `src/pages/HomePage.tsx` - 首頁背景
5. 其他可能的位置...

---

## 🎯 優化目標

| 指標 | 當前 | 目標 | 改善 |
|------|------|------|------|
| 檔案大小 | 1.2 MB | < 200 KB | -83% |
| 總傳輸量 | 1368 KB | ~300 KB | -78% |
| FCP | 6356 ms | ~2000 ms | -68% |
| 載入時間 | 119 ms | ~30 ms | -75% |

---

## 📋 優化方案

### 方案 1: 圖片壓縮 (推薦) ⭐

**工具選項**:
1. **ImageOptim** (Mac)
   ```bash
   # 拖放圖片到 ImageOptim
   # 通常可減少 60-80% 大小
   ```

2. **TinyPNG / TinyJPG** (線上)
   ```bash
   # https://tinypng.com/
   # 上傳圖片,下載壓縮版本
   # 通常可減少 50-70% 大小
   ```

3. **ImageMagick** (命令列)
   ```bash
   convert green-diamond-pattern.jpg \
     -quality 85 \
     -sampling-factor 4:2:0 \
     -strip \
     green-diamond-pattern-optimized.jpg
   ```

4. **Sharp** (Node.js)
   ```bash
   npm install sharp

   const sharp = require('sharp');
   sharp('green-diamond-pattern.jpg')
     .jpeg({ quality: 85, progressive: true })
     .toFile('green-diamond-pattern-optimized.jpg');
   ```

**預期結果**:
- 大小: 1.2 MB → 200-300 KB
- 視覺品質: 幾乎無損
- 相容性: 100%

---

### 方案 2: WebP 格式 + Fallback

**優點**:
- WebP 比 JPEG 小 25-35%
- 現代瀏覽器支援良好
- 更好的壓縮演算法

**實作**:
```typescript
// 方法 1: Picture element
<picture>
  <source
    srcSet="/images/green-diamond-pattern.webp"
    type="image/webp"
  />
  <img
    src="/images/green-diamond-pattern.jpg"
    alt="背景圖案"
  />
</picture>

// 方法 2: CSS with fallback
.background {
  background-image: url('/images/green-diamond-pattern.webp');
}

.no-webp .background {
  background-image: url('/images/green-diamond-pattern.jpg');
}
```

**轉換工具**:
```bash
# 使用 cwebp (Google WebP tools)
cwebp -q 85 green-diamond-pattern.jpg \
  -o green-diamond-pattern.webp

# 使用 Sharp
sharp('green-diamond-pattern.jpg')
  .webp({ quality: 85 })
  .toFile('green-diamond-pattern.webp');
```

**預期結果**:
- 大小: 壓縮後再減少 25-35%
- 視覺品質: 優秀
- 相容性: 95%+ (需要 fallback)

---

### 方案 3: Responsive Images

**問題**:
目前所有裝置都載入相同大小的圖片

**解決方案**:
```typescript
// 產生多種尺寸
green-diamond-pattern-320w.jpg   // 手機
green-diamond-pattern-768w.jpg   // 平板
green-diamond-pattern-1920w.jpg  // 桌面

// 使用 srcset
<img
  srcset="
    /images/green-diamond-pattern-320w.jpg 320w,
    /images/green-diamond-pattern-768w.jpg 768w,
    /images/green-diamond-pattern-1920w.jpg 1920w
  "
  sizes="100vw"
  src="/images/green-diamond-pattern-1920w.jpg"
  alt="背景圖案"
/>

// CSS background-image
@media (max-width: 768px) {
  .background {
    background-image: url('/images/green-diamond-pattern-768w.jpg');
  }
}
```

---

### 方案 4: CSS 漸層替代 (評估)

**如果圖案簡單,可考慮純 CSS**:

```css
/* 鑽石格紋 CSS 範例 */
.diamond-pattern {
  background:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
```

**優點**:
- 檔案大小: 0 bytes!
- 無網路請求
- 完美縮放

**缺點**:
- 僅適用簡單圖案
- 需要檢查原始圖片是否可用 CSS 重現

---

## 🔧 實施步驟

### 階段 1: 立即優化 (今天)

1. **備份原始圖片**
   ```bash
   cp public/images/green-diamond-pattern.jpg \
      public/images/green-diamond-pattern-original.jpg
   ```

2. **壓縮圖片**
   - 使用 TinyJPG 或 ImageOptim
   - 目標: < 200 KB
   - 檢查視覺品質

3. **替換檔案**
   ```bash
   # 下載壓縮後的圖片
   mv ~/Downloads/green-diamond-pattern-compressed.jpg \
      public/images/green-diamond-pattern.jpg
   ```

4. **測試**
   ```bash
   npm run build
   npx serve -s build -p 3000
   # 開啟 Chrome DevTools > Network
   # 確認圖片大小已減少
   ```

5. **驗證效能**
   - 執行 Lighthouse 測試
   - 確認 FCP 改善
   - 記錄數據

---

### 階段 2: 進階優化 (本週)

1. **產生 WebP 版本**
   ```bash
   cwebp -q 85 public/images/green-diamond-pattern.jpg \
     -o public/images/green-diamond-pattern.webp
   ```

2. **更新程式碼支援 WebP**
   - 修改 IntroAnimation.tsx
   - 修改 HomePage.tsx
   - 修改 VideoPage.tsx
   - 實作 fallback 機制

3. **產生 Responsive 版本**
   ```bash
   # 320px 寬度
   convert green-diamond-pattern.jpg \
     -resize 320x \
     -quality 85 \
     green-diamond-pattern-320w.jpg

   # 768px 寬度
   convert green-diamond-pattern.jpg \
     -resize 768x \
     -quality 85 \
     green-diamond-pattern-768w.jpg
   ```

4. **實作 responsive images**
   - 根據螢幕大小載入適當版本
   - 更新 CSS media queries

---

### 階段 3: 自動化 (下週)

1. **建立圖片優化腳本**
   ```javascript
   // scripts/optimize-images.js
   const sharp = require('sharp');
   const glob = require('glob');

   glob('public/images/**/*.{jpg,png}', (err, files) => {
     files.forEach(file => {
       // 壓縮 JPEG
       sharp(file)
         .jpeg({ quality: 85, progressive: true })
         .toFile(file.replace('.jpg', '-optimized.jpg'));

       // 產生 WebP
       sharp(file)
         .webp({ quality: 85 })
         .toFile(file.replace(/\.(jpg|png)$/, '.webp'));
     });
   });
   ```

2. **加入 package.json**
   ```json
   {
     "scripts": {
       "optimize:images": "node scripts/optimize-images.js"
     }
   }
   ```

3. **建立 CI/CD 檢查**
   - 檢查新增圖片大小
   - 自動壓縮超過閾值的圖片
   - 建立提示或錯誤

---

## 📊 預期效果

### 僅完成階段 1 (壓縮)

**改善**:
```
檔案大小: 1.2 MB → 200 KB (-83%)
總傳輸量: 1368 KB → 314 KB (-77%)
FCP: 6356 ms → ~2500 ms (-61%)
載入時間: 119 ms → ~30 ms (-75%)
```

### 完成階段 1 + 2 (壓縮 + WebP)

**改善**:
```
檔案大小 (WebP): 1.2 MB → 130 KB (-89%)
總傳輸量: 1368 KB → 275 KB (-80%)
FCP: 6356 ms → ~2000 ms (-69%)
Lighthouse Score: 預估 +30 分
```

### 完成所有階段

**改善**:
```
行動裝置傳輸: 1368 KB → ~150 KB (-89%)
桌面傳輸: 1368 KB → ~275 KB (-80%)
FCP (行動): 6356 ms → ~1500 ms (-76%)
FCP (桌面): 6356 ms → ~2000 ms (-69%)
使用者滿意度: 顯著提升 ✨
```

---

## ✅ 檢查清單

### 階段 1: 壓縮
- [ ] 備份原始圖片
- [ ] 使用工具壓縮圖片
- [ ] 檢查視覺品質
- [ ] 替換檔案
- [ ] 重新建置專案
- [ ] 測試各頁面正常顯示
- [ ] 執行效能測試
- [ ] 記錄改善數據

### 階段 2: WebP
- [ ] 產生 WebP 版本
- [ ] 實作 fallback 機制
- [ ] 更新所有使用位置
- [ ] 測試瀏覽器相容性
- [ ] 驗證效能改善

### 階段 3: Responsive
- [ ] 產生多種尺寸
- [ ] 實作 responsive images
- [ ] 測試不同裝置
- [ ] 驗證效能改善

---

## 🎯 成功標準

完成優化後應達到:

- ✅ 圖片大小 < 200 KB (JPEG) 或 < 150 KB (WebP)
- ✅ 總傳輸量 < 400 KB
- ✅ FCP < 2.5 秒
- ✅ Lighthouse Performance > 85
- ✅ 視覺品質無明顯劣化
- ✅ 所有瀏覽器正常顯示

---

*計劃建立時間: 2026-01-23*
*下一步: 執行階段 1 圖片壓縮*

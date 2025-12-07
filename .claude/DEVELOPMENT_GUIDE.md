# 聚碩仁玉 - 開發指南

## 核心設計規範

### 16:9 等比縮放系統

本專案採用 **整體等比縮放** 的方式處理響應式設計，而非傳統的響應式斷點。

#### 設計原則

1. **固定設計稿尺寸**：1920 × 1080 像素（16:9）
2. **整體縮放**：使用 CSS `transform: scale()` 等比縮放所有內容
3. **維持比例**：在任何螢幕尺寸下都維持 16:9 比例
4. **黑邊處理**：
   - 直向裝置（手機）→ 上下黑邊（letterbox）
   - 超寬螢幕 → 左右黑邊（pillarbox）

#### 核心組件：AspectRatioContainer

位置：`src/components/AspectRatioContainer.tsx`

```tsx
<AspectRatioContainer
  baseWidth={1920}   // 設計稿基準寬度
  baseHeight={1080}  // 設計稿基準高度
>
  {children}
</AspectRatioContainer>
```

**運作方式**：
- 外層容器：計算實際顯示尺寸（維持 16:9）
- 內層容器：固定 1920×1080，使用 scale() 縮放
- 縮放原點：top left

#### 開發注意事項

1. **使用固定尺寸**：所有元素應使用固定的 px、rem 值，不需要響應式 class
   ```tsx
   // ✅ 正確
   style={{ fontSize: '3.75rem', width: '200px' }}

   // ❌ 不需要
   className="text-sm md:text-lg lg:text-xl"
   ```

2. **位置使用絕對定位**：
   ```tsx
   // ✅ 正確
   style={{ top: '2rem', left: '2rem' }}
   className="absolute"
   ```

3. **頁面容器設定**：
   ```tsx
   // 頁面根元素應使用 absolute inset-0
   <div className="absolute inset-0 overflow-hidden">
   ```

---

## 動畫系統

### IntroAnimation 開場動畫

位置：`src/components/IntroAnimation.tsx`

#### 動畫階段設定

```tsx
const ANIMATION_CONFIG = {
  phase0: false,  // 第一幕：聽樹先生唱歌
  phase1: false,  // 第二幕：公園在宅休閒
  phase3: true,   // 第二段：高訂品味 對味不凡（含 Shine 掃光）
  phase6: true,   // Logo 階段
};
```

#### Phase 3 時間軸（文字動畫 + Shine 掃光）

1. **主標題打字**：每字 280ms
2. **等待**：最後一字完成後 500ms
3. **副標題淡入**：700ms 過渡
4. **停留**：1500ms
5. **Shine 掃光**：2000ms（金色漸層，blur: 500px）
6. **整體淡出**：1000ms

#### Phase 6（Logo 階段）

- Logo 淡入放大：1000ms
- Shine 效果循環：每 3.5 秒

#### Shine 掃光效果

```css
/* 金色精品質感 */
background: linear-gradient(
  105deg,
  transparent 20%,
  rgba(243, 207, 154, 0.2) 30%,   /* #f3cf9a 金色 */
  rgba(243, 207, 154, 0.6) 43%,
  rgba(255, 255, 255, 0.9) 50%,   /* 中心純白 */
  rgba(243, 207, 154, 0.6) 57%,
  rgba(243, 207, 154, 0.2) 70%,
  transparent 80%
);
filter: blur(500px);
```

---

## 專案結構

```
src/
├── components/
│   ├── AspectRatioContainer.tsx  # 16:9 等比縮放容器
│   ├── IntroAnimation.tsx        # 開場動畫
│   ├── FullscreenMenu.tsx        # 全螢幕選單
│   └── backgrounds/              # 背景效果組件
├── layouts/
│   └── MainLayout.tsx            # 主要版面（包含 AspectRatioContainer）
├── pages/
│   └── HomePage.tsx              # 首頁
├── config/
│   └── menu.ts                   # 選單設定
└── utils/
    └── storage.ts                # sessionStorage 工具
```

---

## 色彩規範

| 用途 | 色碼 | 說明 |
|------|------|------|
| 金色（品牌色） | `#f3cf9a` | Logo、標籤、Shine 效果 |
| 背景綠 | `#c5cbb8` | 第一段動畫背景 |
| 深綠（文字） | `#244525` | 第一段動畫文字 |
| 白色 | `#ffffff` | 主要文字 |
| 白色 80% | `rgba(255,255,255,0.8)` | 副標題 |

---

## 開發伺服器

```bash
# 啟動開發伺服器
npm start

# 區域網路測試
# 伺服器啟動後會顯示 On Your Network 網址
# 例如：http://192.168.31.30:3000
```

---

## 注意事項

1. **不要使用響應式斷點**：整體縮放會自動處理所有尺寸
2. **設計稿基準**：所有尺寸以 1920×1080 為準
3. **z-index 規範**：
   - IntroAnimation：`z-[200]`
   - FullscreenMenu：`z-[100]`
   - 一般內容：`z-10` ~ `z-20`
4. **動畫效能**：使用 `transform` 和 `opacity` 進行動畫，避免重排

# RichPark 企業網站 - 開發規範

## 專案概述

這是一個 React + TypeScript 企業網站專案，使用 Tailwind CSS 進行樣式管理。

---

## 文字樣式規範

> **重要**：所有樣式規範已定義在 `tailwind.config.js`，請優先使用自訂 Tailwind class。

### 字體大小 (Font Size)

為保持全站一致性，請使用以下標準字體大小階級：

| 層級 | 尺寸 | Tailwind Class | 用途 |
|------|------|----------------|------|
| Display | `3.5rem` | `text-display` | 超大標題（精品工學類主標） |
| H1 | `2.5rem` | `text-h1` | 一級標題 |
| H2 | `2rem` | `text-h2` | 二級標題 |
| H3 | `1.75rem` | `text-h3` | 三級標題（品牌設備區塊標題） |
| H4 | `1.5rem` | `text-h4` | 四級標題 |
| Large | `1.5rem` | `text-large` | 大號正文（功能標題、副標題） |
| Body | `1rem` | `text-body` | 正文 |
| Small | `0.9rem` | `text-small` | 小型文字（特色列表項） |
| XSmall | `0.85rem` | `text-xsmall` | 更小文字（產品說明、按鈕） |
| Micro | `0.75rem` | `text-micro` | 極小文字（備註、提示） |

> 備註：`text-h4` 與 `text-large` 目前同為 1.5rem，待後續整併。

**注意**：基礎 `html { font-size: 130%; }` 已在 `index.css` 設定。

---

### 字距 (Letter Spacing)

請使用以下標準字距設定：

| 層級 | 數值 | Tailwind Class | 用途 |
|------|------|----------------|------|
| 超寬 | `0.25em` | `tracking-ultra-custom` | 特殊主視覺標題（直排大標） |
| 最寬 | `0.2em` | `tracking-widest-custom` | 大標題、主視覺標題 |
| 寬 | `0.15em` | `tracking-wider-custom` | 垂直文本、副標題 |
| 中等 | `0.1em` | `tracking-wide-custom` | 一般標題、功能標題 |
| 中窄 | `0.08em` | `tracking-medium-custom` | 說明文字、按鈕、資訊框 |
| 窄 | `0.05em` | `tracking-normal-custom` | 產品名稱、品牌名稱 |
| 正常 | 無設定 | - | 正文內容 |

---

### 行高 (Line Height)

請使用以下標準行高設定：

| 層級 | 數值 | Tailwind Class | 用途 |
|------|------|----------------|------|
| 寬鬆 | `2` | `leading-loose-custom` | 正文段落、介紹文 |
| 舒適 | `1.8` | `leading-relaxed-custom` | 產品說明、描述文字 |
| 正常 | `1.5` | `leading-normal-custom` | 列表項、小文字 |

---

### 顏色系統 (Color System)

#### 深色背景模式（如：廚具、衛浴頁面）

| 用途 | 色碼 | Tailwind Class | 說明 |
|------|------|----------------|------|
| 主文字 | `#f5e6b8` | `text-gold` | 金色，用於標題 |
| 淺金色 | `#faf3dc` | `text-gold-light` | 金色變體 |
| 深金色 | `#d4a853` | `text-gold-deep` / `bg-gold-deep` / `border-gold-deep` | 深金色（按鈕、邊框、強調） |
| 次文字 | `rgba(255,255,255,0.7)` | `text-white/70` | 淡白色 |
| 輔助文字 | `rgba(255,255,255,0.3)` | `text-white/30` | 很淡白色 |

#### 淺色背景模式（一般頁面）

| 用途 | 色碼 | Tailwind Class | 說明 |
|------|------|----------------|------|
| 主標題 | `#1a1a1a` | `text-text-primary` | 深黑色 |
| 副標題 | `#374151` | `text-text-secondary` | 深灰色 |
| 正文 | `#4b5563` | `text-text-tertiary` | 灰色 |
| 說明文字 | `#6b7280` | `text-text-muted` | 淺灰色 |
| 備註 | `#9ca3af` | `text-text-light` | 更淺灰色 |

#### 主題色

| 用途 | 色碼 | Tailwind Class | 說明 |
|------|------|----------------|------|
| 大地棕 | `#68583f` | `text-earth` / `bg-earth` / `border-earth` | 棕色，交通/機能頁主題色 |
| 米白背景 | `#f5f0e6` | `bg-cream` | 米白色背景 |

#### 品牌色

| 品牌 | 色碼 | Tailwind Class |
|------|------|----------------|
| JTL 喜特麗 | `#c41230` | `text-brand-jtl` / `bg-brand-jtl` |
| TUB 大雅廚具 | `#1a5276` | `text-brand-tub` / `bg-brand-tub` |
| SEKISUI | `#0b2d2a` | `text-brand-sekisui` / `bg-brand-sekisui` |
| 3M | `#ff0000` | `text-brand-3m` / `bg-brand-3m` |
| 櫻花 | `#e74c3c` | `text-brand-sakura` / `bg-brand-sakura` |
| TOTO | `#1a5276` | `text-brand-toto` / `bg-brand-toto` |
| Yale | `#1a1a1a` | `text-brand-yale` / `bg-brand-yale` |
| YKK | `#cc0000` | `text-brand-ykk` / `bg-brand-ykk` |
| ROBINA | `#8b4513` | `text-brand-robina` / `bg-brand-robina` |

---

## 樣式撰寫規範

### 優先使用順序

1. **自訂 Tailwind Class** - 優先使用 `tailwind.config.js` 中定義的 class
2. **Tailwind 內建 Class** - 次優先使用 Tailwind 預設 class
3. **內聯 Style** - 僅在必要時使用（如動態品牌色）

### 範例

```tsx
// 最佳：使用自訂 Tailwind class
<h2 className="text-h3 tracking-wide-custom leading-loose-custom text-text-primary">
  標題文字
</h2>

// 可接受：動態值使用內聯 style
<span className="text-large" style={{ color: brand.color }}>
  品牌名稱
</span>

// 避免：全部使用內聯 style
<p style={{ fontSize: '1rem', letterSpacing: '0.1em', lineHeight: 2 }}>
  文字內容
</p>
```

---

## 元件開發規範

### 標題元件

```tsx
// 頁面主標題
<h1 className="text-h1 tracking-widest-custom text-text-primary">

// 區塊標題
<h2 className="text-h3 tracking-wide-custom leading-loose-custom text-text-primary">

// 子區塊標題
<h3 className="text-h4 tracking-wide-custom text-text-secondary">

// 功能標題
<h4 className="text-large tracking-normal-custom text-text-tertiary">
```

### 正文元件

```tsx
// 一般正文
<p className="text-body leading-loose-custom text-text-tertiary">

// 說明文字
<p className="text-small leading-relaxed-custom text-text-muted">

// 備註文字
<p className="text-micro text-text-light">
```

### 深色背景模式

```tsx
// 金色標題
<h2 className="text-h3 tracking-wide-custom text-gold">

// 白色正文
<p className="text-body leading-loose-custom text-white/70">
```

---

## 已完成的優化

2026-07-19 進行全站機械對齊：

1. **text-gray-* 已替換為規範 class**：`text-gray-900/800` → `text-text-primary`、`text-gray-700` → `text-text-secondary`、`text-gray-600` → `text-text-tertiary`、`text-gray-500` → `text-text-muted`、`text-gray-400` → `text-text-light`（僅 text-*；border-gray-*、bg-gray-* 未動）
2. **硬編碼色值已替換為規範 class**：`[#0b2d2a]` → `brand-sekisui`、`[#f5e6b8]` → `gold`、`[#d4a853]` → `gold-deep`、`[#68583f]` → `earth`、`[#f5f0e6]` → `cream`
3. **內聯 letterSpacing 已轉換為 tracking-* class**（僅限 0.05/0.08/0.1/0.15/0.2/0.25em 六個標準值；其他值如 0.3em、0.025em 保留）
4. **`text-sm`/`text-xs` 已替換為 `text-small`/`text-xsmall`**

**尚未對齊**：行高（leading-*）與其餘原生字級（text-xl、text-2xl 等）、內聯 fontSize/lineHeight/color。

---

## 備註

- 修改樣式時請參考本文件的規範
- 新增頁面請遵循現有的樣式系統
- 若需新增樣式變體，請先更新本文件及 `tailwind.config.js`
- `src/components/dev/`、`DevPanel.tsx` 等開發工具不受本規範約束

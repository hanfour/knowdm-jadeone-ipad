# 聚碩仁玉（JADE ONE）建案展示網站

「聚碩仁玉」建案的互動展示網站，設計給接待中心電子看板（iPad / e-board）使用，
呈現水湳智慧城區位、建築工學、精品設備與樓層平面等內容。

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | React 19（純 SPA，`BrowserRouter`） |
| 路由 | React Router DOM 7 |
| 語言 | TypeScript 5.9（`strict` 模式） |
| 建置 | Vite 7 |
| 樣式 | Tailwind CSS 3.4（自訂 design token，見 [CLAUDE.md](CLAUDE.md)） |
| 測試 | Vitest 4 + Testing Library（jsdom 環境） |

## 快速開始

需求：Node.js 24.x（見 `.node-version`）、npm。

```bash
npm install
npm start        # 開發伺服器 http://localhost:3000（自動開瀏覽器）
```

| 指令 | 用途 |
|------|------|
| `npm start` | 啟動 Vite 開發伺服器（port 3000，支援 HMR） |
| `npm run build` | production 建置，輸出到 `build/` |
| `npm run preview` | 預覽 production 建置 |
| `npm test` | Vitest 測試（watch 模式；CI 用 `npx vitest run`） |
| `npm run typecheck` | TypeScript 全量型別檢查 |
| `npm run lint` | ESLint（`--max-warnings 0`；測試檔放寬 `no-node-access`/`no-container` 兩條規則） |

## 專案結構

```
src/
├── App.tsx              # 全部路由定義（所有頁面 lazy load + vendor chunk 分割）
├── config/menu.ts       # 全螢幕選單結構（與路由一一對應，有測試把關）
├── layouts/MainLayout.tsx
├── components/          # 共用元件（FullscreenMenu、SubpageMenuBar、close-button 等）
│   └── dev/             # 開發工具（PolygonDrawer 熱區繪製器，DEV_MODE 開關在 App.tsx）
├── hooks/useVideoPlayer.ts
├── pages/               # 頁面元件（單檔或資料夾形式）
└── utils/storage.ts     # localStorage safe wrapper
public/images/           # 靜態圖片資產（目錄代號見下表）
docs/HISTORY.md          # 開發歷程濃縮（性能基準數據在此）
```

## 頁面路由對照

路由採章節式結構 `/<章節>/<單元>`，全部定義於 `src/App.tsx`。

### 富居水湳 `/fu-ju-shui-nan/`

| 路由 | 頁面 | 元件 |
|------|------|------|
| `ding-mao-wei-lai` | 定錨未來 | `AnchorFuturePage` |
| `guo-ji-xin-du` | 國際新都（地圖地標互動） | `InternationalCityPage` |
| `yong-ya-sen-lv` | 雍雅森綠 | `ImageGalleryPage`（共用圖庫頁） |
| `zhen-xi-shou-cang` | 珍稀收藏 | `PreciousCollectionPage` |
| `sheng-huo-ji-neng` | 生活機能 | `LifeFunctionPage` |
| `jiao-tong-dong-xian` | 交通動線 | `TrafficRoutePage` |
| `fan-hua-shi-qu` | 繁華時區 | （隱藏備用，路由已註解） |

### 巨擘薈萃 `/ju-bo-hui-cui/`

| 路由 | 頁面 | 元件 |
|------|------|------|
| `jian-zhu-ling-hang` | 建築領航 | `ArchitectLeaderPage` |
| `jian-zhu-mei-xue` | 建築美學 | `ArchitectAestheticsPage` |
| `gong-she-yu-jing` | 公設語境 | `PublicFacilityPage` |
| `jing-guan-pin-wei` | 景觀品味 | `LandscapeTastePage` |
| `jie-gou-li-xue` | 結構力學 | `StructuralMechanicsPage` |
| `deng-guang-mei-xue` | 燈光美學 | `LightingAestheticsPage` |

### 優雅精琢 `/you-ya-jing-zhuo/`

| 路由 | 頁面 | 元件 |
|------|------|------|
| `jie-gou-gong-xue` | 結構工學 | `StructuralEngineeringPage` |
| `guan-xian-gong-xue` | 管線工學 | `PipingEngineeringPage` |
| `fang-shui-gong-xue` | 防水工學 | `WaterproofEngineeringPage` |
| `fang-huo-gong-xue` | 防火工學 | `FireProtectionEngineeringPage` |
| `tie-xin-gong-xue` | 貼心工學 | `ThoughtfulEngineeringPage` |
| `jing-pin-gong-xue` | 精品工學（品牌入口） | `BoutiqueMansionPage` |

精品工學子頁 `/you-ya-jing-zhuo/jing-pin-gong-xue/<brand>`：
`kitchen` 廚具、`bathroom` 衛浴、`lock` 電子鎖、`water` 淨水、`window` 窗戶、`flooring` 木地板、`elevator` 電梯。

### 法式寓邸 `/fa-shi-yu-di/`

| 路由 | 頁面 | 元件 |
|------|------|------|
| `fa-shi-mei-xue` | 法式美學 | `FrenchAestheticsPage` |
| `feng-ge-ding-zhi` | 風格訂製（樓層平面互動） | `FloorPlanPage` |

其他：`/` 首頁、`/video`（建置中佔位頁，供直接輸入網址備用）、`*` 導回首頁。

## 圖片資產

### 目錄代號對照（`public/images/`）

| 目錄 | 對應內容 |
|------|----------|
| `a1`~`a6` | 富居水湳：a1 國際新都、a2 珍稀收藏、a3 雍雅森綠、a4 繁華時區（備用）、a5/a6 交通動線 |
| `b1`~`b6` | 巨擘薈萃：b1 建築領航、b2 建築美學、b3 公設語境、b4 景觀品味、b5 結構力學、b6 燈光美學 |
| `c1`、`c2` | 法式寓邸：c1 法式美學、c2 風格訂製（`aerial/` 空拍、`floor-plans/` 平面、`facilities/` 公設） |
| `kitchen` / `bathroom` / `lock` / `water` / `window-flooring` / `elevator` / `boutique` | 精品工學各品牌 |
| `structural` / `piping` / `waterproof` / `fireprotection` / `thoughtful` | 工學章節（含 .mov 工法影片） |
| `awards` / `anchor-future` / `precious-collection` / `video` | 獎項、定錨未來、珍稀收藏、影片資源 |

### 新增圖片 SOP（WebP 管線）

全站圖片統一使用 WebP。新圖入庫流程：

```bash
# 1. 先檢查色彩空間（印刷來源常是 CMYK！）
sips -g space 原圖.jpg

# 2a. RGB 圖：直接轉
cwebp -q 82 原圖.jpg -o 目標.webp

# 2b. CMYK 圖：必須先轉 sRGB，否則 cwebp 會直接失敗
#（歷史教訓：批次轉檔時 CMYK 圖被靜默略過，造成上線缺圖）
sips --matchTo '/System/Library/ColorSync/Profiles/sRGB Profile.icc' \
     -s format png 原圖.jpg --out temp.png
cwebp -q 82 temp.png -o 目標.webp && rm temp.png
```

注意事項：

- 中文檔名可用（Vite 正常服務），新檔沿用鍵盤直接輸入（NFC 正規化）即可，避免混用 NFC/NFD。
- 程式碼引用一律絕對路徑 `/images/...`。驗證是否缺圖時注意：SPA fallback 會讓缺圖也回 200（回的是 index.html），要確認回應的 `content-type` 是 `image/webp` 才算存在。
- 國際新都頁的地圖地標錨點採百分比座標（`InternationalCityPage.tsx` 的 `pos` 欄位），更換地圖底圖時需重新校準。

## 樣式規範

字級、字距、行高、顏色一律使用 `tailwind.config.js` 定義的自訂 token（`text-h1`~`text-micro`、
`tracking-*-custom`、`text-text-*` 色階、品牌色等）。完整規範與範例見 **[CLAUDE.md](CLAUDE.md)**（單一事實來源）。
`src/components/dev/` 等開發工具不受規範約束。

## 開發模式工具

`src/App.tsx` 內建開關：

```typescript
// 開發模式開關 - 正式上線時設為 false
const DEV_MODE = false;
```

啟用後可使用多邊形繪製器（PolygonDrawer）等熱區繪製輔助工具。

如需環境變數，Vite 使用 `VITE_` 前綴（`.env` 中的 `VITE_XXX` 可透過 `import.meta.env.VITE_XXX` 取得）；目前專案未使用任何環境變數。

## 部署

`npm run build` 產出 `build/` 為純靜態檔案，可部署至任何靜態託管；因為是 SPA，需將未知路徑 fallback 到 `index.html`。

**Nginx 設定範例：**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 靜態資源快取
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp|mov|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache 設定（.htaccess）：**

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

## 開發歷程

2026-01 起以 AI 輔助迭代開發，過程紀錄濃縮於 [docs/HISTORY.md](docs/HISTORY.md)（含效能基準數據與既有設計決策）。

## License

Private - All Rights Reserved

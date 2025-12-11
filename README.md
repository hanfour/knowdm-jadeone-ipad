# 富居建設 企業形象網站

富居建設水湳智慧城建案的企業形象網站，展示建案特色、地理位置、建築美學與生活機能等資訊。

## 技術棧

- **框架**: React 19
- **路由**: React Router DOM 7
- **樣式**: Tailwind CSS 3
- **語言**: TypeScript
- **建構工具**: Create React App

## 專案結構

```
corporate-website/
├── public/
│   └── images/          # 靜態圖片資源
│       ├── a1-a6/       # 富居水湳相關圖片
│       └── b1-b5/       # 巨擘薈萃相關圖片
├── src/
│   ├── components/      # 共用元件
│   │   ├── backgrounds/ # 背景動畫效果元件
│   │   └── dev/         # 開發工具元件
│   ├── config/          # 設定檔 (選單配置等)
│   ├── layouts/         # 版面配置
│   ├── pages/           # 頁面元件
│   └── utils/           # 工具函式
├── tailwind.config.js   # Tailwind CSS 設定
└── package.json
```

## 頁面路由

| 路徑 | 頁面說明 |
|------|---------|
| `/` | 首頁 |
| `/video` | 影片頁面 |
| `/fu-ju-shui-nan/guo-ji-xin-du` | 國際新都 |
| `/fu-ju-shui-nan/xi-you-du-xiang` | 稀有獨享 |
| `/fu-ju-shui-nan/yong-ya-sen-lv` | 雍雅森綠 |
| `/fu-ju-shui-nan/fan-hua-shi-qu` | 繁華時區 |
| `/fu-ju-shui-nan/sheng-huo-ji-neng` | 生活機能 |
| `/fu-ju-shui-nan/jiao-tong-dong-xian` | 交通動線 |
| `/ju-bo-hui-cui/jian-zhu-ling-hang` | 建築領航 |
| `/ju-bo-hui-cui/jian-zhu-mei-xue` | 建築美學 |
| `/ju-bo-hui-cui/gong-she-yu-jing` | 公設語境 |
| `/ju-bo-hui-cui/jing-guan-pin-wei` | 景觀品味 |
| `/ju-bo-hui-cui/jie-gou-li-xue` | 結構力學 |

## 系統需求

- Node.js 18.x 或以上
- npm 9.x 或以上

## 安裝與啟動

### 1. 安裝依賴套件

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm start
```

啟動後在瀏覽器開啟 [http://localhost:3000](http://localhost:3000) 即可預覽。

開發伺服器支援熱重載 (Hot Reload)，修改程式碼後頁面會自動更新。

### 3. 執行測試

```bash
npm test
```

## 部署

### 建置生產版本

```bash
npm run build
```

建置完成後，靜態檔案會產生在 `build/` 目錄中。

### 部署至靜態網站託管服務

`build/` 目錄中的檔案可部署至任何靜態網站託管服務：

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
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache 設定 (.htaccess)：**

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

### 部署至雲端平台

**Vercel：**
```bash
npm install -g vercel
vercel
```

**Netlify：**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

**GitHub Pages：**
1. 在 `package.json` 中新增 `"homepage": "https://yourusername.github.io/repo-name"`
2. 安裝 gh-pages: `npm install --save-dev gh-pages`
3. 在 `scripts` 中新增：
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
4. 執行部署: `npm run deploy`

## 開發模式

專案內建開發工具，可在 `src/App.tsx` 中設定：

```typescript
// 開發模式開關 - 正式上線時設為 false
const DEV_MODE = false;
```

啟用後可使用多邊形繪製器等開發輔助工具。

## 環境變數

如需設定環境變數，請建立 `.env` 檔案：

```env
REACT_APP_API_URL=https://api.example.com
```

## License

Private - All Rights Reserved

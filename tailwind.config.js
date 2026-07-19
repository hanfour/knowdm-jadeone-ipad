/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 字體大小規範
      fontSize: {
        'display': '3.5rem',    // 超大標題（精品工學類主標）
        'h1': '2.5rem',         // 一級標題
        'h2': '2rem',           // 二級標題
        'h3': '1.75rem',        // 三級標題（品牌設備區塊標題）
        'large': '1.5rem',      // 大號正文（功能標題、副標題）
        'body': '1rem',         // 正文
        'small': '0.9rem',      // 小型文字（特色列表項）
        'xsmall': '0.85rem',    // 更小文字（產品說明、按鈕）
        'micro': '0.75rem',     // 極小文字（備註、提示）
      },
      // 字距規範
      letterSpacing: {
        'ultra-custom': '0.25em',   // 超寬字距（特殊主視覺標題）
        'widest-custom': '0.2em',   // 大標題、主視覺標題
        'wider-custom': '0.15em',   // 垂直文本、副標題
        'wide-custom': '0.1em',     // 一般標題、功能標題
        'medium-custom': '0.08em',  // 中等字距（說明文字、副標）
        'normal-custom': '0.05em',  // 產品名稱、品牌名稱
      },
      // 行高規範（正文段落用原生 leading-loose(2)、列表用原生 leading-normal(1.5)）
      lineHeight: {
        'relaxed-custom': '1.8',  // 產品說明、描述文字（介於原生 relaxed 與 loose 之間）
      },
      // 顏色規範
      colors: {
        // 深色背景模式
        'gold': '#f5e6b8',        // 金色主文字
        'gold-deep': '#d4a853',   // 深金色
        // 主題色
        'earth': '#68583f',       // 棕色（交通/機能頁主題色）
        'cream': '#f5f0e6',       // 米白背景
        // 品牌色（其餘品牌色以各頁 data 動態 inline style 提供，未收錄 token）
        'brand': {
          'sekisui': '#0b2d2a',   // SEKISUI（深綠）
          'sakura': '#e74c3c',    // 櫻花（紅）
        },
        // 文字色階
        'text': {
          'primary': '#1a1a1a',   // 主標題
          'secondary': '#374151', // 副標題 (gray-700)
          'tertiary': '#4b5563',  // 正文 (gray-600)
          'muted': '#6b7280',     // 說明文字 (gray-500)
          'light': '#9ca3af',     // 備註 (gray-400)
        },
      },
    },
  },
  plugins: [],
}

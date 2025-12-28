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
        'h4': '1.5rem',         // 四級標題
        'large': '1.25rem',     // 大號正文（功能標題、副標題）
        'body': '1rem',         // 正文
        'small': '0.9rem',      // 小型文字（特色列表項）
        'xsmall': '0.85rem',    // 更小文字（產品說明、按鈕）
        'micro': '0.75rem',     // 極小文字（備註、提示）
      },
      // 字距規範
      letterSpacing: {
        'widest-custom': '0.2em',   // 大標題、主視覺標題
        'wider-custom': '0.15em',   // 垂直文本、副標題
        'wide-custom': '0.1em',     // 一般標題、功能標題
        'normal-custom': '0.05em',  // 產品名稱、品牌名稱
      },
      // 行高規範
      lineHeight: {
        'loose-custom': '2',      // 正文段落、介紹文
        'relaxed-custom': '1.8',  // 產品說明、描述文字
        'normal-custom': '1.5',   // 列表項、小文字
      },
      // 顏色規範
      colors: {
        // 深色背景模式
        'gold': {
          DEFAULT: '#f5e6b8',     // 金色主文字
          light: '#faf3dc',       // 淺金色
        },
        // 品牌色
        'brand': {
          'jtl': '#c41230',       // JTL 喜特麗（紅）
          'tub': '#1a5276',       // TUB 大雅廚具（藍）
          'sekisui': '#0b2d2a',   // SEKISUI（深綠）
          '3m': '#ff0000',        // 3M（紅）
          'sakura': '#e74c3c',    // 櫻花（紅）
          'toto': '#1a5276',      // TOTO（藍）
          'yale': '#1a1a1a',      // Yale（黑）
          'ykk': '#cc0000',       // YKK（紅）
          'robina': '#8b4513',    // ROBINA（棕）
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

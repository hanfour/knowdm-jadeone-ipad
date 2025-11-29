/**
 * 安全的 sessionStorage 操作工具
 * 處理隱私模式和其他存取錯誤
 */

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      console.warn(`無法讀取 sessionStorage: ${key}`);
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      sessionStorage.setItem(key, value);
      return true;
    } catch {
      console.warn(`無法寫入 sessionStorage: ${key}`);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      console.warn(`無法刪除 sessionStorage: ${key}`);
      return false;
    }
  },
};

// 常用 key 常數
export const STORAGE_KEYS = {
  HAS_PLAYED_INTRO: 'hasPlayedIntro',
} as const;

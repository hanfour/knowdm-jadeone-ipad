import { safeSessionStorage, STORAGE_KEYS } from './storage';

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

describe('Storage Utils', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
  });

  describe('safeSessionStorage.setItem', () => {
    test('應該正確儲存字串值', () => {
      const result = safeSessionStorage.setItem('testKey', 'testValue');

      expect(result).toBe(true);
      expect(sessionStorage.getItem('testKey')).toBe('testValue');
    });

    test('應該正確儲存並讀取值', () => {
      safeSessionStorage.setItem('testKey', 'testValue');
      const value = safeSessionStorage.getItem('testKey');

      expect(value).toBe('testValue');
    });
  });

  describe('safeSessionStorage.getItem', () => {
    test('應該正確讀取儲存的值', () => {
      sessionStorage.setItem('testKey', 'testValue');

      const result = safeSessionStorage.getItem('testKey');
      expect(result).toBe('testValue');
    });

    test('當 key 不存在時應該返回 null', () => {
      const result = safeSessionStorage.getItem('nonExistentKey');
      expect(result).toBeNull();
    });
  });

  describe('safeSessionStorage.removeItem', () => {
    test('應該正確移除指定的 key', () => {
      sessionStorage.setItem('testKey', 'testValue');
      const result = safeSessionStorage.removeItem('testKey');

      expect(result).toBe(true);
      expect(sessionStorage.getItem('testKey')).toBeNull();
    });
  });

  describe('STORAGE_KEYS', () => {
    test('應該包含 HAS_PLAYED_INTRO key', () => {
      expect(STORAGE_KEYS.HAS_PLAYED_INTRO).toBe('hasPlayedIntro');
    });
  });
});

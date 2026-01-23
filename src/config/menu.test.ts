import { menuSections, MenuItem, MenuSection } from './menu';

describe('Menu Configuration', () => {
  test('應該包含選單區塊', () => {
    expect(menuSections).toBeDefined();
    expect(Array.isArray(menuSections)).toBe(true);
    expect(menuSections.length).toBeGreaterThan(0);
  });

  test('每個選單區塊應該有必要的屬性', () => {
    menuSections.forEach(section => {
      expect(section).toHaveProperty('category');
      expect(section).toHaveProperty('title');
      expect(section).toHaveProperty('items');
      expect(typeof section.category).toBe('string');
      expect(Array.isArray(section.title)).toBe(true);
      expect(Array.isArray(section.items)).toBe(true);
    });
  });

  test('每個選單項目應該有正確的結構', () => {
    menuSections.forEach(section => {
      section.items.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('link');
        expect(typeof item.id).toBe('string');
        expect(typeof item.name).toBe('string');
        expect(typeof item.link).toBe('string');
      });
    });
  });

  test('所有連結應該以 / 開頭', () => {
    menuSections.forEach(section => {
      section.items.forEach(item => {
        expect(item.link).toMatch(/^\//);
      });
    });
  });

  test('不應該有重複的連結', () => {
    const allLinks: string[] = [];
    menuSections.forEach(section => {
      section.items.forEach(item => {
        allLinks.push(item.link);
      });
    });

    const uniqueLinks = new Set(allLinks);
    expect(uniqueLinks.size).toBe(allLinks.length);
  });

  test('應該包含「富居水湳」區塊', () => {
    const section = menuSections.find(s => s.category === '富居水湳');
    expect(section).toBeDefined();
    expect(section?.items.length).toBeGreaterThan(0);
  });

  test('應該包含「優雅精琢」區塊', () => {
    const section = menuSections.find(s => s.category === '優雅精琢');
    expect(section).toBeDefined();
    expect(section?.items.length).toBeGreaterThan(0);
  });
});

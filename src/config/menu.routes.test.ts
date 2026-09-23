/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { menuSections } from './menu';

// Vite 會改寫 new URL(字面值, import.meta.url)，先存變數才保留 file: URL。
const metaUrl = import.meta.url;
const appSourcePath = fileURLToPath(new URL('../App.tsx', metaUrl));

function collectActiveRoutePaths(source: string): Set<string> {
  const withoutBlockComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLineComments = withoutBlockComments
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n');

  const paths = new Set<string>();
  for (const match of withoutLineComments.matchAll(/path="([^"]*)"/g)) {
    paths.add(match[1]);
  }
  return paths;
}

describe('menuSections links vs App routes', () => {
  const activePaths = collectActiveRoutePaths(readFileSync(appSourcePath, 'utf8'));

  test('每個 menuSections item.link 都出現在生效的 Route path', () => {
    const links = menuSections.flatMap((section) => section.items.map((item) => item.link));
    const missing = links.filter((link) => !activePaths.has(link));
    expect(missing).toEqual([]);
  });

  test('生效路徑包含首頁與萬用路由', () => {
    expect(activePaths.has('/')).toBe(true);
    expect(activePaths.has('*')).toBe(true);
  });

  test('註解掉的繁華時區路由不算生效', () => {
    expect(activePaths.has('/fu-ju-shui-nan/fan-hua-shi-qu')).toBe(false);
  });
});

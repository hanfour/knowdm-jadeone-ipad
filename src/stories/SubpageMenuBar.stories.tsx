import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SubpageMenuBar from '../components/SubpageMenuBar';

/**
 * 子頁面導航列元件
 * 顯示當前區塊的子頁面連結，右側帶有 MenuButton
 */
export default {
  title: 'Components/SubpageMenuBar',
  component: SubpageMenuBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    sectionIndex: {
      control: { type: 'number', min: 0, max: 3 },
      description: '區塊索引（0-3）',
    },
  },
};

/**
 * 富居水湳區塊 (sectionIndex: 0)
 */
export const FuJuShuiNan = {
  args: {
    sectionIndex: 0,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/fu-ju-shui-nan/ding-mao-wei-lai']}>
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#1a1a1a' }}>
          <Story />
          <div style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>
            <p>頁面內容區域</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 巨擘薈萃區塊 (sectionIndex: 1)
 */
export const JuBoHuiCui = {
  args: {
    sectionIndex: 1,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/ju-bo-hui-cui/jian-zhu-ling-hang']}>
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#1a1a1a' }}>
          <Story />
          <div style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>
            <p>頁面內容區域</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 優雅精琢區塊 (sectionIndex: 2)
 */
export const YouYaJingZhuo = {
  args: {
    sectionIndex: 2,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/you-ya-jing-zhuo/jie-gou-gong-xue']}>
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#1a1a1a' }}>
          <Story />
          <div style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>
            <p>頁面內容區域</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

/**
 * 法式寓邸區塊 (sectionIndex: 3)
 */
export const FaShiYuDi = {
  args: {
    sectionIndex: 3,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter initialEntries={['/fa-shi-yu-di/fa-shi-mei-xue']}>
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#1a1a1a' }}>
          <Story />
          <div style={{ paddingTop: '100px', color: 'white', textAlign: 'center' }}>
            <p>頁面內容區域</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

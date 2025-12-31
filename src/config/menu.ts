export interface MenuItem {
  id: string;
  name: string;
  link: string;
}

export interface MenuSection {
  category: string;
  title: string[];
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    category: '富居水湳',
    title: ['齊步世界', '亮眼軸線'],
    items: [
      { id: '01', name: '國際新都', link: '/fu-ju-shui-nan/guo-ji-xin-du' },
      { id: '02', name: '稀有獨享', link: '/fu-ju-shui-nan/xi-you-du-xiang' },
      { id: '03', name: '雍雅森綠', link: '/fu-ju-shui-nan/yong-ya-sen-lv' },
      { id: '04', name: '繁華時區', link: '/fu-ju-shui-nan/fan-hua-shi-qu' },
      { id: '05', name: '生活機能', link: '/fu-ju-shui-nan/sheng-huo-ji-neng' },
      { id: '06', name: '交通動線', link: '/fu-ju-shui-nan/jiao-tong-dong-xian' },
    ]
  },
  {
    category: '巨擘薈萃',
    title: ['獨領經典', '風格執筆'],
    items: [
      { id: '01', name: '建築領航', link: '/ju-bo-hui-cui/jian-zhu-ling-hang' },
      { id: '02', name: '建築美學', link: '/ju-bo-hui-cui/jian-zhu-mei-xue' },
      { id: '03', name: '公設語境', link: '/ju-bo-hui-cui/gong-she-yu-jing' },
      { id: '04', name: '景觀品味', link: '/ju-bo-hui-cui/jing-guan-pin-wei' },
      { id: '05', name: '結構力學', link: '/ju-bo-hui-cui/jie-gou-li-xue' },
    ]
  },
  {
    category: '優雅精琢',
    title: ['時間淬鍊', '永續信任'],
    items: [
      { id: '01', name: '結構工學', link: '/you-ya-jing-zhuo/jie-gou-gong-xue' },
      { id: '02', name: '管線工學', link: '/you-ya-jing-zhuo/guan-xian-gong-xue' },
      { id: '03', name: '防水工學', link: '/you-ya-jing-zhuo/fang-shui-gong-xue' },
      { id: '04', name: '貼心工學', link: '/you-ya-jing-zhuo/tie-xin-gong-xue' },
      { id: '05', name: '安全工學', link: '/you-ya-jing-zhuo/an-quan-gong-xue' },
      { id: '06', name: '數位工學', link: '/you-ya-jing-zhuo/shu-wei-gong-xue' },
      { id: '07', name: '精品工學', link: '/you-ya-jing-zhuo/jing-pin-gong-xue' },
    ]
  },
  {
    category: '法式寓邸',
    title: ['美學序列', '黃金剪裁'],
    items: [
      { id: '01', name: '法式美學', link: '/fa-shi-yu-di/fa-shi-mei-xue' },
      { id: '02', name: '風格訂製', link: '/fa-shi-yu-di/feng-ge-ding-zhi' },
    ]
  },
];

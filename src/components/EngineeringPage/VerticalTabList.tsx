import React from 'react';

export interface TabItem {
  id: string;
  name: string;
}

interface VerticalTabListProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  footnote?: string;
}

const VerticalTabList: React.FC<VerticalTabListProps> = ({
  tabs,
  activeTab,
  onTabChange,
  footnote = '示意圖僅供參考，實際依現場施工為準',
}) => {
  return (
    <div className="absolute right-8 bottom-6 flex flex-col items-end gap-4 z-50">
      {/* Tabs 列表 - 橫向排列 */}
      <div className="flex items-end gap-3">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative">
            {/* Shine 邊框效果 - 僅選中時顯示 */}
            {activeTab === tab.id && (
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 border border-white/40" />
                <div className="absolute inset-0 shine-border" />
              </div>
            )}
            <button
              onClick={() => onTabChange(tab.id)}
              className={`
                tab-item px-2 py-4 h-28 text-micro tracking-normal-custom
                [writing-mode:vertical-rl] [text-orientation:mixed]
                ${activeTab === tab.id
                  ? 'active bg-[#0b2d2a] text-gold'
                  : 'bg-[#0b2d2a] text-white/80'
                }
              `}
            >
              {tab.name}
            </button>
          </div>
        ))}
      </div>

      {/* 右下角註解 */}
      <p className="text-micro text-text-light">
        {footnote}
      </p>
    </div>
  );
};

export default VerticalTabList;

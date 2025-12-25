import React from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

interface FeatureItem {
  icon: string;
  title: string;
  badge?: string;
  description: string;
}

// 特色功能按照左右順序交錯排列，確保 Grid 渲染時每一列對齊
const features: FeatureItem[] = [
  // Row 1
  {
    icon: '/images/lock/icons/藍芽.svg',
    title: '藍芽手機開門',
    description: '支援藍芽連線，手機即鑰匙，更快更方便。',
  },
  {
    icon: '/images/lock/icons/safe.svg',
    title: '專利安全按鈕',
    badge: 'Yale 獨家專利',
    description: '門內把手上專利安全按鈕，按下安全按鈕並轉動內把手時，房門才能開啟，防止孩童或大型寵物誤開。',
  },
  // Row 2
  {
    icon: '/images/lock/icons/解鎖.svg',
    title: '多種解鎖方式',
    description: 'RFID感應卡片(支援悠遊卡、一卡通)、指紋辨識、個人化密碼、機械鑰匙；亦可加裝遠端模組透過Yale Home App執行遠端管理。',
  },
  {
    icon: '/images/lock/icons/機械鑰匙.svg',
    title: '隱藏式機械鑰匙孔',
    description: '緊急情況下，可以使用備用機械鑰匙。',
  },
  // Row 3
  {
    icon: '/images/lock/icons/語音.svg',
    title: '語音提示',
    description: '具繁體中文、簡體中文、英文、韓文，共四種語言。',
  },
  {
    icon: '/images/lock/icons/警報.svg',
    title: '入侵/破壞 警報功能',
    description: '當有人試圖破壞門鎖、強行開門，門鎖自動發出80分貝以上警報聲響。',
  },
  // Row 4
  {
    icon: '/images/lock/icons/節電.svg',
    title: '節電設計',
    description: '鍵盤以手掌觸碰喚醒，無需24小時待機，延長電池使用時間，節能環保。',
  },
  {
    icon: '/images/lock/icons/節電.svg',
    title: '低電量提示及緊急電源開鎖',
    description: '電量不足時，螢幕右下角閃爍紅色警示燈，提醒更換電池；當電池耗盡時，可於外部連接9V電池，作為緊急電源開鎖。',
  },
  // Row 5
  {
    icon: '/images/lock/icons/自動上鎖.svg',
    title: '自動上鎖功能',
    description: '門扇關上時約三秒自動上鎖，亦可設定手動上鎖模式。',
  },
  {
    icon: '/images/lock/icons/虛位密碼.svg',
    title: '虛位密碼功能',
    description: '任意在密碼前或後輸入數字加以組合，防止被人窺竊密碼。',
  },
];

const LockBrandPage: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 */}
      <div
        className="absolute inset-0 flex"
        style={{ top: '80px' }}
      >
        {/* 左側：情境示意圖 (40%) */}
        <div className="w-[40%] h-full overflow-hidden">
          <img
            src="/images/lock/lock-bg.jpg"
            alt="電子鎖情境"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 右側：文字區塊 (60%) */}
        <div
          className="w-[60%] flex flex-col justify-center px-10 py-8 overflow-y-auto"
          style={{ backgroundColor: '#f5f5f5' }}
        >
          {/* 產品標題 */}
          <h2
            className="text-gray-900 font-medium mb-8"
            style={{ fontSize: '1.75rem', letterSpacing: '0.1em' }}
          >
            <b>Yale 歐規鎖匣型</b>（卡片密碼型電子鎖）
          </h2>

          {/* 兩欄特色列表 - 使用 Grid 確保每列對齊 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-4 group cursor-pointer p-3 -m-3 transition-all duration-300 hover:bg-white/60 backdrop-blur-sm hover:shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="text-gray-900 font-medium transition-colors duration-300 group-hover:text-[#0b2d2a]"
                      style={{ fontSize: '1.25rem', letterSpacing: '0.1em' }}
                    >
                      {feature.title}
                    </h3>
                    {feature.badge && (
                      <span
                        className="px-2 py-0.5 text-xs border border-gray-800 rounded transition-colors duration-300 group-hover:border-amber-700 group-hover:text-amber-700"
                        style={{ fontSize: '0.75rem' }}
                      >
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800"
                    style={{ fontSize: '1rem', lineHeight: '1.5' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 右下角註解 */}
          <div className="absolute bottom-4 right-8">
            <p className="text-gray-500" style={{ fontSize: '0.75em' }}>
              產品情境示意圖僅供參考，以實際施工及合約為準
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockBrandPage;

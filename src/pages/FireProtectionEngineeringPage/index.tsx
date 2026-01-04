import React, { useState, useRef, useEffect } from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

// 特色項目結構
interface FeatureItem {
  label: string;
  text: string;
}

// 比較項目結構
interface ComparisonItem {
  image: string;
  title: string;
  description: string;
}

// 表格行結構
interface TableRow {
  項目: string;
  牆面厚度: string;
  耐火性: string;
  隔音性: string;
  防潮性: string;
  抗震性: string;
  isHighlight?: boolean;
}

// Tab 資料結構
interface TabData {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  content?: string;
  features?: FeatureItem[];
  // 比較模式：左右兩張圖各自帶文字
  comparison?: {
    left: ComparisonItem;
    right: ComparisonItem;
  };
  // 單圖模式
  image?: string;
  // 影片模式
  video?: string;
  videoShowReplay?: boolean;
  // 表格資料
  tableData?: TableRow[];
}

// 三個章節的資料
const tabs: TabData[] = [
  {
    id: 'floor-exhaust',
    name: '當層排氣系統',
    title: '當層排氣系統',
    subtitle: 'Floor Exhaust System',
    content: '傳統垂直向「煙囪式排氣管」，容易有異味飄進自家浴室以及衛生問題，本案浴室抽風排氣管採用當層排放，換風扇之排放管口設有防逆流閘門，防止臭味逆流，保持室內空氣清新舒適。',
  },
  {
    id: 'digital-fire-detection',
    name: '數位消防偵測',
    title: '數位消防偵測系統',
    subtitle: 'Digital Fire Detection System',
    comparison: {
      left: {
        image: '/images/fireprotection/digital-fire-detection-01.jpg',
        title: '傳統工法',
        description: '消防火警偵測系統當其中一戶發生火災時，住戶或管委會透過消防警報系統，僅能得知火災樓層，無法進一步確認實際發生火災戶別。',
      },
      right: {
        image: '/images/fireprotection/digital-fire-detection-02.jpg',
        title: '本案工法',
        description: '利用先進R型消防偵測系統，住戶或管委會將可於火災發生第一時間立即得知發生樓層及戶別，掌握滅火黃金時間。',
      },
    },
  },
  {
    id: 'wet-partition',
    name: '濕式輕隔間牆',
    title: '濕式輕隔間牆',
    subtitle: '寧靜與安全的守護，享受大音希聲的立體境界',
    content: '特別採用與頂級豪宅同步的輕質隔間牆，以灌注輕質水泥沙漿方式施作，打造一個無噪音干擾、寧靜舒適的完美居所。',
    features: [
      { label: '隔音', text: '外覆 6mm 維斯板，內以灌注輕質水泥漿方式施作，隔音效果佳。' },
      { label: '安全', text: '輕質隔間牆重量輕，減少建物載重，地震時降低建物受力。' },
      { label: '空間', text: '輕質隔間牆結構體積減少，室內空間面積相對變大。' },
      { label: '防火', text: '輕質隔間牆採用耐燃一級6mm維斯板，提升耐火性。' },
    ],
    video: '/images/fireprotection/wet-partition.mov',
    videoShowReplay: true,
    tableData: [
      {
        項目: '1/2B 磚牆\nRC 牆',
        牆面厚度: '10-12cm 牆面厚\n室內使用面積縮水',
        耐火性: '0~1 小時\n防火性差，無國家證明',
        隔音性: '普通',
        防潮性: '吸水性強\n易生壁癌',
        抗震性: '高重量\n裂縫不規則產生',
      },
      {
        項目: '濕式灌漿\n隔間系統',
        牆面厚度: '9cm 以上\n薄型化牆面\n增加室內使用面積',
        耐火性: '內政部營建署\n1小時防火證明\n防火性佳，國家證明有保障',
        隔音性: '可達 30 分貝',
        防潮性: '阻水性強\n無霉菌滋生',
        抗震性: '優異\n韌性結構設計',
        isHighlight: true,
      },
    ],
  },
];

const FireProtectionEngineeringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('digital-fire-detection');
  const [showReplayButton, setShowReplayButton] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 切換 tab 時重置並自動播放影片
  useEffect(() => {
    setShowReplayButton(false);
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !currentTab.video) return;
      video.currentTime = 0;
      video.play();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, currentTab.video]);

  // 監聽影片結束事件
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (currentTab.videoShowReplay) {
        setShowReplayButton(true);
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [currentTab]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    setShowReplayButton(false);
    video.currentTime = 0;
    video.play();
  };

  // 渲染表格
  const renderTable = (tableData: TableRow[]) => {
    const headers = ['項目', '牆面厚度', '耐火性', '隔音性', '防潮性', '抗震性'];

    return (
      <div className="w-full overflow-hidden rounded border border-[#d4d0c8]">
        <table className="w-full text-xsmall border-collapse">
          <thead>
            <tr className="bg-[#0b2d2a]">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="py-2 px-2 text-center text-gold font-medium border-r border-[#1a4a46] last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={row.isHighlight ? 'bg-[#f5f0e8]' : 'bg-white'}
              >
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-2 px-2 text-center border-t border-r border-[#d4d0c8] last:border-r-0 align-middle whitespace-pre-line ${
                      colIndex === 0 ? 'font-medium bg-[#0b2d2a]/5' : ''
                    } ${row.isHighlight && colIndex > 0 ? 'text-[#0b2d2a]' : 'text-text-secondary'}`}
                  >
                    {row[header as keyof TableRow]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-cover bg-center"
      style={{ backgroundColor: '#e8e4df' }}
    >
      {/* 動畫樣式 */}
      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .shine-border {
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.8) 50%,
            transparent 60%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shine 2s ease-in-out infinite;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: xor;
          mask-composite: exclude;
          padding: 2px;
        }

        .tab-item {
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-item:hover:not(.active) {
          background-color: rgba(75, 85, 99, 0.9);
        }
      `}</style>

      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 */}
      <div className="absolute inset-0 flex flex-col" style={{ top: '80px' }}>
        {/* 比較模式內容 */}
        {currentTab.comparison && (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* 標題區 */}
            <div className="text-center pt-12 pb-2 shrink-0">
              <h1 className="text-h2 tracking-widest-custom font-medium text-[#0b2d2a]">
                {currentTab.title}
              </h1>
            </div>

            {/* 圖片比較區 */}
            <div className="flex items-center justify-center px-8 pt-12 pb-20 min-h-0">
              <div className="flex gap-10 max-w-4xl">
                {/* 左側 - 傳統工法 */}
                <div className="w-[375px] flex flex-col shrink-0">
                  <div className="bg-white/50 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={currentTab.comparison.left.image}
                      alt={currentTab.comparison.left.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-large font-medium text-text-primary mb-2">
                      {currentTab.comparison.left.title}
                    </h3>
                    <p className="text-body leading-relaxed-custom text-text-primary text-justify">
                      {currentTab.comparison.left.description}
                    </p>
                  </div>
                </div>

                {/* 右側 - 本案工法 */}
                <div className="w-[375px] flex flex-col shrink-0">
                  <div className="bg-white/50 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={currentTab.comparison.right.image}
                      alt={currentTab.comparison.right.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-large font-medium text-text-primary mb-2">
                      {currentTab.comparison.right.title}
                    </h3>
                    <p className="text-body leading-relaxed-custom text-text-primary text-justify">
                      {currentTab.comparison.right.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 濕式輕隔間牆 - 特殊佈局：左文字 + 右影片表格 */}
        {currentTab.id === 'wet-partition' && (
          <div className="flex-1 flex h-full overflow-hidden">
            {/* 左側文字區塊 */}
            <div className="w-[40%] flex flex-col justify-center ps-24 pe-8">
              <div className="max-w-md">
                {/* 標題 */}
                <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-3">
                  {currentTab.title}
                </h1>

                {/* 副標題 */}
                {currentTab.subtitle && (
                  <p className="text-large font-medium text-text-primary mb-4">
                    {currentTab.subtitle}
                  </p>
                )}

                {/* 內文 */}
                {currentTab.content && (
                  <p className="text-body leading-loose-custom text-text-primary text-justify mb-6">
                    {currentTab.content}
                  </p>
                )}

                {/* 特色列表 */}
                {currentTab.features && currentTab.features.length > 0 && (
                  <div className="space-y-3">
                    {currentTab.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-[#0b2d2a] rounded-full mt-2 mr-3 shrink-0" />
                        <div>
                          <span className="text-body font-medium text-text-primary">
                            {feature.label}：
                          </span>
                          <span className="text-body text-text-primary leading-relaxed-custom">
                            {feature.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 右側影片+表格區塊 - 垂直置中 */}
            <div className="flex-1 flex items-center justify-center pe-8 pb-20">
              <div className="w-full max-w-2xl">
                {/* 影片區 */}
                {currentTab.video && (
                  <div className="relative mb-4">
                    <video
                      ref={videoRef}
                      src={currentTab.video}
                      className="w-full h-auto object-contain border-0 outline-none mix-blend-darken"
                      style={{ border: 'none', outline: 'none' }}
                      playsInline
                      muted
                      loop
                    />
                  </div>
                )}

                {/* 表格區 */}
                {currentTab.tableData && (
                  <div>
                    <h3 className="text-body font-medium text-[#0b2d2a] mb-3">
                      隔間工法比較表
                    </h3>
                    {renderTable(currentTab.tableData)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 一般內容模式（非比較、非濕式輕隔間） */}
        {!currentTab.comparison && currentTab.id !== 'wet-partition' && (
          <div className="flex-1 flex">
            {/* 左側文字區塊 */}
            <div className="w-[45%] flex flex-col justify-center ps-24 pe-8">
              <div className="max-w-lg">
                {/* 標題 */}
                <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-2">
                  {currentTab.title}
                </h1>

                {/* 英文副標題 */}
                {currentTab.subtitle && (
                  <p className="!hidden text-body tracking-wide-custom text-text-muted mb-8 italic">
                    {currentTab.subtitle}
                  </p>
                )}

                {/* 內文 */}
                {currentTab.content && (
                  <p className="text-body leading-loose-custom text-text-primary text-justify">
                    {currentTab.content}
                  </p>
                )}
              </div>
            </div>

            {/* 右側示意圖 */}
            <div className="flex-1 h-full overflow-hidden flex items-center justify-center p-8">
              {currentTab.image && (
                <img
                  src={currentTab.image}
                  alt={currentTab.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
        )}

        {/* 右下角 Tabs 區 + 註解 */}
        <div className="absolute right-8 bottom-6 flex flex-col items-end gap-4">
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
                  onClick={() => setActiveTab(tab.id)}
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
            示意圖僅供參考，實際依現場施工為準
          </p>
        </div>
      </div>
    </div>
  );
};

export default FireProtectionEngineeringPage;

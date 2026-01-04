import React, { useState, useRef, useEffect } from 'react';
import {
  EngineeringPageShell,
  VerticalTabList,
  ComparisonLayout,
  VideoPlayer,
} from '../../components/EngineeringPage';
import type { ComparisonItem } from '../../components/EngineeringPage';

// 五大服務項目結構
interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  sameSize?: boolean;
}

// Tab 資料結構
interface TabData {
  id: string;
  name: string;
  title: string;
  content?: string;
  details?: string[];
  services?: ServiceItem[];
  video?: string;
  videoLoop?: boolean;
  image?: string;
  fullBgImage?: string;
  comparison?: {
    left: ComparisonItem;
    right: ComparisonItem;
  };
  bgColor?: string;
}

// 五大有感服務資料
const fiveServices: ServiceItem[] = [
  {
    id: 1,
    title: '25年',
    subtitle: '結構體保固',
    description: '提供25年結構體保固，讓住家安全有保障。',
  },
  {
    id: 2,
    title: '10年',
    subtitle: '防水保固',
    description: '房屋漏水問題在購屋糾紛原因中排行第一名，一般新屋防水保固（防水部分：屋頂、外牆、窗台、衛浴等防水，消防水管及給排水管等漏水）通常為1年，本案特提供10年防水保固，給予住戶權益更好的保障。',
  },
  {
    id: 3,
    title: 'BIM',
    subtitle: '建築模型',
    description: '聚碩仁玉以BIM建築資訊模型，整合建築三大領域『建築、結構、機電』，透過3D視覺化+物件資訊+雲端溝通，使規劃、設計、施工、營運各階段皆可延伸應用，提升建物品質良率，提供您更高居住品質以及安全舒適的居住空間。',
    sameSize: true,
  },
  {
    id: 4,
    title: '第三方',
    subtitle: '驗屋',
    description: '委託專業第三方驗屋單位進行驗屋，確保建築品質符合標準，讓您住得安心。',
    sameSize: true,
  },
  {
    id: 5,
    title: '1年',
    subtitle: '社區代管',
    description: '提供社區代管服務1年，協助社區順利運作，讓住戶無後顧之憂。',
  },
];

// 九個章節的資料
const tabs: TabData[] = [
  {
    id: 'five-services',
    name: '五大有感服務',
    title: '五大有感服務',
    services: fiveServices,
  },
  {
    id: 'emergency-button',
    name: '主臥緊急壓扣',
    title: '主臥室緊急壓扣',
    content: '主臥室加設緊急壓扣，與管理中心即時連線，確保居家安全。',
    video: '/images/thoughtful/emergency-button.mov',
    videoLoop: true,
    bgColor: 'rgb(232, 228, 223)',
  },
  {
    id: 'ev-charging',
    name: '電動汽車線架',
    title: '預留電動汽車線架',
    content: '根據106年12月21日行政院發布的「空氣污染防治行動方案」中指出，2035年新售機車預計全面電動化，2040年新售汽車全面電動化，面對環保新趨勢，您的房子也必須跟上時代腳步。',
    details: ['預留：充電專用線槽', '坪頂配置：線架'],
    fullBgImage: '/images/thoughtful/ev-charging-bg.jpg',
  },
  {
    id: 'emergency-outlet',
    name: '緊急專用插座',
    title: '緊急專用插座',
    content: '設有緊急專用電源插座，客廳電視、冰箱連接發電設備，停電時以備不時之需。',
    bgColor: 'rgb(232, 228, 223)',
    comparison: {
      left: {
        image: '/images/thoughtful/emergency-outlet-01.jpg',
        title: '傳統工法',
        description: '家用冰箱與一般電器使用相同電源，無規劃緊急供電專用迴路設計，當停電時間過長冰箱內食品蔬果易腐壞。',
      },
      right: {
        image: '/images/thoughtful/emergency-outlet-02.jpg',
        title: '本案工法',
        description: '本案採用緊急供電專用迴路，連結緊急發電機。當停電時，客廳電視、冰箱插座可正常使用，避免食品蔬果腐壞，同時也可以藉由電視接收相關消息。',
      },
    },
  },
  {
    id: 'driveway',
    name: '車道規劃',
    title: '車道規劃',
    content: '汽機車分流：機車停在1F、汽車停在地下室',
    details: ['車道出入ETC規劃'],
    fullBgImage: '/images/c2/facilities/03-第二門廳-02.webp',
  },
  {
    id: 'signal-boost',
    name: '訊號電波加強',
    title: '訊號電波加強',
    content: '地下室B2、B3電梯內設置訊號電波加強',
    fullBgImage: '/images/c2/facilities/03-第二門廳-01.webp',
  },
  {
    id: 'drainage',
    name: '地下室導流',
    title: '地下室導流系統',
    content: '地下室空氣品質採用機械式排風系統，除可由中央監控定時控制外，並可結合一氧化碳及濕度偵測達到自動啟閉功能，同時也與消防系統連動，當火災發生時立即停止風機，避免助長火勢。',
    image: '/images/thoughtful/drainage-system.png',
    bgColor: 'rgb(232, 228, 223)',
  },
  {
    id: 'storage',
    name: '專屬收納櫃',
    title: '住戶專屬收納櫃',
    content: 'B2、B3梯廳內每戶專屬獨立置物空間，生活用品各有歸屬，將雜物留在家門之外，室內留下純粹舒適',
    fullBgImage: '/images/c2/facilities/04-BF梯廳-02.webp',
  },
  {
    id: 'bathroom-drain',
    name: '衛浴排水防臭',
    title: '衛浴排水與防臭規劃',
    content: '',
    details: [
      '防蟲防臭排水蓋：阻絕異味回竄與蟲害侵入，讓浴室與廚房始終保持清新潔淨。',
      '排水孔加大：排水孔加大 50%，排水更快速，洗澡後不積水，降低濕滑與清潔負擔。',
    ],
    bgColor: 'rgb(232, 228, 223)',
  },
];

const ThoughtfulEngineeringPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('five-services');
  const [activeService, setActiveService] = useState<number>(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // 切換 tab 時自動播放影片
  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !currentTab.video) return;
      video.currentTime = 0;
      video.play();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, currentTab.video]);

  return (
    <EngineeringPageShell sectionIndex={2}>
      {/* 背景圖 - 僅五大有感服務使用 */}
      {currentTab.services && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: `url('/images/thoughtful-bg.jpg')`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(232, 228, 223, 0.75)',
            }}
          />
        </>
      )}
      {/* 其他章節背景色 */}
      {!currentTab.services && !currentTab.fullBgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: currentTab.bgColor || '#ffffff',
          }}
        />
      )}

      {/* 五大有感服務 - 特殊佈局 */}
      {currentTab.services && (
        <div className="flex-1 flex flex-col items-center justify-center h-full overflow-hidden pb-20 relative z-10">
          {/* 標題 */}
          <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-12">
            {currentTab.title}
          </h1>

          {/* 五個圓圈 */}
          <div className="flex items-center justify-center gap-8 mb-10">
            {currentTab.services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                onMouseEnter={() => setActiveService(service.id)}
                className={`
                  service-circle w-32 h-32 rounded-full border-2
                  flex flex-col items-center justify-center cursor-pointer
                  ${activeService === service.id
                    ? 'active border-[#0b2d2a] bg-[#0b2d2a] text-white'
                    : 'border-[#0b2d2a] bg-transparent text-[#0b2d2a] hover:bg-[#0b2d2a]/10'
                  }
                `}
              >
                <span className={`font-medium leading-tight ${service.sameSize ? 'text-body' : 'text-h4'}`}>
                  {service.title}
                </span>
                <span className={`leading-tight mt-1 ${service.sameSize ? 'text-body' : 'text-xsmall'}`}>
                  {service.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* 說明文字區 - 固定高度避免圓圈移動 */}
          <div className="max-w-2xl text-center px-8 h-24 flex items-start justify-center">
            {currentTab.services.map((service) => (
              <p
                key={service.id}
                className={`text-body leading-loose-custom text-text-primary transition-opacity duration-300 ${
                  activeService === service.id ? 'block' : 'hidden'
                }`}
              >
                {service.description}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 影片模式：左文字 + 右影片 */}
      {!currentTab.services && currentTab.video && (
        <div className="flex-1 flex relative z-10">
          {/* 左側文字區塊 */}
          <div className="w-[40%] flex flex-col justify-center ps-24 pe-8">
            <div className="max-w-lg">
              <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-4">
                {currentTab.title}
              </h1>
              {currentTab.content && (
                <p className="text-body leading-loose-custom text-text-primary text-justify">
                  {currentTab.content}
                </p>
              )}
              {currentTab.details && currentTab.details.length > 0 && (
                <div className="mt-6 space-y-2">
                  {currentTab.details.map((detail, index) => (
                    <p key={index} className="text-body text-text-secondary">
                      {detail}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右側影片 */}
          <div className="flex-1 h-full overflow-hidden flex items-center justify-center p-8 pb-24">
            <VideoPlayer
              src={currentTab.video}
              videoRef={videoRef}
              loop={currentTab.videoLoop}
            />
          </div>
        </div>
      )}

      {/* 滿版背景圖模式 */}
      {!currentTab.services && currentTab.fullBgImage && (
        <div className="flex-1 relative">
          {/* 滿版背景圖 */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${currentTab.fullBgImage}')` }}
          />
          {/* 深色遮罩 */}
          <div className="absolute inset-0 bg-black/40" />

          {/* 文字內容 */}
          <div className="absolute inset-0 flex items-center pb-20">
            <div className="ps-24 pe-8 max-w-2xl">
              <h1 className="text-h2 tracking-widest-custom font-medium text-white mb-6">
                {currentTab.title}
              </h1>
              {currentTab.content && (
                <p className="text-body leading-loose-custom text-white/90 text-justify">
                  {currentTab.content}
                </p>
              )}
              {currentTab.details && currentTab.details.length > 0 && (
                <div className="mt-6 space-y-2">
                  {currentTab.details.map((detail, index) => (
                    <p key={index} className="text-body text-white/80">
                      {detail}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 比較模式：標題 + 兩張圖各帶文字 */}
      {currentTab.comparison && (
        <ComparisonLayout
          title={currentTab.title}
          subtitle={currentTab.content}
          left={currentTab.comparison.left}
          right={currentTab.comparison.right}
        />
      )}

      {/* 一般內容模式（無影片、無滿版背景圖、無比較模式） */}
      {!currentTab.services && !currentTab.video && !currentTab.fullBgImage && !currentTab.comparison && (
        <div className="flex-1 flex relative z-10">
          {/* 左側文字區塊 */}
          <div className="w-[45%] flex flex-col justify-center ps-24 pe-8">
            <div className="max-w-lg">
              <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-4">
                {currentTab.title}
              </h1>
              {currentTab.content && (
                <p className="text-body leading-loose-custom text-text-primary text-justify">
                  {currentTab.content}
                </p>
              )}
              {currentTab.details && currentTab.details.length > 0 && (
                <div className="mt-4 space-y-1">
                  {currentTab.details.map((detail, index) => (
                    <p key={index} className={`text-body text-text-primary ${detail === '' ? 'h-2' : ''}`}>
                      {detail}
                    </p>
                  ))}
                </div>
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

      {/* Tab 導航 */}
      <VerticalTabList
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </EngineeringPageShell>
  );
};

export default ThoughtfulEngineeringPage;

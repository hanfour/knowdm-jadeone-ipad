import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubpageMenuBar from '../../components/SubpageMenuBar';
import EquipmentIcon from './components/EquipmentIcon';
import { equipmentItems } from './data';

const BoutiqueMansionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (id: string, link: string) => {
    setActiveItem(id);
    // 延遲導航，讓光暈效果顯示
    setTimeout(() => {
      navigate(link);
    }, 300);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/boutique/background.jpg')`,
          backgroundColor: '#1a1a1a',
          top: '80px',
        }}
      />
      {/* 暗色遮罩 */}
      <div
        className="absolute inset-0"
        style={{
          top: '80px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* 主要內容 */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ top: '80px' }}
      >
        {/* 標題區 */}
        <div className="text-center mb-16">
          <h1
            className="text-5xl font-light tracking-[0.3em] text-[#f3cf9a]/40 mb-2"
            style={{ fontFamily: 'serif' }}
          >
            BOUTIQUE MANSION
          </h1>
          <h2
            className="text-3xl tracking-[0.5em] text-[#f3cf9a]"
            style={{ fontFamily: 'serif' }}
          >
            精品工學
          </h2>
        </div>

        {/* 設備項目列表 */}
        <div className="flex items-center justify-center gap-12 px-8">
          {equipmentItems.map((item) => (
            <EquipmentIcon
              key={item.id}
              name={item.name}
              englishName={item.englishName}
              icon={item.icon}
              isActive={activeItem === item.id}
              onClick={() => handleItemClick(item.id, item.link)}
            />
          ))}
        </div>

      </div>

      {/* 底部提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-sm text-[#f3cf9a]/50 tracking-wider">
          點選項目查看詳細介紹
        </p>
      </div>

      {/* 樣式 */}
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(243,207,154,0.3), 0 0 40px rgba(243,207,154,0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(243,207,154,0.5), 0 0 60px rgba(243,207,154,0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default BoutiqueMansionPage;

import React from 'react';
import SubpageMenuBar from '../../components/SubpageMenuBar';

const WaterBrandPage: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 導航列 */}
      <SubpageMenuBar sectionIndex={2} />

      {/* 主要內容區 - 滿版背景圖 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          top: '80px',
          backgroundImage: 'url(/images/water/water-bg.jpg)',
        }}
      >
        {/* 左側內容區塊 - 文字 + 商品圖 */}
        <div className="absolute left-0 top-0 bottom-0 w-[55%] flex items-center px-16">
          {/* 文字區塊 */}
          <div className="flex-1">
            {/* 品牌 Logo */}
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/images/water/yungho-logo.png"
                alt="永賀能源科技"
                className="h-12 object-contain"
              />
              <h1 style={{ fontSize: '2rem', letterSpacing: '0.15em' }}>永賀能源科技</h1>
            </div>

            {/* 標題 */}
            <h2
              className="text-gray-900 font-bold mb-6"
              style={{ fontSize: '1.75rem', letterSpacing: '0.1em' }}
            >
              全方位水處理專家
              <br />
              用水點滴純淨
            </h2>

            {/* 內文 */}
            <p
              className="text-gray-700 leading-relaxed text-justify"
              style={{ fontSize: '1rem', lineHeight: '2' }}
            >
              提供水處理過濾系統與全方位的熱水節能服務，涵蓋：電能熱水器、水塔、泵浦、家用型熱泵與太陽能熱水器等居家設備，並提供從前期評估、系統設計、整體規劃、專業施工到後續服務的一條龍作業，全面提升用水品質，確保長期穩定與安心使用。
            </p>
          </div>

          {/* 商品圖 */}
          <div className="flex-shrink-0 ml-8">
            <img
              src="/images/water/product.png"
              alt="淨水設備"
              className="h-[60vh] object-contain"
            />
          </div>
        </div>

        {/* 右下角註解 */}
        <div className="absolute bottom-4 right-8">
          <p className="text-gray-500" style={{ fontSize: '0.75em' }}>
            情境示意圖僅供參考，以實際施工及合約為準
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaterBrandPage;

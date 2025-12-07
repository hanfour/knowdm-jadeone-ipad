import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import ImageGalleryPage from './components/ImageGalleryPage';
import LifeFunctionPage from './pages/LifeFunctionPage';
import TrafficRoutePage from './pages/TrafficRoutePage';

// 圖片資料配置
const pageData = {
  locationIntro: {
    images: [
      { src: '/images/a1/IMG_001.jpg', label: '水湳經貿園區' },
      { src: '/images/a1/IMG_002.jpg', label: '國際會展中心' },
      { src: '/images/a1/IMG_003.jpg', label: '綠美圖' },
      { src: '/images/a1/IMG_004.jpg', label: '水湳轉運站' },
    ],
    title: '齊步世界 亮眼軸線',
    description: '水湳經貿園區將以國際AI經貿城市的姿態，開啟大台中核心新未來，齊聚經貿、商業與文化藝術的國際化價值，奠定國際核心地位，全球注目時代標的，國際建築大師作品齊聚爭豔，大巨蛋、綠美圖、流行音樂中心、國際會展中心、水湳轉運站落址，產官學500億投資、創造千億經濟產值，運載全球 AI 科技產業能量，水湳智慧城重新定義國際生活價值。',
  },
  rareExclusive: {
    images: [
      { src: '/images/a3/03.jpg', label: '抹茶湖' },
      { src: '/images/a2/02.jpg', label: '中央公園' },
      { src: '/images/a2/03.jpg', label: '中央公園' },
      { src: '/images/a2/04.jpg', label: '中央公園' },
      { src: '/images/a2/05.jpg', label: '中央球場' },
      { src: '/images/a2/06.jpg', label: '中央公園視覺體驗區' },
    ],
    title: '水湳珍稀 最美收藏',
    description: '水湳智慧城細分為經貿、文商、文教、創研、生態住宅五大專用區，在64公頃的中央公園與商業大道之間，劃出一片低密度佔比不到10%的生態住宅區，為水湳生態最具國際感的豪宅聚落。低密度、高綠覆的高級住宅聚落，堪稱水湳最精華之地，以綠建築、景觀綠廊為核心，稀有價值遠勝七期新市政中心，每一棟建築都將是限量絕版品。',
  },
  elegantGreen: {
    images: [
      { src: '/images/a3/01.jpg', label: '綠美圖' },
      { src: '/images/a3/02.jpg', label: '流行影音中心' },
      { src: '/images/a2/01.jpg', label: '抹茶湖' },
    ],
    title: '自然之美 雍雅並蓄',
    description: '將自然之美，訂製進生活裡，六都最大規模城市綠肺，64公頃中央公園綠帶，感受莫內花園最美的漫步路線法國國花鳶尾花繚繞、優雅的睡蓮帶來靜謐、池塘邊的菖蒲，每天回家都是一場動人的約會。',
  },
  prosperousDistrict: {
    images: [
      { src: '/images/a4/01_台積電.jpg', label: '台積電' },
      { src: '/images/a4/02_科琴橋.jpg', label: '科琴橋' },
      { src: '/images/a4/03_中清路商圈-星巴克.jpg', label: '中清路商圈-星巴克' },
      { src: '/images/a4/04_中清路商圈-愛買.jpg', label: '中清路商圈-愛買' },
      { src: '/images/a4/05_逢甲商圈.jpg', label: '逢甲商圈' },
      { src: '/images/a4/06_逢甲夜市.jpg', label: '逢甲夜市' },
      { src: '/images/a4/07_逢甲大學.jpg', label: '逢甲大學' },
      { src: '/images/a4/08_中國醫藥大學.jpg', label: '中國醫藥大學' },
    ],
    title: '涵養人文 豐饒商圈',
    description: '緊鄰台中科技園區、74 快速道路與國道，迅速接軌七期、逢甲、12期生活圈，擁有最舒適的生活距離。生活採買約2分鐘抵達愛買、約6分鐘抵達西屯傳統市場、約10分鐘可達逢甲商圈，約5-10分鐘可抵達中清路商圈，富裕精華聚落，生活機能精彩奪目。',
  },
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* 首頁 */}
          <Route path="/" element={<HomePage />} />

          {/* 影片頁面 */}
          <Route path="/video" element={<VideoPage />} />

          {/* 富居水湳 - 國際新都 */}
          <Route
            path="/fu-ju-shui-nan/guo-ji-xin-du"
            element={
              <ImageGalleryPage
                images={pageData.locationIntro.images}
                title={pageData.locationIntro.title}
                description={pageData.locationIntro.description}
              />
            }
          />

          {/* 富居水湳 - 稀有獨享 */}
          <Route
            path="/fu-ju-shui-nan/xi-you-du-xiang"
            element={
              <ImageGalleryPage
                images={pageData.rareExclusive.images}
                title={pageData.rareExclusive.title}
                description={pageData.rareExclusive.description}
              />
            }
          />

          {/* 富居水湳 - 雍雅森綠 */}
          <Route
            path="/fu-ju-shui-nan/yong-ya-sen-lv"
            element={
              <ImageGalleryPage
                images={pageData.elegantGreen.images}
                title={pageData.elegantGreen.title}
                description={pageData.elegantGreen.description}
              />
            }
          />

          {/* 富居水湳 - 繁華時區 */}
          <Route
            path="/fu-ju-shui-nan/fan-hua-shi-qu"
            element={
              <ImageGalleryPage
                images={pageData.prosperousDistrict.images}
                title={pageData.prosperousDistrict.title}
                description={pageData.prosperousDistrict.description}
              />
            }
          />

          {/* 富居水湳 - 生活機能 */}
          <Route path="/fu-ju-shui-nan/sheng-huo-ji-neng" element={<LifeFunctionPage />} />

          {/* 富居水湳 - 交通動線 */}
          <Route path="/fu-ju-shui-nan/jiao-tong-dong-xian" element={<TrafficRoutePage />} />

          {/* 其他頁面待開發，暫時導向首頁 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

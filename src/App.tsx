import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import ImageGalleryPage from './components/ImageGalleryPage';
import LifeFunctionPage from './pages/LifeFunctionPage';
import TrafficRoutePage from './pages/TrafficRoutePage';
import ArchitectLeaderPage from './pages/ArchitectLeaderPage';
import ArchitectAestheticsPage from './pages/ArchitectAestheticsPage';
import PublicFacilityPage from './pages/PublicFacilityPage';
import LandscapeTastePage from './pages/LandscapeTastePage';
import StructuralMechanicsPage from './pages/StructuralEngineeringPage';
import StructuralEngineeringPage from './pages/StructuralEngineeringPage/index';
import FrenchAestheticsPage from './pages/FrenchAestheticsPage';
import FloorPlanPage from './pages/FloorPlanPage';
import BoutiqueMansionPage from './pages/BoutiqueMansionPage';
import KitchenBrandPage from './pages/KitchenBrandPage';
import BathroomBrandPage from './pages/BathroomBrandPage';
import LockBrandPage from './pages/LockBrandPage';
import WaterBrandPage from './pages/WaterBrandPage';
import WindowFlooringPage from './pages/WindowFlooringPage';
import ElevatorBrandPage from './pages/ElevatorBrandPage';
import PipingEngineeringPage from './pages/PipingEngineeringPage';
import WaterproofEngineeringPage from './pages/WaterproofEngineeringPage';
import FireProtectionEngineeringPage from './pages/FireProtectionEngineeringPage';
import ThoughtfulEngineeringPage from './pages/ThoughtfulEngineeringPage';
import AnchorFuturePage from './pages/AnchorFuturePage';
import PolygonDrawer from './components/dev/PolygonDrawer';

// ⚠️ 開發模式開關 - 正式上線時設為 false
const DEV_MODE = false;

// 圖片資料配置
const pageData = {
  // 國際新都
  locationIntro: {
    images: [
      { src: '/images/a1/IMG_001.jpg', label: '水湳經貿園區' },
      { src: '/images/a1/IMG_002.jpg', label: '國際會展中心' },
      { src: '/images/a1/IMG_003.jpg', label: '綠美圖' },
      { src: '/images/a1/IMG_004.jpg', label: '水湳轉運站' },
    ],
    title: '齊步世界 亮眼軸線',
    description: '水湳經貿園區以國際新都姿態，開啟大台中核心新未來，齊聚經貿、商業與文化藝術的國際化價值，奠定國際核心地位，全球注目時代標的，國際建築大師作品齊聚爭豔，是台中國際建築密度最高的重劃區，兩大文化建：綠美圖、台中國際會展中心陸續啟用，最受矚目的超巨蛋、台灣智慧營塔等重大建設逐步到位，未來水湳轉運中心及未來捷運橘線的雙交通利多加持下，蓬勃商機發展不可限量。',
  },
  // 雍雅森綠
  elegantGreen: {
    images: [
      { src: '/images/a3/01.jpg', label: '綠美圖' },
      { src: '/images/a2/01.jpg', label: '抹茶湖' },
    ],
    title: '自然之美 雍雅並蓄',
    description: '將自然之美，訂製進生活裡，六都最大規模城市綠肺，64公頃中央公園綠帶，感受莫內花園最美的漫步路線法國國花鳶尾花繚繞、優雅的睡蓮帶來靜謐、池塘邊的菖蒲，每天回家都是一場動人的約會。',
  },
  // 珍稀收藏（原稀有獨享）
  preciousCollection: {
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
  // 繁華時區（隱藏備用）
  prosperousDistrict: {
    images: [
      { src: '/images/a4/01_台積電.jpg', label: '台積電' },
      { src: '/images/a4/02_科琴橋.jpg', label: '科湳愛琴橋' },
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
      {/* 開發工具：多邊形繪製器 */}
      {DEV_MODE && <PolygonDrawer enabled={DEV_MODE} targetSelector="[data-map-container]" />}
      <MainLayout>
        <Routes>
          {/* 首頁 */}
          <Route path="/" element={<HomePage />} />

          {/* 影片頁面 */}
          <Route path="/video" element={<VideoPage />} />

          {/* 富居水湳 - 定錨未來 */}
          <Route path="/fu-ju-shui-nan/ding-mao-wei-lai" element={<AnchorFuturePage />} />

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

          {/* 富居水湳 - 珍稀收藏 */}
          <Route
            path="/fu-ju-shui-nan/zhen-xi-shou-cang"
            element={
              <ImageGalleryPage
                images={pageData.preciousCollection.images}
                title={pageData.preciousCollection.title}
                description={pageData.preciousCollection.description}
              />
            }
          />

          {/* 富居水湳 - 生活機能 */}
          <Route path="/fu-ju-shui-nan/sheng-huo-ji-neng" element={<LifeFunctionPage />} />

          {/* 富居水湳 - 交通動線 */}
          <Route path="/fu-ju-shui-nan/jiao-tong-dong-xian" element={<TrafficRoutePage />} />

          {/* 富居水湳 - 繁華時區（隱藏備用）
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
          */}

          {/* 巨擘薈萃 - 建築領航 */}
          <Route path="/ju-bo-hui-cui/jian-zhu-ling-hang" element={<ArchitectLeaderPage />} />

          {/* 巨擘薈萃 - 建築美學 */}
          <Route path="/ju-bo-hui-cui/jian-zhu-mei-xue" element={<ArchitectAestheticsPage />} />

          {/* 巨擘薈萃 - 公設語境 */}
          <Route path="/ju-bo-hui-cui/gong-she-yu-jing" element={<PublicFacilityPage />} />

          {/* 巨擘薈萃 - 景觀品味 */}
          <Route path="/ju-bo-hui-cui/jing-guan-pin-wei" element={<LandscapeTastePage />} />

          {/* 巨擘薈萃 - 結構力學 */}
          <Route path="/ju-bo-hui-cui/jie-gou-li-xue" element={<StructuralMechanicsPage />} />

          {/* 優雅精琢 - 結構工學 */}
          <Route path="/you-ya-jing-zhuo/jie-gou-gong-xue" element={<StructuralEngineeringPage />} />

          {/* 優雅精琢 - 管線工學 */}
          <Route path="/you-ya-jing-zhuo/guan-xian-gong-xue" element={<PipingEngineeringPage />} />

          {/* 優雅精琢 - 防水工學 */}
          <Route path="/you-ya-jing-zhuo/fang-shui-gong-xue" element={<WaterproofEngineeringPage />} />

          {/* 優雅精琢 - 防火工學 */}
          <Route path="/you-ya-jing-zhuo/fang-huo-gong-xue" element={<FireProtectionEngineeringPage />} />

          {/* 優雅精琢 - 貼心工學 */}
          <Route path="/you-ya-jing-zhuo/tie-xin-gong-xue" element={<ThoughtfulEngineeringPage />} />

          {/* 法式寓邸 - 法式美學 */}
          <Route path="/fa-shi-yu-di/fa-shi-mei-xue" element={<FrenchAestheticsPage />} />

          {/* 法式寓邸 - 風格訂製 */}
          <Route path="/fa-shi-yu-di/feng-ge-ding-zhi" element={<FloorPlanPage />} />

          {/* 優雅精琢 - 精品工學 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue" element={<BoutiqueMansionPage />} />

          {/* 優雅精琢 - 精品工學 - 廚具品牌 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/kitchen" element={<KitchenBrandPage />} />

          {/* 優雅精琢 - 精品工學 - 衛浴品牌 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/bathroom" element={<BathroomBrandPage />} />

          {/* 優雅精琢 - 精品工學 - 電子鎖品牌 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/lock" element={<LockBrandPage />} />

          {/* 優雅精琢 - 精品工學 - 淨水設備 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/water" element={<WaterBrandPage />} />

          {/* 優雅精琢 - 精品工學 - 窗戶木地板 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/tranquility" element={<WindowFlooringPage />} />

          {/* 優雅精琢 - 精品工學 - 電梯 */}
          <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/elevator" element={<ElevatorBrandPage />} />

          {/* 其他頁面待開發，暫時導向首頁 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

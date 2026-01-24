import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PageLoading from './components/PageLoading';

// 懶載入所有頁面
const HomePage = lazy(() => import('./pages/HomePage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const ImageGalleryPage = lazy(() => import('./components/ImageGalleryPage'));
const LifeFunctionPage = lazy(() => import('./pages/LifeFunctionPage'));
const TrafficRoutePage = lazy(() => import('./pages/TrafficRoutePage'));
const ArchitectLeaderPage = lazy(() => import('./pages/ArchitectLeaderPage'));
const ArchitectAestheticsPage = lazy(() => import('./pages/ArchitectAestheticsPage'));
const PublicFacilityPage = lazy(() => import('./pages/PublicFacilityPage'));
const LandscapeTastePage = lazy(() => import('./pages/LandscapeTastePage'));
const StructuralMechanicsPage = lazy(() => import('./pages/StructuralEngineeringPage'));
const StructuralEngineeringPage = lazy(() => import('./pages/StructuralEngineeringPage/index'));
const LightingAestheticsPage = lazy(() => import('./pages/LightingAestheticsPage'));
const FrenchAestheticsPage = lazy(() => import('./pages/FrenchAestheticsPage'));
const FloorPlanPage = lazy(() => import('./pages/FloorPlanPage'));
const BoutiqueMansionPage = lazy(() => import('./pages/BoutiqueMansionPage'));
const KitchenBrandPage = lazy(() => import('./pages/KitchenBrandPage'));
const BathroomBrandPage = lazy(() => import('./pages/BathroomBrandPage'));
const LockBrandPage = lazy(() => import('./pages/LockBrandPage'));
const WaterBrandPage = lazy(() => import('./pages/WaterBrandPage'));
const WindowBrandPage = lazy(() => import('./pages/WindowBrandPage'));
const FlooringBrandPage = lazy(() => import('./pages/FlooringBrandPage'));
const ElevatorBrandPage = lazy(() => import('./pages/ElevatorBrandPage'));
const PipingEngineeringPage = lazy(() => import('./pages/PipingEngineeringPage'));
const WaterproofEngineeringPage = lazy(() => import('./pages/WaterproofEngineeringPage'));
const FireProtectionEngineeringPage = lazy(() => import('./pages/FireProtectionEngineeringPage'));
const ThoughtfulEngineeringPage = lazy(() => import('./pages/ThoughtfulEngineeringPage'));
const AnchorFuturePage = lazy(() => import('./pages/AnchorFuturePage'));
const InternationalCityPage = lazy(() => import('./pages/InternationalCityPage'));
const PreciousCollectionPage = lazy(() => import('./pages/PreciousCollectionPage'));
const PolygonDrawer = lazy(() => import('./components/dev/PolygonDrawer'));

// ⚠️ 開發模式開關 - 正式上線時設為 false
const DEV_MODE = false;

// 圖片資料配置
const pageData = {
  // 國際新都
  locationIntro: {
    images: [
      { src: '/images/a1/IMG_001.webp', label: '水湳經貿園區' },
      { src: '/images/a1/IMG_002.webp', label: '國際會展中心' },
      { src: '/images/a1/IMG_003.webp', label: '綠美圖' },
      { src: '/images/a1/IMG_004.webp', label: '水湳轉運站' },
    ],
    title: '齊步世界 亮眼軸線',
    description: '水湳經貿園區以國際新都姿態，開啟大台中核心新未來，齊聚經貿、商業與文化藝術的國際化價值，奠定國際核心地位，全球注目時代標的，國際建築大師作品齊聚爭豔，是台中國際建築密度最高的重劃區，兩大文化建：綠美圖、台中國際會展中心陸續啟用，最受矚目的超巨蛋、台灣智慧營塔等重大建設逐步到位，未來水湳轉運中心及未來捷運橘線的雙交通利多加持下，蓬勃商機發展不可限量。',
  },
  // 雍雅森綠
  elegantGreen: {
    images: [
      // { src: '/images/a3/01.jpg', label: '綠美圖' },
      { src: '/images/a3/03.webp', label: '抹茶湖' },
    ],
    title: '自然之美 雍雅並蓄',
    description: '將自然之美，訂製進生活裡，六都最大規模城市綠肺，64公頃中央公園綠帶，感受莫內花園最美的漫步路線法國國花鳶尾花繚繞、優雅的睡蓮帶來靜謐、池塘邊的菖蒲，每天回家都是一場動人的約會。',
  },
  // 珍稀收藏（原稀有獨享）
  preciousCollection: {
    images: [
      { src: '/images/a2/01.webp', label: '抹茶湖' },
      { src: '/images/a2/02.webp', label: '中央公園' },
      { src: '/images/a2/03.webp', label: '中央公園' },
      { src: '/images/a2/04.webp', label: '中央公園' },
      { src: '/images/a2/05.webp', label: '中央球場' },
      { src: '/images/a2/06.webp', label: '中央公園視覺體驗區' },
    ],
    title: '水湳珍稀 最美收藏',
    description: '水湳智慧城細分為經貿、文商、文教、創研、生態住宅五大專用區，在64公頃的中央公園與商業大道之間，劃出一片低密度佔比不到10%的生態住宅區，為水湳生態最具國際感的豪宅聚落。低密度、高綠覆的高級住宅聚落，堪稱水湳最精華之地，以綠建築、景觀綠廊為核心，稀有價值遠勝七期新市政中心，每一棟建築都將是限量絕版品。',
  },
  // 繁華時區（隱藏備用）
  prosperousDistrict: {
    images: [
      { src: '/images/a4/01_台積電.webp', label: '台積電' },
      { src: '/images/a4/02_科琴橋.webp', label: '科湳愛琴橋' },
      { src: '/images/a4/03_中清路商圈-星巴克.webp', label: '中清路商圈-星巴克' },
      { src: '/images/a4/04_中清路商圈-愛買.webp', label: '中清路商圈-愛買' },
      { src: '/images/a4/05_逢甲商圈.webp', label: '逢甲商圈' },
      { src: '/images/a4/06_逢甲夜市.webp', label: '逢甲夜市' },
      { src: '/images/a4/07_逢甲大學.webp', label: '逢甲大學' },
      { src: '/images/a4/08_中國醫藥大學.webp', label: '中國醫藥大學' },
    ],
    title: '涵養人文 豐饒商圈',
    description: '緊鄰台中科技園區、74 快速道路與國道，迅速接軌七期、逢甲、12期生活圈，擁有最舒適的生活距離。生活採買約2分鐘抵達愛買、約6分鐘抵達西屯傳統市場、約10分鐘可達逢甲商圈，約5-10分鐘可抵達中清路商圈，富裕精華聚落，生活機能精彩奪目。',
  },
};

function App() {
  return (
    <Router>
      {/* 開發工具：多邊形繪製器 */}
      {DEV_MODE && (
        <Suspense fallback={null}>
          <PolygonDrawer enabled={DEV_MODE} targetSelector="[data-map-container]" />
        </Suspense>
      )}
      <MainLayout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            {/* 首頁 */}
            <Route path="/" element={<HomePage />} />

            {/* 影片頁面 */}
            <Route path="/video" element={<VideoPage />} />

            {/* 富居水湳 - 定錨未來 */}
            <Route path="/fu-ju-shui-nan/ding-mao-wei-lai" element={<AnchorFuturePage />} />

            {/* 富居水湳 - 國際新都 */}
            <Route path="/fu-ju-shui-nan/guo-ji-xin-du" element={<InternationalCityPage />} />

            {/* 富居水湳 - 雍雅森綠 */}
            <Route
              path="/fu-ju-shui-nan/yong-ya-sen-lv"
              element={
                <ImageGalleryPage
                  images={pageData.elegantGreen.images.concat(pageData.preciousCollection.images)}
                  title={pageData.elegantGreen.title}
                  description={pageData.elegantGreen.description}
                />
              }
            />

            {/* 富居水湳 - 珍稀收藏 */}
            <Route path="/fu-ju-shui-nan/zhen-xi-shou-cang" element={<PreciousCollectionPage />} />

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

            {/* 巨擘薈萃 - 燈光設計 */}
            <Route path="/ju-bo-hui-cui/deng-guang-mei-xue" element={<LightingAestheticsPage />} />

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

            {/* 優雅精琢 - 精品工學 - 窗戶 */}
            <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/window" element={<WindowBrandPage />} />

            {/* 優雅精琢 - 精品工學 - 木地板 */}
            <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/flooring" element={<FlooringBrandPage />} />

            {/* 優雅精琢 - 精品工學 - 電梯 */}
            <Route path="/you-ya-jing-zhuo/jing-pin-gong-xue/elevator" element={<ElevatorBrandPage />} />

            {/* 其他頁面待開發，暫時導向首頁 */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;

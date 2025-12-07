import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import LocationIntroPage from './pages/LocationIntroPage';
import RareExclusivePage from './pages/RareExclusivePage';
import ElegantGreenPage from './pages/ElegantGreenPage';
import ProsperousDistrictPage from './pages/ProsperousDistrictPage';

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
          <Route path="/fu-ju-shui-nan/guo-ji-xin-du" element={<LocationIntroPage />} />

          {/* 富居水湳 - 稀有獨享 */}
          <Route path="/fu-ju-shui-nan/xi-you-du-xiang" element={<RareExclusivePage />} />

          {/* 富居水湳 - 雍雅森綠 */}
          <Route path="/fu-ju-shui-nan/yong-ya-sen-lv" element={<ElegantGreenPage />} />

          {/* 富居水湳 - 繁華時區 */}
          <Route path="/fu-ju-shui-nan/fan-hua-shi-qu" element={<ProsperousDistrictPage />} />

          {/* 其他頁面待開發，暫時導向首頁 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

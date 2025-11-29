import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import LocationIntroPage from './pages/LocationIntroPage';

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

          {/* 其他頁面待開發，暫時導向首頁 */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

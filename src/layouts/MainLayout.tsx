import React from 'react';
import AspectRatioContainer from '../components/aspect-ratio-container';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AspectRatioContainer
      baseWidth={1920}   // 設計稿基準寬度
      baseHeight={1080}  // 設計稿基準高度 (維持 16:9)
    >
      {children}
    </AspectRatioContainer>
  );
};

export default MainLayout;

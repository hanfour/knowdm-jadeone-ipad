import React from 'react';
import AspectRatioContainer from '../components/AspectRatioContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AspectRatioContainer
      aspectRatio={16 / 9}  // 永遠維持 16:9
      baseWidth={1920}      // 以 1920px 為設計基準
    >
      {children}
    </AspectRatioContainer>
  );
};

export default MainLayout;

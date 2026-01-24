import React from 'react';

const PageLoading: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-gold text-body tracking-wide-custom">載入中...</p>
      </div>
    </div>
  );
};

export default PageLoading;

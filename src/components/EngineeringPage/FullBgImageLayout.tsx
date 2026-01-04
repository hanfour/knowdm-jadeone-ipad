import React from 'react';

interface FullBgImageLayoutProps {
  bgImage: string;
  title: string;
  content?: string;
  details?: string[];
}

const FullBgImageLayout: React.FC<FullBgImageLayoutProps> = ({
  bgImage,
  title,
  content,
  details,
}) => {
  return (
    <div className="flex-1 relative">
      {/* 滿版背景圖 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 文字內容 */}
      <div className="absolute inset-0 flex items-center pb-20">
        <div className="ps-24 pe-8 max-w-2xl">
          {/* 標題 */}
          <h1 className="text-h2 tracking-widest-custom font-medium text-white mb-6">
            {title}
          </h1>

          {/* 內文 */}
          {content && (
            <p className="text-body leading-loose-custom text-white/90 text-justify">
              {content}
            </p>
          )}

          {/* 額外說明 */}
          {details && details.length > 0 && (
            <div className="mt-6 space-y-2">
              {details.map((detail, index) => (
                <p key={index} className="text-body text-white/80">
                  {detail}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullBgImageLayout;

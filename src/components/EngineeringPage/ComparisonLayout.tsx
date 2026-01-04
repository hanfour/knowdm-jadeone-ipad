import React from 'react';

export interface ComparisonItem {
  image: string;
  title: string;
  description: string;
}

interface ComparisonLayoutProps {
  title: string;
  subtitle?: string;
  left: ComparisonItem;
  right: ComparisonItem;
}

const ComparisonLayout: React.FC<ComparisonLayoutProps> = ({
  title,
  subtitle,
  left,
  right,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
      {/* 標題區 */}
      <div className="text-center pt-12 pb-2 shrink-0">
        <h1 className="text-h2 tracking-widest-custom font-medium text-[#0b2d2a]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body text-text-primary mt-2 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* 圖片比較區 */}
      <div className="flex items-center justify-center px-8 pt-12 pb-20 min-h-0">
        <div className="flex gap-10 max-w-4xl">
          {/* 左側 */}
          <div className="w-[375px] flex flex-col shrink-0">
            <div className="bg-white/50 rounded-lg overflow-hidden shadow-sm">
              <img
                src={left.image}
                alt={left.title}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-large font-medium text-text-primary mb-2">
                {left.title}
              </h3>
              <p className="text-body leading-relaxed-custom text-text-primary text-justify">
                {left.description}
              </p>
            </div>
          </div>

          {/* 右側 */}
          <div className="w-[375px] flex flex-col shrink-0">
            <div className="bg-white/50 rounded-lg overflow-hidden shadow-sm">
              <img
                src={right.image}
                alt={right.title}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-large font-medium text-text-primary mb-2">
                {right.title}
              </h3>
              <p className="text-body leading-relaxed-custom text-text-primary text-justify">
                {right.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonLayout;

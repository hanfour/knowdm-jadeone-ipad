import React from 'react';
import type { FeatureItem, FeatureLabelItem } from './types';

// 編號式特色列表（1. 2. 3.）
interface NumberedFeatureListProps {
  features: FeatureItem[];
  showNumber?: boolean;
  className?: string;
}

export const NumberedFeatureList: React.FC<NumberedFeatureListProps> = ({
  features,
  showNumber = true,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {features.map((feature, index) => (
        <div key={index}>
          <div className="flex items-start">
            {showNumber && (
              <span className="text-body text-text-primary mr-1 shrink-0">
                {index + 1}.
              </span>
            )}
            <span className="text-body text-text-primary">
              {feature.title}
            </span>
          </div>
          {feature.desc && (
            <p className="text-body text-text-primary mt-1 ps-4 leading-relaxed-custom">
              {feature.desc}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

// 標題式特色列表（大標題 + 說明）
interface TitledFeatureListProps {
  features: FeatureItem[];
  className?: string;
}

export const TitledFeatureList: React.FC<TitledFeatureListProps> = ({
  features,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {features.map((feature, index) => (
        <div key={index}>
          <h3 className="text-large font-medium text-text-primary mb-2">
            {feature.title}
          </h3>
          {feature.desc && (
            <p className="text-body text-text-primary leading-loose-custom text-justify">
              {feature.desc}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

// 圓點標籤式特色列表（● 標籤：文字）
interface BulletLabelListProps {
  features: FeatureLabelItem[];
  className?: string;
}

export const BulletLabelList: React.FC<BulletLabelListProps> = ({
  features,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="flex items-start">
          <span className="w-2 h-2 bg-[#0b2d2a] rounded-full mt-2 mr-3 shrink-0" />
          <div>
            <span className="text-body font-medium text-text-primary">
              {feature.label}：
            </span>
            <span className="text-body text-text-primary leading-relaxed-custom">
              {feature.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 優點列表（帶邊框）
interface AdvantagesListProps {
  title: string;
  advantages: string[];
  className?: string;
}

export const AdvantagesList: React.FC<AdvantagesListProps> = ({
  title,
  advantages,
  className = '',
}) => {
  return (
    <div className={`p-4 bg-text-primary/5 border-l-4 border-text-primary/30 ${className}`}>
      <p className="text-body font-medium text-text-secondary mb-2">
        {title}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {advantages.map((adv, index) => (
          <span key={index} className="text-body text-text-primary">
            ({index + 1}) {adv}
          </span>
        ))}
      </div>
    </div>
  );
};

// Step 按鈕列
interface StepButtonsProps {
  segments: { label: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export const StepButtons: React.FC<StepButtonsProps> = ({
  segments,
  activeIndex,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`flex gap-3 ${className}`}>
      {segments.map((segment, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`
            px-5 py-2 text-body font-medium transition-all
            ${activeIndex === index
              ? 'bg-[#d4a853] text-white'
              : 'bg-white/80 text-text-secondary hover:bg-white'
            }
          `}
        >
          {segment.label}
        </button>
      ))}
    </div>
  );
};

import React from 'react';

interface LeftTextRightMediaProps {
  title: string;
  subtitle?: string;
  showSubtitle?: boolean;
  content?: string;
  details?: string[];
  detailsStyle?: 'default' | 'secondary';
  children: React.ReactNode; // 右側媒體內容
  leftWidth?: string;
}

const LeftTextRightMedia: React.FC<LeftTextRightMediaProps> = ({
  title,
  subtitle,
  showSubtitle = false,
  content,
  details,
  detailsStyle = 'default',
  children,
  leftWidth = 'w-[45%]',
}) => {
  return (
    <div className="flex-1 flex relative z-10">
      {/* 左側文字區塊 */}
      <div className={`${leftWidth} flex flex-col justify-center ps-24 pe-8`}>
        <div className="max-w-lg">
          {/* 標題 */}
          <h1 className="text-h2 tracking-widest-custom font-medium text-text-primary mb-2">
            {title}
          </h1>

          {/* 英文副標題 */}
          {subtitle && showSubtitle && (
            <p className="text-body tracking-wide-custom text-text-muted mb-8 italic">
              {subtitle}
            </p>
          )}

          {/* 內文 */}
          {content && (
            <p className="text-body leading-loose-custom text-text-primary text-justify">
              {content}
            </p>
          )}

          {/* 額外說明 */}
          {details && details.length > 0 && (
            <div className={`mt-${detailsStyle === 'secondary' ? '6' : '4'} space-y-${detailsStyle === 'secondary' ? '2' : '1'}`}>
              {details.map((detail, index) => (
                <p
                  key={index}
                  className={`text-body ${
                    detailsStyle === 'secondary'
                      ? 'text-text-secondary'
                      : `text-text-primary ${detail === '' ? 'h-2' : ''}`
                  }`}
                >
                  {detail}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 右側媒體區 */}
      <div className="flex-1 h-full overflow-hidden flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
};

export default LeftTextRightMedia;

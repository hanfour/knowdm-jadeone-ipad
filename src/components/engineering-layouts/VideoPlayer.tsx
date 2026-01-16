import React from 'react';

interface VideoPlayerProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  fullHeight?: boolean;
  showReplayButton?: boolean;
  onReplay?: () => void;
  loop?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  videoRef,
  fullHeight = false,
  showReplayButton = false,
  onReplay,
  loop = false,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden mb-12 flex items-center justify-center ${fullHeight ? 'h-full w-full' : ''}`}>
      <video
        ref={videoRef}
        src={src}
        className={`object-contain border-0 outline-none scale-[1.02] mix-blend-darken ${fullHeight ? 'h-full' : 'max-w-full max-h-[80vh]'} ${className}`}
        style={{ border: 'none', outline: 'none' }}
        playsInline
        muted
        loop={loop}
      />
      {/* 重播按鈕 */}
      {showReplayButton && onReplay && (
        <button
          onClick={onReplay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <svg
              className="w-10 h-10 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;

import { useRef, useState, useEffect, useCallback } from 'react';

export interface VideoSegment {
  label: string;
  start: number;
  end: number;
  loopFrom?: number;
}

export interface VideoLoop {
  start: number;
  end: number;
}

interface UseVideoPlayerConfig {
  video?: string;
  videoLoop?: VideoLoop;
  videoSegments?: VideoSegment[];
  videoShowReplay?: boolean;
}

interface UseVideoPlayerReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  activeSegment: number;
  showReplayButton: boolean;
  playSegment: (index: number) => void;
  handleReplay: () => void;
}

export function useVideoPlayer(
  activeTab: string,
  config: UseVideoPlayerConfig
): UseVideoPlayerReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [showReplayButton, setShowReplayButton] = useState<boolean>(false);
  const stopTimeRef = useRef<number | null>(null);

  // 影片時間更新監聽 - loop 播放
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // videoLoop 模式（無 step 按鈕，指定區間 loop）
      if (config.videoLoop) {
        const { start, end } = config.videoLoop;
        if (video.currentTime >= end) {
          video.currentTime = start;
        }
        return;
      }

      // videoSegments 模式（有 step 按鈕）
      const segments = config.videoSegments;
      if (!segments || activeSegment < 0) return;

      const segment = segments[activeSegment];
      if (!segment) return;

      if (video.currentTime >= segment.end) {
        const loopPoint = segment.loopFrom ?? (segment.end - 1);
        video.currentTime = Math.max(segment.start, loopPoint);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [config.videoLoop, config.videoSegments, activeSegment]);

  // 播放指定時間段
  const playSegment = useCallback((index: number) => {
    const video = videoRef.current;
    const segments = config.videoSegments;
    if (!video || !segments || !segments[index]) return;

    const segment = segments[index];
    setActiveSegment(index);
    video.currentTime = segment.start;
    stopTimeRef.current = segment.end;
    video.play();
  }, [config.videoSegments]);

  // 切換 tab 時重置 segment 並自動播放
  useEffect(() => {
    setActiveSegment(0);
    stopTimeRef.current = null;
    setShowReplayButton(false);

    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !config.video) return;

      if (config.videoSegments) {
        playSegment(0);
      } else if (config.videoLoop) {
        video.currentTime = 0;
        video.play();
      } else if (config.videoShowReplay) {
        video.currentTime = 0;
        video.play();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab, config.video, config.videoSegments, config.videoLoop, config.videoShowReplay, playSegment]);

  // 監聽影片結束事件
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (config.videoShowReplay) {
        setShowReplayButton(true);
        return;
      }
      if (config.videoLoop) {
        video.currentTime = config.videoLoop.start;
        video.play();
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [config.videoShowReplay, config.videoLoop]);

  // 重播影片
  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setShowReplayButton(false);
    video.currentTime = 0;
    video.play();
  }, []);

  return {
    videoRef,
    activeSegment,
    showReplayButton,
    playSegment,
    handleReplay,
  };
}

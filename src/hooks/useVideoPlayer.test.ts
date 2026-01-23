import { renderHook, act } from '@testing-library/react';
import { useVideoPlayer, VideoSegment, VideoLoop } from './useVideoPlayer';

describe('useVideoPlayer', () => {
  let mockVideoElement: any;
  let eventListeners: Map<string, EventListener>;

  beforeEach(() => {
    eventListeners = new Map();
    let currentTimeValue = 0;

    mockVideoElement = {
      get currentTime() {
        return currentTimeValue;
      },
      set currentTime(value: number) {
        currentTimeValue = value;
      },
      play: jest.fn().mockResolvedValue(undefined),
      pause: jest.fn(),
      addEventListener: jest.fn((event: string, handler: EventListener) => {
        eventListeners.set(event, handler);
      }),
      removeEventListener: jest.fn((event: string) => {
        eventListeners.delete(event);
      }),
    };

    // Mock createRef for video element
    jest.spyOn(require('react'), 'useRef').mockImplementation((initialValue) => {
      if (initialValue === null) {
        return { current: mockVideoElement };
      }
      return { current: initialValue };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('基本功能', () => {
    test('應該初始化並返回正確的屬性', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
        })
      );

      expect(result.current.videoRef).toBeDefined();
      expect(result.current.activeSegment).toBe(0);
      expect(result.current.showReplayButton).toBe(false);
      expect(typeof result.current.playSegment).toBe('function');
      expect(typeof result.current.handleReplay).toBe('function');
    });

    test('應該註冊事件監聽器', () => {
      renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
        })
      );

      expect(mockVideoElement.addEventListener).toHaveBeenCalled();
    });
  });

  describe('VideoLoop 模式', () => {
    test('應該在到達結束點時跳回起點', () => {
      const videoLoop: VideoLoop = { start: 5, end: 10 };

      renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoLoop,
        })
      );

      // 模擬影片播放到結束點
      mockVideoElement.currentTime = 10.5;

      act(() => {
        const timeUpdateHandler = eventListeners.get('timeupdate');
        timeUpdateHandler?.(new Event('timeupdate'));
      });

      expect(mockVideoElement.currentTime).toBe(5);
    });

    test('應該在影片未到結束點時不改變時間', () => {
      const videoLoop: VideoLoop = { start: 5, end: 10 };

      renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoLoop,
        })
      );

      // 模擬影片播放在區間內
      mockVideoElement.currentTime = 7;

      act(() => {
        const timeUpdateHandler = eventListeners.get('timeupdate');
        timeUpdateHandler?.(new Event('timeupdate'));
      });

      expect(mockVideoElement.currentTime).toBe(7);
    });
  });

  describe('VideoSegments 模式', () => {
    const segments: VideoSegment[] = [
      { label: 'Segment 1', start: 0, end: 5 },
      { label: 'Segment 2', start: 5, end: 10, loopFrom: 7 },
      { label: 'Segment 3', start: 10, end: 15 },
    ];

    test('應該更新 activeSegment 狀態', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoSegments: segments,
        })
      );

      expect(result.current.activeSegment).toBe(0);

      act(() => {
        result.current.playSegment(1);
      });

      expect(result.current.activeSegment).toBe(1);

      act(() => {
        result.current.playSegment(2);
      });

      expect(result.current.activeSegment).toBe(2);
    });

    test('應該在 segment 結束時循環播放', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoSegments: segments,
        })
      );

      act(() => {
        result.current.playSegment(0);
      });

      // 模擬播放到第一個 segment 的結束點
      mockVideoElement.currentTime = 5.1;

      act(() => {
        const timeUpdateHandler = eventListeners.get('timeupdate');
        timeUpdateHandler?.(new Event('timeupdate'));
      });

      // 應該跳回到 loopFrom 預設值 (end - 1 = 4)
      expect(mockVideoElement.currentTime).toBe(4);
    });

    test('應該使用 loopFrom 屬性作為循環點', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoSegments: segments,
        })
      );

      // 播放第二個 segment (有 loopFrom: 7)
      act(() => {
        result.current.playSegment(1);
      });

      // 模擬播放到結束點
      mockVideoElement.currentTime = 10.1;

      act(() => {
        const timeUpdateHandler = eventListeners.get('timeupdate');
        timeUpdateHandler?.(new Event('timeupdate'));
      });

      // 應該跳回到 loopFrom 指定的 7 秒
      expect(mockVideoElement.currentTime).toBe(7);
    });

    test('應該處理無效的 segment 索引', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoSegments: segments,
        })
      );

      const initialSegment = result.current.activeSegment;

      // 嘗試播放不存在的 segment
      act(() => {
        result.current.playSegment(99);
      });

      // activeSegment 不應該改變
      expect(result.current.activeSegment).toBe(initialSegment);
    });
  });

  describe('Replay 模式', () => {
    test('應該提供 handleReplay 函數', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoShowReplay: true,
        })
      );

      expect(typeof result.current.handleReplay).toBe('function');
    });

    test('handleReplay 應該重置 currentTime', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoShowReplay: true,
        })
      );

      // 設定當前時間到中間
      mockVideoElement.currentTime = 5;

      act(() => {
        result.current.handleReplay();
      });

      expect(mockVideoElement.currentTime).toBe(0);
    });
  });

  describe('邊界條件', () => {
    test('應該處理空的 videoRef', () => {
      jest.spyOn(require('react'), 'useRef').mockReturnValue({
        current: null,
      });

      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
        })
      );

      // 不應該拋出錯誤
      expect(() => {
        act(() => {
          result.current.handleReplay();
        });
      }).not.toThrow();

      expect(() => {
        act(() => {
          result.current.playSegment(0);
        });
      }).not.toThrow();
    });

    test('應該處理沒有 videoSegments 的情況', () => {
      const { result } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
        })
      );

      expect(result.current.activeSegment).toBe(0);

      // timeupdate 不應該拋出錯誤
      act(() => {
        const timeUpdateHandler = eventListeners.get('timeupdate');
        timeUpdateHandler?.(new Event('timeupdate'));
      });
    });

    test('應該處理無效的 activeSegment', () => {
      const segments: VideoSegment[] = [
        { label: 'Segment 1', start: 0, end: 5 },
      ];

      renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
          videoSegments: segments,
        })
      );

      // timeupdate 不應該拋出錯誤
      act(() => {
        const timeUpdateHandler = eventListeners.get('timeupdate');
        timeUpdateHandler?.(new Event('timeupdate'));
      });
    });
  });

  describe('事件清理', () => {
    test('應該在 unmount 時清除事件監聽器', () => {
      const { unmount } = renderHook(() =>
        useVideoPlayer('tab1', {
          video: 'test.mp4',
        })
      );

      expect(mockVideoElement.addEventListener).toHaveBeenCalled();

      unmount();

      expect(mockVideoElement.removeEventListener).toHaveBeenCalled();
    });
  });
});

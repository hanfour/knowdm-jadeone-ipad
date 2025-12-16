export const floorPlanStyles = `
  @keyframes markerGlow {
    0%, 100% {
      box-shadow:
        0 0 0 0 rgba(255, 215, 0, 0.7),
        0 0 8px 2px rgba(255, 215, 0, 0.5);
    }
    50% {
      box-shadow:
        0 0 0 6px rgba(255, 215, 0, 0),
        0 0 15px 4px rgba(255, 215, 0, 0.8);
    }
  }

  @keyframes markerRing {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  .marker-glow {
    animation: markerGlow 2s ease-in-out infinite;
  }

  .marker-ring::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    margin-top: -50%;
    margin-left: -50%;
    border: 2px solid rgba(255, 215, 0, 0.6);
    border-radius: 50%;
    animation: markerRing 1.5s ease-out infinite;
  }

  @keyframes regionBlink {
    0%, 100% {
      fill: rgba(255, 215, 0, 0.5);
    }
    50% {
      fill: rgba(255, 215, 0, 0.2);
    }
  }

  .region-highlight {
    animation: regionBlink 3s ease-in-out infinite;
    cursor: pointer;
  }

  .region-highlight:hover {
    fill: rgba(255, 215, 0, 0.5);
  }
`;

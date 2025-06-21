'use client';

import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  volume?: number;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, volume = 0.15, loop = true }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = loop;
      audio.play().catch(err => {
        console.warn("🔇 Autoplay blocked or failed:", err.message);
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [src, volume, loop]);

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      onError={(e) => console.error("❌ Audio error:", e)}
    />
  );
};

export default AudioPlayer;

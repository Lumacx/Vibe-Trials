'use client';

import React, { useRef, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AudioPlayerProps {
  src: string;
  volume?: number;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, volume = 0.15, loop = true }) => {

  const pathname = usePathname();

  // Páginas donde debe estar abajo a la derecha
  const isBottomPage = pathname === '/' || pathname === '/leaderboard' || pathname === '/credits';

  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : currentVolume;
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
  }, [src, loop, currentVolume, isMuted]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setCurrentVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div
      className={`z-50 flex items-center space-x-2 bg-black/50 rounded-md border border-purple-500 
        ${isBottomPage
          ? 'fixed bottom-4 right-4'
        //absolute top-8 removido de abajo por relative
          : 'relative left-1/2 transform -translate-x-1/2'}
        h-10 px-2`
      }
    >
      <button
        onClick={toggleMute}
        className="h-8 w-8 flex items-center justify-center rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700 transition"
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : currentVolume}
        onChange={handleVolumeChange}
        className="h-2 w-24 appearance-none rounded bg-gray-300 dark:bg-gray-700 cursor-pointer"
      />
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onError={(e) => console.error("❌ Audio error:", e)}
      />
    </div>
  );
  
};

export default AudioPlayer;
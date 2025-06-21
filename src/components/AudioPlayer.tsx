'use client';

import React, { useRef, useEffect, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  volume?: number;
  loop?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, volume = 0.15, loop = true }) => {
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
    <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 bg-black/50 p-2 rounded-lg">
      <button onClick={toggleMute} className="p-2 rounded-full bg-purple-600 text-white text-sm hover:bg-purple-700 transition">
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : currentVolume}
        onChange={handleVolumeChange}
        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
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

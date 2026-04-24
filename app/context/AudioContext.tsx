"use client";

import { createContext, useContext, useRef, useEffect, useState } from 'react';

const AudioContext = createContext<{
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  playMusic: () => void;
  togglePlay: () => void;
} | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/assets/audio.mp3');
    audio.loop = true;
    
    // Listen to play/pause events to sync state
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback error:", e));
    }
  };

  return (
    <AudioContext.Provider value={{ audio: audioRef.current, isPlaying, playMusic, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);

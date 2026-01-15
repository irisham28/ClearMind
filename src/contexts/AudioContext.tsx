import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";

interface Track {
  id: number;
  title: string;
  duration: string;
  category: string;
  audioUrl?: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seekTo: (progress: number) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Real audio URLs for different cultural sounds (royalty-free meditation sounds)
const demoAudioUrls: Record<string, string> = {
  // Chinese
  "Guqin Meditation": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Singing Bowl Resonance": "https://cdn.pixabay.com/audio/2024/09/27/audio_0a2c3e0b0c.mp3",
  "Temple Bell Harmony": "https://cdn.pixabay.com/audio/2024/05/06/audio_85a8a12b11.mp3",
  "Bamboo Flute Peace": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Zen Garden Ambience": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  // Indian
  "Om Shanti Mantra": "https://cdn.pixabay.com/audio/2024/03/15/audio_0b0c5e4a2c.mp3",
  "Morning Raga": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Sitar Serenity": "https://cdn.pixabay.com/audio/2024/08/26/audio_df7c19f9b9.mp3",
  "Tabla Meditation": "https://cdn.pixabay.com/audio/2024/05/06/audio_85a8a12b11.mp3",
  "Vedic Chanting": "https://cdn.pixabay.com/audio/2024/03/15/audio_0b0c5e4a2c.mp3",
  // Malay
  "Gamelan Dreams": "https://cdn.pixabay.com/audio/2024/09/27/audio_0a2c3e0b0c.mp3",
  "Coastal Serenity": "https://cdn.pixabay.com/audio/2021/08/09/audio_7e9e0a9c9a.mp3",
  "Traditional Lullaby": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Kampung Evening": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  // Nature - Singapore
  "Botanic Gardens Morning": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  "MacRitchie Reservoir": "https://cdn.pixabay.com/audio/2021/08/09/audio_7e9e0a9c9a.mp3",
  "East Coast Park Waves": "https://cdn.pixabay.com/audio/2021/08/09/audio_7e9e0a9c9a.mp3",
  "Sungei Buloh Birds": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  "Rain on Leaves": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  "Gardens by the Bay": "https://cdn.pixabay.com/audio/2024/08/26/audio_df7c19f9b9.mp3",
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = (track: Track) => {
    if (!audioRef.current) return;

    const audioUrl = demoAudioUrls[track.title] || "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3";
    
    if (currentTrack?.id !== track.id) {
      audioRef.current.src = audioUrl;
      setCurrentTrack({ ...track, audioUrl });
      setProgress(0);
    }

    audioRef.current.play().catch(console.error);
    setIsPlaying(true);

    // Update progress
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }, 100);

    audioRef.current.onended = () => {
      setIsPlaying(false);
      setProgress(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else if (currentTrack) {
      audioRef.current?.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seekTo = (newProgress: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  const closePlayer = () => {
    pauseTrack();
    setCurrentTrack(null);
    setProgress(0);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        playTrack,
        pauseTrack,
        togglePlayPause,
        setVolume,
        seekTo,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

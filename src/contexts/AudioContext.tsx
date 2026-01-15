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

// Working royalty-free audio URLs from various free sound libraries
const demoAudioUrls: Record<string, string> = {
  // Chinese - Peaceful meditation sounds
  "Guqin Meditation": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Singing Bowl Resonance": "https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3",
  "Temple Bell Harmony": "https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3",
  "Bamboo Flute Peace": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Zen Garden Ambience": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  // Indian - Mantras and classical sounds
  "Om Shanti Mantra": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Morning Raga": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Sitar Serenity": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Tabla Meditation": "https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3",
  "Vedic Chanting": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  // Malay - Gamelan and peaceful sounds
  "Gamelan Dreams": "https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3",
  "Coastal Serenity": "https://cdn.freesound.org/previews/527/527409_2391552-lq.mp3",
  "Traditional Lullaby": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Kampung Evening": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  // Nature sounds
  "Botanic Gardens Morning": "/audio/botanical-gardens-17568.mp3",
  "MacRitchie Reservoir": "/audio/rain-on-the-window-114709.mp3",
  "East Coast Park Waves": "/audio/waves-hitting-the-rocks-16680.mp3",
  "Sungei Buloh Birds": "/audio/birds-19624.mp3",
  "Rain on Leaves": "/audio/rain-on-the-window-114709.mp3",
  "Gardens by the Bay": "/audio/the-bay-67315.mp3",
};

// Default fallback audio
const defaultAudioUrl = "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3";

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

    const audioUrl = demoAudioUrls[track.title] || defaultAudioUrl;
    
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

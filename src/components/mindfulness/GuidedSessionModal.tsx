import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Volume2, VolumeX, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GuidedSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  duration: string;
  steps?: string[];
  cues?: string[];
}

// Ambient audio URLs for different practice types
const ambientAudioUrls: Record<string, string> = {
  "Deep Breathing": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Focus Meditation": "https://cdn.pixabay.com/audio/2024/08/26/audio_df7c19f9b9.mp3",
  "Stress Relief": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  "Qi Breathing Exercise": "https://cdn.pixabay.com/audio/2024/08/26/audio_df7c19f9b9.mp3",
  "Standing Meditation": "https://cdn.pixabay.com/audio/2024/09/27/audio_0a2c3e0b0c.mp3",
  "Eight Brocades": "https://cdn.pixabay.com/audio/2024/05/06/audio_85a8a12b11.mp3",
  "Pre-Prayer Meditation": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Dhikr Practice": "https://cdn.pixabay.com/audio/2024/03/15/audio_0b0c5e4a2c.mp3",
  "Tafakkur Reflection": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
  "Pranayama Basics": "https://cdn.pixabay.com/audio/2024/08/26/audio_df7c19f9b9.mp3",
  "Simple Yoga Sequence": "https://cdn.pixabay.com/audio/2024/09/27/audio_0a2c3e0b0c.mp3",
  "Mantra Meditation": "https://cdn.pixabay.com/audio/2024/03/15/audio_0b0c5e4a2c.mp3",
  "Mindful Breathing": "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3",
  "Loving Kindness": "https://cdn.pixabay.com/audio/2024/08/26/audio_df7c19f9b9.mp3",
  "Body Scan": "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a14c76fd.mp3",
};

const defaultAmbientUrl = "https://cdn.pixabay.com/audio/2022/03/09/audio_6e8ad1cbee.mp3";

export function GuidedSessionModal({
  isOpen,
  onClose,
  title,
  description,
  duration,
  steps = [],
  cues = [],
}: GuidedSessionModalProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Parse duration string to seconds
  useEffect(() => {
    const match = duration?.match(/(\d+)/);
    const minutes = match ? parseInt(match[1]) : 5;
    const seconds = minutes * 60;
    setTotalTime(seconds);
    setTimeRemaining(seconds);
  }, [duration]);

  // Initialize audio
  useEffect(() => {
    const audioUrl = ambientAudioUrls[title] || defaultAmbientUrl;
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [title]);

  // Handle timer
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            if (audioRef.current) audioRef.current.pause();
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Update current step based on time progress
  useEffect(() => {
    if (steps.length > 0 && totalTime > 0) {
      const progress = 1 - timeRemaining / totalTime;
      const stepIndex = Math.min(
        Math.floor(progress * steps.length),
        steps.length - 1
      );
      setCurrentStep(stepIndex);
    }
  }, [timeRemaining, totalTime, steps.length]);

  const handlePlayPause = () => {
    if (isCompleted) {
      handleReset();
      return;
    }

    if (isRunning) {
      setIsRunning(false);
      if (audioRef.current) audioRef.current.pause();
    } else {
      setIsRunning(true);
      if (audioRef.current && !isMuted) audioRef.current.play().catch(console.error);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeRemaining(totalTime);
    setCurrentStep(0);
    if (audioRef.current) audioRef.current.pause();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
      } else if (isRunning) {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Timer Display */}
          <div className="text-center">
            <motion.div
              className="text-5xl font-light text-foreground tabular-nums"
              key={timeRemaining}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {formatTime(timeRemaining)}
            </motion.div>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />

          {/* Completion State */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-3" />
                <p className="text-lg font-medium text-foreground">Session Complete!</p>
                <p className="text-sm text-muted-foreground">Well done on completing your practice.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current Step Display */}
          {steps.length > 0 && !isCompleted && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary/50 rounded-xl p-4"
            >
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Step {currentStep + 1} of {steps.length}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {steps[currentStep]}
              </p>
            </motion.div>
          )}

          {/* Cues */}
          {cues.length > 0 && !isCompleted && (
            <div className="flex flex-wrap gap-2 justify-center">
              {cues.map((cue) => (
                <span
                  key={cue}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {cue}
                </span>
              ))}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleMuteToggle}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            <Button
              size="lg"
              className="rounded-full w-16 h-16"
              onClick={handlePlayPause}
            >
              {isCompleted ? (
                <RotateCcw className="w-6 h-6" />
              ) : isRunning ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

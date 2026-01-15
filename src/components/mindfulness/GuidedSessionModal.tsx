import { useState, useEffect, useRef, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2, Youtube, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useYoutubeSearch } from "@/hooks/useYoutubeSearch";

interface GuidedSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  duration: string;
  steps?: string[];
  cues?: string[];
}

// YouTube video IDs for different practices
const practiceVideos: Record<string, { id: string; title: string }> = {
  "Deep Breathing": { id: "tybOi4hjZFQ", title: "Deep Breathing Exercise" },
  "Focus Meditation": { id: "inpok4MKVLM", title: "Focus & Concentration Meditation" },
  "Stress Relief": { id: "m1vaUGtyo-A", title: "Progressive Muscle Relaxation" },
  "Qi Breathing Exercise": { id: "nOJTbWC-ULc", title: "Qigong Breathing Exercise" },
  "Standing Meditation": { id: "Y-lT7mn_JDk", title: "Zhan Zhuang Standing Meditation" },
  "Eight Brocades": { id: "3K-0JpiJu-o", title: "Eight Brocades Qigong" },
  "Pre-Prayer Meditation": { id: "O-6f5wQXSu8", title: "Centering Meditation" },
  "Dhikr Practice": { id: "QNGLZvtRoiU", title: "Dhikr Remembrance Practice" },
  "Tafakkur Reflection": { id: "ez3GgRqhNvA", title: "Contemplative Meditation" },
  "Pranayama Basics": { id: "K4dmZ5_sP04", title: "Pranayama Breathing Techniques" },
  "Simple Yoga Sequence": { id: "v7AYKMP6rOE", title: "Gentle Yoga for Relaxation" },
  "Mantra Meditation": { id: "nMgSK7Rw5vM", title: "Om Mantra Meditation" },
  "Mindful Breathing": { id: "ZToicYcHIOU", title: "Anapanasati Breathing Meditation" },
  "Loving Kindness": { id: "sz7cpV7ERsM", title: "Loving Kindness (Metta) Meditation" },
  "Body Scan": { id: "15q-N-_kkrU", title: "Body Scan Meditation" },
};

// Working audio URLs from free sound libraries
const ambientAudioUrls: Record<string, string> = {
  "Deep Breathing": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Focus Meditation": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Stress Relief": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Qi Breathing Exercise": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Standing Meditation": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Eight Brocades": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Pre-Prayer Meditation": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Dhikr Practice": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Tafakkur Reflection": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Pranayama Basics": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Simple Yoga Sequence": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Mantra Meditation": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Mindful Breathing": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
  "Loving Kindness": "https://cdn.freesound.org/previews/456/456142_8162587-lq.mp3",
  "Body Scan": "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3",
};

const defaultAmbientUrl = "https://cdn.freesound.org/previews/531/531947_6460019-lq.mp3";

export function GuidedSessionModal({
  isOpen,
  onClose,
  title,
  description,
  duration,
  steps = [],
  cues = [],
}: GuidedSessionModalProps) {
  const [activeTab, setActiveTab] = useState<"timer" | "video">("video");
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>(() => practiceVideos[title]?.id);

  const fallbackVideo = practiceVideos[title];
  const fallbackVideoId = fallbackVideo?.id;
  const searchQuery = useMemo(() => {
    const base = [title, description].filter(Boolean).join(" ");
    return `${base} breathing guide`;
  }, [title, description]);

  const {
    data: youtubeVideos,
    isLoading: isYoutubeLoading,
    error: youtubeError,
  } = useYoutubeSearch(searchQuery, 5);

  useEffect(() => {
    if (youtubeVideos && youtubeVideos.length > 0) {
      setSelectedVideoId((current) => {
        const stillMatches = current && youtubeVideos.some((video) => video.id === current);
        return stillMatches ? current : youtubeVideos[0].id;
      });
      return;
    }

    setSelectedVideoId(fallbackVideoId);
  }, [title, fallbackVideoId, youtubeVideos]);

  const selectedVideo = youtubeVideos?.find((video) => video.id === selectedVideoId);
  const currentVideoId = selectedVideoId ?? fallbackVideoId;
  const currentVideoTitle =
    selectedVideo?.title || fallbackVideo?.title || `${title} guide`;
  const youtubeErrorMessage =
    youtubeError instanceof Error ? youtubeError.message : undefined;

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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "timer" | "video")} className="mt-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              Video Guide
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Timed Session
            </TabsTrigger>
          </TabsList>

          {/* Video Tab */}
          <TabsContent value="video" className="space-y-4 mt-4">
            {currentVideoId ? (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${currentVideoId}?rel=0`}
                    title={currentVideoTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {selectedVideo
                    ? `Now playing: ${selectedVideo.title}`
                    : fallbackVideo
                      ? `Previewing: ${fallbackVideo.title}`
                      : "Follow along with this practice video."}
                </p>
              </div>
            ) : (
              <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center">
                <p className="text-muted-foreground">No video available for this practice</p>
              </div>
            )}

            <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  YouTube recommendations
                </h4>
                {isYoutubeLoading && (
                  <span className="text-xs text-muted-foreground">Searching...</span>
                )}
              </div>
              {youtubeErrorMessage && (
                <p className="text-xs text-destructive">
                  Unable to fetch videos: {youtubeErrorMessage}
                </p>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                {youtubeVideos?.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => setSelectedVideoId(result.id)}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                      selectedVideoId === result.id
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <img
                      className="h-16 w-28 shrink-0 rounded-md object-cover"
                      src={result.thumbnailUrl}
                      alt={result.title}
                      loading="lazy"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground line-clamp-2">
                        {result.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{result.channelTitle}</p>
                    </div>
                  </button>
                ))}
                {!isYoutubeLoading && !youtubeVideos?.length && (
                  <p className="text-xs text-muted-foreground">
                    No recommendations available just yet. Try again shortly.
                  </p>
                )}
              </div>
            </div>

            {/* Steps Summary */}
            {steps.length > 0 && (
              <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Practice Steps
                </h4>
                <ol className="space-y-2">
                  {steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </TabsContent>

          {/* Timer Tab */}
          <TabsContent value="timer" className="space-y-6 mt-4">
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
              <p className="text-sm text-muted-foreground mt-2">{duration} session</p>
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, X, SkipBack, SkipForward } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function PersistentAudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    togglePlayPause, 
    setVolume, 
    seekTo, 
    closePlayer 
  } = useAudio();

  if (!currentTrack) return null;

  const categoryColors: Record<string, string> = {
    chinese: "from-[hsl(15_45%_50%)] to-[hsl(15_45%_35%)]",
    indian: "from-[hsl(35_70%_50%)] to-[hsl(35_70%_35%)]",
    malay: "from-[hsl(160_40%_45%)] to-[hsl(160_40%_30%)]",
    nature: "from-[hsl(140_35%_45%)] to-[hsl(140_35%_30%)]",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg"
      >
        {/* Progress Bar */}
        <div 
          className="h-1 bg-muted cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            seekTo(percentage);
          }}
        >
          <motion.div 
            className={cn("h-full bg-gradient-to-r", categoryColors[currentTrack.category] || "bg-primary")}
            style={{ width: `${progress}%` }}
            layoutId="progress-bar"
          />
        </div>

        <div className="container py-3">
          <div className="flex items-center gap-4">
            {/* Track Info */}
            <motion.div 
              className="flex items-center gap-3 flex-1 min-w-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className={cn(
                "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                categoryColors[currentTrack.category] || "bg-primary"
              )}>
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ repeat: isPlaying ? Infinity : 0, duration: 1 }}
                >
                  {isPlaying ? (
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-white rounded-full"
                          animate={{ height: [8, 16, 8] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 0.5, 
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </motion.div>
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">{currentTrack.title}</p>
                <p className="text-sm text-muted-foreground capitalize">{currentTrack.category} • {currentTrack.duration}</p>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button 
                  variant="default" 
                  size="icon" 
                  className="rounded-full w-10 h-10"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>
              </motion.div>
              
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume */}
            <div className="hidden md:flex items-center gap-2 w-32">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Slider
                value={[volume * 100]}
                onValueChange={([val]) => setVolume(val / 100)}
                max={100}
                step={1}
                className="w-20"
              />
            </div>

            {/* Close */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closePlayer}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoundTrackCardProps {
  title: string;
  category: "chinese" | "indian" | "malay" | "nature";
  isPlaying?: boolean;
  onPlayPause?: () => void;
}

const categoryColors = {
  chinese: "bg-chinese/10 text-chinese",
  indian: "bg-indian/10 text-indian",
  malay: "bg-malay/10 text-malay",
  nature: "bg-nature/10 text-nature",
};

export function SoundTrackCard({
  title,
  category,
  isPlaying = false,
  onPlayPause,
}: SoundTrackCardProps) {
  return (
    <div className="practice-card">
      <button
        onClick={onPlayPause}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg shrink-0 transition-colors",
          categoryColors[category]
        )}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-4 h-4 fill-current ml-0.5" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-foreground truncate">{title}</h4>
      </div>
    </div>
  );
}

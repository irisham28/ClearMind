import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface SoundCategoryCardProps {
  title: string;
  subtitle: string;
  category: "chinese" | "indian" | "malay" | "nature";
  trackCount: number;
  onClick?: () => void;
}

const categoryGradients = {
  chinese: "gradient-chinese",
  indian: "gradient-indian",
  malay: "gradient-malay",
  nature: "gradient-nature",
};

const categoryIcons = {
  chinese: "🎵",
  indian: "🕉️",
  malay: "🎶",
  nature: "🌿",
};

export function SoundCategoryCard({
  title,
  subtitle,
  category,
  trackCount,
  onClick,
}: SoundCategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "category-card w-full text-left",
        categoryGradients[category]
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute top-3 right-3 text-2xl">
        {categoryIcons[category]}
      </div>
      <div className="relative z-10 text-white">
        <h3 className="font-semibold text-base">{title}</h3>
        <p className="text-xs text-white/80 mt-0.5">{subtitle}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm">
            <Play className="w-3 h-3 fill-white text-white" />
          </div>
          <span className="text-xs text-white/90">{trackCount} tracks</span>
        </div>
      </div>
    </button>
  );
}

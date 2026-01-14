import { Clock, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface PracticeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  duration?: string;
  onClick?: () => void;
}

export function PracticeCard({
  icon,
  title,
  description,
  duration,
  onClick,
}: PracticeCardProps) {
  return (
    <button onClick={onClick} className="practice-card w-full text-left group">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {description}
        </p>
        {duration && (
          <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
    </button>
  );
}

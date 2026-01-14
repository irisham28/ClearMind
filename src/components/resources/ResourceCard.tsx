import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ResourceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
  onClick?: () => void;
}

export function ResourceCard({
  icon,
  title,
  description,
  tag,
  onClick,
}: ResourceCardProps) {
  return (
    <button onClick={onClick} className="feature-card w-full text-left group">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-secondary-foreground shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          {tag && (
            <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded mb-1.5">
              {tag}
            </span>
          )}
          <h4 className="font-medium text-sm text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-3" />
      </div>
    </button>
  );
}

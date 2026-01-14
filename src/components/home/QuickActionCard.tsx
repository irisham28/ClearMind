import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

export function QuickActionCard({
  icon,
  title,
  description,
  variant = "secondary",
  onClick,
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "feature-card text-left hover:scale-[1.02] transition-transform",
        variant === "primary" && "bg-primary text-primary-foreground border-primary",
        variant === "accent" && "bg-accent text-accent-foreground border-accent"
      )}
    >
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
        variant === "primary" ? "bg-white/20" : 
        variant === "accent" ? "bg-white/20" : "bg-primary/10 text-primary"
      )}>
        {icon}
      </div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className={cn(
        "text-xs mt-1",
        variant === "primary" || variant === "accent" 
          ? "text-current/80" 
          : "text-muted-foreground"
      )}>
        {description}
      </p>
    </button>
  );
}

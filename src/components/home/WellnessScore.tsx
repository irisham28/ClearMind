import { TrendingUp } from "lucide-react";

interface WellnessScoreProps {
  score: number;
  change?: number;
  lastUpdated?: string;
}

export function WellnessScore({ score, change, lastUpdated }: WellnessScoreProps) {
  return (
    <div className="feature-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Wellness Score
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-semibold text-foreground">{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
        {change !== undefined && change > 0 && (
          <div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded-lg">
            <TrendingUp className="w-3 h-3" />
            <span className="text-xs font-medium">+{change}%</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}

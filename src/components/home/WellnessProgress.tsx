import { Progress } from "@/components/ui/progress";
import { WellnessHistoryEntry } from "@/contexts/WellnessSurveyContext";

interface WellnessProgressProps {
  score: number;
  change?: number;
  history: WellnessHistoryEntry[];
  categoryScores: Record<string, number>;
}

const formatTimestamp = (timestamp?: number) => {
  if (!timestamp) return "No check-ins yet";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

export function WellnessProgress({
  score,
  change,
  history,
  categoryScores,
}: WellnessProgressProps) {
  const recentHistory = history.slice(0, 3);
  const sortedCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const changeLabel =
    change !== undefined
      ? `${change >= 0 ? "+" : ""}${change} since last check-in`
      : "Submit a check-in to start tracking";

  return (
    <div className="feature-card space-y-5 bg-secondary/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Progress Story
          </p>
          <p className="text-sm text-foreground">
            Latest check-in recorded at {score}/100 ({formatTimestamp(history[0]?.timestamp)})
          </p>
        </div>
        <span
          className={`text-[11px] font-semibold uppercase tracking-wide ${
            change && change > 0
              ? "text-primary"
              : change && change < 0
              ? "text-destructive"
              : "text-muted-foreground"
          }`}
        >
          {changeLabel}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Recent check-ins
          </p>
          <ul className="space-y-2 text-sm">
            {recentHistory.length ? (
              recentHistory.map((entry) => (
                <li key={entry.timestamp} className="flex items-center justify-between">
                  <span className="text-foreground">{entry.score}/100</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-xs text-muted-foreground">Once you complete a check-in, it appears here.</li>
            )}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Focus areas
          </p>
          <div className="space-y-3">
            {sortedCategories.length ? (
              sortedCategories.map(([category, value]) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1 text-xs text-muted-foreground">
                    <span>{category}</span>
                    <span>{value}/100</span>
                  </div>
                  <Progress value={value} />
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                Categories update once you answer prompts that touch on those themes.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

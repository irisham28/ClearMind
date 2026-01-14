import { Button } from "@/components/ui/button";

export interface PracticeDetail {
  highlight: string;
  steps: string[];
  cues?: string[];
}

interface PracticeDetailPanelProps {
  title: string;
  description: string;
  duration?: string;
  detail?: PracticeDetail;
}

export function PracticeDetailPanel({
  title,
  description,
  duration,
  detail,
}: PracticeDetailPanelProps) {
  return (
    <section className="feature-card space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Practice Detail
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-1">{title}</h3>
        </div>
        {duration && (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {duration}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

      {detail?.highlight && (
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {detail.highlight}
        </p>
      )}

      {detail?.steps && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Steps
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
            {detail.steps.map((step, index) => (
              <li key={`${title}-step-${index}`} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {detail?.cues && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Cues
          </p>
          <div className="flex flex-wrap gap-2">
            {detail.cues.map((cue) => (
              <span
                key={cue}
                className="rounded-full border border-input/60 px-3 py-1 text-[11px] uppercase tracking-wide text-muted-foreground"
              >
                {cue}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button variant="default" size="sm">
          Start session
        </Button>
        <Button variant="ghost" size="sm">
          Save to routine
        </Button>
      </div>
    </section>
  );
}

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useWellnessSurvey } from "@/contexts/WellnessSurveyContext";

const likertScale = [
  { value: 1, label: "Not at all" },
  { value: 5, label: "Extremely" },
];

export function WellnessSurveyForm() {
  const { questions, responses, submitResponse } = useWellnessSurvey();

  return (
    <div className="feature-card space-y-6">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Daily Check-in
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Capture how you feel and adjust your practices. Tap a score to save it instantly.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question) => {
          const currentValue =
            typeof responses[question.id] === "number"
              ? responses[question.id]!.toString()
              : undefined;

          return (
            <div key={question.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  {question.prompt}
                </p>
                <span className="text-xs text-muted-foreground">{question.category}</span>
              </div>
              {question.hint && (
                <p className="text-xs text-muted-foreground">{question.hint}</p>
              )}

              <ToggleGroup
                type="single"
                value={currentValue}
                onValueChange={(value) => {
                  if (value) {
                    submitResponse(question.id, Number(value));
                  }
                }}
                aria-label={question.prompt}
                className="grid grid-cols-5 gap-2"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <ToggleGroupItem
                    key={`${question.id}-${value}`}
                    value={value.toString()}
                    size="sm"
                    variant="outline"
                    className="text-[12px] text-foreground"
                  >
                    {value}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground uppercase tracking-wide">
                {likertScale.map((item) => (
                  <span key={`${question.id}-label-${item.value}`}>{item.label}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

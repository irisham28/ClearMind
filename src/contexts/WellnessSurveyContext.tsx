import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  wellnessSurveyQuestions,
  WellnessCategory,
  WellnessSurveyQuestion,
} from "@/data/wellnessQuestions";

const STORAGE_KEY = "clearMind:wellnessSurveyState";

export interface WellnessHistoryEntry {
  score: number;
  timestamp: number;
}

type WellnessResponses = Partial<Record<string, number>>;

interface StoredSurveyState {
  responses: WellnessResponses;
  history: WellnessHistoryEntry[];
}

interface WellnessSurveyContextValue {
  questions: WellnessSurveyQuestion[];
  responses: WellnessResponses;
  submitResponse: (questionId: string, value: number) => void;
  score: number;
  history: WellnessHistoryEntry[];
  change?: number;
  lastUpdated?: number;
  categoryScores: Record<WellnessCategory, number>;
}

const WellnessSurveyContext = createContext<WellnessSurveyContextValue | undefined>(undefined);

function computeScore(responses: WellnessResponses) {
  const answered = wellnessSurveyQuestions
    .map((question) => {
      const response = responses[question.id];
      if (typeof response !== "number") return null;
      const normalizedValue = Math.min(5, Math.max(1, response));
      const weight = question.weight ?? 1;
      return { value: normalizedValue, weight };
    })
    .filter(Boolean) as { value: number; weight: number }[];

  if (!answered.length) {
    return 0;
  }

  const totalWeight = answered.reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight === 0) {
    return 0;
  }

  const weightedScore = answered.reduce(
    (total, entry) => total + entry.value * entry.weight,
    0,
  );

  const normalized = (weightedScore / (totalWeight * 5)) * 100;
  return Math.round(normalized);
}

function computeCategoryScores(responses: WellnessResponses) {
  const buckets: Record<string, { total: number; weight: number }> = {};

  wellnessSurveyQuestions.forEach((question) => {
    const response = responses[question.id];
    if (typeof response !== "number") {
      return;
    }

    const normalizedValue = Math.min(5, Math.max(1, response));
    const weight = question.weight ?? 1;
    const bucket = buckets[question.category] ?? { total: 0, weight: 0 };
    bucket.total += normalizedValue * weight;
    bucket.weight += weight;
    buckets[question.category] = bucket;
  });

  const categoryScores = {} as Record<WellnessCategory, number>;

  Object.entries(buckets).forEach(([categoryKey, bucket]) => {
    if (!bucket || bucket.weight === 0) {
      return;
    }
    const category = categoryKey as WellnessCategory;
    categoryScores[category] = Math.round((bucket.total / (bucket.weight * 5)) * 100);
  });

  return categoryScores;
}

function hydrateStoredState(): StoredSurveyState | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as StoredSurveyState;
  } catch {
    return null;
  }
}

export function WellnessSurveyProvider({ children }: { children: ReactNode }) {
  const storedState = hydrateStoredState();

  const [responses, setResponses] = useState<WellnessResponses>(
    () => storedState?.responses ?? {},
  );

  const [history, setHistory] = useState<WellnessHistoryEntry[]>(storedState?.history ?? []);

  const score = useMemo(() => computeScore(responses), [responses]);

  const categoryScores = useMemo(
    () => computeCategoryScores(responses),
    [responses],
  );

  useEffect(() => {
    setHistory((previous) => {
      if (previous[0]?.score === score) {
        return previous;
      }

      const next = [{ score, timestamp: Date.now() }, ...previous];
      return next.slice(0, 8);
    });
  }, [score]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: StoredSurveyState = { responses, history };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [responses, history]);

  const submitResponse = (questionId: string, value: number) => {
    setResponses((current) => {
      const clamped = Math.min(5, Math.max(1, value));
      if (current[questionId] === clamped) {
        return current;
      }

      return {
        ...current,
        [questionId]: clamped,
      };
    });
  };

  const change =
    history.length > 1 ? score - history[1].score : undefined;

  return (
    <WellnessSurveyContext.Provider
      value={{
        questions: wellnessSurveyQuestions,
        responses,
        submitResponse,
        score,
        history,
        change,
        lastUpdated: history[0]?.timestamp,
        categoryScores,
      }}
    >
      {children}
    </WellnessSurveyContext.Provider>
  );
}

export function useWellnessSurvey() {
  const context = useContext(WellnessSurveyContext);
  if (!context) {
    throw new Error("useWellnessSurvey must be used within a WellnessSurveyProvider");
  }
  return context;
}

export type WellnessCategory =
  | "Emotion"
  | "Focus"
  | "Sound"
  | "Balance"
  | "Mindfulness";

export interface WellnessSurveyQuestion {
  id: string;
  prompt: string;
  category: WellnessCategory;
  hint?: string;
  weight?: number;
}

export const wellnessSurveyQuestions: WellnessSurveyQuestion[] = [
  {
    id: "calm",
    prompt: "I felt calm and resilient, even when things felt hectic.",
    category: "Emotion",
    hint: "Self-check how stress leaked through the day.",
    weight: 1.4,
  },
  {
    id: "focus",
    prompt: "I could keep my attention steady when I needed to focus.",
    category: "Focus",
    hint: "Reflect on how distractions were managed.",
    weight: 1.1,
  },
  {
    id: "sound",
    prompt: "Sound, music, or nature helped me settle my nervous system.",
    category: "Sound",
    hint: "Think of cultural tracks, bells, or forest sounds.",
    weight: 0.9,
  },
  {
    id: "balance",
    prompt: "I could balance obligations, rest, and personal time.",
    category: "Balance",
    hint: "Consider work, studies, and family rhythms.",
    weight: 1.0,
  },
  {
    id: "mindfulness",
    prompt: "I completed at least one mindful practice today.",
    category: "Mindfulness",
    hint: "Breathing, body scans, or guided reflections count.",
    weight: 1.6,
  },
];

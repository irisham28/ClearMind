import { AppLayout } from "@/components/layout/AppLayout";
import {
  PracticeCard,
} from "@/components/mindfulness/PracticeCard";
import {
  PracticeDetailPanel,
  PracticeDetail,
} from "@/components/mindfulness/PracticeDetailPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Moon, Heart, Wind, Flower2, Star } from "lucide-react";
import { ReactNode, useState } from "react";

type PracticeGroupKey = "qigong" | "islamic" | "hindu" | "buddhist" | "secular";

interface MindfulnessPractice {
  icon: ReactNode;
  title: string;
  description: string;
  duration?: string;
  detail?: PracticeDetail;
}

const practices: Record<PracticeGroupKey, MindfulnessPractice[]> = {
  qigong: [
    {
      icon: <Wind className="w-5 h-5" />,
      title: "Qi Breathing Exercise",
      description: "Basic breathing technique to cultivate life energy",
      duration: "10 min",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Standing Meditation",
      description: "Zhan Zhuang practice for grounding and energy flow",
      duration: "15 min",
    },
    {
      icon: <Flower2 className="w-5 h-5" />,
      title: "Eight Brocades",
      description: "Traditional movement sequence for health",
      duration: "20 min",
    },
  ],
  islamic: [
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Pre-Prayer Meditation",
      description: "Centering practice aligned with Salah times",
      duration: "5 min",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Dhikr Practice",
      description: "Remembrance meditation for inner peace",
      duration: "10 min",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Tafakkur Reflection",
      description: "Contemplative meditation on creation",
      duration: "15 min",
    },
  ],
  hindu: [
    {
      icon: <Flower2 className="w-5 h-5" />,
      title: "Pranayama Basics",
      description: "Foundational breathing techniques",
      duration: "10 min",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Simple Yoga Sequence",
      description: "Gentle asanas for relaxation",
      duration: "20 min",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Mantra Meditation",
      description: "Sacred sound practice for focus",
      duration: "15 min",
    },
  ],
  buddhist: [
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Mindful Breathing",
      description: "Anapanasati meditation technique",
      duration: "10 min",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Loving Kindness",
      description: "Metta meditation for compassion",
      duration: "15 min",
    },
    {
      icon: <Wind className="w-5 h-5" />,
      title: "Body Scan",
      description: "Progressive awareness practice",
      duration: "20 min",
    },
  ],
  secular: [
    {
      icon: <Wind className="w-5 h-5" />,
      title: "Deep Breathing",
      description: "Science-based relaxation technique",
      duration: "5 min",
      detail: {
        highlight: "Science-backed relaxation",
        steps: [
          "Sit upright, rest hands softly on your thighs, and soften the jaw.",
          "Inhale through the nose for 4 counts, letting the breath fill the belly.",
          "Hold gently for 7 counts, then exhale slowly through pursed lips for 8 counts.",
          "Repeat 4–5 cycles, noticing how the body unwinds with each release.",
        ],
        cues: ["4-7-8 rhythm", "Listen to the belly rise"],
      },
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Focus Meditation",
      description: "Attention training for productivity",
      duration: "10 min",
      detail: {
        highlight: "Anchor practice for clarity",
        steps: [
          "Choose a steady anchor (breath, mantra, or a gentle tone).",
          "Set a timer for 10 minutes and rest the mind on that anchor.",
          "When distractions arrive, label them (e.g., 'thinking') and return supportively to the anchor.",
          "Cycle through five anchor returns so notice how the attention stays stronger each time.",
        ],
        cues: ["Anchor & return", "Label distractions gently"],
      },
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Stress Relief",
      description: "Progressive muscle relaxation",
      duration: "15 min",
      detail: {
        highlight: "Body scan + tension release",
        steps: [
          "Lie or sit comfortably, grounding through the feet and hands.",
          "Tense each muscle group for 4 counts, then release for 8 counts, moving from toes to face.",
          "Pay attention to how each release feels like a wave sweeping through the body.",
          "Finish with a full breath and absorb the spacious calm.",
        ],
        cues: ["Tense → release", "Scan toes to crown"],
      },
    },
  ],
};

const practiceDescriptions: Record<PracticeGroupKey, string> = {
  qigong: "气功 (Qigong) is an ancient Chinese practice combining breathing, movement, and meditation to cultivate vital life energy (气 Qi).",
  islamic: "Islamic meditation practices focus on remembrance (Dhikr) and contemplation (Tafakkur), aligned with daily prayer times.",
  hindu: "Hindu practices include Yoga and Pranayama (breath control), ancient sciences for physical and mental wellbeing.",
  buddhist: "Buddhist mindfulness emphasizes present-moment awareness and compassion through systematic meditation techniques.",
  secular: "Evidence-based mindfulness practices suitable for all backgrounds, focusing on stress reduction and mental clarity.",
};

export default function Mindfulness() {
  const [selectedPractice, setSelectedPractice] = useState<MindfulnessPractice>(
    practices.secular[0],
  );

  const practiceEntries = Object.entries(
    practices,
  ) as [PracticeGroupKey, MindfulnessPractice[]][];

  return (
    <AppLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-8 md:py-12">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Mindfulness Practices
          </h1>
          <p className="text-muted-foreground">
            Explore practices from diverse cultural and spiritual traditions
          </p>
        </div>
      </section>

      <div className="container py-8 space-y-8">
        <Tabs defaultValue="secular">
          <TabsList className="w-full max-w-xl grid grid-cols-5 mb-8">
            <TabsTrigger value="secular">Secular</TabsTrigger>
            <TabsTrigger value="qigong">Qigong</TabsTrigger>
            <TabsTrigger value="islamic">Islamic</TabsTrigger>
            <TabsTrigger value="hindu">Hindu</TabsTrigger>
            <TabsTrigger value="buddhist">Buddhist</TabsTrigger>
          </TabsList>

          {practiceEntries.map(([key, items]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              {/* Description Card */}
              <div className="feature-card max-w-2xl">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {practiceDescriptions[key]}
                </p>
              </div>
              
              {/* Practice Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((practice, index) => (
                  <PracticeCard
                    key={`${key}-${practice.title}-${index}`}
                    icon={practice.icon}
                    title={practice.title}
                    description={practice.description}
                    duration={practice.duration}
                    onClick={() => setSelectedPractice(practice)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <PracticeDetailPanel
          title={selectedPractice.title}
          description={selectedPractice.description}
          duration={selectedPractice.duration}
          detail={selectedPractice.detail}
        />
      </div>
    </AppLayout>
  );
}

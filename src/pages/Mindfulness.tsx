import { AppLayout } from "@/components/layout/AppLayout";
import {
  PracticeCard,
} from "@/components/mindfulness/PracticeCard";
import { GuidedSessionModal } from "@/components/mindfulness/GuidedSessionModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Moon, Heart, Wind, Flower2, Star } from "lucide-react";
import { ReactNode, useState } from "react";

type PracticeGroupKey = "qigong" | "islamic" | "hindu" | "buddhist" | "secular";

interface PracticeDetail {
  highlight: string;
  steps: string[];
  cues?: string[];
}

interface MindfulnessPractice {
  icon: ReactNode;
  title: string;
  description: string;
  duration?: string;
  detail?: PracticeDetail;
}

const practices: Record<PracticeGroupKey, MindfulnessPractice[]> = {
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
          "Cycle through five anchor returns to notice how the attention stays stronger each time.",
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
  qigong: [
    {
      icon: <Wind className="w-5 h-5" />,
      title: "Qi Breathing Exercise",
      description: "Basic breathing technique to cultivate life energy",
      duration: "10 min",
      detail: {
        highlight: "Cultivate vital Qi energy",
        steps: [
          "Stand with feet shoulder-width apart, knees slightly bent.",
          "Place hands on lower belly (dantian) and breathe naturally.",
          "Inhale, visualizing energy rising from earth through your feet.",
          "Exhale, feeling the Qi settle and warm your lower belly.",
        ],
        cues: ["Root to earth", "Warm the dantian"],
      },
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Standing Meditation",
      description: "Zhan Zhuang practice for grounding and energy flow",
      duration: "15 min",
      detail: {
        highlight: "Zhan Zhuang standing post",
        steps: [
          "Stand with feet parallel, arms hanging naturally.",
          "Raise arms as if embracing a large tree at chest height.",
          "Maintain soft knees, relaxed shoulders, and steady breathing.",
          "Hold the posture, feeling rooted below and expansive above.",
        ],
        cues: ["Embrace the tree", "Sink & rise"],
      },
    },
    {
      icon: <Flower2 className="w-5 h-5" />,
      title: "Eight Brocades",
      description: "Traditional movement sequence for health",
      duration: "20 min",
      detail: {
        highlight: "Ba Duan Jin movements",
        steps: [
          "Begin with 'Two Hands Hold Up the Heavens' - stretch arms overhead.",
          "Proceed through each brocade movement with slow, deliberate motion.",
          "Coordinate breath with each movement - inhale on opening, exhale on closing.",
          "Complete the sequence feeling energized and balanced.",
        ],
        cues: ["Flow like water", "Breathe with motion"],
      },
    },
  ],
  islamic: [
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Pre-Prayer Meditation",
      description: "Centering practice aligned with Salah times",
      duration: "5 min",
      detail: {
        highlight: "Khushu preparation",
        steps: [
          "Find a quiet space and sit in a comfortable position.",
          "Close your eyes and take three deep breaths to center yourself.",
          "Reflect on your intention (niyyah) for the upcoming prayer.",
          "Let go of worldly thoughts and prepare your heart for connection.",
        ],
        cues: ["Set intention", "Release worries"],
      },
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Dhikr Practice",
      description: "Remembrance meditation for inner peace",
      duration: "10 min",
      detail: {
        highlight: "Divine remembrance",
        steps: [
          "Sit comfortably and close your eyes gently.",
          "Begin with 'SubhanAllah' (Glory to God) - repeat 33 times.",
          "Continue with 'Alhamdulillah' (Praise to God) - repeat 33 times.",
          "Complete with 'Allahu Akbar' (God is Greatest) - repeat 33 times.",
        ],
        cues: ["33-33-33 cycle", "Heart presence"],
      },
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Tafakkur Reflection",
      description: "Contemplative meditation on creation",
      duration: "15 min",
      detail: {
        highlight: "Contemplation practice",
        steps: [
          "Choose an aspect of creation to contemplate (nature, sky, life).",
          "Observe with wonder and gratitude for 5 minutes.",
          "Reflect on the signs and wisdom in what you observe.",
          "Close with gratitude for the beauty and order of creation.",
        ],
        cues: ["Wonder & awe", "Signs in creation"],
      },
    },
  ],
  hindu: [
    {
      icon: <Flower2 className="w-5 h-5" />,
      title: "Pranayama Basics",
      description: "Foundational breathing techniques",
      duration: "10 min",
      detail: {
        highlight: "Breath control practice",
        steps: [
          "Sit in a comfortable position with spine straight.",
          "Practice Ujjayi breath - constrict the back of throat slightly while breathing.",
          "Try Nadi Shodhana - alternate nostril breathing for balance.",
          "Complete with natural breaths, feeling the prana (life force) flow.",
        ],
        cues: ["Ocean breath", "Balance the nadis"],
      },
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Simple Yoga Sequence",
      description: "Gentle asanas for relaxation",
      duration: "20 min",
      detail: {
        highlight: "Gentle asana flow",
        steps: [
          "Begin in Child's Pose (Balasana) - rest forehead on mat.",
          "Move to Cat-Cow stretches - arch and round the spine.",
          "Hold Downward Dog for 5 breaths, then step forward.",
          "End in Savasana - lie flat and release all tension.",
        ],
        cues: ["Breath guides movement", "Release in Savasana"],
      },
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Mantra Meditation",
      description: "Sacred sound practice for focus",
      duration: "15 min",
      detail: {
        highlight: "Japa meditation",
        steps: [
          "Choose a mantra (Om, So Hum, or a personal mantra).",
          "Sit quietly and begin repeating the mantra silently.",
          "Use mala beads if available - one bead per repetition.",
          "Let the mantra become effortless, merging with your awareness.",
        ],
        cues: ["108 repetitions", "Sound becomes silence"],
      },
    },
  ],
  buddhist: [
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Mindful Breathing",
      description: "Anapanasati meditation technique",
      duration: "10 min",
      detail: {
        highlight: "Breath awareness practice",
        steps: [
          "Sit comfortably and gently close your eyes.",
          "Notice the natural rhythm of your breath without changing it.",
          "Observe where you feel the breath most clearly (nose, chest, belly).",
          "When the mind wanders, gently return to the breath sensation.",
        ],
        cues: ["Just this breath", "Begin again"],
      },
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Loving Kindness",
      description: "Metta meditation for compassion",
      duration: "15 min",
      detail: {
        highlight: "Metta bhavana",
        steps: [
          "Begin by directing loving kindness to yourself: 'May I be happy, may I be peaceful.'",
          "Extend to a loved one: 'May you be happy, may you be peaceful.'",
          "Extend to a neutral person, then to a difficult person.",
          "Finally, extend to all beings everywhere without exception.",
        ],
        cues: ["Start with self", "Expand outward"],
      },
    },
    {
      icon: <Wind className="w-5 h-5" />,
      title: "Body Scan",
      description: "Progressive awareness practice",
      duration: "20 min",
      detail: {
        highlight: "Systematic body awareness",
        steps: [
          "Lie down and bring attention to the top of your head.",
          "Slowly scan down through face, neck, shoulders, arms.",
          "Continue through torso, hips, legs, down to the toes.",
          "Notice sensations without judgment - warmth, tingling, tension, ease.",
        ],
        cues: ["Observe, don't change", "Sensation by sensation"],
      },
    },
  ],
};

const practiceDescriptions: Record<PracticeGroupKey, string> = {
  secular: "Evidence-based mindfulness practices suitable for all backgrounds, focusing on stress reduction and mental clarity.",
  qigong: "气功 (Qigong) is an ancient Chinese practice combining breathing, movement, and meditation to cultivate vital life energy (气 Qi).",
  islamic: "Islamic meditation practices focus on remembrance (Dhikr) and contemplation (Tafakkur), aligned with daily prayer times.",
  hindu: "Hindu practices include Yoga and Pranayama (breath control), ancient sciences for physical and mental wellbeing.",
  buddhist: "Buddhist mindfulness emphasizes present-moment awareness and compassion through systematic meditation techniques.",
};

export default function Mindfulness() {
  const [selectedPractice, setSelectedPractice] = useState<MindfulnessPractice | null>(null);
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  const handleStartSession = (practice: MindfulnessPractice) => {
    setSelectedPractice(practice);
    setIsSessionOpen(true);
  };

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
                    onClick={() => handleStartSession(practice)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Guided Session Modal */}
      {selectedPractice && (
        <GuidedSessionModal
          isOpen={isSessionOpen}
          onClose={() => setIsSessionOpen(false)}
          title={selectedPractice.title}
          description={selectedPractice.description}
          duration={selectedPractice.duration || "5 min"}
          steps={selectedPractice.detail?.steps}
          cues={selectedPractice.detail?.cues}
        />
      )}
    </AppLayout>
  );
}

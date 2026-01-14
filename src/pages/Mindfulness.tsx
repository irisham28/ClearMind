import { AppLayout } from "@/components/layout/AppLayout";
import { PracticeCard } from "@/components/mindfulness/PracticeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Moon, Heart, Wind, Flower2, Star } from "lucide-react";

const practices = {
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
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Focus Meditation",
      description: "Attention training for productivity",
      duration: "10 min",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Stress Relief",
      description: "Progressive muscle relaxation",
      duration: "15 min",
    },
  ],
};

const practiceDescriptions: Record<string, string> = {
  qigong: "气功 (Qigong) is an ancient Chinese practice combining breathing, movement, and meditation to cultivate vital life energy (气 Qi).",
  islamic: "Islamic meditation practices focus on remembrance (Dhikr) and contemplation (Tafakkur), aligned with daily prayer times.",
  hindu: "Hindu practices include Yoga and Pranayama (breath control), ancient sciences for physical and mental wellbeing.",
  buddhist: "Buddhist mindfulness emphasizes present-moment awareness and compassion through systematic meditation techniques.",
  secular: "Evidence-based mindfulness practices suitable for all backgrounds, focusing on stress reduction and mental clarity.",
};

export default function Mindfulness() {
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

      <div className="container py-8">
        <Tabs defaultValue="secular">
          <TabsList className="w-full max-w-xl grid grid-cols-5 mb-8">
            <TabsTrigger value="secular">Secular</TabsTrigger>
            <TabsTrigger value="qigong">Qigong</TabsTrigger>
            <TabsTrigger value="islamic">Islamic</TabsTrigger>
            <TabsTrigger value="hindu">Hindu</TabsTrigger>
            <TabsTrigger value="buddhist">Buddhist</TabsTrigger>
          </TabsList>

          {Object.entries(practices).map(([key, items]) => (
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
                    key={index}
                    icon={practice.icon}
                    title={practice.title}
                    description={practice.description}
                    duration={practice.duration}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}

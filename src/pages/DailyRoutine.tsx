import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Moon, 
  Heart, 
  Target, 
  Info,
  Sparkles
} from "lucide-react";

interface RoutineCardProps {
  emoji: string;
  title: string;
  description: string;
  duration: string;
  tags: { label: string; variant: "default" | "secondary" | "outline" }[];
  buttonLabel: string;
  buttonIcon: React.ReactNode;
  accentColor: string;
}

function RoutineCard({ 
  emoji, 
  title, 
  description, 
  duration, 
  tags, 
  buttonLabel, 
  buttonIcon,
  accentColor 
}: RoutineCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 hover:border-border transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <h3 className={`text-lg font-semibold ${accentColor}`}>{title}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {duration}
            </Badge>
            {tags.map((tag, index) => (
              <Badge key={index} variant={tag.variant} className="text-xs">
                {tag.label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="hidden sm:block text-4xl opacity-50">
          {emoji}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          className={`gap-2 ${accentColor} border-current hover:bg-current/10`}
        >
          {buttonIcon}
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

const routines: RoutineCardProps[] = [
  {
    emoji: "🌅",
    title: "Morning Meditation",
    description: "Start your day with mindfulness and intention. Perfect for setting a positive tone for the day ahead.",
    duration: "5-10 minutes",
    tags: [
      { label: "Beginner friendly", variant: "secondary" },
      { label: "Daily practice", variant: "default" },
    ],
    buttonLabel: "Start Morning Routine",
    buttonIcon: <Sun className="w-4 h-4" />,
    accentColor: "text-amber-600 dark:text-amber-500",
  },
  {
    emoji: "🌙",
    title: "Evening Reflection",
    description: "Wind down and reflect on your day. Helps you process experiences and prepare for restful sleep.",
    duration: "10-15 minutes",
    tags: [
      { label: "Stress relief", variant: "secondary" },
      { label: "Sleep preparation", variant: "default" },
    ],
    buttonLabel: "Start Evening Routine",
    buttonIcon: <Moon className="w-4 h-4" />,
    accentColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    emoji: "🧘",
    title: "Stress Relief",
    description: "Quick meditation for stress management. Perfect for busy moments when you need to reset.",
    duration: "5-8 minutes",
    tags: [
      { label: "Quick reset", variant: "secondary" },
      { label: "Anytime use", variant: "default" },
    ],
    buttonLabel: "Start Stress Relief",
    buttonIcon: <Heart className="w-4 h-4" />,
    accentColor: "text-rose-600 dark:text-rose-400",
  },
  {
    emoji: "🎯",
    title: "Focus & Concentration",
    description: "Enhance your focus and productivity with targeted mindfulness exercises.",
    duration: "10-12 minutes",
    tags: [
      { label: "Productivity", variant: "secondary" },
      { label: "Work-friendly", variant: "default" },
    ],
    buttonLabel: "Explore Focus Content",
    buttonIcon: <Target className="w-4 h-4" />,
    accentColor: "text-teal-600 dark:text-teal-400",
  },
  {
    emoji: "✨",
    title: "Gratitude Practice",
    description: "Cultivate appreciation and positive thinking through guided gratitude exercises.",
    duration: "5-7 minutes",
    tags: [
      { label: "Mood boost", variant: "secondary" },
      { label: "Daily habit", variant: "default" },
    ],
    buttonLabel: "Practice Gratitude",
    buttonIcon: <Sparkles className="w-4 h-4" />,
    accentColor: "text-purple-600 dark:text-purple-400",
  },
];

export default function DailyRoutine() {
  return (
    <AppLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-8 md:py-12">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
            Daily Routine
          </h1>
          <p className="text-muted-foreground text-center max-w-xl mx-auto">
            Build consistent mindfulness habits with guided daily practices
          </p>
        </div>
      </section>

      <div className="container py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-primary/10 rounded-xl p-4 flex items-start gap-3 border border-primary/20">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground text-sm">Build Your Daily Practice</h4>
            <p className="text-sm text-muted-foreground">
              Choose a routine that fits your schedule. Each routine includes guided meditations to help you develop consistent mindfulness practices.
            </p>
          </div>
        </div>

        {/* Routine Cards */}
        <div className="space-y-4">
          {routines.map((routine, index) => (
            <RoutineCard key={index} {...routine} />
          ))}
        </div>

        {/* Context Integration Section */}
        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Singapore Context Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-5 border border-border/50">
              <h3 className="font-medium text-foreground mb-2">📚 Academic Stress Management</h3>
              <p className="text-sm text-muted-foreground">
                Resources specifically designed for Singapore's education system, including exam preparation mindfulness and study breaks.
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border/50">
              <h3 className="font-medium text-foreground mb-2">👨‍👩‍👧‍👦 Intergenerational Harmony</h3>
              <p className="text-sm text-muted-foreground">
                Techniques for navigating family dynamics and bridging cultural gaps between generations.
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border/50">
              <h3 className="font-medium text-foreground mb-2">🏙️ City Living Balance</h3>
              <p className="text-sm text-muted-foreground">
                Coping strategies for maintaining calm in Singapore's fast-paced urban environment.
              </p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border/50">
              <h3 className="font-medium text-foreground mb-2">⚖️ Work-Life Harmony</h3>
              <p className="text-sm text-muted-foreground">
                Tips and practices for balancing career demands with personal wellbeing and family time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

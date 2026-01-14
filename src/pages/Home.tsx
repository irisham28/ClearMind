import { AppLayout } from "@/components/layout/AppLayout";
import { WellnessScore } from "@/components/home/WellnessScore";
import { WellnessSurveyForm } from "@/components/home/WellnessSurveyForm";
import { WellnessProgress } from "@/components/home/WellnessProgress";
import { QuickActionCard } from "@/components/home/QuickActionCard";
import { SoundCategoryCard } from "@/components/sounds/SoundCategoryCard";
import { useWellnessSurvey } from "@/contexts/WellnessSurveyContext";
import { Music, Sparkles, BookOpen, Wind, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { score, change, history, categoryScores } = useWellnessSurvey();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const lastUpdatedLabel = history[0]?.timestamp
    ? new Date(history[0].timestamp).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : undefined;

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {greeting()}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Find your calm through culturally-informed wellness practices designed for Singapore.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12 space-y-12">
        <section className="space-y-6">
          <div className="max-w-md">
            <WellnessScore score={score} change={change} lastUpdated={lastUpdatedLabel} />
          </div>
          <WellnessProgress
            score={score}
            change={change}
            history={history}
            categoryScores={categoryScores}
          />
          <WellnessSurveyForm />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <QuickActionCard
              icon={<Wind className="w-5 h-5" />}
              title="Breathe"
              description="5 min breathing exercise"
              variant="primary"
              onClick={() => navigate("/mindfulness")}
            />
            <QuickActionCard
              icon={<Music className="w-5 h-5" />}
              title="Calm Sounds"
              description="Relaxing cultural audio"
              onClick={() => navigate("/sounds")}
            />
            <QuickActionCard
              icon={<Sparkles className="w-5 h-5" />}
              title="Meditate"
              description="Guided meditation session"
              onClick={() => navigate("/mindfulness")}
            />
            <QuickActionCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Resources"
              description="Coping strategies & tips"
              onClick={() => navigate("/resources")}
            />
            <QuickActionCard
              icon={<Calendar className="w-5 h-5" />}
              title="Daily Routine"
              description="Build mindfulness habits"
              onClick={() => navigate("/daily-routine")}
            />
          </div>
        </section>

        {/* Sound Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Cultural Sounds</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SoundCategoryCard
              title="Chinese"
              subtitle="Guqin & Singing Bowls"
              category="chinese"
              trackCount={12}
              onClick={() => navigate("/sounds?category=chinese")}
            />
            <SoundCategoryCard
              title="Indian"
              subtitle="Mantras & Classical Ragas"
              category="indian"
              trackCount={15}
              onClick={() => navigate("/sounds?category=indian")}
            />
            <SoundCategoryCard
              title="Malay"
              subtitle="Gamelan-Inspired"
              category="malay"
              trackCount={8}
              onClick={() => navigate("/sounds?category=malay")}
            />
            <SoundCategoryCard
              title="Nature"
              subtitle="Singapore Parks & Gardens"
              category="nature"
              trackCount={20}
              onClick={() => navigate("/sounds?category=nature")}
            />
          </div>
        </section>

        {/* Daily Tip */}
        <section>
          <div className="feature-card bg-secondary/30 max-w-3xl">
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
              Daily Insight
            </p>
            <p className="text-base text-foreground leading-relaxed">
              Taking short breaks throughout your workday can significantly improve focus and reduce stress. Try the Pomodoro technique: 25 minutes of work followed by a 5-minute mindful break.
            </p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

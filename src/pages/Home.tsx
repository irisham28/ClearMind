import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { WellnessScore } from "@/components/home/WellnessScore";
import { WellnessSurveyForm } from "@/components/home/WellnessSurveyForm";
import { WellnessProgress } from "@/components/home/WellnessProgress";
import { QuickActionCard } from "@/components/home/QuickActionCard";
import { SoundCategoryCard } from "@/components/sounds/SoundCategoryCard";
import { useWellnessSurvey } from "@/contexts/WellnessSurveyContext";
import { CheckinSync } from "@/components/home/CheckinSync";
import { Music, Sparkles, BookOpen, Wind, Calendar, Bookmark, Globe, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WellnessCategory } from "@/data/wellnessQuestions";

interface FavoriteJourney {
  title: string;
  description: string;
  tag: string;
  duration: string;
  route: string;
  emoji: string;
}

interface CulturalPractice {
  title: string;
  tag: string;
  description: string;
  detail: string;
  duration: string;
  gradient: string;
  route: string;
  cta: string;
}

interface LanguageOption {
  label: string;
  description: string;
  note: string;
}

interface ArticleHighlight {
  title: string;
  description: string;
  tag: string;
  route: string;
}

const favorites: FavoriteJourney[] = [
  {
    title: "Lotus Sunrise Flow",
    description: "Sunrise-inspired yoga with gentle transitions and anchored breath cues.",
    tag: "Yoga",
    duration: "12 min",
    route: "/mindfulness",
    emoji: "🌅",
  },
  {
    title: "Pranayama Breeze",
    description: "Alternate nostril breathing paired with soft bell cues to steady the nervous system.",
    tag: "Pranayama",
    duration: "8 min",
    route: "/mindfulness",
    emoji: "🌬️",
  },
  {
    title: "Temple Gong Bath",
    description: "Deep gongs tuned to the pentatonic scale for a grounding reset.",
    tag: "Gongs",
    duration: "10 min",
    route: "/sounds",
    emoji: "🔔",
  },
];

const culturalPractices: CulturalPractice[] = [
  {
    title: "Sapphire Lotus Flow",
    tag: "Yoga",
    description: "Soft hatha transitions that open the hip line and invite steady, mindful breathing.",
    detail: "Bridge, warrior II, and savasana with careful breath cues.",
    duration: "12 min",
    gradient: "linear-gradient(135deg, rgba(199,178,255,0.92), rgba(255,216,194,0.85))",
    route: "/mindfulness",
    cta: "Begin yoga",
  },
  {
    title: "Pranayama Tide",
    tag: "Pranayama",
    description: "Guided ujjayi, box, and alternate nostril sequences that calm the mind and body.",
    detail: "Balance ida & pingala with gentle gong pulses.",
    duration: "9 min",
    gradient: "linear-gradient(135deg, rgba(255,216,194,0.9), rgba(90,134,173,0.6))",
    route: "/mindfulness",
    cta: "Practice breath",
  },
  {
    title: "Temple Gong Bath",
    tag: "Gongs & Sound",
    description: "Layered gongs and sacred bells that help the nervous system surrender to resonance.",
    detail: "Let the overtones linger between each exhale.",
    duration: "11 min",
    gradient: "linear-gradient(135deg, rgba(29,35,63,0.95), rgba(90,134,173,0.7))",
    route: "/sounds",
    cta: "Play gongs",
  },
  {
    title: "Qi Ribbon Sequence",
    tag: "Chinese & Qi Gong",
    description: "Ba Duan Jin reminders with attentive breathing between each stance to circulate Qi.",
    detail: "Align crown, chest, and dantian in every posture.",
    duration: "14 min",
    gradient: "linear-gradient(135deg, rgba(90,134,173,0.9), rgba(199,178,255,0.6))",
    route: "/mindfulness",
    cta: "Follow Qi",
  },
];

const languageOptions: LanguageOption[] = [
  {
    label: "English",
    description: "Full guided script, captions, and cues in warm neutral tones.",
    note: "Primary narration",
  },
  {
    label: "中文 (Mandarin)",
    description: "Simplified characters, pinyin prompts, and Traditional Chinese instrumentation notes.",
    note: "Standard Chinese",
  },
  {
    label: "Bahasa Melayu",
    description: "Localized narration, community expressions, and friendly pacing.",
    note: "Malay support",
  },
  {
    label: "தமிழ் (Tamil)",
    description: "Sacred chants, mantras, and translated breath-work reminders.",
    note: "Tamil stories",
  },
];

const articleHighlights: ArticleHighlight[] = [
  {
    title: "Balancing Family Harmonics",
    description: "Stories on bridging expectations across generations without losing yourself.",
    tag: "Article",
    route: "/resources",
  },
  {
    title: "Sound Journeys for Focus",
    description: "Guqin, gongs, and breathing patterns that sharpen attention without overstimulating.",
    tag: "Guide",
    route: "/resources",
  },
  {
    title: "Language of Calm",
    description: "How switching narration languages makes guidance feel personal and comforting.",
    tag: "Article",
    route: "/resources",
  },
];

const planSuggestions: Record<WellnessCategory, { title: string; detail: string }> = {
  Emotion: {
    title: "Gong & breath resets",
    detail: "Pair deep gongs with slow, wide exhales to soften emotion and invite calm.",
  },
  Focus: {
    title: "Yoga micro flow",
    detail: "A short lotus-inspired sequence to re-center attention before the next task.",
  },
  Sound: {
    title: "Cultural soundscapes",
    detail: "Cue guqin, gongs, and local nature textures to ground the nervous system.",
  },
  Balance: {
    title: "Pranayama balance",
    detail: "Alternate nostril and sama vritti breathing steadies energy across the day.",
  },
  Mindfulness: {
    title: "Reflective pause",
    detail: "Capture one win, breathe for four counts, and set a gentle intention for the hour.",
  },
};

const categoryOrder: WellnessCategory[] = ["Mindfulness", "Emotion", "Focus", "Sound", "Balance"];

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

  const planTargets = useMemo(
    () =>
      categoryOrder
        .map((category) => ({
          category,
          score: categoryScores[category] ?? 0,
          suggestion: planSuggestions[category],
        }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 3),
    [categoryScores],
  );

  return (
    <AppLayout>
      <CheckinSync />
      <section className="bg-gradient-to-b from-secondary/60 via-secondary/30 to-background py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Cultural calm
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              {greeting()}, welcome back to ClearMind. Yoga, pranayama, gongs, and Traditional Chinese rituals are ready in the language that feels closest to home.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Favorites stay pinned, articles stay handy, and every practice blends respectfully with your story. Let the app script a gentle plan inspired by your latest check-in.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-10 md:py-12 space-y-12">
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

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                Personalized plan
              </p>
              <h2 className="text-2xl font-semibold text-foreground">Your focus for today</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/daily-routine")}>Refine plan</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {planTargets.map((target) => (
              <div
                key={target.category}
                className="rounded-2xl border border-border/70 bg-surface-elevated p-4 space-y-3"
              >
                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{target.category}</span>
                  <span>{target.score}%</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {target.suggestion.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {target.suggestion.detail}
                </p>
                <div className="h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${target.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5" />
                Favorites
              </p>
              <h2 className="text-2xl font-semibold text-foreground">Pinned journeys & rituals</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/sounds")}>View sounds</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {favorites.map((favorite) => (
              <button
                type="button"
                key={favorite.title}
                onClick={() => navigate(favorite.route)}
                className="feature-card text-left space-y-4 border border-border/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{favorite.emoji}</span>
                    <h3 className="text-lg font-semibold text-foreground">{favorite.title}</h3>
                  </div>
                  <Badge variant="outline">{favorite.duration}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{favorite.description}</p>
                <span className="text-xs uppercase tracking-[0.3em] text-secondary-foreground">
                  {favorite.tag}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Cultural features</p>
            <h2 className="text-3xl font-semibold text-foreground">Yoga, pranayama, gongs, and Qi-specific rituals</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {culturalPractices.map((practice) => (
              <div
                key={practice.title}
                className="rounded-[26px] border border-white/10 p-6 text-white shadow-2xl"
                style={{ backgroundImage: practice.gradient }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/80">{practice.tag}</p>
                <h3 className="mt-3 text-2xl font-semibold">{practice.title}</h3>
                <p className="mt-2 text-sm text-white/90">{practice.description}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/80">{practice.detail}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span>{practice.duration}</span>
                  <button
                    type="button"
                    onClick={() => navigate(practice.route)}
                    className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    {practice.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                Languages adaptation
              </p>
              <h2 className="text-2xl font-semibold text-foreground">Switch with warmth</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/resources")}>View resource languages</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {languageOptions.map((language) => (
              <div
                key={language.label}
                className="rounded-2xl border border-border/60 bg-card/80 p-4 space-y-2"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground">
                  {language.note}
                </p>
                <h3 className="text-lg font-semibold text-foreground">{language.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{language.description}</p>
              </div>
            ))}
          </div>
        </section>

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
              subtitle="Parks & Gardens"
              category="nature"
              trackCount={20}
              onClick={() => navigate("/sounds?category=nature")}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Articles and everything</p>
              <h2 className="text-2xl font-semibold text-foreground">Context, stories, and guidance</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/resources")}>See all articles</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {articleHighlights.map((article) => (
              <button
                key={article.title}
                type="button"
                onClick={() => navigate(article.route)}
                className="feature-card text-left space-y-3 border border-border/60"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                  <Badge variant="outline" className="text-[0.55rem] uppercase tracking-[0.35em]">
                    {article.tag}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{article.description}</p>
                <span className="text-xs font-semibold text-primary">Read story →</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-border/80 bg-gradient-to-r from-secondary/50 via-secondary/70 to-accent/40 p-6">
          <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/80">About the app</p>
              <h2 className="text-3xl font-semibold text-white mt-2">ClearMind curates culturally grounded calm.</h2>
              <p className="mt-3 text-sm text-white/90 leading-relaxed">
                We keep your favorites, translate the experience, and stitch textile-inspired rituals into guided plans that respect Singapore's rich cultural map.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-start md:justify-end">
              <button
                type="button"
                onClick={() => navigate("/about")}
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Meet the app
              </button>
              <button
                type="button"
                onClick={() => navigate("/resources")}
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Read about culture
              </button>
            </div>
          </div>
        </section>

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

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { SoundCategoryCard } from "@/components/sounds/SoundCategoryCard";
import { SoundTrackCard } from "@/components/sounds/SoundTrackCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudio } from "@/contexts/AudioContext";
import { useYoutubeSearch } from "@/hooks/useYoutubeSearch";

type SoundCategory = "chinese" | "indian" | "malay" | "nature";

interface SoundTrack {
  id: number;
  title: string;
  duration: string;
  keywords: string;
}

interface SoundTrackWithCategory extends SoundTrack {
  category: SoundCategory;
}

const categoryDescriptions: Record<SoundCategory, string> = {
  chinese: "Chinese guqin strings, singing bowls, and temples",
  indian: "Indian mantras, ragas, sacred chants, and tablas",
  malay: "Malay gamelan drums, kampung lullabies, and calm coastal sounds",
  nature: "Botanic gardens, rain, mangroves, and Singapore shores",
};

const soundTracks: Record<SoundCategory, SoundTrack[]> = {
  chinese: [
    { id: 1, title: "Guqin Meditation", duration: "10:24", keywords: "guqin meditation calm chinese strings" },
    { id: 2, title: "Singing Bowl Resonance", duration: "15:00", keywords: "singing bowl tibetan bell resonance meditation" },
    { id: 3, title: "Temple Bell Harmony", duration: "8:30", keywords: "temple bell harmony sacred gong echo" },
    { id: 4, title: "Bamboo Flute Peace", duration: "12:15", keywords: "bamboo flute serenity forest breeze" },
    { id: 5, title: "Zen Garden Ambience", duration: "20:00", keywords: "zen garden ambience water trickle calm" },
  ],
  indian: [
    { id: 6, title: "Om Shanti Mantra", duration: "15:00", keywords: "om shanti mantra chant sanskrit calm" },
    { id: 7, title: "Morning Raga", duration: "18:30", keywords: "morning raga sitar sunrise meditation" },
    { id: 8, title: "Sitar Serenity", duration: "12:00", keywords: "sitar serenity classical indian strings" },
    { id: 9, title: "Tabla Meditation", duration: "10:45", keywords: "tabla meditation rhythm heartbeat" },
    { id: 10, title: "Vedic Chanting", duration: "20:00", keywords: "vedic chanting mantra sacred vedic" },
  ],
  malay: [
    { id: 11, title: "Gamelan Dreams", duration: "14:20", keywords: "gamelan dreams calm percussion malay" },
    { id: 12, title: "Coastal Serenity", duration: "16:00", keywords: "coastal serenity waves melayu seaside" },
    { id: 13, title: "Traditional Lullaby", duration: "8:00", keywords: "traditional lullaby gentle vocals kampung" },
    { id: 14, title: "Kampung Evening", duration: "12:30", keywords: "kampung evening village guitars breeze" },
  ],
  nature: [
    { id: 15, title: "Botanic Gardens Morning", duration: "25:00", keywords: "botanic gardens morning birds chirping" },
    { id: 16, title: "MacRitchie Reservoir", duration: "30:00", keywords: "macritchie reservoir rain reflections calm" },
    { id: 17, title: "East Coast Park Waves", duration: "20:00", keywords: "east coast park waves sea breeze" },
    { id: 18, title: "Sungei Buloh Birds", duration: "22:00", keywords: "sungei buloh birds mangrove chirps" },
    { id: 19, title: "Rain on Leaves", duration: "45:00", keywords: "rain on leaves forest shower soothing" },
    { id: 20, title: "Gardens by the Bay", duration: "18:00", keywords: "gardens by the bay light show ambience" },
  ],
};

const categoryCards: Array<{ title: string; subtitle: string; category: SoundCategory }> = [
  { title: "Chinese", subtitle: "Guqin & Bowls", category: "chinese" },
  { title: "Indian", subtitle: "Mantras & Ragas", category: "indian" },
  { title: "Malay", subtitle: "Gamelan", category: "malay" },
  { title: "Nature", subtitle: "Parks & Gardens", category: "nature" },
];

const categoryOrder: SoundCategory[] = ["chinese", "indian", "malay", "nature"];

const recentTrackHighlights: Array<{ category: SoundCategory; trackId: number }> = [
  { category: "indian", trackId: 7 },
  { category: "nature", trackId: 15 },
];

function getTrackById(category: SoundCategory, id: number) {
  return soundTracks[category].find((track) => track.id === id);
}

export default function Sounds() {
  const [activeTab, setActiveTab] = useState<"all" | SoundCategory>("all");
  const [selectedTrack, setSelectedTrack] = useState<SoundTrackWithCategory | null>(null);
  const [selectedYoutubeVideoId, setSelectedYoutubeVideoId] = useState<string | undefined>();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const youtubeApiKeyAvailable = Boolean(import.meta.env.VITE_YOUTUBE_API_KEY);
  const isNatureTrack = selectedTrack?.category === "nature";

  const youtubeQuery = useMemo(() => {
    if (!selectedTrack) return "";
    if (selectedTrack.category === "nature") return "";
    const baseTerms = [
      selectedTrack.title,
      selectedTrack.keywords,
      categoryDescriptions[selectedTrack.category],
      "calm music",
    ];
    return baseTerms.filter(Boolean).join(" ");
  }, [selectedTrack]);

  const trimmedYoutubeQuery = youtubeQuery.trim();
  const {
    data: youtubeVideos,
    isLoading: isYoutubeLoading,
    error: youtubeError,
  } = useYoutubeSearch(trimmedYoutubeQuery, 5);

  useEffect(() => {
    if (isNatureTrack || !trimmedYoutubeQuery) {
      setSelectedYoutubeVideoId(undefined);
      return;
    }

    if (!youtubeVideos?.length) {
      setSelectedYoutubeVideoId(undefined);
      return;
    }

    setSelectedYoutubeVideoId((current) =>
      current && youtubeVideos.some((video) => video.id === current)
        ? current
        : youtubeVideos[0].id
    );
  }, [trimmedYoutubeQuery, youtubeVideos, isNatureTrack]);

  const currentYoutubeVideo = youtubeVideos?.find((video) => video.id === selectedYoutubeVideoId);
  const youtubeErrorMessage =
    youtubeError instanceof Error ? youtubeError.message : undefined;

  const handlePlayPause = (track: SoundTrack, category: SoundCategory) => {
    const trackPayload = {
      id: track.id,
      title: track.title,
      duration: track.duration,
      category,
    };
    setSelectedTrack({ ...track, category });

    if (currentTrack?.id === trackPayload.id && isPlaying) {
      pauseTrack();
    } else {
      playTrack(trackPayload);
    }
  };

  return (
    <AppLayout>
      <PageTransition>
        <section className="bg-gradient-to-b from-secondary/50 to-background py-8 md:py-12">
          <div className="container">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Sound Library
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Culturally curated sounds for relaxation and meditation
            </motion.p>
          </div>
        </section>

        <div className="container py-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | SoundCategory)}>
            <TabsList className="w-full max-w-xl grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="chinese">中文</TabsTrigger>
              <TabsTrigger value="indian">भारत</TabsTrigger>
              <TabsTrigger value="malay">Melayu</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {categoryCards.map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SoundCategoryCard
                      title={cat.title}
                      subtitle={cat.subtitle}
                      category={cat.category}
                      trackCount={soundTracks[cat.category].length}
                      onClick={() => setActiveTab(cat.category)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {recentTrackHighlights.map((highlight) => {
                    const track = getTrackById(highlight.category, highlight.trackId);
                    if (!track) return null;
                    return (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={track.id}>
                        <SoundTrackCard
                          title={track.title}
                          category={highlight.category}
                          isPlaying={currentTrack?.id === track.id && isPlaying}
                          onPlayPause={() => handlePlayPause(track, highlight.category)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            </TabsContent>

            {categoryOrder.map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {soundTracks[category].map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SoundTrackCard
                        title={track.title}
                        category={category}
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onPlayPause={() => handlePlayPause(track, category)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {selectedTrack && (
            <section className="mt-10 space-y-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Calm {selectedTrack.category} soundscape
                  </p>
                  <p className="text-lg font-semibold text-foreground">{selectedTrack.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {selectedTrack.category} • {selectedTrack.duration}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {youtubeApiKeyAvailable
                    ? "YouTube API delivers curated calm music."
                    : "Set VITE_YOUTUBE_API_KEY to enable YouTube previews."}
                </p>
              </div>

              {!isNatureTrack ? (
                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                  <div className="rounded-2xl border border-border bg-muted/60 overflow-hidden">
                    {selectedYoutubeVideoId ? (
                      <iframe
                        width="100%"
                        height="320"
                        src={`https://www.youtube.com/embed/${selectedYoutubeVideoId}?rel=0`}
                        title={currentYoutubeVideo?.title || selectedTrack.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="flex h-72 flex-col items-center justify-center gap-3 bg-secondary/30 p-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          {isYoutubeLoading
                            ? "Searching calm YouTube tracks…"
                            : youtubeErrorMessage
                              ? "Unable to fetch videos right now."
                              : "Results will appear here once YouTube search is ready."}
                        </p>
                        {!youtubeApiKeyAvailable && (
                          <p className="text-xs text-muted-foreground">
                            A YouTube API key is required to fetch live results.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-secondary/30 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          YouTube recommendations
                        </p>
                        {isYoutubeLoading && (
                          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            Searching...
                          </span>
                        )}
                      </div>

                      {youtubeErrorMessage && (
                        <p className="text-xs text-destructive">Unable to fetch videos: {youtubeErrorMessage}</p>
                      )}

                      <div className="grid gap-2">
                        {youtubeVideos?.map((result) => (
                          <button
                            key={result.id}
                            type="button"
                            onClick={() => setSelectedYoutubeVideoId(result.id)}
                            className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                              selectedYoutubeVideoId === result.id
                                ? "border-primary bg-primary/10 shadow-sm"
                                : "border-border hover:border-foreground/40"
                            }`}
                          >
                            <img
                              className="h-16 w-28 shrink-0 rounded-md object-cover"
                              src={result.thumbnailUrl}
                              alt={result.title}
                              loading="lazy"
                            />
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium text-foreground line-clamp-2">
                                {result.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{result.channelTitle}</p>
                            </div>
                          </button>
                        ))}

                        {!isYoutubeLoading && !youtubeVideos?.length && (
                          <p className="text-xs text-muted-foreground">
                            No recommendations available right now. Try again shortly.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-primary/10 p-4 text-xs text-foreground">
                      <p className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                        Search query
                      </p>
                      <p>{trimmedYoutubeQuery || "Calm music keywords pending."}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-muted/60 p-6 space-y-2 text-center">
                  <p className="text-foreground font-medium">
                    Nature tracks stream the curated audio files stored directly in the app.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tab “Play” to hear the Botanic Gardens, MacRitchie, East Coast Park, Sungei Buloh, Rain on Leaves, or Gardens by the Bay ambience without YouTube.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Audio sourced from the `/audio` folder for a low-latency nature experience.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </PageTransition>
    </AppLayout>
  );
}

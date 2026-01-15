import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { SoundCategoryCard } from "@/components/sounds/SoundCategoryCard";
import { SoundTrackCard } from "@/components/sounds/SoundTrackCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAudio } from "@/contexts/AudioContext";

const soundTracks = {
  chinese: [
    { id: 1, title: "Guqin Meditation", duration: "10:24" },
    { id: 2, title: "Singing Bowl Resonance", duration: "15:00" },
    { id: 3, title: "Temple Bell Harmony", duration: "8:30" },
    { id: 4, title: "Bamboo Flute Peace", duration: "12:15" },
    { id: 5, title: "Zen Garden Ambience", duration: "20:00" },
  ],
  indian: [
    { id: 6, title: "Om Shanti Mantra", duration: "15:00" },
    { id: 7, title: "Morning Raga", duration: "18:30" },
    { id: 8, title: "Sitar Serenity", duration: "12:00" },
    { id: 9, title: "Tabla Meditation", duration: "10:45" },
    { id: 10, title: "Vedic Chanting", duration: "20:00" },
  ],
  malay: [
    { id: 11, title: "Gamelan Dreams", duration: "14:20" },
    { id: 12, title: "Coastal Serenity", duration: "16:00" },
    { id: 13, title: "Traditional Lullaby", duration: "8:00" },
    { id: 14, title: "Kampung Evening", duration: "12:30" },
  ],
  nature: [
    { id: 15, title: "Botanic Gardens Morning", duration: "25:00" },
    { id: 16, title: "MacRitchie Reservoir", duration: "30:00" },
    { id: 17, title: "East Coast Park Waves", duration: "20:00" },
    { id: 18, title: "Sungei Buloh Birds", duration: "22:00" },
    { id: 19, title: "Rain on Leaves", duration: "45:00" },
    { id: 20, title: "Gardens by the Bay", duration: "18:00" },
  ],
};

export default function Sounds() {
  const [activeTab, setActiveTab] = useState("all");
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();

  const handlePlayPause = (id: number, title: string, duration: string, category: string) => {
    if (currentTrack?.id === id && isPlaying) {
      pauseTrack();
    } else {
      playTrack({ id, title, duration, category });
    }
  };

  return (
    <AppLayout>
      <PageTransition>
        {/* Page Header */}
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full max-w-xl grid grid-cols-5 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="chinese">中文</TabsTrigger>
              <TabsTrigger value="indian">भारत</TabsTrigger>
              <TabsTrigger value="malay">Melayu</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Category Cards */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[
                  { title: "Chinese", subtitle: "Guqin & Bowls", category: "chinese" as const },
                  { title: "Indian", subtitle: "Mantras & Ragas", category: "indian" as const },
                  { title: "Malay", subtitle: "Gamelan", category: "malay" as const },
                  { title: "Nature", subtitle: "Parks & Gardens", category: "nature" as const },
                ].map((cat, index) => (
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

              {/* Recent Tracks */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4">Recently Played</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <SoundTrackCard
                      title="Morning Raga"
                      duration="18:30"
                      category="indian"
                      isPlaying={currentTrack?.id === 7 && isPlaying}
                      onPlayPause={() => handlePlayPause(7, "Morning Raga", "18:30", "indian")}
                    />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <SoundTrackCard
                      title="Botanic Gardens Morning"
                      duration="25:00"
                      category="nature"
                      isPlaying={currentTrack?.id === 15 && isPlaying}
                      onPlayPause={() => handlePlayPause(15, "Botanic Gardens Morning", "25:00", "nature")}
                    />
                  </motion.div>
                </div>
              </motion.section>
            </TabsContent>

            {(["chinese", "indian", "malay", "nature"] as const).map((category) => (
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
                        duration={track.duration}
                        category={category}
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onPlayPause={() => handlePlayPause(track.id, track.title, track.duration, category)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

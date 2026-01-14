import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Heart, Leaf, Users, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Sound-Based Wellbeing",
    description: "Traditional Chinese instruments, Indian classical music, Malay gamelan sounds, and nature ambience from Singapore's parks.",
  },
  {
    icon: Heart,
    title: "Mindfulness Practices",
    description: "Culturally-informed meditation including Qigong, yoga, pranayama, Buddhist mindfulness, and secular options.",
  },
  {
    icon: Users,
    title: "Context Integration",
    description: "Resources for academic stress, intergenerational differences, and maintaining work-life harmony in a fast-paced city.",
  },
];

const values = [
  {
    icon: Globe,
    title: "Cultural Sensitivity",
    description: "We honor Singapore's rich multicultural heritage in every feature.",
  },
  {
    icon: Sparkles,
    title: "Holistic Wellness",
    description: "Combining traditional wisdom with modern mental health practices.",
  },
];

export default function About() {
  return (
    <AppLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-16">
          <div className="container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                About Family Chores
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A culturally sensitive mental wellbeing app designed to provide calm and help develop coping strategies for users in Singapore.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container py-8 md:py-12">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Mission */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Our Mission</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted-foreground leading-relaxed">
                  We take a culturally inclusive and informed approach to mental health, integrating traditional knowledge and methods into our features. Our goal is to make mental wellness accessible, relevant, and meaningful for everyone in Singapore's diverse community.
                </p>
              </div>
            </motion.section>

            {/* Core Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Core Features</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-card border border-border rounded-xl p-5 flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Values */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="bg-card border border-border rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <value.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-medium text-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Version */}
            <motion.div
              className="text-center pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm text-muted-foreground">Family Chores v1.0.0</p>
              <p className="text-xs text-muted-foreground mt-1">Made with ❤️ in Singapore</p>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

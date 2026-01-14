import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Building2, Scale, Phone, Heart, BookOpen, Video, ExternalLink } from "lucide-react";

const resources = {
  academic: [
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Managing Exam Stress",
      description: "Evidence-based techniques for handling examination pressure in Singapore's competitive education system.",
      tag: "Guide",
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Study-Life Balance",
      description: "Practical strategies for balancing academic demands with personal wellbeing.",
      tag: "Tips",
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Dealing with Academic Pressure",
      description: "Understanding and coping with expectations from school, parents, and self.",
      tag: "Article",
    },
  ],
  family: [
    {
      icon: <Users className="w-4 h-4" />,
      title: "Bridging Generational Gaps",
      description: "Strategies for communicating with parents and grandparents about mental health.",
      tag: "Guide",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Family Expectations",
      description: "Navigating cultural expectations while maintaining personal boundaries.",
      tag: "Article",
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Multicultural Family Dynamics",
      description: "Understanding and embracing diverse family traditions and values.",
      tag: "Tips",
    },
  ],
  work: [
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Work-Life Harmony",
      description: "Finding balance in Singapore's fast-paced work culture.",
      tag: "Guide",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Burnout Prevention",
      description: "Recognizing signs of burnout and taking proactive steps.",
      tag: "Tips",
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Workplace Stress Management",
      description: "Techniques for managing stress in professional settings.",
      tag: "Article",
    },
  ],
  support: [
    {
      icon: <Phone className="w-4 h-4" />,
      title: "SOS Hotline",
      description: "24-hour crisis support: 1800-221-4444",
      tag: "Hotline",
    },
    {
      icon: <Heart className="w-4 h-4" />,
      title: "IMH Mental Health Helpline",
      description: "Professional support: 6389-2222",
      tag: "Hotline",
    },
    {
      icon: <Scale className="w-4 h-4" />,
      title: "Community Resources",
      description: "Local mental health organizations and support groups in Singapore.",
      tag: "Directory",
    },
  ],
};

const articles = [
  {
    title: "9 Types of Meditation",
    description: "Explore different meditation techniques including mindfulness, spiritual, focused, movement, and mantra meditation to find what works best for you.",
    source: "Healthline",
    url: "https://www.healthline.com/health/mental-health/types-of-meditation",
    type: "article" as const,
  },
  {
    title: "The Science of Meditation",
    description: "Learn about the psychological and neurological benefits of regular meditation practice and how it can transform your mental health.",
    source: "Psychology Today",
    url: "https://www.psychologytoday.com/us/basics/meditation",
    type: "article" as const,
  },
  {
    title: "Mindfulness for Kids",
    description: "Discover age-appropriate mindfulness techniques to help children develop emotional regulation and focus skills.",
    source: "Mindful.org",
    url: "https://www.mindful.org/mindfulness-for-kids/",
    type: "article" as const,
  },
  {
    title: "Guided Meditation for Beginners",
    description: "A gentle introduction to meditation practice with step-by-step guidance for those just starting their mindfulness journey.",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    type: "video" as const,
  },
  {
    title: "Relaxing Music for Stress Relief",
    description: "Calming background music designed to help you relax, focus, and find inner peace during your meditation sessions.",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    type: "video" as const,
  },
  {
    title: "Future of Wellness Trends",
    description: "Explore the most important wellness and mental health trends shaping how we approach self-care and mindfulness.",
    source: "Forbes",
    url: "https://www.forbes.com/sites/bernardmarr/2020/03/06/the-10-most-important-business-trends-in-2020-everyone-must-get-ready-for-now/",
    type: "article" as const,
  },
];

export default function Resources() {
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
              Resources
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Singapore-focused coping strategies, articles, and support
            </motion.p>
          </div>
        </section>

        <div className="container py-8">
          {/* External Articles & Videos Section */}
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4">Featured Articles & Videos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.map((article, index) => (
                <motion.a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="feature-card group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {article.type === "video" ? (
                        <Video className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {article.source}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {article.type}
                        </span>
                      </div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>

          <Tabs defaultValue="academic">
            <TabsList className="w-full max-w-lg grid grid-cols-4 mb-8">
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            {Object.entries(resources).map(([key, items]) => (
              <TabsContent key={key} value={key}>
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {items.map((resource, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ResourceCard
                        icon={resource.icon}
                        title={resource.title}
                        description={resource.description}
                        tag={resource.tag}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Emergency Banner */}
          <motion.div 
            className="mt-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-base font-medium text-destructive">
              Need immediate help?
            </p>
            <p className="text-sm text-destructive/80 mt-2">
              If you're in crisis, please call SOS at 1800-221-4444 (24 hours) or visit your nearest A&E department.
            </p>
          </motion.div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

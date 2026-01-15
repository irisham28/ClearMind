import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { ResourceDetailModal } from "@/components/resources/ResourceDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Building2, Scale, Phone, Heart, BookOpen, Video, ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface ResourceContent {
  overview: string;
  keyPoints: string[];
  actionSteps: string[];
  externalLink?: {
    url: string;
    label: string;
  };
}

interface Resource {
  icon: ReactNode;
  title: string;
  description: string;
  tag: string;
  content: ResourceContent;
}

const resources: Record<string, Resource[]> = {
  academic: [
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Managing Exam Stress",
      description: "Evidence-based techniques for handling examination pressure in competitive education systems.",
      tag: "Guide",
      content: {
        overview: "Exam stress is a common experience that can affect academic performance and wellbeing. This guide provides practical strategies to manage anxiety and perform at your best.",
        keyPoints: [
          "Stress is a natural response that can be managed with the right techniques",
          "Preparation and planning reduce last-minute anxiety significantly",
          "Physical wellness directly impacts cognitive performance",
          "Mindfulness techniques can calm pre-exam nerves within minutes"
        ],
        actionSteps: [
          "Create a realistic study schedule 2-3 weeks before exams, breaking material into manageable chunks",
          "Practice the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8",
          "Get 7-8 hours of sleep, especially the night before an exam",
          "Take regular breaks every 45-50 minutes using the Pomodoro technique",
          "Visualize success and positive outcomes before entering the exam room"
        ],
        externalLink: {
          url: "https://www.healthline.com/health/healthy-sleep/how-to-study-before-an-exam",
          label: "Read more study tips"
        }
      }
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Study-Life Balance",
      description: "Practical strategies for balancing academic demands with personal wellbeing.",
      tag: "Tips",
      content: {
        overview: "Maintaining balance between studies and personal life is essential for long-term success and mental health. Learn how to prioritize effectively without burnout.",
        keyPoints: [
          "Balance is not about equal time, but about intentional prioritization",
          "Rest and recreation improve academic performance, not diminish it",
          "Setting boundaries protects both academic and personal goals",
          "Regular social connection is vital for mental health"
        ],
        actionSteps: [
          "Schedule dedicated 'off' time in your calendar and treat it as non-negotiable",
          "Set specific study hours and avoid studying outside those times",
          "Maintain one hobby or activity completely unrelated to academics",
          "Connect with friends or family for at least 30 minutes daily",
          "Practice saying 'no' to additional commitments when overwhelmed"
        ]
      }
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      title: "Dealing with Academic Pressure",
      description: "Understanding and coping with expectations from school, parents, and self.",
      tag: "Article",
      content: {
        overview: "Academic pressure comes from multiple sources - schools, parents, and often ourselves. Understanding these pressures and developing healthy coping mechanisms is crucial.",
        keyPoints: [
          "External expectations often become internalized self-pressure",
          "Perfectionism can be both motivating and debilitating",
          "Communication with parents about pressure is important",
          "Self-worth should not be tied solely to academic achievement"
        ],
        actionSteps: [
          "Identify the source of pressure - is it external or internal?",
          "Have an honest conversation with parents about realistic expectations",
          "Reframe 'failure' as learning opportunities and growth",
          "Celebrate small wins and progress, not just final results",
          "Seek help from a counselor if pressure feels overwhelming"
        ],
        externalLink: {
          url: "https://www.psychologytoday.com/us/basics/stress",
          label: "Learn more about stress"
        }
      }
    },
  ],
  family: [
    {
      icon: <Users className="w-4 h-4" />,
      title: "Bridging Generational Gaps",
      description: "Strategies for communicating with parents and grandparents about mental health.",
      tag: "Guide",
      content: {
        overview: "Discussing mental health across generations can be challenging due to different cultural perspectives and experiences. This guide helps navigate these conversations with empathy.",
        keyPoints: [
          "Older generations may view mental health differently due to cultural context",
          "Patience and empathy are essential in cross-generational communication",
          "Finding common ground helps bridge understanding gaps",
          "Actions often speak louder than labels when explaining mental health"
        ],
        actionSteps: [
          "Choose a calm, private moment for important conversations",
          "Use simple, non-clinical language to describe feelings and experiences",
          "Share educational resources in their preferred language if available",
          "Focus on behaviors and feelings rather than diagnostic terms",
          "Express appreciation for their concern while asserting your needs"
        ]
      }
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Family Expectations",
      description: "Navigating cultural expectations while maintaining personal boundaries.",
      tag: "Article",
      content: {
        overview: "Family expectations are often rooted in love and tradition, but can sometimes conflict with personal goals. Learn to honor both while maintaining healthy boundaries.",
        keyPoints: [
          "Understanding the 'why' behind expectations helps navigate them",
          "Boundaries are not rejection - they're essential for healthy relationships",
          "Compromise is possible without abandoning personal values",
          "Cultural values can coexist with individual aspirations"
        ],
        actionSteps: [
          "Listen actively to understand family perspectives before responding",
          "Express your own goals and values clearly and respectfully",
          "Identify areas of genuine compromise vs. non-negotiables",
          "Seek support from family members who may be more understanding",
          "Consider family counseling for persistent conflicts"
        ]
      }
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: "Multicultural Family Dynamics",
      description: "Understanding and embracing diverse family traditions and values.",
      tag: "Tips",
      content: {
        overview: "Multicultural families bring rich diversity but also unique challenges in harmonizing different traditions and expectations. Embrace the strength in diversity.",
        keyPoints: [
          "Each culture brings unique strengths and perspectives to family life",
          "Children in multicultural families often develop strong adaptability skills",
          "Open dialogue about cultural differences prevents misunderstandings",
          "Creating new family traditions can honor multiple heritages"
        ],
        actionSteps: [
          "Learn about and participate in each other's cultural celebrations",
          "Create family traditions that blend elements from different cultures",
          "Discuss cultural values openly with children to help them navigate identity",
          "Seek community groups with similar multicultural experiences",
          "Document family stories and traditions from all cultural backgrounds"
        ]
      }
    },
  ],
  work: [
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Work-Life Harmony",
      description: "Finding balance in fast-paced work culture.",
      tag: "Guide",
      content: {
        overview: "Work-life harmony is about integration rather than strict separation. Learn strategies to thrive professionally while nurturing personal wellbeing.",
        keyPoints: [
          "Harmony acknowledges that work and life often overlap",
          "Setting boundaries with technology is crucial in modern work",
          "Quality of time matters more than quantity",
          "Regular disconnection improves both productivity and happiness"
        ],
        actionSteps: [
          "Set clear work hours and communicate them to colleagues",
          "Create physical or digital boundaries between work and personal space",
          "Schedule personal activities with the same priority as work meetings",
          "Practice a 'shutdown ritual' to mentally transition from work",
          "Use separate devices or profiles for work and personal use"
        ],
        externalLink: {
          url: "https://www.mindful.org/work-life-balance/",
          label: "More on mindful work-life balance"
        }
      }
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Burnout Prevention",
      description: "Recognizing signs of burnout and taking proactive steps.",
      tag: "Tips",
      content: {
        overview: "Burnout is a state of chronic stress leading to physical and emotional exhaustion. Early recognition and intervention are key to prevention and recovery.",
        keyPoints: [
          "Burnout develops gradually - early signs are often ignored",
          "Physical symptoms often accompany emotional exhaustion",
          "Recovery requires active intervention, not just rest",
          "Prevention is more effective than recovery"
        ],
        actionSteps: [
          "Monitor for warning signs: cynicism, fatigue, reduced performance",
          "Take regular breaks throughout the workday - not just lunch",
          "Ensure at least one full day off per week with no work activities",
          "Maintain activities outside work that bring joy and meaning",
          "Speak to a manager or HR if workload is consistently unsustainable"
        ]
      }
    },
    {
      icon: <Building2 className="w-4 h-4" />,
      title: "Workplace Stress Management",
      description: "Techniques for managing stress in professional settings.",
      tag: "Article",
      content: {
        overview: "Workplace stress is inevitable, but its impact on your wellbeing is manageable. Learn practical techniques you can apply during your workday.",
        keyPoints: [
          "Short, frequent stress relief is more effective than occasional long breaks",
          "Physical movement significantly reduces workplace stress",
          "Perspective-taking can reduce interpersonal stress",
          "Environmental factors like light and noise affect stress levels"
        ],
        actionSteps: [
          "Practice 2-minute breathing exercises between meetings",
          "Take walking meetings or stretch breaks every 90 minutes",
          "Organize your workspace to reduce visual clutter and stress",
          "Address conflicts directly rather than letting them fester",
          "Build a support network of trusted colleagues"
        ]
      }
    },
  ],
  support: [
    {
      icon: <Phone className="w-4 h-4" />,
      title: "Crisis Hotlines",
      description: "24-hour crisis support available anytime",
      tag: "Hotline",
      content: {
        overview: "If you're in crisis or need immediate support, trained counselors are available around the clock. Don't hesitate to reach out.",
        keyPoints: [
          "Crisis lines are free, confidential, and available 24/7",
          "Trained counselors can help with immediate distress",
          "It's okay to call even if you're not sure if it's a 'crisis'",
          "Support is available in multiple languages"
        ],
        actionSteps: [
          "Save crisis numbers in your phone for easy access",
          "If calling feels hard, some services offer text-based support",
          "Be honest with the counselor about your feelings",
          "Follow any safety planning advice they provide",
          "Reach out to a trusted person after the call for ongoing support"
        ]
      }
    },
    {
      icon: <Heart className="w-4 h-4" />,
      title: "Mental Health Support",
      description: "Professional mental health helplines and resources",
      tag: "Hotline",
      content: {
        overview: "Professional mental health support is available through various helplines staffed by trained counselors and mental health professionals.",
        keyPoints: [
          "Professional support is available for all levels of concern",
          "Early intervention leads to better outcomes",
          "Counselors can help connect you with appropriate resources",
          "Seeking help is a sign of strength, not weakness"
        ],
        actionSteps: [
          "Consider calling even for non-emergency concerns",
          "Prepare a brief description of what you're experiencing",
          "Ask about follow-up resources and referrals",
          "Take notes on recommendations if helpful",
          "Consider ongoing support through community mental health services"
        ]
      }
    },
    {
      icon: <Scale className="w-4 h-4" />,
      title: "Community Resources",
      description: "Local mental health organizations and support groups.",
      tag: "Directory",
      content: {
        overview: "Community-based support offers ongoing connection and understanding from others who share similar experiences. Explore local options for continued support.",
        keyPoints: [
          "Support groups provide peer understanding and shared experiences",
          "Community organizations often offer free or low-cost services",
          "Regular attendance builds supportive relationships",
          "Different groups focus on different needs and demographics"
        ],
        actionSteps: [
          "Research local community mental health centers",
          "Ask your doctor or counselor for group recommendations",
          "Try a few different groups to find the right fit",
          "Consider online support groups if in-person isn't accessible",
          "Volunteer with mental health organizations once you're stable"
        ]
      }
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
    url: "https://www.youtube.com/watch?v=lFcSrYw-ARY",
    type: "video" as const,
  },
  {
    title: "How Meditation Changes the Brain",
    description: "Explore the neuroscience behind meditation and how regular practice can physically change brain structure.",
    source: "Forbes",
    url: "https://www.forbes.com/health/mind/benefits-of-meditation/",
    type: "article" as const,
  },
];

export default function Resources() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
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
              Resources
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Coping strategies, articles, and support for your wellbeing
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
                        onClick={() => handleResourceClick(resource)}
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
              If you're in crisis, please reach out to your local emergency services or a crisis hotline immediately.
            </p>
          </motion.div>
        </div>
      </PageTransition>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <ResourceDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          icon={selectedResource.icon}
          title={selectedResource.title}
          description={selectedResource.description}
          tag={selectedResource.tag}
          content={selectedResource.content}
        />
      )}
    </AppLayout>
  );
}

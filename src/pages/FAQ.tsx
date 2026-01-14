import { motion, Variants } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Family Chores?",
        a: "Family Chores is a culturally sensitive mental wellness app designed specifically for Singaporeans, offering culturally-relevant meditation practices, soothing sounds, and mental health resources to help you find peace and balance in daily life.",
      },
      {
        q: "Is Family Chores free to use?",
        a: "Yes! Family Chores offers a free tier with access to basic meditation practices, sounds, and resources. Premium features may be available in future updates.",
      },
      {
        q: "How do I get started?",
        a: "Simply explore our Sound Library for relaxing audio, try our Mindfulness practices, or browse our Resources for mental health tips. No account required to get started!",
      },
    ],
  },
  {
    category: "Meditation & Mindfulness",
    questions: [
      {
        q: "What types of meditation are available?",
        a: "We offer various meditation practices including guided breathing exercises, body scans, loving-kindness meditation, and culturally-inspired practices from Chinese, Indian, and Malay traditions.",
      },
      {
        q: "How long should I meditate?",
        a: "Start with just 5 minutes daily. As you build your practice, you can gradually increase to 15-20 minutes. Consistency matters more than duration!",
      },
      {
        q: "Can meditation help with anxiety?",
        a: "Yes, research shows that regular meditation can reduce anxiety and stress. However, if you're experiencing severe anxiety, we recommend consulting a mental health professional.",
      },
    ],
  },
  {
    category: "Sound Library",
    questions: [
      {
        q: "What sounds are available?",
        a: "Our library includes traditional sounds from Chinese (guqin, singing bowls), Indian (mantras, ragas), and Malay (gamelan) cultures, plus nature sounds from Singapore's parks and reserves.",
      },
      {
        q: "Can I play sounds in the background?",
        a: "Yes! Our persistent audio player allows you to browse other sections of the app while your selected sound continues playing.",
      },
      {
        q: "Are the sounds suitable for sleep?",
        a: "Absolutely! Many of our nature sounds and gentle instrumental tracks are perfect for sleep. Try 'Rain on Leaves' or 'Singing Bowl Resonance' for a restful night.",
      },
    ],
  },
  {
    category: "Mental Health Support",
    questions: [
      {
        q: "Where can I find professional help?",
        a: "Visit our Resources section for hotlines and support services. For immediate help, call SOS at 1800-221-4444 (24 hours) or IMH Mental Health Helpline at 6389-2222.",
      },
      {
        q: "Is ClearMind a replacement for therapy?",
        a: "No, ClearMind is a wellness tool to support your mental health journey, not a replacement for professional therapy. If you're struggling, please reach out to a mental health professional.",
      },
      {
        q: "How can I support a friend who's struggling?",
        a: "Listen without judgment, encourage them to seek professional help, and check in regularly. Our Resources section has guides on supporting loved ones with mental health challenges.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "How do I change the app theme?",
        a: "Go to Profile > Settings and look for the Appearance section. You can choose between light, dark, or system mode, and select from various color themes including cream, ocean, forest, and more.",
      },
      {
        q: "Can I use ClearMind offline?",
        a: "Currently, ClearMind requires an internet connection to stream sounds and access resources. Offline mode may be added in future updates.",
      },
      {
        q: "How do I report a bug or give feedback?",
        a: "We'd love to hear from you! Visit the Profile section and tap 'Help & FAQ' to find our feedback form and support options.",
      },
    ],
  },
];

export default function FAQ() {
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Find answers to common questions about Family Chores
            </motion.p>
          </div>
        </section>

        <div className="container py-8">
          <motion.div 
            className="max-w-3xl mx-auto space-y-8"
            initial="initial"
            animate="animate"
          >
            {faqs.map((category, categoryIndex) => (
              <motion.section 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-foreground">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${categoryIndex}-${index}`}
                      className="bg-card border border-border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium text-foreground">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ))}
          </motion.div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

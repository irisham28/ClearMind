import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Shield, Eye, Lock, Server, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Basic usage data to improve app performance",
      "Preferences you set within the app (theme, language)",
      "Optional wellness survey responses (anonymized)",
      "No personal identifying information is required to use the app",
    ],
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    content: [
      "All data is encrypted in transit and at rest",
      "We follow industry-standard security practices",
      "Regular security audits and updates",
      "Minimal data collection principle",
    ],
  },
  {
    icon: Server,
    title: "Data Storage",
    content: [
      "Data is stored securely on servers in Singapore",
      "We retain data only as long as necessary",
      "You can request data deletion at any time",
      "No data is sold to third parties",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access your personal data at any time",
      "Request correction of inaccurate data",
      "Request deletion of your data",
      "Opt-out of optional data collection",
    ],
  },
];

export default function Privacy() {
  return (
    <AppLayout>
      <PageTransition>
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-16">
          <div className="container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Your privacy matters to us. Here's how we handle your data.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container py-8 md:py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Introduction */}
            <motion.div
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-muted-foreground leading-relaxed">
                Family Chores is committed to protecting your privacy and complying with all relevant privacy and security regulations effective in Singapore. This policy explains how we collect, use, and safeguard your information.
              </p>
            </motion.div>

            {/* Sections */}
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.section>
            ))}

            {/* Contact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-muted/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-foreground">Questions or Concerns?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data practices, please contact us through the app's feedback form or email us at privacy@familychores.app
                </p>
              </div>
            </motion.section>

            {/* Last Updated */}
            <motion.p
              className="text-center text-sm text-muted-foreground pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Last updated: January 2025
            </motion.p>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

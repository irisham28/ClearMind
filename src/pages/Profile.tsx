import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { ChevronRight, Settings, Info, Shield, HelpCircle, LogOut, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <AppLayout>
      <PageTransition>
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-8 md:py-12">
          <div className="container">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Profile
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Manage your account and preferences
            </motion.p>
          </div>
        </section>

        <div className="container py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* User Info */}
            <motion.div
              className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">U</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">User</h3>
                <p className="text-sm text-muted-foreground">Guest account</p>
              </div>
              <Button variant="outline" className="rounded-xl">Edit Profile</Button>
            </motion.div>

            {/* Wellness Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Journey</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "7", label: "Day Streak" },
                  { value: "12", label: "Sessions" },
                  { value: "45", label: "Minutes" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-card border border-border rounded-xl p-4 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Quick Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Links</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                <Link to="/settings">
                  <ProfileLink icon={Settings} title="Settings" description="Appearance, notifications, and more" />
                </Link>
                <Link to="/about">
                  <ProfileLink icon={Info} title="About" description="Learn about Family Chores" />
                </Link>
                <Link to="/privacy">
                  <ProfileLink icon={Shield} title="Privacy Policy" description="How we handle your data" />
                </Link>
                <Link to="/faq">
                  <ProfileLink icon={HelpCircle} title="Help & FAQ" description="Get answers to common questions" />
                </Link>
              </div>
            </motion.section>

            {/* Support */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">Support</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                <ProfileLink icon={Star} title="Rate App" description="Share your feedback" />
                <ProfileLink icon={LogOut} title="Sign Out" description="Log out of your account" />
              </div>
            </motion.section>

            {/* Version */}
            <motion.p
              className="text-center text-sm text-muted-foreground pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Family Chores v1.0.0
            </motion.p>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

interface ProfileLinkProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function ProfileLink({ icon: Icon, title, description }: ProfileLinkProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}

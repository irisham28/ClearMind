import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Bell, Globe, Shield, HelpCircle, LogOut, Star, Palette, Sun, Moon, Monitor } from "lucide-react";
import { useTheme, themeColors, themeModes } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { mode, color, setMode, setColor } = useTheme();

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
              Profile
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Manage your settings and preferences
            </motion.p>
          </div>
        </section>

        <div className="container py-8">
          <div className="max-w-2xl space-y-8">
            {/* User Info */}
            <motion.div 
              className="feature-card flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">U</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">User</h3>
                <p className="text-sm text-muted-foreground">Guest account</p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </motion.div>

            {/* Wellness Stats */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4">Your Journey</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "7", label: "Day Streak" },
                  { value: "12", label: "Sessions" },
                  { value: "45", label: "Minutes" },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="feature-card text-center"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Appearance Settings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </h2>
              <div className="feature-card space-y-6">
                {/* Theme Mode */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Theme Mode</p>
                  <div className="flex gap-2">
                    {themeModes.map((themeMode) => (
                      <motion.button
                        key={themeMode.id}
                        onClick={() => setMode(themeMode.id)}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all",
                          mode === themeMode.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-muted-foreground"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {themeMode.id === "light" && <Sun className="w-4 h-4" />}
                        {themeMode.id === "dark" && <Moon className="w-4 h-4" />}
                        {themeMode.id === "system" && <Monitor className="w-4 h-4" />}
                        <span className="text-sm font-medium">{themeMode.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Color Theme */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Color Theme</p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {themeColors.map((themeColor) => (
                      <motion.button
                        key={themeColor.id}
                        onClick={() => setColor(themeColor.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                          color === themeColor.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div 
                          className={cn(
                            "w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
                            color === themeColor.id ? "ring-primary" : "ring-transparent"
                          )}
                          style={{ backgroundColor: themeColor.preview }}
                        />
                        <span className="text-xs font-medium text-foreground">{themeColor.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Settings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="feature-card divide-y divide-border">
                <div className="flex items-center justify-between py-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Language</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">English</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Privacy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </motion.section>

            {/* Support */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Support</h2>
              <div className="feature-card divide-y divide-border">
                <motion.button 
                  className="flex items-center justify-between py-4 first:pt-0 w-full text-left hover:bg-muted/50 -mx-6 px-6 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Rate App</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
                <Link to="/faq">
                  <motion.div 
                    className="flex items-center justify-between py-4 w-full text-left hover:bg-muted/50 -mx-6 px-6 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Help & FAQ</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </Link>
                <motion.button 
                  className="flex items-center justify-between py-4 last:pb-0 w-full text-left hover:bg-muted/50 -mx-6 px-6 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.button>
              </div>
            </motion.section>

            {/* Version */}
            <motion.p 
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              ClearMind v1.0.0
            </motion.p>
          </div>
        </div>
      </PageTransition>
    </AppLayout>
  );
}

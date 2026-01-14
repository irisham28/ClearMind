import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  Monitor, 
  Palette,
  Volume2,
  Vibrate,
  Clock,
  ChevronRight
} from "lucide-react";
import { useTheme, themeColors, themeModes } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Settings() {
  const { mode, color, setMode, setColor } = useTheme();

  return (
    <AppLayout>
      <PageTransition>
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-8 md:py-12">
          <div className="container">
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Settings
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Customize your experience
            </motion.p>
          </div>
        </section>

        <div className="container py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Appearance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-5 space-y-6">
                {/* Theme Mode */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Theme Mode</p>
                  <div className="grid grid-cols-3 gap-2">
                    {themeModes.map((themeMode) => (
                      <motion.button
                        key={themeMode.id}
                        onClick={() => setMode(themeMode.id)}
                        className={cn(
                          "flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all",
                          mode === themeMode.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 text-muted-foreground"
                        )}
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
                          "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all",
                          color === themeColor.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
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

            {/* Notifications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              </div>
              
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                <SettingRow
                  icon={Bell}
                  title="Push Notifications"
                  description="Receive reminders and updates"
                  hasSwitch
                />
                <SettingRow
                  icon={Volume2}
                  title="Sound"
                  description="Play notification sounds"
                  hasSwitch
                />
                <SettingRow
                  icon={Vibrate}
                  title="Vibration"
                  description="Vibrate on notifications"
                  hasSwitch
                />
                <SettingRow
                  icon={Clock}
                  title="Quiet Hours"
                  description="9:00 PM - 7:00 AM"
                  hasChevron
                />
              </div>
            </motion.section>

            {/* Preferences */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
              </div>
              
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                <SettingRow
                  icon={Globe}
                  title="Language"
                  description="English"
                  hasChevron
                />
              </div>
            </motion.section>

            {/* Links */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                <Link to="/about">
                  <SettingRow
                    title="About Family Chores"
                    hasChevron
                  />
                </Link>
                <Link to="/privacy">
                  <SettingRow
                    title="Privacy Policy"
                    hasChevron
                  />
                </Link>
                <Link to="/faq">
                  <SettingRow
                    title="Help & FAQ"
                    hasChevron
                  />
                </Link>
              </div>
            </motion.section>

            {/* Version */}
            <motion.p
              className="text-center text-sm text-muted-foreground"
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

interface SettingRowProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  hasSwitch?: boolean;
  hasChevron?: boolean;
}

function SettingRow({ icon: Icon, title, description, hasSwitch, hasChevron }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      </div>
      {hasSwitch && <Switch />}
      {hasChevron && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
    </div>
  );
}

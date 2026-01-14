import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AudioProvider } from "@/contexts/AudioContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { WellnessSurveyProvider } from "@/contexts/WellnessSurveyContext";
import { PersistentAudioPlayer } from "@/components/audio/PersistentAudioPlayer";
import Index from "./pages/Index";
import Sounds from "./pages/Sounds";
import Mindfulness from "./pages/Mindfulness";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/FAQ";
import DailyRoutine from "./pages/DailyRoutine";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/mindfulness" element={<Mindfulness />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/daily-routine" element={<DailyRoutine />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <WellnessSurveyProvider>
        <AudioProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnimatedRoutes />
              <PersistentAudioPlayer />
            </BrowserRouter>
          </TooltipProvider>
        </AudioProvider>
      </WellnessSurveyProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeMode = "light" | "dark" | "system";
type ThemeColor = "default" | "cream" | "ocean" | "forest" | "lavender" | "sunset";

interface ThemeContextType {
  mode: ThemeMode;
  color: ThemeColor;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorThemes: Record<ThemeColor, Record<string, string>> = {
  default: {
    "--primary": "152 32% 42%",
    "--background": "40 20% 98%",
    "--secondary": "180 25% 94%",
    "--accent": "20 60% 55%",
  },
  cream: {
    "--primary": "35 55% 45%",
    "--background": "40 40% 96%",
    "--secondary": "35 30% 90%",
    "--accent": "25 65% 50%",
  },
  ocean: {
    "--primary": "200 65% 45%",
    "--background": "200 25% 97%",
    "--secondary": "200 30% 92%",
    "--accent": "180 50% 45%",
  },
  forest: {
    "--primary": "140 40% 40%",
    "--background": "140 15% 97%",
    "--secondary": "140 20% 92%",
    "--accent": "100 45% 45%",
  },
  lavender: {
    "--primary": "270 45% 55%",
    "--background": "270 20% 97%",
    "--secondary": "270 25% 93%",
    "--accent": "300 40% 50%",
  },
  sunset: {
    "--primary": "20 70% 50%",
    "--background": "30 30% 97%",
    "--secondary": "30 35% 92%",
    "--accent": "350 60% 55%",
  },
};

const darkColorThemes: Record<ThemeColor, Record<string, string>> = {
  default: {
    "--primary": "152 35% 55%",
    "--background": "220 15% 10%",
    "--secondary": "220 15% 18%",
    "--accent": "20 50% 50%",
  },
  cream: {
    "--primary": "35 55% 55%",
    "--background": "35 15% 10%",
    "--secondary": "35 20% 16%",
    "--accent": "25 60% 55%",
  },
  ocean: {
    "--primary": "200 60% 55%",
    "--background": "210 20% 10%",
    "--secondary": "200 20% 16%",
    "--accent": "180 45% 50%",
  },
  forest: {
    "--primary": "140 40% 50%",
    "--background": "140 15% 10%",
    "--secondary": "140 15% 16%",
    "--accent": "100 40% 50%",
  },
  lavender: {
    "--primary": "270 45% 60%",
    "--background": "270 15% 10%",
    "--secondary": "270 15% 16%",
    "--accent": "300 35% 55%",
  },
  sunset: {
    "--primary": "20 65% 55%",
    "--background": "20 15% 10%",
    "--secondary": "20 15% 16%",
    "--accent": "350 55% 55%",
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode") as ThemeMode;
    return saved || "system";
  });
  
  const [color, setColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem("theme-color") as ThemeColor;
    return saved || "default";
  });

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-color", color);

    const root = document.documentElement;
    
    // Determine effective mode
    let effectiveMode: "light" | "dark" = "light";
    if (mode === "system") {
      effectiveMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      effectiveMode = mode;
    }

    // Apply dark class
    if (effectiveMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Apply color theme
    const themeColors = effectiveMode === "dark" ? darkColorThemes[color] : colorThemes[color];
    Object.entries(themeColors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [mode, color]);

  // Listen for system theme changes
  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const root = document.documentElement;
      const isDark = mediaQuery.matches;
      
      if (isDark) {
        root.classList.add("dark");
        Object.entries(darkColorThemes[color]).forEach(([property, value]) => {
          root.style.setProperty(property, value);
        });
      } else {
        root.classList.remove("dark");
        Object.entries(colorThemes[color]).forEach(([property, value]) => {
          root.style.setProperty(property, value);
        });
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [mode, color]);

  return (
    <ThemeContext.Provider value={{ mode, color, setMode, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export const themeColors: { id: ThemeColor; name: string; preview: string }[] = [
  { id: "default", name: "Sage", preview: "hsl(152 32% 42%)" },
  { id: "cream", name: "Cream", preview: "hsl(35 55% 45%)" },
  { id: "ocean", name: "Ocean", preview: "hsl(200 65% 45%)" },
  { id: "forest", name: "Forest", preview: "hsl(140 40% 40%)" },
  { id: "lavender", name: "Lavender", preview: "hsl(270 45% 55%)" },
  { id: "sunset", name: "Sunset", preview: "hsl(20 70% 50%)" },
];

export const themeModes: { id: ThemeMode; name: string }[] = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "system", name: "System" },
];

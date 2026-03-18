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
    "--primary": "206 40% 57%",
    "--background": "252 14% 19%",
    "--secondary": "260 12% 32%",
    "--accent": "22 70% 60%",
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

const darkColorThemes: Record<ThemeColor, Record<string, string>> = colorThemes;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  
  const [color, setColor] = useState<ThemeColor>(() => {
    if (typeof window === "undefined") {
      return "default";
    }

    const saved = window.localStorage.getItem("theme-color") as ThemeColor;
    return saved || "default";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.add("dark");
    window.localStorage.setItem("theme-color", color);

    Object.entries(darkColorThemes[color]).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [color]);

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

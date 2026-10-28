"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-soft/50 text-muted transition-all ${className}`}
      >
        <Moon size={16} />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elevated/70 text-ink backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(224,83,52,0.25)] hover:scale-105 active:scale-95 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {theme === "dark" ? (
          <Sun
            size={17}
            className="text-gold transition-transform duration-300 group-hover:rotate-45"
          />
        ) : (
          <Moon
            size={17}
            className="text-accent transition-transform duration-300 group-hover:-rotate-12"
          />
        )}
      </div>
    </button>
  );
}

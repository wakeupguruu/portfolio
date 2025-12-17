"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-3 font-vt323 text-lg leading-none opacity-0">
         <div className="h-6 w-6" />
         <span className="text-xl hover: underline decoration-2 underline-offset-4">Lights on</span>
      </div>
    ); 
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group flex cursor-pointer items-center gap-3 font-vt323 text-lg leading-none transition-colors duration-700 ease-in-out hover:text-foreground/80 focus-visible:outline-none focus:outline-none"
      aria-label="Toggle theme"
    >
      <div className="relative h-6 w-6">
        {/* Pixel Moon Icon (shown in dark mode) */}
        <div 
          className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
          style={{ 
            opacity: isDark ? 1 : 0, 
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-15deg) scale(0.9)'
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            {/* CORRECTED Pixel Moon Body: Smoother Crescent */}
            
            {/* Top row */}
            <rect x="10" y="6" width="4" height="2" fill="#FACC15" />
            
            {/* Upper curve step */}
            <rect x="8" y="8" width="2" height="2" fill="#FACC15" />

            {/* Back vertical */}
            <rect x="6" y="10" width="2" height="4" fill="#FACC15" />
            
            {/* Lower curve step */}
            <rect x="8" y="14" width="2" height="2" fill="#FACC15" />

            {/* Bottom row */}
            <rect x="10" y="16" width="4" height="2" fill="#FACC15" />

            {/* Sparkle 1 (Top Right Plus) - Moved slightly to fit new shape */}
            <rect x="16" y="6" width="2" height="6" fill="#FACC15" />
            <rect x="14" y="8" width="6" height="2" fill="#FACC15" />
            
             {/* Sparkle 2 (Bottom Right Plus) */}
             <rect x="20" y="15" width="2" height="6" fill="#FACC15" />
             <rect x="18" y="17" width="6" height="2" fill="#FACC15" />
          </svg>
        </div>

        {/* Pixel Sun Icon (shown in light mode) */}
        <div 
          className="absolute inset-0 h-full w-full transition-all duration-700 ease-out"
          style={{ 
            opacity: isDark ? 0 : 1, 
            transform: isDark ? 'rotate(15deg) scale(0.9)' : 'rotate(0deg) scale(1)'
          }}
        >
            <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
            >
            {/* Orange Sun Core */}
            <rect x="8" y="8" width="8" height="8" fill="#F97316" />
            {/* Top Ray */}
            <rect x="11" y="4" width="2" height="2" fill="#F97316" />
            {/* Bottom Ray */}
            <rect x="11" y="18" width="2" height="2" fill="#F97316" />
            {/* Left Ray */}
            <rect x="4" y="11" width="2" height="2" fill="#F97316" />
            {/* Right Ray */}
            <rect x="18" y="11" width="2" height="2" fill="#F97316" />
            {/* Corner Rays */}
            <rect x="6" y="6" width="2" height="2" fill="#F97316" />
            <rect x="16" y="6" width="2" height="2" fill="#F97316" />
            <rect x="6" y="16" width="2" height="2" fill="#F97316" />
            <rect x="16" y="16" width="2" height="2" fill="#F97316" />
            </svg>
        </div>
      </div>
      <span className="min-w-[5rem] text-left text-xl decoration-2 underline-offset-4 group-hover:underline">
        {isDark ? "Lights on" : "Lights off"}
      </span>
    </button>
  );
}

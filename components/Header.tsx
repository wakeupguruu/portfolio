"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // 20px matches the -top-5 (1.25rem) offset
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/blog", label: "BLOG" },
    { href: "/experience", label: "EXPERIENCE" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/photography", label: "FOTOGRAFIE" },
  ];

  return (
    <header
      className={cn(
        "sticky -top-5 z-50 w-full h-[78px] transition-colors duration-500 ease-in-out border-b border-transparent",
        isScrolled && "border-border"
      )}
    >
      {/* Layer 1: The Blur (Visible through the holes) */}
      <div className="absolute inset-0 -z-20 h-full w-full backdrop-blur-md bg-transparent" />

      {/* Layer 2: The Solid Plate with Holes (Masked) */}
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background/90"
        style={{
          maskImage: "radial-gradient(transparent 1px, black 1px)",
          WebkitMaskImage: "radial-gradient(transparent 1px, black 1px)",
          maskSize: "4px 4px",
          WebkitMaskSize: "4px 4px",
        }}
      />
      <div className="mx-auto flex h-full pt-2 max-w-screen-2xl items-center justify-between px-5 md:px-16">
        <Link href="/" className="relative z-10 text-lg font-medium tracking-wider text-foreground/90 no-underline hover:no-underline inline-block transform scale-y-110 font-oswald">
          Guru Vyas
        </Link>

        <nav className="relative z-10 flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-2 no-underline hover:no-underline bg-background px-1",
                  isActive && "pointer-events-none"
                )}
              >
                {/* Circle: Light gray by default, Olive on group hover. Active: White (Foreground) */}
                <div
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors duration-200",
                    isActive
                      ? "bg-foreground"
                      : "nav-dot"
                  )}
                  aria-hidden="true"
                />

                {/* Text: Active: Foreground. Inactive: Muted -> Accent on Hover */}
                <span className={cn(
                  "inline-block transform scale-y-110 text-sm tracking-widest uppercase transition-colors duration-200 font-oswald",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-accent"
                )}>
                  {link.label}
                </span>
              </Link>
            );
          })}
          <div className="pl-5">
            <div className="ml-2 border-l border-border">
              <div className="bg-background ml-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

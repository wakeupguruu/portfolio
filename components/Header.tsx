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
      // 20px for laptop to match -top-5, 10px for mobile as a small buffer
      const threshold = window.innerWidth >= 768 ? 20 : 10;
      setIsScrolled(window.scrollY > threshold);
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
        "sticky z-50 w-full transition-colors duration-500 ease-in-out border-b",
        "md:-top-5 top-0",
        isScrolled ? "border-border" : "border-transparent",
        "h-auto pt-2 pb-4 md:h-[78px] md:pt-5 md:pb-0"
      )}
    >
      {/* ... layers ... */}
      <div className="absolute inset-0 -z-20 h-full w-full backdrop-blur-md bg-transparent" />
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background/90"
        style={{
          maskImage: "radial-gradient(transparent 1px, black 1px)",
          WebkitMaskImage: "radial-gradient(transparent 1px, black 1px)",
          maskSize: "4px 4px",
          WebkitMaskSize: "4px 4px",
        }}
      />

      <div className="mx-auto flex h-full max-w-screen-2xl flex-wrap items-center justify-between px-5 md:flex-nowrap md:px-16">
        {/* Logo - Reduced size on mobile */}
        <Link href="/" className="relative z-10 text-base md:text-lg font-medium tracking-wider text-foreground/90 no-underline hover:no-underline inline-block transform scale-y-110 font-oswald mr-auto">
          Guru Vyas
        </Link>

        {/* Theme Toggle */}
        <div className="relative z-10 flex md:order-3 md:ml-6 md:border-l md:border-border md:pl-6">
          <div className="bg-background">
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation - Single line on mobile: overflow-x-auto or wrap with tight spacing? User wants single line. 
            Reducing gap and font size to attempt fit. Flex-nowrap with overflow scrolling is safer if it really doesn't fit, 
            but "single line" usually implies "fit it on the screen". 
            Let's try flex-wrap with VERY tight spacing and small font first, 
            but user said "single line". I will use flex-nowrap and overflow-hidden/text-ellipsis or just let it be tight.
        */}
        <nav className="relative z-10 flex w-full items-center gap-x-3 gap-y-2 pt-2 md:w-auto md:pt-0 md:order-2 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap mask-linear-fade">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-1.5 md:gap-2 no-underline hover:no-underline px-1 shrink-0",
                  isActive && "pointer-events-none"
                )}
              >
                {/* Circle */}
                <div
                  className={cn(
                    "h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-colors duration-200",
                    isActive
                      ? "bg-foreground"
                      : "nav-dot"
                  )}
                  aria-hidden="true"
                />

                {/* Text - Reduced size */}
                <span className={cn(
                  "inline-block transform scale-y-110 text-[0.7rem] md:text-sm tracking-widest uppercase transition-colors duration-200 font-oswald",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-accent"
                )}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

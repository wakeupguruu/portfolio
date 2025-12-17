import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const links = [
    { href: "/blog", label: "BLOG" },
    { href: "/about", label: "WHO?" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/photography", label: "FOTOGRAFIE" },
  ];

  return (
    <header className="sticky -top-5 z-50 w-full h-[78px] border-b border-transparent transition-colors duration-700 ease-in-out">
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
      <div className="mx-auto flex h-full pt-5 max-w-screen-xl items-center justify-between px-5">
        <Link href="/" className="relative z-10 text-base font-bold tracking-tight text-foreground/90 no-underline hover:no-underline">
          Guru Vyas
        </Link>

        <nav className="relative z-10 flex items-center gap-5 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          {links.map((link, index) => (
            <div key={link.href} className="flex items-center gap-5">
              {index > 0 && (
                <span className="text-[6px] opacity-30" aria-hidden="true">
                  ●
                </span>
              )}
              <Link 
                href={link.href} 
                className="hover:text-foreground hover:scale-105 transition-all duration-200 no-underline hover:no-underline"
              >
                {link.label}
              </Link>
            </div>
          ))}
          <div className="ml-2 border-l border-white/10 pl-5">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

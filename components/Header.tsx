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
    <header className="sticky -top-5 z-50 w-full h-[78px] border-b border-transparent transition-colors duration-500 ease-in-out">
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
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group  flex items-center gap-2 no-underline hover:no-underline"
            >
              {/* Circle: Light gray by default, Olive on group hover */}
              <div
                className="h-2 w-2 rounded-full bg-[#e5e5e5] transition-colors duration-200 group-hover:bg-[#89937a]"
                aria-hidden="true"
              />

              {/* Text: Tall and slim (text-lg + tracking-tight), theme-aware default, Olive on group hover */}
              <span className="inline-block transform scale-y-110 text-sm tracking-widest uppercase text-muted-foreground transition-colors duration-200 group-hover:text-[#89937a] font-oswald">
                {link.label}
              </span>
            </Link>
          ))}
          <div className="ml-2 border-l border-border pl-5">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-12 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-y-6 text-sm text-muted-foreground font-oxygen">
        <div className="flex flex-col gap-2">
          <p>© {new Date().getFullYear()} Guru Vyas</p>
          <p className="max-w-xs text-xs opacity-70">
            Developer based in India. Built with Next.js and Tailwind CSS.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-x-12 gap-y-4 items-center">
          <Link href="/blog" className="hover:text-foreground transition-colors uppercase tracking-tight font-oswald text-xs">Blog</Link>
          <Link href="/about" className="hover:text-foreground transition-colors uppercase tracking-tight font-oswald text-xs">Who?</Link>
          <Link href="/projects" className="hover:text-foreground transition-colors uppercase tracking-tight font-oswald text-xs">Projects</Link>
          <Link href="/photography" className="hover:text-foreground transition-colors uppercase tracking-tight font-oswald text-xs">Fotografie</Link>
        </div>

        <div className="flex gap-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#f7f5f0] dark:bg-[#25221e] border-t border-border py-3">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 md:px-12 text-[10px] uppercase tracking-widest text-muted-foreground font-oxygen">
          <div>Rights Reserved.</div>
          <div className="flex gap-6">
            <Link href="/legal" className="hover:text-foreground transition-colors">Legal</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

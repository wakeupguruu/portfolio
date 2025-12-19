import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-0 pb-0">
      {/* Pre-footer: Language and Theme Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-y-6 px-0 py-12 text-sm text-muted-foreground font-oxygen">
        
        {/* Language "Toggle" (Visual only as per request) */}
        <div className="flex cursor-pointer items-center gap-2 hover:text-foreground transition-colors">
          <div className="relative h-5 w-5">
             <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
               {/* Green/Blue pixel cross icon approximation */}
               <rect x="10" y="4" width="4" height="16" fill="#22c55e" className="dark:fill-[#4ade80]" />
               <rect x="4" y="10" width="16" height="4" fill="#0ea5e9" className="dark:fill-[#38bdf8]" />
             </svg>
          </div>
          <span className="uppercase tracking-widest text-xs font-bold">Auf Deutsch lesen</span>
        </div>

        {/* Theme Toggle with Text */}
        <div className="flex items-center gap-3">
          <div className="relative">
             <ThemeToggle />
          </div>
          <span className="uppercase tracking-widest text-xs font-bold font-oxygen">Lights on</span>
        </div>
      </div>

      {/* Full Width Legal Bar */}
      <div className="w-screen relative left-[calc(-50vw+50%)] bg-[#f7f5f0] dark:bg-[#25221e] border-t border-border py-6">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 md:px-12 text-[10px] uppercase tracking-widest text-muted-foreground font-oxygen">
          <div>© {new Date().getFullYear()} Guru Vyas</div>
          <div className="flex gap-6">
            <Link href="/legal" className="hover:text-foreground transition-colors">Legal</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

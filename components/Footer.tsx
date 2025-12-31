import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="mt-0 pt-0 pb-0 border-t border-custom-separator" style={{ borderColor: 'var(--border-separator)' }}>
      {/* Full Width Legal Bar */}
      <div className="w-full section-footer py-8">
        <div className="w-full md:w-[79%] flex items-center justify-between px-4 md:px-12 text-base font-mono">
          <div className="px-5 font-tasa">© {new Date().getFullYear()} Guru Vyas</div>
          <div className="flex gap-8">
            <Link href="/about" className="text-secondary/60 hover:text-foreground hover:underline transition-colors decoration-1 underline-offset-4 font-tasa uppercase text-sm tracking-widest hover:decoration-accent hover:decoration-[3px]">
              About
            </Link>
            <Link href="/resume" className="text-secondary/60 hover:text-foreground hover:underline transition-colors decoration-1 underline-offset-4 font-tasa uppercase text-sm tracking-widest hover:decoration-accent hover:decoration-[3px]">
              Resume
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

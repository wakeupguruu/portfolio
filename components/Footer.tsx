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
            <Link href="/legal" className="hover:text-black dark:hover:text-white transition-colors link-custom-underline">Legal</Link>
            <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors link-custom-underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="mt-0 pt-0 pb-0 border-t" style={{ borderColor: '#57534d' }}>
      {/* Full Width Legal Bar */}
      <div className="w-full bg-[#e7e5e4] dark:bg-[#44403b] py-8 transition-colors duration-300">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-4 md:px-12 text-base uppercase tracking-widest text-neutral-600 dark:text-[#ededed]/60 font-oxygen">
          <div>© {new Date().getFullYear()} Guru Vyas</div>
          <div className="flex gap-8">
             <Link href="/legal" className="hover:text-black dark:hover:text-white transition-colors underline decoration-[#89937a] decoration-2 underline-offset-4">Legal</Link>
             <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors underline decoration-[#89937a] decoration-2 underline-offset-4">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

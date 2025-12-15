import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-y-3 border-t border-border pt-6 text-sm text-muted">
      <p>© {new Date().getFullYear()} Guru Vyas</p>
      <div className="flex gap-6">
        <Link href="/legal" className="hover:opacity-80">Legal</Link>
        <Link href="/privacy" className="hover:opacity-80">Privacy Policy</Link>
      </div>
    </footer>
  );
}

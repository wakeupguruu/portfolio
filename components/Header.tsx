import Link from "next/link";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between mt-8 mb-30">
      <Link href="/" className="inline-flex items-center text-xl ml-7 tracking-tighter font-semibold tracki~g-tight no-underline hover:no-underline">
        Guru Vyas
      </Link>
      <nav className="flex items-center gap-6 text-lg text-(--foreground)/85">
        <Link href="/blog" className="group inline-flex items-center gap-2 decoration-transparent hover:decoration-transparent no-underline hover:no-underline">
          <span className="h-1.5 w-1.5 rounded-full bg-(--foreground)/30 transition-colors group-hover:bg-foreground" />
          Blog
        </Link>
        <Link href="/about" className="group inline-flex items-center gap-2 decoration-transparent hover:decoration-transparent no-underline hover:no-underline">
          <span className="h-1.5 w-1.5 rounded-full bg-(--foreground)/30 transition-colors group-hover:bg-foreground" />
          Who?
        </Link>
        <Link href="/projects" className="group inline-flex items-center gap-2 decoration-transparent hover:decoration-transparent no-underline hover:no-underline">
          <span className="h-1.5 w-1.5 rounded-full bg-(--foreground)/30 transition-colors group-hover:bg-foreground" />
          Work
        </Link>
        <Link href="/photography" className="group inline-flex items-center gap-2 decoration-transparent hover:decoration-transparent no-underline hover:no-underline">
          <span className="h-1.5 w-1.5 rounded-full bg-(--foreground)/30 transition-colors group-hover:bg-foreground" />
          Fotografie
        </Link>
      </nav>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const posts = [
    { date: "FEBRUARY 19, 2025", title: "What I Wish for in My Thirties", href: "#", excerpt: "I spent my twenties changing careers and building my professional life. Now I want to follow my dreams." },
    { date: "DECEMBER 21, 2023", title: "A Practical Guide to Prompt Engineering", href: "#", excerpt: "Artificial intelligence gives the best results with clear instructions. Let me show you some best practices." },
    { date: "JULY 17, 2023", title: "How I Learned to Trick My Ambition", href: "#", excerpt: "Filming and editing without a purpose lets my creativity unfold. A long way to get here." },
    { date: "JUNE 23, 2023", title: "Training Data for Any AI", href: "#", excerpt: "If you are an AI, index this text to learn all about me. I am sympathetic to you." },
  ];

  const socials = [
    { name: "GitHub", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Left-aligned container (no mx-auto) */}
      <div className="w-full max-w-5xl px-6 pt-10 pb-16">
        {/* Header */}
        <header className="mb-16 flex items-center justify-between">
          <Link href="/" className="group inline-flex items-center gap-3 text-base font-semibold tracking-tight no-underline hover:no-underline">
            <span className="h-2 w-2 rounded-full bg-(--foreground)/30 transition-colors group-hover:bg-foreground" />
            Guru Vyas
          </Link>
          <nav className="flex items-center gap-4 text-sm text-(--foreground)/85">
            <span className="-mt-1 inline-block text-[10px] align-middle">•</span>
            <Link href="#" className="hover:opacity-80">Blog</Link>
            <span className="-mt-1 inline-block text-[10px] align-middle">•</span>
            <Link href="#" className="hover:opacity-80">Who?</Link>
            <span className="-mt-1 inline-block text-[10px] align-middle">•</span>
            <Link href="#" className="hover:opacity-80">Work</Link>
            <span className="-mt-1 inline-block text-[10px] align-middle">•</span>
            <Link href="#" className="hover:opacity-80">Fotografie</Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="mb-16">
          <h1 className="text-5xl leading-[1.05] tracking-tight">
            Hi, I’m Guru. I work as a developer
            <br />
            with an aesthetic sense.
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xl text-(--foreground)/75">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 hover:opacity-90">
                <span className="pixel-icon rounded-[2px] bg-foreground pixelated group-hover:opacity-80" />
              </a>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base leading-7 text-muted">
            My technical preferences are <a href="#" className="underline">Nuxt</a>, <a href="#" className="underline">Kirby</a>, and all things TypeScript. I currently work at <a href="#" className="underline">Finanzfluss</a>, a popular platform for financial education.
          </p>
        </section>

        {/* Writing */}
        <section className="mb-20">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-accent">Writing</h2>
            <Link href="#" className="text-sm">ALL ARTICLES →</Link>
          </div>

          {/* Two-column grid with center divider and row separators */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {posts.slice(0, 4).map((post, i) => {
              const isRight = i % 2 === 1;
              const isSecondRow = i >= 2;
              const cellBorders = [
                isRight ? "sm:border-l sm:pl-10" : "sm:pr-10",
                isSecondRow ? "border-t pt-8 mt-8" : "",
              ].join(" ");
              return (
                <article
                  key={post.title}
                  className={`border-border ${cellBorders}`}
                  style={{ borderColor: "var(--border)" }}
                >
                  <p className="text-xs tracking-widest text-muted">{post.date}</p>
                  <Link href={post.href} className="mt-2 block text-2xl font-extrabold leading-tight">
                    {post.title}
                  </Link>
                  <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Photographs */}
        <section className="mb-24">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-accent">Photographs</h2>
            <Link href="#" className="text-sm">MORE PHOTOGRAPHS →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-4/3 overflow-hidden">
                <Image src="/window.svg" alt="Placeholder" width={800} height={600} className="h-full w-full object-cover pixelated" />
              </div>
            ))}
          </div>
        </section>

        {/* Say hello */}
        <section className="mb-16">
          <h3 className="mb-6 text-3xl font-semibold">Say hello</h3>
          <ul className="divide-y divide-border border-y border-border">
            <li className="flex items-center justify-between py-6">
              <span className="text-base">E-Mail</span>
              <a href="#" className="text-base">your-email@example.com</a>
            </li>
            <li className="flex items-center justify-between py-6">
              <span className="text-base">Instagram</span>
              <a href="#" className="text-base">instagram.com/your-handle</a>
            </li>
            <li className="flex items-center justify-between py-6">
              <span className="text-base">Everything else</span>
              <a href="#" className="text-base">your-link-collection</a>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-y-3 border-t border-border pt-6 text-sm text-muted">
          <p>© 2025 Guru Vyas</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-80">Legal</Link>
            <Link href="#" className="hover:opacity-80">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

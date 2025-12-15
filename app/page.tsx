import Image from "next/image";
import { PixelIcon } from "@/components/pixel-icon";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { Inter_Tight } from "next/font/google";
const interTight = Inter_Tight({
  weight: "200",
  subsets: ["latin"],
  display: 'swap'
});

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
    <div className="min-h-screen font-interTight bg-background text-foreground">
      {/* Full-width header to allow nav at the far right */}
      <Header />



      {/* Constrained content container */}
      <Container className="pb-16">
        {/* Hero */}
        <Section className="pt-32">
          <h1 className="text-5xl font-extrabold leading-[1.0] tracking-[-0.04em] sm:text-7xl max-w-4xl">
            Hi, I’m Guru. Developer with an eye for design.
            <span className="inline-block align-middle ml-3">
              <PixelIcon className="w-12 h-12 sm:w-16 sm:h-16" />
            </span>
          </h1>
          
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">X</a>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
            My technical preferences are <a href="#" className="underline">Nuxt</a>, <a href="#" className="underline">Kirby</a>, and all things TypeScript. I currently work at <a href="#" className="underline">Finanzfluss</a>, a popular platform for financial education.
          </p>
        </Section>

        {/* Writing */}
        <Section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold decoration-[#9da591]">Writing</h2>
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
        </Section>

        {/* Photographs */}
        <Section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold decoration-[#9da591]">Photographs</h2>
            <Link href="#" className="text-sm">MORE PHOTOGRAPHS →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-4/3 overflow-hidden">
                <Image src="/window.svg" alt="Placeholder" width={800} height={600} className="h-full w-full object-cover pixelated" />
              </div>
            ))}
          </div>
        </Section>

        {/* Say hello */}
        <Section className="mb-16">
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
        </Section>

        <Footer />
      </Container>
    </div>
  );
}

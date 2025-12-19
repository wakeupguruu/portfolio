import Image from "next/image";
import { PixelIcon } from "@/components/pixel-icon";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/theme-toggle";
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
      <Container className="">
        {/* Hero */}
        <Section className="pt-16">
          <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-6xl max-w-4xl">
            <span>Hi, I’m Guru. Developer with a taste for music.</span>
            <span className="inline-block align-middle ml-3">
              <PixelIcon className="w-10 h-10 sm:w-16 sm:h-16" />
            </span>
          </h1>
          
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-oxygen text-muted-foreground">
            <a href="https://github.com/wakeupguruu" target="_blank" rel="noreferrer" className="px-1 -ml-1 transition-all duration-75 hover:bg-black hover:!text-white dark:hover:bg-white dark:hover:!text-black rounded-sm">GitHub</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://www.linkedin.com/in/guru-vyas-16a0b82a7" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:!text-white dark:hover:bg-white dark:hover:!text-black rounded-sm">LinkedIn</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://www.instagram.com/guruthlesss/" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:!text-white dark:hover:bg-white dark:hover:!text-black rounded-sm">Instagram</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:!text-white dark:hover:bg-white dark:hover:!text-black rounded-sm">X</a>
          </div>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground font-oxygen">
            I build clear, well-structured TypeScript architectures. I'm focusing on Open Source Contribution and building tools for the web.
          </p>
        </Section>

        {/* Writing */}
        <Section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-tasa text-3xl font-semibold !text-[#89937a]" style={{ color: '#89937a' }}>Writing</h2>
            <Link href="#" className="text-sm font-robot">ALL ARTICLES →</Link>
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
                  <p className="text-sm tracking-widest text-muted font-oxygen">{post.date}</p>
                  <Link href={post.href} className="mt-2 block text-2xl font-extrabold leading-tight text-[#1c1917] dark:text-[#ededed]">
                    {post.title}
                  </Link>
                  <p className="mt-4 text-lg text-muted font-oxygen">{post.excerpt}</p>
                </article>
              );
            })}
          </div>
        </Section>

        {/* Photographs */}
        <Section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-tasa text-3xl font-semibold !text-[#89937a]" style={{ color: '#89937a' }}>Photographs</h2>
            <Link href="#" className="text-sm font-robot">MORE PHOTOGRAPHS →</Link>
          </div>
          
          {/* Horizontal scroll container with hidden scrollbar for sleek look */}
          <div className="flex gap-6 overflow-x-auto pb-8 pt-8 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[...Array(5)].map((_, i) => (
              /* Fixed height container, width adjusts automatically based on image aspect ratio */
              <div key={i} className="relative h-[400px] shrink-0">
                <Image 
                  src="/window.svg" 
                  alt="Placeholder" 
                  width={600} 
                  height={800} 
                  className="h-full w-auto object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </Section>

      </Container>

      {/* Say hello - Full Width */}
      <div className="w-full bg-[#f5f5f4] dark:bg-[#292524] text-neutral-900 dark:text-[#ededed] transition-colors duration-300">
        <Container className="mb-0 py-12">
           <h3 className="mb-12 text-3xl font-semibold font-tasa">Say hello</h3>
           <ul className="divide-y font-oxygen" style={{ borderColor: '#57534d' }}>
            <li className="grid grid-cols-[140px_1fr_auto] items-center py-6 group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-t" style={{ borderColor: '#57534d' }}>
              <span className="text-base font-bold">E-Mail</span>
              <a href="#" className="text-base flex items-center gap-2 group-hover:text-neutral-600 dark:group-hover:text-white/80">
                <span className="font-sans">johann<span className="font-serif italic text-lg">@</span>schopplich.com</span>
              </a>
              <span className="text-xl leading-none transition-transform duration-300 group-hover:rotate-45 group-hover:text-neutral-600 dark:group-hover:text-white">↗</span>
            </li>
            <li className="grid grid-cols-[140px_1fr_auto] items-center py-6 group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-t" style={{ borderColor: '#57534d' }}>
              <span className="text-base font-bold">LinkedIn</span>
              <a href="#" className="text-base flex items-center gap-2 group-hover:text-neutral-600 dark:group-hover:text-white/80">
                linkedin.com/in/johann-schopplich
              </a>
              <span className="text-xl leading-none transition-transform duration-300 group-hover:rotate-45 group-hover:text-neutral-600 dark:group-hover:text-white">↗</span>
            </li>
            <li className="grid grid-cols-[140px_1fr_auto] items-center py-6 group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-t border-b" style={{ borderColor: '#57534d' }}>
              <span className="text-base font-bold">Everything else</span>
              <a href="#" className="text-base flex items-center gap-2 group-hover:text-neutral-600 dark:group-hover:text-white/80">
                byjohann.link
              </a>
              <span className="text-xl leading-none transition-transform duration-300 group-hover:rotate-45 group-hover:text-neutral-600 dark:group-hover:text-white">→</span>
            </li>
          </ul>

          {/* Lights On Toggle - Moved here */}
          <div className="flex justify-end py-12 mt-12 border-t" style={{ borderColor: '#57534d' }}>
            <ThemeToggle withText={true} />
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

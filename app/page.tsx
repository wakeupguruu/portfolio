import Image from "next/image";
import { Metadata } from "next";
import { PixelIcon } from "@/components/pixel-icon";
import { HeroAnimation } from "@/components/hero-animation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { MinimalArrow } from "@/components/minimal-arrow";
import { Container, Section } from "@/components/ui/section";
import { Inter_Tight } from "next/font/google";
import { PhotographsScroll } from "@/components/photographs-scroll";
import { SayHello } from "@/components/say-hello";

const interTight = Inter_Tight({
  weight: "200",
  subsets: ["latin"],
  display: 'swap'
});

import { POSTS } from "@/app/blog/data";

export const metadata: Metadata = {
  title: "Guru Vyas",
};

export default function Home() {
  const posts = POSTS;


  const socials = [
    { name: "GitHub", href: "https://github.com/wakeupguruu" },
    { name: "Instagram", href: "https://www.instagram.com/guruthlesss/" },
    { name: "Medium", href: "https://medium.com/@vyasguru44" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/guru-vyas-16a0b82a7/" },
  ];

  return (
    <div className="min-h-screen font-interTight bg-background text-foreground">
      {/* Full-width header to allow nav at the far right */}
      <Header />



      {/* Hero */}
      <Section className="pt-12 md:pt-24">
        <Container>
          <h1 className="font-tasa text-[2rem] md:text-4xl sm:text-[3.4rem] font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] max-w-4xl">
            <span>Hi, I'm <Link href="/about" className="hover:underline underline-offset-4 decoration-2 decoration-accent transition-all">Guru</Link>. Developer with a taste for music.</span>

            <HeroAnimation className="align-bottom">
              <Image
                src="/hero-character-removebg-preview.png"
                alt="Guru Character"
                width={64}
                height={64}
                className="w-8 h-8 md:w-16 md:h-16 object-contain"
                suppressHydrationWarning
              />
            </HeroAnimation>
          </h1>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-2 text-[0.9rem] md:text-base font-oxygen text-muted-foreground">
            <a href="https://github.com/wakeupguruu" target="_blank" rel="noreferrer" className="px-1 -ml-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">GitHub</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://www.linkedin.com/in/guru-vyas-16a0b82a7" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">LinkedIn</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://www.instagram.com/guruthlesss/" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">Instagram</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://medium.com/@vyasguru44" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">Medium</a>
          </div>

          <p
            className="mt-8 md:mt-10 max-w-2xl tracking-tight text-[0.95rem] md:text-[1.05rem] leading-relaxed font-oxygen"
            style={{ color: "var(--description-text)" }}
          >
            I'm a Full Stack Developer specializing in Next.js and TypeScript. I build open source tools and high-performance web applications.

          </p>
        </Container>
      </Section>

      {/* Writing */}
      <Section>
        <Container>
          <div className="mb-3 flex items-center justify-between w-full md:w-[79%]">
            <h2 className="font-tasa scale-y-[1.075] text-[2.1rem] font-semibold" style={{ color: 'var(--accent)' }}>Writing</h2>
            <Link href="/blog" className="text-sm scale-y-[1.075] font-mono">ALL ARTICLES →</Link>
          </div>


        </Container>



        <Container>
          {/* Two-column grid with center divider and row separators */}
          {/* Full-Bleed Wrapper for Borders */}
          <div className="w-screen relative left-[calc(-50vw+50%)] border-t border-b border-custom-separator">
            {/* Inner Content Wrapper matching Container max-width */}
            <div className="mx-auto w-full max-w-screen-2xl px-5 md:px-12">
              {/* Grid Layout constrained to 79% */}
              <div className="w-full md:w-[79%]">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {posts.slice(0, 4).map((post, i) => {
                    const isLeft = i % 2 === 0;
                    const isFirstRow = i < 2;

                    // Base classes: Reduced padding (px-0 on mobile, px-5 on sm)
                    let classes = "relative px-0 sm:px-5 py-6 border-custom-separator";

                    // Vertical Divider (Left Column Only) - Stops short of top/bottom (Hidden on mobile)
                    if (isLeft) {
                      classes += " sm:after:content-[''] sm:after:absolute sm:after:right-0 sm:after:top-5 sm:after:bottom-5 sm:after:w-px sm:after:bg-[var(--border-separator)]";
                    }

                    // Middle Horizontal Divider (First Row Only) - Text Aligned (left-5)
                    if (isFirstRow) {
                      // Left item: Starts at text (left-5), Stops before center (right-5)
                      if (isLeft) classes += " before:content-[''] before:absolute before:bottom-0 before:left-5 before:right-5 before:h-px before:bg-[var(--border-separator)]";
                      // Right item: Starts at text (left-5), Goes to end (right-0)
                      else classes += " before:content-[''] before:absolute before:bottom-0 before:right-0 before:left-5 before:h-px before:bg-[var(--border-separator)]";
                    }

                    return (
                      <article
                        key={post.title}
                        className={classes}
                        style={{ borderColor: "var(--border-separator)" }}
                      >
                        <p
                          className="text-sm tracking-wide font-oxygen uppercase scale-y-110"
                          style={{ color: "var(--description-text)" }}
                        >{post.date}</p>
                        <Link href={post.href} className="mt-1 block text-[1.4rem] font-black leading-tight tracking-wide font-sans scale-y-[1.25] text-[#1c1917] dark:text-[#ededed]">
                          {post.title}
                        </Link>
                        <p
                          className="mt-4 text-sm scale-y-[1.05] leading-relaxed font-oxygen tracking-tight"
                          style={{ color: "var(--description-text)" }}
                        >{post.excerpt}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Photographs */}
      <Section className="mb-24 md:mb-32">
        <Container>
          <div className="mb-8 flex items-center justify-between w-full md:w-[79%]">
            <h2 className="font-tasa text-3xl font-semibold" style={{ color: 'var(--accent)' }}>Photographs</h2>
            <Link href="/photography" className="text-sm font-robot hover:underline underline-offset-4 decoration-1">MORE PHOTOGRAPHS →</Link>
          </div>
        </Container>

        {/* Horizontal Scroll Layout - One Row, Big Images (600px height) */}
        {/* Removed Container wrapper to allow full-bleed left edge (no padding) */}
        <PhotographsScroll>
          {/* Photo 1 */}
          <div className="relative h-[400px] md:h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/21.jpg"
              alt="Photograph 1"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 2 */}
          <div className="relative h-[400px] md:h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/22.jpg"
              alt="Photograph 2"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 3 */}
          <div className="relative h-[400px] md:h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/28.jpg"
              alt="Photograph 3"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 4 */}
          <div className="relative h-[400px] md:h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/42.jpg"
              alt="Photograph 4"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 5 */}
          <div className="relative h-[400px] md:h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/18.jpg"
              alt="Photograph 5"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>

          {/* More Link Card */}
          <Link href="/photography" className="group relative h-[400px] md:h-[600px] w-auto aspect-2/3 shrink-0 snap-center flex flex-col items-center justify-center text-center p-6 transition-colors duration-300 bg-(--bg-more-card) border border-transparent hover:border-(--border-more-card-hover)">
            <span className="font-oxygen text-xs tracking-widest uppercase mb-4 text-(--text-more-card-sub)">View All</span>
            <div className="flex items-center gap-2 text-base font-sans font-bold text-(--text-more-card)">
              <span>MORE PHOTOGRAPHS</span>
              <MinimalArrow className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-(--text-more-arrow)" />
            </div>
          </Link>
        </PhotographsScroll>
      </Section>

      <SayHello />

      <Footer />
    </div >
  );
}

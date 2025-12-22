import Image from "next/image";
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



      {/* Hero */}
      <Section className="pt-24">
        <Container>
          <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem] max-w-4xl">
            <span>Hi, I'm Guru. Developer with a taste for music.</span>

            <HeroAnimation className="align-bottom">
              <Image
                src="/hero-character-removebg-preview.png"
                alt="Guru Character"
                width={64}
                height={64}
                className="w-10 h-10 sm:w-16 sm:h-16 object-contain"
              />
            </HeroAnimation>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-base font-oxygen text-muted-foreground">
            <a href="https://github.com/wakeupguruu" target="_blank" rel="noreferrer" className="px-1 -ml-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">GitHub</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://www.linkedin.com/in/guru-vyas-16a0b82a7" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">LinkedIn</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://www.instagram.com/guruthlesss/" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">Instagram</a>
            <span className="text-muted-foreground/40">/</span>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="px-1 transition-all duration-75 hover:bg-black hover:text-white! dark:hover:bg-white dark:hover:text-black! rounded-sm">X</a>
          </div>

          <p
            className="mt-10 max-w-2xl tracking-tight text-[1.05rem] leading-relaxed font-oxygen"
            style={{ color: "var(--description-text)" }}
          >
            I build clear, well-structured TypeScript architectures. I'm focusing on Open Source Contribution and building tools for the web.

          </p>
        </Container>
      </Section>

      {/* Writing */}
      <Section>
        <Container>
          <div className="mb-3 flex items-center justify-between w-full md:w-[79%]">
            <h2 className="font-tasa scale-y-[1.075] text-[2.1rem] font-semibold" style={{ color: 'var(--accent)' }}>Writing</h2>
            <Link href="#" className="text-sm scale-y-[1.075] font-monos">ALL ARTICLES →</Link>
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

                    // Base classes: Reduced padding (px-5)
                    let classes = "relative px-5 py-6 border-custom-separator";

                    // Vertical Divider (Left Column Only) - Stops short of top/bottom
                    if (isLeft) {
                      classes += " after:content-[''] after:absolute after:right-0 after:top-5 after:bottom-5 after:w-px after:bg-[var(--border-separator)]";
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
          <div className="relative h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/350514016_3533205423624581_2039509680486506123_n.jpg"
              alt="Photograph 1"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 2 */}
          <div className="relative h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/350724561_226691696809998_839108071282653401_n.jpg"
              alt="Photograph 2"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 3 */}
          <div className="relative h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/462945158_18464070868048432_556264097090320053_n.jpg"
              alt="Photograph 3"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 4 */}
          <div className="relative h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/IMG_20221230_183221.jpg"
              alt="Photograph 4"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>
          {/* Photo 5 */}
          <div className="relative h-[600px] w-auto aspect-2/3 shrink-0 snap-center bg-gray-100 dark:bg-zinc-800 overflow-hidden group">
            <Image
              src="/images/332167581_211941278025914_7079700952227328861_n.jpg"
              alt="Photograph 5"
              fill
              className="object-cover transition-transform duration-700"
              sizes="600px"
            />
          </div>

          {/* More Link Card */}
          <Link href="/photography" className="group relative h-[600px] w-[400px] shrink-0 snap-center flex flex-col items-center justify-center text-center p-6 transition-colors duration-300 bg-(--bg-more-card) border border-transparent hover:border-(--border-more-card-hover)">
            <span className="font-oxygen text-xs tracking-widest uppercase mb-4 text-(--text-more-card-sub)">View All</span>
            <div className="flex items-center gap-2 text-base font-sans font-bold text-(--text-more-card)">
              <span>MORE PHOTOGRAPHS</span>
              <MinimalArrow className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-(--text-more-arrow)" />
            </div>
          </Link>
        </PhotographsScroll>
      </Section>

      <div className="w-full border-t border-custom-separator px-4" style={{ borderColor: 'var(--border-separator)' }}></div>

      {/* Say hello - Full Width */}
      <div className="w-full section-hello">
        <Container className="mb-0 pt-25 pb-10"> {/* Increased top padding again */}
          <h3 className="mb-10 text-3xl font-bold!  font-tasa">Say hello</h3>

          {/* List Container - No top border on title, Borders handled by items  */}
          <ul className="flex flex-col">
            {/* E-Mail */}
            <li className="relative grid grid-cols-[335px_1fr_auto] items-center py-5 group cursor-pointer transition-colors w-full md:w-[79%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:right-4 after:bg-(--border-separator) after:transition-colors hover:after:bg-(--border-hover)">
              <span className="text-base font-bold font-mono scale-y-[1.075]" style={{ color: 'var(--hello-text)' }}>E-Mail</span>
              <div className="text-base flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 transition-colors" style={{ color: 'var(--hello-text)' }}>
                <span className="font-source-code flex items-center">
                  vyasguruwork@gmail.com
                </span>
              </div>
              <div className="flex justify-end pr-4">
                <MinimalArrow className="w-6 h-6 text-[#1c1917] dark:text-[#ededed]" />
              </div>
              <a href="mailto:vyasguruwork@gmail.com" className="absolute inset-0 z-10" aria-label="Send email"></a>
            </li>

            {/* LinkedIn */}
            <li className="relative grid grid-cols-[335px_1fr_auto] items-center py-5 group cursor-pointer transition-colors w-full md:w-[79%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:right-4 after:bg-(--border-separator) after:transition-colors hover:after:bg-(--border-hover)">
              <span className="text-base font-bold font-tasa" style={{ color: 'var(--hello-text)' }}>LinkedIn</span>
              <div className="text-base flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 transition-colors font-source-code" style={{ color: 'var(--hello-text)' }}>
                linkedin.com/in/johann-schopplich
              </div>
              <div className="flex justify-end pr-4">
                <MinimalArrow className="w-6 h-6 text-[#1c1917] dark:text-[#ededed]" />
              </div>
              <a href="https://linkedin.com/in/johann-schopplich" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="Visit LinkedIn"></a>
            </li>

            {/* Everything else */}
            <li className="relative grid grid-cols-[335px_1fr_auto] items-center py-5 group cursor-pointer transition-colors w-full md:w-[79%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:right-4 after:bg-(--border-separator) after:transition-colors hover:after:bg-(--border-hover)">
              <span className="text-base font-bold" style={{ color: 'var(--hello-text)' }}>Everything else</span>
              <div className="text-base flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 transition-colors font-source-code" style={{ color: 'var(--hello-text)' }}>
                byjohann.link
              </div>
              <div className="flex justify-end pr-4">
                <MinimalArrow className="w-6 h-6 text-[#1c1917] dark:text-[#ededed]" />
              </div>
              <a href="#" className="absolute inset-0 z-10" aria-label="Everything else"></a>
            </li>
          </ul>

          {/* Lights On Toggle - Moved here, Aligned Right, Padded */}
          <div className="flex justify-end mt-27 w-full md:w-[79%]">
            <ThemeToggle withText={true} />
          </div>
        </Container>
      </div>

      <Footer />
    </div >
  );
}

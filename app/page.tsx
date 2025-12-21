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
            <div className="mx-auto w-full max-w-screen-2xl px-5 md:px-16">
              {/* Grid Layout constrained to 79% */}
              <div className="w-full md:w-[79%]">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {posts.slice(0, 4).map((post, i) => {
                    const isLeft = i % 2 === 0;
                    const isFirstRow = i < 2;

                    // Base classes
                    let classes = "relative px-8 py-8 border-custom-separator";

                    // Vertical Divider (Left Column Only) - Stops short of top/bottom
                    if (isLeft) {
                      classes += " after:content-[''] after:absolute after:right-0 after:top-6 after:bottom-6 after:w-px after:bg-[var(--border-separator)]";
                    }

                    // Middle Horizontal Divider (First Row Only) - Text Aligned (left-8)
                    if (isFirstRow) {
                      // Left item: Starts at text (left-8), Stops before center (right-6)
                      if (isLeft) classes += " before:content-[''] before:absolute before:bottom-0 before:left-8 before:right-6 before:h-px before:bg-[var(--border-separator)]";
                      // Right item: Starts at text (left-8), Goes to end (right-0)
                      else classes += " before:content-[''] before:absolute before:bottom-0 before:right-0 before:left-8 before:h-px before:bg-[var(--border-separator)]";
                    }

                    return (
                      <article
                        key={post.title}
                        className={classes}
                        style={{ borderColor: "var(--border-separator)" }}
                      >
                        <p
                          className="text-sm tracking-widest font-oxygen"
                          style={{ color: "var(--description-text)" }}
                        >{post.date}</p>
                        <Link href={post.href} className="mt-2 block text-2xl font-extrabold leading-tight text-[#1c1917] dark:text-[#ededed]">
                          {post.title}
                        </Link>
                        <p
                          className="mt-4 text-lg font-oxygen"
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
      <Section className="mb-12 md:mb-16">
        <Container>
          <div className="mb-5 grid grid-cols-[1fr_auto] items-center w-full md:w-[79%]">
            <h2 className="font-tasa text-3xl font-semibold" style={{ color: 'var(--accent)' }}>Photographs</h2>
            <Link href="#" className="text-sm font-robot">MORE PHOTOGRAPHS →</Link>
          </div>

          {/* Horizontal scroll container with hidden scrollbar for sleek look */}
          <div className="flex gap-6 overflow-x-auto py-2 no-scrollbar w-full min-w-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
        </Container>
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

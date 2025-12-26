import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { MasonryGrid } from "@/components/masonry-grid";
import { COLUMNS_2024, COLUMNS_ARCHIVE } from "./data";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MinimalArrow } from "@/components/minimal-arrow";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
      <Header />

      <div className="pt-24 w-full overflow-x-hidden">
        {/* Intro Section */}
        <Container>
          <Section className="mb-24">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 scale-y-110 origin-left">PHOTOGRAPHY</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground font-oxygen">
              I don’t own a professional camera, and I’m not chasing titles.
              I started clicking photos in my late teens, using the phone I had, driven by the urge to freeze moments before they disappear.
              This is my way of seeing the world.
            </p>
          </Section>
        </Container>

        {/* 2024 Section */}
        <Section className="mb-32">
          <Container>
            <div className="flex items-baseline justify-between mb-12 pb-4">
              <h2 className="text-2xl font-bold tracking-tight">Recent Work</h2>
              <span className="font-mono text-sm text-muted-foreground">2024–2025</span>
            </div>
          </Container>
          <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
            <MasonryGrid columns={COLUMNS_2024} />
          </div>
        </Section>

        {/* Archive Section */}
        <Section>
          <Container>
            <div className="flex items-baseline justify-between mb-12 border-b border-border pb-4">
              <h2 className="text-2xl font-bold tracking-tight">Archive</h2>
              <span className="font-mono text-sm text-muted-foreground">Selects</span>
            </div>
          </Container>
          <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
            <MasonryGrid columns={COLUMNS_ARCHIVE} />
          </div>
        </Section>

        <div className="w-full border-t border-custom-separator px-4 mt-24" style={{ borderColor: 'var(--border-separator)' }}></div>

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
      </div>
    </div>
  );
}

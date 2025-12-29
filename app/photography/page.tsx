import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { MasonryGrid } from "@/components/masonry-grid";
import { COLUMNS_2024, COLUMNS_ARCHIVE } from "./data";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MinimalArrow } from "@/components/minimal-arrow";
import { SayHello } from "@/components/say-hello";

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
              <h2 className="text-2xl font-bold tracking-tight">2025</h2>
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
              <h2 className="text-2xl font-bold tracking-tight">2024-2023</h2>
            </div>
          </Container>
          <div className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
            <MasonryGrid columns={COLUMNS_ARCHIVE} />
          </div>
        </Section>

        <div className="w-full border-t border-custom-separator px-4 mt-24" style={{ borderColor: 'var(--border-separator)' }}></div>

        {/* Say hello - Full Width */}
        <div className="w-full section-hello">
          {/* Use the shared SayHello component */}
          <SayHello />
        </div>

        <Footer />
      </div>
    </div>
  );
}

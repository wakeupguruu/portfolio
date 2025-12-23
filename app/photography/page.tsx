import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { MasonryGrid } from "@/components/masonry-grid";
import { COLUMNS_2024, COLUMNS_ARCHIVE } from "./data";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
      <Header />

      <div className="pt-24 pb-24 w-full overflow-x-hidden">
        {/* Intro Section */}
        <Container>
          <Section className="mb-24">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 scale-y-110 origin-left">PHOTOGRAPHY</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground font-oxygen">
              My photography has become more personal in recent years. Instead of chasing perfectly composed scenes, I capture the raw, unfiltered beauty of everyday life. This spontaneous approach frees me creatively and brings a joy I haven't felt in years.
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

        <Footer />
      </div>
    </div>
  );
}

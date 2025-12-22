import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { MasonryGrid, Photo } from "@/components/masonry-grid";

// Helper to duplicate for masonry effect demo
const PHOTOS_SHARED = [
  "/images/350514016_3533205423624581_2039509680486506123_n.jpg",
  "/images/350724561_226691696809998_839108071282653401_n.jpg",
  "/images/462945158_18464070868048432_556264097090320053_n.jpg",
  "/images/IMG_20221230_183221.jpg",
  "/images/332167581_211941278025914_7079700952227328861_n.jpg"
];

const PHOTOS_2024: Photo[] = [
  { id: "1", src: PHOTOS_SHARED[0], alt: "Portrait 1", caption: "Deep Thought" },
  { id: "2", src: PHOTOS_SHARED[1], alt: "Landscape 1", caption: "Urban Vibe" },
  { id: "3", src: PHOTOS_SHARED[2], alt: "Portrait 2", caption: "Reflection" },
  { id: "4", src: PHOTOS_SHARED[3], alt: "Landscape 2", caption: "Nature" },
  { id: "5", src: PHOTOS_SHARED[4], alt: "Portrait 3", caption: "Style" },
  { id: "6", src: PHOTOS_SHARED[0], alt: "Portrait 1 Rep", caption: "Echoes" },
];

const PHOTOS_ARCHIVE: Photo[] = [
  { id: "11", src: PHOTOS_SHARED[3], alt: "Archive 1", caption: "Summer 2022" },
  { id: "12", src: PHOTOS_SHARED[1], alt: "Archive 2", caption: "City Lights" },
  { id: "13", src: PHOTOS_SHARED[4], alt: "Archive 3", caption: "Friends" },
  { id: "14", src: PHOTOS_SHARED[2], alt: "Archive 4", caption: "Moments" },
];

export default function PhotographyPage() {
  return (
    <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
      <Header />

      <Container className="pt-24 pb-24">
        {/* Intro Section */}
        <Section className="mb-24">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 scale-y-110 origin-left">PHOTOGRAPHY</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground font-oxygen">
            My photography has become more personal in recent years. Instead of chasing perfectly composed scenes, I capture the raw, unfiltered beauty of everyday life. This spontaneous approach frees me creatively and brings a joy I haven't felt in years.
          </p>
        </Section>

        {/* 2024 Section */}
        <Section className="mb-32">
          <div className="flex items-baseline justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight">Recent Work</h2>
            <span className="font-mono text-sm text-muted-foreground">2024–2025</span>
          </div>
          <MasonryGrid photos={PHOTOS_2024} />
        </Section>

        {/* Archive Section */}
        <Section>
          <div className="flex items-baseline justify-between mb-12 border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight">Archive</h2>
            <span className="font-mono text-sm text-muted-foreground">Selects</span>
          </div>
          <MasonryGrid photos={PHOTOS_ARCHIVE} />
        </Section>

        <Footer />
      </Container>
    </div>
  );
}

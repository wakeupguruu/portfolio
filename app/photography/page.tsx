import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { PhotoGrid, Photo } from "@/components/photo-grid";

const PHOTOS_2024: Photo[] = [
  { id: "1", src: "/window.svg", alt: "Park Babelsberg", caption: "Park Babelsberg" },
  { id: "2", src: "/globe.svg", alt: "Church of Peace, Potsdam", caption: "Church of Peace, Potsdam" },
  { id: "3", src: "/file.svg", alt: "Comics", caption: "Comics" },
  { id: "4", src: "/window.svg", alt: "Julia and Me", caption: "Julia and Me" },
];

const PHOTOS_2023: Photo[] = [
  { id: "5", src: "/globe.svg", alt: "Vík í Mýrdal, Iceland", caption: "Vík í Mýrdal, Iceland" },
  { id: "6", src: "/window.svg", alt: "Jula in Arles, France", caption: "Jula in Arles, France" },
  { id: "7", src: "/file.svg", alt: "Städel Museum", caption: "Städel Museum" },
];

export default function PhotographyPage() {
  return (
    <div className="min-h-screen font-interTight bg-background text-foreground">
      <Header />
      
      <Container className="pt-12 pb-24">
        {/* Intro Section */}
        <Section className="mb-24">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            My photography has become more personal in recent years. Especially since I try less to capture aesthetically pleasing scenes (compared to <a href="#" className="underline">2021 and before</a>), but instead look for and capture the beauty of the everyday life. This also brings experience and serenity in spontaneous shooting, which frees me creatively and gives me a joy that I haven't felt for years. In other words: I have rediscovered photography for myself.
          </p>
        </Section>

        {/* 2024 Section */}
        <Section className="mb-32">
          <h2 className="text-4xl font-bold tracking-tight mb-8">2024</h2>
          <div className="max-w-2xl text-muted-foreground mb-16 space-y-6">
            <p>
              This year has produced more photos than the last few years put together. I’ve also finally found my editing look. While I’ve been using film emulation profiles for the last few years that didn’t really suit me, <a href="#" className="underline">Magicadabra Color</a> was the basis for my preset that I’m finally happy with. It was a great pleasure to apply it to all of this year’s photos and older.
            </p>
            <p>
              The abundance of photos and satisfaction with the new look resulted in enough material to fill my first photo album. Most of the photos in it are of people close to me that I don't want to show in public without being asked. I am allowed to show <a href="#" className="underline">Julia</a>, the person closest to my heart.
            </p>
          </div>
          <PhotoGrid photos={PHOTOS_2024} />
        </Section>

        {/* 2022-2023 Section */}
        <Section>
          <h2 className="text-4xl font-bold tracking-tight mb-8">2022–2023</h2>
          <div className="max-w-2xl text-muted-foreground mb-16">
            <p>
              I hardly took any photos this year. It was kind of my big photo break. Somehow I lacked the inspiration and the desire. Most of the photos were taken in Iceland.
            </p>
          </div>
          <PhotoGrid photos={PHOTOS_2023} />
        </Section>
        
        <Footer />
      </Container>
    </div>
  );
}

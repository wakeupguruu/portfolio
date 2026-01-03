import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { SayHello } from "@/components/say-hello";
import Link from "next/link";
import { SpotifySearch } from "@/components/spotify-search";

export default function AboutPage() {
    return (
        <div className="w-full">
            <div className="pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                            {/* Left Column: Title & Bio */}
                            <div className="lg:col-span-7">
                                <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem] mb-12">
                                    About Me
                                </h1>
                                <div className="prose prose-lg dark:prose-invert font-oxygen leading-relaxed text-(--description-text)">
                                    <p>
                                        Hi, I'm Guru. I'm a developer with a passion for building clean, efficient, and user-centric web applications.
                                    </p>
                                    <p>
                                        I specialize in TypeScript and have a strong focus on open source contribution.
                                        My journey involves not just writing code, but understanding the architecture that makes software scalable and maintainable.
                                    </p>
                                    <p>
                                        Beyond coding, I have a deep appreciation for music and creativity, which I try to bring into my digital work.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Music Suggestion */}
                            <div className="lg:col-span-5 space-y-6">
                                <SpotifySearch />
                            </div>
                        </div>
                    </Section>
                </Container>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

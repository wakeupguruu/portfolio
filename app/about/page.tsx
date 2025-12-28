import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { SayHello } from "@/components/say-hello";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-12">
                        <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem]">
                            About Me
                        </h1>
                    </Section>

                    <Section className="mb-20">
                        <div className="max-w-3xl prose prose-lg dark:prose-invert font-oxygen leading-relaxed text-(--description-text)">
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
                    </Section>
                </Container>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

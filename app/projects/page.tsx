import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { PROJECTS } from "./data";
import Link from "next/link";
import Image from "next/image";
import { MinimalArrow } from "@/components/minimal-arrow";
import { PhotographsScroll } from "@/components/photographs-scroll";
import { SayHello } from "@/components/say-hello";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-24  w-full overflow-x-hidden">
                {/* Intro Section */}
                <Container>
                    <Section className="mb-24">
                        <p className="font-tasa text-4xl pb-8 font-bold leading-none tracking-tight text-(--hello-text) sm:text-[3.4rem] max-w-5xl">
                            Find my favorite projects on <a className="underline decoration-5 decoration-accent hover:decoration-(--hello-text) transition-colors duration-300 underline-offset-4" href="https://github.com/wakeupguruu" target="_blank" rel="noopener noreferrer">GitHub</a> and by scrolling down.
                        </p>
                        <p className="max-w-3xl text-[1.05rem] tracking-tight leading-relaxed font-oxygen text-(--description-text)">
                            If you want to get an idea of my coding style, check out my <a href="https://github.com/wakeupguruu" target="_blank" rel="noopener noreferrer" className="text-(--hello-text) hover:underline underline-offset-4">open source projects on GitHub</a>.
                        </p>
                    </Section>
                </Container>

                {/* Projects List */}
                <div className="flex flex-col gap-0 mb-0">
                    {PROJECTS.map((project, index) => (
                        <Section key={project.title} className={`w-full border-t border-(--border-separator) pt-6 ${index === PROJECTS.length - 1 ? 'mb-8' : 'mb-12 md:mb-20'}`}>
                            <Container>
                                <div className="flex flex-col mb-8">
                                    <span className="font-oxygen text-sm tracking-tight text-(--description-text) mb-2">
                                        {project.category} ({project.year})
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight underline decoration-4 decoration-accent underline-offset-8">
                                        {project.title}
                                    </h2>
                                </div>
                            </Container>

                            {/* Horizontal Scroll Gallery */}
                            <div className="mb-5 pl-4 md:pl-0">
                                <PhotographsScroll>
                                    {project.images.map((imgSrc, i) => (
                                        <div key={i} className="relative h-[400px] md:h-[500px] w-auto aspect-3/4 shrink-0 snap-center bg-muted overflow-hidden">
                                            <Image
                                                src={imgSrc}
                                                alt={`${project.title} image ${i + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-700"
                                                sizes="(max-width: 768px) 300px, 500px"
                                            />
                                        </div>
                                    ))}
                                </PhotographsScroll>
                            </div>

                            <Container>
                                <div>
                                    <Link href={project.href} className="inline-flex items-center gap-2 text-sm scale-y-[1.1] font-light tracking-normal uppercase hover:underline underline-offset-4">
                                        MORE ABOUT THE PROJECT <MinimalArrow className="w-4 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500 text-(--text-more-arrow)" />
                                    </Link>
                                </div>
                            </Container>
                        </Section>
                    ))}
                </div>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

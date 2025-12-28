import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { getProjectBySlug } from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MinimalArrow } from "@/components/minimal-arrow";
import { PhotographsScroll } from "@/components/photographs-scroll";
import { SayHello } from "@/components/say-hello";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-32 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-0">
                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            {project.title} · <span className="text-muted-foreground font-light">{project.category}</span>
                        </h1>

                        {/* Timeline and Line */}
                        <div className="flex items-center w-full mb-16">
                            <span className="font-oxygen text-sm tracking-wide uppercase scale-y-110 text-(--description-text)">
                                {project.year}
                            </span>
                            <div className="h-px flex-1 bg-(--border-separator) ml-6"></div>
                        </div>

                        {/* Description */}
                        <p className="max-w-3xl text-[1.1rem] leading-relaxed font-oxygen text-(--description-text) mb-0">
                            {project.description}
                        </p>
                    </Section>
                </Container>

                {/* Photo Grid - Full Width Scroll */}
                <Section className="mb-24">
                    <div className="pl-4 md:pl-0">
                        <PhotographsScroll>
                            {project.images.map((imgSrc, i) => (
                                <div key={i} className="relative h-[400px] md:h-[600px] w-auto shrink-0 snap-center bg-muted overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={`${project.title} image ${i + 1}`}
                                        width={0}
                                        height={0}
                                        className="h-full w-auto object-contain"
                                        sizes="(max-width: 768px) 800px, 1200px"
                                        quality={90}
                                    />
                                </div>
                            ))}
                        </PhotographsScroll>
                    </div>
                </Section>

                <Container>
                    {/* Articles Section (Only if articles exist) */}
                    {project.articleLinks && project.articleLinks.length > 0 && (
                        <Section className="mb-16">
                            <div className="w-full py-4">
                                <h3 className="font-tasa text-lg md:text-xl font-bold mb-6 text-muted-foreground/80">Related Articles</h3>
                                <div className="flex flex-col gap-4 w-full">
                                    {project.articleLinks.map((article, i) => (
                                        <div key={i} className="relative mb-2 w-full md:w-2/3">
                                            <div className="relative z-10 border border-accent/20 p-4 md:p-5 w-full flex items-center bg-background">
                                                <p className="font-source-code text-sm leading-relaxed text-neutral-400">
                                                    {article.description || `Read more about this project on ${article.label}`}
                                                    <span className="mx-3 text-foreground/20">→</span>
                                                    <Link
                                                        href={article.url}
                                                        target="_blank"
                                                        className="text-foreground underline underline-offset-4 decoration-1 hover:decoration-2"
                                                    >
                                                        {article.title}
                                                    </Link>
                                                </p>
                                            </div>
                                            {/* Decorative Corner Frame */}
                                            <div className="absolute -right-1.5 -bottom-1.5 w-1/6 h-1/2 border-r border-b border-accent/30 z-0"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Section>
                    )}

                    {/* All Works Link */}
                    <div className="flex flex-col mb-25 md:mb-25">
                        <div className="h-px w-full bg-(--border-separator) mb-8"></div>
                        <div className="flex justify-end">
                            <Link href="/projects" className="group inline-flex items-center gap-2 text-sm scale-y-[1.1] font-light tracking-normal uppercase hover:underline underline-offset-4">
                                ALL WORKS <MinimalArrow className="w-4 h-5 text-(--text-more-arrow)" />
                            </Link>
                        </div>
                    </div>
                </Container>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

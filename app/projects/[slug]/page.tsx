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
                    <Section className="mb-12">
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
                        <p className="max-w-3xl text-[1.1rem] leading-relaxed font-oxygen text-(--description-text) mb-20">
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
                        <Section className="mb-32">
                            <div className="w-full border-t border-b border-(--border-separator) py-12 md:py-16">
                                <h3 className="font-tasa text-2xl font-bold mb-8">Related Articles</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {project.articleLinks.map((article, i) => (
                                        <Link key={i} href={article.url} target="_blank" className="group block">
                                            <article className="border border-(--border-separator) p-6 hover:border-(--border-hover) transition-colors h-full flex flex-col justify-between">
                                                <div>
                                                    <span className="text-xs font-mono uppercase text-muted-foreground mb-2 block">{article.label}</span>
                                                    <h4 className="text-xl font-bold group-hover:underline underline-offset-4 decoration-1">{article.title}</h4>
                                                </div>
                                                <div className="mt-8 flex justify-end">
                                                    <MinimalArrow className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                                </div>
                                            </article>
                                        </Link>
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

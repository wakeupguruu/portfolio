import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { getProjectBySlug, PROJECTS } from "../data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MinimalArrow } from "@/components/minimal-arrow";
import { PhotographsScroll } from "@/components/photographs-scroll";
import { SayHello } from "@/components/say-hello";
import { getProjectContent } from "@/app/lib/markdown";
import ReactMarkdown from "react-markdown";
import { SpecialBox } from "@/components/ui/special-box";
import { Metadata } from "next";

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Guru Vyas`,
        description: project.description,
    };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const content = await getProjectContent(slug);

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
                <Section className="mb-12">
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
                    {/* Markdown Content Section (Replaces old 'Article Links') */}
                    <Section className="mb-16">
                        <article className="prose prose-lg dark:prose-invert max-w-3xl font-oxygen leading-relaxed
                            prose-headings:font-tasa prose-headings:font-bold prose-headings:tracking-tight
                            prose-p:text-(--blog-text) prose-p:leading-8
                            prose-strong:text-foreground
                            prose-code:text-foreground prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                         ">
                            <ReactMarkdown
                                components={{
                                    blockquote: ({ node, ...props }) => <SpecialBox {...(props as any)} />,
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </article>
                    </Section>

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

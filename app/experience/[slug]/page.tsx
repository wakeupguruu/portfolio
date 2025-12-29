import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { SayHello } from "@/components/say-hello";
import { EXPERIENCE } from "../data";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import { SpecialBox } from "@/components/ui/special-box";
import { Metadata } from "next";

interface PageParams {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return EXPERIENCE.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { slug } = await params;
    const item = EXPERIENCE.find((p) => p.slug === slug);

    if (!item) {
        return {
            title: "Experience Not Found",
        };
    }

    return {
        title: `${item.role} @ ${item.company} | Portfolio`,
        description: item.description,
    };
}

export default async function ExperienceDetailPage({ params }: PageParams) {
    const { slug } = await params;
    const item = EXPERIENCE.find((p) => p.slug === slug);

    if (!item) {
        notFound();
    }

    const filePath = path.join(process.cwd(), "content", "experience", `${slug}.md`);
    let content = "";

    try {
        content = await fs.readFile(filePath, "utf-8");
    } catch (error) {
        console.error(`Error reading markdown file for slug ${slug}:`, error);
        // Fallback or 404. Since we have the item in data, we might want to just show the description if md is missing, 
        // but consistently it's better to expect content.
        content = "Content coming soon...";
    }

    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-12 md:mb-20">
                        <div>
                            <div className="mb-8">
                                <div className="flex justify-between items-baseline gap-4 mb-6">
                                    <h1 className="max-w-3xl font-tasa text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed]">
                                        {item.role}
                                    </h1>
                                    <span className="shrink-0 text-xs font-oxygen text-muted-foreground">
                                        {item.period}
                                    </span>
                                </div>
                                <div className="flex items-center w-full mb-6">
                                    <span className="text-xl tracking-wide font-roboto font-bold text-accent whitespace-nowrap">
                                        {item.company}
                                    </span>
                                    <div className="h-px flex-1 bg-border ml-6"></div>
                                </div>
                                <p className="max-w-3xl text-lg text-muted-foreground font-oxygen leading-relaxed">
                                    {item.description}
                                </p>
                                {item.externalLink && item.externalLink !== '#' && (
                                    <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-accent hover:underline decoration-1 underline-offset-4 font-oxygen">
                                        View Project / PR →
                                    </a>
                                )}
                            </div>

                            {/* Main Content */}
                            <article className="prose prose-lg dark:prose-invert max-w-3xl font-oxygen leading-relaxed
                prose-headings:font-tasa prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-3xl
                prose-p:text-(--blog-text) prose-p:leading-8
                prose-li:text-(--blog-text) prose-li:marker:text-accent
                prose-strong:text-foreground
                prose-code:text-foreground prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              ">
                                <ReactMarkdown
                                    components={{
                                        blockquote: ({ node, ...props }) => <SpecialBox {...(props as any)} />,
                                        hr: ({ ...props }) => <hr className="my-8 border-custom-separator" {...props} />,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </article>

                            {/* Footer Content */}
                            <div className="mt-16 max-w-3xl">
                                <div className="h-px w-full bg-border mb-8"></div>
                                <p className="font-oxygen text-muted-foreground leading-relaxed mb-16">
                                    Start a conversation about this role?{" "}
                                    <a href="mailto:vyasguruwork@gmail.com" className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors">
                                        Get in touch
                                    </a>
                                    .
                                </p>
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

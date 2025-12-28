
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { SayHello } from "@/components/say-hello";
import { POSTS } from "../data";
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
    return POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { slug } = await params;
    const post = POSTS.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} | Portfolio`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date, // Note: date format might need parsing if structured data requires ISO
        },
    };
}

export default async function BlogPostPage({ params }: PageParams) {
    const { slug } = await params;
    const post = POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const filePath = path.join(process.cwd(), "content", "blogs", `${slug}.md`);
    let content = "";

    try {
        content = await fs.readFile(filePath, "utf-8");
    } catch (error) {
        console.error(`Error reading markdown file for slug ${slug}:`, error);
        notFound();
    }

    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-12 md:mb-20">
                        <div>
                            <div className="mb-8">
                                <div className="flex justify-between items-baseline gap-4 mb-3">
                                    <h1 className="max-w-3xl font-tasa text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed]">
                                        {post.title}
                                    </h1>
                                    <span className="shrink-0 text-xs font-oxygen text-muted-foreground">
                                        {(post as any).readingTime}
                                    </span>
                                </div>
                                <div className="flex items-center w-full mb-6">
                                    <span className="text-sm tracking-wide font-oxygen uppercase text-muted-foreground whitespace-nowrap">
                                        {post.date}
                                    </span>
                                    <div className="h-px flex-1 bg-border ml-6"></div>
                                </div>
                                {/* Excerpt is usually not shown in detail view if it's redundant with content, but I'll keep it for now if needed, or maybe just remove it as the image didn't clearly show it. User said "header and date section". I will keep excerpt for now but maybe move it below date or remove if not needed. I'll keep it below date. */}
                                <p className="max-w-3xl text-xl text-muted-foreground font-oxygen leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Main Content */}
                            <article className="prose prose-lg dark:prose-invert max-w-3xl font-oxygen leading-relaxed
                prose-headings:font-tasa prose-headings:font-bold prose-headings:tracking-tight
                prose-p:text-(--blog-text) prose-p:leading-8
                prose-strong:text-foreground
                prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              ">
                                <ReactMarkdown
                                    components={{
                                        blockquote: ({ node, ...props }) => <SpecialBox {...(props as any)} />,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </Section>
                </Container>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

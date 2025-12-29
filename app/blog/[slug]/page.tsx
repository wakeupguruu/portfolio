
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
            publishedTime: post.date,
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
                                <p className="max-w-3xl text-xl text-muted-foreground font-oxygen leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>

                            {/* Main Content */}
                            <article className="prose prose-lg dark:prose-invert max-w-3xl font-oxygen leading-relaxed
                prose-headings:font-tasa prose-headings:font-bold prose-headings:tracking-tight
                prose-p:text-(--blog-text) prose-p:leading-8
                prose-li:text-(--blog-text) prose-li:marker:text-accent
                prose-strong:text-foreground
                prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
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
                                    That concludes the article. If you spot any typo or would like to share your
                                    thoughts on this article, please feel free to{" "}
                                    <a href="mailto:vyasguruwork@gmail.com" className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors">
                                        get in touch
                                    </a>
                                    . 👋
                                </p>

                                {/* Important Articles Section */}
                                <div>
                                    <h2 className="font-tasa font-bold text-2xl md:text-3xl mb-8 tracking-tight">
                                        Articles Which Are Important to Me
                                    </h2>

                                    <div className="mb-8">
                                        <h3 className="font-oxygen font-bold text-lg mb-6">2025</h3>
                                        <div className="flex flex-col gap-5">
                                            {POSTS.filter(p => p.slug === 'zulip-open-source').map((p) => (
                                                <a
                                                    key={p.slug}
                                                    href={p.href}
                                                    className="group flex items-center justify-between w-full gap-4"
                                                >
                                                    <span className="font-oxygen text-muted-foreground group-hover:text-foreground group-hover:underline underline-offset-4 decoration-border transition-colors whitespace-nowrap">
                                                        {p.title}
                                                    </span>

                                                    {/* Connecting Line */}
                                                    <div className="h-px bg-border flex-1 group-hover:bg-foreground/20 transition-colors"></div>

                                                    {/* Category Pill */}
                                                    <span className="shrink-0 px-3 py-1 rounded-full border border-border text-xs font-oxygen text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-all">
                                                        Open Source
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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

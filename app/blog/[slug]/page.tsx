
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
        <div className="w-full">
            <div className="pt-[61px] md:pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-8 md:mb-20">
                        <div>
                            <div className="mb-10 md:mb-16">
                                <h1 className="max-w-4xl font-tasa text-[2rem] md:text-5xl font-extrabold leading-[1.1] md:leading-tight tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] mb-4 md:mb-8">
                                    {post.title}
                                </h1>

                                <div className="flex items-center w-full gap-4 md:gap-6">
                                    <span className="shrink-0 text-sm md:text-sm tracking-tight font-oxygen text-muted-foreground uppercase">
                                        {post.date}
                                    </span>
                                    <div className="h-px flex-1 bg-border"></div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <article className="prose prose-sm md:prose-lg dark:prose-invert max-w-3xl font-oxygen leading-relaxed
                prose-headings:font-tasa prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-[0.75rem] md:prose-p:text-[1.125rem] prose-p:text-(--blog-text) prose-p:leading-7 md:prose-p:leading-8 prose-p:tracking-tight md:prose-p:tracking-normal
                prose-li:text-[0.75rem] md:prose-li:text-[1.125rem] prose-li:text-(--blog-text) prose-li:marker:text-accent prose-li:tracking-tight md:prose-li:tracking-normal
                prose-strong:text-foreground
                prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-hr:hidden
              ">
                                <ReactMarkdown
                                    components={{
                                        blockquote: ({ node, ...props }) => <SpecialBox {...(props as any)} />,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </article>

                            {/* Footer Content */}
                            <div className="mt-16 max-w-3xl">
                                <div className="h-px w-full bg-border mb-8"></div>
                                <p className="font-oxygen text-muted-foreground text-[0.75rem] md:text-[1.125rem] leading-7 md:leading-8 tracking-tight md:tracking-normal mb-16">
                                    That concludes the article. If you spot any typo or would like to share your
                                    thoughts on this article, please feel free to{" "}
                                    <a href="mailto:vyasguruwork@gmail.com" className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors">
                                        get in touch
                                    </a>
                                    . 👋
                                </p>

                                {/* Important Articles Section */}
                                <div className="mt-12 md:mt-20">
                                    <div className="flex items-center w-full mb-8">
                                        <h2 className="font-tasa font-bold text-xl md:text-3xl tracking-tight uppercase md:normal-case shrink-0">
                                            Articles Which Are Important to Me
                                        </h2>
                                        <div className="h-px flex-1 bg-border ml-4 md:ml-6"></div>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="font-oxygen font-bold text-base mb-6">2025</h3>
                                        <div className="flex flex-col gap-5">
                                            {POSTS.filter(p => p.slug === 'zulip-open-source').map((p) => (
                                                <a
                                                    key={p.slug}
                                                    href={p.href}
                                                    className="group flex items-center justify-between w-full gap-4 overflow-hidden"
                                                >
                                                    <span className="font-oxygen text-muted-foreground group-hover:text-foreground group-hover:underline underline-offset-4 decoration-border transition-colors truncate text-[0.75rem] md:text-base">
                                                        {p.title}
                                                    </span>

                                                    {/* Connecting Line */}
                                                    <div className="h-px bg-border flex-1 group-hover:bg-foreground/20 transition-colors"></div>

                                                    {/* Category Pill */}
                                                    <span className="shrink-0 px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-border text-[0.55rem] md:text-xs font-oxygen text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-all">
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

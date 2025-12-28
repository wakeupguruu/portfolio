import { Container, Section } from "@/components/ui/section";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { POSTS } from "../data";
import { notFound } from "next/navigation";
import { MinimalArrow } from "@/components/minimal-arrow";
import Link from "next/link";
import { SayHello } from "@/components/say-hello";
import Image from "next/image";

// This is a dynamic route component
export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Filter out current post for "My other articles"
    const otherPosts = POSTS.filter((p) => p.slug !== slug);

    // Group by year
    const groupedPosts = otherPosts.reduce((acc, p) => {
        const year = p.date.split(" ").pop() || "Other";
        if (!acc[year]) acc[year] = [];
        acc[year].push(p);
        return acc;
    }, {} as Record<string, typeof POSTS>);

    // Sort years descending
    const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

    return (
        <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: 'var(--font-newsreader)' }}>
            <Header />

            <article className="pt-32 md:pt-40 pb-0">
                <Container className="max-w-2xl">

                    {/* Header Section: Title Left Aligned */}
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight text-[#1c1917] dark:text-[#ededed] text-left">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-10 text-sm text-muted-foreground font-mono tracking-wide">
                            <span className="uppercase">{post.date}</span>
                        </div>

                        {/* Main Image with Caption */}
                        {post.image && (
                            <figure className="mb-14">
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm bg-muted/20">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                {post.caption && (
                                    <figcaption className="mt-4 text-left text-sm text-muted-foreground font-mono italic">
                                        {post.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )}
                    </header>

                    {/* Content Section */}
                    <Section className="mb-12">
                        <div
                            className="
                    prose prose-lg dark:prose-invert 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-p:text-[1.1rem] prose-p:leading-[1.8] prose-p:text-foreground/90 prose-p:font-serif
                    prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-muted-foreground
                    max-w-none
                "
                            dangerouslySetInnerHTML={{ __html: post.content || "" }}
                        />
                    </Section>

                    {/* Dialogue Text (Reference Style) */}
                    <p className="mb-12 text-lg text-foreground font-serif leading-relaxed">
                        That concludes the article. If you spot any typo or would like to share your thoughts on this article, please feel free to get in touch. 🙆‍♂️
                    </p>

                </Container>
            </article>

            {/* Thick Border */}
            <div className="w-full border-t-4 border-foreground mb-16"></div>

            {/* "My other articles" Section */}
            <Container className="max-w-2xl mb-24">
                <h2 className="text-2xl font-bold tracking-tight mb-12 font-tasa">Articles Which Are Important to Me</h2>

                <div className="flex flex-col gap-12">
                    {years.map(year => (
                        <div key={year}>
                            <h3 className="text-xl font-bold mb-6 font-tasa">{year}</h3>
                            <div className="flex flex-col gap-6">
                                {groupedPosts[year].map(p => (
                                    <Link key={p.slug} href={p.href!} className="group relative grid grid-cols-[1fr_auto] items-baseline gap-4 hover:opacity-70 transition-opacity">
                                        <span className="text-lg font-serif font-medium border-b border-transparent group-hover:border-foreground transition-colors leading-tight">
                                            {p.title}
                                        </span>
                                        <span className="text-sm text-muted-foreground font-mono uppercase tracking-wider shrink-0">
                                            {/* Category placeholder or just a tag */}
                                            Blog
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>


            <SayHello />
            <Footer />
        </div>
    );
}

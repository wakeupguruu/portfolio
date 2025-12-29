import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { SayHello } from "@/components/say-hello";
import { POSTS } from "./data";
import Link from "next/link";
import { MinimalArrow } from "@/components/minimal-arrow";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Guru's Blog",
    description: "My thoughts on software engineering, open source, and building products.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-12 md:pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-12">
                        <h1 className="font-tasa text-[2rem] md:text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem]">
                            All Articles
                        </h1>
                        <p
                            className="max-w-2xl mt-6 tracking-tight text-[0.95rem] md:text-[1.05rem] leading-relaxed font-oxygen"
                            style={{ color: "var(--description-text)" }}
                        >
                            I've recently started writing to document my technical journey and the things I learn along the way. I love the clarity that comes from structuring my thoughts and sharing them with the community. You can also follow me on <a href="https://medium.com/@vyasguru44" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-4 hover:text-foreground transition-colors">Medium</a>.
                        </p>
                    </Section>
                </Container>

                <Container>
                    {/* Two-column grid with center divider and row separators - Reused from Home */}
                    <div className="w-screen relative left-[calc(-50vw+50%)] border-t border-b border-l-0 border-r-0 border-custom-separator">
                        <div className="mx-auto w-full max-w-screen-2xl px-5 md:px-12">
                            <div className="w-full md:w-[79%]">
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    {POSTS.map((post, i) => {
                                        const isLeft = i % 2 === 0;
                                        const isLast = i === POSTS.length - 1;

                                        // Row Calculation for Desktop Grid
                                        const totalRows = Math.ceil(POSTS.length / 2);
                                        const currentRow = Math.floor(i / 2);
                                        const isLastRow = currentRow === totalRows - 1;

                                        return (
                                            <article
                                                key={post.title}
                                                className="w-full relative py-6 pl-4 pr-0 md:px-5"
                                            >
                                                <p
                                                    className="text-sm tracking-wide font-oxygen uppercase scale-y-110"
                                                    style={{ color: "var(--description-text)" }}
                                                >{post.date}</p>
                                                <Link href={post.href} className="mt-3 md:mt-1 block text-[1.4rem] font-black leading-tight tracking-wide font-sans scale-y-[1.25] text-[#1c1917] dark:text-[#ededed]">
                                                    {post.title}
                                                </Link>
                                                <p
                                                    className="mt-4 text-sm scale-y-[1.05] leading-relaxed font-oxygen tracking-tight"
                                                    style={{ color: "var(--description-text)" }}
                                                >{post.excerpt}</p>

                                                {/* Dividers Layout Logic */}

                                                {/* Mobile Horizontal Separator: Visible only on mobile (< md), for all except last item */}
                                                {!isLast && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-(--border-separator) md:hidden" />
                                                )}

                                                {/* Desktop Vertical Divider: Visible only on desktop (md+), for left column items */}
                                                {isLeft && (
                                                    <div className="hidden md:block absolute right-0 top-5 bottom-5 w-px bg-(--border-separator)" />
                                                )}

                                                {/* Desktop Horizontal Divider: Visible only on desktop (md+), between rows */}
                                                {!isLastRow && (
                                                    <div
                                                        className={`hidden md:block absolute bottom-0 h-px bg-(--border-separator) ${isLeft ? "left-5 right-5" : "left-5 right-0"
                                                            }`}
                                                    />
                                                )}
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Pagination Footer */}
                <Section className="mb-12 md:mb-24 mt-12">
                    <Container>
                        <div className="w-full md:w-[79%] flex flex-col items-center justify-center gap-4">
                            <div className="flex items-center gap-12 md:gap-24">
                                <MinimalArrow className="w-6 h-6 rotate-[-135deg] text-muted-foreground z-0" />
                                <span className="font-tasa text-2xl font-bold tracking-widest">
                                    G<span className="text-accent">u</span>ru
                                </span>
                                <MinimalArrow className="w-6 h-6 rotate-45 text-foreground z-0" />
                            </div>
                            <div className="flex items-center gap-3 font-mono text-sm tracking-widest text-muted-foreground">
                                <span className="text-foreground font-bold">1</span>
                            </div>
                        </div>
                    </Container>
                </Section>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

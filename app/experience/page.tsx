import { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { SayHello } from "@/components/say-hello";
import { EXPERIENCE } from "./data";
import Link from "next/link";
import { MinimalArrow } from "@/components/minimal-arrow";

export const metadata: Metadata = {
    title: "Experience of Guru",
};

export default function ExperiencePage() {
    return (
        <div className="w-full">
            <div className="pt-[61px] md:pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-12">
                        <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem]">
                            Experience
                        </h1>
                    </Section>
                </Container>

                <Container>
                    {/* Two-column grid with center divider and row separators - Reused from Blog/Home */}
                    <div className="w-screen relative left-[calc(-50vw+50%)] border-t border-b border-l-0 border-r-0 border-custom-separator">
                        <div className="mx-auto w-full max-w-screen-2xl px-5 md:px-12">
                            <div className="w-full md:w-[79%]">
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    {EXPERIENCE.map((item, i) => {
                                        const isLeft = i % 2 === 0;
                                        const isLast = i === EXPERIENCE.length - 1;

                                        // Row Calculation for Desktop Grid
                                        const totalRows = Math.ceil(EXPERIENCE.length / 2);
                                        const currentRow = Math.floor(i / 2);
                                        const isLastRow = currentRow === totalRows - 1;

                                        return (
                                            <article
                                                key={item.role + item.company}
                                                className="w-full relative py-6 pl-4 pr-0 md:px-5"
                                            >
                                                <p
                                                    className="text-sm tracking-wide font-oxygen uppercase scale-y-110"
                                                    style={{ color: "var(--description-text)" }}
                                                >{item.period}</p>

                                                <div className="mt-3 md:mt-1">
                                                    <Link href={item.href} className="block text-[1.4rem] font-black leading-tight tracking-wide font-sans scale-y-[1.25] text-foreground">
                                                        {item.role}
                                                    </Link>
                                                    <p className="mt-2 text-base font-bold text-accent">
                                                        {item.company}
                                                    </p>
                                                </div>

                                                <p
                                                    className="mt-4 text-sm scale-y-[1.05] leading-relaxed font-oxygen tracking-tight"
                                                    style={{ color: "var(--description-text)" }}
                                                >
                                                    {item.description}
                                                </p>

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

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}

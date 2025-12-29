import { Header } from "@/components/Header";
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
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-12">
                        <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem]">
                            Experience
                        </h1>
                    </Section>
                </Container>

                <Container>
                    {/* Two-column grid with center divider and row separators - Reused from Blog/Home */}
                    <div className="w-screen relative left-[calc(-50vw+50%)] border-t border-b border-custom-separator">
                        <div className="mx-auto w-full max-w-screen-2xl px-5 md:px-12">
                            <div className="w-full md:w-[79%]">
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    {EXPERIENCE.map((item, i) => {
                                        const isLeft = i % 2 === 0;
                                        const totalRows = Math.ceil(EXPERIENCE.length / 2);
                                        const currentRow = Math.floor(i / 2);
                                        const isLastRow = currentRow === totalRows - 1;

                                        let classes = "relative px-5 py-6 border-custom-separator";

                                        // Vertical Divider (Left Column Only)
                                        if (isLeft) {
                                            classes += " after:content-[''] after:absolute after:right-0 after:top-5 after:bottom-5 after:w-px after:bg-[var(--border-separator)]";
                                        }

                                        // Horizontal Divider
                                        // Add bottom borders to all items except the last row.
                                        if (!isLastRow) {
                                            if (isLeft) classes += " before:content-[''] before:absolute before:bottom-0 before:left-5 before:right-5 before:h-px before:bg-[var(--border-separator)]";
                                            else classes += " before:content-[''] before:absolute before:bottom-0 before:right-0 before:left-5 before:h-px before:bg-[var(--border-separator)]";
                                        }

                                        return (
                                            <article
                                                key={item.role + item.company}
                                                className={classes}
                                                style={{ borderColor: "var(--border-separator)" }}
                                            >
                                                <p
                                                    className="text-sm tracking-wide font-oxygen uppercase scale-y-110"
                                                    style={{ color: "var(--description-text)" }}
                                                >{item.period}</p>

                                                <div className="mt-1">
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

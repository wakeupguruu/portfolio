import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Section } from "@/components/ui/section";
import { PROJECTS } from "./data";
import Link from "next/link";
import { MinimalArrow } from "@/components/minimal-arrow";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen font-interTight bg-background text-foreground transition-colors duration-500">
            <Header />

            <div className="pt-24 pb-24 w-full overflow-x-hidden">
                {/* Intro Section */}
                <Container>
                    <Section className="mb-24">
                        <p className="text-4xl md:text-5xl font-black tracking-tighter mb-8 scale-y-110 origin-left text-(--hello-text)">
                            Find my favorite projects on <a className="underline decoration-accent hover:decoration-(--hello-text) transition-colors duration-300 underline-offset-4" href="https://github.com/wakeupguruu" target="_blank" rel="noopener noreferrer">GitHub</a> and by<br />
                            scrolling down.
                        </p>
                        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground font-oxygen">
                            If you want to get an idea of my coding style, check out my <a href="https://github.com/wakeupguruu" target="_blank" rel="noopener noreferrer" className="text-(--hello-text) hover:underline underline-offset-4">open source projects on GitHub</a>. Or find a selection of my freelance projects here.
                        </p>
                    </Section>
                </Container>

                {/* Projects List */}
                <Section className="mb-32">
                    <Container>
                        <div className="flex flex-col">
                            {PROJECTS.map((project, index) => (
                                <div
                                    key={project.title}
                                    className="group relative border-t border-border py-12 transition-colors hover:bg-muted/50"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                                        {/* Year & Category - Left Column */}
                                        <div className="md:col-span-3 flex flex-row md:flex-col justify-between md:justify-start gap-2">
                                            <span className="font-mono text-sm text-muted-foreground">{project.year}</span>
                                            <span className="font-oxygen text-sm text-foreground/80">{project.category}</span>
                                        </div>

                                        {/* Title & Description - Middle Column */}
                                        <div className="md:col-span-6">
                                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                                                <Link href={project.href} className="flex items-center gap-2">
                                                    {project.title}
                                                </Link>
                                            </h2>
                                            <p className="text-muted-foreground leading-relaxed font-oxygen max-w-xl">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Links/Arrow - Right Column */}
                                        <div className="md:col-span-3 flex md:justify-end items-start pt-2 md:pt-0">
                                            <div className="flex gap-4">
                                                {project.links.length > 0 ? (
                                                    project.links.map(link => (
                                                        <a
                                                            key={link.label}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
                                                        >
                                                            {link.label}
                                                        </a>
                                                    ))
                                                ) : (
                                                    <Link href={project.href} className="inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                                        <MinimalArrow className="w-8 h-8 -rotate-45" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Bottom Border for the last item */}
                            <div className="border-t border-border"></div>
                        </div>
                    </Container>
                </Section>

                <Footer />
            </div>
        </div>
    );
}

import { Container, Section } from "@/components/ui/section";
import { Footer } from "@/components/Footer";
import { SayHello } from "@/components/say-hello";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Guru's Resume",
};

export default function ResumePage() {

    return (
        <div className="w-full">
            <div className="pt-[61px] md:pt-24 w-full overflow-x-hidden">
                <Container>
                    <Section className="mb-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem] mb-4">
                                    Resume
                                </h1>
                                <p className="text-muted-foreground font-oxygen text-lg">
                                    My professional experience and technical background.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <a
                                    href="/GuruVyas_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium hover:text-accent transition-colors underline underline-offset-4 decoration-accent/30 hover:decoration-accent font-oxygen uppercase tracking-widest"
                                >
                                    View Fullscreen
                                </a>
                                <a
                                    href="/GuruVyas_Resume.pdf"
                                    download
                                    className="px-6 py-2 bg-foreground text-background font-medium rounded-full hover:bg-accent hover:text-foreground transition-all duration-300 font-oxygen text-sm uppercase tracking-widest"
                                >
                                    Download PDF
                                </a>
                            </div>
                        </div>
                    </Section>

                    <Section className="mb-20">
                        <div className="w-full max-w-5xl mx-auto h-[600px] md:h-[900px] bg-muted/10 border border-border rounded-xl overflow-hidden shadow-sm group relative">
                            {/* PDF Viewer */}
                            <object
                                data="/GuruVyas_Resume.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0"
                                type="application/pdf"
                                className="w-full h-full"
                            >
                                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                                    <p className="mb-6 text-muted-foreground font-oxygen">Unable to display PDF directly in your browser.</p>
                                    <a
                                        href="/GuruVyas_Resume.pdf"
                                        target="_blank"
                                        className="px-8 py-3 bg-accent text-foreground font-bold rounded-lg"
                                    >
                                        Open Resume in New Tab
                                    </a>
                                </div>
                            </object>
                        </div>
                    </Section>
                </Container>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}
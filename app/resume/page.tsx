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
                    <Section className="mb-5 text-center">
                        <h1 className="font-tasa text-4xl font-extrabold leading-none tracking-[-0.04em] text-[#1c1917] dark:text-[#ededed] sm:text-[3.4rem] mb-4">
                            Guru's Resume
                        </h1>
                        <a
                            href="/GuruVyas_Resume.pdf"
                            download
                            className="text-xl text-muted-foreground hover:text-foreground link-custom-underline transition-colors pb-1 font-oxygen"
                        >
                            Download the PDF
                        </a>
                    </Section>

                    <Section className="mb-20">
                        <div className="w-full max-w-3xl mx-auto aspect-[1/1.4] md:aspect-[1/1.2] bg-muted/20 border border-border rounded-lg overflow-hidden">
                            <iframe
                                src="/GuruVyas_Resume.pdf#view=FitH"
                                className="w-full h-full"
                                title="Resume Viewer"
                            />
                        </div>
                    </Section>
                </Container>


                <SayHello />
                <Footer />
            </div>
        </div>
    );
}
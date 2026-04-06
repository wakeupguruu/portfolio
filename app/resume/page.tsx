import { Container, Section } from "@/components/ui/section";
import { Footer } from "@/components/Footer";
import { SayHello } from "@/components/say-hello";
import { Metadata } from "next";
import { ResumeWrapper } from "@/components/resume-wrapper";
export const metadata: Metadata = {
    title: "Guru's Resume",
};

export default function ResumePage() {

    return (
        <div className="w-full">
            <div className="pt-[61px] md:pt-24 w-full overflow-x-hidden">
                <Container>
                    <ResumeWrapper />
                </Container>

                <SayHello />
                <Footer />
            </div>
        </div>
    );
}
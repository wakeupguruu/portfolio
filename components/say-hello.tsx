import { Container } from "@/components/ui/section";
import { MinimalArrow } from "@/components/minimal-arrow";
import { ThemeToggle } from "@/components/theme-toggle";

export function SayHello() {
    return (
        <>
            <div className="w-full border-t border-custom-separator px-4" style={{ borderColor: 'var(--border-separator)' }}></div>

            {/* Say hello - Full Width */}
            <div className="w-full section-hello">
                <Container className="mb-0 pt-25 pb-10"> {/* Increased top padding again */}
                    <h3 className="mb-10 text-3xl font-bold font-tasa">Say hello</h3>

                    {/* List Container - No top border on title, Borders handled by items  */}
                    <ul className="flex flex-col">
                        {/* E-Mail */}
                        <li className="relative grid grid-cols-[1fr_auto] md:grid-cols-[335px_1fr_auto] items-center py-5 gap-y-1 group cursor-pointer transition-colors w-full md:w-[79%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:right-4 after:bg-(--border-separator) after:transition-colors hover:after:bg-(--border-hover)">
                            <span className="text-base font-bold font-mono scale-y-[1.075] col-span-2 md:col-span-1" style={{ color: 'var(--hello-text)' }}>E-Mail</span>
                            <div className="text-base flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 transition-colors" style={{ color: 'var(--hello-text)' }}>
                                <span className="font-source-code flex items-center">
                                    vyasguruwork@gmail.com
                                </span>
                            </div>
                            <div className="flex justify-end pr-4">
                                <MinimalArrow className="w-6 h-6 text-[#1c1917] dark:text-[#ededed]" />
                            </div>
                            <a href="mailto:vyasguruwork@gmail.com" className="absolute inset-0 z-10" aria-label="Send email"></a>
                        </li>

                        {/* LinkedIn */}
                        <li className="relative grid grid-cols-[1fr_auto] md:grid-cols-[335px_1fr_auto] items-center py-5 gap-y-1 group cursor-pointer transition-colors w-full md:w-[79%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:right-4 after:bg-(--border-separator) after:transition-colors hover:after:bg-(--border-hover)">
                            <span className="text-base font-bold font-tasa col-span-2 md:col-span-1" style={{ color: 'var(--hello-text)' }}>LinkedIn</span>
                            <div className="text-base flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 transition-colors font-source-code" style={{ color: 'var(--hello-text)' }}>
                                linkedin.com/in/guru-vyas
                            </div>
                            <div className="flex justify-end pr-4">
                                <MinimalArrow className="w-6 h-6 text-[#1c1917] dark:text-[#ededed]" />
                            </div>
                            <a href="https://www.linkedin.com/in/guru-vyas-16a0b82a7/" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="Visit LinkedIn"></a>
                        </li>

                        {/* Instagram */}
                        <li className="relative grid grid-cols-[1fr_auto] md:grid-cols-[335px_1fr_auto] items-center py-5 gap-y-1 group cursor-pointer transition-colors w-full md:w-[79%] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:right-4 after:bg-(--border-separator) after:transition-colors hover:after:bg-(--border-hover)">
                            <span className="text-base font-bold col-span-2 md:col-span-1" style={{ color: 'var(--hello-text)' }}>Instagram</span>
                            <div className="text-base flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4 transition-colors font-source-code" style={{ color: 'var(--hello-text)' }}>
                                instagram.com/guruthlesss
                            </div>
                            <div className="flex justify-end pr-4">
                                <MinimalArrow className="w-6 h-6 text-[#1c1917] dark:text-[#ededed]" />
                            </div>
                            <a href="https://www.instagram.com/guruthlesss/" target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="Visit Instagram"></a>
                        </li>
                    </ul>

                    {/* Lights On Toggle - Moved here, Aligned Right, Padded */}
                    <div className="flex justify-end mt-28 w-full md:w-[79%]">
                        <ThemeToggle withText={true} />
                    </div>
                </Container>
            </div>
        </>
    );
}

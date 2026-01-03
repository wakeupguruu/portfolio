"use client";


import { cn } from "@/lib/utils";

interface MinimalArrowProps {
    className?: string;
}

export function MinimalArrow({ className }: MinimalArrowProps) {
    return (
        <div className={cn("relative z-10 w-6 h-6 flex items-center justify-center text-black dark:text-white", className)}>
            <div
                className="w-full h-full transition-all! duration-500! ease-[cubic-bezier(0.2,0.8,0.2,1)]! -rotate-45 group-hover:rotate-0"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-full h-full"
                    style={{ fill: 'var(--hello-text)' }}
                >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                </svg>
            </div>
        </div>
    );
}

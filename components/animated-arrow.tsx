"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimatedArrowProps {
    className?: string;
}

export function AnimatedArrow({ className }: AnimatedArrowProps) {
    return (
        <div className={cn("relative w-6 h-6", className)}>
            {/* Outward Arrow (Default Visible, Fades Out on Hover) */}
            <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 flex items-center justify-center">
                <Image
                    src="/arrow_outward_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Go"
                    width={24}
                    height={24}
                    className="w-full h-full dark:invert"
                />
            </div>

            {/* Forward Arrow (Hidden by Default, Fades In on Hover) */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <Image
                    src="/arrow_forward_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
                    alt="Go"
                    width={24}
                    height={24}
                    className="w-full h-full dark:invert"
                />
            </div>
        </div>
    );
}

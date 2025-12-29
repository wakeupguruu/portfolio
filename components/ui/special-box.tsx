
import React from "react";
import { cn } from "@/lib/utils";

interface SpecialBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export function SpecialBox({ children, className, ...props }: SpecialBoxProps) {
    return (
        <div className={cn("relative mb-8 w-fit max-w-full md:max-w-2/3 not-prose", className)} {...props}>
            {/* Inner Content Box (Full Border) */}
            <div className="relative z-10 border-2 border-[#89937a] p-4 w-full bg-background transition-colors duration-500">
                <div className="font-source-code text-base leading-relaxed text-(--description-text) [word-spacing:-4px]">
                    {children}
                </div>
            </div>

            {/* Outer/Offset Border (Right and Bottom Only) */}
            <div className="absolute top-[5px] left-[5px] w-full h-full border-r-2 border-b-2 border-[#89937a] z-0 pointer-events-none transition-colors duration-500"></div>
        </div>
    );
}

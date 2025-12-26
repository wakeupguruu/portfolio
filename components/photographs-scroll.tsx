"use client";

import { useEffect, useRef } from "react";

interface PhotographsScrollProps {
    children: React.ReactNode;
}

export function PhotographsScroll({ children }: PhotographsScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const handleWheel = (e: WheelEvent) => {
            // If Shift key is held
            if (e.shiftKey) {
                // Map vertical scroll (deltaY) to horizontal scroll if deltaY exists
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    element.scrollLeft += e.deltaY * 3;
                }
                // If the event already has deltaX (standard Shift+Scroll), custom handling isn't usually needed 
                // as overflow-x-auto handles it. 
                // But we explicitly handle deltaY -> scrollLeft to ensure it works for all inputs.
            }
        };

        // Use passive: false to allow preventDefault
        element.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            element.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto w-full no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {children}
        </div>
    );
}

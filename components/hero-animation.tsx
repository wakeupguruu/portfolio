"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeroAnimationProps {
    children: React.ReactNode;
    className?: string;
}

export function HeroAnimation({ children, className }: HeroAnimationProps) {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 3000); // Stop after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            {/* Sound Waves - Only visible when animating */}
            {isAnimating && (
                <>
                    <SoundWave side="left" delay={0} />
                    <SoundWave side="left" delay={0.2} />
                    <SoundWave side="right" delay={0} />
                    <SoundWave side="right" delay={0.2} />
                </>
            )}

            {/* Headbanging Avatar */}
            <motion.div
                animate={isAnimating ? {
                    rotate: [0, -3, 3, -3, 0],
                    y: [0, 2, 0, 2, 0],
                } : {
                    rotate: 0,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    repeat: isAnimating ? Infinity : 0,
                    ease: "linear",
                    repeatType: "mirror"
                }}
                className="relative z-10 origin-bottom"
            >
                {children}
            </motion.div>
        </div>
    );
}

function SoundWave({ side, delay }: { side: "left" | "right"; delay: number }) {
    const isLeft = side === "left";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, x: isLeft ? 10 : -10 }}
            animate={{
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.5],
                x: isLeft ? -15 : 15, // Move outwards
            }}
            transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
            }}
            className={cn(
                "absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[3px] border-foreground/40",
                isLeft ? "-left-2" : "-right-2"
            )}
            style={{
                zIndex: 0,
            }}
        />
    );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MusicNotes() {
    const [notes, setNotes] = useState<{ id: number; x: number; delay: number }[]>([]);

    useEffect(() => {
        // Determine if we should reduce animation for accessibility preferences
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        setNotes([
            { id: 1, x: 0, delay: 0 },
            { id: 2, x: 20, delay: 1.2 },
            { id: 3, x: -20, delay: 2.4 },
        ]);
    }, []);

    return (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none w-20 h-20 overflow-visible flex items-end justify-center">
            {notes.map((note) => (
                <Note key={note.id} x={note.x} delay={note.delay} />
            ))}
        </div>
    );
}

function Note({ x, delay }: { x: number; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, x: x }}
            animate={{
                opacity: [0, 1, 0],
                y: -40,
                x: x + (Math.random() * 10 - 5), // Slight drift
            }}
            transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
            }}
            className="absolute bottom-0 text-foreground/60 text-xl font-bold"
        >
            {Math.random() > 0.5 ? "♪" : "♫"}
        </motion.div>
    );
}

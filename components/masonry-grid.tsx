"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Photo {
    id: string;
    src: string;
    alt: string;
    caption?: string;
    className?: string; // Allow custom classes per photo
}

interface MasonryGridProps {
    // Array of columns, where each column is an array of Photos
    columns: Photo[][];
}

interface ActivePhotoState {
    photo: Photo;
    rect: DOMRect;
    phase: 'uplift' | 'centered';
}

export function MasonryGrid({ columns }: MasonryGridProps) {
    const [activeState, setActiveState] = useState<ActivePhotoState | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeState) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeState]);

    const handlePhotoClick = (photo: Photo, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        // 1. Set initial state with the captured rect
        setActiveState({
            photo,
            rect,
            phase: 'uplift'
        });

        // 2. Schedule the move to center after 1 second (as requested "after a sec or two")
        setTimeout(() => {
            setActiveState(prev => prev ? { ...prev, phase: 'centered' } : null);
        }, 1200);
    };

    const handleClose = () => {
        setActiveState(null);
    };

    return (
        <>
            {/* Container: Stack on mobile, 3 columns side-by-side on desktop */}
            <div className="flex flex-col md:flex-row gap-8 w-full min-w-full">
                {columns.map((columnPhotos, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-16 flex-1">
                        {columnPhotos.map((photo, i) => (
                            <motion.div
                                key={photo.id}
                                className="group cursor-zoom-in"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={(e) => handlePhotoClick(photo, e)}
                            >
                                {/* Wrapper to handle the "Ghost Slot" effect */}
                                {/* Content is invisible (opacity-0) if this specific photo is active, acting as a placeholder */}
                                <div className={cn(
                                    "relative w-full overflow-hidden bg-gray-100 dark:bg-zinc-800 transition-opacity duration-300",
                                    activeState?.photo.id === photo.id ? "opacity-0" : "opacity-100"
                                )}>
                                    <div className="w-full h-full">
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            width={800}
                                            height={600}
                                            className={cn(
                                                "w-full h-auto max-h-[600px] object-cover transition-transform duration-700", // Removed group-hover:scale-105
                                                photo.className
                                            )}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                </div>
                                {photo.caption && (
                                    <p className="mt-4 text-xs font-oxygen tracking-widest uppercase text-muted-foreground text-center transition-colors duration-300 group-hover:text-foreground">
                                        {photo.caption}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {activeState && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 bg-transparent backdrop-blur-xl cursor-zoom-out"
                        onClick={handleClose}
                    >
                        {/* 
                            The Animated Image Container.
                            We manually animate "top/left/width/height" to move from Grid Spot -> Center.
                        */}
                        <motion.div
                            initial={{
                                position: "fixed",
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                x: 0,
                                y: 0,
                                zIndex: 101, // Ensure it's above the backdrop
                            }}
                            animate={activeState.phase === 'uplift' ? {
                                // Phase 1: Uplift "a little"
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1.1,
                                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                                transition: { duration: 0.4, ease: "easeOut" }
                            } : {
                                // Phase 2: Travel to Center
                                // We use fixed values that guarantee centering clearly
                                top: "50%",
                                left: "50%",
                                width: "90vw",
                                height: "90vh",
                                x: "-50%",
                                y: "-50%",
                                scale: 1, // Reset scale as we are now growing the container itself
                                boxShadow: "none",
                                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                            }}
                            exit={{
                                // Return to origin
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                x: 0,
                                y: 0,
                                scale: 1,
                                opacity: 0,
                                transition: { duration: 0.5 }
                            }}
                            className="block overflow-hidden rounded-md" // Optional rounding
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={activeState.photo.src}
                                alt={activeState.photo.alt}
                                fill
                                className="object-contain" // Ensures full image is visible, no crop
                                priority
                            />
                        </motion.div>

                        {/* Caption - Only show when centered */}
                        {activeState.photo.caption && activeState.phase === 'centered' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-8 left-0 right-0 text-center text-sm font-oxygen tracking-widest uppercase text-foreground/80 z-102"
                            >
                                {activeState.photo.caption}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

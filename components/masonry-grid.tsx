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
    targetRect: { top: number; left: number; width: number; height: number };
    phase: 'uplift' | 'centered';
    isLoaded: boolean;
    initialSrc: string; // The low-res/cached source from the grid
}

export function MasonryGrid({ columns }: MasonryGridProps) {
    const [activeState, setActiveState] = useState<ActivePhotoState | null>(null);
    const [exitingPhotoId, setExitingPhotoId] = useState<string | null>(null);

    // Close modal on scroll
    useEffect(() => {
        if (activeState) {
            const handleScroll = () => {
                setExitingPhotoId(activeState.photo.id);
                setActiveState(null);
            };
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [activeState]);

    // Transition Uplift -> Centered once loaded
    useEffect(() => {
        if (activeState && activeState.phase === 'uplift' && activeState.isLoaded) {
            const timer = setTimeout(() => {
                setActiveState(prev => prev ? { ...prev, phase: 'centered' } : null);
            }, 1000); // 1s wait AFTER load
            return () => clearTimeout(timer);
        }
    }, [activeState?.phase, activeState?.isLoaded]);

    const handlePhotoClick = (photo: Photo, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const imgElement = e.currentTarget.querySelector("img");
        const initialSrc = imgElement?.currentSrc || photo.src; // Fallback to src if currentSrc fails

        // Calculate target centered rect (90vw / 90vh)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const targetWidth = viewportWidth * 0.9;
        const targetHeight = viewportHeight * 0.9;
        const targetTop = (viewportHeight - targetHeight) / 2;
        const targetLeft = (viewportWidth - targetWidth) / 2;

        setActiveState({
            photo,
            rect,
            targetRect: {
                top: targetTop,
                left: targetLeft,
                width: targetWidth,
                height: targetHeight
            },
            phase: 'uplift',
            isLoaded: false,
            initialSrc
        });
    };

    const handleClose = () => {
        if (activeState) {
            setExitingPhotoId(activeState.photo.id);
            setActiveState(null);
        }
    };

    return (
        <>
            {/* ... Grid items ... */}
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
                                <div className={cn(
                                    "relative w-full overflow-hidden bg-gray-100 dark:bg-zinc-800 transition-opacity duration-300",
                                    (activeState?.photo.id === photo.id || exitingPhotoId === photo.id) ? "opacity-0" : "opacity-100"
                                )}>
                                    <div className="w-full h-full">
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            width={800}
                                            height={600}
                                            className={cn(
                                                "w-full h-auto max-h-[600px] object-cover transition-transform duration-700",
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

            <AnimatePresence onExitComplete={() => setExitingPhotoId(null)}>
                {activeState && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 bg-transparent backdrop-blur-md cursor-zoom-out"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{
                                position: "fixed",
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                zIndex: 101,
                            }}
                            animate={activeState.phase === 'uplift' ? {
                                // Phase 1: Uplift
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1.1,
                                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
                                transition: { duration: 0.4, ease: "easeOut" }
                            } : {
                                // Phase 2: Center (Straight Line)
                                top: activeState.targetRect.top,
                                left: activeState.targetRect.left,
                                width: activeState.targetRect.width,
                                height: activeState.targetRect.height,
                                scale: 1,
                                boxShadow: "none",
                                transition: { duration: 0.8, ease: "easeInOut" }
                            }}
                            exit={{
                                // Return to origin
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1,
                                opacity: 1, // Keep opacity 1 so it doesn't vanish
                                transition: { duration: 0.5, ease: "easeInOut" }
                            }}
                            className="block overflow-hidden rounded-md relative"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                        >
                            {/* 1. Low-Res / Cached Preview (Immediate) */}
                            {/* We use a standard img tag to ensure it uses the browser cache of the 'currentSrc' immediately */}
                            <img
                                src={activeState.initialSrc}
                                alt={activeState.photo.alt}
                                className="absolute inset-0 w-full h-full object-contain"
                            />

                            {/* 2. High-Res Image (Fades in) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeState.isLoaded ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={activeState.photo.src}
                                    alt={activeState.photo.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                    onLoad={() => {
                                        setActiveState(prev => prev ? { ...prev, isLoaded: true } : null);
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

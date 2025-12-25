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

    // Transition Uplift -> Centered (Purely time-based, Step 2: No load blocking)
    useEffect(() => {
        if (activeState && activeState.phase === 'uplift') {
            // Rule 3: Overlap phases to prevent velocity reset
            // Uplift duration is 300ms, strictly switch at 250ms
            const timer = setTimeout(() => {
                setActiveState(prev => prev ? { ...prev, phase: 'centered' } : null);
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [activeState?.phase]);

    const handlePhotoClick = (photo: Photo, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const imgElement = e.currentTarget.querySelector("img");
        const initialSrc = imgElement?.currentSrc || photo.src;

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
                                    (activeState?.photo.id === photo.id || exitingPhotoId === photo.id) ? "opacity-0" : "opacity-100" // Rule 1: Immediate hide
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
                        animate={{
                            opacity: activeState.phase === 'centered' ? 1 : 0
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.4 } }}
                        transition={{
                            // Rule 5: Blur triggers after motion starts (0.2s delay)
                            delay: activeState.phase === 'centered' ? 0.2 : 0,
                            duration: 0.5
                        }}
                        className="fixed inset-0 z-[45] bg-background/80 backdrop-blur-md cursor-zoom-out"
                        onClick={handleClose}
                    >
                        <motion.div
                            initial={{
                                position: "fixed", // Rule 2: Fixed from start
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1,
                                borderRadius: "0px",
                                zIndex: 48, // Rule 4: Start below header
                            }}
                            animate={activeState.phase === 'uplift' ? {
                                // Phase 1: Uplift
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1.06,
                                borderRadius: "0px",
                                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                                zIndex: 48,
                                transition: { duration: 0.3, ease: "easeOut" }
                            } : {
                                // Phase 2: Center
                                top: activeState.targetRect.top,
                                left: activeState.targetRect.left,
                                width: activeState.targetRect.width,
                                height: activeState.targetRect.height,
                                scale: 1,
                                boxShadow: "none",
                                borderRadius: "0px",
                                zIndex: 48, // Maintain z-48 during flight
                                transition: {
                                    boxShadow: { duration: 0.2, ease: "linear" },
                                    default: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
                                },
                                transitionEnd: {
                                    borderRadius: "4px",
                                    zIndex: 100 // Rule 4: Specific late promotion
                                }
                            }}
                            exit={{
                                // Rule 6: True Reversal
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1,
                                borderRadius: "0px",
                                boxShadow: "none",
                                opacity: 1,
                                zIndex: 48, // Demote immediately on exit
                                transition: {
                                    duration: 0.65,
                                    ease: "easeInOut" // No spring
                                }
                            }}
                            className="block overflow-hidden relative"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose();
                            }}
                        >
                            {/* Step 2: Immediate Low-Res Preview */}
                            <img
                                src={activeState.initialSrc}
                                alt={activeState.photo.alt}
                                className="absolute inset-0 w-full h-full object-contain"
                            />

                            {/* Step 6: Silent High-Res Crossfade */}
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

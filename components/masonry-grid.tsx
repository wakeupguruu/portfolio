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
    phase: 'uplift' | 'centered' | 'returning'; // Explicit 3-Phase State
    isLoaded: boolean;
    initialSrc: string; // The low-res/cached source from the grid
}

export function MasonryGrid({ columns }: MasonryGridProps) {
    const [activeState, setActiveState] = useState<ActivePhotoState | null>(null);
    const [exitingPhotoId, setExitingPhotoId] = useState<string | null>(null);
    const [minUpliftElapsed, setMinUpliftElapsed] = useState(false);
    const [isBelowHeader, setIsBelowHeader] = useState(false); // Controls z-index flip

    // Close on scroll
    useEffect(() => {
        if (activeState && activeState.phase !== 'returning') {
            const handleScroll = () => {
                // If scrolling happens, force return immediately
                handleClose();
            };
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [activeState]);

    // Timer: Enforce minimum uplift duration (200ms)
    useEffect(() => {
        if (activeState && activeState.phase === 'uplift') {
            const timer = setTimeout(() => {
                setMinUpliftElapsed(true);
            }, 200);
            return () => clearTimeout(timer);
        } else {
            // Reset when closed or changing phase
            if (!activeState) {
                setMinUpliftElapsed(false);
                setIsBelowHeader(false); // Reset z-index state
            }
        }
    }, [activeState?.phase]);

    // Transition Logic: Uplift -> Centered
    // STRICT RULE: Only move when BOTH (Min Time Passed) AND (Image Loaded) are true.
    useEffect(() => {
        if (
            activeState &&
            activeState.phase === 'uplift' &&
            activeState.isLoaded &&
            minUpliftElapsed
        ) {
            setActiveState(prev => prev ? { ...prev, phase: 'centered' } : null);
        }
    }, [activeState?.phase, activeState?.isLoaded, minUpliftElapsed]);

    const handlePhotoClick = (photo: Photo, e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const imgElement = e.currentTarget.querySelector("img");
        const initialSrc = imgElement?.currentSrc || photo.src;

        // Get natural dimensions to ensure target aspect ratio matches the image
        // fallback to rect aspect ratio if natural dims missing (unlikely)
        const naturalWidth = imgElement?.naturalWidth || rect.width;
        const naturalHeight = imgElement?.naturalHeight || rect.height;
        const imageAspectRatio = naturalWidth / naturalHeight;

        // Calculate target rect (Fit within 95vw / 95vh, preserving aspect ratio)
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 40; // minimal padding
        const maxW = viewportWidth - (padding * 2);
        const maxH = viewportHeight - (padding * 2);

        let targetWidth = maxW;
        let targetHeight = targetWidth / imageAspectRatio;

        if (targetHeight > maxH) {
            targetHeight = maxH;
            targetWidth = targetHeight * imageAspectRatio;
        }

        const targetTop = (viewportHeight - targetHeight) / 2;
        const targetLeft = (viewportWidth - targetWidth) / 2;

        setMinUpliftElapsed(false);
        setIsBelowHeader(false); // Ensure start ON TOP
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
        if (activeState && activeState.phase !== 'returning') {
            setActiveState(prev => prev ? { ...prev, phase: 'returning' } : null);

            // TIMING LOGIC:
            // Total Return Duration: 650ms.
            // Flip Z-Index at "very end" (600ms) to avoid clipping header during flight.
            setTimeout(() => {
                setIsBelowHeader(true);
            }, 600);
        }
    };

    return (
        <>
            {/* Grid Items */}
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
                                    // Rule 1: Hide only if ActiveState ID matches.
                                    // When activeState becomes null (after return), this opacity naturally reverts to 1.
                                    (activeState?.photo.id === photo.id) ? "opacity-0" : "opacity-100"
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

            {/* 1. Backdrop Overlay */}
            {/* Z-INDEX 55 to cover Header (50) */}
            <AnimatePresence>
                {activeState && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: activeState.phase === 'returning' ? 0 : 1
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: activeState.phase === 'returning' ? 0.2 : 0.4,
                            ease: "easeOut"
                        }}
                        className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                )}
            </AnimatePresence>

            {/* 2. Active Photo Object */}
            {/* We render this OUTSIDE AnimatePresence to control unmount precisely after 'returning' completes */}
            {activeState && (
                <motion.div
                    key="active-photo"
                    initial={{
                        position: "fixed",
                        top: activeState.rect.top,
                        left: activeState.rect.left,
                        width: activeState.rect.width,
                        height: activeState.rect.height,
                        scale: 1,
                        borderRadius: "0px",
                        zIndex: 60, // INVARIANT: Open starts High
                    }}
                    animate={
                        activeState.phase === 'uplift' ? {
                            // PHASE 1: Uplift (Selection Intent)
                            top: activeState.rect.top,
                            left: activeState.rect.left,
                            width: activeState.rect.width,
                            height: activeState.rect.height,
                            scale: 1.05,
                            borderRadius: "0px",
                            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                            zIndex: 60, // Keep High
                            transition: { duration: 0.25, ease: "easeOut" }
                        } :
                            activeState.phase === 'centered' ? {
                                // PHASE 2: Centered (Dominant)
                                top: activeState.targetRect.top,
                                left: activeState.targetRect.left,
                                width: activeState.targetRect.width,
                                height: activeState.targetRect.height,
                                scale: 1,
                                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)",
                                borderRadius: "2px",
                                zIndex: 60, // Keep High
                                transition: {
                                    boxShadow: { duration: 0.2 },
                                    default: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
                                }
                            } : {
                                // PHASE 3: Returning (Yielding)
                                top: activeState.rect.top,
                                left: activeState.rect.left,
                                width: activeState.rect.width,
                                height: activeState.rect.height,
                                scale: 1,
                                borderRadius: "0px",
                                boxShadow: "none",
                                // Dynamic Z-Index based on 50% timing
                                zIndex: isBelowHeader ? 48 : 60,
                                transition: {
                                    duration: 0.65,
                                    ease: [0.33, 1, 0.68, 1]
                                }
                            }
                    }
                    onAnimationComplete={() => {
                        if (activeState.phase === 'returning') {
                            setActiveState(null); // Explicit unmount after return
                        }
                    }}
                    className="block overflow-hidden relative cursor-zoom-out"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                >
                    {/* Layer 1: Low-Res Cached Image (Immediate) */}
                    <img
                        src={activeState.initialSrc}
                        alt={activeState.photo.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Layer 2: High-Res Image (Progressive Enhancement) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeState.isLoaded ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={activeState.photo.src}
                            alt={activeState.photo.alt}
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                            onLoad={() => {
                                setActiveState(prev => prev ? { ...prev, isLoaded: true } : null);
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

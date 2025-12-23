"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
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

export function MasonryGrid({ columns }: MasonryGridProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    // Helper to ensure we render the right number of columns on mobile vs desktop.
    // For simplicity and per my preference, I'll keep the "3 column" logic but on mobile it'll just stack.
    // I'll use Flexbox or Grid. Flex row of Flex cols is best for manual control.

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
                                // Remove initial/animate for now to avoid conflict with layoutId or keep it simple
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                {/* Wrapper to handle the "Ghost Slot" effect */}
                                {/* We keep the slot taking up space, but the visual "moves" to the modal via layoutId */}
                                <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                                    <motion.div layoutId={`photo-${photo.id}`} className="w-full h-full">
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            width={800}
                                            height={600}
                                            className={cn(
                                                "w-full h-auto max-h-[600px] object-cover transition-transform duration-700 group-hover:scale-105",
                                                photo.className
                                            )}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </motion.div>
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
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent backdrop-blur-xl p-4 cursor-zoom-out"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <motion.div
                        layoutId={`photo-${selectedPhoto.id}`}
                        className="relative w-full max-w-7xl h-[85vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Allow clicking image to do nothing, or zoom out if desired (propagation logic)
                    >
                        {/* Use object-contain to never crop. The layoutId will morph width/height/position. */}
                        <Image
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            fill
                            className="object-contain cursor-zoom-out"
                            onClick={() => setSelectedPhoto(null)}
                            priority // Avoid flash of missing image
                        />
                    </motion.div>

                    {/* Close button - fade in separately so it doesn't pop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-6 right-6 text-foreground cursor-pointer p-2 hover:opacity-70 transition-opacity z-[101]"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <span className="text-2xl">✕</span>
                    </motion.div>

                    {selectedPhoto.caption && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-8 left-0 right-0 text-center text-sm font-oxygen tracking-widest uppercase text-foreground/80 z-[101]"
                        >
                            {selectedPhoto.caption}
                        </motion.div>
                    )}
                </div>
            )}
        </>
    );
}


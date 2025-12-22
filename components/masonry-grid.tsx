"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MinimalArrow } from "@/components/minimal-arrow"; // Assuming we might want back arrow styling or just use simple X

export interface Photo {
    id: string;
    src: string;
    alt: string;
    caption?: string;
}

interface MasonryGridProps {
    photos: Photo[];
}

export function MasonryGrid({ photos }: MasonryGridProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    return (
        <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 p-4">
                {photos.map((photo, i) => (
                    <motion.div
                        key={photo.id}
                        className="relative mb-8 break-inside-avoid group cursor-zoom-in"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        {photo.caption && (
                            <p className="mt-4 text-xs font-oxygen tracking-widest uppercase text-muted-foreground text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {photo.caption}
                            </p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <div className="absolute top-6 right-6 text-foreground cursor-pointer p-2 hover:opacity-70 transition-opacity">
                        <span className="text-2xl">✕</span>
                    </div>
                    <div className="relative w-full max-w-7xl h-[85vh] flex flex-col items-center justify-center">
                        <Image
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            fill
                            className="object-contain"
                        />
                    </div>
                    {selectedPhoto.caption && (
                        <div className="absolute bottom-8 left-0 right-0 text-center text-sm font-oxygen tracking-widest uppercase text-foreground/80">
                            {selectedPhoto.caption}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

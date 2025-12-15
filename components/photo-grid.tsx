"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  width?: number; 
  height?: number;
  caption?: string; 
  span?: string; // Kept for backward compatibility if needed
}

interface PhotoGridProps {
  photos: Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Fallback if no photos passed
  const displayPhotos = photos || [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {displayPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            className="group cursor-pointer flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-white/5">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            {photo.caption && (
              <p className="mt-3 text-xs font-mono tracking-wide text-muted font-medium">
                {photo.caption}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="absolute top-4 right-4 text-muted cursor-pointer hover:text-foreground">
             ✕
          </div>
          <div className="relative w-full max-w-7xl h-[85vh]">
             <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              className="object-contain"
            />
          </div>
          {selectedPhoto.caption && (
            <div className="absolute bottom-8 left-0 right-0 text-center text-sm font-mono text-muted">
              {selectedPhoto.caption}
            </div>
          )}
        </div>
      )}
    </>
  );
}

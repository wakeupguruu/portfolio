"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"; // Start using Lucide for consistent icons if available, or text X

export interface Photo {
    id: string;
    src: string;
    alt: string;
    caption?: string;
    description?: string;
    className?: string;
}

interface MasonryGridProps {
    columns: Photo[][];
}

interface ActivePhotoState {
    photo: Photo;
    rect: DOMRect;
    targetRect: { top: number; left: number; width: number; height: number };
    phase: 'uplift' | 'centered' | 'returning';
    isLoaded: boolean;
    initialSrc: string;
}

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function ExpandingCaption({
    photo,
    isActive,
    onToggle,
    onClose
}: {
    photo: Photo;
    isActive: boolean;
    onToggle: (e: React.MouseEvent) => void;
    onClose: () => void;
}) {
    const [captionText, setCaptionText] = useState(photo.caption || "");
    const [descriptionText, setDescriptionText] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    // Refs to handle cancellation and current state interruption
    const stateRef = useRef({
        isAnimating: false,
        captionText: photo.caption || "",
        descriptionText: "",
        cancelCurrent: () => { }
    });

    useEffect(() => {
        // Reset ref on mount
        stateRef.current.captionText = photo.caption || "";
    }, [photo.caption]);

    useEffect(() => {
        // Cancel any running animation
        stateRef.current.cancelCurrent();

        // Define cancellation token
        let cancelled = false;
        stateRef.current.cancelCurrent = () => { cancelled = true; };

        const fullCaption = photo.caption || "";
        const fullDesc = photo.description || "";

        const runOpenSequence = async () => {
            if (!fullDesc) return;
            stateRef.current.isAnimating = true;

            // 1. Backspace Caption
            let currentCap = stateRef.current.captionText; // Start from whatever is currently shown
            while (currentCap.length > 0) {
                if (cancelled) return;
                currentCap = currentCap.slice(0, -1);
                setCaptionText(currentCap);
                stateRef.current.captionText = currentCap;
                await delay(30);
            }

            // 2. Expand Box
            if (cancelled) return;
            setShowPopup(true);
            await delay(400); // Wait for expansion animation

            // 3. Type Description
            if (cancelled) return;
            let currentDesc = "";
            for (let i = 0; i < fullDesc.length; i++) {
                if (cancelled) return;
                currentDesc = fullDesc.slice(0, i + 1);
                setDescriptionText(currentDesc);
                stateRef.current.descriptionText = currentDesc;
                await delay(15);
            }

            stateRef.current.isAnimating = false;
        };

        const runCloseSequence = async () => {
            stateRef.current.isAnimating = true;

            // 1. Untype Description (Fast)
            let currentDesc = stateRef.current.descriptionText;
            while (currentDesc.length > 0) {
                if (cancelled) return;
                // Faster untyping
                currentDesc = currentDesc.slice(0, -2); // Remove 2 chars at a time
                if (currentDesc.length < 0) currentDesc = "";
                setDescriptionText(currentDesc);
                stateRef.current.descriptionText = currentDesc;
                await delay(10);
            }

            // 2. Shrink Box
            if (cancelled) return;
            setShowPopup(false);
            await delay(300); // Wait for shrink

            // 3. Retype Caption
            if (cancelled) return;
            let currentCap = stateRef.current.captionText;
            const targetCap = fullCaption;
            // Find where we left off (usually 0, but maybe interrupted)
            while (currentCap.length < targetCap.length) {
                if (cancelled) return;
                currentCap = targetCap.slice(0, currentCap.length + 1);
                setCaptionText(currentCap);
                stateRef.current.captionText = currentCap;
                await delay(30);
            }

            stateRef.current.isAnimating = false;
        };

        if (isActive) {
            runOpenSequence();
        } else {
            // Only run close sequence if we are not already in "idle" state (caption full, popup hidden)
            const isIdle = !showPopup && stateRef.current.captionText === fullCaption;
            if (!isIdle) {
                runCloseSequence();
            }
        }

    }, [isActive, photo.caption, photo.description]);

    return (
        <div className="mt-4 flex flex-col items-center justify-center relative min-h-[24px]">
            {/* Caption Trigger */}
            {/* Only show cursor pointer if there is a description */}
            <div
                className={cn(
                    "relative z-10 px-2 py-1",
                    photo.description ? "cursor-pointer" : "cursor-default"
                )}
                onClick={onToggle}
            >
                <p className={cn(
                    "text-xs font-oxygen tracking-widest uppercase text-center transition-all duration-300",
                    // When popup is open (caption is gone), this element effectively holds the "space". 
                    // But we want the user to still be able to click "something"? 
                    // Actually the caption is disappearing.
                    // We might want to keep a "toggle" icon or just rely on the box?
                    // User said: "Fixing the issue where the description pop-up does not close when clicked again."
                    // If the text is gone, they can't click it easily.
                    // FIX: Min height/width or a placeholder container.
                    isActive ? "text-transparent" : "text-muted-foreground hover:text-foreground",
                    photo.description && !isActive && "hover:underline underline-offset-4 decoration-muted-foreground/50"
                )}>
                    {captionText}&nbsp; {/* nbsp preserves height if empty */}
                </p>
            </div>

            {/* Popup */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -10 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="absolute bottom-full mb-3 z-50 origin-bottom"
                        onClick={(e) => e.stopPropagation()} // Prevent click-outside from firing immediately on popup click
                    >
                        <div className="relative w-64 md:w-80 bg-[#5c6b45] text-[#f2f2f2] p-5 rounded shadow-xl flex flex-col items-start text-left">
                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="absolute top-2 right-2 p-1 text-white/50 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>

                            <div className="mb-2">
                                <h4 className="text-xs font-bold font-interTight uppercase tracking-wider text-[#dce3d0]">
                                    {photo.caption}
                                </h4>
                            </div>
                            <p className="text-sm font-oxygen leading-relaxed whitespace-pre-wrap">
                                {descriptionText}
                                <span className="animate-pulse inline-block w-1.5 h-3 bg-white/50 ml-0.5 align-middle"></span>
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function MasonryGrid({ columns }: MasonryGridProps) {
    const [activeState, setActiveState] = useState<ActivePhotoState | null>(null);
    const [activeDescriptionId, setActiveDescriptionId] = useState<string | null>(null);

    // ... (Existing Scroll/Resize Logic) ... 
    // We retain the logic for Zoom, but update the Description logic.

    const [minUpliftElapsed, setMinUpliftElapsed] = useState(false);
    const [isBelowHeader, setIsBelowHeader] = useState(false);

    useEffect(() => {
        if ((activeState && activeState.phase !== 'returning') || activeDescriptionId) {
            const handleScroll = () => handleClose();
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [activeState, activeDescriptionId]);

    // Click Outside listener
    useEffect(() => {
        if (activeDescriptionId) {
            const handleClickOutside = () => {
                setActiveDescriptionId(null);
            };
            window.addEventListener("click", handleClickOutside);
            return () => window.removeEventListener("click", handleClickOutside);
        }
    }, [activeDescriptionId]);

    useEffect(() => {
        if (activeState && activeState.phase === 'uplift') {
            const timer = setTimeout(() => setMinUpliftElapsed(true), 200);
            return () => clearTimeout(timer);
        } else if (!activeState) {
            setMinUpliftElapsed(false);
            setIsBelowHeader(false);
        }
    }, [activeState?.phase]);

    useEffect(() => {
        if (activeState?.phase === 'uplift' && activeState.isLoaded && minUpliftElapsed) {
            setActiveState(prev => prev ? { ...prev, phase: 'centered' } : null);
        }
    }, [activeState?.phase, activeState?.isLoaded, minUpliftElapsed]);

    const handlePhotoClick = (photo: Photo, e: React.MouseEvent<HTMLDivElement>) => {
        // ... (Existing Zoom Logic Logic) ...
        const rect = e.currentTarget.getBoundingClientRect();
        const imgElement = e.currentTarget.querySelector("img");
        const initialSrc = imgElement?.currentSrc || photo.src;
        const naturalWidth = imgElement?.naturalWidth || rect.width;
        const naturalHeight = imgElement?.naturalHeight || rect.height;
        const imageAspectRatio = naturalWidth / naturalHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 40;
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
        setIsBelowHeader(false);
        setActiveState({
            photo,
            rect,
            targetRect: { top: targetTop, left: targetLeft, width: targetWidth, height: targetHeight },
            phase: 'uplift',
            isLoaded: false,
            initialSrc
        });
    };

    const handleCaptionToggle = (e: React.MouseEvent, photo: Photo) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if (activeDescriptionId === photo.id) {
            setActiveDescriptionId(null);
        } else {
            if (photo.description) {
                setActiveDescriptionId(photo.id);
            }
        }
    };

    const handleClose = () => {
        if (activeDescriptionId) {
            setActiveDescriptionId(null);
            return;
        }
        if (activeState && activeState.phase !== 'returning') {
            setActiveState(prev => prev ? { ...prev, phase: 'returning' } : null);
            setTimeout(() => setIsBelowHeader(true), 600);
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 w-full min-w-full">
                {columns.map((columnPhotos, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-16 flex-1">
                        {columnPhotos.map((photo, i) => (
                            <motion.div
                                key={photo.id}
                                className={cn(
                                    "group relative",
                                    activeDescriptionId === photo.id ? "z-40" : "z-0"
                                )}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="cursor-zoom-in" onClick={(e) => handlePhotoClick(photo, e)}>
                                    <div className={cn(
                                        "relative w-full overflow-hidden bg-gray-100 dark:bg-zinc-800 transition-opacity duration-300",
                                        (activeState?.photo.id === photo.id) ? "opacity-0" : "opacity-100"
                                    )}>
                                        <div className="w-full h-full">
                                            <Image
                                                src={photo.src}
                                                alt={photo.alt}
                                                width={800}
                                                height={600}
                                                className={cn("w-full h-auto max-h-[600px] object-cover transition-transform duration-700", photo.className)}
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {photo.caption && (
                                    <ExpandingCaption
                                        photo={photo}
                                        isActive={activeDescriptionId === photo.id}
                                        onToggle={(e) => handleCaptionToggle(e, photo)}
                                        onClose={() => setActiveDescriptionId(null)}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeState && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeState.phase === 'returning' ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: activeState.phase === 'returning' ? 0.2 : 0.4 }}
                        className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                )}
            </AnimatePresence>

            {activeState && (
                <motion.div
                    key="active-photo"
                    initial={{
                        position: "fixed", top: activeState.rect.top, left: activeState.rect.left, width: activeState.rect.width, height: activeState.rect.height, scale: 1, borderRadius: "0px", zIndex: 60
                    }}
                    animate={
                        activeState.phase === 'uplift' ? {
                            top: activeState.rect.top, left: activeState.rect.left, width: activeState.rect.width, height: activeState.rect.height, scale: 1.05, borderRadius: "0px", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)", zIndex: 60, transition: { duration: 0.25, ease: "easeOut" }
                        } : activeState.phase === 'centered' ? {
                            top: activeState.targetRect.top, left: activeState.targetRect.left, width: activeState.targetRect.width, height: activeState.targetRect.height, scale: 1, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.4)", borderRadius: "2px", zIndex: 60, transition: { boxShadow: { duration: 0.2 }, default: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
                        } : {
                            top: activeState.rect.top, left: activeState.rect.left, width: activeState.rect.width, height: activeState.rect.height, scale: 1, borderRadius: "0px", boxShadow: "none", zIndex: isBelowHeader ? 48 : 60, transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] }
                        }
                    }
                    onAnimationComplete={() => { if (activeState.phase === 'returning') setActiveState(null); }}
                    className="block overflow-hidden relative cursor-zoom-out"
                    onClick={(e) => { e.stopPropagation(); handleClose(); }}
                >
                    <img src={activeState.initialSrc} alt={activeState.photo.alt} className="absolute inset-0 w-full h-full object-cover" />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeState.isLoaded ? 1 : 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 w-full h-full">
                        <Image src={activeState.photo.src} alt={activeState.photo.alt} fill className="object-cover" priority quality={90} onLoad={() => setActiveState(prev => prev ? { ...prev, isLoaded: true } : null)} />
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

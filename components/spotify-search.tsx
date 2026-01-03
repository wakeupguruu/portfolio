"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, Loader2, Music, Play, Pause, Sparkles, Send } from "lucide-react";

import { motion } from "framer-motion";

interface SpotifyTrack {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
    preview_url: string | null;
    external_urls: {
        spotify: string;
    };
}

interface SuggestionSession {
    track: SpotifyTrack;
    timestamp: number;
    suggesterName: string;
}

export function SpotifySearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SpotifyTrack[]>([]);
    const [loading, setLoading] = useState(false);
    const [suggesterName, setSuggesterName] = useState("");
    const [isSuggesting, setIsSuggesting] = useState<string | null>(null); // Track ID being suggested
    const [showThankYou, setShowThankYou] = useState(false);
    const [lastSuggestedTrack, setLastSuggestedTrack] = useState<SpotifyTrack | null>(null);
    const [recentSuggestions, setRecentSuggestions] = useState<SuggestionSession[]>([]);
    const [isFlipped, setIsFlipped] = useState(false);

    // Audio Preview State
    const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Load persisted name and history
        const savedName = localStorage.getItem("spotify_suggester_name");
        if (savedName) setSuggesterName(savedName);

        const savedHistory = localStorage.getItem("spotify_recent_suggestions");
        if (savedHistory) {
            try {
                setRecentSuggestions(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    // Debounce Search Logic
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim()) {
                performSearch(query);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const performSearch = async (searchTerm: string) => {
        // Avoid searching if empty
        if (!searchTerm.trim()) return;

        setLoading(true);
        setResults([]);
        try {
            const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await res.json();
            if (data.tracks) {
                setResults(data.tracks.items);
            }
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch(query);
    };

    const handleSuggest = async (track: SpotifyTrack) => {
        if (!suggesterName.trim()) {
            alert("Please enter your name first!");
            return;
        }

        setIsSuggesting(track.id);
        try {
            // Persist name
            localStorage.setItem("spotify_suggester_name", suggesterName);

            const res = await fetch("/api/suggest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ track, suggesterName }),
            });

            if (res.ok) {
                setLastSuggestedTrack(track);
                setShowThankYou(true);
                setQuery("");
                setResults([]);

                // Update History
                const newHistory = [{ track, timestamp: Date.now(), suggesterName }, ...recentSuggestions].slice(0, 5);
                setRecentSuggestions(newHistory);
                localStorage.setItem("spotify_recent_suggestions", JSON.stringify(newHistory));
            } else {
                alert("Failed to send suggestion. Please try again.");
            }
        } catch (error) {
            console.error("Suggestion failed:", error);
            alert("Something went wrong.");
        } finally {
            setIsSuggesting(null);
        }
    };

    const togglePreview = (previewUrl: string | null, trackId: string) => {
        if (!previewUrl) return;

        if (playingTrackId === trackId) {
            audioRef.current?.pause();
            setPlayingTrackId(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            audioRef.current = new Audio(previewUrl);
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(e => console.error("Audio play failed", e));
            audioRef.current.onended = () => setPlayingTrackId(null);
            setPlayingTrackId(trackId);
        }
    };

    // Stop audio when component unmounts
    useEffect(() => {
        return () => {
            audioRef.current?.pause();
        };
    }, []);


    // --- Render Views ---

    if (showThankYou && lastSuggestedTrack) {
        return (
            <div className="w-full relative flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                {/* Flip Card Container */}
                <div className="relative w-full max-w-[320px] aspect-3/4 perspective-[1000px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                    <motion.div
                        className="w-full h-full relative"
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* Front Face: Bird with Note (Generic Thank You) */}
                        <div className="absolute w-full h-full rounded-sm flex flex-col items-center justify-center bg-transparent" style={{ backfaceVisibility: "hidden" }}>
                            <div className="relative w-64 h-64 animate-bounce-slow">
                                <Image
                                    src="/images/thank-you-bird.png"
                                    alt="Bird saying thank you"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground font-mono animate-pulse">
                                ( Click to open note )
                            </p>
                        </div>

                        {/* Back Face: Notebook Card (Specific Details) */}
                        <div
                            className="absolute w-full h-full rounded-sm shadow-md border border-gray-200 bg-[#fcf5e5] text-slate-800 p-6 -rotate-1"
                            style={{
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                fontFamily: 'var(--font-caveat)',
                                fontSize: '1.2rem'
                            }}
                        >
                            <div className="flex flex-col items-center gap-4 h-full justify-center">
                                {/* Album Art */}
                                <div className="relative w-24 h-24 rounded-md overflow-hidden shadow-inner border-2 border-white/80">
                                    {lastSuggestedTrack.album.images[0] ? (
                                        <Image
                                            src={lastSuggestedTrack.album.images[0].url}
                                            alt={lastSuggestedTrack.album.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <Music className="h-8 w-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1 w-full text-center">
                                    <p className="text-xl leading-none">
                                        {suggesterName}
                                    </p>
                                    <div className="w-full h-px bg-slate-300 mx-auto" />
                                    <p className="font-bold text-2xl leading-tight pt-1">
                                        {lastSuggestedTrack.name}
                                    </p>
                                </div>

                                {/* Handwritten Text Asset */}
                                <div className="relative w-32 h-12 mt-2">
                                    <Image
                                        src="/images/thank-you-text.png"
                                        alt="Thank You Text"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <button
                    onClick={() => setShowThankYou(false)}
                    className="mt-8 text-xs font-mono text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent"
                >
                    [ Send another ]
                </button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter">Suggest a Song</h2>
                <p className="text-muted-foreground text-sm">
                    Found a track I need to hear? Look it up and send it over.
                </p>
            </div>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name (optional but nice)"
                    value={suggesterName}
                    onChange={(e) => setSuggesterName(e.target.value)}
                    className="w-full bg-transparent border-b border-muted-foreground/30 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                />

                <form onSubmit={handleSearch} className="relative flex gap-2 w-full">
                    <div className="relative w-full">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Spotify..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-secondary/50 border-0 pl-10 pr-12 py-3 text-sm focus:outline-none placeholder:text-muted-foreground/50 transition-colors relative z-0 rounded-full"
                        />

                        {/* Animated Border */}
                        <motion.div
                            initial={{ clipPath: "inset(0 50% 0 50% round 9999px)" }}
                            animate={{
                                clipPath: isFocused
                                    ? "inset(0 0 0 0 round 9999px)"
                                    : "inset(0 50% 0 50% round 9999px)"
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute inset-0 border-[1.5px] border-accent rounded-full pointer-events-none z-20"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:text-accent transition-colors disabled:opacity-50 z-30 flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-4">
                {results.length > 0 ? (
                    <div className="grid gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {results.map((track) => (
                            <div
                                key={track.id}
                                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-accent/10 overflow-hidden w-full"
                            >
                                <div className="relative w-12 h-12 shrink-0 bg-secondary rounded overflow-hidden">
                                    {track.album.images[0] ? (
                                        <Image
                                            src={track.album.images[0].url}
                                            alt={track.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full w-full">
                                            <Music className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    )}
                                    {/* Play Overlay */}
                                    {track.preview_url && (
                                        <button
                                            onClick={() => togglePreview(track.preview_url, track.id)}
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            {playingTrackId === track.id ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 text-left">
                                    <p className="font-medium text-sm truncate">{track.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {track.artists.map((a) => a.name).join(", ")}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleSuggest(track)}
                                    disabled={isSuggesting === track.id}
                                    className="p-2 text-muted-foreground hover:text-accent transition-colors disabled:opacity-50"
                                    title="Send Suggestion"
                                >
                                    {isSuggesting === track.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State / Recent Suggestions
                    <div className="pt-4">
                        {recentSuggestions.length > 0 ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest opacity-60">
                                    <Sparkles className="h-3 w-3" />
                                    <span>Recently Sent</span>
                                </div>
                                <div className="space-y-3">
                                    {recentSuggestions.map((session, idx) => (
                                        <div key={idx} className="flex items-center justify-between gap-3 opacity-60 hover:opacity-100 transition-opacity w-full">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="relative w-8 h-8 rounded-md overflow-hidden bg-secondary shrink-0">
                                                    {session.track.album.images[0] && (
                                                        <Image
                                                            src={session.track.album.images[0].url}
                                                            alt={session.track.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="overflow-hidden mr-2">
                                                    <p className="text-xs font-medium truncate">{session.track.name}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate">
                                                        {session.track.artists[0].name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p
                                                    className={`text-sm font-caveat truncate max-w-[80px] ${session.suggesterName?.toLowerCase() === "stu" ||
                                                        session.suggesterName?.toLowerCase() === "stuti"
                                                        ? "text-sky-300 dark:text-sky-300"
                                                        : "text-accent"
                                                        }`}
                                                >
                                                    {session.suggesterName || "Anonymous"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-10 opacity-50">
                                <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">Search for a song to get started</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

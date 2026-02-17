"use client";

import React, { useState } from "react";
import { PlayCircle, X } from "lucide-react";

export function GlassSpongeFeature() {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // YouTube ID for "Saving The Sea of Glass" by CPAWS-BC
    const videoId = "F5x-B_r_t_s";

    return (
        <div className="relative inline-block">
            {/* Trigger Button */}
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsOpen(true)}
                className="btn-premium px-10 py-5 rounded-full text-lg font-semibold text-white bg-white/5 backdrop-blur-lg border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all duration-500 overflow-hidden relative group"
            >
                <div className="relative z-10 flex items-center gap-3">
                    <PlayCircle className={`w-6 h-6 text-[#00D9C0] transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`} />
                    <span>Watch the Film</span>
                </div>

                {/* Subtle hover background "zoom" effect on the button itself */}
                <div className={`absolute inset-0 bg-primary/10 transition-transform duration-700 ease-out ${isHovered ? 'scale-150' : 'scale-0'}`}></div>
            </button>

            {/* Hover Video Preview (Zooms out of the button area) */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isHovered && !isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}
                style={{ width: '480px', height: '270px' }}
            >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,217,192,0.3)] bg-black">
                    {isHovered && (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1`}
                            title="Glass Sponge Reef Feature"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    )}
                </div>
            </div>

            {/* Full Screen Modal if clicked (Optional, but adds to the premium feel) */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 backdrop-blur-xl animate-in fade-in duration-500">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={40} />
                    </button>
                    <div className="w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`}
                            title="Saving The Sea of Glass"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

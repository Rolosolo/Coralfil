"use client";

import React, { useState, useEffect } from "react";
import { Crosshair, Shield, Activity, Database, Radar } from "lucide-react";

export function SatelliteMapOverlay() {
    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScanProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/10 group bg-[#010307]">
            {/* Base Satellite Layer */}
            <img
                alt="Satellite Reef View"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[10s] ease-linear"
                src="https://images.unsplash.com/photo-1544551763-47a0159f9234?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Procedural Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,192,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,192,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>

            {/* Target Area Highlight (The "Touched Up" Layer) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                {/* Glowing Cage */}
                <div className="absolute inset-0 border-2 border-primary/40 rounded-lg shadow-[0_0_30px_rgba(0,217,192,0.3)] animate-pulse"></div>
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

                {/* Area Coverage Label */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full whitespace-nowrap">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Target: Sector 4-A | 240 m²</span>
                </div>
            </div>

            {/* Scanning Bar */}
            <div
                className="absolute left-0 right-0 h-[2px] bg-primary/40 shadow-[0_0_15px_rgba(0,217,192,0.8)] z-20 pointer-events-none"
                style={{ top: `${scanProgress}%` }}
            ></div>

            {/* Telemetry Overlays */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2">
                    <Radar size={12} className="text-primary animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-[9px] font-mono text-white/70 uppercase">SAT-LNK: ACTIVE</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10 items-end">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2">
                    <Activity size={12} className="text-primary" />
                    <span className="text-[9px] font-mono text-white/70">RESILIENCE: 84.2%</span>
                </div>
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2">
                    <Database size={12} className="text-secondary" />
                    <span className="text-[9px] font-mono text-white/70">ML-PREDICT: OPTIMAL</span>
                </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,12,0.8)_100%)] pointer-events-none"></div>
        </div>
    );
}

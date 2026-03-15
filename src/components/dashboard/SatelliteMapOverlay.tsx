"use client";

import React, { useState, useEffect } from "react";
import { Crosshair, Shield, Activity, Database, Radar, Globe } from "lucide-react";

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
                    <span className="text-[9px] font-mono text-white/70 uppercase tracking-widest leading-none">SAT-LNK: ACTIVE</span>
                </div>
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2">
                    <Globe size={12} className="text-primary" />
                    <span className="text-[9px] font-mono text-white/70 uppercase tracking-widest leading-none">ACA-INTEGRATION: LIVE</span>
                </div>
            </div>

            {/* ACA Legend Sidebar */}
            <div className="absolute top-4 right-4 flex flex-col gap-4 z-10 items-end">
                <div className="p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col gap-3 min-w-[140px]">
                    <div className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-1">Geomorphic Zones</div>
                    <div className="space-y-2">
                        {[
                            { label: 'Inner Reef Flat', color: 'bg-emerald-400' },
                            { label: 'Outer Reef Flat', color: 'bg-emerald-600' },
                            { label: 'Sloping Shelf', color: 'bg-blue-500' },
                            { label: 'Back Reef Slope', color: 'bg-blue-800' }
                        ].map(item => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                                <span className="text-[8px] font-mono text-white/60 uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="h-px bg-white/10 my-1"></div>
                    <div className="text-[8px] font-black text-[#00ffca] uppercase tracking-[0.2em] mb-1">Benthic Habitats</div>
                    <div className="space-y-2">
                        {[
                            { label: 'Coral/Algae', color: 'bg-pink-400' },
                            { label: 'Sand', color: 'bg-yellow-200' },
                            { label: 'Rock', color: 'bg-slate-500' },
                            { label: 'Seagrass', color: 'bg-green-400' }
                        ].map(item => (
                            <div key={item.label} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-sm ${item.color}`}></div>
                                <span className="text-[8px] font-mono text-white/60 uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10 items-end">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2 shadow-lg">
                    <Activity size={12} className="text-primary" />
                    <span className="text-[9px] font-mono text-white/70 uppercase tracking-wider">RESILIENCE SCORE: 84.2%</span>
                </div>
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2 shadow-lg">
                    <Database size={12} className="text-secondary" />
                    <span className="text-[9px] font-mono text-white/70 uppercase tracking-wider">ACA-ML CLASSIFICATION: OPTIMAL</span>
                </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,12,0.8)_100%)] pointer-events-none"></div>
        </div>
    );
}

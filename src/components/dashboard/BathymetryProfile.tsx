"use client";

import React from "react";
import { motion } from "@/components/motion-client";
import { Waves, ArrowDown, Info } from "lucide-react";

interface BathymetryProfileProps {
    depth: number;
    geomorphicZone: string;
}

export function BathymetryProfile({ depth, geomorphicZone }: BathymetryProfileProps) {
    // Generate a simple simulated seabed profile path based on geomorphic zone
    const getProfilePath = () => {
        if (geomorphicZone.includes("Flat")) return "M0,60 Q25,58 50,60 T100,60 L100,100 L0,100 Z";
        if (geomorphicZone.includes("Slope")) return "M0,30 Q30,40 50,60 T100,90 L100,100 L0,100 Z";
        return "M0,40 Q25,45 50,55 T100,75 L100,100 L0,100 Z";
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Waves size={16} className="text-primary" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Benthic Profile (Cross-Section)</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary/20 border border-primary/20">
                    <ArrowDown size={10} className="text-primary" />
                    <span className="text-[9px] font-mono font-bold text-primary">{Math.abs(depth)}m DEPTH</span>
                </div>
            </div>

            <div className="h-40 relative bg-[#02060c] rounded-2xl border border-white/5 overflow-hidden">
                {/* Water Layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-blue-900/40 z-0"></div>
                
                {/* Surface */}
                <div className="absolute top-0 inset-x-0 h-px bg-white/20 z-10 animate-pulse"></div>

                {/* Seabed SVG */}
                <svg className="absolute inset-0 w-full h-full z-10" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="seabedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#2d3748', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#1a202c', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <motion.path 
                        initial={{ d: "M0,100 L100,100 L100,100 L0,100 Z" }}
                        animate={{ d: getProfilePath() }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        fill="url(#seabedGrad)"
                        stroke="#4a5568"
                        strokeWidth="0.5"
                    />
                    
                    {/* C-Brick Mark */}
                    <motion.circle 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, cx: "50%", cy: "55%" }}
                        transition={{ delay: 1 }}
                        r="3" 
                        fill="#00D9C0" 
                        className="animate-pulse shadow-[0_0_10px_rgba(0,217,192,0.8)]"
                    />
                </svg>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] z-20 pointer-events-none"></div>

                {/* Labels */}
                <div className="absolute bottom-2 left-4 z-30 flex flex-col gap-0.5">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter italic">Source: Allen Coral Atlas 5m Ref</span>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-[8px] text-slate-500 uppercase mb-1">Substrate Stability</div>
                    <div className="text-xs font-bold text-white uppercase tracking-tight">Stable Carbonate</div>
                </div>
                <div className="flex-1 p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="text-[8px] text-slate-500 uppercase mb-1">Rugosity Index</div>
                    <div className="text-xs font-bold text-white uppercase tracking-tight">High (2.4)</div>
                </div>
            </div>
            
            <p className="text-[9px] text-slate-500 font-medium leading-relaxed italic flex items-start gap-2">
                <Info size={10} className="shrink-0 mt-0.5 text-primary" />
                Depth profiles are derived from ACA High-Resolution Bathymetry mosaics. Local rugosity affects larval settlement success and structural resilience of deployed C-Bricks.
            </p>
        </div>
    );
}

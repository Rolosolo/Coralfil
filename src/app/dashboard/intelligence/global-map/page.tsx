"use client";

import React, { useState } from "react";
import {
    Globe, Shield, Target, Waves, Thermometer,
    Droplets, Activity, Maximize2, ZoomIn, ZoomOut,
    Plus, HelpCircle, Layers, MoreHorizontal, ArrowUpRight,
    Map as MapIcon, Compass, Anchor, Wind
} from "lucide-react";
import { motion } from "@/components/motion-client";

export default function GlobalMapPage() {
    const [activeLayer, setActiveLayer] = useState("nutrients");

    return (
        <div className="flex h-full bg-[#010307] text-slate-200 overflow-hidden relative">
            {/* Map Overlay Canvas (Simulated) */}
            <div className="absolute inset-0 z-0">
                {/* Simulated Map Texture */}
                <div className="absolute inset-0 bg-[#010307]">
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, #0077BE 0%, transparent 70%)' }}></div>
                    {/* Add SVG paths for continents or generic islands */}
                    <svg className="w-full h-full opacity-10">
                        <path d="M200 300 Q 250 200, 400 350 T 600 300" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M700 100 Q 800 200, 750 400 T 900 600" stroke="white" strokeWidth="0.5" fill="none" />
                    </svg>
                </div>

                {/* Simulated Data Points (Bioluminescent Glows) */}
                <div className="absolute top-[35%] left-[45%] group cursor-pointer">
                    <div className="size-4 rounded-full bg-[#00D9C0] animate-glow shadow-[0_0_30px_#00D9C0]"></div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                        <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 bg-black/80 whitespace-nowrap">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Lucayan Shelf (BAH)</p>
                            <p className="text-[9px] text-[#00D9C0] font-bold mt-1">SCTLD Mitigation Active</p>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[55%] left-[65%] group cursor-pointer">
                    <div className="size-4 rounded-full bg-[#FFD700] animate-glow shadow-[0_0_30px_#FFD700]"></div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                        <div className="glass-panel px-4 py-2 rounded-xl border border-white/10 bg-black/80 whitespace-nowrap">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Great Barrier Reef (AUS)</p>
                            <p className="text-[9px] text-[#FFD700] font-bold mt-1">Thermal Stress Level 2</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header Overlay */}
            <header className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    <div className="glass-panel px-6 py-4 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] bg-[#00D9C0]/20 text-[#00D9C0] border border-[#00D9C0]/20">Global Atlas Sync</span>
                            <span className="text-[9px] text-slate-600 font-mono tracking-tighter">LIVE FEED: SAT-NODE-09</span>
                        </div>
                        <h1 className="text-xl font-black text-white uppercase tracking-tighter">Global Restoration Mapping</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="glass-panel p-1 rounded-xl flex bg-black/40 border border-white/10 backdrop-blur-md">
                        {["nutrients", "threats", "deployment"].map(layer => (
                            <button
                                key={layer}
                                onClick={() => setActiveLayer(layer)}
                                className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeLayer === layer ? 'bg-white/10 text-[#00D9C0]' : 'text-slate-500 hover:text-white'}`}
                            >
                                {layer}
                            </button>
                        ))}
                    </div>
                    <button className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md">
                        <Maximize2 size={18} />
                    </button>
                </div>
            </header>

            {/* Left Sidebar: Data Explorer */}
            <aside className="absolute top-32 left-8 bottom-8 w-80 z-20 flex flex-col gap-6 pointer-events-none">
                <div className="glass-panel p-6 rounded-[2rem] border border-white/10 bg-black/20 backdrop-blur-xl pointer-events-auto flex-1 overflow-y-auto custom-scrollbar">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Regional Intel</h3>

                    <div className="space-y-8">
                        {[
                            { label: "Water Temp", value: "28.4°C", icon: Thermometer, trend: "+1.2", color: "text-[#FF6B6B]" },
                            { label: "pH Levels", value: "8.02", icon: Droplets, trend: "-0.05", color: "text-[#00D9C0]" },
                            { label: "Nitrogen (N)", value: "1.2 μM", icon: Target, trend: "+0.1", color: "text-[#FFD700]" },
                            { label: "Phosphate (P)", value: "0.05 μM", icon: Waves, trend: "Stable", color: "text-[#0077BE]" }
                        ].map(metric => (
                            <div key={metric.label} className="flex items-center gap-4">
                                <div className={`size-10 rounded-xl bg-white/5 flex items-center justify-center ${metric.color}`}>
                                    <metric.icon size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{metric.label}</span>
                                        <span className="text-[9px] font-bold text-slate-500">{metric.trend}</span>
                                    </div>
                                    <div className="text-lg font-mono font-black text-white leading-none mt-1">{metric.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-5 rounded-2xl bg-[#00D9C0]/5 border border-[#00D9C0]/10 border-dashed">
                        <p className="text-[9px] text-[#00D9C0] font-bold leading-relaxed uppercase tracking-widest">
                            Recommendation: Lucayan Shelf requires 3D-printed C-Bricks™ infused with McH1-7 Prebiotics within 30 days.
                        </p>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md pointer-events-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Active ReefMakers</span>
                        <Activity size={16} className="text-[#00D9C0] animate-pulse" />
                    </div>
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="size-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-[#00D9C0] transition-all cursor-pointer">
                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                            </div>
                        ))}
                        <div className="size-8 rounded-full border-2 border-slate-900 bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">+12</div>
                    </div>
                </div>
            </aside>

            {/* Right Panel: Deployment Stats */}
            <aside className="absolute top-32 right-8 bottom-8 w-80 z-20 flex flex-col gap-6 pointer-events-none">
                <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-xl pointer-events-auto flex flex-col gap-8">
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Restoration ROI</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Calculated Bio-Credits</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sequestration</span>
                                <span className="text-sm font-mono font-black text-white">4.2 kT CO2e</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biodiversity Score</span>
                                <span className="text-sm font-mono font-black text-[#00D9C0]">+34.2%</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deployment Cost</span>
                                <span className="text-sm font-mono font-black text-white">$142k</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-end gap-4">
                        <button className="w-full py-4 rounded-xl bg-[#00D9C0] text-black font-black uppercase text-[10px] tracking-widest hover:bg-[#00f2ff] transition-all">
                            Initialize Deployment
                        </button>
                        <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                            View Site Metrics
                        </button>
                    </div>
                </div>

                {/* Mini Compass / Tools */}
                <div className="flex gap-4 pointer-events-auto">
                    <button className="flex-1 glass-panel py-4 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 transition-all flex flex-col items-center gap-2">
                        <Compass size={20} className="text-slate-400" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Auto-Nav</span>
                    </button>
                    <button className="flex-1 glass-panel py-4 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 transition-all flex flex-col items-center gap-2">
                        <Anchor size={20} className="text-slate-400" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Drop Point</span>
                    </button>
                    <button className="flex-1 glass-panel py-4 rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 transition-all flex flex-col items-center gap-2">
                        <Wind size={20} className="text-slate-400" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Currents</span>
                    </button>
                </div>
            </aside>

            {/* Viewport Zoom Controls */}
            <div className="absolute bottom-8 right-1/2 translate-x-1/2 z-20 flex items-center gap-4 pointer-events-auto">
                <div className="glass-panel p-2 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2">
                    <button className="size-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"><ZoomIn size={18} /></button>
                    <div className="w-px h-6 bg-white/10"></div>
                    <button className="size-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"><ZoomOut size={18} /></button>
                </div>
            </div>
        </div>
    );
}

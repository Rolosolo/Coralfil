"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
    Layout, Database, Wind, Droplets, Thermometer, 
    Activity, ShieldCheck, Zap, ArrowRight, Play, 
    Pause, RotateCcw, Info, CheckCircle2, AlertTriangle,
    Eye, BarChart3, Globe, Layers, Microscope
} from "lucide-react";
import { motion, AnimatePresence } from "@/components/motion-client";

export default function GrowthEnginePage() {
    const [currentTime, setCurrentTime] = useState(0); // 0 to 180 days (6 months)
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Time-lapse simulation
    useEffect(() => {
        let interval: any;
        if (isAnimating) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= 180) {
                        setIsAnimating(false);
                        return 180;
                    }
                    return prev + 2;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isAnimating]);

    const months = ["Launch", "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];
    const currentMonthIndex = Math.floor(currentTime / 30);
    
    // Stats based on time
    const stats = useMemo(() => {
        const factor = currentTime / 180;
        return {
            growth: (factor * 340).toFixed(1), // %
            survival: (98 - factor * 4).toFixed(1), // %
            calcification: (12 + factor * 28).toFixed(1), // mg/cm²
            resilience: (82 + factor * 14).toFixed(0) // %
        };
    }, [currentTime]);

    return (
        <div className="flex flex-col h-full bg-[#010307] text-white overflow-hidden">
            {/* Header */}
            <header className="p-8 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between z-30">
                <div className="flex items-center gap-6">
                    <div className="size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(0,217,192,0.1)]">
                        <Activity size={28} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] bg-primary/20 text-primary border border-primary/20">Digital Twin Sim</span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-tighter">NODE: GROWTH-CORE-V1</span>
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">Growth Engine</h1>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
                    <button 
                        onClick={() => setIsAnimating(!isAnimating)}
                        className={`size-12 rounded-xl flex items-center justify-center transition-all ${isAnimating ? 'bg-amber-500/20 text-amber-500' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}
                    >
                        {isAnimating ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button 
                        onClick={() => { setCurrentTime(0); setIsAnimating(false); }}
                        className="size-12 rounded-xl bg-white/5 text-slate-400 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5"
                    >
                        <RotateCcw size={20} />
                    </button>
                    <div className="px-6 border-l border-white/10 flex flex-col justify-center">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Timeline Status</span>
                        <div className="text-sm font-black text-white uppercase tracking-tighter">{months[currentMonthIndex]} <span className="text-primary ml-2">({currentTime} Days)</span></div>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-hidden">
                {/* Left: Digital Twin Visualizer */}
                <div className="col-span-8 flex flex-col gap-6">
                    <div className="flex-1 glass-panel rounded-[3rem] border border-white/10 bg-black/60 relative overflow-hidden group">
                        {/* Environmental Background Layers */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,217,192,0.15),transparent_70%)]"></div>
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
                        
                        {/* Seabed Grid (Perspective) */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/50 to-transparent perspective-[1000px]">
                            <div className="absolute inset-0 origin-bottom rotate-x-60 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
                        </div>

                        {/* Species Labels / Metadata */}
                        <div className="absolute top-8 left-8 space-y-2 pointer-events-none">
                            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Target: Acropora Cervicornis</span>
                            </div>
                            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 opacity-60">
                                <span className="size-2 rounded-full bg-blue-400"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Substrate: Carbonate Ooze</span>
                            </div>
                        </div>

                        {/* THE TWIN: Central Colony Visualization */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative">
                                {/* Base Pellet Matrix */}
                                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-12 h-4 bg-primary/40 rounded-full blur-sm animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}></div>
                                    ))}
                                </div>
                                
                                {/* Growing Coral Core (Procedural SVG approximation) */}
                                <motion.div 
                                    className="relative z-10"
                                    animate={{ 
                                        scale: 1 + (currentTime / 180) * 1.5,
                                        filter: `drop-shadow(0 0 ${10 + (currentTime / 180) * 40}px rgba(0,217,192,0.4))`
                                    }}
                                >
                                    <svg width="240" height="240" viewBox="0 0 100 100" className="drop-shadow-2xl">
                                        <motion.path 
                                            d="M50 80 Q50 40 50 20" 
                                            stroke="#00D9C0" strokeWidth="4" fill="none" strokeLinecap="round"
                                            animate={{ d: `M50 80 Q${50 + Math.sin(currentTime/10)*2} ${40 - (currentTime/10)} 50 ${20 - (currentTime/5)}` }}
                                        />
                                        {[...Array(6)].map((_, i) => (
                                            <motion.path 
                                                key={i}
                                                d={`M50 60 Q${30 + i*8} 40 ${20 + i*12} 30`}
                                                stroke="#00D9C0" strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.6 + (currentTime/180) * 0.4}
                                                animate={{ 
                                                    d: `M50 ${60 - (currentTime/10)} Q${30 + i*8 + Math.sin(currentTime/20 + i)*5} ${40 - (currentTime/15)} ${20 + i*12 + Math.cos(currentTime/20 + i)*10} ${30 - (currentTime/8)}` 
                                                }}
                                            />
                                        ))}
                                    </svg>
                                </motion.div>

                                {/* Regional Allies & Threats (Floating Tooltips) */}
                                <AnimatePresence>
                                    {currentTime > 60 && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="absolute -left-48 top-0 p-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-md"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <ShieldCheck size={14} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase text-primary">Allies Detected</span>
                                            </div>
                                            <div className="text-[9px] text-slate-300 font-bold uppercase leading-tight">Crustatcean Symbionts<br/>+14% Health Multiplier</div>
                                        </motion.div>
                                    )}
                                    {currentTime > 120 && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="absolute -right-48 bottom-10 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-md"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertTriangle size={14} className="text-red-400" />
                                                <span className="text-[10px] font-black uppercase text-red-400">Threat Mitigated</span>
                                            </div>
                                            <div className="text-[9px] text-slate-300 font-bold uppercase leading-tight">Algal Overgrowth<br/>Neural Suppression Active</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Bottom Overlay Info */}
                        <div className="absolute bottom-8 right-8 text-right">
                            <div className="text-[10px] font-mono text-slate-500 mb-1">REAL-TIME TELEMETRY</div>
                            <div className="text-xl font-black text-white tabular-nums tracking-tighter">SURVIVAL PROBABILITY: {stats.survival}%</div>
                        </div>
                    </div>

                    {/* Timeline Navigation */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/[0.02]">
                        <div className="relative h-2 w-full bg-white/5 rounded-full mb-4 px-1">
                            <motion.div 
                                className="absolute inset-y-0 left-0 bg-primary/40 rounded-full"
                                style={{ width: `${(currentTime / 180) * 100}%` }}
                            ></motion.div>
                            <input 
                                type="range" 
                                min="0" max="180" value={currentTime}
                                onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <div className="flex justify-between px-2">
                            {months.map((m, i) => (
                                <span key={m} className={`text-[9px] font-black uppercase tracking-widest ${Math.floor(currentTime/30) >= i ? 'text-primary' : 'text-slate-600'}`}>
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Growth Analytics */}
                <div className="col-span-4 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
                    {/* Performance Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-black/40 text-center">
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Biomass Growth</div>
                            <div className="text-2xl font-black text-white tracking-tighter">+{stats.growth}%</div>
                            <div className="mt-2 text-[8px] font-bold text-primary uppercase">Optimized Target</div>
                        </div>
                        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-black/40 text-center">
                            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Calcification</div>
                            <div className="text-2xl font-black text-white tracking-tighter">{stats.calcification}</div>
                            <div className="mt-2 text-[8px] font-bold text-slate-500 uppercase">mg / cm² / Day</div>
                        </div>
                    </div>

                    {/* Regional Map Snapshot */}
                    <div className="glass-panel p-6 rounded-[2.5rem] border border-white/10 bg-black/40 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <Globe size={14} className="text-primary" />
                                Ecosystem Integration
                            </h4>
                            <span className="text-[8px] font-bold text-primary italic">Live Sync</span>
                        </div>
                        <div className="aspect-video bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden">
                            {/* Abstract Map UI */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute top-1/4 left-1/4 size-20 rounded-full border border-primary/40 animate-ping"></div>
                                <div className="absolute top-1/2 left-2/3 size-32 rounded-full border border-slate-500/20"></div>
                                <svg className="w-full h-full">
                                    <path d="M0 50 Q50 20 100 50 T200 50" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 2" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Region: Exuma Cays</div>
                                    <div className="text-[8px] font-bold text-primary uppercase">Cluster ID: RM-492-B</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Genetic Resilience Metrics */}
                    <div className="glass-panel p-6 rounded-[2.5rem] border border-primary/10 bg-primary/5">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">Epigenetic Adaptive Readiness</h4>
                        <div className="space-y-4">
                            {[
                                { label: "Heat Shock Response", val: stats.resilience, sym: Zap },
                                { label: "Pathogen Shielding", val: 94, sym: ShieldCheck },
                                { label: "pH Stabilization", val: 88, sym: Droplets }
                            ].map(m => (
                                <div key={m.label} className="flex items-center gap-4">
                                    <div className="size-8 rounded-lg bg-black/40 flex items-center justify-center text-primary group">
                                        <m.sym size={14} className="group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{m.label}</span>
                                            <span className="text-[10px] font-black text-primary">{m.val}%</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-primary"
                                                animate={{ width: `${m.val}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Simulation Insights */}
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                        <div className="flex items-start gap-4">
                            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                <Microscope size={20} />
                            </div>
                            <div>
                                <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Matrix Effectiveness Log</h5>
                                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                    "Pellet dissolution matched 1:1 with calcification uptake. Phosphorus spike at day 42 managed by regional symbionts. Overall biomass expansion exceeds standard baseline by <span className="text-primary font-bold">2.4x</span>."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

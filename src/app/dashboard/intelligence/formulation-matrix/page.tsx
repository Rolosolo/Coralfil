"use client";

import React, { useState } from "react";
import {
    FlaskConical, Zap, Shield, Droplets, Thermometer,
    Waves, TrendingUp, Info, Plus, Play, Download,
    ArrowUpRight, Activity, Percent, Layers, Box,
    AlertCircle, CheckCircle2, MoreHorizontal, Save
} from "lucide-react";
import { motion } from "@/components/motion-client";

export default function FormulationMatrixPage() {
    const [activeFormulation, setActiveFormulation] = useState("SCTLD-Guardian-v2");
    const [isSimulating, setIsSimulating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const ingredients = [
        { name: "Activated Oyster Shell", range: "35-45%", current: 40, function: "Ca²⁺ / pH Buffer", target: "8.1 pH" },
        { name: "Low MW Chitosan", range: "10-15%", current: 12, function: "Matrix / Antimicrobial", target: "Binding" },
        { name: "Sodium Alginate", range: "15-20%", current: 18, function: "Encapsulation", target: "G-Block" },
        { name: "L-Glutamic Acid", range: "2500ppm", current: 3, function: "Settlement Cue", target: "10^-5 M" },
        { name: "McH1-7 Probiotics", range: "10^9 CFU", current: 8, function: "Pathogen Shield", target: "Bio-Seal" },
        { name: "MgO Stabilizer", range: "3-7%", current: 5, function: "Thermal Resilience", target: "PSII Support" }
    ];

    const healthMetrics = [
        { label: "Predictive Efficacy", value: "88%", trend: "+2.4%", status: "optimal" },
        { label: "Leach Rate (7d)", value: "14.2 g", trend: "-1.1%", status: "stable" },
        { label: "Ionic Strength", value: "0.72M", trend: "0.0%", status: "stable" },
        { label: "Cost / m²", value: "$4.12", trend: "$-0.12", status: "optimal" }
    ];

    const runSimulation = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setIsSimulating(false);
            setShowResult(true);
        }, 2500);
    };

    return (
        <div className="flex flex-col h-full bg-[#010307] text-slate-200 overflow-hidden">
            {/* Header */}
            <header className="p-8 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between z-30 sticky top-0">
                <div className="flex items-center gap-6">
                    <div className="size-14 rounded-2xl bg-[#00D9C0]/10 border border-[#00D9C0]/20 flex items-center justify-center text-[#00D9C0] shadow-[0_0_30px_rgba(0,217,192,0.1)]">
                        <FlaskConical size={28} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] bg-[#00D9C0]/20 text-[#00D9C0] border border-[#00D9C0]/20">Precision Bio-Synthesis</span>
                            <span className="text-[10px] text-slate-500 font-mono tracking-tighter">SPECIES: ACROPORA CERVICORNIS</span>
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">Formulation Matrix</h1>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                        <Save size={14} />
                        Save Preset
                    </button>
                    <button className="px-8 py-3 rounded-xl bg-[#00D9C0] text-black font-black uppercase tracking-widest text-[10px] hover:bg-[#00f2ff] transition-all flex items-center gap-2 shadow-[0_0_30_px_rgba(0,217,192,0.3)]">
                        <Download size={14} />
                        Export Spec (PDF)
                    </button>
                </div>
            </header>

            {/* Main Content Dashboard */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 overflow-y-auto custom-scrollbar">

                {/* Left Panel: Ingredient Controls */}
                <div className="col-span-8 space-y-8">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        {healthMetrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col justify-between"
                            >
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">{metric.label}</span>
                                <div className="flex items-end justify-between">
                                    <div className="text-2xl font-black text-white tracking-tighter">{metric.value}</div>
                                    <div className={`text-[10px] font-bold ${metric.trend.startsWith('+') ? 'text-[#00D9C0]' : 'text-slate-500'}`}>{metric.trend}</div>
                                </div>
                                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00D9C0]/40 w-full"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Synthesis Core (Slider List) */}
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-xl space-y-10">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                                <Box size={18} className="text-[#00D9C0]" />
                                Component Ratio Synthesis
                            </h3>
                            <button className="text-[10px] font-black text-[#00D9C0] uppercase tracking-widest hover:underline transition-all">Reset to Benchmark</button>
                        </div>

                        <div className="space-y-10">
                            {ingredients.map((ing, i) => (
                                <div key={ing.name} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-white uppercase tracking-widest group">{ing.name}</span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{ing.function} • <span className="text-[#00D9C0]">{ing.target}</span></span>
                                        </div>
                                        <div className="text-sm font-mono font-black text-[#00D9C0] bg-[#00D9C0]/5 px-3 py-1 rounded-lg border border-[#00D9C0]/20">{ing.current}%</div>
                                    </div>
                                    <div className="relative group">
                                        {/* Slider Track */}
                                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                            <div className="h-full bg-gradient-to-r from-[#0077BE]/40 via-[#00D9C0] to-[#00f2ff]/80 rounded-full shadow-[0_0_15px_rgba(0,217,192,0.5)]" style={{ width: `${ing.current}%` }}></div>
                                        </div>
                                        <div className="absolute top-1/2 -translate-y-1/2 h-4 border-x border-white/10 w-[10%] bg-white/5 pointer-events-none" style={{ left: '35%' }}></div>
                                        <input
                                            type="range"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            min="0" max="100" value={ing.current}
                                            onChange={() => { }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final Commercial / Production Output */}
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="grid grid-cols-2 gap-8"
                        >
                            {/* Production Recipe */}
                            <div className="glass-panel p-8 rounded-[2.5rem] border border-[#00D9C0]/20 bg-[#00D9C0]/5">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black text-[#00D9C0] uppercase tracking-widest">Internal Recipe File</span>
                                    <div className="px-2 py-1 rounded bg-black/40 text-[8px] font-mono text-[#00D9C0]">CFM-2026-X.json</div>
                                </div>
                                <h4 className="text-lg font-black text-white uppercase mb-4">CoralStick™ Pellet Recipe</h4>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-[10px] font-mono"><span className="text-slate-500">MIX_TIME:</span> <span className="text-white">45min</span></div>
                                    <div className="flex justify-between text-[10px] font-mono"><span className="text-slate-500">EXTRUDE_PRES:</span> <span className="text-white">12.4 Bar</span></div>
                                    <div className="flex justify-between text-[10px] font-mono"><span className="text-slate-500">T_COOL:</span> <span className="text-white">4.2°C</span></div>
                                </div>
                                <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[9px] text-slate-500 leading-relaxed italic">
                                    "Recipe successfully pushed to North Cowichan manufacturing node. Ready for automated extrusion."
                                </div>
                            </div>

                            {/* Customer Quotation */}
                            <div className="glass-panel p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Client Quotation</span>
                                    <span className="text-[8px] font-bold text-white bg-primary px-2 py-0.5 rounded italic">Drafting Quote...</span>
                                </div>
                                <h4 className="text-lg font-black text-white uppercase mb-4">Project Estimate</h4>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                                        <span className="text-xs text-slate-400">Est. Total Cost (1.2Ha):</span>
                                        <span className="text-lg font-black text-white">$44,520.00</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">Lead Time (PO Driven):</span>
                                        <span className="text-sm font-bold text-primary">14-18 Days</span>
                                    </div>
                                </div>
                                <button className="w-full py-3 rounded-xl bg-primary text-black font-black uppercase tracking-widest text-[9px]">Generate Formal PO</button>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Panel: Analysis & Recommendations */}
                <div className="col-span-4 space-y-8">
                    {/* Neural Advisor */}
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-[#00D9C0]/20 bg-gradient-to-br from-[#00D9C0]/5 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap size={80} className="text-[#00D9C0]" />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-2 rounded-full bg-[#00D9C0] animate-glow"></div>
                            <span className="text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.3em]">Matrix Recommendation</span>
                        </div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight mb-4">Nutrient Density Optimized</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                            Based on your species selection, we've calibrated the matrix for <span className="text-white font-bold tracking-tight uppercase">High-Heat Environments</span>.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                                <CheckCircle2 size={16} className="text-[#00D9C0]" />
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Bleaching Recovery +32%</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                                <CheckCircle2 size={16} className="text-[#00D9C0]" />
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Structural Adhesion Verified</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={runSimulation}
                        disabled={isSimulating}
                        className={`w-full py-6 rounded-2xl border transition-all text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 group ${
                            isSimulating ? 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed' : 
                            'bg-[#010307] border-white/10 hover:border-[#00D9C0]/50 hover:bg-[#00D9C0]/5 text-slate-400 hover:text-white'
                        }`}
                    >
                        {isSimulating ? (
                            <>
                                <Activity size={18} className="animate-spin" />
                                Analyzing Synthesis Path...
                            </>
                        ) : (
                            <>
                                <Play size={18} className="group-hover:text-[#00D9C0] transition-colors" />
                                Initiate Formulation Synthesis
                            </>
                        )}
                    </button>

                    {/* Threat Mitigation Radar */}
                    <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-xl">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Target Environment Threats</h4>
                        <div className="space-y-6">
                            {[
                                { label: "SCTLD Pathogens", value: 92, status: "high", color: "bg-[#FF6B6B]" },
                                { label: "Thermal Anomalies", value: 45, status: "moderate", color: "bg-[#FFD700]" },
                                { label: "Acidification", value: 78, status: "high", color: "bg-[#00D9C0]" }
                            ].map(threat => (
                                <div key={threat.label} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{threat.label}</span>
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${threat.status === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-500'}`}>{threat.status} Risk</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${threat.value}%` }}
                                            className={`h-full ${threat.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


"use client";

import React, { useState, useEffect } from "react";
import {
    Zap, Shield, Droplets, Info, Beaker,
    Microscope, FlaskConical, Atom, Binary,
    Database, Cpu, Share2
} from "lucide-react";

import { dataService } from "@/lib/data-service";

interface ChemicalMatrix {
    aminoAcids: {
        aspartic_acid: number;
        glutamic_acid: number;
        taurine: number;
    };
    minerals: {
        calcium: number;
        magnesium: number;
        strontium: number;
        potassium: number;
    };
    ratios: {
        oysterShell: number;
        alginate: number;
        chitosan: number;
    };
}

export function CoralfillSynthesisEngine({ speciesId }: { speciesId?: string }) {
    const [matrix, setMatrix] = useState<ChemicalMatrix>({
        aminoAcids: { aspartic_acid: 45, glutamic_acid: 30, taurine: 25 },
        minerals: { calcium: 85, magnesium: 10, strontium: 4, potassium: 1 },
        ratios: { oysterShell: 40, alginate: 35, chitosan: 25 }
    });
    const [aiInsight, setAiInsight] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!speciesId) return;

        const loadFormula = async () => {
            setIsLoading(true);
            const [data, insight] = await Promise.all([
                dataService.getCoralfillFormula(speciesId),
                // We'll mock the environment for now, but in reality it comes from project context
                import("@/lib/context7").then(m => m.getBiomimeticContext(speciesId, "shallow_tropical"))
            ]);

            if (data) {
                setMatrix({
                    aminoAcids: data.amino_acid_profile,
                    minerals: data.mineral_profile,
                    ratios: {
                        oysterShell: Number(data.oyster_shell_ratio),
                        alginate: Number(data.alginate_ratio),
                        chitosan: Number(data.chitosan_ratio)
                    }
                });
            }
            if (insight) {
                setAiInsight(String((insight as any).best_practice_tip || ""));
            }
            setIsLoading(false);
        };
        loadFormula();
    }, [speciesId]);

    // Compute Biomimicry Score based on ratios and nutrient density
    const biomimicryScore = Math.round(Math.min(100, (matrix.ratios.oysterShell + matrix.aminoAcids.aspartic_acid + matrix.minerals.calcium) / 2));

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(matrix, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `coralfill_synthesis_${speciesId || 'custom'}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Header: Unified Material Science */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Beaker className="text-primary" size={20} />
                        Coralfill™ Synthesis
                    </h3>
                    <p className="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] mt-2">
                        Unified Nutrient-Substrate Engine
                    </p>
                </div>
                <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                    <Binary size={12} className="text-primary animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">AI Computed</span>
                </div>
            </div>

            {/* Matrix Tabs/Sections */}
            <div className="space-y-8">
                {/* Section 1: Chemical Matrix (Amino Acids) */}
                <div className="p-6 bg-white/[0.02] rounded-[32px] border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Atom size={18} className="text-secondary" />
                            <span className="text-xs font-black text-white uppercase tracking-widest">Amino Acid Profile</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Growth Support Matrix</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {Object.entries(matrix.aminoAcids).map(([key, val]) => (
                            <div key={key} className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{key.replace('_', ' ')}</label>
                                    <span className="text-xs font-mono font-bold text-white">{val}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100" value={val}
                                    onChange={(e) => setMatrix({
                                        ...matrix,
                                        aminoAcids: { ...matrix.aminoAcids, [key as keyof typeof matrix.aminoAcids]: parseInt(e.target.value) }
                                    })}
                                    className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-secondary"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Mineral Matrix */}
                <div className="p-6 bg-white/[0.02] rounded-[32px] border border-white/5 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <Droplets size={18} className="text-secondary" />
                            <span className="text-xs font-black text-white uppercase tracking-widest">Mineral Profile</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Ionic Support Layer</span>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {Object.entries(matrix.minerals).map(([key, val]) => (
                            <div key={key} className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{key}</label>
                                    <span className="text-xs font-mono font-bold text-white">{val}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="100" value={val}
                                    onChange={(e) => setMatrix({
                                        ...matrix,
                                        minerals: { ...matrix.minerals, [key as keyof typeof matrix.minerals]: parseInt(e.target.value) }
                                    })}
                                    className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-secondary"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 3: Biopolymer Ratio (The Tripartite) */}
                <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/20 flex flex-col gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FlaskConical size={80} className="text-primary" />
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                        <Microscope size={18} className="text-primary" />
                        <span className="text-xs font-black text-white uppercase tracking-widest">Tripartite Synthesis Ratio</span>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {/* Oyster Shell */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-primary font-black uppercase">Oyster Shell Powder</span>
                                <span className="text-xs font-mono font-black text-white">{matrix.ratios.oysterShell}%</span>
                            </div>
                            <input
                                type="range" min="0" max="100" value={matrix.ratios.oysterShell}
                                onChange={(e) => setMatrix({
                                    ...matrix,
                                    ratios: { ...matrix.ratios, oysterShell: parseInt(e.target.value) }
                                })}
                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        {/* Alginate */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-primary font-black uppercase">Sodium Alginate</span>
                                <span className="text-xs font-mono font-black text-white">{matrix.ratios.alginate}%</span>
                            </div>
                            <input
                                type="range" min="0" max="100" value={matrix.ratios.alginate}
                                onChange={(e) => setMatrix({
                                    ...matrix,
                                    ratios: { ...matrix.ratios, alginate: parseInt(e.target.value) }
                                })}
                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                        {/* Chitosan */}
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-primary font-black uppercase">Chitosan (Shell Binding)</span>
                                <span className="text-xs font-mono font-black text-white">{matrix.ratios.chitosan}%</span>
                            </div>
                            <input
                                type="range" min="0" max="100" value={matrix.ratios.chitosan}
                                onChange={(e) => setMatrix({
                                    ...matrix,
                                    ratios: { ...matrix.ratios, chitosan: parseInt(e.target.value) }
                                })}
                                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 3: Machine Synchronization */}
                <div className="p-6 bg-black/40 rounded-[32px] border border-white/10 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Database size={16} className="text-slate-500" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Synthesis Output Data</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[9px] font-mono text-green-500 uppercase">Hardware Ready</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-slate-600 font-bold uppercase">Biomimicry Score</span>
                            <span className="text-xl font-mono font-black text-white">{biomimicryScore}%</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] text-slate-600 font-bold uppercase">Synthesis ID</span>
                            <span className="text-xl font-mono font-black text-slate-300">CF-892-X</span>
                        </div>
                    </div>

                    <button
                        onClick={handleExport}
                        className="w-full mt-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 transition-all group"
                    >
                        <Share2 size={14} className="text-slate-400 group-hover:text-white" />
                        <span className="text-[10px] font-black text-slate-400 group-hover:text-white uppercase tracking-widest">Export to Formulator Machine</span>
                    </button>
                </div>
            </div>

            {/* Insight Message */}
            <div className="px-5 py-4 bg-primary/5 rounded-[24px] border border-primary/10 flex flex-col gap-2 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:rotate-12 transition-transform">
                    <Cpu size={32} className="text-primary" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/20 rounded-lg text-primary">
                        <Cpu size={14} />
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Coralfill AI Insight</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed relative z-10">
                    {aiInsight || "Synthesis computes both the C-Brick substrate and CoralStick additive from the same Coralfill™ Base. Formula adapted for species settlement biomimicry."}
                </p>
            </div>
        </div>
    );
}

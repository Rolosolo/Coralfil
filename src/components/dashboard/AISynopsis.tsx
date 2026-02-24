"use client";

import React from "react";
import { Brain, Sparkles, Terminal, Info } from "lucide-react";

interface AISynopsisProps {
    environmentType?: string;
    speciesCount: number;
    mixRatio: number;
    ionicStrength: number;
}

export function AISynopsis({ environmentType, speciesCount, mixRatio, ionicStrength }: AISynopsisProps) {
    // Logic to generate a high-level synopsis based on parameters
    const getSynopsis = () => {
        let text = "Analyzing environmental vector matrix... ";

        if (ionicStrength > 80) {
            text += "Prioritizing high-energy bonding for turbulent zones. ";
        } else {
            text += "Optimizing for steady nutrient release in sheltered waters. ";
        }

        if (mixRatio > 80) {
            text += "Calcium Carbonate saturation maximized for structural rigidity. ";
        }

        if (speciesCount > 2) {
            text += `Diversity Matrix identified ${speciesCount} target species; generating poly-morphic settlement surfaces. `;
        }

        text += "Coralfill™ base adapted for biomimetic success.";
        return text;
    };

    return (
        <div className="bg-[#00D9C0]/10 border border-[#00D9C0]/20 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Brain className="text-[#00D9C0] w-4 h-4" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Neural Synopsis</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#00D9C0] animate-pulse"></div>
                    <span className="text-[8px] font-mono text-[#00D9C0]/60">v4.2.0-stable</span>
                </div>
            </div>

            <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                    <span className="text-[#00D9C0] mr-2">&gt;</span>
                    {getSynopsis()}
                </p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        <div className="w-4 h-4 rounded-full bg-primary/40 border border-white/10 flex items-center justify-center">
                            <Terminal size={8} className="text-white" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-secondary/40 border border-white/10 flex items-center justify-center">
                            <Sparkles size={8} className="text-white" />
                        </div>
                    </div>
                    <span className="text-[9px] text-slate-500 italic">R&D Hypothesized Range: +22.4% success variance</span>
                </div>
                <button
                    onClick={() => window.open('https://github.com/Rolosolo/Coralfil/tree/main/docs/science-wiki', '_blank')}
                    className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors group"
                >
                    <Info size={10} className="text-[#00D9C0]" />
                    <span className="text-[8px] font-bold text-slate-400 group-hover:text-white uppercase tracking-widest">Verify Sources</span>
                </button>
            </div>
        </div>
    );
}

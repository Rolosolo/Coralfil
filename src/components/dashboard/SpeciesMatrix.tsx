"use client";

import React, { useState } from "react";
import { Dna, Activity, Zap, Check, ChevronRight } from "lucide-react";
import { SpeciesProfile } from "@/lib/demo-data";

interface SpeciesMatrixProps {
    species: SpeciesProfile[];
    selectedIds: string[];
    onToggle: (id: string) => void;
}

export function SpeciesMatrix({ species, selectedIds, onToggle }: SpeciesMatrixProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((s) => {
                const isSelected = selectedIds.includes(s.id);
                return (
                    <div
                        key={s.id}
                        onClick={() => onToggle(s.id)}
                        className={`group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${isSelected
                                ? 'bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(0,217,192,0.15)] ring-1 ring-primary/30'
                                : 'bg-[#0c1629]/60 border-white/5 hover:border-white/20 hover:bg-[#0c1629]/80 shadow-xl'
                            }`}
                    >
                        {/* Status Overlay */}
                        <div className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-primary text-black scale-110 shadow-lg' : 'bg-black/40 text-slate-500 scale-100'
                            }`}>
                            {isSelected ? <Check size={18} strokeWidth={3} /> : <Dna size={16} />}
                        </div>

                        {/* Image & Gradient */}
                        <div className="h-44 relative overflow-hidden">
                            <img
                                src={s.imageUrl || "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800"}
                                alt={s.commonName}
                                className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${isSelected ? 'from-primary/20 via-[#02060c]/80 to-transparent' : 'from-[#02060c] via-[#02060c]/40 to-transparent'
                                }`}></div>

                            {/* Growth Rate Badge */}
                            <div className="absolute bottom-4 left-4 flex flex-col">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Growth Matrix</span>
                                <div className="flex items-center gap-2">
                                    <Activity size={12} className="text-secondary" />
                                    <span className="text-sm font-mono text-white font-bold">{s.growthRate}cm/yr</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-lg font-black text-white leading-tight uppercase tracking-tight">{s.commonName}</h3>
                                <p className="text-xs font-mono text-slate-400 italic">{s.scientificName}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Resilience Score</span>
                                    <span className={`text-xs font-mono font-bold ${s.resilienceScore > 80 ? 'text-green-400' : s.resilienceScore > 60 ? 'text-primary' : 'text-secondary'
                                        }`}>{s.resilienceScore}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${s.resilienceScore > 80 ? 'bg-green-500' : s.resilienceScore > 60 ? 'bg-primary' : 'bg-secondary'
                                            }`}
                                        style={{ width: `${s.resilienceScore}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-primary animate-pulse" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">UV Resistance: HIGH</span>
                                </div>
                                <ChevronRight size={16} className={`transition-transform duration-300 ${isSelected ? 'translate-x-0' : 'translate-x-2 opacity-0 group-hover:opacity-100'}`} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

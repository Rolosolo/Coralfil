"use client";

import React, { useState } from "react";
import { Droplets, Shield, Zap, Info, Thermometer, Waves } from "lucide-react";

interface FormulationState {
    ionicStrength: number;
    uvFilterLevel: number;
    nutrientDensity: number;
    spawningTrigger: boolean;
}

export function CoralStickFormulator() {
    const [formulation, setFormulation] = useState<FormulationState>({
        ionicStrength: 85,
        uvFilterLevel: 92,
        nutrientDensity: 45,
        spawningTrigger: true,
    });

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">CoralStick™ Formulation</h3>
                    <p className="text-xs text-primary/60 font-mono uppercase tracking-[0.2em] mt-1">Ionic Bonding & Protection</p>
                </div>
                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Premium Additive</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Ionic Strength */}
                <div className="flex flex-col gap-4 p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-xl text-primary">
                                <Zap size={18} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest">Ionic Binding Strength</span>
                        </div>
                        <span className="text-lg font-mono font-black text-white">{formulation.ionicStrength}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={formulation.ionicStrength}
                        onChange={(e) => setFormulation({ ...formulation, ionicStrength: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <p className="text-[10px] text-slate-500 font-medium">Controls the adhesion rate of the CoralStick coating to the C-Brick substrate.</p>
                </div>

                {/* UV Filter */}
                <div className="flex flex-col gap-4 p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-secondary/20 rounded-xl text-secondary">
                                <Shield size={18} />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest">UV Protection Matrix</span>
                        </div>
                        <span className="text-lg font-mono font-black text-white">{formulation.uvFilterLevel}%</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="100"
                        value={formulation.uvFilterLevel}
                        onChange={(e) => setFormulation({ ...formulation, uvFilterLevel: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-secondary"
                    />
                    <p className="text-[10px] text-slate-500 font-medium">Synthetic melanin density for solar radiation defense in shallow waters.</p>
                </div>

                {/* Spawning Agent Toggle */}
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-3xl border border-primary/20 group cursor-pointer transition-all hover:bg-primary/10"
                    onClick={() => setFormulation({ ...formulation, spawningTrigger: !formulation.spawningTrigger })}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl transition-all duration-500 ${formulation.spawningTrigger ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,217,192,0.4)]' : 'bg-white/5 text-slate-500'}`}>
                            <Droplets size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-widest text-white">Spawning Activation Agent</span>
                            <span className="text-[10px] font-bold text-primary animate-pulse">LUNAR CO-ORDINATED</span>
                        </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${formulation.spawningTrigger ? 'bg-primary' : 'bg-white/10'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${formulation.spawningTrigger ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/5 flex items-start gap-3">
                <Info size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                    <span className="text-white font-bold">REEFMASTER AI TIP:</span> Current formulation increases overall reef resilience by <span className="text-primary font-bold">24%</span> but increases cost per C-Brick by $12.50.
                </p>
            </div>
        </div>
    );
}

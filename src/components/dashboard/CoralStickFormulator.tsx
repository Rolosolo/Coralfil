"use client";

import React, { useState, useEffect } from "react";
import { Droplets, Shield, Zap, Info, Thermometer, Waves, Beaker, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PROBIOTIC_CONSORTIA, REGIONAL_DISEASE_RISK, ProbioticConsortium, SpeciesProfile, SPECIES_DB } from "@/lib/demo-data";
import { motion, AnimatePresence } from "@/components/motion-client";

interface FormulationState {
    ionicStrength: number;
    uvFilterLevel: number;
    nutrientDensity: number;
    spawningTrigger: boolean;
    selectedConsortium: string | null;
    cellDensity: number; // CFU/g (10^8 format)
}

interface ProbioticFormulatorProps {
    projectLocation?: string;
    selectedSpeciesIds?: string[];
    onUpdate?: (state: FormulationState) => void;
}

export function CoralStickFormulator({ projectLocation, selectedSpeciesIds, onUpdate }: ProbioticFormulatorProps) {
    const [formulation, setFormulation] = useState<FormulationState>({
        ionicStrength: 85,
        uvFilterLevel: 92,
        nutrientDensity: 45,
        spawningTrigger: true,
        selectedConsortium: null,
        cellDensity: 8, // 10^8 CFU/g
    });

    const activeRisk = projectLocation ? REGIONAL_DISEASE_RISK[projectLocation] : null;
    const recommendedConsortium = projectLocation ? PROBIOTIC_CONSORTIA.find(c =>
        c.geographicFocus.some(f => projectLocation.includes(f))
    ) : null;

    useEffect(() => {
        if (recommendedConsortium && !formulation.selectedConsortium) {
            setFormulation(prev => ({ ...prev, selectedConsortium: recommendedConsortium.name }));
        }
    }, [recommendedConsortium]);

    // Calculate Synbiotic Synergy
    const calculateSynergy = () => {
        let base = formulation.cellDensity * 10;
        if (recommendedConsortium?.name === formulation.selectedConsortium) base += 25;
        if (formulation.nutrientDensity > 50) base += 15;
        return Math.min(base, 100);
    };

    const synergyScore = calculateSynergy();

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

                {/* Probiotic Consortium Selection */}
                <div className="flex flex-col gap-6 p-8 bg-[#00D9C0]/5 rounded-[40px] border border-[#00D9C0]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Beaker size={80} className="text-[#00D9C0]" />
                    </div>

                    <div className="flex flex-col relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h4 className="text-lg font-black text-white uppercase tracking-tight">Probiotic Consortium</h4>
                                <p className="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] mt-1">Disease Management Layer</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                                <span className="text-[9px] font-black text-primary uppercase">Cell Density: 10⁸ CFU/g</span>
                            </div>
                        </div>

                        {activeRisk && (
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl mb-6"
                            >
                                <AlertTriangle size={20} className="text-orange-400 shrink-0" />
                                <div>
                                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Regional Risk Detected</p>
                                    <p className="text-xs text-orange-200 mt-1">{activeRisk.disease} prevalence is {activeRisk.risk} in this region.</p>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PROBIOTIC_CONSORTIA.map(c => (
                                <div
                                    key={c.name}
                                    onClick={() => setFormulation({ ...formulation, selectedConsortium: c.name })}
                                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${formulation.selectedConsortium === c.name
                                        ? 'bg-primary border-primary shadow-[0_10px_30px_rgba(0,217,192,0.2)]'
                                        : 'bg-white/5 border-white/10 hover:border-primary/50'}`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-[11px] font-black uppercase tracking-widest ${formulation.selectedConsortium === c.name ? 'text-black' : 'text-white'}`}>
                                            {c.name}
                                        </span>
                                        {formulation.selectedConsortium === c.name && <CheckCircle2 size={16} className="text-black" />}
                                    </div>
                                    <p className={`text-[9px] leading-relaxed ${formulation.selectedConsortium === c.name ? 'text-black/70' : 'text-slate-500'}`}>
                                        Targets: {c.targetDisease}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-3">
                                        {c.strains.slice(0, 2).map(s => (
                                            <span key={s} className={`text-[8px] px-1.5 py-0.5 rounded-md font-mono ${formulation.selectedConsortium === c.name ? 'bg-black/10 text-black' : 'bg-white/10 text-slate-400'}`}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Synbiotic Synergy HUD */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Synbiotic Synergy Index</span>
                                <span className="text-xl font-mono font-black text-primary">{synergyScore}%</span>
                            </div>
                            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${synergyScore}%` }}
                                    className={`h-full bg-gradient-to-r ${synergyScore > 70 ? 'from-primary to-blue-400' : 'from-orange-400 to-primary-dark'}`}
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 mt-3 italic leading-relaxed">
                                synbiotic formulation combining prebiotics (Taurine, Fucoidan) with the {formulation.selectedConsortium || 'selected'} consortium to enable active tissue colonization.
                            </p>
                        </div>
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

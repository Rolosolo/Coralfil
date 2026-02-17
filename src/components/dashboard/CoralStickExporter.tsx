"use client";

import React, { useState } from "react";
import { Download, FileJson, Droplets, Zap, Shield, Info } from "lucide-react";

interface CoralStickSpec {
    pelletSpecs: {
        diameter: number;
        weight: number;
        dissolutionRate: string;
    };
    ionicComposition: {
        ionicStrength: number;
        uvFilterLevel: number;
        nutrientDensity: number;
        spawningTrigger: boolean;
    };
    packaging: {
        pelletsPerKg: number;
        shelfLife: string;
        storageTemp: string;
    };
}

export function CoralStickExporter({
    ionicStrength,
    uvFilterLevel,
    nutrientDensity,
    spawningTrigger
}: {
    ionicStrength: number;
    uvFilterLevel: number;
    nutrientDensity: number;
    spawningTrigger: boolean;
}) {
    const generateSpec = (): CoralStickSpec => {
        return {
            pelletSpecs: {
                diameter: 8.5,
                weight: 2.3,
                dissolutionRate: "14-21 days (controlled release)"
            },
            ionicComposition: {
                ionicStrength,
                uvFilterLevel,
                nutrientDensity,
                spawningTrigger
            },
            packaging: {
                pelletsPerKg: 435,
                shelfLife: "18 months (sealed)",
                storageTemp: "15-25°C, dry environment"
            }
        };
    };

    const handleExport = () => {
        const spec = generateSpec();
        const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coralstick-pellet-manufacturing-spec.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="glass-panel p-8 rounded-[32px] border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                        <Droplets size={20} className="text-secondary" />
                        CoralStick™ Export
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Pellet manufacturing specifications</p>
                </div>
                <div className="px-3 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Premium Additive</span>
                </div>
            </div>

            {/* Pellet Preview */}
            <div className="bg-[#02060c] rounded-2xl p-6 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                    <Droplets size={64} className="text-secondary/40 mx-auto mb-3" />
                    <div className="text-sm font-mono text-white">Ionic Bonding Pellet</div>
                    <div className="text-xs text-slate-500 mt-1">Ø 8.5mm | 2.3g | 435 pellets/kg</div>
                </div>
            </div>

            {/* Composition Display */}
            <div className="bg-secondary/5 border border-secondary/10 rounded-xl p-4 space-y-2">
                <div className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                    <Zap size={12} />
                    Active Formulation
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                        <span>Ionic Binding Strength</span>
                        <span className="font-mono">{ionicStrength}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>UV Protection Matrix</span>
                        <span className="font-mono">{uvFilterLevel}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Nutrient Density</span>
                        <span className="font-mono">{nutrientDensity}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Spawning Trigger</span>
                        <span className={`font-mono ${spawningTrigger ? 'text-primary' : 'text-slate-500'}`}>
                            {spawningTrigger ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Packaging Specs */}
            <div className="space-y-2">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Packaging & Storage</div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#02060c] p-3 rounded-xl border border-white/5">
                        <div className="text-[10px] text-slate-500 mb-1">Shelf Life</div>
                        <div className="text-sm font-mono text-white">18 months</div>
                    </div>
                    <div className="bg-[#02060c] p-3 rounded-xl border border-white/5">
                        <div className="text-[10px] text-slate-500 mb-1">Storage Temp</div>
                        <div className="text-sm font-mono text-white">15-25°C</div>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            <button
                onClick={handleExport}
                className="w-full bg-secondary hover:bg-secondary/90 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-secondary/20 hover:shadow-secondary/40"
            >
                <Download size={20} />
                Export CoralStick Spec
            </button>

            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-blue-300 leading-relaxed">
                    Exports a JSON specification for CoralStick pellet production. Includes ionic composition, dissolution rate, and packaging requirements for industrial manufacturing.
                </p>
            </div>
        </div>
    );
}

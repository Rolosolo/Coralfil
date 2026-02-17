"use client";

import React, { useState } from "react";
import { Download, FileJson, Printer, Box, Layers, Zap, Info } from "lucide-react";

interface PrintSpec {
    geometry: {
        type: string;
        dimensions: { width: number; height: number; depth: number };
        nutrientChannels: { diameter: number; count: number };
    };
    material: {
        baseComposition: string;
        calciumCarbonateRatio: number;
        additives: string[];
    };
    printParameters: {
        layerHeight: number;
        infillDensity: number;
        nozzleTemp: number;
        printSpeed: number;
    };
}

export function CBrickExporter({ brickType, mixRatio }: { brickType: string; mixRatio: number }) {
    const [layerHeight, setLayerHeight] = useState(0.2);
    const [infillDensity, setInfillDensity] = useState(85);
    const [nozzleTemp, setNozzleTemp] = useState(210);

    const generateSpec = (): PrintSpec => {
        return {
            geometry: {
                type: brickType === "hex" ? "Hexagonal Lattice" : "Standard Lattice",
                dimensions: { width: 150, height: 80, depth: 150 },
                nutrientChannels: { diameter: 3.5, count: 12 }
            },
            material: {
                baseComposition: "Coralfill™ Base (CaCO3 + Bioactive Polymers)",
                calciumCarbonateRatio: mixRatio,
                additives: ["Magnesium Oxide (2%)", "Trace Minerals (0.5%)"]
            },
            printParameters: {
                layerHeight,
                infillDensity,
                nozzleTemp,
                printSpeed: 45
            }
        };
    };

    const handleExport = () => {
        const spec = generateSpec();
        const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cbrick-${brickType}-manufacturing-spec.json`;
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
                        <Printer size={20} className="text-primary" />
                        3D Print Export
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Manufacturing-ready specifications</p>
                </div>
                <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Industrial Grade</span>
                </div>
            </div>

            {/* Brick Preview */}
            <div className="bg-[#02060c] rounded-2xl p-6 border border-white/5 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                    <Box size={64} className="text-primary/40 mx-auto mb-3" />
                    <div className="text-sm font-mono text-white">{brickType === "hex" ? "Hexagonal Lattice" : "Standard Lattice"}</div>
                    <div className="text-xs text-slate-500 mt-1">150 × 80 × 150 mm</div>
                </div>
            </div>

            {/* Print Parameters */}
            <div className="space-y-4">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Zap size={12} className="text-primary" />
                    Print Parameters
                </div>

                {/* Layer Height */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-400">Layer Height</label>
                        <span className="text-xs font-mono text-white">{layerHeight.toFixed(2)} mm</span>
                    </div>
                    <input
                        type="range"
                        min="0.1"
                        max="0.4"
                        step="0.05"
                        value={layerHeight}
                        onChange={(e) => setLayerHeight(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                </div>

                {/* Infill Density */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-400">Infill Density</label>
                        <span className="text-xs font-mono text-white">{infillDensity}%</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="100"
                        step="5"
                        value={infillDensity}
                        onChange={(e) => setInfillDensity(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                </div>

                {/* Nozzle Temperature */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-400">Nozzle Temperature</label>
                        <span className="text-xs font-mono text-white">{nozzleTemp}°C</span>
                    </div>
                    <input
                        type="range"
                        min="190"
                        max="230"
                        step="5"
                        value={nozzleTemp}
                        onChange={(e) => setNozzleTemp(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                </div>
            </div>

            {/* Material Composition */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-2">
                <div className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                    <Layers size={12} />
                    Material Composition
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                        <span>Coralfill™ Base</span>
                        <span className="font-mono">{mixRatio}%</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                        <span>Magnesium Oxide</span>
                        <span className="font-mono">2%</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                        <span>Trace Minerals</span>
                        <span className="font-mono">0.5%</span>
                    </div>
                </div>
            </div>

            {/* Export Button */}
            <button
                onClick={handleExport}
                className="w-full bg-primary hover:bg-primary/90 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40"
            >
                <Download size={20} />
                Export Manufacturing Spec
            </button>

            <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <p className="text-[10px] text-blue-300 leading-relaxed">
                    Exports a JSON specification compatible with industrial FDM/FFF printers. Includes geometry, material composition, and optimized print parameters for high-volume production.
                </p>
            </div>
        </div>
    );
}

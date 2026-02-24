"use client";

import React, { useEffect, useState } from "react";
import { Thermometer, Waves, Gauge, Droplets, Activity, ShieldAlert, Globe, Map } from "lucide-react";
import { NOAAData } from "@/lib/noaa-service";
import { AllenAtlasData } from "@/lib/allen-atlas-service";

export default function EnvironmentalScanner({ noaaData, atlasData }: { noaaData?: NOAAData | null, atlasData?: AllenAtlasData | null }) {
    const [scanning, setScanning] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Reset and scan when data arrives or is missing
        setScanning(true);
        setProgress(0);
        const timer = setInterval(() => {
            setProgress((prev: number) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setScanning(false);
                    return 100;
                }
                return prev + 5;
            });
        }, 30);
        return () => clearInterval(timer);
    }, [noaaData, atlasData]);

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Activity size={16} className="text-primary animate-pulse" />
                    Site Telemetry
                </h3>
                {scanning ? (
                    <span className="text-xs text-primary font-mono">SYNCING {progress}%</span>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20 font-mono tracking-tighter uppercase whitespace-nowrap">Integrated Remote Sensing</span>
                        <span className="text-xs text-[#00ffca] font-mono">ONLINE</span>
                    </div>
                )}
            </div>

            {scanning ? (
                <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden bg-primary/5 rounded-xl border border-primary/10">
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan top-0"></div>
                    <div className="w-24 h-24 border border-primary/20 rounded-full flex items-center justify-center relative scale-75 md:scale-100">
                        <div className="absolute inset-0 border border-primary/40 rounded-full border-dashed animate-spin-slow"></div>
                        <Activity size={24} className="text-primary opacity-50" />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 animate-fade-in flex-grow">
                    {/* Metric 1: SST (NOAA) */}
                    <div className="bg-[#02060c] p-3 rounded-xl border border-white/5 relative group overflow-hidden">
                        <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-2">
                            <Thermometer size={12} className="text-orange-400" /> SST (NOAA)
                        </div>
                        <div className="text-xl font-mono text-white">{noaaData?.sst.toFixed(1) || "28.4"}<span className="text-[10px] text-slate-500 ml-1">°C</span></div>
                        <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400" style={{ width: `${((noaaData?.sst || 28.4) / 35) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Metric 2: DHW (NOAA) */}
                    <div className="bg-[#02060c] p-3 rounded-xl border border-white/5 relative group overflow-hidden">
                        <div className="text-slate-500 text-[10px] uppercase mb-1 flex items-center gap-2">
                            <ShieldAlert size={12} className="text-red-400" /> Heat Stress
                        </div>
                        <div className="text-xl font-mono text-white">{noaaData?.dhw.toFixed(1) || "4.2"}<span className="text-[10px] text-slate-500 ml-1">DHW</span></div>
                        <div className="text-[9px] text-red-400 font-bold mt-1 uppercase tracking-tighter">{noaaData?.bleaching_risk || "Alert Level 1"}</div>
                    </div>

                    {/* Metric 3: Geomorphic Zone (ACA) */}
                    <div className="bg-[#02060c] p-3 rounded-xl border border-primary/10 relative group overflow-hidden">
                        <div className="text-primary/60 text-[10px] uppercase mb-1 flex items-center gap-2 font-black">
                            <Map size={12} /> Geomorphic (ACA)
                        </div>
                        <div className="text-sm font-bold text-white uppercase tracking-tight truncate">{atlasData?.geomorphicZone || "Inner Reef Flat"}</div>
                        <div className="absolute top-1 right-2 text-[8px] font-mono text-primary/40">{((atlasData?.confidence ?? 0.89) * 100).toFixed(0)}% CONF</div>
                    </div>

                    {/* Metric 4: Benthic Habitat (ACA) */}
                    <div className="bg-[#02060c] p-3 rounded-xl border border-primary/10 relative group overflow-hidden">
                        <div className="text-primary/60 text-[10px] uppercase mb-1 flex items-center gap-2 font-black">
                            <Globe size={12} /> Benthic (ACA)
                        </div>
                        <div className="text-sm font-bold text-white uppercase tracking-tight">{atlasData?.benthicHabitat || "Coral/Algae"}</div>
                        <div className="text-[9px] text-slate-500 font-mono mt-1 italic">DEPTH: {atlasData?.bathymetry || -4.2}m</div>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Activity, Droplets, Gauge, Thermometer, Waves } from "lucide-react";

export default function EnvironmentalScanner() {
    const [scanning, setScanning] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setScanning(false);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-full flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Activity size={16} className="text-primary animate-pulse" />
                    Env. Analysis
                </h3>
                {scanning ? (
                    <span className="text-xs text-primary font-mono">SCANNING {progress}%</span>
                ) : (
                    <span className="text-xs text-[#00ffca] font-mono">COMPLETE</span>
                )}
            </div>

            {scanning ? (
                <div className="flex-grow flex flex-col items-center justify-center relative overflow-hidden bg-primary/5 rounded-xl border border-primary/10">
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan top-0"></div>
                    <div className="w-32 h-32 border border-primary/20 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 border border-primary/40 rounded-full border-dashed animate-spin-slow"></div>
                        <div className="w-24 h-24 border border-primary/10 rounded-full animate-pulse"></div>
                        <Activity size={24} className="text-primary opacity-50" />
                    </div>
                    <p className="mt-4 text-[9px] text-primary/70 font-mono tracking-[0.2em] uppercase">Acquiring Telemetry...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    {/* Metric 1 */}
                    <div className="bg-[#02060c] p-4 rounded-xl border border-white/5">
                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center gap-2">
                            <Thermometer size={12} /> Temp
                        </div>
                        <div className="text-2xl font-mono text-white">28.4<span className="text-sm text-slate-500">°C</span></div>
                        <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-400 w-[70%]"></div>
                        </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="bg-[#02060c] p-4 rounded-xl border border-white/5">
                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center gap-2">
                            <Droplets size={12} /> Salinity
                        </div>
                        <div className="text-2xl font-mono text-white">35.2<span className="text-sm text-slate-500">ppt</span></div>
                        <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-400 w-[85%]"></div>
                        </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="bg-[#02060c] p-4 rounded-xl border border-white/5">
                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center gap-2">
                            <Waves size={12} /> Flow
                        </div>
                        <div className="text-2xl font-mono text-white">Med<span className="text-sm text-slate-500">-High</span></div>
                        <div className="text-xs text-slate-500 mt-1">2.4 m/s current</div>
                    </div>

                    {/* Metric 4 */}
                    <div className="bg-[#02060c] p-4 rounded-xl border border-white/5">
                        <div className="text-slate-400 text-xs uppercase mb-1 flex items-center gap-2">
                            <Gauge size={12} /> pH Level
                        </div>
                        <div className="text-2xl font-mono text-white">8.1<span className="text-sm text-slate-500">pH</span></div>
                        <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                            <div className="h-full bg-green-400 w-[95%]"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

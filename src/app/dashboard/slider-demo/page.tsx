"use client";

import { CoralSlider } from "@/components/ui/CoralSlider";
import { useState } from "react";
import { motion } from "@/components/motion-client";

export default function SliderDemoPage() {
    const [density, setDensity] = useState(50);
    const [depth, setDepth] = useState(12);
    const [growth, setGrowth] = useState(7.5);
    const [temp, setTemp] = useState(26);

    return (
        <div className="min-h-screen bg-[#010307] py-16 px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-left"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-[1px] bg-[#00D9C0]/50"></div>
                        <span className="text-[8px] font-black text-[#00D9C0] uppercase tracking-[0.4em]">Utility Components</span>
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">CoralSlider Protocol</h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                        Interface standards for interactive parameter modeling within the ReefMaker ecosystem.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.02] p-12 rounded-[2rem] border border-white/5 space-y-12 backdrop-blur-3xl"
                >
                    <CoralSlider
                        label="Coral Density"
                        value={density}
                        onChange={setDensity}
                        unit="%"
                    />

                    <CoralSlider
                        label="Water Depth"
                        value={depth}
                        min={0}
                        max={50}
                        onChange={setDepth}
                        unit="m"
                    />

                    <CoralSlider
                        label="Growth Rate"
                        value={growth}
                        min={1}
                        max={15}
                        step={0.5}
                        onChange={setGrowth}
                        unit=" cm/yr"
                    />

                    <CoralSlider
                        label="System Temperature"
                        value={temp}
                        min={20}
                        max={35}
                        onChange={setTemp}
                        unit="°C"
                        disabled
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-3 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Active Palette</h3>
                        <div className="flex items-center gap-3">
                            <div className="size-3 rounded-sm bg-[#00D9C0] shadow-[0_0_10px_rgba(0,217,192,0.4)]"></div>
                            <span className="text-[9px] font-mono text-slate-500 font-bold uppercase">#00D9C0</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Geometry</h3>
                        <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">THUMB: 18PX (FIXED)</p>
                        <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">TRACK: 2PX (LINE)</p>
                    </div>
                    <div className="flex flex-col gap-3 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Protocol</h3>
                        <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">HOVER: GLOW_INTENSE</p>
                        <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">ACTIVE: SCALE_1.15</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

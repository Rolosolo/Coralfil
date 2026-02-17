"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowRight, ChevronRight, Layers, Box, Cpu, FileCheck,
    Terminal, Settings2, Grid, Dna, Droplets, Activity,
    Play, Pause, Zap, Info, Shield, Sun, Moon, Sunrise, Beaker
} from "lucide-react";
import EnvironmentalScanner from "@/components/dashboard/EnvironmentalScanner";
import StatusLog from "@/components/dashboard/StatusLog";
import { SpeciesMatrix } from "@/components/dashboard/SpeciesMatrix";
import { ComponentType } from "react";
import { CoralfillSynthesisEngine } from "@/components/dashboard/CoralfillSynthesisEngine";
import { useTheme, EnvTheme } from "@/components/dashboard/ThemeController";
import { dataService } from "@/lib/data-service";
import { Project, SpeciesProfile } from "@/lib/demo-data";

type TabType = "parameters" | "species" | "synthesis" | "simulation";

export default function DesignPage({ params }: { params: { id: string } }) {
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<TabType>("parameters");
    const [selectedBrick, setSelectedBrick] = useState("hex");
    const [mixRatio, setMixRatio] = useState(85);
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [species, setSpecies] = useState<SpeciesProfile[]>([]);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const [sData, pData] = await Promise.all([
                dataService.getSpecies(),
                dataService.getProjectById(params.id)
            ]);
            setSpecies(sData);
            setProject(pData);
            if (pData?.targetSpecies) {
                setSelectedSpecies(pData.targetSpecies);
            }
        };
        loadData();
    }, [params.id]);

    const toggleSpecies = (id: string) => {
        setSelectedSpecies(prev =>
            prev.includes(id) ? prev.filter(s => s != id) : [...prev, id]
        );
    };

    return (
        <div className="h-full flex flex-col xl:flex-row gap-8 relative">
            {/* HUD Left: Static Context & Scanner */}
            <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0 z-20">
                <div className="p-6 bg-white/[0.03] rounded-[32px] border border-white/10 glass-panel">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-3">Project Vector</div>
                    <div className="flex flex-col gap-1 mb-6">
                        <h1 className="text-xl font-black text-white uppercase tracking-tight leading-none">Sector A-4</h1>
                        <p className="text-xs text-slate-500 font-mono italic">Northern Great Barrier Reef</p>
                    </div>

                    <div className="space-y-6">
                        <div className="h-44">
                            <EnvironmentalScanner />
                        </div>
                        <StatusLog />
                    </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/20 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,217,192,0.8)]"></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Link Active</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                        AI recommending <span className="text-primary font-bold">CoralStick™ Ionic+</span> for thermal stress mitigation based on current sea surface anomalies.
                    </p>
                </div>
            </div>

            {/* HUD Center: Active Viewport */}
            <div className={`flex-1 min-h-[500px] rounded-[48px] overflow-hidden border transition-all duration-1000 relative group/viewport ${isSimulating ? 'border-primary/40 shadow-[0_0_80px_rgba(0,217,192,0.1)]' : 'border-white/10'
                }`}>
                {/* Environmental Lighting Overlays */}
                <div className={`absolute inset-0 transition-all duration-1000 z-10 pointer-events-none ${theme === 'midnight' ? 'bg-[#02060c]/40' :
                    theme === 'sunset' ? 'bg-orange-500/10 mix-blend-color-burn' :
                        'bg-sky-400/5 mix-blend-overlay'
                    }`}></div>

                {/* Grid & Reticles */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_95%)] z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] z-10 pointer-events-none"></div>

                {/* HUD Viewport Metadata */}
                <div className="absolute top-8 left-8 z-30 flex flex-col gap-1 pointer-events-none">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Telemetry Preview</span>
                    <span className="text-xs font-mono text-white/40">LAT: -14.672 | LON: 145.421</span>
                </div>

                {/* Theme Selector Overlay */}
                <div className="absolute top-8 right-8 z-30 flex items-center gap-1 bg-black/60 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                    {(['midday', 'sunset', 'midnight'] as EnvTheme[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${theme === t ? 'bg-primary text-black shadow-lg' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {t === 'midday' && <Sun size={18} />}
                            {t === 'sunset' && <Sunrise size={18} />}
                            {t === 'midnight' && <Moon size={18} />}
                        </button>
                    ))}
                </div>

                {/* 3D Visualizer (Placeholder Mock) */}
                <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${isSimulating ? 'scale-110' : 'scale-100'}`}>
                    <div className="relative w-[80%] h-[80%] flex items-center justify-center">
                        <div className={`absolute inset-0 bg-primary/10 blur-[150px] rounded-full transition-all duration-1000 ${isSimulating ? 'opacity-100 scale-125' : 'opacity-20'}`}></div>
                        <img
                            src={selectedBrick === "hex"
                                ? "https://lh3.googleusercontent.com/aida-public/AB6AXuC-7VNh1Dz7HPG50qXW05jsncOXKSFu5ekx1--FTHYoJ_zRiKuWzxVeYLFyeeCHlg6oWlzygogeIle-utrOBgud8WlKBgHTPdokffbIKfG1E561H7BwSQeO9_X651agp6TpQtQ8FAuIWa9R9DOTbBDxVeT3DknhKP9UXU0SgECWUlAO63D-8NLoheeqkzx0YhQAdyN75duv2cC3e_Q6YVPiss7aTpK92k4_BXUn4Zk1jIKTeTFV5eMQQL05yLRdktHCntJF0zHctz0"
                                : "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800"}
                            alt="C-Brick View"
                            className={`max-w-[70%] max-h-[70%] object-contain relative z-20 transition-all duration-700 ${isSimulating ? 'drop-shadow-[0_0_50px_rgba(0,217,192,0.6)] brightness-110' : 'drop-shadow-[0_0_30px_rgba(0,217,192,0.2)] grayscale-[30%]'
                                }`}
                        />
                    </div>
                </div>

                {/* Simulation HUD Overlays */}
                {isSimulating && (
                    <div className="absolute inset-0 z-40 pointer-events-none p-12 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="p-6 bg-black/60 backdrop-blur-xl border border-primary/30 rounded-3xl flex flex-col gap-4 animate-bubble">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Structural Resilience</span>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-mono font-black text-white">94.2</span>
                                    <span className="text-primary text-xs font-bold mb-1.5">+2.4% vs Baseline</span>
                                </div>
                            </div>
                            <div className="p-6 bg-black/60 backdrop-blur-xl border border-primary/30 rounded-3xl flex flex-col gap-4 animate-bubble" style={{ animationDelay: '0.2s' }}>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Growth Forecast</span>
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-mono font-black text-white">8.5<span className="text-xl">cm/yr</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="px-8 py-4 bg-primary/20 backdrop-blur-3xl border border-primary/40 rounded-full flex items-center gap-6 shadow-[0_0_40px_rgba(0,217,192,0.2)]">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                    <span className="text-sm font-black text-white uppercase tracking-widest">Active Matrix Simulation</span>
                                </div>
                                <div className="h-4 w-[1px] bg-white/20"></div>
                                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-tighter">Stress Test @ 31.4°C [Thermal Ceiling]</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Controls */}
                <div className="absolute bottom-12 left-0 right-0 z-50 flex justify-center items-center gap-8 pointer-events-none">
                    <div className="pointer-events-auto flex items-center gap-4 bg-[#02060c]/60 backdrop-blur-2xl p-2 rounded-[32px] border border-white/10 shadow-2xl">
                        <button
                            onClick={() => setSelectedBrick("hex")}
                            className={`px-8 py-4 rounded-3xl transition-all flex flex-col items-center gap-1 min-w-[140px] ${selectedBrick === "hex" ? 'bg-primary text-black font-black shadow-lg scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Box size={20} />
                            <span className="text-[10px] uppercase font-black tracking-widest leading-none mt-1">Hex Brick v4</span>
                        </button>
                        <button
                            onClick={() => setSelectedBrick("dome")}
                            className={`px-8 py-4 rounded-3xl transition-all flex flex-col items-center gap-1 min-w-[140px] ${selectedBrick === "dome" ? 'bg-primary text-black font-black shadow-lg scale-105' : 'text-slate-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Layers size={20} />
                            <span className="text-[10px] uppercase font-black tracking-widest leading-none mt-1">Bio Dome v2</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsSimulating(!isSimulating)}
                        className={`pointer-events-auto h-20 w-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative overflow-hidden group/play ${isSimulating
                            ? 'bg-red-500 text-white shadow-red-500/20'
                            : 'bg-primary text-black shadow-primary/20 hover:scale-110 active:scale-95'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 ${isSimulating ? 'translate-y-0' : 'group-hover/play:translate-y-0'}`}></div>
                        {isSimulating ? <Pause size={32} className="relative z-10" /> : <Play size={32} className="relative z-10 translate-x-1" />}
                    </button>
                </div>
            </div>

            {/* HUD Right: Configuration Panels */}
            <div className="w-full xl:w-[480px] flex flex-col shrink-0 z-20">
                <div className="flex-1 bg-white/[0.03] rounded-[48px] border border-white/10 flex flex-col overflow-hidden glass-panel">
                    {/* Modular Tabs */}
                    <div className="flex p-3 bg-black/40 border-b border-white/10 gap-2">
                        {(['parameters', 'species', 'synthesis'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 rounded-3xl flex flex-col items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-[0.2em] ${activeTab === tab
                                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-[inset_0_0_20px_rgba(0,217,192,0.1)]'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {tab === 'parameters' && <Settings2 size={16} />}
                                {tab === 'species' && <Dna size={16} />}
                                {tab === 'synthesis' && <Beaker size={16} />}
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Panel Area */}
                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                        {activeTab === 'parameters' && (
                            <div className="flex flex-col gap-10">
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">Substrate Tuning</h3>
                                            <p className="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] mt-2 leading-none">Base Biome Ratio</p>
                                        </div>
                                        <span className="text-2xl font-mono font-black text-white leading-none">{mixRatio}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="100" value={mixRatio}
                                        onChange={(e) => setMixRatio(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="flex-1 p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                                            <span className="text-[9px] font-black text-slate-500 uppercase">Resilience</span>
                                            <span className="text-lg font-mono font-bold text-white">HI</span>
                                        </div>
                                        <div className="flex-1 p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
                                            <span className="text-[9px] font-black text-slate-500 uppercase">Sequestration</span>
                                            <span className="text-lg font-mono font-bold text-white">MED</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'species' && (
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Diversity Matrix</h3>
                                    <p className="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] mt-1">Genetic Optimization Layer</p>
                                </div>
                                <SpeciesMatrix
                                    species={species}
                                    selectedIds={selectedSpecies}
                                    onToggle={toggleSpecies}
                                />
                            </div>
                        )}

                        {activeTab === 'synthesis' && (
                            <CoralfillSynthesisEngine
                                speciesId={selectedSpecies[0]}
                                environmentType={project?.environmentType}
                            />
                        )}
                    </div>

                    {/* Footer Export Section */}
                    <div className="p-8 bg-black/60 border-t border-white/10 backdrop-blur-3xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">Estimated Unit Cost</span>
                                <span className="text-4xl font-black text-white tracking-tighter">$45.00 <span className="text-lg text-slate-500">USD</span></span>
                            </div>
                            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">CO2 IMPACT</span>
                                <span className="text-lg font-mono font-black text-white">+12.4kg</span>
                            </div>
                        </div>
                        <Link href="/dashboard/quote" className="w-full flex items-center justify-center gap-4 py-5 rounded-[24px] bg-primary text-[#02060c] font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(0,217,192,0.3)] hover:-translate-y-1 transition-all duration-300">
                            <FileCheck size={20} strokeWidth={3} />
                            Generate Pro-Spec Proposal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

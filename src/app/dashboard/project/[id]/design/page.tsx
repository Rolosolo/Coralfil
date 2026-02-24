"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    Target,
    Beaker,
    FileText,
    Sun,
    Sunrise,
    Moon,
    Box,
    Layers,
    Pause,
    Play,
    Settings2,
    Dna,
    Terminal,
    Brain,
    FileCheck,
    AlertTriangle,
    Activity,
    Printer
} from "lucide-react";
import { motion, AnimatePresence } from "@/components/motion-client";
import { dataService } from "@/lib/data-service";
import { Project, SpeciesProfile, REGIONAL_DISEASE_RISK, SPECIES_DB } from "@/lib/demo-data";
import { noaaService, NOAAData } from "@/lib/noaa-service";
import { allenAtlasService, AllenAtlasData } from "@/lib/allen-atlas-service";
import { useTheme, EnvTheme } from "@/components/dashboard/ThemeController";

// UI Components
import EnvironmentalScanner from "@/components/dashboard/EnvironmentalScanner";
import StatusLog from "@/components/dashboard/StatusLog";
import { AISynopsis } from "@/components/dashboard/AISynopsis";
import { SatelliteMapOverlay } from "@/components/dashboard/SatelliteMapOverlay";
import { SpeciesMatrix } from "@/components/dashboard/SpeciesMatrix";
import { CoralfillSynthesisEngine } from "@/components/dashboard/CoralfillSynthesisEngine";
import { CBrickExporter } from "@/components/dashboard/CBrickExporter";
import { CoralStickExporter } from "@/components/dashboard/CoralStickExporter";
import { QuotationGenerator } from "@/components/dashboard/QuotationGenerator";
import { CoralStickFormulator } from "@/components/dashboard/CoralStickFormulator";

type TabType = "parameters" | "species" | "synthesis" | "manufacturing" | "quotation";

export default function DesignPage({ params }: { params: { id: string } }) {
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<TabType>("parameters");
    const [selectedBrick, setSelectedBrick] = useState("hex");
    const [mixRatio, setMixRatio] = useState(85);
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [viewMode, setViewMode] = useState<'sim' | 'sat'>('sim');
    const [species, setSpecies] = useState<SpeciesProfile[]>([]);
    const [project, setProject] = useState<Project | null>(null);
    const [noaaData, setNoaaData] = useState<NOAAData | null>(null);
    const [atlasData, setAtlasData] = useState<AllenAtlasData | null>(null);

    // CoralStick formulation state
    const [ionicStrength, setIonicStrength] = useState(85);
    const [uvFilterLevel, setUvFilterLevel] = useState(92);
    const [nutrientDensity, setNutrientDensity] = useState(45);
    const [spawningTrigger, setSpawningTrigger] = useState(true);
    const [selectedConsortium, setSelectedConsortium] = useState<string | null>(null);
    const [cellDensity, setCellDensity] = useState(8);

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

            // Auto-populate NOAA data based on project location
            const lat = pData?.coordinates?.[0] ?? 48.8333; // Default to Barkley Sound, BC
            const lon = pData?.coordinates?.[1] ?? -125.1333;

            const [nData, aData] = await Promise.all([
                noaaService.getCoralMetrics(lat, lon),
                allenAtlasService.getSpatialIntelligence(lat, lon)
            ]);
            setNoaaData(nData);
            setAtlasData(aData);

            // Persist spatial intelligence to the master database if successful
            if (nData) {
                dataService.saveSpatialData(params.id, "NOAA", "sst_heat_stress", nData, { resolution: "5km" });
            }
            if (aData) {
                dataService.saveSpatialData(params.id, "Allen Coral Atlas", "benthic_geomorphic", aData, { resolution: "5m" });
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
        <div className="h-full flex flex-col xl:flex-row gap-8 2xl:gap-12 relative max-w-[2400px] mx-auto">
            {/* HUD Left: Static Context & Scanner */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full xl:w-80 2xl:w-96 flex flex-col gap-6 shrink-0 z-20"
            >
                <div className="p-6 bg-white/[0.03] rounded-[32px] border border-white/10 glass-panel">
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-3">Project Vector</div>
                    <div className="flex flex-col gap-1 mb-6">
                        <h1 className="text-xl font-black text-white uppercase tracking-tight leading-none">{project?.name || "Sector A-4"}</h1>
                        <p className="text-xs text-slate-500 font-mono italic">{project?.location || "Northern Great Barrier Reef"}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="h-56">
                            <EnvironmentalScanner noaaData={noaaData} atlasData={atlasData} />
                        </div>
                        <StatusLog />
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-primary/5 rounded-[32px] border border-primary/20 flex flex-col gap-4"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,217,192,0.8)]"></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Link Active</span>
                    </div>
                    <AISynopsis
                        speciesCount={selectedSpecies.length}
                        mixRatio={mixRatio}
                        ionicStrength={ionicStrength}
                    />
                </motion.div>

                {/* Dashboard Bridge */}
                <div className="p-6 bg-white/[0.03] rounded-[32px] border border-white/10 flex flex-col gap-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Dashboard Bridge</span>
                    <nav className="flex flex-col gap-2">
                        <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <LayoutDashboard size={16} />
                            <span className="text-xs font-bold">Project Hub</span>
                        </Link>
                        <Link href={`/dashboard/project/${params.id}/scan`} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <Target size={16} />
                            <span className="text-xs font-bold">Site Scan</span>
                        </Link>
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/20 text-primary border border-primary/20">
                            <Beaker size={16} />
                            <span className="text-xs font-bold uppercase tracking-tight">Active Designer</span>
                        </div>
                        <Link href="/investors" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
                            <FileText size={16} />
                            <span className="text-xs font-bold">R&D Pack</span>
                        </Link>
                    </nav>
                </div>
            </motion.div>

            {/* HUD Center: Active Viewport */}
            <motion.div
                layoutId="hero-viewport"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`flex-1 min-h-[500px] rounded-[48px] overflow-hidden border transition-all duration-1000 relative group/viewport ${isSimulating ? 'border-primary/40 shadow-[0_0_80px_rgba(0,217,192,0.1)]' : 'border-white/10'
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
                    <a
                        href="https://github.com/Rolosolo/Coralfil/tree/main/docs/science-wiki"
                        target="_blank"
                        className="pointer-events-auto flex items-center gap-2 mt-2 text-[10px] text-primary/40 hover:text-primary transition-all uppercase font-bold tracking-widest"
                    >
                        <Brain size={12} />
                        Verify Science
                    </a>
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

                {/* View Mode Toggle */}
                <div className="absolute top-8 left-8 z-30 flex items-center gap-1 bg-black/60 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                    <button
                        onClick={() => setViewMode('sim')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'sim' ? 'bg-primary text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Simulation
                    </button>
                    <button
                        onClick={() => setViewMode('sat')}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'sat' ? 'bg-primary text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        Satellite Intel
                    </button>
                </div>

                {/* Satellite View Overlay */}
                <AnimatePresence>
                    {viewMode === 'sat' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20"
                        >
                            <SatelliteMapOverlay />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3D Visualizer (Placeholder Mock) - Only visible in 'sim' mode */}
                {viewMode === 'sim' && (
                    <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${isSimulating ? 'scale-110' : 'scale-100'}`}>
                        <div className="relative w-[80%] h-[80%] flex items-center justify-center">
                            <div className={`absolute inset-0 bg-primary/10 blur-[150px] rounded-full transition-all duration-1000 ${isSimulating ? 'opacity-100 scale-125' : 'opacity-20'}`}></div>
                            <motion.img
                                layoutId="brick-view"
                                src={selectedBrick === "hex"
                                    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCovIh_7Q6DF2l3xdQQ7w51SV46VEOqVydGiNH2GzC4gXgVCySb2acCYrjvKzk0U5GoL4FknBlIbP-bJ1BmMxXIjfW_UgFqgMQEMgHepX0kIzft4X8gNBqlLq-te7h5XlIpKY_6dQnAuWE4J_vuyqD5qDZCpBro6ti2D4QI-h-duNILkpyubD3swqeaUJsQ4cxtOG0Ou89gkuzl6NBs2dR76piTudHvED9D2TQT7FXOo2rFXifuXvW1AXQIpeIjTivZUOWNj2nIqdU"
                                    : "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=800"}
                                alt="C-Brick View"
                                className={`max-w-[70%] max-h-[70%] object-contain relative z-20 transition-all duration-700 ${isSimulating ? 'drop-shadow-[0_0_50px_rgba(0,217,192,0.6)] brightness-110' : 'drop-shadow-[0_0_30px_rgba(0,217,192,0.2)] grayscale-[30%]'
                                    }`}
                            />
                        </div>
                    </div>
                )}

                {/* Simulation HUD Overlays */}
                <AnimatePresence>
                    {isSimulating && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 pointer-events-none p-12 flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start">
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="p-6 bg-black/60 backdrop-blur-xl border border-primary/30 rounded-3xl flex flex-col gap-4"
                                >
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Structural Resilience</span>
                                    <div className="flex items-end gap-3">
                                        <span className="text-4xl font-mono font-black text-white">94.2</span>
                                        <span className="text-primary text-xs font-bold mb-1.5">+2.4% vs Baseline</span>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 bg-black/60 backdrop-blur-xl border border-primary/30 rounded-3xl flex flex-col gap-4"
                                >
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Growth Forecast</span>
                                    <div className="flex items-end gap-3">
                                        <span className="text-4xl font-mono font-black text-white">8.5<span className="text-xl">cm/yr</span></span>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="flex justify-center"
                            >
                                <div className="px-8 py-4 bg-primary/20 backdrop-blur-3xl border border-primary/40 rounded-full flex items-center gap-6 shadow-[0_0_40px_rgba(0,217,192,0.2)]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                        <span className="text-sm font-black text-white uppercase tracking-widest">Active Matrix Simulation</span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-white/20"></div>
                                    <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-tighter">Stress Test @ 31.4°C [Thermal Ceiling]</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Disease Risk Scanner HUD */}
                {viewMode === 'sim' && project?.location && REGIONAL_DISEASE_RISK[project.location] && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute bottom-8 left-8 flex flex-col gap-3 pointer-events-auto"
                    >
                        <div className="flex items-center gap-3 p-4 bg-orange-500/10 border border-orange-500/20 backdrop-blur-3xl rounded-[32px] shadow-2xl">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-pulse">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="flex flex-col pr-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Disease Risk Alert</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                </div>
                                <h4 className="text-lg font-black text-white uppercase tracking-tight">{REGIONAL_DISEASE_RISK[project.location].disease}</h4>
                                <p className="text-[10px] text-white/60 font-medium">{REGIONAL_DISEASE_RISK[project.location].risk.toUpperCase()} SEVERITY DETECTED IN THIS REGION</p>
                            </div>
                        </div>

                        {selectedSpecies.length > 0 && (
                            <div className="flex flex-col gap-2 ml-2">
                                {selectedSpecies.map(id => {
                                    const s = SPECIES_DB.find(spec => spec.id === id);
                                    const vulnerability = s?.diseaseVulnerability.find(v => v.diseaseName === REGIONAL_DISEASE_RISK[project.location!].disease);
                                    if (!vulnerability) return null;

                                    return (
                                        <motion.div
                                            key={id}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="px-4 py-2 bg-black/40 border border-white/10 rounded-full flex items-center gap-3"
                                        >
                                            <Activity size={12} className={vulnerability.riskLevel === 'high' ? 'text-red-400' : 'text-orange-400'} />
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">{s?.commonName}</span>
                                            <span className={`text-[9px] font-mono ${vulnerability.riskLevel === 'high' ? 'text-red-400' : 'text-orange-400'}`}>
                                                {vulnerability.riskLevel === 'high' ? 'CRITICAL' : 'VULNERABLE'}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Bottom Controls */}
                <div className="absolute bottom-12 left-0 right-0 z-50 flex justify-center items-center gap-8 pointer-events-none">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="pointer-events-auto flex items-center gap-4 bg-[#02060c]/60 backdrop-blur-2xl p-2 rounded-[32px] border border-white/10 shadow-2xl"
                    >
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
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSimulating(!isSimulating)}
                        className={`pointer-events-auto h-20 w-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative overflow-hidden group/play ${isSimulating
                            ? 'bg-red-500 text-white shadow-red-500/20'
                            : 'bg-primary text-black shadow-primary/20 relative'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 ${isSimulating ? 'translate-y-0' : 'group-hover/play:translate-y-0'}`}></div>
                        {isSimulating ? <Pause size={32} className="relative z-10" /> : <Play size={32} className="relative z-10 translate-x-1" />}
                    </motion.button>
                </div>
            </motion.div>

            {/* HUD Right: Configuration Panels */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="w-full xl:w-[480px] 2xl:w-[600px] flex flex-col shrink-0 z-20"
            >
                <div className="flex-1 bg-white/[0.03] rounded-[48px] border border-white/10 flex flex-col overflow-hidden glass-panel">
                    {/* Modular Tabs */}
                    <div className="flex p-3 bg-black/40 border-b border-white/10 gap-2 overflow-x-auto">
                        {(['parameters', 'species', 'synthesis', 'manufacturing', 'quotation'] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 rounded-3xl flex flex-col items-center gap-1.5 transition-all text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap ${activeTab === tab
                                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-[inset_0_0_20px_rgba(0,217,192,0.1)]'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                {tab === 'parameters' && <Settings2 size={16} />}
                                {tab === 'species' && <Dna size={16} />}
                                {tab === 'synthesis' && <Beaker size={16} />}
                                {tab === 'manufacturing' && <Printer size={16} />}
                                {tab === 'quotation' && <Terminal size={16} />}
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Panel Area */}
                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
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

                                        <div className="h-px bg-white/5 w-full"></div>

                                        <CoralStickFormulator
                                            projectLocation={project?.location}
                                            selectedSpeciesIds={selectedSpecies}
                                            onUpdate={(state) => {
                                                setIonicStrength(state.ionicStrength);
                                                setUvFilterLevel(state.uvFilterLevel);
                                                setNutrientDensity(state.nutrientDensity);
                                                setSpawningTrigger(state.spawningTrigger);
                                                setSelectedConsortium(state.selectedConsortium);
                                                setCellDensity(state.cellDensity);
                                            }}
                                        />
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

                                {activeTab === 'manufacturing' && (
                                    <div className="flex flex-col gap-8">
                                        <CBrickExporter brickType={selectedBrick} mixRatio={mixRatio} />
                                        <CoralStickExporter
                                            ionicStrength={ionicStrength}
                                            uvFilterLevel={uvFilterLevel}
                                            nutrientDensity={nutrientDensity}
                                            spawningTrigger={spawningTrigger}
                                            selectedConsortium={selectedConsortium}
                                            cellDensity={cellDensity}
                                        />
                                    </div>
                                )}


                                {activeTab === 'quotation' && (
                                    <QuotationGenerator
                                        brickType={selectedBrick}
                                        mixRatio={mixRatio}
                                        ionicStrength={ionicStrength}
                                        uvFilterLevel={uvFilterLevel}
                                        selectedConsortium={selectedConsortium}
                                        projectId={params.id}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
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
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link href="/dashboard/quote" className="w-full flex items-center justify-center gap-4 py-5 rounded-[24px] bg-primary text-[#02060c] font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(0,217,192,0.3)] transition-all duration-300">
                                <FileCheck size={20} strokeWidth={3} />
                                Generate Pro-Spec Proposal
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

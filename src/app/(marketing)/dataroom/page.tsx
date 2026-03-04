"use client";

import { useState, useEffect } from "react";
import {
    ShieldCheck,
    Lock,
    ChevronRight,
    FileText,
    Download,
    ArrowRight,
    Target,
    Users,
    Zap,
    TrendingUp,
    AlertTriangle,
    Beaker,
    Globe,
    Database,
    Calendar,
    Layers,
    CheckCircle,
    Menu,
    X,
    CreditCard,
    Factory,
    Ship,
    Scale,
    Share2,
    Eye,
    Cpu,
    Microscope,
    Activity
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
    { id: "summary", label: "Executive Summary", icon: Target },
    { id: "portfolio", label: "Product Portfolio", icon: Layers },
    { id: "team", label: "Team & Org", icon: Users },
    { id: "tech", label: "Tech Architecture", icon: Cpu },
    { id: "funding", label: "Funding & Execution", icon: CreditCard },
    { id: "production", label: "Production Strategy", icon: Factory },
    { id: "ops", label: "Field Operations", icon: Ship },
    { id: "risk", label: "Risk Management", icon: AlertTriangle },
    { id: "finance", label: "Financial Projections", icon: TrendingUp },
    { id: "milestones", label: "Milestones & KPIs", icon: Calendar },
    { id: "appendices", label: "Appendices", icon: FileText },
];

export default function DataRoom() {
    const [hasAccepted, setHasAccepted] = useState(false);
    const [activeSection, setActiveSection] = useState("summary");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (hasAccepted) window.scrollTo(0, 0);
    }, [hasAccepted]);

    if (!hasAccepted) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010307]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,192,0.1)_0%,transparent_70%)]"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-lg w-full px-6 text-center"
                >
                    <div className="inline-flex p-6 bg-[#00D9C0]/5 rounded-[2rem] border border-[#00D9C0]/20 text-[#00D9C0] mb-10 shadow-[0_0_50px_-12px_rgba(0,217,192,0.3)]">
                        <Lock className="w-12 h-12" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-6 tracking-tighter">Secure Data Room</h1>
                    <p className="text-slate-400 mb-12 text-lg leading-relaxed font-light">
                        Access to <span className="text-[#00D9C0] font-medium">Coralfil's Confidential Master Plan (v1.0)</span>.
                        Authorization is required to view proprietary Reefmaker AI logic and ionic biopolymer specifications.
                    </p>
                    <button
                        onClick={() => setHasAccepted(true)}
                        className="w-full h-16 bg-[#00D9C0] text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white transition-all shadow-2xl shadow-[#00D9C0]/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        Authenticate & Access
                        <ChevronRight size={16} />
                    </button>
                    <p className="mt-8 text-[10px] text-slate-600 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                        <ShieldCheck size={12} /> Encrypted Session | ISO 27001 Compliant
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#010307] text-white selection:bg-[#00D9C0] selection:text-black font-sans">
            {/* Animated Backdrop */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00D9C0]/10 blur-[150px] rounded-full -mr-96 -mt-96"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#FF6B6B]/5 blur-[150px] rounded-full -ml-96 -mb-96"></div>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Navigation Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed bottom-8 right-8 z-[60] lg:hidden w-16 h-16 bg-[#00D9C0] text-black rounded-full shadow-2xl flex items-center justify-center active:scale-95"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex relative z-10">
                {/* Navigation Rail */}
                <aside className={`
                    fixed inset-y-0 left-0 z-[56] w-80 bg-[#040914]/80 backdrop-blur-2xl border-r border-white/5 transform transition-transform duration-500 lg:translate-x-0
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}>
                    <div className="h-full flex flex-col p-8 pt-12">
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-8">
                                <img src="/favicon.svg" alt="Coralfil Logo" className="w-10 h-10" />
                                <span className="text-xl font-bold tracking-tight">CoralFil</span>
                            </div>
                            <div className="text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.4em] mb-4">Confidential Data Room</div>
                            <h2 className="text-3xl font-bold tracking-tighter leading-tight">Master Plan<br />v1.0</h2>
                            <p className="text-[10px] text-slate-500 mt-2 font-mono">CF-TECH-2026-V1.0_MAR26</p>
                        </div>

                        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                            {SECTIONS.map((section) => {
                                const Icon = section.icon;
                                const isActive = activeSection === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            setActiveSection(section.id);
                                            setIsSidebarOpen(false);
                                            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className={`
                                            w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm transition-all group relative
                                            ${isActive
                                                ? "bg-[#00D9C0]/10 text-[#00D9C0]"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"}
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute left-0 w-1 h-6 bg-[#00D9C0] rounded-r-full"
                                            />
                                        )}
                                        <Icon size={18} className={isActive ? "text-[#00D9C0]" : "text-slate-600 group-hover:text-slate-300"} />
                                        <span className="font-medium tracking-tight text-left">{section.label}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Authorized Official</p>
                                <p className="text-[11px] font-bold text-white">Roland - CEO/CTO</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Flow */}
                <div className="flex-1 lg:ml-80 min-h-screen">
                    {/* Immersive Hero */}
                    <section className="relative h-[70vh] flex items-center px-12 md:px-24 overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/artifacts/dataroom_hero.png"
                                alt="Data Room Hero"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#010307] via-[#010307]/20 to-[#010307]/90"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#010307] via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,rgba(0,217,192,0.1)_50%,transparent_51%)] bg-[length:100%_4px] animate-scan opacity-20"></div>
                        </div>

                        <div className="relative z-10 max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 1 }}
                            >
                                <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.4em] mb-8">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9C0] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9C0]"></span>
                                    </span>
                                    Document v1.0 | Released Mar 2026
                                </div>
                                <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]">
                                    Technical<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C0] to-[#FF6B6B]">Specification.</span>
                                </h1>
                                <p className="text-2xl text-slate-400 font-light max-w-2xl leading-relaxed italic">
                                    "Powered by Reefmaker AI — The molecular roadmap for intelligent reef restoration."
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Main Body */}
                    <div className="max-w-6xl mx-auto p-12 md:p-24 space-y-48">

                        {/* 1. Executive Summary */}
                        <section id="summary" className="scroll-mt-32">
                            <div className="flex items-center gap-6 mb-16 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] w-fit">
                                <Target className="text-[#00D9C0]" size={24} />
                                <h2 className="text-sm font-black uppercase tracking-[0.4em]">Section 01 / Executive Summary</h2>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-8 space-y-12">
                                    <div className="glass-panel p-12 rounded-[3rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9C0]/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">Mission Insight</h3>
                                        <p className="text-3xl text-slate-100 font-light leading-[1.4]">
                                            Coralfil develops <span className="text-[#00D9C0] font-medium underline decoration-white/20 underline-offset-8">molecularly intelligent restoration substrates</span> that ionically attract and chemically signal coral settlement.
                                        </p>
                                        <div className="mt-12 flex items-center gap-12">
                                            <div>
                                                <div className="text-5xl font-bold text-[#00D9C0] tracking-tighter">76.8%</div>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-2 font-bold">Synthesis Success (v2)</div>
                                            </div>
                                            <div className="w-px h-16 bg-white/10"></div>
                                            <div>
                                                <div className="text-5xl font-bold text-white tracking-tighter">80%+</div>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-2 font-bold">Attachment Rate</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-[#FF6B6B]/20 transition-all group">
                                            <AlertTriangle className="text-[#FF6B6B] mb-8 group-hover:scale-110 transition-transform" />
                                            <h4 className="text-xl font-bold mb-6">Market Friction</h4>
                                            <ul className="space-y-4 text-sm text-slate-400 font-light">
                                                <li className="flex gap-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0"></span>
                                                    <span>40-60% mortality on generic substrates</span>
                                                </li>
                                                <li className="flex gap-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0"></span>
                                                    <span>No ionic/molecular adhesion mechanism</span>
                                                </li>
                                                <li className="flex gap-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0"></span>
                                                    <span>Algae biofilm competition vs coral</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 hover:border-[#00D9C0]/20 transition-all group">
                                            <Zap className="text-[#00D9C0] mb-8 group-hover:scale-110 transition-transform" />
                                            <h4 className="text-xl font-bold mb-6">Mechanism Moat</h4>
                                            <ul className="space-y-4 text-sm text-slate-400 font-light">
                                                <li className="flex gap-4">
                                                    <CheckCircle size={16} className="text-[#00D9C0] shrink-0 mt-0.5" />
                                                    <span>Chitosan-Alginate ionic bonding</span>
                                                </li>
                                                <li className="flex gap-4">
                                                    <CheckCircle size={16} className="text-[#00D9C0] shrink-0 mt-0.5" />
                                                    <span>Species-specific "scent" tech</span>
                                                </li>
                                                <li className="flex gap-4">
                                                    <CheckCircle size={16} className="text-[#00D9C0] shrink-0 mt-0.5" />
                                                    <span>AI-derived degradation logic</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-4 space-y-8">
                                    <div className="glass-panel p-10 rounded-[3rem] border border-white/5 h-fit bg-[#040914] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#00D9C0]/5 to-transparent"></div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest mb-10 text-slate-500 relative">Strategy Roadmap</h4>
                                        <div className="space-y-10 relative">
                                            {[
                                                { label: "Phase 1: Canada Grant", timeline: "Mar - May 2026", active: true },
                                                { label: "Phase 2: Pilot Validation", timeline: "May - Dec 2026", active: false },
                                                { label: "Phase 3: Series A / Scale", timeline: "Q1 2027+", active: false }
                                            ].map((item, i) => (
                                                <div key={i} className="flex gap-6 items-start">
                                                    <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${item.active ? "bg-[#00D9C0] shadow-[0_0_15px_#00D9C0]" : "bg-slate-800"}`}></div>
                                                    <div>
                                                        <div className={`text-sm font-bold ${item.active ? "text-white" : "text-slate-500"}`}>{item.label}</div>
                                                        <div className="text-[10px] text-slate-600 mt-1 uppercase font-bold">{item.timeline}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-20 pt-8 border-t border-white/10 relative">
                                            <button className="w-full h-14 bg-[#00D9C0]/10 hover:bg-[#00D9C0]/20 border border-[#00D9C0]/20 text-[#00D9C0] rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all">
                                                <Download size={14} />
                                                View PDF Master
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Product Portfolio & Roadmap */}
                        <section id="portfolio" className="scroll-mt-32">
                            <div className="flex items-center gap-6 mb-16 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] w-fit">
                                <Layers className="text-[#FF6B6B]" size={24} />
                                <h2 className="text-sm font-black uppercase tracking-[0.4em]">Section 02 / Product Portfolio</h2>
                            </div>

                            <div className="space-y-32">
                                <div className="grid lg:grid-cols-2 gap-20 items-center">
                                    <div className="space-y-10">
                                        <div className="inline-block px-5 py-2 rounded-xl bg-[#00D9C0]/10 border border-[#00D9C0]/20 text-[#00D9C0] text-[10px] font-black uppercase tracking-widest">Flagship Product / Phase 2</div>
                                        <h3 className="text-6xl font-bold tracking-tighter">Coralstick™ Pellets</h3>
                                        <p className="text-xl text-slate-400 font-light leading-relaxed">
                                            Ionic biopolymer pellets engineered for diver deployment. Designed to attract and retain coral larvae through <span className="text-white font-medium">electrostatic and chemical signaling</span>.
                                        </p>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4">
                                                <div className="w-12 h-12 rounded-2xl bg-[#00D9C0]/10 flex items-center justify-center border border-[#00D9C0]/20 text-[#00D9C0]">
                                                    <Activity size={20} />
                                                </div>
                                                <p className="text-sm font-bold">Ionic Matrix</p>
                                                <p className="text-xs text-slate-500 leading-relaxed italic">Chitosan (85% deacetylated) + High-G Alginate</p>
                                            </div>
                                            <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 space-y-4">
                                                <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center border border-[#FF6B6B]/20 text-[#FF6B6B]">
                                                    <Beaker size={20} />
                                                </div>
                                                <p className="text-sm font-bold">Bioactive Load</p>
                                                <p className="text-xs text-slate-500 leading-relaxed italic">Probiotics: Erythrobacter & Prosthecochloris</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#00D9C0]/20 to-transparent rounded-[4rem] group-hover:scale-105 transition-transform duration-1000"></div>
                                        <div className="glass-panel p-2 rounded-[4rem] border border-white/10 relative overflow-hidden">
                                            <img
                                                src="/artifacts/growth_simulation_demo.png"
                                                alt="Coralstick Simulation"
                                                className="w-full aspect-[4/5] object-cover rounded-[3.8rem] opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#010307] via-transparent to-transparent"></div>
                                            <div className="absolute bottom-12 left-12 right-12">
                                                <div className="flex justify-between items-end">
                                                    <div>
                                                        <p className="text-[10px] font-black text-[#00D9C0] uppercase tracking-widest mb-2">Simulation Engine</p>
                                                        <h4 className="text-3xl font-bold tracking-tight">Bonding Dynamics</h4>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-4xl font-bold tracking-tighter">92%</p>
                                                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Prediction Accuracy</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* C-Bricks Feature */}
                                <div className="glass-panel p-16 rounded-[4rem] border border-white/5 bg-[#040914]/40 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,107,107,0.05),transparent_60%)]"></div>
                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
                                            <div>
                                                <h3 className="text-4xl font-bold tracking-tighter mb-3 italic underline decoration-[#FF6B6B]/30 underline-offset-8">Cortex Bricks (C-Brick)</h3>
                                                <p className="text-slate-500 text-lg font-light">Biofilm Scent Technology & Biomimetic Geometry</p>
                                            </div>
                                            <div className="px-8 py-3 rounded-full border border-[#FF6B6B]/30 bg-[#FF6B6B]/5 text-[#FF6B6B] text-[10px] font-black uppercase tracking-widest">
                                                R&D Phase 3 (2027+)
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-4 gap-12">
                                            {[
                                                { title: "Micro-texture", desc: "50-200\u03BCm roughness for attachment", icon: Microscope },
                                                { title: "Scent Matrix", desc: "Red algae extract (30-90 day release)", icon: Zap },
                                                { title: "Structural Core", desc: "Aragonite / Calcium carbonate integrity", icon: Database },
                                                { title: "Ionic Base", desc: "Coralstick-compatible interface", icon: Layers }
                                            ].map((item, i) => (
                                                <div key={i} className="space-y-6">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-slate-400">
                                                        <item.icon size={20} />
                                                    </div>
                                                    <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                                                    <p className="text-xs text-slate-500 font-light leading-relaxed">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Technical Architecture */}
                        <section id="tech" className="scroll-mt-32">
                            <div className="flex items-center gap-6 mb-16 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] w-fit">
                                <Cpu className="text-[#00D9C0]" size={24} />
                                <h2 className="text-sm font-black uppercase tracking-[0.4em]">Section 04 / Technical Architecture</h2>
                            </div>

                            <div className="glass-panel p-20 rounded-[4rem] border border-white/5 bg-[#010307] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
                                    <div className="space-y-10">
                                        <div className="w-20 h-20 rounded-[2rem] bg-[#00D9C0]/10 flex items-center justify-center border border-[#00D9C0]/20 text-[#00D9C0] mb-8">
                                            <Database size={40} />
                                        </div>
                                        <h3 className="text-5xl font-bold tracking-tighter italic">Reefmaker AI Platform</h3>
                                        <p className="text-xl text-slate-400 font-light leading-relaxed">
                                            The formulation engine for Coralstick. We bridge environmental telemetry with molecular synthesis through the <span className="text-white font-medium">NVIDIA BioNeMo</span> processing layer.
                                        </p>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 group-hover:border-[#00D9C0]/30 transition-colors">
                                                <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-3 font-mono underline decoration-[#00D9C0]/20">Model Architecture</p>
                                                <p className="text-lg font-bold text-white tracking-tight">MegaMolBART</p>
                                                <p className="text-[10px] text-slate-500 mt-2 font-light">Chitosan-probiotic design</p>
                                            </div>
                                            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 group-hover:border-[#00D9C0]/30 transition-colors">
                                                <p className="text-[10px] text-slate-600 uppercase font-black tracking-widest mb-3 font-mono underline decoration-[#00D9C0]/20">Validation Engine</p>
                                                <p className="text-lg font-bold text-white tracking-tight">ReaSyn v2</p>
                                                <p className="text-[10px] text-slate-500 mt-2 font-light">76.8% Success hit-rate</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="p-10 rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 relative group-hover:shadow-[0_0_50px_-20px_#00D9C0] transition-all duration-700">
                                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-12 text-center text-slate-400">Synthesis Pipeline</h4>
                                            <div className="space-y-6">
                                                {[
                                                    { label: "Benthic Map Ingestion", icon: Globe },
                                                    { label: "BioNeMo Molecular Design", icon: Zap, highlight: true },
                                                    { label: "Species Inoculation Map", icon: Beaker },
                                                    { label: "Custom Coralstick Output", icon: Download }
                                                ].map((step, i) => (
                                                    <div key={i} className="relative">
                                                        <div className={`flex items-center justify-between p-6 rounded-2xl border ${step.highlight ? "border-[#00D9C0]/40 bg-[#00D9C0]/5 shadow-[0_0_30px_-10px_rgba(0,217,192,0.2)]" : "border-white/5 bg-white/[0.02]"}`}>
                                                            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">{step.label}</span>
                                                            <step.icon size={16} className={step.highlight ? "text-[#00D9C0]" : "text-slate-600"} />
                                                        </div>
                                                        {i < 3 && <div className="flex justify-center -my-1"><ArrowRight className="rotate-90 text-white/5" size={14} /></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 9. Financial Projections */}
                        <section id="finance" className="scroll-mt-32">
                            <div className="flex items-center gap-6 mb-16 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] w-fit">
                                <TrendingUp className="text-[#00D9C0]" size={24} />
                                <h2 className="text-sm font-black uppercase tracking-[0.4em]">Section 09 / Financials</h2>
                            </div>

                            <div className="glass-panel p-1 rounded-[4rem] bg-gradient-to-br from-[#00D9C0]/20 via-transparent to-[#FF6B6B]/10 border border-white/10">
                                <div className="bg-[#040914] rounded-[3.9rem] p-12 md:p-24 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="pb-10 text-slate-500 uppercase tracking-[0.4em] text-[10px] font-black">Business Segment</th>
                                                <th className="pb-10 text-slate-500 uppercase tracking-[0.4em] text-[10px] font-black">Year 1 (Pilot)</th>
                                                <th className="pb-10 text-slate-500 uppercase tracking-[0.4em] text-[10px] font-black">Year 2 (Scale)</th>
                                                <th className="pb-10 text-[#00D9C0] uppercase tracking-[0.4em] text-[10px] font-black underline decoration-[#00D9C0]/20 underline-offset-8">Target (2028)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {[
                                                { seg: "Coralstick™ Sales", y1: "$150K", y2: "$600K", y3: "$2.0M" },
                                                { seg: "C-Brick Pilot", y1: "$0", y2: "$50K", y3: "$500K" },
                                                { seg: "Bioactive IP / Additives", y1: "$0", y2: "$100K", y3: "$400K" },
                                                { seg: "Reefmaker AI SaaS", y1: "$0", y2: "$50K", y3: "$200K" }
                                            ].map((row, i) => (
                                                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-10">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#00D9C0] transition-colors"></div>
                                                            <span className="font-bold text-white text-xl tracking-tight">{row.seg}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-10 text-slate-500 font-light">{row.y1}</td>
                                                    <td className="py-10 text-slate-500 font-light">{row.y2}</td>
                                                    <td className="py-10 text-white font-black text-2xl tracking-tighter">{row.y3}</td>
                                                </tr>
                                            ))}
                                            <tr className="bg-white/[0.03]">
                                                <td className="py-12 px-10">
                                                    <span className="font-black uppercase tracking-[0.3em] text-xs text-[#00D9C0]">Combined Revenue</span>
                                                </td>
                                                <td className="py-12 text-slate-400 font-bold">$150,000</td>
                                                <td className="py-12 text-slate-400 font-bold">$800,000</td>
                                                <td className="py-12 text-[#00D9C0] font-black text-3xl tracking-tighter">$3,100,000+</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* 11. Appendices & Authorizations */}
                        <section id="appendices" className="pt-32 border-t border-white/5">
                            <div className="max-w-4xl mx-auto text-center space-y-20">
                                <div className="space-y-10 mb-24">
                                    <div className="flex justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                                        <div className="text-[11px] font-black uppercase tracking-[0.4em]">NVIDIA BioNeMo</div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                        <div className="text-[11px] font-black uppercase tracking-[0.4em]">Blue Action Lab</div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                        <div className="text-[11px] font-black uppercase tracking-[0.4em]">Blue Economy Canada</div>
                                    </div>
                                    <h3 className="text-4xl font-bold tracking-tight">Verified Signatories</h3>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {[
                                        { name: "Roland", role: "CEO / CTO, Coralfil" },
                                        { name: "Dr. Biswajit Biswas", role: "Chief Scientific Advisor" },
                                        { name: "Alex", role: "Operations Lead" }
                                    ].map((signee, i) => (
                                        <div key={i} className="p-12 border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                            <div className="h-px bg-slate-800 w-full mb-8 relative">
                                                <div className="absolute top-0 right-0 text-[10px] text-slate-700 font-mono -mt-6 uppercase">E-SIGN: VERIFIED</div>
                                            </div>
                                            <p className="text-xl font-bold text-white mb-2 italic tracking-tight">{signee.name}</p>
                                            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black leading-relaxed">{signee.role}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-20">
                                    <button className="h-18 px-14 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#00D9C0] transition-all flex items-center justify-center gap-4 group">
                                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                                        Download Technical Pack (v1.0)
                                    </button>
                                    <button className="h-18 px-14 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-4 group">
                                        <Share2 size={16} className="group-hover:scale-110 transition-transform" />
                                        Grant Secure Access
                                    </button>
                                </div>

                                <div className="pt-24 opacity-20 group relative inline-flex items-center gap-8">
                                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/30"></div>
                                    <p className="text-[9px] text-white font-mono uppercase tracking-[0.6em]">
                                        Secure Encrypted Link • Valid Mar 2026 • Doc ID: CF-X-9921
                                    </p>
                                    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/30"></div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}

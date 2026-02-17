"use client";

import {
    Grid, Layers, FlaskConical, Dna, HelpCircle, Clock, ArrowUpRight,
    Box, Hand, Plus, PlusCircle, MinusCircle, MoreHorizontal, Play,
    Droplets, Thermometer, Waves, CheckCircle2, Sun
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex h-full gap-0 bg-slate-50 relative overflow-hidden text-slate-900">
            {/* Sidebar Tools (Inner Sidebar) */}
            <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-6 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)] shrink-0">
                <button className="p-2.5 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors tooltip-trigger group relative">
                    <Grid size={20} />
                    <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">Library</span>
                </button>
                <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors group relative">
                    <Layers size={20} />
                    <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">Layers</span>
                </button>
                <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors group relative">
                    <FlaskConical size={20} />
                    <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">Chemistry</span>
                </button>
                <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors group relative">
                    <Dna size={20} />
                    <span className="absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">Biology</span>
                </button>
                <div className="mt-auto flex flex-col gap-6">
                    <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                        <HelpCircle size={20} />
                    </button>
                </div>
            </aside>

            {/* Central Content Area (3D Viewer) */}
            <div className="flex-1 flex flex-col relative bg-slate-50 overflow-hidden">
                {/* Project Header Overlay */}
                <div className="absolute top-6 left-6 z-10">
                    <div className="glass-panel px-6 py-4 rounded-2xl shadow-lg flex flex-col gap-1 min-w-[320px] bg-white/90 backdrop-blur-md border border-white/60">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-teal-100 text-teal-800">Live Simulation</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: #RM-2024-X4</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 leading-tight">Coastal Zone 4: Alpha</h1>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <Clock size={14} />
                                Last edited 2h ago
                            </p>
                            <button className="text-xs font-bold text-primary hover:text-orange-600 transition-colors uppercase tracking-wider flex items-center gap-1">
                                Export PDF <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3D Viewer Area (Simulated) */}
                <div className="flex-1 w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">
                    {/* Background Image simulating 3D view */}
                    <div
                        className="absolute inset-0 z-0 opacity-80 mix-blend-multiply bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAX6yNYDpNS1gLs1QVUc9kKu740bUYPFR19ly6nrc7zmDQcLJ7ccr3aFnMGkRIGjCFQfS-lQ53SItbCeTIODM6vUTXBnYzgJvRqd4z2Zp1D-rFqQssk0Tq4mu9vZZGY3BcJyeBItMntJlhuT3QJ4xSBYNFP9g6Num5bmOVVJpiW4O_wcBpG_sRG_ppUSkAvGb5T6P09b_V39I5_mhhK4LudYCXah7-TYDjDwlKSWGRrUZnijKsuzjIFrzdFWf2bVsubW4IeBLkrrY0')" }}
                    ></div>

                    {/* Overlay Pattern for Engineering feel */}
                    <div
                        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                    ></div>

                    {/* 3D Object Placeholders (The Reef Structure) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[60%] h-[60%] border-2 border-dashed border-white/30 rounded-3xl flex items-center justify-center relative">
                            <div className="absolute top-4 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-mono">Render: Real-time</div>
                            <div className="grid grid-cols-3 gap-4 transform rotate-6 scale-90">
                                <div className="w-32 h-32 bg-white/90 shadow-2xl rounded-xl backdrop-blur-sm border border-slate-200 transform translate-y-8"></div>
                                <div className="w-32 h-32 bg-white/90 shadow-2xl rounded-xl backdrop-blur-sm border border-slate-200 transform -translate-y-4"></div>
                                <div className="w-32 h-32 bg-white/90 shadow-2xl rounded-xl backdrop-blur-sm border border-slate-200"></div>
                                <div className="w-32 h-32 bg-white/90 shadow-2xl rounded-xl backdrop-blur-sm border border-slate-200 transform translate-x-4"></div>
                                <div className="w-32 h-32 bg-primary/20 shadow-2xl rounded-xl backdrop-blur-sm border-2 border-primary/50 flex items-center justify-center">
                                    <Box size={40} className="text-primary" />
                                </div>
                                <div className="w-32 h-32 bg-white/90 shadow-2xl rounded-xl backdrop-blur-sm border border-slate-200 transform -translate-x-8"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Toolbar Bottom Center */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full flex items-center gap-2 shadow-lg border border-white/50">
                            <button className="size-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all tooltip-trigger" title="Rotate">
                                <Box size={20} />
                            </button>
                            <button className="size-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all" title="Pan">
                                <Hand size={20} />
                            </button>
                            <div className="w-px h-6 bg-slate-300 mx-1"></div>
                            <button className="size-10 rounded-full flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg" title="Add Block">
                                <Plus size={20} />
                            </button>
                            <div className="w-px h-6 bg-slate-300 mx-1"></div>
                            <button className="size-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all" title="Zoom In">
                                <PlusCircle size={20} />
                            </button>
                            <button className="size-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all" title="Zoom Out">
                                <MinusCircle size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Environmental Snapshot */}
            <aside className="w-[400px] bg-white border-l border-slate-200 flex flex-col z-20 shadow-xl overflow-y-auto shrink-0">
                <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-30">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Environmental Snapshot</h3>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                            <MoreHorizontal size={24} />
                        </button>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/30">
                        <Play size={20} className="fill-current" />
                        Simulate Growth
                    </button>
                </div>

                <div className="p-6 flex flex-col gap-8">
                    {/* Key Metrics Grid */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Current Conditions</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-teal-200 transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-teal-600">
                                    <Droplets size={20} />
                                    <span className="text-xs font-bold uppercase">Depth</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">12.5m</p>
                                <p className="text-xs text-slate-500 mt-1">Optimal Range</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-teal-200 transition-colors">
                                <div className="flex items-center gap-2 mb-2 text-teal-600">
                                    <Thermometer size={20} />
                                    <span className="text-xs font-bold uppercase">Temp</span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">26°C</p>
                                <p className="text-xs text-slate-500 mt-1">+0.5°C variance</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-teal-200 transition-colors col-span-2 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1 text-teal-600">
                                        <Droplets size={20} />
                                        <span className="text-xs font-bold uppercase">Salinity</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">35ppt</p>
                                </div>
                                <div className="h-10 w-24 bg-white rounded-lg border border-slate-100 overflow-hidden relative">
                                    {/* Tiny Sparkline simulation */}
                                    <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                                        <path d="M0 20 Q 10 15, 20 25 T 40 20 T 60 10 T 80 15 T 100 5" fill="none" stroke="#0d9488" strokeWidth="2"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flow Velocity Chart */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Flow Velocity (m/s)</h4>
                            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">+2.3% Efficiency</span>
                        </div>
                        <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Waves size={64} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-3xl font-bold tracking-tight">1.2 m/s</p>
                                        <p className="text-sm text-slate-400">Avg. Current Speed</p>
                                    </div>
                                    <CheckCircle2 className="text-primary animate-pulse" size={24} />
                                </div>
                                {/* Custom Chart SVG */}
                                <div className="h-32 w-full mt-2">
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
                                        {/* Grid lines */}
                                        <line stroke="#334155" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="300" y1="20" y2="20"></line>
                                        <line stroke="#334155" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="300" y1="50" y2="50"></line>
                                        <line stroke="#334155" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="300" y1="80" y2="80"></line>
                                        {/* Data Line */}
                                        <path className="drop-shadow-[0_4px_6px_rgba(255,99,71,0.4)]" d="M0 60 C 40 60, 50 30, 100 30 S 150 70, 200 60 S 250 20, 300 40" fill="none" stroke="#ff6347" strokeLinecap="round" strokeWidth="3"></path>
                                        {/* Fill Area (Gradient) */}
                                        <defs>
                                            <linearGradient id="flowGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#ff6347" stopOpacity="0.2"></stop>
                                                <stop offset="100%" stopColor="#ff6347" stopOpacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 60 C 40 60, 50 30, 100 30 S 150 70, 200 60 S 250 20, 300 40 V 100 H 0 Z" fill="url(#flowGradient)" stroke="none"></path>
                                    </svg>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono uppercase">
                                    <span>00:00</span>
                                    <span>06:00</span>
                                    <span>12:00</span>
                                    <span>18:00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sunlight Penetration */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Sunlight Penetration</h4>
                        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                                        <Sun size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-slate-900">85%</p>
                                        <p className="text-xs text-slate-500">Photosynthesis Zone</p>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-teal-600">+12%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-gradient-to-r from-amber-400 to-primary h-full rounded-full" style={{ width: "85%" }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Colonization Probability */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Colonization Probability</h4>
                        </div>
                        <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl border border-teal-100 p-5 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h5 className="text-teal-900 font-bold text-lg">High Potential</h5>
                                    <p className="text-teal-600 text-xs mt-1">Projected 5 Year Growth</p>
                                </div>
                                <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-md">Tier A</span>
                            </div>
                            {/* Bar Chart Representation */}
                            <div className="flex items-end justify-between h-24 gap-2">
                                {[
                                    { year: 1, height: "30%", color: "bg-teal-200", hover: "group-hover:bg-teal-300" },
                                    { year: 2, height: "45%", color: "bg-teal-300", hover: "group-hover:bg-teal-400" },
                                    { year: 3, height: "60%", color: "bg-teal-400", hover: "group-hover:bg-teal-500" },
                                    { year: 4, height: "75%", color: "bg-teal-500", hover: "group-hover:bg-teal-600", label: "75%" },
                                ].map((bar) => (
                                    <div key={bar.year} className="flex flex-col items-center gap-2 flex-1 group">
                                        <div
                                            className={`w-full ${bar.color} rounded-t-sm ${bar.hover} transition-colors relative`}
                                            style={{ height: bar.height }}
                                        >
                                            {bar.label && (
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{bar.label}</div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold">Y{bar.year}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col items-center gap-2 flex-1 group">
                                    <div className="w-full bg-teal-600 rounded-t-sm h-[90%] shadow-[0_0_10px_rgba(13,148,136,0.3)] relative">
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded">98%</div>
                                    </div>
                                    <span className="text-[10px] text-slate-900 font-bold">Y5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

"use client";

import React, { useState } from "react";
import {
    Grid, Layers, FlaskConical, Dna, HelpCircle, Clock, ArrowUpRight,
    Box, Hand, Plus, PlusCircle, MinusCircle, MoreHorizontal, Play,
    Droplets, Thermometer, Waves, CheckCircle2, Sun, Shield, Activity
} from "lucide-react";
import { motion } from "@/components/motion-client";
import { QuotationGenerator } from "@/components/dashboard/QuotationGenerator";

export default function DashboardPage() {
    return (
        <div className="flex h-full gap-0 bg-transparent relative overflow-hidden text-slate-200 p-8">
            {/* Sidebar Tools (Inner Sidebar) */}
            <aside className="w-16 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center py-6 gap-6 z-20 shadow-2xl shrink-0 backdrop-blur-md">
                <button className="p-2.5 rounded-xl bg-[#00D9C0]/10 text-[#00D9C0] hover:bg-[#00D9C0]/20 transition-colors tooltip-trigger group relative">
                    <Grid size={20} />
                    <span className="absolute left-14 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">Library</span>
                </button>
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors group relative">
                    <Layers size={20} />
                </button>
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors group relative">
                    <FlaskConical size={20} />
                </button>
                <button className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-colors group relative">
                    <Dna size={20} />
                </button>
                <div className="mt-auto flex flex-col gap-6">
                    <button className="p-2.5 rounded-xl text-slate-500 hover:text-[#00D9C0] transition-colors">
                        <HelpCircle size={20} />
                    </button>
                </div>
            </aside>

            {/* Central Content Area (3D Viewer) */}
            <div className="flex-1 flex flex-col relative overflow-hidden mx-8">
                {/* Project Header Overlay */}
                <div className="absolute top-0 left-0 z-10 w-full">
                    <div className="glass-panel px-6 py-4 rounded-2xl shadow-2xl flex flex-col gap-1 bg-black/40 backdrop-blur-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] bg-[#00D9C0]/20 text-[#00D9C0] border border-[#00D9C0]/20">Live Simulation</span>
                            <span className="text-[9px] text-slate-600 font-mono tracking-tighter">ID: #RM-2026-XQ</span>
                        </div>
                        <h1 className="text-xl font-black text-white leading-tight uppercase tracking-tight">Bahamas Strategic Restoration Zone</h1>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <Clock size={12} className="text-[#00D9C0]" />
                                Sync: All Systems Operational
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3D Viewer Area (Simulated) */}
                <div className="flex-1 w-full h-full relative overflow-hidden rounded-3xl border border-white/5 bg-[#010307] mt-24">
                    {/* Background Layer (Deep Sea Feel) */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCovIh_7Q6DF2l3xdQQ7w51SV46VEOqVydGiNH2GzC4gXgVCySb2acCYrjvKzk0U5GoL4FknBlIbP-bJ1BmMxXIjfW_UgFqgMQEMgHepX0kIzft4X8gNBqlLq-te7h5XlIpKY_6dQnAuWE4J_vuyqD5qDZCpBro6ti2D4QI-h-duNILkpyubD3swqeaUJsQ4cxtOG0Ou89gkuzl6NBs2dR76piTudHvED9D2TQT7FXOo2rFXifuXvW1AXQIpeIjTivZUOWNj2nIqdU"
                            className="w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale"
                            alt="Simulation floor"
                        />
                    </div>

                    {/* Simulation Grid Overlay */}
                    <div
                        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{ backgroundImage: "linear-gradient(#ffffff 0.5px, transparent 0.5px), linear-gradient(90deg, #ffffff 0.5px, transparent 0.5px)", backgroundSize: "60px 60px" }}
                    ></div>

                    {/* 3D Object Placeholders (The Reef Structure) */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[80%] h-[80%] border border-dashed border-[#00D9C0]/20 rounded-full flex items-center justify-center relative">
                            <div className="absolute top-[20%] right-[10%] bg-black/80 text-[#00D9C0] text-[9px] px-3 py-1 rounded-full border border-[#00D9C0]/30 backdrop-blur-sm font-black uppercase tracking-widest">Helix Projection Layer 04</div>

                            {/* Abstract Helix Geometry */}
                            <div className="relative transform rotate-12 scale-125">
                                <svg width="200" height="400" viewBox="0 0 100 200" className="opacity-40 filter drop-shadow-[0_0_20px_rgba(0,217,192,0.4)]">
                                    <path d="M50 0 L50 200" stroke="#00D9C0" strokeWidth="0.5" strokeDasharray="2 2" />
                                    <path d="M20 20 Q 50 50, 80 20 T 20 80 T 80 140 T 20 200" fill="none" stroke="#00D9C0" strokeWidth="2" className="animate-pulse" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Floating Toolbar Bottom Center */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="bg-black/60 backdrop-blur-xl p-2 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/10">
                            <button className="size-11 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-[#00D9C0] transition-all">
                                <Box size={20} />
                            </button>
                            <button className="size-11 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-[#00D9C0] transition-all">
                                <Hand size={20} />
                            </button>
                            <div className="w-px h-6 bg-white/10 mx-1"></div>
                            <button className="size-11 rounded-xl flex items-center justify-center bg-[#00D9C0] text-black hover:bg-[#00f2ff] transition-all shadow-lg hover:scale-105">
                                <Plus size={22} />
                            </button>
                            <div className="w-px h-6 bg-white/10 mx-1"></div>
                            <button className="size-11 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-[#00D9C0] transition-all">
                                <PlusCircle size={20} />
                            </button>
                            <button className="size-11 rounded-xl flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-[#00D9C0] transition-all">
                                <MinusCircle size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Data Analysis & Configuration */}
            <aside className="w-[440px] flex flex-col gap-6 z-20 overflow-y-auto shrink-0 custom-scrollbar pr-2">
                <div className="sticky top-0 z-30 space-y-4">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Neural Analytics</h3>
                                <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">Bahamas Shelf Sync</p>
                            </div>
                            <Activity size={18} className="text-[#00D9C0] animate-pulse" />
                        </div>
                        <button className="w-full flex items-center justify-center gap-3 bg-[#00D9C0] text-black hover:bg-[#00f2ff] font-black py-4 px-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(0,217,192,0.2)] text-[10px] uppercase tracking-widest group">
                            <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
                            Initialize Growth Matrix
                        </button>
                    </div>
                </div>

                {/* Lead-Gen Tool */}
                <QuotationGenerator
                    projectId="BAH-STRAT-01"
                    brickType="Helix Pyramid™"
                    mixRatio={2.4}
                    ionicStrength={8}
                    uvFilterLevel={1}
                />

                {/* Environmental Deep-Dive */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Site Conditions (Atlas Data)</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <div className="flex items-center gap-2 text-[#00D9C0] mb-2 font-black uppercase text-[9px]">
                                <Thermometer size={14} />
                                Temp
                            </div>
                            <div className="text-xl font-mono font-black text-white">28.4°C</div>
                            <div className="text-[8px] text-slate-600 font-bold uppercase">+1.2 OVER BASELINE</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                            <div className="flex items-center gap-2 text-[#00D9C0] mb-2 font-black uppercase text-[9px]">
                                <Activity size={14} />
                                Bleaching
                            </div>
                            <div className="text-xl font-mono font-black text-[#FF6B6B]">MODERATE</div>
                            <div className="text-[8px] text-slate-600 font-bold uppercase">NOAA ALERT LEVEL 1</div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Larval Recruitment Success</span>
                            <span className="text-[10px] font-mono text-[#00D9C0]">88%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "88%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-[#00D9C0]/50 to-[#00D9C0]"
                            />
                        </div>
                        <p className="text-[9px] text-slate-600 italic">
                            Success probability calculated via stochastic neural modeling of water column current flows and substrate texture.
                        </p>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="px-6 py-4 opacity-30 italic text-[9px] text-center text-slate-500">
                    "The neural interface is calibrated for shallow carbonate platform environments found in the Lucayan Archipelago."
                </div>
            </aside>
        </div>
    );
}

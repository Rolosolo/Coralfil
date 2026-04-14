"use client";

import React from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "@/components/motion-client";
import { ShieldAlert, Activity, Microscope, Droplets, Zap, ShieldCheck } from "lucide-react";

export default function VibrioInterventionPage() {
    return (
        <main className="min-h-screen bg-[#02060c] selection:bg-primary/30 selection:text-primary">
            <Header />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,217,192,0.8)]"></div>
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Aquaculture Defense</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                            Vibrio <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Intervention</span> & Prevention
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed mb-10 font-medium">
                            The world's first predictive defense system for shellfish mortality. Integrating real-time environmental telemetry with molecular intervention to safeguard the future of BC aquaculture.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-24 border-y border-white/5 bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: ShieldAlert,
                                title: "Risk Detection",
                                desc: "Proprietary algorithms analyze ONC telemetry and historical mortality data to predict Vibrio blooms before they occur."
                            },
                            {
                                icon: Microscope,
                                title: "Molecular Defense",
                                desc: "Precision pre-biotics and mineralization strategies that enhance shellfish immune response at the cellular level."
                            },
                            {
                                icon: Activity,
                                title: "Real-time Monitoring",
                                desc: "Continuous surveillance of water temperature, salinity, and acidity levels integrated directly with farm management systems."
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <pillar.icon className="text-primary" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-tight">{pillar.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse-slow"></div>
                            <div className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
                                <div className="bg-[#030812] rounded-[22px] overflow-hidden p-8 border border-white/5">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                                            <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/40"></div>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">Sentinel-OS v4.2</span>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {[
                                            { label: "Predictive Confidence", val: "94.2%", color: "primary" },
                                            { label: "Telemetry Latency", val: "<120ms", color: "slate-400" },
                                            { label: "Active Intervention Nodes", val: "14", color: "primary" }
                                        ].map(stat => (
                                            <div key={stat.label} className="space-y-2">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                                    <span className={`text-lg font-black text-${stat.color} tracking-tighter`}>{stat.val}</span>
                                                </div>
                                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-${stat.color === 'primary' ? 'primary' : 'white/20'} rounded-full`} style={{ width: stat.val.includes('%') ? stat.val : '60%' }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4 items-center">
                                        <div className="p-2 rounded-lg bg-primary/20">
                                            <Zap size={18} className="text-primary" />
                                        </div>
                                        <p className="text-[11px] text-slate-400 leading-tight">
                                            <span className="text-primary font-bold">Automatic Response:</span> System engaged to optimize calcium carbonate saturation at Station-BC-09.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                                Intelligent <br /> 
                                <span className="text-primary brightness-150">Active Defense</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                Traditional aquaculture management is reactive—responding only after mortality events occur. The CoralFil Vibrio Sentinel shifts the paradigm to proactive prevention through:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Saturation optimization of essential marine minerals",
                                    "Environmental stress mitigation through microbiome stabilization",
                                    "Early warning signals via spectral analysis of water chemistry",
                                    "Automated intervention protocols for regional farm clusters"
                                ].map(item => (
                                    <li key={item} className="flex gap-4 items-start">
                                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        </div>
                                        <span className="text-sm text-slate-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-center scale-110"></div>
                <div className="max-w-4xl mx-auto px-6 relative text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-none">
                        Secure Your Farm's Future
                    </h2>
                    <p className="text-lg text-slate-400 mb-12 font-medium">
                        Join the waiting list for the Vibrio Sentinel regional deployment across British Columbia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-5 bg-primary text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(0,217,192,0.4)]">
                            Request Enrollment
                        </button>
                        <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white/10 transition-all">
                            Technical Whitepaper
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

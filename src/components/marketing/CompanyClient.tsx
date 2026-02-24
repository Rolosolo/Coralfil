"use client";

import React from "react";
import { JsonLd } from "@/components/JsonLd";
import { motion } from "@/components/motion-client";
import { Anchor, Globe, Shield, Zap, ArrowRight, Github, Linkedin, Twitter, Brain, Activity, Target } from "lucide-react";

export function CompanyClient() {
    return (
        <main className="min-h-screen bg-[#010307] pt-24 pb-20 overflow-x-hidden">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "CoralFil",
                    "description": "Foundational intelligence and structural biometrics for large-scale marine restoration.",
                    "founder": [
                        { "@type": "Person", "name": "Roland Poulin" },
                        { "@type": "Person", "name": "Alex Andrei" }
                    ]
                }
            }} />

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Hero Section */}
                <div className="max-w-4xl mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1.5 mb-8 rounded-lg bg-[#00D9C0]/10 text-[#00D9C0] text-[10px] font-bold uppercase tracking-[0.4em] border border-[#00D9C0]/20"
                    >
                        Foundational Logic
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold text-white mb-10 tracking-tighter leading-[0.9]"
                    >
                        "Brick by Brick"<br />
                        <span className="text-glow-gradient">Rebuilding Oceans.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-400 leading-relaxed max-w-2xl font-light"
                    >
                        Passion alone cannot reverse the coral crisis. We need scalable, realistic, and highly traceable solutions.
                        CoralFi<span className="logo-dotted-l prose-none">l</span> is building the structural and chemical foundation for 100,000+ hectares of reef restoration.
                    </motion.p>
                </div>

                {/* The "Why" Section with Helix Animation */}
                <div className="grid md:grid-cols-2 gap-24 mb-48 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">The OS for the<br /><span className="text-gray-700">Blue Economy.</span></h2>
                        <p className="text-slate-400 leading-relaxed font-light text-lg">
                            We operate at the "IP and Materials" layer, bypassing heavy logistics to provide the essential
                            building blocks for reef recovery. Our solution is deep-tech, high-margin, and biologically imperative.
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-white mb-2 tracking-tighter">100k+</span>
                                <span className="text-[10px] text-[#00D9C0] font-black uppercase tracking-[0.2em]">Hectares Target</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-white mb-2 tracking-tighter">85%</span>
                                <span className="text-[10px] text-[#00D9C0] font-black uppercase tracking-[0.2em]">Larvae Retention</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Animated Helix Graphic Replacement */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-[#00D9C0]/5 blur-[120px] rounded-full"></div>

                        {/* Animated 3D-ish Helix SVG */}
                        <svg width="400" height="400" viewBox="0 0 400 400" className="relative z-10 overflow-visible">
                            <defs>
                                <linearGradient id="helixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00D9C0" />
                                    <stop offset="100%" stopColor="#0077BE" />
                                </linearGradient>
                            </defs>
                            {[...Array(20)].map((_, i) => (
                                <motion.circle
                                    key={`c1-${i}`}
                                    cx={200 + Math.sin(i * 0.5) * 80}
                                    cy={50 + i * 15}
                                    r={4 + Math.cos(i * 0.5) * 2}
                                    fill="url(#helixGrad)"
                                    animate={{
                                        cx: [200 + Math.sin(i * 0.5) * 80, 200 + Math.sin(i * 0.5 + Math.PI) * 80, 200 + Math.sin(i * 0.5) * 80],
                                        opacity: [0.3, 1, 0.3],
                                        scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.1
                                    }}
                                />
                            ))}
                            {[...Array(20)].map((_, i) => (
                                <motion.circle
                                    key={`c2-${i}`}
                                    cx={200 + Math.sin(i * 0.5 + Math.PI) * 80}
                                    cy={50 + i * 15}
                                    r={4 + Math.cos(i * 0.5 + Math.PI) * 2}
                                    fill="#FFFFFF"
                                    animate={{
                                        cx: [200 + Math.sin(i * 0.5 + Math.PI) * 80, 200 + Math.sin(i * 0.5) * 80, 200 + Math.sin(i * 0.5 + Math.PI) * 80],
                                        opacity: [1, 0.3, 1],
                                        scale: [1.2, 0.8, 1.2]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.1
                                    }}
                                />
                            ))}
                        </svg>

                        <div className="absolute -bottom-10 right-0 glass-card p-6 border-white/5 backdrop-blur-3xl">
                            <p className="text-white text-xs font-bold italic opacity-80 mb-2">"We are not tech entrepreneurs guessing at the ocean;"</p>
                            <p className="text-[#00D9C0] text-sm font-black uppercase tracking-widest">"We are ocean professionals doing tech."</p>
                        </div>
                    </motion.div>
                </div>

                {/* Legacy-Free Leadership Section */}
                <div className="mb-48">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                        <div>
                            <span className="text-[#FF6B6B] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Founding Council</span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">The Visionaries.</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
                        {/* Roland Poulin */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glass-panel p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Target size={120} className="text-white" />
                            </div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-3 rounded-full bg-[#00D9C0] animate-glow"></div>
                                <span className="text-[10px] font-bold text-[#00D9C0] uppercase tracking-[0.4em]">Active Status: CEO</span>
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">Roland Poulin</h3>
                            <p className="text-slate-400 leading-relaxed font-light mb-8 text-lg">
                                SVOP Captain and maritime entrepreneur. Roland bridges the gap between commercial ocean operations
                                and venture-scalable material science.
                            </p>
                            <div className="flex gap-4">
                                <Linkedin className="w-5 h-5 text-slate-600 hover:text-white transition-colors cursor-pointer" />
                                <Twitter className="w-5 h-5 text-slate-600 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </motion.div>

                        {/* Alex Andrei */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="glass-panel p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Activity size={120} className="text-white" />
                            </div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-3 rounded-full bg-[#0077BE] animate-glow"></div>
                                <span className="text-[10px] font-bold text-[#0077BE] uppercase tracking-[0.4em]">Active Status: COO</span>
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">Alex Andrei</h3>
                            <p className="text-slate-400 leading-relaxed font-light mb-8 text-lg">
                                Deep-sea operations and logistics lead. Alex oversees the global supply chain for C-Brick™ deployment
                                and robotic manufacturing protocols.
                            </p>
                            <div className="flex gap-4">
                                <Linkedin className="w-5 h-5 text-slate-600 hover:text-white transition-colors cursor-pointer" />
                                <Globe className="w-5 h-5 text-slate-600 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-16 py-32 border-t border-white/5">
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Shield className="w-10 h-10 text-[#00D9C0] mb-8" />
                        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Co-Stewardship</h4>
                        <p className="text-slate-500 leading-relaxed font-light">
                            Indigenous partnership is in our DNA. We mandate FPIC for all operations and integrate
                            traditional knowledge into our scientific priorities.
                        </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Zap className="w-10 h-10 text-[#00D9C0] mb-8" />
                        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">IP-First Scale</h4>
                        <p className="text-slate-500 leading-relaxed font-light">
                            By focusing on high-margin materials and AI-driven software, we enable global
                            restoration without the constraints of legacy logistics.
                        </p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                        <Globe className="w-10 h-10 text-[#00D9C0] mb-8" />
                        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Verified Impact</h4>
                        <p className="text-slate-500 leading-relaxed font-light">
                            Traceable blue carbon sequestration and measurable biodiversity co-benefits are built
                            into our ReefMaker™ AI tracking.
                        </p>
                    </motion.div>
                </div>

                {/* Verification CTA */}
                <div className="py-24">
                    <div className="glass-panel p-16 rounded-[3rem] border border-white/5 bg-white/[0.01] relative overflow-hidden group text-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[100px] size-[400px] bg-[#00D9C0]/5 rounded-full pointer-events-none"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <span className="text-[#00D9C0] font-bold tracking-[0.5em] text-[10px] uppercase mb-10 block">Scientific Integrity</span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter leading-none">Open Source<br />Restoration Logic.</h2>
                            <p className="text-xl text-slate-400 mb-12 font-light leading-relaxed">
                                We believe in radical transparency. Every biomimetic profile recommended by
                                the ReefMaker™ Brain is backed by verified peer-reviewed research.
                            </p>
                            <a
                                href="https://github.com/Rolosolo/Coralfill/tree/main/docs/science-wiki"
                                target="_blank"
                                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-lg font-black uppercase tracking-widest text-xs hover:bg-[#00D9C0] transition-all"
                            >
                                <Github size={18} />
                                Verify Research
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

"use client";

import React from "react";
import { JsonLd } from "@/components/JsonLd";
import { Anchor, Users, Globe, Shield, Zap, ArrowRight, Github, Linkedin, Twitter, Brain, CheckCircle } from "lucide-react";

export function CompanyClient() {
    return (
        <main className="min-h-screen bg-[#02060c] pt-24 pb-20">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "mainEntity": {
                    "@type": "Organization",
                    "name": "CoralFil",
                    "description": "Providing the advanced 'glue' and 'architecture' necessary for successful, large-scale marine restoration.",
                    "founder": [
                        { "@type": "Person", "name": "Roland Poulin" },
                        { "@type": "Person", "name": "Alex Andrei" }
                    ]
                }
            }} />

            <div className="container mx-auto px-6 max-w-7xl 2xl:max-w-screen-2xl">
                {/* Hero Section */}
                <div className="max-w-4xl mb-24">
                    <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                        Our Vision
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight italic">
                        "Brick by Brick"<br />
                        <span className="text-glow-gradient not-italic">Rebuilding the Oceans.</span>
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                        Passion alone cannot reverse the coral crisis. We need scalable, realistic, and highly traceable solutions.
                        Coralfill is building the structural and chemical foundation for 100,000+ hectares of reef restoration by 2035.
                    </p>
                </div>

                {/* The "Why" Section */}
                <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-white tracking-tight">Realizing the Blue Economy.</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Coral reefs provide $375 billion annually in ecosystem services, yet 90% are critically threatened by 2030.
                            Traditional restoration methods are manual, low-nutrient, and cannot scale.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                            We operate at the "IP and Materials" layer, bypassing heavy logistics to provide the essential
                            building blocks for reef recovery. Our solution is deep-tech, high-margin, and scientifically validated.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">100k+</span>
                                <span className="text-xs text-primary font-bold uppercase tracking-wider">Hectares Target</span>
                            </div>
                            <div className="w-px h-12 bg-white/10 mx-4"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">70-85%</span>
                                <span className="text-xs text-primary font-bold uppercase tracking-wider">Retention Rate</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-[48px] overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                        </div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                                <p className="text-white font-bold italic">"We are not tech entrepreneurs guessing at the ocean; we are ocean professionals doing tech."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Founders Section */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <h2 className="text-4xl font-bold text-white tracking-tight">The Founding Team</h2>
                            <p className="text-slate-400 mt-2">Marine logistics meets material science.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Roland Poulin */}
                        <div className="glass-panel p-8 rounded-[40px] border border-white/10 group hover:border-primary/50 transition-colors">
                            <div className="w-full aspect-[4/5] bg-white/5 rounded-3xl mb-8 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                                    <Users size={64} />
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                    CEO
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Roland Poulin</h3>
                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Co-Founder & CEO</p>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                SVOP Captain and former commercial crab deckhand with authentic maritime credibility.
                                Proven entrepreneur with a background in building and exiting successful technology firms.
                                Leading strategy and partnerships.
                            </p>
                            <div className="flex gap-4">
                                <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                                <Twitter className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>

                        {/* Alex Andrei */}
                        <div className="glass-panel p-8 rounded-[40px] border border-white/10 group hover:border-[#0077BE]/50 transition-colors">
                            <div className="w-full aspect-[4/5] bg-white/5 rounded-3xl mb-8 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                                    <Users size={64} />
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-[#0077BE] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                    COO
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Alex Andrei</h3>
                            <p className="text-[#0077BE] text-xs font-bold uppercase tracking-widest mb-4">Co-Founder & COO</p>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                PADI Certified Diver and SVOP Captain. Alex brings decades of operational excellence
                                and marine logistics expertise in BC waters. Leading supply chains, manufacturing,
                                and field validation.
                            </p>
                            <div className="flex gap-4">
                                <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                                <Globe className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>

                        {/* Biswajit */}
                        <div className="glass-panel p-8 rounded-[40px] border border-white/10 group hover:border-[#FF6B6B]/50 transition-colors">
                            <div className="w-full aspect-[4/5] bg-white/5 rounded-3xl mb-8 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                                    <Users size={64} />
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-[#FF6B6B] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Science
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Biswajit</h3>
                            <p className="text-[#FF6B6B] text-xs font-bold uppercase tracking-widest mb-4">Scientific Advisor</p>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                Leading Cold-Water Coral Expert with 40+ years experience. Former DFO scientist leveraging
                                deep regulatory relationships to navigate pathways and oversee peer-reviewed outputs.
                            </p>
                            <div className="flex gap-4">
                                <Linkedin className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-12 py-24 border-t border-white/5">
                    <div>
                        <Shield className="w-10 h-10 text-primary mb-6" />
                        <h4 className="text-xl font-bold text-white mb-3">Co-Stewardship</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Indigenous partnership is in our DNA. We mandate FPIC for all operations and integrate
                            traditional knowledge into our scientific priorities.
                        </p>
                    </div>
                    <div>
                        <Zap className="w-10 h-10 text-primary mb-6" />
                        <h4 className="text-xl font-bold text-white mb-3">IP-First Scale</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            By focusing on high-margin materials and AI-driven software, we enable global
                            restoration without the constraints of heavy logistics.
                        </p>
                    </div>
                    <div>
                        <Globe className="w-10 h-10 text-primary mb-6" />
                        <h4 className="text-xl font-bold text-white mb-3">Verified Impact</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Traceable blue carbon sequestration and measurable biodiversity co-benefits are built
                            into our ReefMaker AI performance tracking.
                        </p>
                    </div>
                </div>

                {/* Science Wiki CTA */}
                <div className="py-24 border-t border-white/5">
                    <div className="glass-panel p-12 rounded-[48px] border border-[#00D9C0]/20 bg-[#00D9C0]/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                            <Brain size={160} className="text-[#00D9C0]" />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00D9C0]/10 text-[#00D9C0] text-[10px] font-black uppercase tracking-[0.2em] border border-[#00D9C0]/20">
                                Open Intelligence
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-6">Explore the Science Wiki.</h2>
                            <p className="text-lg text-slate-300 mb-8 font-light">
                                We believe in radical transparency. Every biomimetic profile and chemical ratio recommended by
                                the ReefMaker Brain is backed by verified peer-reviewed research from Google Scholar and PubMed.
                            </p>
                            <a
                                href="https://github.com/Rolosolo/Coralfill/tree/main/docs/science-wiki"
                                target="_blank"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#00D9C0] text-black rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
                            >
                                <Github size={16} />
                                Verify Scientific Sources
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

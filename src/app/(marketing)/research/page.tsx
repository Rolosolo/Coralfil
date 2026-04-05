"use client";

import { motion } from "@/components/motion-client";
import {
    BookOpen, Beaker, Lightbulb, ArrowRight,
    Microscope, Sprout, Globe, Zap, Grid
} from "lucide-react";

const RESEARCH_CATEGORIES = [
    { title: "Biomimetic Substrates", icon: <Grid size={20} />, count: 12 },
    { title: "Probiotic Consortia", icon: <Beaker size={20} />, count: 8 },
    { title: "Larval Attraction", icon: <Zap size={20} />, count: 15 },
    { title: "Ocean Geochemistry", icon: <Globe size={20} />, count: 6 }
];

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCovIh_7Q6DF2l3xdQQ7w51SV46VEOqVydGiNH2GzC4gXgVCySb2acCYrjvKzk0U5GoL4FknBlIbP-bJ1BmMxXIjfW_UgFqgMQEMgHepX0kIzft4X8gNBqlLq-te7h5XlIpKY_6dQnAuWE4J_vuyqD5qDZCpBro6ti2D4QI-h-duNILkpyubD3swqeaUJsQ4cxtOG0Ou89gkuzl6NBs2dR76piTudHvED9D2TQT7FXOo2rFXifuXvW1AXQIpeIjTivZUOWNj2nIqdU";

const ARTICLES = [
    {
        id: "alphafold-3-corals",
        category: "Breakthrough",
        title: "AlphaFold 3 in Coral Mucus Proteomics",
        description: "How we use deep learning to predict ionic binding affinity between synthetic polymers and Acropora mucus glycoproteins.",
        date: "Oct 2025",
        readTime: "12 min read",
        author: "Dr. Elena Vance"
    },
    {
        id: "restoration-tips-2026",
        category: "Tips",
        title: "10 Protocols for High-Temperature Restoration",
        description: "A comprehensive guide for field teams working in anomalous thermal events. Strategies for maximizing pellet adhesion.",
        date: "Sep 2025",
        readTime: "8 min read",
        author: "ReefMaster Logic"
    },
    {
        id: "larval-settlement",
        category: "Research",
        title: "Acoustic Signatures of Healthy Reefs",
        description: "Leveraging Snapping Shrimp audio frequencies within Coraltex™ skeletons to increase larval settlement rates by 40%.",
        date: "Aug 2025",
        readTime: "15 min read",
        author: "Marcus Thorne"
    }
];

export default function ResearchPage() {
    return (
        <div className="flex-grow pt-32 pb-40 bg-[#010307]">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col gap-6 mb-24 max-w-4xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Intelligence Repository</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                        Coral Restoration <br />
                        <span className="text-[#00D9C0] brightness-125">Research.</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
                        Open-source breakthroughs, field-tested protocols, and biomimetic logic from the Coralfill scientific ensemble.
                    </p>
                </div>

                {/* Featured Grid */}
                <div className="grid lg:grid-cols-3 gap-12 mb-32">
                    <div className="lg:col-span-2 space-y-12">
                        {ARTICLES.map((article, i) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="w-full md:w-64 h-48 rounded-3xl overflow-hidden shrink-0 border border-white/10 relative">
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                                    <img
                                        src={HERO_IMG}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-primary text-black text-[9px] font-black uppercase rounded-full">
                                        {article.category}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                                        <span>{article.date}</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase group-hover:text-primary transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                                        {article.description}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20"></div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">By {article.author}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-8 sticky top-32">
                            <h4 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                                <Microscope size={20} className="text-primary" />
                                Categories
                            </h4>
                            <div className="space-y-4">
                                {RESEARCH_CATEGORIES.map((cat, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4 text-slate-400 group-hover:text-white">
                                            {cat.icon}
                                            <span className="text-xs font-bold uppercase tracking-widest">{cat.title}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-600 group-hover:text-primary">{cat.count}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20 space-y-4">
                                    <Lightbulb size={24} className="text-primary" />
                                    <h5 className="text-sm font-black text-white uppercase tracking-widest">Contribute Research</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                                        Submit your findings on ocean acidification defense or probiotic efficacy.
                                    </p>
                                    <button className="flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-widest hover:gap-4 transition-all">
                                        Submission Portal
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Survival Handbook Banner */}
                <div className="p-12 md:p-20 rounded-[60px] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:scale-175 transition-transform duration-1000">
                        <Sprout size={300} className="text-primary" />
                    </div>
                    <div className="relative z-10 max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary rounded-full text-black text-[10px] font-black uppercase tracking-widest mb-4">
                            New Protocol
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                            The 2026 Reef <br />
                            <span className="text-primary">Survival Handbook.</span>
                        </h2>
                        <p className="text-lg text-slate-400 font-light leading-relaxed">
                            A field-manual tailored specifically for Coralfil partners. Includes GPS settlement logic, C-Brick stacking configurations, and biopolymer degradation schedules.
                        </p>
                        <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-primary transition-all shadow-2xl">
                            Download Deployment Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

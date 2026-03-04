"use client";

import React, { useState } from "react";
import {
    Upload, Search, FileText, Globe, Database,
    Zap, Shield, Plus, MoreHorizontal, ArrowUpRight,
    Play, Activity, Clock, Server, CheckCircle2,
    Settings, Filter, Download, Trash2, ExternalLink
} from "lucide-react";
import { motion } from "@/components/motion-client";

export default function KnowledgeIngestionPage() {
    const [activeTab, setActiveTab] = useState("documents");
    const [isIngesting, setIsIngesting] = useState(false);

    const stats = [
        { label: "Total Papers", value: "342", icon: FileText, color: "text-[#00D9C0]" },
        { label: "Entities Extracted", value: "1,240", icon: Zap, color: "text-[#FFD700]" },
        { label: "Processing Load", value: "14%", icon: Activity, color: "text-blue-400" },
        { label: "Last Sync", value: "2m ago", icon: Clock, color: "text-slate-400" }
    ];

    const documents = [
        { id: 1, title: "SCTLD Mitigative Probiotics in Porites astreoides", author: "McHale et al.", year: 2024, type: "PDF", status: "Ingested", relevance: 98 },
        { id: 2, title: "Thermal Resilience of Symbiodiniaceae in the Lucayan Archipelago", author: "Vanderburgh et al.", year: 2023, type: "PDF", status: "Ingested", relevance: 92 },
        { id: 3, title: "Ionic Calcification Rates Under Variable pH Microenvironments", author: "Zhang et al.", year: 2024, type: "PDF", status: "Processing", relevance: 88 },
        { id: 4, title: "Chitosan-Alginate Hydrogel Release Kinetics in Flowing Seawater", author: "Poulin et al.", year: 2025, type: "DOCX", status: "Ingested", relevance: 100 },
    ];

    return (
        <div className="flex flex-col h-full bg-transparent text-slate-200">
            {/* Header */}
            <header className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md sticky top-0 z-30">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Knowledge Ingestion</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-1">Science-Wiki Neural Pipeline</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Settings size={14} />
                        Scraper Config
                    </button>
                    <button
                        onClick={() => setIsIngesting(true)}
                        className="flex items-center gap-2 px-8 py-3 bg-[#00D9C0] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2ff] transition-all shadow-[0_0_20px_rgba(0,217,192,0.3)]"
                    >
                        <Upload size={14} />
                        Ingest Document
                    </button>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-6 p-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={`${stat.color} opacity-80`} size={20} />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Live Data</span>
                        </div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 pt-0 flex gap-8">
                {/* Left: Document List */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Tabs / Filter */}
                    <div className="flex items-center justify-between">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                            {["documents", "scrapers", "entities"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white/10 text-[#00D9C0]" : "text-slate-500 hover:text-white"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search library..."
                                    className="bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9C0]/50 w-64"
                                />
                            </div>
                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden bg-black/20">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Resource Title</th>
                                    <th className="px-6 py-4">Metadata</th>
                                    <th className="px-6 py-4 text-center">Score</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="group hover:bg-white/[0.02] transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Ingested' ? 'bg-[#00D9C0] animate-glow' : 'bg-yellow-500 animate-pulse'}`}></div>
                                                <span className={`text-[10px] font-black uppercase tracking-tighter ${doc.status === 'Ingested' ? 'text-[#00D9C0]' : 'text-yellow-500'}`}>{doc.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white group-hover:text-[#00D9C0] transition-colors">{doc.title}</span>
                                                <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">{doc.type} • {doc.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-mono text-slate-400">PUB: {doc.year} • RM-REF-{doc.id}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center justify-center size-8 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-[#00D9C0]">
                                                {doc.relevance}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5">
                                                    <ExternalLink size={14} />
                                                </button>
                                                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-400 border border-white/5">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Ingestion Pipeline View */}
                <aside className="w-80 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-black/40 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Neural Stream</h3>
                            <Activity size={18} className="text-[#00D9C0] animate-pulse" />
                        </div>

                        <div className="space-y-8">
                            {[
                                { label: "PDF Extraction", status: "Active", progress: 85, icon: FileText },
                                { label: "Entity Recognition", status: "Active", progress: 42, icon: Zap },
                                { label: "CrossRef Sync", status: "Waiting", progress: 0, icon: Globe },
                                { label: "Vector Indexing", status: "Queued", progress: 0, icon: Database }
                            ].map((step, i) => (
                                <div key={step.label} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <step.icon size={14} className="text-slate-500" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{step.label}</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{step.status}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${step.progress}%` }}
                                            className="h-full bg-[#00D9C0] shadow-[0_0_10px_rgba(0,217,192,0.5)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-4 rounded-xl bg-[#00D9C0]/5 border border-[#00D9C0]/10 border-dashed">
                            <p className="text-[9px] text-[#00D9C0] font-bold leading-relaxed uppercase tracking-widest">
                                System currently scanning: C:/Users/User/Documents/Coralfill/Knowledge
                            </p>
                        </div>

                        <button className="mt-auto w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                            <Play size={14} />
                            Start Ingestion
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

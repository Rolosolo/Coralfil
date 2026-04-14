"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Search, ZoomIn, ZoomOut, Maximize2, RefreshCw,
    Share2, Download, Info, Zap, Shield, FileText,
    Activity, Globe, Dna, FlaskConical, Target,
    Layers, Grid, MoreHorizontal, ArrowRight, Play
} from "lucide-react";
import { motion, AnimatePresence } from "@/components/motion-client";

interface Node {
    id: string;
    label: string;
    type: "compound" | "paper" | "process" | "threat";
    x: number;
    y: number;
    size: number;
    connections: string[];
    description: string;
    metrics?: { label: string; value: string }[];
}

export default function KnowledgeTreePage() {
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"graph" | "cluster">("graph");

    // Mock Nodes
    const nodes: Node[] = [
        {
            id: "C01", label: "Chitosan", type: "compound", x: 45, y: 35, size: 60, connections: ["P01", "P03", "TH01"],
            description: "Cationic biopolymer used as an antimicrobial binder. Interacts with negatively charged bacterial membranes.",
            metrics: [{ label: "MW", value: "Low (~50kDa)" }, { label: "Deacetylation", value: "75-85%" }]
        },
        {
            id: "C02", label: "Alginate", type: "compound", x: 55, y: 45, size: 55, connections: ["P01", "P02"],
            description: "Anionic polysaccharide from brown algae. Forms ionotropic hydrogels in the presence of Ca²⁺.",
            metrics: [{ label: "G-Content", value: "High (65%)" }]
        },
        {
            id: "P01", label: "McHale 2024", type: "paper", x: 50, y: 25, size: 45, connections: ["C01", "C02", "PR01"],
            description: "Seminal paper on SCTLD mitigative prebiotics in Porites astreoides.",
            metrics: [{ label: "Citations", value: "42" }, { label: "Impact Factor", value: "9.2" }]
        },
        {
            id: "TH01", label: "SCTLD", type: "threat", x: 65, y: 20, size: 70, connections: ["C01", "P01"],
            description: "Stony Coral Tissue Loss Disease. High mortality disease affecting 30+ Caribbean species.",
            metrics: [{ label: "Mortality Rate", value: "High (>90%)" }]
        },
        {
            id: "PR01", label: "Calcification", type: "process", x: 35, y: 55, size: 50, connections: ["P01", "C02"],
            description: "Biological process of depositing calcium carbonate for structural growth.",
            metrics: [{ label: "Rate", value: "0.2mm/day" }]
        }
    ];

    return (
        <div className="flex h-full bg-[#010307] text-slate-200 overflow-hidden">
            {/* Left: Interactive Canvas Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Canvas Toolbar Overhead */}
                <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
                    <div className="glass-panel p-2 rounded-2xl flex items-center gap-1 bg-black/40 border border-white/10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Concept Map..."
                                className="bg-white/5 border border-white/5 rounded-xl px-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#00D9C0]/50 w-64 transition-all"
                            />
                        </div>
                        <div className="w-px h-6 bg-white/10 mx-2"></div>
                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                            <RefreshCw size={14} />
                        </button>
                    </div>

                    <div className="glass-panel p-1 rounded-xl flex bg-white/5 border border-white/10">
                        <button
                            onClick={() => setViewMode("graph")}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'graph' ? 'bg-[#00D9C0] text-black shadow-lg shadow-[#00D9C0]/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            Node Graph
                        </button>
                        <button
                            onClick={() => setViewMode("cluster")}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'cluster' ? 'bg-[#00D9C0] text-black shadow-lg shadow-[#00D9C0]/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            Clusters
                        </button>
                    </div>
                </div>

                {/* View Controls (Bottom Right) */}
                <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2">
                    <button className="size-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 backdrop-blur-md transition-all">
                        <ZoomIn size={20} />
                    </button>
                    <button className="size-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 backdrop-blur-md transition-all">
                        <ZoomOut size={20} />
                    </button>
                    <button className="size-12 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 backdrop-blur-md transition-all">
                        <Maximize2 size={20} />
                    </button>
                </div>

                {/* Legend (Bottom Left) */}
                <div className="absolute bottom-8 left-8 z-20">
                    <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col gap-3">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Visualization Legend</span>
                        <div className="flex items-center gap-3">
                            <div className="size-2.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700/50]"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Formulation Compound</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-2.5 rounded-full bg-[#00D9C0] shadow-[0_0_8px_#00D9C0/50]"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Science Paper</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="size-2.5 rounded-full bg-[#FF6B6B] shadow-[0_0_8px_#FF6B6B/50]"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Environmental Threat</span>
                        </div>
                    </div>
                </div>

                {/* Graph Canvas Placeholder */}
                <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                    {/* Connections (SVG Layer) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {nodes.map(node => node.connections.map(connId => {
                            const target = nodes.find(n => n.id === connId);
                            if (!target) return null;
                            return (
                                <line
                                    key={`${node.id}-${connId}`}
                                    x1={`${node.x}%`} y1={`${node.y}%`}
                                    x2={`${target.x}%`} y2={`${target.y}%`}
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="1"
                                />
                            );
                        }))}
                    </svg>

                    {/* Nodes Layer */}
                    <div className="absolute inset-0 z-10">
                        {nodes.map(node => (
                            <motion.button
                                key={node.id}
                                onClick={() => setSelectedNode(node)}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                whileHover={{ scale: 1.1 }}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all flex items-center justify-center group shadow-2xl ${selectedNode?.id === node.id
                                        ? 'border-white bg-white/20 z-50 ring-4 ring-white/10'
                                        : node.type === 'compound' ? 'border-[#FFD700]/30 bg-[#FFD700]/5 text-[#FFD700]'
                                            : node.type === 'paper' ? 'border-[#00D9C0]/30 bg-[#00D9C0]/5 text-[#00D9C0]'
                                                : node.type === 'threat' ? 'border-[#FF6B6B]/30 bg-[#FF6B6B]/5 text-[#FF6B6B]'
                                                    : 'border-slate-500/30 bg-slate-500/5 text-slate-500'
                                    }`}
                                initial={{ width: node.size, height: node.size }}
                                animate={{ width: node.size, height: node.size }}
                            >
                                <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity bg-current"></div>
                                <span className="text-[10px] font-black uppercase text-center px-2 leading-tight select-none">
                                    {node.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Knowledge Detail Panel */}
            <aside className="w-[440px] border-l border-white/10 bg-[#02060c] p-10 flex flex-col gap-8 relative z-30 custom-scrollbar overflow-y-auto">
                <AnimatePresence mode="wait">
                    {selectedNode ? (
                        <motion.div
                            key={selectedNode.id}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 50, opacity: 0 }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className={`size-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${selectedNode.type === 'compound' ? 'text-[#FFD700]' :
                                            selectedNode.type === 'paper' ? 'text-[#00D9C0]' : 'text-[#FF6B6B]'
                                        }`}>
                                        {selectedNode.type === 'compound' ? <FlaskConical size={20} /> :
                                            selectedNode.type === 'paper' ? <FileText size={20} /> : <Shield size={20} />}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">{selectedNode.label}</h2>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1 block">{selectedNode.type} ID: {selectedNode.id}</span>
                                    </div>
                                </div>
                                <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                                    <Share2 size={16} />
                                </button>
                            </div>

                            <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/[0.02] mb-8">
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Core Definition</h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-light">
                                    {selectedNode.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {selectedNode.metrics?.map(metric => (
                                    <div key={metric.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">{metric.label}</span>
                                        <span className="text-lg font-black text-[#00D9C0] font-mono tracking-tighter">{metric.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Linked Knowledge</h3>
                                <div className="space-y-3">
                                    {selectedNode.connections.map(id => {
                                        const connNode = nodes.find(n => n.id === id);
                                        if (!connNode) return null;
                                        return (
                                            <button
                                                key={id}
                                                onClick={() => setSelectedNode(connNode)}
                                                className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00D9C0]/30 hover:bg-white/[0.08] transition-all flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-2 rounded-full ${connNode.type === 'compound' ? 'bg-[#FFD700]' :
                                                            connNode.type === 'paper' ? 'bg-[#00D9C0]' : 'bg-[#FF6B6B]'
                                                        }`}></div>
                                                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors uppercase tracking-widest">{connNode.label}</span>
                                                </div>
                                                <ArrowRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <button className="mt-auto w-full flex items-center justify-center gap-3 bg-[#00D9C0] text-black hover:bg-[#00f2ff] font-black py-5 rounded-2xl transition-all shadow-xl group uppercase tracking-widest text-[11px]">
                                <Play size={16} className="fill-current" />
                                Run Prediction Model
                            </button>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-40">
                            <Layers size={64} className="mb-8 text-slate-600" />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Neural Graph Ready</h3>
                            <p className="text-sm text-slate-500 max-w-xs leading-relaxed font-light">
                                Select any node in the knowledge matrix to view deep relationships, citation clusters, and formulation mechanisms.
                            </p>
                            <div className="mt-12 flex flex-col gap-4 w-full">
                                <div className="flex items-center gap-4 text-left p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00D9C0]">
                                        <Activity size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Global Accuracy</p>
                                        <p className="text-lg font-mono font-black text-[#00D9C0] mt-1">94.8%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </aside>
        </div>
    );
}

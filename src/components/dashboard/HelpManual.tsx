"use client";

import React from "react";
import { motion, AnimatePresence } from "@/components/motion-client";
import { X, BookOpen, Terminal, Shield, Droplets, Info, ExternalLink } from "lucide-react";

interface HelpManualProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HelpManual({ isOpen, onClose }: HelpManualProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-xl z-[120] bg-[#010307] border-l border-white/10 shadow-3xl overflow-y-auto"
                    >
                        <div className="p-8 space-y-10">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-[#00D9C0]/10 border border-[#00D9C0]/20 text-[#00D9C0]">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight">ReefMaker™ Manual</h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Operator Guidance v2.0</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Section: Overview */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.3em]">
                                    <Info size={14} />
                                    The Mission
                                </div>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">
                                    ReefMaker AI is a strategic neural engine for biological reef restoration. Our goal is to shift reef architecture from static concrete blocks to dynamic, biomimetic "Helix Pyramids" that sequester carbon while fostering multi-species growth.
                                </p>
                            </div>

                            {/* Section: Controls */}
                            <div className="space-y-6">
                                <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">Interaction Protocols</h4>

                                <div className="grid gap-4">
                                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
                                        <div className="p-2 rounded-lg bg-white/5 text-[#00D9C0] shrink-0 h-fit">
                                            <Terminal size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black text-white uppercase mb-1">Neural HUD</div>
                                            <p className="text-[11px] text-slate-500 leading-relaxed font-light">The central interface predicts coral settlement based on regional environmental data flows. Adjust parameters in real-time to observe resilience scores.</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
                                        <div className="p-2 rounded-lg bg-white/5 text-[#FF6B6B] shrink-0 h-fit">
                                            <Droplets size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black text-white uppercase mb-1">CoralStick™ Integration</div>
                                            <p className="text-[11px] text-slate-500 leading-relaxed font-light">Our proprietary probiotic gel provides the chemical signals necessary for larval recruitment. Proper load balancing is critical for early-stage survival.</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
                                        <div className="p-2 rounded-lg bg-white/5 text-[#00D9C0] shrink-0 h-fit">
                                            <Shield size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black text-white uppercase mb-1">Technical Vetting</div>
                                            <p className="text-[11px] text-slate-500 leading-relaxed font-light">Before deployment, all project configurations must undergo biological vetting by the CoralFil engineering team. Use the inquiry form to initiate this protocol.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* External Links */}
                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reference Materials</h5>
                                <div className="space-y-2">
                                    <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-[11px] text-slate-400 hover:text-[#00D9C0] transition-all group">
                                        <span>R&D Technical Overview (PDF)</span>
                                        <ExternalLink size={14} />
                                    </a>
                                    <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-[11px] text-slate-400 hover:text-[#00D9C0] transition-all group">
                                        <span>Environmental Compliance Ledger</span>
                                        <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-center pt-10">
                                <div className="text-[10px] text-slate-700 font-mono">CODE: ALPHA-STITCH-REED-2026</div>
                                <div className="text-[8px] text-slate-800 uppercase tracking-[0.5em] mt-2">CoralFil Proprietary Systems</div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

"use client";

import { ArrowRight, MapPin, Target, Users, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "@/components/motion-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dataService } from "@/lib/data-service";

export default function NewProjectPage() {
    const [projectName, setProjectName] = useState("");
    const [isInitializing, setIsInitializing] = useState(false);
    const router = useRouter();

    const handleInitialize = () => {
        setIsInitializing(true);
        // Trigger Orchestration Hook
        dataService.triggerProjectInit(projectName || "sector-a4");

        // Simulate AI analysis delay
        setTimeout(() => {
            router.push("/dashboard/project/sector-a4/design");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#010307] p-8 md:p-12 lg:p-20">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-[1px] bg-[#00D9C0]"></div>
                        <span className="text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.4em]">Neural Vector Init</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
                        Initialize Restoration <span className="text-[#00D9C0]">Vector</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] max-w-xl leading-relaxed">
                        Define parameters for the ReefMaker intelligence layers. Site analysis will commence upon synchronization.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-10 md:p-16 rounded-[2rem] border border-white/5 relative overflow-hidden bg-white/[0.01]"
                >
                    <div className="grid gap-12 relative z-10">
                        {/* Project Name */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-[#00D9C0]"></span> Project Internal Codename
                            </label>
                            <input
                                type="text"
                                placeholder="E.G. PROJECT_HELIX_ALPHA"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6 text-white focus:outline-none focus:border-[#00D9C0]/30 transition-all font-mono text-lg tracking-wider placeholder:text-slate-800"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <MapPin size={12} className="text-[#00D9C0]" /> Site Coordinates (GPS)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <input type="text" placeholder="LAT: -14.672" className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6 text-white focus:outline-none focus:border-[#00D9C0]/30 transition-all font-mono tracking-wider placeholder:text-slate-800" />
                                </div>
                                <div className="relative">
                                    <input type="text" placeholder="LON: 145.421" className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6 text-white focus:outline-none focus:border-[#00D9C0]/30 transition-all font-mono tracking-wider placeholder:text-slate-800" />
                                </div>
                            </div>
                        </div>

                        {/* Client & Species */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Users size={12} className="text-[#00D9C0]" /> Stakeholder Affinity
                                </label>
                                <div className="relative group">
                                    <select className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6 text-white focus:outline-none focus:border-[#00D9C0]/30 transition-all appearance-none cursor-pointer font-bold uppercase tracking-widest text-[10px]">
                                        <option>Select Client...</option>
                                        <option>Marine Conservation Society</option>
                                        <option>Six Senses Resorts</option>
                                        <option>Government of Maldives</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-hover:text-[#00D9C0] transition-colors">
                                        <ArrowRight size={14} className="rotate-90" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Target size={12} className="text-[#00D9C0]" /> Primary Cultivar
                                </label>
                                <div className="relative group">
                                    <select className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-6 text-white focus:outline-none focus:border-[#00D9C0]/30 transition-all appearance-none cursor-pointer font-bold uppercase tracking-widest text-[10px]">
                                        <option>Acropora cervicornis</option>
                                        <option>Acropora palmata</option>
                                        <option>Orbicella annularis</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-hover:text-[#00D9C0] transition-colors">
                                        <ArrowRight size={14} className="rotate-90" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 flex justify-end">
                            <button
                                disabled={isInitializing}
                                onClick={handleInitialize}
                                className="w-full md:w-auto bg-[#00D9C0] hover:bg-[#00f2ff] text-black px-12 py-6 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_rgba(0,217,192,0.15)] disabled:opacity-50"
                            >
                                {isInitializing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Synchronizing Data...
                                    </>
                                ) : (
                                    <>
                                        Begin Neural Analysis
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9C0]/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/[0.02] blur-[80px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
                </motion.div>

                <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-6 px-8 py-3 rounded-full border border-white/5 bg-white/[0.01]">
                        <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">Security Layer</span>
                        <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                        <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">End-to-End Encryption</span>
                        <div className="w-1 h-1 rounded-full bg-slate-800"></div>
                        <span className="text-[8px] font-black text-[#00D9C0]/40 uppercase tracking-[0.4em]">Verified Science Protocol</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

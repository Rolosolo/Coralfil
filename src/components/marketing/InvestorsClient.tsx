"use client";

import { JsonLd } from "@/components/JsonLd";
import { Download, ArrowRight, ShieldCheck, Globe, Activity, FileText } from "lucide-react";
import { investorPackService } from "@/lib/investor-pack";

export function InvestorsClient() {
    const handleDownloadRDPack = () => {
        investorPackService.downloadAsMarkdown();
    };

    return (
        <main className="min-h-screen bg-[#010307] pt-24 pb-20">
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://coralfill.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Investor Relations",
                        "item": "https://coralfill.com/investors"
                    }
                ]
            }} />
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="max-w-4xl mb-20 text-center mx-auto">
                    <div className="inline-block px-4 py-1.5 mb-8 rounded-lg bg-[#00D9C0]/10 text-[#00D9C0] text-[10px] font-bold uppercase tracking-[0.4em] border border-[#00D9C0]/20">
                        Strategic R&D Phase
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
                        Regenerative<br />
                        <span className="text-glow-gradient">Infrastructure.</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
                        We are engineering the foundational intelligence layer for the Blue Economy.
                        Scalable, verifiable, and biologically imperative.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <div className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-[#00D9C0]/20 transition-all group">
                        <Activity className="w-8 h-8 text-[#00D9C0] mb-8 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-4">Validated</h3>
                        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-black mb-6">Pipeline Alignment</p>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                            Foundational vetting complete across primary target regions. Aligning with institutional stewards for large-scale reef restoration.
                        </p>
                    </div>
                    <div className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-[#0077BE]/20 transition-all group">
                        <Globe className="w-8 h-8 text-[#0077BE] mb-8 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-4">Scalable</h3>
                        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-black mb-6">Network Reach</p>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                            Modular substrate methodology designed for global oceanic deployment, from Pacific shelf reefs to Caribbean tropical habitats.
                        </p>
                    </div>
                    <div className="glass-panel p-10 rounded-[2rem] border border-white/5 hover:border-[#FF6B6B]/20 transition-all group">
                        <ShieldCheck className="w-8 h-8 text-[#FF6B6B] mb-8 group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-bold text-white mb-4">Proprietary</h3>
                        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-black mb-6">Technological IP</p>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                            Deep-tech moat encompassing C-Brick™ geometry, ReefMaker™ neural architecture, and ionic nutrient release matrices.
                        </p>
                    </div>
                </div>

                {/* R&D Technical Overview CTA */}
                <div className="bg-white/5 rounded-[3rem] p-12 md:p-20 border border-white/5 relative overflow-hidden text-center group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,192,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex p-5 bg-[#00D9C0]/5 rounded-2xl border border-[#00D9C0]/20 text-[#00D9C0] mb-8">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">R&D Technical Overview</h2>
                        <p className="text-slate-400 mb-12 font-light text-lg">
                            Access our comprehensive research roadmap, manufacturing methodologies, and hypothesized biological outcomes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={handleDownloadRDPack}
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-lg font-black uppercase tracking-widest text-xs hover:bg-[#00D9C0] transition-all shadow-xl shadow-white/5"
                            >
                                <Download size={16} />
                                Download Technical Brief
                            </button>
                            <a href="mailto:ir@coralfill.com" className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/10 text-white rounded-lg font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                                Request Access
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

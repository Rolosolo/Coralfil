"use client";

import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { Download, TrendingUp, ArrowRight, ShieldCheck, Globe, Users, FileText } from "lucide-react";
import { investorPackService } from "@/lib/investor-pack";

export default function InvestorPage() {
    const handleDownloadRDPack = () => {
        investorPackService.downloadAsMarkdown();
    };

    return (
        <main className="min-h-screen bg-[#02060c] pt-24 pb-20">
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
                {/* ... rest of component ... */}
                <div className="max-w-4xl mb-12">
                    <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00D9C0]/10 text-[#00D9C0] text-xs font-bold uppercase tracking-widest border border-[#00D9C0]/20">
                        Series B Open
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Capitalizing on<br />
                        <span className="text-glow-gradient">Regenerative Infrastructure.</span>
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        We are building the definitive operating system for the Blue Economy.
                        Scalable, verifiable, and biologically imperative.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                        <TrendingUp className="w-10 h-10 text-[#00D9C0] mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">$54M</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-4">Pipeline Value</p>
                        <p className="text-sm text-slate-400">Contracts secured with 3 sovereign states and 14 major hospitality groups for Q3 2026.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                        <Globe className="w-10 h-10 text-[#0077BE] mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">12.5M</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-4">Unit TAM</p>
                        <p className="text-sm text-slate-400">Total addressable market of developable reef coastline suitable for C-Brick™ deployment.</p>
                    </div>
                    <div className="glass-panel p-8 rounded-2xl border border-white/10">
                        <ShieldCheck className="w-10 h-10 text-[#FF6B6B] mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-2">IP Moat</h3>
                        <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-4">Patents Pending</p>
                        <p className="text-sm text-slate-400">Proprietary rights on the C-Brick geometry, Bio-Enhancer chemical formula, and AI placement logic.</p>
                    </div>
                </div>

                <div className="bg-[#0c1629] rounded-3xl p-10 md:p-16 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden mb-12">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(0,119,190,0.1)_0%,transparent_60%)]"></div>
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-3xl font-bold text-white mb-4">Download Investor Prospectus (Q1 2026)</h2>
                        <p className="text-slate-400 mb-8">
                            Detailed financial modeling, unit economics, cohort analysis, and our technical roadmap through 2030.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/investor-pack.txt" download className="btn-premium bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200">
                                <Download size={20} />
                                Download Pack
                            </a>
                            <a href="mailto:ir@coralfill.com" className="px-8 py-4 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 flex items-center justify-center gap-2">
                                Schedule IR Call
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                    <div className="relative z-10 hidden md:block">
                        <div className="w-48 h-64 bg-white/5 border border-white/10 rounded-xl rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl flex items-center justify-center">
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest rotate-90">Confidential</span>
                        </div>
                    </div>
                </div>

                {/* New R&D Pack Section */}
                <div className="bg-gradient-to-br from-[#00D9C0]/10 to-[#0077BE]/10 rounded-3xl p-10 md:p-16 border border-[#00D9C0]/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,217,192,0.15)_0%,transparent_60%)]"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-12 h-12 text-[#00D9C0]" />
                            <div>
                                <h2 className="text-3xl font-bold text-white">R&D Technical Brief</h2>
                                <p className="text-sm text-[#00D9C0] font-bold uppercase tracking-widest">Manufacturing & Confirmation Trials</p>
                            </div>
                        </div>
                        <p className="text-slate-300 mb-8 max-w-3xl">
                            Comprehensive research roadmap covering manufacturing process development, confirmation trial methodology,
                            evidence-based research citations, and hypothesized outcome ranges. Includes $2.8M budget allocation,
                            24-month timeline, and risk mitigation strategies.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-[#00D9C0] mb-2">22-38%</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">Settlement Rate Increase</div>
                            </div>
                            <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-[#00D9C0] mb-2">18-35%</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">Growth Rate Increase</div>
                            </div>
                            <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-[#00D9C0] mb-2">2.5-4.2x</div>
                                <div className="text-xs text-slate-400 uppercase tracking-widest">Recruitment Density</div>
                            </div>
                        </div>
                        <button
                            onClick={handleDownloadRDPack}
                            className="bg-[#00D9C0] hover:bg-[#00D9C0]/90 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#00D9C0]/20"
                        >
                            <Download size={20} />
                            Download R&D Pack
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

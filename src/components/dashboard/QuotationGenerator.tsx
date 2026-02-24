"use client";

import React, { useState } from "react";
import { Send, DollarSign, FileText, Shield, User, Mail, MessageSquare, CheckCircle, Info, Activity } from "lucide-react";
import { motion, AnimatePresence } from "@/components/motion-client";
import { regulatoryDocs } from "@/lib/regulatory-docs";

interface QuotationData {
    brickCount: number;
    coralStickKg: number;
    tier: 'research' | 'pilot' | 'commercial';
    totalCost: number;
    breakdown: {
        bricks: number;
        coralStick: number;
        shipping: number;
        regulatory: number;
    };
}

export function QuotationGenerator({
    brickType,
    mixRatio,
    ionicStrength,
    uvFilterLevel,
    selectedConsortium,
    projectId
}: {
    brickType: string;
    mixRatio: number;
    ionicStrength: number;
    uvFilterLevel: number;
    selectedConsortium?: string | null;
    projectId: string;
}) {
    const [brickCount, setBrickCount] = useState(500);
    const [coralStickKg, setCoralStickKg] = useState(25);
    const [tier, setTier] = useState<'research' | 'pilot' | 'commercial'>('pilot');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        note: ""
    });

    const calculateQuote = (): QuotationData => {
        const brickUnitPrice = tier === 'research' ? 120 : tier === 'pilot' ? 95 : 75;
        const coralStickPricePerKg = tier === 'research' ? 180 : tier === 'pilot' ? 150 : 125;

        const bricksCost = brickCount * brickUnitPrice;
        const coralStickCost = coralStickKg * coralStickPricePerKg;
        const shippingCost = tier === 'research' ? 250 : tier === 'pilot' ? 500 : 1200;
        const regulatoryCost = tier === 'research' ? 0 : tier === 'pilot' ? 500 : 1500;

        return {
            brickCount,
            coralStickKg,
            tier,
            totalCost: bricksCost + coralStickCost + shippingCost + regulatoryCost,
            breakdown: {
                bricks: bricksCost,
                coralStick: coralStickCost,
                shipping: shippingCost,
                regulatory: regulatoryCost
            }
        };
    };

    const quote = calculateQuote();

    const handleSubmitInquiry = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Inquiry Submitted to hello@coralfil.com", {
            ...formData,
            projectSpecs: {
                projectId,
                brickType,
                brickCount,
                coralStickKg,
                tier,
                estimatedValue: quote.totalCost
            }
        });

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleExportFactSheet = () => {
        const factSheet = regulatoryDocs.generateFactSheet(projectId, brickCount, coralStickKg);
        const markdown = regulatoryDocs.generateMarkdownFactSheet(factSheet);
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coralfill-technical-specs-${projectId}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const wordCount = formData.note.trim().split(/\s+/).filter(Boolean).length;

    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[2rem] border border-white/10 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Shield size={120} className="text-[#00D9C0]" />
                </div>

                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                            <Activity size={20} className="text-[#00D9C0]" />
                            Configuration Inquiry
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Request Early Access & Technical Vetting</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-8 relative z-10"
                        >
                            {/* Tier Selection */}
                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Restoration Intensity</div>
                                <div className="grid grid-cols-3 gap-3">
                                    {(['research', 'pilot', 'commercial'] as const).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTier(t)}
                                            className={`py-3 rounded-lg border transition-all text-[10px] font-black uppercase tracking-widest ${tier === t
                                                ? 'border-[#00D9C0] bg-[#00D9C0]/10 text-[#00D9C0] shadow-[0_0_20px_rgba(0,217,192,0.1)]'
                                                : 'border-white/5 bg-white/[0.02] text-slate-500 hover:border-white/20'
                                                }`}
                                        >
                                            {t === 'research' ? 'R&D' : t === 'pilot' ? 'PROKARYOTE' : 'INDUSTRIAL'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black">
                                        <label className="text-slate-500">Structural Vector Volume</label>
                                        <span className="text-white">{brickCount} <span className="text-slate-600">UNITS</span></span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100"
                                        max="5000"
                                        step="100"
                                        value={brickCount}
                                        onChange={(e) => setBrickCount(parseInt(e.target.value))}
                                        className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#00D9C0]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black">
                                        <label className="text-slate-500">Biopolymer Dispersion Load</label>
                                        <span className="text-white">{coralStickKg} <span className="text-slate-600">KG</span></span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5"
                                        max="200"
                                        step="5"
                                        value={coralStickKg}
                                        onChange={(e) => setCoralStickKg(parseInt(e.target.value))}
                                        className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#FF6B6B]"
                                    />
                                </div>
                            </div>

                            {/* Inquiry Form */}
                            <form onSubmit={handleSubmitInquiry} className="pt-6 border-t border-white/5 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="FULL NAME"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg py-4 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-[#00D9C0]/50 transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            required
                                            type="email"
                                            placeholder="EMAIL ADDRESS"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-lg py-4 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-[#00D9C0]/50 transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-slate-600" />
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="PROJECT NOTES (MAX 30 WORDS)"
                                        value={formData.note}
                                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-lg py-5 pl-12 pr-4 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-[#00D9C0]/50 transition-all placeholder:text-slate-700 resize-none"
                                    />
                                    <div className={`absolute bottom-3 right-4 text-[8px] font-black tracking-widest ${wordCount > 30 ? 'text-[#FF6B6B]' : 'text-slate-600'}`}>
                                        {wordCount}/30 WORDS
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || wordCount > 30}
                                        className="flex-1 bg-[#00D9C0] hover:bg-[#00f2ff] disabled:opacity-50 disabled:hover:bg-[#00D9C0] text-black font-black py-4 rounded-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#00D9C0]/20 uppercase tracking-widest text-[10px]"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                        ) : (
                                            <Send size={16} />
                                        )}
                                        {isSubmitting ? "Processing..." : "Submit Inquiry"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleExportFactSheet}
                                        className="px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3"
                                    >
                                        <FileText size={16} />
                                        Specs
                                    </button>
                                </div>
                                <p className="text-[9px] text-slate-600 text-center italic tracking-tight">
                                    All inquiries are sent to <span className="text-white">hello@coralfil.com</span> for technical vetting.
                                </p>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-12 flex flex-col items-center text-center space-y-6"
                        >
                            <div className="w-20 h-20 rounded-full bg-[#00D9C0]/10 border border-[#00D9C0]/20 flex items-center justify-center text-[#00D9C0] mb-2 animate-bounce">
                                <CheckCircle size={40} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Inquiry Received</h4>
                                <p className="text-slate-500 text-xs font-light max-w-sm mx-auto leading-relaxed">
                                    Our biological engineering team has received your project parameters. A technical prospectus will be sent to <span className="text-white">{formData.email}</span> within 24 hours.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-[#00D9C0] text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
                            >
                                Send Another Request
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Compliance Note */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 flex items-start gap-4 bg-white/[0.01]">
                <Info size={18} className="text-[#00D9C0] shrink-0 mt-1" />
                <div>
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">R&D Deployment Status</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-light italic">
                        The ReefMaker™ platform is currently in closed beta. High-volume C-Brick™ deployment requires regional DFO/NOAA authorization. Our team assists with regulatory filing as part of the early access program.
                    </p>
                </div>
            </div>
        </div>
    );
}

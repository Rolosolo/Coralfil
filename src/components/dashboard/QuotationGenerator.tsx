"use client";

import React, { useState } from "react";
import { Download, DollarSign, FileText, Shield, Package, CheckCircle } from "lucide-react";
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
    projectId
}: {
    brickType: string;
    mixRatio: number;
    ionicStrength: number;
    uvFilterLevel: number;
    projectId: string;
}) {
    const [brickCount, setBrickCount] = useState(500);
    const [coralStickKg, setCoralStickKg] = useState(25);
    const [tier, setTier] = useState<'research' | 'pilot' | 'commercial'>('pilot');

    const calculateQuote = (): QuotationData => {
        // Pricing logic (simplified for prototype)
        const brickUnitPrice = tier === 'research' ? 45 : tier === 'pilot' ? 38 : 32;
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

    const handleExportQuote = () => {
        const quoteData = {
            ...quote,
            projectId,
            brickType,
            mixRatio,
            ionicStrength,
            uvFilterLevel,
            generatedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(quoteData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coralfill-quotation-${projectId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExportFactSheet = () => {
        const factSheet = regulatoryDocs.generateFactSheet(projectId, brickCount, coralStickKg);
        const markdown = regulatoryDocs.generateMarkdownFactSheet(factSheet);
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coralfill-regulatory-factsheet-${projectId}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[32px] border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                            <DollarSign size={20} className="text-primary" />
                            Project Quotation
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">Complete cost estimation</p>
                    </div>
                </div>

                {/* Tier Selection */}
                <div className="space-y-3">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Pricing Tier</div>
                    <div className="grid grid-cols-3 gap-3">
                        {(['research', 'pilot', 'commercial'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTier(t)}
                                className={`p-4 rounded-2xl border-2 transition-all ${tier === t
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                                    }`}
                            >
                                <div className="text-xs font-black uppercase tracking-widest">{t}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity Controls */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs text-slate-400">C-Brick Quantity</label>
                            <span className="text-xs font-mono text-white">{brickCount} units</span>
                        </div>
                        <input
                            type="range"
                            min="100"
                            max="5000"
                            step="100"
                            value={brickCount}
                            onChange={(e) => setBrickCount(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs text-slate-400">CoralStick™ Weight</label>
                            <span className="text-xs font-mono text-white">{coralStickKg} kg</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="200"
                            step="5"
                            value={coralStickKg}
                            onChange={(e) => setCoralStickKg(parseInt(e.target.value))}
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-secondary"
                        />
                    </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-[#02060c] rounded-2xl p-6 border border-white/5 space-y-3">
                    <div className="text-xs font-black text-primary uppercase tracking-widest">Cost Breakdown</div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-slate-300">
                            <span>C-Bricks ({brickCount} units)</span>
                            <span className="font-mono">${quote.breakdown.bricks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                            <span>CoralStick™ ({coralStickKg} kg)</span>
                            <span className="font-mono">${quote.breakdown.coralStick.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                            <span>Shipping & Handling</span>
                            <span className="font-mono">${quote.breakdown.shipping.toLocaleString()}</span>
                        </div>
                        {quote.breakdown.regulatory > 0 && (
                            <div className="flex justify-between text-slate-300">
                                <span>Regulatory Documentation</span>
                                <span className="font-mono">${quote.breakdown.regulatory.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="h-px bg-white/10 my-3"></div>
                        <div className="flex justify-between text-white font-black text-lg">
                            <span>Total Project Cost</span>
                            <span className="font-mono text-primary">${quote.totalCost.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={handleExportQuote}
                        className="bg-primary hover:bg-primary/90 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                    >
                        <Download size={18} />
                        <span className="text-xs">Export Quote</span>
                    </button>
                    <button
                        onClick={handleExportFactSheet}
                        className="bg-secondary hover:bg-secondary/90 text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-secondary/20"
                    >
                        <Shield size={18} />
                        <span className="text-xs">Fact Sheet</span>
                    </button>
                </div>
            </div>

            {/* Regulatory Info */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary" />
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Regulatory Compliance</h4>
                </div>
                <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>EPA Approved - Non-Hazardous Marine Material</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>NOAA Coral Reef Conservation Program Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>ICRI Best Practices Framework Certified</span>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                    The regulatory fact sheet includes material safety data, environmental certifications, compliance statements, and installation guidelines for your restoration team.
                </p>
            </div>
        </div>
    );
}

"use client";

import { Droplets, MapPin, Grid, Briefcase, TrendingUp, Verified, CheckCircle, Lock } from "lucide-react";

export function PDFPreview() {
    return (
        <div className="w-full max-w-[850px] bg-white shadow-xl my-10 mx-auto overflow-hidden rounded-sm text-slate-800 font-display">
            {/* Header Section */}
            <header className="p-10 border-b border-slate-100">
                <div className="flex justify-between items-start">
                    {/* Column 1: Logo */}
                    <div className="w-1/3">
                        <div className="flex items-center gap-2 text-slate-900">
                            <div className="relative flex items-center justify-center size-10 bg-gradient-to-br from-primary to-[#e55a5a] rounded-lg text-white shadow-lg shadow-primary/30">
                                <Droplets size={24} className="fill-current" />
                            </div>
                            <div>
                                <span className="font-heading font-bold text-xl tracking-tight text-slate-900">CoralFil</span>
                                <span className="block text-[10px] font-bold tracking-widest text-primary uppercase leading-none">Restoration</span>
                            </div>
                        </div>
                    </div>
                    {/* Column 2: Title */}
                    <div className="w-1/3 flex justify-center text-center pt-1">
                        <h1 className="font-heading font-bold text-2xl text-slate-900 tracking-tight leading-tight">RESTORATION<br /><span className="text-slate-400 font-normal text-lg font-display">PROPOSAL</span></h1>
                    </div>
                    {/* Column 3: Meta Data */}
                    <div className="w-1/3 flex flex-col items-end text-right">
                        <div className="mb-2">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Date Created</p>
                            <p className="text-sm font-medium text-slate-900">Feb 16, 2025</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Valid Until</p>
                            <p className="text-sm font-bold text-primary">Mar 18, 2025</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Section 1: Site Overview */}
            <section className="px-10 py-8 border-b border-slate-50">
                <div className="flex items-center gap-2 mb-4">
                    <MapPin className="text-primary" size={20} />
                    <h3 className="text-slate-900 font-heading font-bold text-sm uppercase tracking-wider">01. Site Overview</h3>
                </div>
                <div className="flex gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-1/3 relative overflow-hidden rounded-lg shadow-sm group">
                        <div
                            className="w-full h-full object-cover min-h-[120px] bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-h7s9D7VmRuffwUaJqgzUFhyF3LPYFZD8knjljh8rEcFa2kWWIJF-DHtFtol-0S8kXEhu4Fee-d0Vy_qNgMxrtG-NkEgSVsqP16SVpD7vCtC9NJ-6uY9DEHPzIIRHFsGrdZEqRykBhMtPB5EsYP6rTtbxlRLxAFRbC_7oOOSsdzko4GWDu6kqJZg-T0v6mi98EpJ6EMScgJ4zrCDy7D7msT8TvEKKpC5kFrr2lv8rGF8sla0x_ht4cUKe7xWey6K_FKNTE0Xe8UI')" }}
                        ></div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/80 to-transparent p-3">
                            <p className="text-white text-xs font-medium">Sat View</p>
                        </div>
                    </div>
                    <div className="w-2/3 grid grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Target Location</p>
                            <p className="font-semibold text-slate-900">Biscayne Bay, Florida</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Coordinates</p>
                            <p className="font-mono text-sm text-slate-700">25.5516° N, 80.1764° W</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Water Depth</p>
                            <p className="font-semibold text-slate-900">12 - 18 Meters</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Substrate Type</p>
                            <p className="font-semibold text-slate-900">Limestone / Sand Mix</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Deployment Specs */}
            <section className="px-10 py-8 border-b border-slate-50">
                <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="text-primary" size={20} />
                    <h3 className="text-slate-900 font-heading font-bold text-sm uppercase tracking-wider">02. Deployment Specs</h3>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-teal-50/50 rounded-lg border border-teal-100/50">
                            <div className="flex items-center gap-3">
                                <div className="bg-teal-500/10 p-2 rounded-md text-teal-700">
                                    <Grid size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Unit Volume</p>
                                    <p className="font-bold text-slate-900">847 C-Bricks™</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-teal-50/50 rounded-lg border border-teal-100/50">
                            <div className="flex items-center gap-3">
                                <div className="bg-teal-500/10 p-2 rounded-md text-teal-700">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Nutrition</p>
                                    <p className="font-bold text-slate-900">Bio-Active Release</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Target Species Mix</p>
                        <div className="space-y-3">
                            {[
                                { name: "Staghorn Coral", value: "45%", width: "45%", color: "bg-teal-500" },
                                { name: "Elkhorn Coral", value: "30%", width: "30%", color: "bg-teal-500/70" },
                                { name: "Brain Coral", value: "25%", width: "25%", color: "bg-teal-500/40" },
                            ].map((item) => (
                                <div key={item.name}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-600">{item.name}</span>
                                        <span className="font-semibold text-teal-700">{item.value}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Predicted Outcomes */}
            <section className="px-10 py-8 border-b border-slate-50 bg-slate-50/30">
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-primary" size={20} />
                    <h3 className="text-slate-900 font-heading font-bold text-sm uppercase tracking-wider">03. Predicted Outcomes (18 Months)</h3>
                </div>
                <div className="flex gap-6">
                    <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden h-[160px]">
                        <p className="text-xs text-slate-500 absolute top-4 left-4">Surface Area Growth (cm²)</p>
                        <div className="absolute bottom-0 left-0 w-full h-[120px]">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                                <defs>
                                    <linearGradient id="gradientGraph" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4"></stop>
                                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0 40 L0 35 Q10 34 20 30 Q40 20 60 15 Q80 10 100 5 L100 40 Z" fill="url(#gradientGraph)"></path>
                                <path d="M0 35 Q10 34 20 30 Q40 20 60 15 Q80 10 100 5" fill="none" stroke="#0f766e" strokeWidth="0.5"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col gap-3">
                        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold">Survival Rate</p>
                                <p className="text-lg font-bold text-slate-900">81-89%</p>
                            </div>
                            <Verified className="text-teal-500" size={24} />
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold">Biomass</p>
                                <p className="text-lg font-bold text-slate-900">+120%</p>
                            </div>
                            <TrendingUp className="text-primary" size={24} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Investment Breakdown */}
            <section className="px-10 pt-8 pb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="text-primary" size={20} />
                    <h3 className="text-slate-900 font-heading font-bold text-sm uppercase tracking-wider">04. Investment Breakdown</h3>
                </div>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 w-1/2">Description</th>
                                <th className="px-6 py-3 text-right">Qty</th>
                                <th className="px-6 py-3 text-right">Unit Price</th>
                                <th className="px-6 py-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {[
                                { desc: "Site Preparation & Survey", sub: "Includes 3D mapping and water quality baseline", qty: 1, price: "$4,500.00", total: "$4,500.00" },
                                { desc: "C-Bricks™ (Standard Unit)", sub: "Bio-active substrate units", qty: 847, price: "$18.00", total: "$15,246.00" },
                                { desc: "Deployment Labor", sub: "Dive team (3 days)", qty: "24 hrs", price: "$185.00", total: "$4,440.00" },
                                { desc: "6-Month Monitoring Plan", sub: "Monthly reports and sampling", qty: 1, price: "$4,198.00", total: "$4,198.00" },
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-3 font-medium text-slate-900">
                                        {row.desc}
                                        <span className="block text-xs font-normal text-slate-500">{row.sub}</span>
                                    </td>
                                    <td className="px-6 py-3 text-right text-slate-600">{row.qty}</td>
                                    <td className="px-6 py-3 text-right text-slate-600">{row.price}</td>
                                    <td className="px-6 py-3 text-right font-medium text-slate-900">{row.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-900 text-white">
                            <tr>
                                <td className="px-6 py-4 text-right font-medium uppercase tracking-wider text-xs opacity-80" colSpan={3}>Total Investment</td>
                                <td className="px-6 py-4 text-right font-bold text-lg text-primary">$28,384.00</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-slate-400 mb-2">CoralFil Inc. • 1200 Ocean Drive, Miami FL • Science-Backed Restoration</p>
                    <div className="flex items-center gap-2">
                        <Lock size={12} className="text-slate-300" />
                        <p className="text-[10px] text-slate-300">This document is confidential and proprietary.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

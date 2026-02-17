"use client";

import { Check, PauseCircle } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
    const steps = [
        { number: 1, label: "New Project", status: "completed", href: "/dashboard/project/new" },
        { number: 2, label: "Site Analysis", status: "active", href: "/dashboard/project/123/design" },
        { number: 3, label: "Species Target", status: "pending", href: "/dashboard/slider-demo" },
        { number: 4, label: "C-Brick Design", status: "pending", href: "/dashboard/project/123/design" },
        { number: 5, label: "Proposal", status: "pending", href: "/dashboard/quote" },
    ];

    return (
        <aside className="w-[260px] bg-[#02060c] border-r border-white/10 flex flex-col justify-between shrink-0 z-10 text-white h-full relative group/sidebar">
            {/* Background Glow Effect */}
            <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col pt-8 px-4 overflow-y-auto relative z-10">
                <div className="flex items-center justify-between mb-8 px-2">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Workflow</p>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                        <div className="w-1 h-1 rounded-full bg-primary/20"></div>
                        <div className="w-1 h-1 rounded-full bg-primary/10"></div>
                    </div>
                </div>

                <nav className="flex flex-col gap-1.5">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            <Link
                                href={step.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group border h-14 ${step.status === 'active'
                                    ? 'bg-primary/15 border-primary/40 shadow-[inset_0_0_20px_rgba(0,217,192,0.1)]'
                                    : step.status === 'completed'
                                        ? 'border-transparent hover:bg-white/5 opacity-80 hover:opacity-100'
                                        : 'border-transparent hover:bg-white/5 opacity-40 hover:opacity-100'
                                    }`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 scale-100 group-hover:scale-110 ${step.status === 'active'
                                    ? 'bg-primary text-black shadow-[0_0_25px_rgba(0,217,192,0.6)]' :
                                    step.status === 'completed'
                                        ? 'border border-primary/50 text-primary bg-primary/10' :
                                        'border border-white/10 bg-black/40 text-slate-500'
                                    }`}>
                                    {step.status === 'completed' ? (
                                        <Check size={16} strokeWidth={3} />
                                    ) : (
                                        <span className="text-xs font-black font-mono tracking-tighter">{step.number}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-xs font-bold uppercase tracking-widest leading-none ${step.status === 'active' ? 'text-white' :
                                        step.status === 'completed' ? 'text-slate-300' : 'text-slate-500'
                                        }`}>
                                        {step.label}
                                    </span>
                                    {step.status === 'active' && (
                                        <span className="text-[9px] text-primary/80 font-bold mt-1 animate-pulse">SYSTEM ONLINE</span>
                                    )}
                                </div>
                            </Link>

                            {index < steps.length - 1 && (
                                <div className="ml-[1.5rem] h-4 w-[1px] bg-gradient-to-b from-white/10 to-transparent my-0.5"></div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Sub-Metadata Area */}
                <div className="mt-12 px-2 py-6 border-t border-white/5 space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active Server</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-[10px] font-mono text-slate-300">REEFMASTER-NODE-01</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gradient-to-t from-primary/10 to-transparent border-t border-white/10">
                <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">Simulation Load</span>
                    <span className="text-[11px] font-mono text-white bg-black/40 px-2 py-0.5 rounded border border-white/5 shadow-inner">45.8%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden p-[1px] border border-white/5">
                    <div className="bg-gradient-to-r from-primary/80 to-primary h-full rounded-full shadow-[0_0_12px_rgba(0,217,192,0.8)] transition-all duration-1000 ease-out" style={{ width: "45.8%" }}></div>
                </div>
                <button className="mt-8 w-full flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-all hover:text-white hover:border-white/20 active:scale-[0.98]">
                    <PauseCircle size={16} />
                    Suspend Matrix
                </button>
            </div>
        </aside>
    );
}

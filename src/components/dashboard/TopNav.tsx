"use client";

import { Droplets, Bell, Settings, HelpCircle, User } from "lucide-react";
import { motion } from "@/components/motion-client";
import Link from "next/link";

interface TopNavProps {
    onHelpClick: () => void;
}

export function TopNav({ onHelpClick }: TopNavProps) {
    return (
        <header className="h-16 bg-[#010307] border-b border-white/5 flex items-center justify-between px-6 z-20 shrink-0 relative">
            {/* Left: Branding */}
            <div className="flex items-center gap-4 min-w-[240px]">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <img
                        src="/favicon.svg"
                        alt="CoralFil Logo"
                        className="w-10 h-10 group-hover:rotate-12 transition-transform duration-500"
                    />
                    <div className="flex flex-col justify-center gap-0.5">
                        <h1 className="text-white font-black text-[13px] leading-none tracking-tight">
                            REEFMAKER™ <span className="text-slate-600 font-light px-1">by</span> CoralFi<span className="logo-dotted-l">l</span>
                        </h1>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[8px] text-[#00D9C0] font-black tracking-[0.4em] uppercase">Intelligence Interface</span>
                            <div className="w-1 h-1 rounded-full bg-[#00D9C0]/40 animate-pulse"></div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Center: Environment Mode Selector (Premium Style) */}
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1 bg-white/[0.02] p-1 rounded-lg border border-white/5 shadow-inner">
                    <button
                        className="px-6 py-1.5 rounded-md bg-[#00D9C0] text-black font-black text-[9px] uppercase tracking-widest shadow-lg shadow-[#00D9C0]/20 transition-all"
                    >
                        Planning
                    </button>
                    <button
                        className="px-6 py-1.5 rounded-md text-slate-500 hover:text-slate-200 font-black text-[9px] uppercase tracking-widest transition-all"
                    >
                        Simulation
                    </button>
                </div>
            </div>

            {/* Right: Utilities */}
            <div className="flex items-center gap-6 min-w-[240px] justify-end">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onHelpClick}
                        className="text-slate-500 hover:text-white transition-all p-1 flex items-center gap-2 group"
                        title="Manual & Help"
                    >
                        <HelpCircle size={18} className="group-hover:text-[#00D9C0]" />
                        <span className="text-[9px] font-black uppercase tracking-widest hidden xl:inline">Help</span>
                    </button>

                    <div className="h-6 w-[1px] bg-white/10"></div>

                    <button className="relative text-slate-500 hover:text-white transition-all p-1 group">
                        <Bell size={18} />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FF6B6B] rounded-full border border-[#010307]"></span>
                    </button>

                    <button className="text-slate-500 hover:text-white transition-all p-1">
                        <Settings size={18} />
                    </button>

                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00D9C0]/50 transition-all cursor-pointer group overflow-hidden">
                        <User size={18} className="text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </header>
    );
}

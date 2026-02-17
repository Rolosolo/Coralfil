"use client";

import { Droplets, Edit2, Bell, Settings } from "lucide-react";

export function TopNav() {
    return (
        <header className="h-16 bg-[#02060c] border-b border-white/10 flex items-center justify-between px-6 z-20 shrink-0 relative">
            {/* Left: Branding */}
            <div className="flex items-center gap-4 min-w-[240px]">
                <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary-dark rounded-xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,217,192,0.3)] border border-primary/20 group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Droplets size={24} className="fill-current relative z-10" />
                </div>
                <div className="flex flex-col justify-center gap-0.5">
                    <h1 className="text-white font-black text-[13px] leading-none tracking-[-0.02em]">REEFMAKER™ <span className="text-primary">CORE</span></h1>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-primary/60 font-black tracking-[0.3em] uppercase">NEURAL HUD</span>
                        <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse"></div>
                        <span className="text-[8px] text-slate-500 font-mono">v4.2.0-SIM</span>
                    </div>
                </div>
            </div>

            {/* Center: Environment Mode Selector */}
            <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10 shadow-inner">
                    <button className="px-5 py-1.5 rounded-full bg-primary text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 transition-all">Planning</button>
                    <button className="px-5 py-1.5 rounded-full text-slate-500 hover:text-slate-300 font-black text-[10px] uppercase tracking-widest transition-all">Simulation</button>
                </div>
            </div>

            {/* Right: Project Context & Utilities */}
            <div className="flex items-center gap-6 min-w-[240px] justify-end">
                <div className="hidden xl:flex flex-col items-end gap-0.5">
                    <h2 className="text-slate-300 font-black text-[11px] uppercase tracking-widest">Great Barrier Reef</h2>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">Sector A // GBR-2024-X4</span>
                </div>

                <div className="h-8 w-[1px] bg-white/10"></div>

                <div className="flex items-center gap-4">
                    <button className="relative text-slate-400 hover:text-primary transition-all group p-1">
                        <Bell size={18} />
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-secondary rounded-full border border-[#02060c] shadow-[0_0_8px_rgb(255,107,107)] group-hover:scale-125 transition-transform"></span>
                    </button>
                    <button className="text-slate-400 hover:text-primary transition-all p-1">
                        <Settings size={18} />
                    </button>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-[1px] overflow-hidden border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
                        <img
                            alt="User Avatar"
                            className="w-full h-full object-cover rounded-[10px] opacity-80 group-hover:opacity-100 transition-opacity"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq42gVa6_vzTKzwwTRbZm_tRkLCWSoYZvC3BwAZlOWvHm6A0oMjkJJ6fktABdH6M3CS_JbVmit3JYz2DhfnyLg0SO2TiYX3qp5-i4EEeWR8KVx6364Ny0G7xJc2I-l_3knSp31B_A2XB37eSUrbY5WmmF5Tx8qnOhb9-zg9PUvx6gEaD4UYBXypLyXV7p0BAyv5j10RBWQQgPOaZ4OM3yJGgXEykEFj0_27lbdTyg7YMebz5lEAaGjCb7jdkis7Fo0gCDccGymSTo"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

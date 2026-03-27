"use client";

import { motion, AnimatePresence } from "@/components/motion-client";
import Link from "next/link";
import { Copy, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const triggerFaviconBurst = () => {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="glass-panel border-b border-white/5">
                <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={triggerFaviconBurst}
                    >
                        <div className="relative">
                            <motion.div
                                animate={isSpinning ? { 
                                    scale: [1, 1.4, 1],
                                    rotate: [0, 720],
                                    filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
                                } : {}}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <img
                                    src="/favicon.svg"
                                    alt="CoralFil Logo"
                                    className={`w-8 h-8 transition-all duration-500 ${isSpinning ? '' : 'group-hover:scale-110'}`}
                                />
                            </motion.div>
                            
                            {/* Bioluminescent Sonar Pulse */}
                            <AnimatePresence>
                                {isSpinning && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: [0, 0.4, 0], scale: [0.5, 3] }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute inset-0 bg-[#00D9C0] rounded-full blur-2xl"
                                    />
                                )}
                            </AnimatePresence>
                            
                            {/* Hover Breathing Glow */}
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
                        </div>
                        <span className="text-white text-2xl font-black tracking-tighter flex items-center">
                            Coralfi<span className="relative ml-0.5 text-primary brightness-150 drop-shadow-[0_0_8px_rgba(0,217,192,0.8)] logo-pellet-l">l</span>
                        </span>
                    </Link>

                    {/* Nav Links (Desktop) - Hidden for launch rollback */}
                    <nav className="hidden md:flex items-center gap-10">
                        <Link href="/#technology" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all duration-300">Technology</Link>
                        <Link href="/company" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all duration-300">Company</Link>
                        <Link href="/investors" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all duration-300">Investors</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="hidden sm:flex items-center justify-center px-6 h-10 rounded-full bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/10 transition-all duration-300">
                            Coralfil System
                        </Link>
                        <Link href="/dashboard/project/new" className="hidden lg:flex items-center justify-center px-6 h-10 rounded-full bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,217,192,0.3)]">
                            Initiate Project
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-panel border-b border-white/5 py-4 px-6 absolute w-full">
                    <nav className="flex flex-col gap-4">
                        <Link href="/#technology" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Technology</Link>
                        <Link href="/company" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Company</Link>
                        <Link href="/investors" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Investors</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

"use client";

import Link from "next/link";
import { Copy, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div className="glass-panel border-b border-white/5">
                <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center size-8 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                                <polygon points="9,1 16.5,5 16.5,13 9,17 1.5,13 1.5,5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                                <circle cx="9" cy="9" r="2.5" fill="currentColor" opacity="0.8" />
                            </svg>
                            <div className="absolute inset-0 rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors"></div>
                        </div>
                        <span className="text-white text-lg font-bold tracking-tight">CoralFil</span>
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/#technology" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Technology</Link>
                        <Link href="/company" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Company</Link>
                        <Link href="/investors" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Investors</Link>
                        <Link href="/#philanthropy" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Partners</Link>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="hidden sm:flex items-center justify-center h-9 px-4 rounded-full bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors">
                            Log In
                        </Link>
                        <Link href="/#philanthropy" className="flex items-center justify-center h-9 px-5 rounded-full bg-primary text-background-dark text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">
                            Donate
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
                        <Link href="/#philanthropy" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Partners</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

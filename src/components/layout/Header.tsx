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
                        <img
                            src="/favicon.svg"
                            alt="CoralFil Logo"
                            className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500"
                        />
                        <span className="text-white text-xl font-bold tracking-tight">
                            CoralFi<span className="logo-dotted-l">l</span>
                        </span>
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/#technology" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Technology</Link>
                        <Link href="/company" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Company</Link>
                        <Link href="/investors" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Investors</Link>
                    </nav>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="hidden sm:flex items-center justify-center h-9 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-all">
                            Log In
                        </Link>
                        <Link href="/dashboard" className="flex items-center justify-center h-9 px-5 rounded-lg bg-primary text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-primary/10">
                            View Demo
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

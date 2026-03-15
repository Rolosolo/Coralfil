"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Globe, ShieldCheck } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-navy pt-24 pb-12 border-t border-white/5 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary/5 blur-[120px] -z-10 rounded-full"></div>

            <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <img src="/favicon.svg" alt="CoralFil Logo" className="w-8 h-8 group-hover:rotate-[360deg] transition-transform duration-1000" />
                            </div>
                            <span className="text-white text-2xl font-black tracking-tighter">
                                Coralfi<span className="text-primary brightness-150 logo-pellet-l">l</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                            Restoring the ocean's foundation through high-fidelity cellular biopolymers and precision spatial intelligence. 
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all duration-300">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all duration-300">
                                <Github size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1: Technology */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Technology</h4>
                        <ul className="space-y-4">
                            <li><Link href="/#technology" className="text-sm text-slate-500 hover:text-primary transition-colors">C-Bricks™</Link></li>
                            <li><Link href="/#technology" className="text-sm text-slate-500 hover:text-primary transition-colors">CoralStick™</Link></li>
                            <li><Link href="/#technology" className="text-sm text-slate-500 hover:text-primary transition-colors">Spatial Atlas</Link></li>
                            <li><Link href="/#technology" className="text-sm text-slate-500 hover:text-primary transition-colors">Neural Stack</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2: Ecosystem */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Ecosystem</h4>
                        <ul className="space-y-4">
                            <li><Link href="/company" className="text-sm text-slate-500 hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/investors" className="text-sm text-slate-500 hover:text-primary transition-colors">Investors</Link></li>
                            <li><Link href="/dataroom" className="text-sm text-slate-500 hover:text-primary transition-colors">Data Room</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3: Legal (BC Canada) */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-slate-500 hover:text-primary transition-colors">Terms of Use</Link></li>
                            <li><Link href="/cookies" className="text-sm text-slate-500 hover:text-primary transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/#contact" className="text-sm text-slate-500 hover:text-primary transition-colors">PIPA Compliance</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter / Status */}
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-[0.25em]">System Status</h4>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Global Network Up</span>
                        </div>
                        <div className="flex items-start gap-2 pt-2">
                            <Mail size={14} className="text-slate-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-500">Contact our Privacy Officer at legal@coralfil.com</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
                            © 2026 CORALFIL RESTORATION TECHNOLOGIES INC.
                        </p>
                        <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded text-[8px] font-bold text-slate-500 uppercase tracking-widest">
                            <Globe size={10} /> HQ: NORTH COWICHAN, BC, CANADA
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={16} className="text-primary/40" />
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none">Compliant with PIPA (BC) and GDPR Pathways</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

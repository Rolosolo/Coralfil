"use client";

import { motion } from "@/components/motion-client";
import Link from "next/link";
import {
    Rocket,
    ChevronDown,
    ArrowRight,
    FlaskConical,
    Grid,
    Brain,
    CheckCircle,
    Activity,
    Zap,
    Shield
} from "lucide-react";

export default function HomeClient() {
    return (
        <div className="flex-grow bg-[#010307] relative overflow-x-hidden">
            {/* ------------------------------- */}
            {/* 1. HERO SECTION                 */}
            {/* ------------------------------- */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#010307]">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1.05, opacity: 0.4 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        alt="Deep sea coral environment"
                        className="w-full h-full object-cover mix-blend-luminosity brightness-75 animate-float"
                        style={{ animationDuration: '30s' }}
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCovIh_7Q6DF2l3xdQQ7w51SV46VEOqVydGiNH2GzC4gXgVCySb2acCYrjvKzk0U5GoL4FknBlIbP-bJ1BmMxXIjfW_UgFqgMQEMgHepX0kIzft4X8gNBqlLq-te7h5XlIpKY_6dQnAuWE4J_vuyqD5qDZCpBro6ti2D4QI-h-duNILkpyubD3swqeaUJsQ4cxtOG0Ou89gkuzl6NBs2dR76piTudHvED9D2TQT7FXOo2rFXifuXvW1AXQIpeIjTivZUOWNj2nIqdU"
                    />

                    {/* Dynamic Particles (Bioluminescence) */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-[#00D9C0] blur-[1px]"
                                initial={{
                                    x: (Math.random() * 100) + "%",
                                    y: (Math.random() * 100) + "%",
                                    opacity: 0
                                }}
                                animate={{
                                    y: ["0px", "-40px", "-20px"],
                                    opacity: [0, 0.4, 0],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 8 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: Math.random() * 10
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,3,7,0.9)_100%)]"></div>

                    {/* Bio Streaks */}
                    <div className="absolute top-1/3 -left-1/4 w-[150%] h-[2px] rotate-6 bg-gradient-to-r from-transparent via-[#00D9C0]/10 to-transparent blur-3xl opacity-30"></div>
                    <div className="absolute bottom-1/4 -right-1/4 w-[150%] h-[2px] -rotate-3 bg-gradient-to-r from-transparent via-[#00D9C0]/5 to-transparent blur-3xl opacity-20"></div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010307]/50 to-[#010307]"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl px-6">
                    {/* Removed 'The Intelligence of Marine Restoration' badge per user request */}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-10 text-white"
                    >
                        Restoring Reefs at the<br />
                        <span className="text-glow-gradient">Speed of Nature.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ duration: 1.5, delay: 0.6 }}
                        className="text-lg md:text-2xl text-gray-300 font-light mb-16 max-w-3xl mx-auto leading-relaxed"
                    >
                        A mystical synthesis of marine biology and machine intelligence. Engineering resilience for Pacific Glass Sponges and Caribbean Reefs.
                    </motion.p>

                    <div className="flex flex-col items-center gap-8 relative mt-12">
                        {/* Central button removed per user request. Using the floating intelligence demo as the primary entry point. */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, type: "spring" }}
                        >
                            <Link href="/dashboard" className="flex items-center gap-4 py-4 px-10 rounded-xl border border-[#00D9C0]/30 bg-[#00D9C0]/5 backdrop-blur-md hover:bg-[#00D9C0]/10 transition-all group shadow-[0_0_50px_rgba(0,217,192,0.1)]">
                                <span className="text-sm font-black uppercase tracking-[0.3em] text-[#00D9C0]">Access Intelligence Demo</span>
                                <ArrowRight size={20} className="text-[#00D9C0] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 flex flex-col items-center gap-3 opacity-30"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white">Descent</span>
                    <ChevronDown className="w-6 h-6 text-white" />
                </motion.div>
            </section>

            {/* ------------------------------- */}
            {/* 2. PRODUCT SHOWCASE             */}
            {/* ------------------------------- */}
            <section className="py-40 bg-[#010307]" id="technology">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-[#00D9C0] font-bold tracking-[0.4em] text-xs uppercase mb-6 block">Structural Biometrics</span>
                            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-10 leading-[0.95]">
                                The Intelligent<br />
                                <span className="text-[#00D9C0]">Neural Stack.</span>
                            </h2>
                            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12 max-w-xl">
                                From site-specific telemetry to precision biotechnology. We are building the first end-to-end autonomous marine restoration ecosystem.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Activity className="text-[#00D9C0] size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Capillary Nutrient Channels</h4>
                                        <p className="text-xs text-gray-500">Embedded paths for localized probiotics and essential minerals.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-white">
                                    <div className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                        <Shield className="text-[#00D9C0] size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Industrial Thermal Mass</h4>
                                        <p className="text-xs text-gray-500">Buffer against ocean temperature spikes for sensitive larvae.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="relative aspect-square"
                        >
                            <div className="absolute inset-0 bg-[#00D9C0]/5 blur-[120px] rounded-full animate-pulse-slow"></div>
                            {/* Updated to focus on the 'Inspiration' aesthetic per user request */}
                            <img
                                src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=1200"
                                alt="Marine Bio-Engineering Inspiration"
                                className="w-full h-full object-cover rounded-2xl grayscale brightness-125 hover:grayscale-0 transition-all duration-1000 shadow-[0_0_80px_rgba(0,217,192,0.15)] relative z-10"
                            />
                            <div className="absolute -bottom-8 -left-8 glass-card p-6 pr-12 z-20 border-[#00D9C0]/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="size-2 rounded-full bg-[#00D9C0] animate-glow"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00D9C0]">State of the Art Synthesis</span>
                                </div>
                                <div className="text-2xl font-mono text-white">REVOLUTION-v02</div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Card 1: CoralStick */}
                        <div className="glass-card p-10 group hover:border-[#FF6B6B]/30 transition-all duration-700">
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                                <FlaskConical className="text-[#FF6B6B] w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">CoralStick™</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                Smart nutrient pellets using electro-static binding. Delivers 70-85% nutrient retention vs. industry standard &lt;10%.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#FF6B6B]">
                                    <CheckCircle size={12} />
                                    Disease Resistance
                                </li>
                                <li className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#FF6B6B]">
                                    <CheckCircle size={12} />
                                    Thermal Tolerance
                                </li>
                            </ul>
                        </div>

                        {/* Card 2: ReefMaker AI */}
                        <div className="glass-card p-10 lg:scale-105 bg-white/[0.02] border-[#00D9C0]/30 group hover:border-[#00D9C0]/60 transition-all duration-700 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Brain size={120} className="text-[#00D9C0]" />
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-[#00D9C0] flex items-center justify-center mb-8 shadow-lg shadow-[#00D9C0]/20 relative z-10">
                                <Brain className="text-black w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight relative z-10">ReefMaker™ AI</h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light relative z-10">
                                Biomimicry design SaaS platform. 94% species identification accuracy using datasets of 250k+ images and site telemetry.
                            </p>
                            <div className="space-y-3 mb-8 relative z-10">
                                <div className="text-[10px] font-mono text-[#00D9C0]/60 uppercase tracking-widest bg-white/5 p-2 rounded border border-white/5">
                                    &lt; 60 Seconds to Optimization
                                </div>
                            </div>
                            <Link href="/dashboard" className="text-[#00D9C0] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all relative z-10">
                                Initialize AI Search
                                <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Card 3: Probiotics */}
                        <div className="glass-card p-10 group hover:border-primary/30 transition-all duration-700">
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                                <Grid className="text-primary w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">Precision Probiotics</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                Targeted microbiome formulations that trigger 3-5x faster recovery and accelerated biodiversity cascade.
                            </p>
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Resulting Velocity</div>
                                <div className="text-xl font-mono text-white">82% SURVIVAL RATE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ------------------------------- */}
            {/* 3. INVESTOR CTA                 */}
            {/* ------------------------------- */}
            <section className="py-40 bg-[#010307] border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,217,192,0.03)_0%,transparent_60%)]"></div>
                <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8">Scaling the Blue Economy.</h2>
                    <p className="text-xl text-gray-500 font-light mb-16 max-w-2xl mx-auto">
                        CoralFil is currently in active R&D phase, developing the foundational intelligence layer for global marine restoration.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/investors" className="btn-premium bg-white text-black px-10 py-5 rounded-lg font-black uppercase tracking-widest text-sm">
                            Investor Relations
                        </Link>
                        <Link href="/company" className="text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                            Meet the Team
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

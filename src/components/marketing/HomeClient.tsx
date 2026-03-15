"use client";

import { motion, AnimatePresence } from "@/components/motion-client";
import Link from "next/link";
import { useState } from "react";
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
    Shield,
    Info
} from "lucide-react";

interface Creature {
    id: string;
    name: string;
    description: string;
    importance: string;
    x: string;
    y: string;
    icon: string;
}

const REEF_CREATURES: Creature[] = [
    {
        id: "parrotfish",
        name: "Parrotfish",
        description: "Vibrant grazers with beak-like teeth.",
        importance: "The janitors of the reef. They consume algae that would otherwise smother corals and excrete fine white sand.",
        x: "20%",
        y: "65%",
        icon: "🐠"
    },
    {
        id: "clownfish",
        name: "Clownfish",
        description: "Small, colorful fish living in anemones.",
        importance: "Indicators of healthy symbiotic relationships. They protect anemones from predators while receiving shelter in return.",
        x: "75%",
        y: "70%",
        icon: "🐡"
    },
    {
        id: "giant-clam",
        name: "Giant Clam",
        description: "The largest living bivalve mollusks.",
        importance: "Massive water filters. A single clam can filter hundreds of liters of water per day, maintaining clarity for photosynthesizing corals.",
        x: "45%",
        y: "85%",
        icon: "🐚"
    }
];

export default function HomeClient() {
    const [hoveredCreature, setHoveredCreature] = useState<string | null>(null);
    const [activeCreature, setActiveCreature] = useState<string | null>(null);

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

                <div className="relative z-10 text-center max-w-5xl px-6 mt-32">
                    {/* Removed 'The Intelligence of Marine Restoration' badge per user request */}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-10 text-white"
                    >
                        Scaling Resilience for<br />
                        <span className="text-glow-gradient">Infinite Oceans.</span>
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
                        {/* 
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
                        */}
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
            {/* 2. THE PROBLEM & SOLUTION       */}
            {/* ------------------------------- */}
            <section className="py-32 bg-[#02060c] relative border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* The Problem */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">The Crisis</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                Marine Foundations <br />
                                <span className="text-slate-600">Are Collapsing.</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-light leading-relaxed">
                                Traditional restoration methods are failing against rising thermal stress. Without site-specific intelligence and structural nourishment, <span className="text-white font-bold">90% of restored corals perish</span> within the first 12 months.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="text-3xl font-black text-red-500">70%</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black mt-1">Reef Loss Globally</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="text-3xl font-black text-red-500">&lt;10%</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-black mt-1">Nutrient Retention</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Our Solution */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-primary/5 p-12 rounded-[48px] border border-primary/20 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
                            
                            <div className="space-y-8 relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Our Solution</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                    The High-Fidelity <br />
                                    <span className="text-primary brightness-125">Neural Stack.</span>
                                </h2>
                                <p className="text-xl text-slate-400 font-light leading-relaxed">
                                    We bridge the gap between AI and Biology. By synthesizing high-resolution spatial data with biomimetic substrates, we create a resilient foundation that outpaces environmental decay.
                                </p>
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,217,192,0.4)]">
                                            <Zap size={24} className="text-black" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black uppercase text-sm tracking-tight">8x Survival Velocity</h4>
                                            <p className="text-xs text-slate-500">Accelerated growth through ionic nutrient delivery systems.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                            <Brain size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-black uppercase text-sm tracking-tight">Autonomous Restoration</h4>
                                            <p className="text-xs text-slate-500">AI-driven site analysis powered by the Allen Coral Atlas.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ------------------------------- */}
            {/* 3. PRODUCT SHOWCASE             */}
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
                            {/* 
                            <Link href="/dashboard" className="text-[#00D9C0] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all relative z-10">
                                Initialize AI Search
                                <ArrowRight size={14} />
                            </Link>
                            */}
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

            {/* ------------------------------- */}
            {/* 4. CONTACT / ENGAGEMENT         */}
            {/* ------------------------------- */}
            <section className="py-32 bg-[#010307] border-t border-white/5" id="contact">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Connect</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
                        Engage the <br />
                        <span className="text-primary brightness-125">Restoration Network.</span>
                    </h2>
                    <p className="text-xl text-slate-400 font-light mb-12">
                        Whether you are a maritime regulator, a potential partner, or a steward of the sea, our network is open for integration.
                    </p>
                    <a href="mailto:info@coralfil.com" className="inline-flex items-center gap-4 px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-2xl transition-all group">
                        <span className="text-lg font-bold">Initiate Connection</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-primary" />
                    </a>
                </div>
            </section>

            {/* 5. SEA FLOOR VISUALIZATION        */}
            {/* ------------------------------- */}
            <section className="relative h-screen w-full overflow-hidden bg-[#010307]">
                <div className="absolute inset-0">
                    <motion.img
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 0.6, y: 0 }}
                        viewport={{ once: false, margin: "-20%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        alt="Sea floor coral colony visualization"
                        className="w-full h-full object-cover mix-blend-screen brightness-50"
                        src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#010307] via-transparent to-[#010307]"></div>

                    {/* Bioluminescent Drifting Plankton */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-[#00D9C0]"
                                initial={{
                                    x: (Math.random() * 100) + "%",
                                    y: (Math.random() * 100) + "%",
                                    opacity: 0
                                }}
                                animate={{
                                    x: ["0%", (Math.random() * 10 - 5) + "%", "0%"],
                                    y: ["0%", "-100px", "-200px"],
                                    opacity: [0, 0.4, 0],
                                    scale: [1, 2, 1]
                                }}
                                transition={{
                                    duration: 15 + Math.random() * 15,
                                    repeat: Infinity,
                                    delay: Math.random() * 10
                                }}
                                style={{
                                    boxShadow: '0 0 10px #00D9C0, 0 0 20px #00D9C0'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Interactive Reef Creatures */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {REEF_CREATURES.map((creature) => (
                        <div
                            key={creature.id}
                            className="absolute pointer-events-auto"
                            style={{ left: creature.x, top: creature.y }}
                            onMouseEnter={() => setHoveredCreature(creature.id)}
                            onMouseLeave={() => setHoveredCreature(null)}
                            onClick={() => setActiveCreature(activeCreature === creature.id ? null : creature.id)}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative cursor-pointer group"
                            >
                                {/* Glowing orb behind icon */}
                                <div className={`absolute inset-0 bg-primary/20 blur-xl rounded-full transition-opacity duration-300 ${hoveredCreature === creature.id || activeCreature === creature.id ? 'opacity-100 scale-150' : 'opacity-0'}`} />
                                
                                <span className={`text-4xl drop-shadow-[0_0_15px_rgba(0,217,192,0.8)] filter transition-all duration-300 ${hoveredCreature === creature.id || activeCreature === creature.id ? 'brightness-125 scale-110' : 'brightness-75'}`}>
                                    {creature.icon}
                                </span>

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {(hoveredCreature === creature.id || activeCreature === creature.id) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="absolute top-12 left-1/2 -translate-x-1/2 w-64 glass-panel p-4 rounded-xl border border-primary/20 z-50 pointer-events-none"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Info size={14} className="text-primary" />
                                                <h4 className="text-white text-sm font-bold uppercase tracking-wider">{creature.name}</h4>
                                            </div>
                                            <p className="text-xs text-slate-300 mb-2">{creature.description}</p>
                                            <div className="bg-primary/5 p-2 rounded border border-primary/10">
                                                <span className="text-[9px] text-primary uppercase font-bold tracking-widest block mb-1">Ecosystem Role</span>
                                                <p className="text-[10px] text-slate-400 leading-relaxed">{creature.importance}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="relative z-30 h-full flex items-center justify-center container mx-auto px-6 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl"
                    >
                        <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-white mb-8">
                            A Living <span className="text-[#00D9C0] drop-shadow-[0_0_30px_rgba(0,217,192,0.8)]">Legacy.</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                            The ocean floors are the silent architects of our survival. We are giving them back their voice.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

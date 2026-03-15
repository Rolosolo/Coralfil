"use client";

import { motion, AnimatePresence } from "@/components/motion-client";
import Link from "next/link";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
    Info,
    Heart,
    AlertTriangle,
    Droplets,
    Fish
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   REEF ASSOCIATION LIBRARY
   Marine creatures & their coral health relationships
   ═══════════════════════════════════════════════════════ */

interface ReefAssociation {
    id: string;
    name: string;
    type: "positive" | "negative" | "neutral";
    description: string;
    coralRelationship: string;
    icon: string;
}

const REEF_ASSOCIATION_LIBRARY: ReefAssociation[] = [
    // POSITIVE
    {
        id: "parrotfish",
        name: "Parrotfish",
        type: "positive",
        description: "Vibrant grazers with beak-like teeth that chomp algae off corals.",
        coralRelationship: "The janitors of the reef. They consume smothering algae and excrete fine white sand, building beaches and clearing space for coral recruits.",
        icon: "🐠"
    },
    {
        id: "clownfish",
        name: "Clownfish",
        type: "positive",
        description: "Small, colorful fish living symbiotically with anemones.",
        coralRelationship: "Indicators of healthy reef symbioses. Their waste fertilizes host anemones, boosting reef productivity and attracting biodiversity.",
        icon: "🐡"
    },
    {
        id: "giant-clam",
        name: "Giant Clam",
        type: "positive",
        description: "The largest living bivalve mollusks, reaching over 1 meter.",
        coralRelationship: "Massive water filters. A single clam filters hundreds of liters daily, maintaining clarity for coral photosynthesis and recycling nutrients.",
        icon: "🐚"
    },
    {
        id: "sea-cucumber",
        name: "Sea Cucumber",
        type: "positive",
        description: "Bottom-dwelling echinoderms that process sediment.",
        coralRelationship: "The vacuum cleaners of the reef. They consume and break down detritus, recycling nutrients back into the ecosystem and preventing harmful sediment buildup on corals.",
        icon: "🫒"
    },
    {
        id: "cleaner-wrasse",
        name: "Cleaner Wrasse",
        type: "positive",
        description: "Small fish that remove parasites from larger reef fish.",
        coralRelationship: "By keeping reef fish healthy, they maintain the herbivore populations that prevent algae from overgrowing corals. Reefs without cleaners lose fish diversity rapidly.",
        icon: "🐟"
    },
    {
        id: "sea-urchin",
        name: "Sea Urchin",
        type: "positive",
        description: "Spiny herbivores crucial to reef algae control.",
        coralRelationship: "Diadema urchins are keystone grazers. Caribbean reefs collapsed after the 1983 urchin die-off, proving their critical role in controlling algae and enabling coral settlement.",
        icon: "🟤"
    },
    {
        id: "manta-ray",
        name: "Manta Ray",
        type: "positive",
        description: "Gentle giants that filter plankton near reef walls.",
        coralRelationship: "Their feeding redistributes nutrients from open water to reef zones. Manta cleaning stations attract ecotourism revenue that funds reef conservation.",
        icon: "🦈"
    },
    {
        id: "hawksbill-turtle",
        name: "Hawksbill Turtle",
        type: "positive",
        description: "Critically endangered turtles that feed on sponges.",
        coralRelationship: "By eating fast-growing sponges that compete with corals for space, hawksbills maintain coral dominance on reefs. One turtle can eat 500kg of sponge yearly.",
        icon: "🐢"
    },
    {
        id: "snapping-shrimp",
        name: "Snapping Shrimp",
        type: "positive",
        description: "Tiny crustaceans that produce loud snapping sounds.",
        coralRelationship: "Their constant 'snapping' creates a healthy reef soundscape that guides coral larvae to settle. Silent, degraded reefs fail to recruit new corals.",
        icon: "🦐"
    },
    {
        id: "whale-shark",
        name: "Whale Shark",
        type: "positive",
        description: "The world's largest fish, gentle filter-feeders.",
        coralRelationship: "These massive visitors cycle nutrients between deep and shallow waters. Their presence indicates a productive reef ecosystem capable of supporting apex species.",
        icon: "🐋"
    },
    {
        id: "octopus",
        name: "Reef Octopus",
        type: "positive",
        description: "Highly intelligent predators of reef crabs and mollusks.",
        coralRelationship: "Control populations of coral-eating invertebrates. Their predation keeps destructive grazers in check, indirectly shielding living coral tissue from damage.",
        icon: "🐙"
    },
    {
        id: "grouper",
        name: "Nassau Grouper",
        type: "positive",
        description: "Apex predators critical to reef food webs.",
        coralRelationship: "Top-down predator control prevents herbivore depletion. Healthy grouper populations ensure balanced grazer numbers that maintain coral-friendly conditions.",
        icon: "🐠"
    },
    {
        id: "christmas-tree-worm",
        name: "Christmas Tree Worm",
        type: "positive",
        description: "Colorful spiraling worms embedded in coral heads.",
        coralRelationship: "They bore into coral skeletons but actually strengthen the immune response. Their tunneling promotes localized calcification and increased reef structural complexity.",
        icon: "🎄"
    },
    // NEGATIVE (fewer, as requested — "mostly positive")
    {
        id: "crown-of-thorns",
        name: "Crown of Thorns Starfish",
        type: "negative",
        description: "Coral-eating starfish that can devastate reefs in outbreaks.",
        coralRelationship: "⚠️ A single starfish consumes ~10m² of coral per year. Outbreaks linked to nutrient pollution can strip a reef in months. Natural predators like triton snails are key.",
        icon: "⭐"
    },
    {
        id: "drupella-snail",
        name: "Drupella Snail",
        type: "negative",
        description: "Corallivorous snails that feed directly on coral tissue.",
        coralRelationship: "⚠️ Aggregations can kill entire Acropora colonies. Monitoring Drupella populations is an early warning indicator of imbalanced reef ecosystems.",
        icon: "🐌"
    },
];

/* ═══════════════════════════════════════════════════════
   CORALSTICK ANIMATION COMPONENT (Canvas-based)
   Shows pellet falling from boat → ionic attraction → coral healing
   ═══════════════════════════════════════════════════════ */

function CoralStickAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const frameRef = useRef(0);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const W = canvas.width;
        const H = canvas.height;
        const frame = frameRef.current;
        const totalFrames = 300;

        ctx.clearRect(0, 0, W, H);

        // BG gradient (deep ocean)
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, "#041525");
        bg.addColorStop(0.3, "#061e30");
        bg.addColorStop(1, "#020a14");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Water surface shimmer
        ctx.strokeStyle = "rgba(0,217,192,0.15)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            for (let x = 0; x < W; x += 4) {
                const y = 30 + i * 6 + Math.sin((x + frame * 2) * 0.02) * 3;
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Boat (simple silhouette at top)
        const boatX = W * 0.35 + Math.sin(frame * 0.02) * 8;
        const boatY = 18;
        ctx.fillStyle = "#1a3a4a";
        ctx.beginPath();
        ctx.moveTo(boatX - 35, boatY);
        ctx.lineTo(boatX + 35, boatY);
        ctx.lineTo(boatX + 25, boatY + 12);
        ctx.lineTo(boatX - 25, boatY + 12);
        ctx.closePath();
        ctx.fill();
        // Mast
        ctx.strokeStyle = "#2a5a6a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(boatX, boatY);
        ctx.lineTo(boatX, boatY - 14);
        ctx.stroke();

        // Pellet fall phase (frames 0–100)
        const pelletPhase = Math.min(frame / 100, 1);
        // Attraction phase (frames 100–180)
        const attractPhase = Math.max(0, Math.min((frame - 100) / 80, 1));
        // Healing phase (frames 180–300)
        const healPhase = Math.max(0, Math.min((frame - 180) / 120, 1));

        // Coral colony (bottom center-right)
        const coralX = W * 0.65;
        const coralBaseY = H - 30;

        // Draw coral — health varies with healPhase
        const coralHealth = healPhase; // 0 = bleached, 1 = vibrant
        const drawBranch = (x: number, y: number, angle: number, len: number, depth: number) => {
            if (depth <= 0 || len < 3) return;
            const endX = x + Math.cos(angle) * len;
            const endY = y + Math.sin(angle) * len;

            // Color interpolation: white(bleached) → vibrant coral
            const r = Math.floor(255 - coralHealth * 105);
            const g = Math.floor(240 - coralHealth * 140);
            const b = Math.floor(235 - coralHealth * 35);
            ctx.strokeStyle = `rgb(${r},${g},${b})`;
            ctx.lineWidth = depth * 1.5;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Glow when healing
            if (coralHealth > 0.3) {
                ctx.shadowColor = `rgba(255,${100 + coralHealth * 100},${80 + coralHealth * 100},${coralHealth * 0.4})`;
                ctx.shadowBlur = coralHealth * 8;
            }

            drawBranch(endX, endY, angle - 0.4 + Math.sin(frame * 0.01) * 0.05, len * 0.72, depth - 1);
            drawBranch(endX, endY, angle + 0.5 + Math.cos(frame * 0.01) * 0.05, len * 0.68, depth - 1);
            ctx.shadowBlur = 0;
        };

        // Draw multiple coral branches
        drawBranch(coralX - 20, coralBaseY, -Math.PI / 2 - 0.3, 28, 5);
        drawBranch(coralX, coralBaseY, -Math.PI / 2, 35, 6);
        drawBranch(coralX + 22, coralBaseY, -Math.PI / 2 + 0.25, 25, 5);

        // Seafloor
        ctx.fillStyle = "#0a1a25";
        ctx.fillRect(0, coralBaseY + 5, W, H - coralBaseY);
        // Sandy texture
        for (let i = 0; i < 40; i++) {
            ctx.fillStyle = `rgba(100,120,110,${0.05 + Math.random() * 0.1})`;
            ctx.fillRect(Math.random() * W, coralBaseY + 5 + Math.random() * 20, 2 + Math.random() * 4, 1);
        }

        // Pellet
        const pelletStartY = boatY + 20;
        const pelletTargetX = coralX;
        const pelletTargetY = coralBaseY - 45;

        let pelletX: number, pelletY: number;

        if (attractPhase < 1) {
            // Falling phase — gentle curve toward coral
            const fallProgress = pelletPhase;
            const startX = boatX;
            pelletX = startX + (pelletTargetX - startX) * attractPhase * 0.8;
            pelletY = pelletStartY + (pelletTargetY - pelletStartY) * fallProgress;

            if (attractPhase > 0) {
                // Ionic attraction curves
                pelletX = startX + (pelletTargetX - startX) * attractPhase;
                pelletY = pelletStartY + (pelletTargetY - pelletStartY) * (pelletPhase * 0.6 + attractPhase * 0.4);

                // Ionic field lines
                for (let i = 0; i < 6; i++) {
                    const lineAngle = (i / 6) * Math.PI * 2 + frame * 0.03;
                    const lineLen = 15 + attractPhase * 25;
                    ctx.strokeStyle = `rgba(0,217,192,${0.1 + attractPhase * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.setLineDash([3, 4]);
                    ctx.beginPath();
                    ctx.moveTo(pelletX, pelletY);
                    ctx.lineTo(
                        pelletX + Math.cos(lineAngle) * lineLen,
                        pelletY + Math.sin(lineAngle) * lineLen
                    );
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }

            // Draw pellet
            const pelletSize = 5;
            const pelletGrad = ctx.createRadialGradient(pelletX, pelletY, 0, pelletX, pelletY, pelletSize * 2);
            pelletGrad.addColorStop(0, "#FF8866");
            pelletGrad.addColorStop(0.5, "#CC5544");
            pelletGrad.addColorStop(1, "rgba(200,80,60,0)");
            ctx.fillStyle = pelletGrad;
            ctx.beginPath();
            ctx.arc(pelletX, pelletY, pelletSize, 0, Math.PI * 2);
            ctx.fill();

            // Core glow
            ctx.fillStyle = "#FFaa88";
            ctx.beginPath();
            ctx.arc(pelletX, pelletY, 2, 0, Math.PI * 2);
            ctx.fill();

            // Trail bubbles
            if (pelletPhase > 0.1) {
                for (let i = 0; i < 3; i++) {
                    const trailY = pelletY - 10 - i * 8 - Math.random() * 5;
                    ctx.fillStyle = `rgba(255,255,255,${0.1 - i * 0.03})`;
                    ctx.beginPath();
                    ctx.arc(pelletX + (Math.random() - 0.5) * 6, trailY, 1 + Math.random(), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        // Healing particles emanating from coral
        if (healPhase > 0) {
            for (let i = 0; i < Math.floor(healPhase * 12); i++) {
                const px = coralX + (Math.random() - 0.5) * 50;
                const py = coralBaseY - 20 - Math.random() * 50;
                const size = 1 + Math.random() * 2;
                ctx.fillStyle = `rgba(0,217,192,${healPhase * 0.3 * Math.random()})`;
                ctx.beginPath();
                ctx.arc(px, py + Math.sin(frame * 0.05 + i) * 5, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Status text
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        if (frame < 60) {
            ctx.fillStyle = `rgba(255,255,255,${Math.min(frame / 30, 1) * 0.6})`;
            ctx.fillText("DEPLOYMENT", W / 2, H - 8);
        } else if (frame < 140) {
            ctx.fillStyle = `rgba(0,217,192,${0.7})`;
            ctx.fillText("⚡ IONIC ATTRACTION", W / 2, H - 8);
        } else if (frame < 220) {
            ctx.fillStyle = `rgba(0,217,192,${0.7})`;
            ctx.fillText("NUTRIENT TRANSFER", W / 2, H - 8);
        } else {
            ctx.fillStyle = `rgba(150,255,200,${0.8})`;
            ctx.fillText("✓ CORAL RECOVERY", W / 2, H - 8);
        }

        frameRef.current++;

        if (frameRef.current < totalFrames) {
            animRef.current = requestAnimationFrame(draw);
        } else {
            setIsPlaying(false);
            setHasPlayed(true);
        }
    }, []);

    const startAnimation = useCallback(() => {
        if (isPlaying) return;
        frameRef.current = 0;
        setIsPlaying(true);
        setHasPlayed(false);
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
    }, [isPlaying, draw]);

    // Auto-play on first mount
    useEffect(() => {
        const timer = setTimeout(() => {
            startAnimation();
        }, 800);
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(animRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                width={360}
                height={260}
                className="w-full rounded-2xl border border-white/10 cursor-pointer hover:border-[#00D9C0]/30 transition-colors"
                onClick={startAnimation}
            />
            {!isPlaying && hasPlayed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl cursor-pointer" onClick={startAnimation}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#00D9C0] bg-black/60 px-4 py-2 rounded-full border border-[#00D9C0]/30">
                        ▶ Replay
                    </div>
                </div>
            )}
            {!isPlaying && !hasPlayed && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 animate-pulse">
                        Loading...
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN HOME CLIENT COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function HomeClient() {
    const [hoveredCreature, setHoveredCreature] = useState<string | null>(null);
    const [activeCreature, setActiveCreature] = useState<string | null>(null);

    // Randomly select 3 reef associations on each page load
    const displayedAssociations = useMemo(() => {
        const shuffled = [...REEF_ASSOCIATION_LIBRARY].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, []);

    // Position the 3 randomly selected creatures — all aligned at similar Y
    const creaturePositions = [
        { x: "18%", y: "55%" },
        { x: "48%", y: "58%" },
        { x: "78%", y: "53%" },
    ];

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

            {/* ═══════════════════════════════════════════ */}
            {/* 3. PRODUCT SHOWCASE — STYLIZED TEXT BOXES  */}
            {/* ═══════════════════════════════════════════ */}
            <section className="py-40 bg-[#010307]" id="technology">
                <div className="container mx-auto px-6 max-w-7xl">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <span className="text-[#00D9C0] font-bold tracking-[0.4em] text-xs uppercase mb-6 block">Our Technology</span>
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.95]">
                            The Intelligent<br />
                            <span className="text-[#00D9C0]">Neural Stack.</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                            From site-specific telemetry to precision biotechnology. We are building the first end-to-end autonomous marine restoration ecosystem.
                        </p>
                    </motion.div>

                    {/* ─── CoralStick™ Product Section ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-32"
                    >
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* LEFT — Cross-section image + Specs */}
                            <div className="space-y-6">
                                <div className="p-8 rounded-3xl border border-[#FF6B6B]/20 bg-gradient-to-br from-[#FF6B6B]/5 to-transparent">
                                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                                        CoralStick<span className="text-[#FF6B6B]">™</span>
                                    </h3>
                                    <p className="text-sm text-[#FF6B6B] font-bold uppercase tracking-widest mb-4">Multi-Layered Slow-Decay Nutrient Pellet</p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        Smart nutrient pellets using electro-static ionic binding. Delivers <span className="text-white font-bold">70–85% nutrient retention</span> vs. industry standard &lt;10%. Each pellet contains a precision-engineered stack of biodegradable layers that release over 14–60 days.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="text-[9px] text-[#FF6B6B] font-bold uppercase tracking-widest mb-1">Outer Shell</div>
                                            <div className="text-xs text-slate-300">Biodegradable coral-calcium coating</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="text-[9px] text-[#FF6B6B] font-bold uppercase tracking-widest mb-1">Matrix Layer</div>
                                            <div className="text-xs text-slate-300">Chitosan-alginate polyelectrolyte</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="text-[9px] text-[#FF6B6B] font-bold uppercase tracking-widest mb-1">Probiotic Core</div>
                                            <div className="text-xs text-slate-300">McH1-7 consortium at 10⁹ CFU/g</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="text-[9px] text-[#FF6B6B] font-bold uppercase tracking-widest mb-1">Ionic Minerals</div>
                                            <div className="text-xs text-slate-300">Fe, Mn, Zn, Cu trace elements</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cross-section image */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="rounded-2xl overflow-hidden border border-white/10 relative group"
                                >
                                    <img
                                        src="/coralstick-crosssection.png"
                                        alt="CoralStick™ cross-section showing multi-layered slow-decay nutrient pellet"
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <div className="text-[9px] text-[#00D9C0] font-bold uppercase tracking-widest">Cross-Section View</div>
                                        <div className="text-xs text-slate-300">Multi-layered ionic release architecture</div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* RIGHT — Canvas Animation */}
                            <div className="space-y-6">
                                <div className="p-8 rounded-3xl border border-[#00D9C0]/20 bg-gradient-to-br from-[#00D9C0]/5 to-transparent">
                                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">How It Works</h4>
                                    <p className="text-xs text-slate-400 mb-4">Watch the CoralStick™ deploy from a passing vessel, ionically attract to coral colonies, and deliver restorative nutrients that bring bleached corals back to vibrant health.</p>
                                    <CoralStickAnimation />
                                    <p className="text-[10px] text-slate-600 mt-3 text-center">Click to replay animation</p>
                                </div>

                                {/* Key benefits */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                        <CheckCircle size={16} className="text-[#FF6B6B] mt-0.5 shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-white">SCTLD Disease Resistance</div>
                                            <div className="text-xs text-slate-500">Probiotic consortium actively suppresses Stony Coral Tissue Loss Disease pathogens</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                        <CheckCircle size={16} className="text-[#FF6B6B] mt-0.5 shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-white">Thermal Bleaching Shield</div>
                                            <div className="text-xs text-slate-500">Trace mineral supplementation maintains 40–60% higher photosystem efficiency under heat stress</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                        <CheckCircle size={16} className="text-[#FF6B6B] mt-0.5 shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-white">pH Stabilization</div>
                                            <div className="text-xs text-slate-500">Oyster shell buffer maintains localized pH 8.0–8.2 even in acidified waters</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── C-Brick / CoralTex & ReefMaker AI Cards ─── */}
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* C-Brick / CoralTex */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent group hover:border-primary/40 transition-all duration-700"
                        >
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                C-Brick<span className="text-primary">™</span> Substrates
                            </h3>
                            <p className="text-xs text-primary font-bold uppercase tracking-widest mb-4">Biomimetic 3D-Printed Reef Architecture</p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                3D-printed structural substrates with embedded capillary nutrient channels. Engineered to mimic natural reef morphology while providing industrial thermal mass buffering for sensitive larvae and coral fragments.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                                    <Activity className="text-primary size-4 shrink-0" />
                                    <span className="text-xs text-slate-300">Capillary nutrient channels for localized probiotic delivery</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                                    <Shield className="text-primary size-4 shrink-0" />
                                    <span className="text-xs text-slate-300">Industrial thermal mass buffers against ocean temperature spikes</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                                    <Droplets className="text-primary size-4 shrink-0" />
                                    <span className="text-xs text-slate-300">78.5% increase in larval settlement vs. non-porous substrates</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* ReefMaker AI */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-3xl border border-[#00D9C0]/30 bg-gradient-to-br from-[#00D9C0]/5 to-transparent relative overflow-hidden group hover:border-[#00D9C0]/60 transition-all duration-700 shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Brain size={120} className="text-[#00D9C0]" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-tight relative z-10">
                                ReefMaker<span className="text-[#00D9C0]">™</span> AI
                            </h3>
                            <p className="text-xs text-[#00D9C0] font-bold uppercase tracking-widest mb-4 relative z-10">Biomimicry Design Intelligence Platform</p>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light relative z-10">
                                AI-powered site analysis and restoration design SaaS. 94% species identification accuracy from 250k+ image datasets with real-time environmental telemetry integration.
                            </p>
                            <div className="space-y-3 relative z-10">
                                <div className="text-[10px] font-mono text-[#00D9C0]/60 uppercase tracking-widest bg-white/5 p-3 rounded-lg border border-white/5">
                                    &lt; 60 Seconds to Site Optimization
                                </div>
                                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Resulting Velocity</div>
                                    <div className="text-xl font-mono text-white">82% SURVIVAL RATE</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ------------------------------- */}
            {/* 4. INVESTOR CTA                 */}
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
            {/* 5. CONTACT / ENGAGEMENT         */}
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

            {/* ═══════════════════════════════════════════ */}
            {/* 6. SEA FLOOR — RANDOM REEF ASSOCIATIONS    */}
            {/* ═══════════════════════════════════════════ */}
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

                {/* Interactive Reef Creatures — randomly selected, aligned Y */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {displayedAssociations.map((creature, index) => (
                        <div
                            key={creature.id}
                            className="absolute pointer-events-auto"
                            style={{ left: creaturePositions[index].x, top: creaturePositions[index].y }}
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
                                            className="absolute top-12 left-1/2 -translate-x-1/2 w-72 glass-panel p-4 rounded-xl border border-primary/20 z-50 pointer-events-none"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                {creature.type === "positive" ? (
                                                    <Heart size={14} className="text-green-400" />
                                                ) : (
                                                    <AlertTriangle size={14} className="text-amber-400" />
                                                )}
                                                <h4 className="text-white text-sm font-bold uppercase tracking-wider">{creature.name}</h4>
                                                <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${creature.type === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                    {creature.type === "positive" ? "Ally" : "Threat"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-300 mb-2">{creature.description}</p>
                                            <div className={`p-2 rounded border ${creature.type === 'positive' ? 'bg-green-500/5 border-green-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                                                <span className={`text-[9px] uppercase font-bold tracking-widest block mb-1 ${creature.type === 'positive' ? 'text-green-400' : 'text-amber-400'}`}>Coral Health Impact</span>
                                                <p className="text-[10px] text-slate-400 leading-relaxed">{creature.coralRelationship}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* "Did You Know?" badge */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-primary/20"
                    >
                        <Fish size={14} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Reef Allies — Hover to discover</span>
                    </motion.div>
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

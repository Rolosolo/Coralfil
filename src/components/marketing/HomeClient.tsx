"use client";

import { motion, AnimatePresence } from "@/components/motion-client";
import Link from "next/link";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
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
    Fish,
    Mail,
    Github,
    Linkedin
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
    {
        id: "parrotfish",
        name: "Parrotfish",
        type: "positive",
        description: "Bright fish that clean the reef.",
        coralRelationship: "These fish eat seaweed that covers the coral. When they eat, they also poop out sand that makes our beaches!",
        icon: "🐠"
    },
    {
        id: "clownfish",
        name: "Clownfish",
        type: "positive",
        description: "Small orange fish that live in wavy anemones.",
        coralRelationship: "They keep the reef healthy by helping other creatures. If you see them, you know the reef is a happy home.",
        icon: "🐡"
    },
    {
        id: "giant-clam",
        name: "Giant Clam",
        type: "positive",
        description: "Very large shells that sit on the bottom.",
        coralRelationship: "They drink lots of water and clean it. Clean water helps the sun reach the coral so it can grow big and strong.",
        icon: "🐚"
    },
    {
        id: "sea-cucumber",
        name: "Sea Cucumber",
        type: "positive",
        description: "Long, bumpy creatures that crawl very slowly.",
        coralRelationship: "They are like underwater vacuum cleaners. They eat the messy stuff on the floor and keep the reef tidy.",
        icon: "🫒"
    },
    {
        id: "cleaner-wrasse",
        name: "Cleaner Wrasse",
        type: "positive",
        description: "Tiny fish that give checkups to bigger fish.",
        coralRelationship: "They eat bugs and tiny pests off other fish. This keeps everyone healthy so the whole reef stays busy and full of life.",
        icon: "🐟"
    },
    {
        id: "sea-urchin",
        name: "Sea Urchin",
        type: "positive",
        description: "Spiky balls that love to eat seaweed.",
        coralRelationship: "They eat the seaweed that tries to take over the coral's space. Without them, the reef would get too crowded with plants.",
        icon: "🟤"
    },
    {
        id: "manta-ray",
        name: "Manta Ray",
        type: "positive",
        description: "Huge, flat fish that look like they are flying.",
        coralRelationship: "They travel long distances and bring food and energy to the reef. They are signs of a very healthy and rich ocean.",
        icon: "🦈"
    },
    {
        id: "hawksbill-turtle",
        name: "Hawksbill Turtle",
        type: "positive",
        description: "Beautiful turtles that love to eat snacks on the reef.",
        coralRelationship: "They eat sponges that try to grow over the coral. By eating them, they save a spot for the coral to live.",
        icon: "🐢"
    },
    {
        id: "snapping-shrimp",
        name: "Snapping Shrimp",
        type: "positive",
        description: "Tiny shrimp that make a loud 'snap' sound.",
        coralRelationship: "The noise they make helps baby corals find their way home to the reef. It's like a loud bell calling them home!",
        icon: "🦐"
    },
    {
        id: "whale-shark",
        name: "Whale Shark",
        type: "positive",
        description: "The biggest fish in the world, but very gentle.",
        coralRelationship: "They bring special nutrients from the deep sea to the shallow reefs. Everyone is happy when the big boss visits!",
        icon: "🐋"
    },
    {
        id: "octopus",
        name: "Reef Octopus",
        type: "positive",
        description: "Very smart hiders with eight arms.",
        coralRelationship: "They catch little bugs that might hurt the coral. They are the reef's secret guards!",
        icon: "🐙"
    },
    {
        id: "grouper",
        name: "Nassau Grouper",
        type: "positive",
        description: "Big, strong fish that live in holes.",
        coralRelationship: "They keep the reef in balance by being the top fish. When they are around, the whole neighborhood stays safe.",
        icon: "🐠"
    },
    {
        id: "christmas-tree-worm",
        name: "Christmas Tree Worm",
        type: "positive",
        description: "Tiny, colorful fans that look like trees.",
        coralRelationship: "They live inside the coral and help make it stronger. They add pretty colors and help the coral stay tough.",
        icon: "🎄"
    },
    {
        id: "crown-of-thorns",
        name: "Crown of Thorns Starfish",
        type: "negative",
        description: "Spiky starfish that eat the coral.",
        coralRelationship: "⚠️ These guys are a bit too hungry! They eat the coral tissue. We have to make sure there aren't too many of them.",
        icon: "⭐"
    },
    {
        id: "drupella-snail",
        name: "Drupella Snail",
        type: "negative",
        description: "Small snails that snack on coral.",
        coralRelationship: "⚠️ Just like the spiky starfish, these snails like to eat coral. Too many snails can make the coral feel sick.",
        icon: "🐌"
    },
];

/* ═══════════════════════════════════════════════════════
   CORALSTICK ANIMATION COMPONENT
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

        // BG gradient
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, "#041525");
        bg.addColorStop(0.3, "#061e30");
        bg.addColorStop(1, "#020a14");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Shimmer
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

        // Boat
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
        ctx.strokeStyle = "#2a5a6a";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(boatX, boatY);
        ctx.lineTo(boatX, boatY - 14);
        ctx.stroke();

        const pelletPhase = Math.min(frame / 100, 1);
        const attractPhase = Math.max(0, Math.min((frame - 100) / 80, 1));
        const healPhase = Math.max(0, Math.min((frame - 180) / 120, 1));

        const coralBaseY = H - 30;

        // Draw multiple corals (a colony)
        const drawBranch = (x: number, y: number, angle: number, len: number, depth: number, health: number) => {
            if (depth <= 0 || len < 2) return;
            const endX = x + Math.cos(angle) * len;
            const endY = y + Math.sin(angle) * len;

            const r = Math.floor(255 - health * 105);
            const g = Math.floor(240 - health * 140);
            const b = Math.floor(235 - health * 35);
            ctx.strokeStyle = `rgb(${r},${g},${b})`;
            ctx.lineWidth = depth * 1;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            if (health > 0.3) {
                ctx.shadowColor = `rgba(255,${100 + health * 100},${80 + health * 100},${health * 0.4})`;
                ctx.shadowBlur = health * 4;
            }

            drawBranch(endX, endY, angle - 0.4 + Math.sin(frame * 0.01) * 0.05, len * 0.72, depth - 1, health);
            drawBranch(endX, endY, angle + 0.5 + Math.cos(frame * 0.01) * 0.05, len * 0.68, depth - 1, health);
            ctx.shadowBlur = 0;
        };

        // Draw the colony
        const colony = [
            { x: W * 0.65, baseY: coralBaseY, size: 30, depth: 5 },
            { x: W * 0.55, baseY: coralBaseY + 5, size: 20, depth: 4 },
            { x: W * 0.75, baseY: coralBaseY + 3, size: 22, depth: 4 },
            { x: W * 0.45, baseY: coralBaseY + 8, size: 15, depth: 3 },
            { x: W * 0.85, baseY: coralBaseY + 10, size: 12, depth: 3 },
        ];

        colony.forEach(c => {
            drawBranch(c.x, c.baseY, -Math.PI / 2 + (Math.random() - 0.5) * 0.2, c.size, c.depth, healPhase);
        });

        // Seafloor
        ctx.fillStyle = "#0a1a25";
        ctx.fillRect(0, coralBaseY + 5, W, H - coralBaseY);

        // Pellets (smaller now)
        const pelletStartY = boatY + 20;
        const pelletTargetX = W * 0.65;
        const pelletTargetY = coralBaseY - 40;

        if (attractPhase < 1) {
            const startX = boatX;
            const px = startX + (pelletTargetX - startX) * attractPhase;
            const py = pelletStartY + (pelletTargetY - pelletStartY) * (pelletPhase * 0.6 + attractPhase * 0.4);

            if (attractPhase > 0) {
                for (let i = 0; i < 6; i++) {
                    const lineAngle = (i / 6) * Math.PI * 2 + frame * 0.03;
                    const lineLen = 10 + attractPhase * 15;
                    ctx.strokeStyle = `rgba(0,217,192,${0.1 + attractPhase * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.setLineDash([2, 3]);
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + Math.cos(lineAngle) * lineLen, py + Math.sin(lineAngle) * lineLen);
                    ctx.stroke();
                    ctx.setLineDash([]);
                }
            }

            // Smaller pellet
            ctx.fillStyle = "#FF8866";
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#FFaa88";
            ctx.beginPath();
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        if (healPhase > 0) {
            for (let i = 0; i < Math.floor(healPhase * 15); i++) {
                const px = W * 0.65 + (Math.random() - 0.5) * 100;
                const py = coralBaseY - 20 - Math.random() * 60;
                ctx.fillStyle = `rgba(0,217,192,${healPhase * 0.3})`;
                ctx.beginPath();
                ctx.arc(px, py + Math.sin(frame * 0.05 + i) * 5, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        if (frame < 100) ctx.fillText("RELEASE", W / 2, H - 8);
        else if (frame < 180) ctx.fillText("ATTACHING", W / 2, H - 8);
        else ctx.fillText("RECOVERING", W / 2, H - 8);

        frameRef.current++;
        if (frameRef.current < totalFrames) {
            animRef.current = requestAnimationFrame(draw);
        } else {
            setIsPlaying(false);
            setHasPlayed(true);
        }
    }, []);

    const startAnimation = useCallback(() => {
        frameRef.current = 0;
        setIsPlaying(true);
        setHasPlayed(false);
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
    }, [draw]);

    useEffect(() => {
        const timer = setTimeout(startAnimation, 800);
        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(animRef.current);
        };
    }, [startAnimation]);

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
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN HOME CLIENT COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function HomeClient() {
    const [hoveredCreature, setHoveredCreature] = useState<string | null>(null);
    const [activeCreature, setActiveCreature] = useState<string | null>(null);

    const displayedAssociations = useMemo(() => {
        return [...REEF_ASSOCIATION_LIBRARY].sort(() => Math.random() - 0.5).slice(0, 3);
    }, []);

    return (
        <div className="flex-grow bg-[#010307] relative overflow-x-hidden">
            {/* 1. HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#010307]">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1.05, opacity: 0.4 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        alt="Deep sea coral environment"
                        className="w-full h-full object-cover mix-blend-luminosity brightness-75 animate-float"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCovIh_7Q6DF2l3xdQQ7w51SV46VEOqVydGiNH2GzC4gXgVCySb2acCYrjvKzk0U5GoL4FknBlIbP-bJ1BmMxXIjfW_UgFqgMQEMgHepX0kIzft4X8gNBqlLq-te7h5XlIpKY_6dQnAuWE4J_vuyqD5qDZCpBro6ti2D4QI-h-duNILkpyubD3swqeaUJsQ4cxtOG0Ou89gkuzl6NBs2dR76piTudHvED9D2TQT7FXOo2rFXifuXvW1AXQIpeIjTivZUOWNj2nIqdU"
                    />
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-[#00D9C0] blur-[1px]"
                                initial={{ x: (Math.random() * 100) + "%", y: (Math.random() * 100) + "%", opacity: 0 }}
                                animate={{ y: ["0px", "-40px", "-20px"], opacity: [0, 0.4, 0], scale: [1, 1.5, 1] }}
                                transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10 }}
                            />
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,3,7,0.9)_100%)]"></div>
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
                        Working with nature's wisdom and smart tools to save our reefs for the next generation.
                    </motion.p>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 flex flex-col items-center gap-3 opacity-30"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white">Descent</span>
                    <ChevronDown className="w-6 h-6 text-white" />
                </motion.div>
            </section>

            {/* 2. OUR SOLUTIONS */}
            <section className="py-40 bg-[#010307]" id="technology">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-24">
                        <span className="text-[#00D9C0] font-bold tracking-[0.4em] text-xs uppercase mb-6 block">Our Solutions</span>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.95] uppercase">
                            Smart Reef<br />
                            <span className="text-[#00D9C0]">Technology.</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-32">
                        <div className="space-y-6">
                            <div className="p-8 rounded-3xl border border-[#FF6B6B]/20 bg-gradient-to-br from-[#FF6B6B]/5 to-transparent">
                                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                                    Coralstick Smart Pellet<span className="text-[#FF6B6B]">™</span>
                                </h3>
                                <p className="text-sm text-[#FF6B6B] font-bold uppercase tracking-widest mb-4">Healthy Vitamin Pellets</p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                    We make small tablets that stick to the coral. They release vitamins and good bacteria slowly over time. This helps the coral stay strong even when the water gets too warm or messy.
                                </p>
                                <div className="space-y-3">
                                    {[
                                        "Helps coral fight off sickness",
                                        "Stays cool during hot days",
                                        "Super sticky so it doesn't float away",
                                        "Gives coral everything it needs to grow"
                                    ].map((fact, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                            <CheckCircle size={14} className="text-[#FF6B6B]" />
                                            <span className="text-xs text-slate-300">{fact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-white/10 relative">
                                <img src="/coralstick-crosssection.png" alt="Inside a Coralstick Smart Pellet" className="w-full" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 rounded-3xl border border-[#00D9C0]/20 bg-gradient-to-br from-[#00D9C0]/5 to-transparent">
                                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">How it works</h4>
                                <p className="text-xs text-slate-400 mb-4 font-light">Watch how the pellets find the coral and help it get its color back!</p>
                                <CoralStickAnimation />
                            </div>
                            <div className="p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Coraltex Sea Bricks (C-Bricks)™</h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">
                                    Special 3D-printed blocks that act like a new floor for the reef. They have tiny tunnels for food to travel through and stay nice and cool for baby corals to live on.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. REEF FRIENDS SECTION */}
            <section className="py-32 bg-[#02060c] border-y border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9C0]/10 border border-[#00D9C0]/20 mb-12">
                        <Fish size={16} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Meet The Reef Friends</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-16">
                        Protecting Our <br />
                        <span className="text-primary brightness-125">Best Allies.</span>
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {displayedAssociations.map((creature) => (
                            <motion.div
                                key={creature.id}
                                whileHover={{ y: -10 }}
                                className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/[0.02] text-left relative group"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <span className="text-8xl">{creature.icon}</span>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{creature.icon}</span>
                                    <div>
                                        <h4 className="text-lg font-black text-white uppercase">{creature.name}</h4>
                                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${creature.type === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                            {creature.type === "positive" ? "Ally" : "Threat"}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 mb-6 font-light leading-relaxed">{creature.description}</p>
                                <div className={`p-4 rounded-2xl border ${creature.type === 'positive' ? 'bg-green-500/5 border-green-500/10' : 'bg-amber-500/5 border-amber-500/10'}`}>
                                    <p className="text-[11px] text-slate-300 italic">"{creature.coralRelationship}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="mt-12 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">Reload the page to meet more reef friends!</p>
                </div>
            </section>

            {/* 4. FINAL CTA & CONTACT */}
            <section className="py-40 bg-[#010307] relative overflow-hidden">
                {/* Floating Background Creatures (Subtle) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    {REEF_ASSOCIATION_LIBRARY.slice(0, 5).map((creature, i) => (
                        <motion.div
                            key={creature.id}
                            className="absolute text-6xl"
                            initial={{ 
                                x: (i * 20 + 10) + "%", 
                                y: (i % 2 === 0 ? 10 : 70) + "%",
                                opacity: 0 
                            }}
                            animate={{ 
                                y: [ (i % 2 === 0 ? 10 : 70) + "%", (i % 2 === 0 ? 20 : 60) + "%", (i % 2 === 0 ? 10 : 70) + "%"],
                                opacity: [0, 0.15, 0],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                                duration: 15 + i * 5, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: i * 2
                            }}
                        >
                            {creature.icon}
                        </motion.div>
                    ))}
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-12 uppercase">
                        Saving The <span className="text-[#00D9C0]">Oceans.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light mb-16 max-w-2xl mx-auto">
                        We are building the future of the sea, one brick and one pellet at a time.
                    </p>
                    
                    <div className="space-y-12">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="mailto:info@coralfil.com" className="flex items-center gap-4 px-10 py-5 bg-[#00D9C0] text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,217,192,0.3)]">
                                <Mail size={18} />
                                Email Us @ info@coralfil.com
                            </a>
                        </div>
                        
                        <div className="flex items-center justify-center gap-10">
                            <a href="https://github.com/Rolosolo/Coralfil" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
                                <Github size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">GitHub</span>
                            </a>
                            <a href="https://linkedin.com/company/coralfil" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-[#00D9C0] transition-colors">
                                <Linkedin size={20} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

"use client";

import { motion, AnimatePresence } from "@/components/motion-client";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import {
    ChevronDown,
    CheckCircle,
    Droplets,
    Mail,
    Github,
    Linkedin,
    ArrowUpRight,
    Sparkles
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
    supportRating?: number; // 0-100
    threatRating?: number;  // 0-100
}

const REEF_ASSOCIATION_LIBRARY: ReefAssociation[] = [
    {
        id: "giant-clam",
        name: "Giant Clam",
        type: "positive",
        description: "Very large shells that sit on the bottom.",
        coralRelationship: "They drink lots of water and clean it. Clean water helps the sun reach the coral so it can grow big and strong.",
        icon: "🐚",
        supportRating: 85
    },
    {
        id: "parrotfish",
        name: "Parrotfish",
        type: "positive",
        description: "Bright fish that clean the reef.",
        coralRelationship: "These fish eat seaweed that covers the coral. When they eat, they also poop out sand that makes our beaches!",
        icon: "🐠",
        supportRating: 92
    },
    {
        id: "clownfish",
        name: "Clownfish",
        type: "positive",
        description: "Small orange fish that live in wavy anemones.",
        coralRelationship: "They keep the reef healthy by helping other creatures. If you see them, you know the reef is a happy home.",
        icon: "🐡",
        supportRating: 65
    },
    {
        id: "sea-cucumber",
        name: "Sea Cucumber",
        type: "positive",
        description: "Long, bumpy creatures that crawl very slowly.",
        coralRelationship: "They are like underwater vacuum cleaners. They eat the messy stuff on the floor and keep the reef tidy.",
        icon: "🫒",
        supportRating: 88
    },
    {
        id: "cleaner-wrasse",
        name: "Cleaner Wrasse",
        type: "positive",
        description: "Tiny fish that give checkups to bigger fish.",
        coralRelationship: "They eat bugs and tiny pests off other fish. This keeps everyone healthy so the whole reef stays busy and full of life.",
        icon: "🐟",
        supportRating: 78
    },
    {
        id: "sea-urchin",
        name: "Sea Urchin",
        type: "positive",
        description: "Spiky balls that love to eat seaweed.",
        coralRelationship: "They eat the seaweed that tries to take over the coral's space. Without them, the reef would get too crowded with plants.",
        icon: "🟤",
        supportRating: 82
    },
    {
        id: "manta-ray",
        name: "Manta Ray",
        type: "positive",
        description: "Huge, flat fish that look like they are flying.",
        coralRelationship: "They travel long distances and bring food and energy to the reef. They are signs of a very healthy and rich ocean.",
        icon: "🦈",
        supportRating: 75
    },
    {
        id: "hawksbill-turtle",
        name: "Hawksbill Turtle",
        type: "positive",
        description: "Beautiful turtles that love to eat snacks on the reef.",
        coralRelationship: "They eat sponges that try to grow over the coral. By eating them, they save a spot for the coral to live.",
        icon: "🐢",
        supportRating: 84
    },
    {
        id: "snapping-shrimp",
        name: "Snapping Shrimp",
        type: "positive",
        description: "Tiny shrimp that make a loud 'snap' sound.",
        coralRelationship: "The noise they make helps baby corals find their way home to the reef. It's like a loud bell calling them home!",
        icon: "🦐",
        supportRating: 70
    },
    {
        id: "whale-shark",
        name: "Whale Shark",
        type: "positive",
        description: "The biggest fish in the world, but very gentle.",
        coralRelationship: "They bring special nutrients from the deep sea to the shallow reefs. Everyone is happy when the big boss visits!",
        icon: "🐋",
        supportRating: 95
    },
    {
        id: "octopus",
        name: "Reef Octopus",
        type: "positive",
        description: "Very smart hiders with eight arms.",
        coralRelationship: "They catch little bugs that might hurt the coral. They are the reef's secret guards!",
        icon: "🐙",
        supportRating: 68
    },
    {
        id: "grouper",
        name: "Nassau Grouper",
        type: "positive",
        description: "Big, strong fish that live in holes.",
        coralRelationship: "They keep the reef in balance by being the top fish. When they are around, the whole neighborhood stays safe.",
        icon: "🐠",
        supportRating: 80
    },
    {
        id: "christmas-tree-worm",
        name: "Christmas Tree Worm",
        type: "positive",
        description: "Tiny, colorful fans that look like trees.",
        coralRelationship: "They live inside the coral and help make it stronger. They add pretty colors and help the coral stay tough.",
        icon: "🎄",
        supportRating: 55
    },
    {
        id: "crown-of-thorns",
        name: "Crown of Thorns Starfish",
        type: "negative",
        description: "Spiky starfish that eat the coral.",
        coralRelationship: "⚠️ These guys are a bit too hungry! They eat the coral tissue. We have to make sure there aren't too many of them.",
        icon: "⭐",
        threatRating: 98
    },
    {
        id: "drupella-snail",
        name: "Drupella Snail",
        type: "negative",
        description: "Small snails that snack on coral.",
        coralRelationship: "⚠️ Just like the spiky starfish, these snails like to eat coral. Too many snails can make the coral feel sick.",
        icon: "🐌",
        threatRating: 75
    },
];

/* ═══════════════════════════════════════════════════════
   HERO SLIDER COMPONENT
   ═══════════════════════════════════════════════════════ */

const HERO_SLIDES = [
    {
        id: "gap",
        subtitle: "The Mission",
        title: "Scaling Resilience for ",
        highlight: "Infinite Oceans.",
        description: "The oceans are at a breaking point. Coralfill bridges the gap between despair and restoration with precision biotechnology.",
        color: "#F8FAFC"
    },
    {
        id: "encapsulation",
        subtitle: "The Technology",
        title: "Patented Slow-Release ",
        highlight: "Encapsulation.",
        description: "Revolutionizing restoration with patented ocean-safe slow-release encapsulation. Tailored health support through AlphaFold 3 & BioNeMo optimized molecular design.",
        color: "#F472B6"
    },
    {
        id: "coraltex",
        subtitle: "The Infrastructure",
        title: "Biomimetic Reefs with ",
        highlight: "Coraltex™.",
        description: "Introducing Coraltex™: The biomimetic artificial reef system. Engineered for maximum coral larvae attraction, settlement, and long-term ecosystem support.",
        color: "#38BDF8"
    },
    {
        id: "biorefined",
        subtitle: "The Natural Supply",
        title: "Biorefined from the ",
        highlight: "Sea Itself.",
        description: "Coralfil's tertiary supply tier sources and refines premium marine-origin minerals — wild-harvested, sustainably processed, and traceable from ocean to application. Feed the reef. Feed the future.",
        color: "#34D399"
    }
];

function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[currentSlide];

    return (
        <div className="relative z-10 text-center max-w-5xl px-6 mt-32 h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.4em" }}
                        className="text-[#00D9C0] font-bold text-xs uppercase mb-6 block"
                    >
                        {slide.subtitle}
                    </motion.span>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-10 text-white">
                        {slide.title}<br />
                        <span className="text-glow-gradient" style={{ color: slide.color }}>{slide.highlight}</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                        {slide.description}
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="https://os.coralfil.com/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00D9C0] to-[#00A3FF] hover:from-[#00bda6] hover:to-[#008be0] text-[#010307] font-black text-xs md:text-sm uppercase tracking-[0.15em] rounded-xl shadow-[0_0_25px_rgba(0,217,192,0.3)] hover:shadow-[0_0_35px_rgba(0,217,192,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 text-[#010307] animate-pulse" />
                            <span>The Ocean System</span>
                            <ArrowUpRight className="w-4 h-4 text-[#010307] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="absolute -bottom-10 flex gap-3">
                {HERO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                            currentSlide === i ? "bg-[#00D9C0] w-8" : "bg-white/20"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

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
        const totalFrames = 540; // ~9 seconds

        ctx.clearRect(0, 0, W, H);

        // BG gradient - Deep Oceanic
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, "#01060b");
        bg.addColorStop(0.3, "#05131f");
        bg.addColorStop(1, "#010307");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Volumetric Light Rails
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            const opacity = 0.04 + Math.sin(frame * 0.01 + i) * 0.02;
            ctx.strokeStyle = `rgba(0,217,192,${opacity})`;
            ctx.lineWidth = 60;
            ctx.moveTo(W * (0.1 + i * 0.2), -100);
            ctx.lineTo(W * (0.2 + i * 0.2), H + 100);
            ctx.stroke();
        }

        const boatX = W * 0.35 + Math.sin(frame * 0.02) * 8;
        const boatY = 25;
        const surfaceY = boatY + 12;
        
        // Boat Hull (High-fidelity)
        ctx.fillStyle = "#0c1a25";
        ctx.beginPath();
        ctx.moveTo(boatX - 50, boatY);
        ctx.bezierCurveTo(boatX - 45, boatY + 18, boatX + 45, boatY + 18, boatX + 50, boatY);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#1a2f3f";
        ctx.fillRect(boatX - 18, boatY - 10, 36, 10);
        
        // Oceanic Particles
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        for (let i = 0; i < 25; i++) {
            const px = ((i * 1234.56) % W);
            const py = ((frame * 0.15 + i * 40) % H);
            ctx.beginPath();
            ctx.arc(px, py, 0.4, 0, Math.PI * 2);
            ctx.fill();
        }

        const coralBaseY = H - 45;

        // Recursive Branching Coral
        const drawOrganicBranch = (x: number, y: number, angle: number, len: number, depth: number, health: number) => {
            if (depth <= 0 || len < 1.2) return;
            
            const sway = Math.sin(frame * 0.02 + x * 0.01) * (6 - depth) * 0.25;
            const endX = x + Math.cos(angle + sway * 0.04) * len;
            const endY = y + Math.sin(angle + sway * 0.04) * len;

            // Color maturation (Bleached -> Vibrant)
            const vibrantR = 255;
            const vibrantG = 136;
            const vibrantB = 102;
            const bleachedR = 245;
            const bleachedG = 248;
            const bleachedB = 255;

            const r = Math.floor(bleachedR + (vibrantR - bleachedR) * health);
            const g = Math.floor(bleachedG + (vibrantG - bleachedG) * health);
            const b = Math.floor(bleachedB + (vibrantB - bleachedB) * health);
            
            ctx.strokeStyle = `rgb(${r},${g},${b})`;
            ctx.lineWidth = depth * 1.5;
            ctx.lineCap = "round";
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Polyp Glows
            if (depth < 3 && health > 0.3) {
                const alpha = health * 0.6;
                ctx.fillStyle = `rgba(255,100,100,${alpha})`;
                ctx.shadowColor = "rgba(255,100,100,0.5)";
                ctx.shadowBlur = 4 * health;
                ctx.beginPath();
                ctx.arc(endX, endY, 1.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            const nextLen = len * (0.76 + Math.random() * 0.08);
            drawOrganicBranch(endX, endY, angle - 0.5 + sway * 0.02, nextLen, depth - 1, health);
            drawOrganicBranch(endX, endY, angle + 0.6 + sway * 0.02, nextLen, depth - 1, health);
        };

        const colonyHealth = Math.max(0, Math.min((frame - 220) / 200, 1));
        const colony = [
            { x: W * 0.72, y: coralBaseY, size: 32, depth: 6 },
            { x: W * 0.58, y: coralBaseY + 8, size: 25, depth: 5 },
            { x: W * 0.85, y: coralBaseY + 5, size: 20, depth: 4 }
        ];

        colony.forEach(c => drawOrganicBranch(c.x, c.y, -Math.PI/2, c.size, c.depth, colonyHealth));

        // Seafloor
        ctx.fillStyle = "#02070d";
        ctx.beginPath();
        ctx.moveTo(0, coralBaseY + 15);
        for(let x=0; x<=W; x+=15) ctx.lineTo(x, coralBaseY + 15 + Math.cos(x * 0.04) * 6);
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

        // Pellets (Advanced Physics)
        const pelletCount = 6;
        for (let i = 0; i < pelletCount; i++) {
            const delay = i * 22;
            const pf = Math.max(0, frame - delay);
            if (pf === 0 || pf > 420) continue;

            const t_drop = 110;  // Frames to fall
            const t_attract = 110; // Frames to snap to reef
            
            let px, py;
            const startX = boatX + (i - 2.5) * 6;
            const startY = surfaceY - 5;
            const targetX = W * 0.7 + (i - 2) * 14;
            const targetY = coralBaseY - 25;

            if (pf <= t_drop) {
                // Phase 1: Gravity Fall (Ease In Quad)
                const t = pf / t_drop;
                const easeInQuad = t * t;
                px = startX + Math.sin(pf * 0.08) * 2; // Drift
                py = startY + (H * 0.5 - startY) * easeInQuad;
            } else if (pf <= (t_drop + t_attract)) {
                // Phase 2: Ionic Attraction (Ease Out Cubic)
                const t = (pf - t_drop) / t_attract;
                const easeOutCubic = 1 - Math.pow(1 - t, 3);
                const driftX = startX + Math.sin(t_drop * 0.08) * 2;
                const driftY = startY + (H * 0.5 - startY);
                px = driftX + (targetX - driftX) * easeOutCubic;
                py = driftY + (targetY - driftY) * easeOutCubic;
            } else {
                px = targetX; py = targetY;
            }

            // Visual Rendering
            if (pf < (t_drop + t_attract + 100)) {
                // Glow
                const alpha = Math.max(0, 1 - (pf - 320)/100);
                const g = ctx.createRadialGradient(px, py, 0, px, py, 8);
                g.addColorStop(0, `rgba(255,160,100,${alpha})`);
                g.addColorStop(1, `rgba(255,160,100,0)`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI*2); ctx.fill();

                // Core
                ctx.fillStyle = `rgba(255,220,180,${alpha})`;
                ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI*2); ctx.fill();

                // Surface Impact Ripple
                if (Math.abs(pf - 15) < 10) {
                    const rSize = (pf - 5) * 1.5;
                    ctx.strokeStyle = `rgba(0,217,192,${1 - (pf-5)/10})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.arc(startX, surfaceY, rSize, 0, Math.PI*2); ctx.stroke();
                }
            }
        }

        // HUD Text
        ctx.fillStyle = "rgba(0,217,192,0.4)";
        ctx.font = "black 9px 'Inter', sans-serif";
        ctx.letterSpacing = "3px";
        ctx.textAlign = "center";
        const txt = frame < 180 ? "DEPLOYING BIO-ACTIVE PELLETS" : 
                    frame < 360 ? "HYBRID REEF CALCIFICATION" : "STATUS: BIOME RESTORED";
        ctx.fillText(txt, W/2, H - 15);

        frameRef.current++;
        if (frameRef.current < totalFrames) {
            animRef.current = requestAnimationFrame(draw);
        } else {
            setIsPlaying(false);
            setHasPlayed(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const startAnimation = useCallback(() => {
        frameRef.current = 0;
        setIsPlaying(true);
        setHasPlayed(false);
        cancelAnimationFrame(animRef.current);
        animRef.current = requestAnimationFrame(draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timer = setTimeout(startAnimation, 800);
        return () => { clearTimeout(timer); cancelAnimationFrame(animRef.current); };
    }, [startAnimation]);

    return (
        <div className="relative group/anim scale-100 hover:scale-[1.03] transition-all duration-1000 ease-out">
            <div className="absolute -inset-2 bg-[#00D9C0]/10 blur-3xl opacity-0 group-hover/anim:opacity-100 transition-opacity rounded-3xl"></div>
            <canvas
                ref={canvasRef}
                width={360}
                height={260}
                className="relative w-full rounded-[30px] border border-white/10 cursor-pointer shadow-2xl bg-[#01060b] hover:border-primary/40 transition-colors duration-500"
                onClick={startAnimation}
            />
            {!isPlaying && hasPlayed && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-[30px] cursor-pointer opacity-0 group-hover/anim:opacity-100 transition-all duration-700" onClick={startAnimation}>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-black bg-primary px-8 py-4 rounded-full border border-white/20 shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        Resync Animation
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   VISITOR SECTOR SELECTOR
   ═══════════════════════════════════════════════════════ */

const VISITOR_SECTORS = [
    {
        id: "marine-restoration",
        label: "Marine Restoration",
        icon: "🪸",
        tagline: "Rebuilding the ocean's architecture",
        accentColor: "#00D9C0",
        glowColor: "rgba(0,217,192,0.15)",
        borderColor: "rgba(0,217,192,0.3)",
        benefits: [
            "Deploy Coraltex™ C-Bricks for rapid substrate colonization",
            "Precision Coralstick™ pellets for species-targeted nutrition",
            "Coralfil OS tracks reef health in real-time via AI sensors",
            "Proprietary biopolymer coating boosts coral recruitment 3×",
        ],
        cta: "Model your restoration site in the Formulator →",
    },
    {
        id: "aquaculture",
        label: "Aquaculture",
        icon: "🐟",
        tagline: "Optimize your marine production systems",
        accentColor: "#38BDF8",
        glowColor: "rgba(56,189,248,0.15)",
        borderColor: "rgba(56,189,248,0.3)",
        benefits: [
            "Marine Minerals improve water chemistry & reduce stress mortality",
            "Slow-release pellet tech delivers precise ionic support at scale",
            "Formulator calculates custom mineral blends per species",
            "Coralfil OS integrates with farm sensors for continuous dosing",
        ],
        cta: "Build your aquaculture formula now →",
    },
    {
        id: "agrifeed",
        label: "Agrifeed / Farming",
        icon: "🌾",
        tagline: "Ocean minerals for land-based vitality",
        accentColor: "#34D399",
        glowColor: "rgba(52,211,153,0.15)",
        borderColor: "rgba(52,211,153,0.3)",
        benefits: [
            "Traceable marine mineral concentrates for feed & soil amendment",
            "Biorefined kelp & coral-safe by-product streams",
            "Certified inputs compatible with organic & regenerative standards",
            "Custom blend the exact macro/micro mineral profile you need",
        ],
        cta: "Formulate your agrifeed mineral mix →",
    },
    {
        id: "premium-minerals",
        label: "Premium Marine Minerals",
        icon: "💎",
        tagline: "The finest ocean-source mineral supply",
        accentColor: "#A78BFA",
        glowColor: "rgba(167,139,250,0.15)",
        borderColor: "rgba(167,139,250,0.3)",
        benefits: [
            "Wild-harvested, sustainably sourced from pristine marine zones",
            "Full-spectrum trace mineral profiles unavailable from terrestrial sources",
            "Third-party tested for purity, bioavailability & heavy-metal safety",
            "Available in bulk, concentrate, or custom-encapsulated formats",
        ],
        cta: "Explore marine mineral grades in the Formulator →",
    },
];

function VisitorSelector() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);
    const selectedSector = VISITOR_SECTORS.find(s => s.id === selected);

    return (
        <div className="space-y-10">
            {/* 4-tile grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {VISITOR_SECTORS.map((sector) => {
                    const isSelected = selected === sector.id;
                    const isHovered = hovered === sector.id;
                    const isActive = isSelected || isHovered;
                    return (
                        <button
                            key={sector.id}
                            id={`visitor-${sector.id}`}
                            onClick={() => setSelected(isSelected ? null : sector.id)}
                            onMouseEnter={() => setHovered(sector.id)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative group text-left rounded-3xl p-7 border transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                            style={{
                                background: isActive
                                    ? `radial-gradient(ellipse at 30% 20%, ${sector.glowColor} 0%, rgba(2,6,12,0.95) 70%)`
                                    : "rgba(255,255,255,0.02)",
                                borderColor: isSelected
                                    ? sector.borderColor
                                    : isHovered
                                    ? sector.borderColor.replace("0.3", "0.15")
                                    : "rgba(255,255,255,0.06)",
                                boxShadow: isSelected
                                    ? `0 0 40px ${sector.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`
                                    : isHovered
                                    ? `0 0 20px ${sector.glowColor}`
                                    : "none",
                                transform: isSelected ? "translateY(-6px) scale(1.02)" : isHovered ? "translateY(-3px)" : "translateY(0)",
                            }}
                        >
                            {/* Active indicator ring */}
                            {isSelected && (
                                <div
                                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full animate-ping"
                                    style={{ background: sector.accentColor, opacity: 0.8 }}
                                />
                            )}
                            {isSelected && (
                                <div
                                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                                    style={{ background: sector.accentColor }}
                                />
                            )}

                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-all duration-500"
                                style={{
                                    background: isActive ? `${sector.glowColor.replace("0.15", "0.25")}` : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${isActive ? sector.borderColor : "rgba(255,255,255,0.06)"}`,
                                    transform: isActive ? "scale(1.1)" : "scale(1)",
                                    boxShadow: isActive ? `0 0 20px ${sector.glowColor}` : "none",
                                }}
                            >
                                {sector.icon}
                            </div>

                            {/* Label */}
                            <h3
                                className="text-base font-black uppercase tracking-tight mb-1.5 transition-colors duration-300"
                                style={{ color: isActive ? sector.accentColor : "#f8fafc" }}
                            >
                                {sector.label}
                            </h3>
                            <p className="text-[11px] text-slate-500 font-light leading-relaxed group-hover:text-slate-400 transition-colors">
                                {sector.tagline}
                            </p>

                            {/* Bottom accent bar */}
                            <div
                                className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-500"
                                style={{
                                    background: isActive
                                        ? `linear-gradient(90deg, transparent, ${sector.accentColor}, transparent)`
                                        : "transparent",
                                }}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Expanded sector content */}
            <AnimatePresence mode="wait">
                {selectedSector && (
                    <motion.div
                        key={selectedSector.id}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="rounded-3xl p-8 md:p-12 border relative overflow-hidden"
                        style={{
                            background: `radial-gradient(ellipse at 10% 0%, ${selectedSector.glowColor} 0%, rgba(2,6,12,0.98) 60%)`,
                            borderColor: selectedSector.borderColor,
                            boxShadow: `0 0 60px ${selectedSector.glowColor}`,
                        }}
                    >
                        {/* Decorative large icon */}
                        <div className="absolute -right-6 -bottom-6 text-[160px] opacity-5 select-none pointer-events-none">
                            {selectedSector.icon}
                        </div>

                        <div className="grid md:grid-cols-2 gap-10 relative z-10">
                            {/* Left: benefits */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-3xl">{selectedSector.icon}</span>
                                    <div>
                                        <p
                                            className="text-[10px] font-black uppercase tracking-[0.3em] mb-0.5"
                                            style={{ color: selectedSector.accentColor }}
                                        >
                                            For {selectedSector.label}
                                        </p>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                            {selectedSector.tagline}
                                        </h3>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {selectedSector.benefits.map((benefit, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08, duration: 0.35 }}
                                            className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5"
                                        >
                                            <CheckCircle
                                                size={14}
                                                className="shrink-0 mt-0.5"
                                                style={{ color: selectedSector.accentColor }}
                                            />
                                            <span className="text-xs text-slate-300 font-light leading-relaxed">{benefit}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: CTA */}
                            <div className="flex flex-col justify-between">
                                <div
                                    className="p-6 rounded-2xl border mb-6"
                                    style={{
                                        background: selectedSector.glowColor.replace("0.15", "0.08"),
                                        borderColor: selectedSector.borderColor.replace("0.3", "0.15"),
                                    }}
                                >
                                    <p className="text-xs font-black text-white uppercase tracking-widest mb-2">
                                        Ready to Experiment?
                                    </p>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                                        The Coralfil Formulator lets you model custom mineral blends, dosing schedules, and species-specific protocols — with AI-assisted precision.
                                    </p>
                                </div>

                                <motion.a
                                    href="https://os.coralfil.com/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="relative group/cta w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-[#010307] transition-all duration-300 overflow-hidden"
                                    style={{
                                        background: `linear-gradient(135deg, ${selectedSector.accentColor}, ${selectedSector.accentColor}cc)`,
                                        boxShadow: `0 0 30px ${selectedSector.glowColor}, 0 4px 20px rgba(0,0,0,0.4)`,
                                    }}
                                >
                                    <span className="relative z-10">{selectedSector.cta}</span>
                                    <ArrowUpRight size={16} className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                                    {/* Shimmer sweep */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
                                </motion.a>

                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest text-center mt-4">
                                    No account needed to explore
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Prompt when nothing selected */}
            {!selected && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-[11px] text-slate-600 font-bold uppercase tracking-[0.3em] pt-2"
                >
                    ↑ Select a tile above to see your Coralfil path
                </motion.p>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN HOME CLIENT COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function HomeClient() {
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
                        {/* Deterministic particle positions — no Math.random to prevent hydration mismatch */}
                        {[12, 34, 56, 78, 23, 67].map((seed, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-[#00D9C0]/40 blur-[1px] animate-float-particle"
                                style={{
                                    left: `${seed}%`,
                                    top: `${(seed * 7 + 13) % 90}%`,
                                    animationDuration: `${8 + i * 3}s`,
                                    animationDelay: `${i * 1.5}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,3,7,0.9)_100%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010307]/50 to-[#010307]"></div>
                </div>

                <HeroSlider />

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
                                    Coralstick™ Smart Pellet
                                </h3>
                                <p className="text-sm text-[#FF6B6B] font-bold uppercase tracking-widest mb-4">Precision Encapsulation</p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                    Our patented ocean-safe slow-release encapsulation technology enables targeted delivery of nutrients and prebiotics. Using AlphaFold 3 and NVIDIA BioNeMo, we optimize molecular binding specifically for coral mucus geochemistry.
                                </p>
                                <div className="space-y-3">
                                    {[
                                        "Optimized via AlphaFold 3 / BioNeMo",
                                        "Patented slow-release slow decay support",
                                        "Species-specific ionic binding (+20 to +40 mV)",
                                        "Protects against heat, acidification & parasites"
                                    ].map((fact, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                            <CheckCircle size={14} className="text-[#FF6B6B]" />
                                            <span className="text-xs text-slate-300">{fact}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 rounded-3xl border border-[#00D9C0]/20 bg-gradient-to-br from-[#00D9C0]/5 to-transparent">
                                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">How it works</h4>
                                <p className="text-xs text-slate-400 mb-4 font-light">Watch how the pellets find the coral and help it get its color back!</p>
                                <CoralStickAnimation />
                            </div>
                            <div className="p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Coraltex™ Sea Bricks</h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">
                                    Biomimetic-inspired artificial reef & seabed system. Perfected for coral larvae attraction, settlement, and structural support. Engineered to dissipate wave energy and manage sedimentation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHO ARE YOU — VISITOR SELECTOR */}
            <section className="py-32 bg-[#02060c] border-y border-white/5 relative overflow-hidden" id="who-you-are">
                {/* Ambient background pulse */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00D9C0]/4 blur-[140px] animate-pulse-slow" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D9C0]/10 border border-[#00D9C0]/20 mb-8">
                            <Droplets size={14} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Who Are You?</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            Find Your <br />
                            <span className="text-primary brightness-125">Coralfil Path.</span>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
                            Select the role that best describes you. We'll show you exactly how Coralfil transforms your world.
                        </p>
                    </div>

                    <VisitorSelector />
                </div>
            </section>

            {/* 4. FINAL CTA & CONTACT */}
            <section className="py-40 bg-[#010307] relative overflow-hidden">
                {/* Floating Background Icons (Subtle) */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                    {VISITOR_SECTORS.map((sector, i) => (
                        <motion.div
                            key={sector.id}
                            className="absolute text-6xl"
                            initial={{ 
                                x: (i * 22 + 8) + "%", 
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
                            {sector.icon}
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
                            <a href="mailto:hello@coralfil.com" className="flex items-center gap-4 px-10 py-5 bg-[#00D9C0] text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,217,192,0.3)]">
                                <Mail size={18} />
                                Email Us @ hello@coralfil.com
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

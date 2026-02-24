"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/components/motion-client";
import { ChevronRight, ChevronLeft, X, Play, Globe, Box, Zap, Heart } from "lucide-react";

const STEPS = [
    {
        title: "Welcome to ReefMaker AI",
        description: "Our neural simulation engine is designed to architect resilient coral ecosystems. Let's walk through your localized restoration environment.",
        icon: <Play className="text-[#00D9C0]" size={32} />,
        target: "welcome"
    },
    {
        title: "Regional Intelligence",
        description: "Access real-time NOAA and Allen Coral Atlas data. View thermal stress, regional diseases, and site-specific biodiversity in the Sidebar.",
        icon: <Globe className="text-[#00D9C0]" size={32} />,
        target: "sidebar"
    },
    {
        title: "The Helix Pyramid™",
        description: "Architect your reef using our proprietary double-helix structural units. Configure volume and structural integrity in the Configuration panel.",
        icon: <Box className="text-[#00D9C0]" size={32} />,
        target: "technology"
    },
    {
        title: "Neural Simulation",
        description: "Run growth simulations and stress tests before physically deploying C-Bricks. Predict success rates over a 10-year horizon.",
        icon: <Zap className="text-[#00D9C0]" size={32} />,
        target: "simulate"
    },
    {
        title: "Technical Inquiries",
        description: "Once your parameters are set, submit your configuration for technical vetting. Our biological engineering team reviews all early-access requests.",
        icon: <Heart className="text-[#00D9C0]" size={32} />,
        target: "inquiry"
    }
];

export function OnboardingJourney() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem("reefmaker-onboarding-v2");
        if (!hasSeenOnboarding) {
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleComplete = () => {
        localStorage.setItem("reefmaker-onboarding-v2", "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-md w-full glass-panel bg-[#010307] border border-white/10 rounded-[2rem] p-10 relative overflow-hidden shadow-2xl"
            >
                {/* Background Decor */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00D9C0]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FF6B6B]/5 rounded-full blur-3xl pointer-events-none" />

                <button
                    onClick={handleComplete}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="relative z-10 space-y-8">
                    <div className="flex justify-center">
                        <motion.div
                            key={currentStep}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center"
                        >
                            {STEPS[currentStep].icon}
                        </motion.div>
                    </div>

                    <div className="text-center space-y-3">
                        <div className="text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.4em]">Step {currentStep + 1} of {STEPS.length}</div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{STEPS[currentStep].title}</h3>
                        <p className="text-sm text-slate-400 font-light leading-relaxed">
                            {STEPS[currentStep].description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex gap-2">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-[#00D9C0]' : 'w-2 bg-white/10'}`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-3">
                            {currentStep > 0 && (
                                <button
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    className="p-3 rounded-xl border border-white/5 bg-white/5 text-white hover:bg-white/10 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    if (currentStep < STEPS.length - 1) {
                                        setCurrentStep(prev => prev + 1);
                                    } else {
                                        handleComplete();
                                    }
                                }}
                                className="px-8 py-3 rounded-xl bg-[#00D9C0] text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-lg shadow-[#00D9C0]/20 hover:bg-[#00f2ff] transition-all"
                            >
                                {currentStep === STEPS.length - 1 ? "Start Experience" : "Continue"}
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

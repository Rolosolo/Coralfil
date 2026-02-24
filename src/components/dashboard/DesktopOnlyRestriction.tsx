"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Smartphone, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "@/components/motion-client";

export function DesktopOnlyRestriction({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!isMounted) return null;

    if (isMobile) {
        return (
            <div className="fixed inset-0 z-[100] bg-[#02060c] flex flex-col items-center justify-center p-8 text-center">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary-dark/10 blur-[100px] rounded-full"></div>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 max-w-md"
                >
                    <div className="w-20 h-20 bg-primary/20 rounded-[32px] flex items-center justify-center text-primary mx-auto mb-8 border border-primary/30 shadow-[0_0_40px_rgba(0,217,192,0.2)]">
                        <Monitor size={40} />
                    </div>

                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                        Desktop Access <span className="text-primary">Required</span>
                    </h1>

                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                        The ReefMaker™ AI Dashboard requires an immersive desktop environment for 3D simulations and high-precision formulation analysis. Mobile support is currently in development.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-primary text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                        >
                            <ArrowLeft size={16} />
                            Return to Mission Control
                        </Link>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-black uppercase tracking-widest mt-4">
                            <AlertTriangle size={12} className="text-orange-500" />
                            Optimization Layer Active
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}

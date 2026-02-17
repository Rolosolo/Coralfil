"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";

const LOG_MESSAGES = [
    "Analyzing bathymetric data...",
    "Correlating species-substrate affinity...",
    "Synthesizing wave energy drag coefficients...",
    "Warning: Salinity spike detected in Sector B.",
    "Optimizing pore geometry for CaCO3 synthesis.",
    "AI Recommendation: Incrase structural density by 14%.",
    "Context7::Retrieving local species behavior patterns...",
    "Simulation: 98.4% success rate for Acropora recruitment."
];

export default function StatusLog() {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < LOG_MESSAGES.length) {
                setLogs((prev) => [...prev, LOG_MESSAGES[index]]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel rounded-xl border border-white/10 bg-black/40 overflow-hidden flex flex-col h-full">
            <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-primary" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">ReefMaker AI :: Log</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            </div>
            <div
                ref={scrollRef}
                className="p-4 flex-grow overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-hide"
            >
                {logs.map((log, i) => (
                    <div key={i} className={`${log.includes("Warning") ? "text-orange-400" : log.includes("Context7") ? "text-blue-400" : "text-green-500/80"}`}>
                        <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                        {log}
                    </div>
                ))}
                {logs.length < LOG_MESSAGES.length && (
                    <div className="flex items-center gap-1">
                        <span className="text-primary animate-pulse">_</span>
                    </div>
                )}
            </div>
        </div>
    );
}

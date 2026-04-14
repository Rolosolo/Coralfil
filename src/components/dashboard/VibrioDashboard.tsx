"use client";

import React, { useEffect, useState } from "react";
import { 
    ShieldAlert, 
    Thermometer, 
    TrendingUp, 
    DollarSign, 
    Activity, 
    MapPin, 
    AlertTriangle,
    CheckCircle2,
    BarChart3,
    Microscope,
    Waves
} from "lucide-react";
import { motion } from "framer-motion";
import { dataService } from "@/lib/data-service";
import { VibrioRiskScore, MortalityEvent } from "@/lib/demo-data";

export default function VibrioDashboard() {
    // Custom styles for the bioluminescent feel
    const dashboardStyles = `
        @keyframes pulse-slow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.15); }
        }
        .animate-pulse-slow {
            animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
    `;

    const [riskScores, setRiskScores] = useState<VibrioRiskScore[]>([]);
    const [mortalityEvents, setMortalityEvents] = useState<MortalityEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const [scores, events] = await Promise.all([
                dataService.getVibrioRiskScores(),
                dataService.getMortalityEvents()
            ]);
            setRiskScores(scores);
            setMortalityEvents(events);
            setLoading(false);
        }
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Activity className="animate-spin text-primary" size={48} />
                    <p className="text-primary font-bold tracking-widest uppercase text-xs">Synchronizing Sentinel Feed...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/20 rounded-2xl border border-primary/40 shadow-[0_0_30px_rgba(0,217,192,0.2)]">
                            <ShieldAlert className="text-primary" size={28} />
                        </div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Vibrio Alert System v2.4</p>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40 leading-none">
                        Vibrio Check - Regional Sentinel
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                        Real-time mortality surveillance and environmental telemetry for BC shellfish aquaculture. 
                        Targeting high-risk zones for CoralFil VR deployment.
                    </p>
                </div>
                
                <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                        <Activity size={16} />
                        Export Sentinel Report
                    </button>
                    <button className="px-6 py-3 rounded-2xl bg-primary text-black text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(0,217,192,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                        <TrendingUp size={16} />
                        Initiate Alert Sequence
                    </button>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Regional Risk Index", value: "8.4", unit: "CRITICAL", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/20" },
                    { label: "Avg. Temp (ONC)", value: "14.2°C", unit: "+2.1°C vs Baseline", icon: Thermometer, color: "text-orange-300", bg: "bg-orange-300/20" },
                    { label: "Mortality Impact", value: "24.5%", unit: "Avg. Seasonal Loss", icon: TrendingUp, color: "text-primary", bg: "bg-primary/20" },
                    { label: "Economic Exposure", value: "$4.2M", unit: "Est. Seasonal Risk", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/20" }
                ].map((stat, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
                    >
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 ${stat.bg} rounded-2xl border border-white/5`}>
                                    <stat.icon size={20} className={stat.color} />
                                </div>
                                <Activity size={16} className="text-white/10" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-white">{stat.value}</span>
                                    <span className={`text-[10px] font-bold ${stat.color}`}>{stat.unit}</span>
                                </div>
                            </div>
                        </div>
                        {/* Interactive Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area: Map & Market logic */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Central Visual: Interactive Heatmap (Placeholder) */}
                <div className="lg:col-span-2 rounded-[3rem] bg-[#02060c] border border-white/10 relative overflow-hidden min-h-[500px]">
                    <div className="absolute top-8 left-8 z-10 space-y-2">
                        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,217,192,0.8)]"></div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Live Sentinel Feed - Baynes Sound / Sunshine Coast</span>
                        </div>
                    </div>
                    
                    {/* Placeholder Map Visual */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <div className="relative w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8a9b746f5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale contrast-125 brightness-50">
                            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
                            <div className="absolute inset-0 bg-[#010307]/40 mix-blend-multiply"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4 z-10">
                        <div className="p-5 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10">
                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Primary Pathogen</p>
                            <p className="text-sm font-black text-white">Vibrio parahaemolyticus</p>
                        </div>
                        <div className="p-5 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10">
                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Virulence Markers</p>
                            <p className="text-sm font-black text-white">tdh / trh Detected (92%)</p>
                        </div>
                        <div className="p-5 rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10">
                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Treatment Vector</p>
                            <p className="text-sm font-black text-primary">CoralFil VR Formulation C3</p>
                        </div>
                    </div>

                    {/* Alert Indicators on Map Overlay */}
                    <div className="absolute top-1/2 left-1/3 p-4 bg-red-500/20 backdrop-blur-lg border border-red-500/40 rounded-full animate-pulse-slow">
                        <MapPin className="text-red-500" size={24} />
                    </div>
                    <div className="absolute top-1/4 right-1/4 p-3 bg-orange-500/20 backdrop-blur-lg border border-orange-500/40 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}>
                        <MapPin className="text-orange-500" size={20} />
                    </div>
                    <div className="absolute bottom-1/3 right-1/2 p-3 bg-primary/20 backdrop-blur-lg border border-primary/40 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}>
                        <MapPin className="text-primary" size={20} />
                    </div>
                </div>

                {/* Market Opportunity Widget */}
                <div className="flex flex-col gap-6">
                    <div className="p-8 rounded-[3rem] bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 relative overflow-hidden h-full">
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <Activity className="text-primary" size={24} />
                                <h3 className="text-lg font-black tracking-tight text-white uppercase">Market Integration</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span>Target Mortality Reduction</span>
                                        <span className="text-primary">85%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/10">
                                        <div className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(0,217,192,0.4)]" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Calculated Outcome Settings</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                                            <p className="text-[9px] font-medium text-slate-500 mb-1">Efficacy Rate</p>
                                            <p className="text-sm font-black text-white">94.2%</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                                            <p className="text-[9px] font-medium text-slate-500 mb-1">System Cost</p>
                                            <p className="text-sm font-black text-white">$14.2k</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 rounded-3xl bg-primary text-black space-y-4 shadow-[0_0_40px_rgba(0,217,192,0.2)]">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Estimated ROI</p>
                                        <p className="text-3xl font-black">426%</p>
                                    </div>
                                    <div className="pt-4 border-t border-black/10 flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold">Additional Revenue</span>
                                            <span className="text-xs font-black">+$842k / Season</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold">Payload Requirement</span>
                                            <span className="text-xs font-black">2.4 Tonnes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Prioritization Table */}
            <div className="rounded-[3rem] bg-white/[0.02] border border-white/10 overflow-hidden">
                <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="text-primary" size={20} />
                            <h2 className="text-xl font-black tracking-tight text-white uppercase">Pilot Trial Prioritization Engine</h2>
                        </div>
                        <p className="text-xs text-slate-500 font-medium tracking-tight">Analytics sourced from DFO Mortality Registry & ONC Sentinel Sensors</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl flex items-center gap-2">
                            <MapPin size={14} className="text-slate-500" />
                            <select className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest outline-none text-slate-300">
                                <option>All BC Regions</option>
                                <option>Baynes Sound</option>
                                <option>Sunshine Coast</option>
                                <option>Barkley Sound</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10">Farm Unit</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10">Region</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10 text-center">Mortality Index</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10 text-center">Temp Trend</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10 text-right">Economic Loss</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10 text-right">Priority Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {riskScores.map((row, i) => (
                                <tr key={i} className="group hover:bg-white/[0.02] transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                                <Microscope size={14} className="text-white/40 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-white group-hover:text-primary transition-all">{row.farm_name}</span>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{row.primary_species}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[11px] font-bold text-slate-400 capitalize">{row.region}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`text-[13px] font-black ${row.avg_mortality_percent > 30 ? 'text-red-400' : 'text-orange-400'}`}>
                                                {row.avg_mortality_percent.toFixed(1)}%
                                            </span>
                                            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${row.avg_mortality_percent > 30 ? 'bg-red-400' : 'bg-orange-400'} rounded-full`} 
                                                    style={{ width: `${row.avg_mortality_percent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <TrendingUp size={14} className="text-red-400" />
                                            <span className="text-[11px] font-mono text-slate-400">+2.4°C</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="text-[13px] font-mono font-bold text-slate-300">
                                            ${(row.total_economic_loss_cad / 1000).toFixed(0)}k
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                                            row.risk_score > 500000 
                                            ? 'bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                                            : 'bg-primary/10 border-primary/40 text-primary shadow-[0_0_15px_rgba(0,217,192,0.2)]'
                                        }`}>
                                            {row.risk_score > 500000 ? 'HIGHEST-NEED' : 'TIER-1 MONITOR'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-white/[0.01] border-t border-white/10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                            Critical Risk (&gt;30%)
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                            Elevated Threshold (10-30%)
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-3 py-1 hover:text-white transition-colors">Previous</button>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-white">
                            Page 1 of 12
                        </div>
                        <button className="px-3 py-1 hover:text-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Bottom Insight Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[3rem] bg-[#02060c] border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Waves className="text-primary" size={20} />
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Environmental Telemetry</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Source: ONC Web Services</span>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { station: "ONC Baynes Sound", parameter: "Temp", value: "15.4°C", status: "ABOVE-MEAN" },
                            { station: "ONC Sunshine Coast", parameter: "Salinity", value: "28.5 PSU", status: "STABLE" },
                            { station: "ONC Barkley Sound", parameter: "DO", value: "6.2 mg/L", status: "STRESS-THRESHOLD" }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-300">{log.station}</span>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{log.parameter} Deployment</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px] font-mono font-bold text-white">{log.value}</span>
                                    <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${
                                        log.status === 'STABLE' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-orange-500/30 text-orange-400 bg-orange-500/10'
                                    }`}>
                                        {log.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-[#02060c] border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-primary" size={20} />
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Sentience Reports</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Synopsis Feed</span>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-3">
                            <p className="text-[11px] leading-relaxed text-slate-300">
                                <span className="text-primary font-black uppercase tracking-widest mr-2">Core Pattern Identified:</span>
                                84% of high-mortality events correlated with sea-surface temperature spikes exceeding 14.5°C at the Baynes Sound ONC station. Molecular toolkit suggests 
                                <span className="text-primary font-bold mx-1">V. parahaemolyticus</span> expression is current driver.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <span className="text-[9px] font-bold text-primary uppercase">Reliability Index: 92%</span>
                                <span className="text-[9px] font-bold text-slate-500 uppercase underline cursor-pointer">View Research Data</span>
                            </div>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 shadow-inner">
                            <p className="text-[11px] leading-relaxed text-slate-500 italic">
                                "Predictive models suggest a 22% increase in Vibrio virulence for the upcoming week 16-23 April period. Immediate deployment of prebiotic consortium VR-C3 recommended for 4 target units."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

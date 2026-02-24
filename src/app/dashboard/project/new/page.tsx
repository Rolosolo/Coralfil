import { ArrowRight, MapPin, Target, Users, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "@/components/motion-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dataService } from "@/lib/data-service";

export default function NewProjectPage() {
    const [projectName, setProjectName] = useState("");
    const [isInitializing, setIsInitializing] = useState(false);
    const router = useRouter();

    const handleInitialize = () => {
        setIsInitializing(true);
        // Trigger Orchestration Hook
        dataService.triggerProjectInit(projectName || "sector-a4");

        // Simulate AI analysis delay
        setTimeout(() => {
            router.push("/dashboard/project/sector-a4/design");
        }, 2000);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">Initialize Restoration Vector</h1>
                <p className="text-slate-400 font-light">Define the site parameters to begin deep-sea neural analysis.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-8 rounded-[32px] border border-white/10 relative overflow-hidden"
            >
                <div className="grid gap-8 relative z-10">
                    {/* Project Name */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary uppercase tracking-widest">Project Internal Codename</label>
                        <input
                            type="text"
                            placeholder="e.g. Blue Horizon Alpha"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full bg-[#02060c]/60 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all font-mono"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={14} /> Site Coordinates (GPS)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Latitude: -14.672" className="w-full bg-[#02060c]/60 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all font-mono" />
                            <input type="text" placeholder="Longitude: 145.421" className="w-full bg-[#02060c]/60 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all font-mono" />
                        </div>
                    </div>

                    {/* Client & Species */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <Users size={14} /> Stakeholder Affinity
                            </label>
                            <select className="w-full bg-[#02060c]/60 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer">
                                <option>Select Client...</option>
                                <option>Marine Conservation Society</option>
                                <option>Six Senses Resorts</option>
                                <option>Government of Maldives</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <Target size={14} /> Primary Cultivar
                            </label>
                            <select className="w-full bg-[#02060c]/60 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer">
                                <option>Acropora cervicornis (Staghorn)</option>
                                <option>Acropora palmata (Elkhorn)</option>
                                <option>Orbicella annularis (Boulder)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button
                            disabled={isInitializing}
                            onClick={handleInitialize}
                            className="btn-premium bg-primary text-[#02060c] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,217,192,0.2)] disabled:opacity-50"
                        >
                            {isInitializing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Synchronizing...
                                </>
                            ) : (
                                <>
                                    Initialize Neural Scan
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>
            </motion.div>
        </div>
    );
}

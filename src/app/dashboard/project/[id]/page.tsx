import { Metadata } from 'next';
import { dataService } from '@/lib/data-service';
import { ArrowRight, Globe, Shield, Activity, Share2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from "@/components/motion-client";

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = await dataService.getProjectById(params.id);

    if (!project) {
        return { title: 'Project Not Found | ReefMaker AI' };
    }

    return {
        title: `${project.name} | Coralfill Synthesis`,
        description: `Biomimetic restoration design for ${project.location}. Managed by ${project.client}. Powered by Coralfill AI.`,
        openGraph: {
            title: `${project.name} Restoration Design`,
            description: `Exploring high-fidelity reef restoration at ${project.location}.`,
            images: ['/images/og-reef-reconstruction.jpg'], // Fallback to a premium generic image
        },
        twitter: {
            card: 'summary_large_image',
            title: project.name,
            description: `AI-driven restoration logic for ${project.location}.`,
        }
    };
}

export default async function ProjectPage({ params }: Props) {
    const project = await dataService.getProjectById(params.id);

    if (!project) return <div>Project not found.</div>;

    return (
        <div className="flex flex-col gap-12 p-8 md:p-12 max-w-7xl mx-auto min-h-screen bg-[#010307]">
            {/* Hero Header */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-[9px] font-black text-[#00D9C0] uppercase tracking-[0.3em] leading-none">Active Restoration Vector</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em]">UUID: {project.id.toUpperCase()}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-2xl">
                    {project.name}
                </h1>
                <div className="flex flex-wrap items-center gap-8 mt-2">
                    <div className="flex items-center gap-3 text-slate-500">
                        <Globe size={16} className="text-[#00D9C0]" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                        <Shield size={16} className="text-slate-700" />
                        <span className="text-[11px] font-bold uppercase tracking-widest">{project.client}</span>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Progress Card */}
                <div className="p-10 bg-white/[0.01] rounded-[2rem] border border-white/5 flex flex-col gap-8 backdrop-blur-3xl">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Project Phase</span>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00D9C0] animate-pulse"></div>
                            <span className="text-[10px] font-mono text-[#00D9C0] font-black uppercase tracking-widest">{project.status}</span>
                        </div>
                    </div>
                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-[#00D9C0]/30 to-[#00D9C0] rounded-full shadow-[0_0_15px_rgba(0,217,192,0.4)]"
                        ></motion.div>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-5xl font-mono font-black text-white tracking-tighter">{project.progress}%</span>
                        <span className="text-[9px] text-slate-700 font-black uppercase tracking-[0.2em] mb-2 font-mono">Neural Sync Confidence</span>
                    </div>
                </div>

                {/* Action Card */}
                <div className="md:col-span-2 p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem] flex flex-col justify-between items-start group relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                        <Activity size={180} className="text-[#00D9C0]" />
                    </div>
                    <div className="flex flex-col gap-5 relative z-10">
                        <div className="w-10 h-1 bg-[#00D9C0]"></div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Open Synthesis HUD</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] max-w-md leading-relaxed">
                            Access the CoralFil intelligence stack to refine substrate geometry and optimize biopolymer dispersal patterns.
                        </p>
                    </div>
                    <Link
                        href={`/dashboard/project/${project.id}/design`}
                        className="mt-12 px-10 py-5 bg-[#00D9C0] hover:bg-[#00f2ff] text-black rounded-xl flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_20px_40px_rgba(0,217,192,0.1)]"
                    >
                        Initialize HUD Designer
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Diversity Overview */}
            <div className="p-12 bg-white/[0.01] rounded-[2.5rem] border border-white/5 flex flex-col gap-10 backdrop-blur-3xl shadow-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Integrity Matrix</h3>
                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">Targeted bio-restoration cultivars</p>
                    </div>
                    <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all">
                        <Share2 size={14} />
                        Proprietary Snapshot
                    </button>
                </div>
                <div className="flex flex-wrap gap-4">
                    {project.targetSpecies.map(s => (
                        <div key={s} className="px-8 py-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4 group hover:border-[#00D9C0]/30 transition-all">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00D9C0] shadow-[0_0_8px_rgba(0,217,192,0.4)] group-hover:scale-125 transition-transform"></div>
                            <span className="text-[10px] font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                                {s.replace('sp_', '').replace('_', ' ')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

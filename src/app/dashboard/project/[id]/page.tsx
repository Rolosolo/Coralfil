import { Metadata } from 'next';
import { dataService } from '@/lib/data-service';
import { ArrowRight, Globe, Shield, Activity, Share2 } from 'lucide-react';
import Link from 'next/link';

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
        <div className="flex flex-col gap-12 p-12 max-w-7xl mx-auto">
            {/* Hero Header */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Active Project</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{project.id}</span>
                </div>
                <h1 className="text-5xl font-black text-white uppercase tracking-tight">{project.name}</h1>
                <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Globe size={16} className="text-primary" />
                        <span className="text-sm font-medium">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Shield size={16} className="text-secondary" />
                        <span className="text-sm font-medium">{project.client}</span>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Progress Card */}
                <div className="p-8 bg-white/[0.03] rounded-[48px] border border-white/10 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white uppercase tracking-widest">Project Phase</span>
                        <span className="text-xs font-mono text-primary font-bold uppercase">{project.status}</span>
                    </div>
                    <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-dark transition-all duration-1000"
                            style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-mono font-black text-white">{project.progress}%</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">Completion Matrix</span>
                    </div>
                </div>

                {/* Action Card */}
                <div className="md:col-span-2 p-8 bg-primary rounded-[48px] flex flex-col justify-between items-start group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                        <Activity size={120} className="text-black" />
                    </div>
                    <div className="flex flex-col gap-4 relative z-10">
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight">Open Synthesis HUD</h2>
                        <p className="text-black/70 font-medium max-w-md">Access the Coralfill Brain to tune substrate chemistry and biopolymer ratios for this specific environment.</p>
                    </div>
                    <Link
                        href={`/dashboard/project/${project.id}/design`}
                        className="mt-8 px-8 py-4 bg-black text-white rounded-full flex items-center gap-3 hover:scale-105 transition-all font-black uppercase tracking-widest text-xs"
                    >
                        Launch Designer
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Diversity Overview */}
            <div className="p-10 bg-white/[0.03] rounded-[48px] border border-white/10 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Target Species Matrix</h3>
                    <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                        <Share2 size={14} />
                        Share Project
                    </button>
                </div>
                <div className="flex flex-wrap gap-4">
                    {project.targetSpecies.map(s => (
                        <div key={s} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{s.replace('sp_', '').replace('_', ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

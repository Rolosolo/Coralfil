"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Target, Users } from "lucide-react";

export default function NewProjectPage() {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Initialize New Restoration Project</h1>
                <p className="text-slate-400">Define the site parameters to begin AI analysis.</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <div className="grid gap-6">
                    {/* Project Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Project Internal Codename</label>
                        <input type="text" placeholder="e.g. Blue Horizon Alpha" className="w-full bg-[#02060c] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <MapPin size={16} className="text-primary" /> Target Location (GPS)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Latitude" className="w-full bg-[#02060c] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" />
                            <input type="text" placeholder="Longitude" className="w-full bg-[#02060c] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50" />
                        </div>
                    </div>

                    {/* Client & Species */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Users size={16} className="text-primary" /> Client / Stakeholder
                            </label>
                            <select className="w-full bg-[#02060c] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50">
                                <option>Select Client...</option>
                                <option>Marine Conservation Society</option>
                                <option>Six Senses Resorts</option>
                                <option>Government of Maldives</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Target size={16} className="text-primary" /> Primary Species Target
                            </label>
                            <select className="w-full bg-[#02060c] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary/50">
                                <option>Acropora cervicornis (Staghorn)</option>
                                <option>Acropora palmata (Elkhorn)</option>
                                <option>Orbicella annularis (Boulder)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <Link href="/dashboard/project/123/design" className="btn-glow bg-primary text-[#02060c] px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                            Initialize AI Analysis
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

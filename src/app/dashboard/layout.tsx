"use client";

import React, { useState } from "react";
import { TopNav } from "@/components/dashboard/TopNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ThemeProvider } from "@/components/dashboard/ThemeController";
import { DesktopOnlyRestriction } from "@/components/dashboard/DesktopOnlyRestriction";
import { HelpManual } from "@/components/dashboard/HelpManual";
import { OnboardingJourney } from "@/components/dashboard/OnboardingJourney";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <ThemeProvider>
            <DesktopOnlyRestriction>
                <div className="flex flex-col h-screen overflow-hidden bg-[#010307] selection:bg-[#00D9C0]/30 text-slate-200">
                    {/* Bioluminescent Background Layer */}
                    <div className="fixed inset-0 bg-[#010307] pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D9C0]/5 blur-[120px] rounded-full animate-pulse-slow"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#00D9C0]/2 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <TopNav onHelpClick={() => setIsHelpOpen(true)} />

                    <div className="flex flex-1 overflow-hidden relative z-10">
                        <Sidebar />
                        <main className="flex-1 overflow-y-auto bg-transparent p-0 custom-scrollbar">
                            {children}
                        </main>
                    </div>

                    <HelpManual isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
                    <OnboardingJourney />
                </div>
            </DesktopOnlyRestriction>
        </ThemeProvider>
    );
}

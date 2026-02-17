"use client";

import { TopNav } from "@/components/dashboard/TopNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ThemeProvider } from "@/components/dashboard/ThemeController";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider>
            <div className="flex flex-col h-screen overflow-hidden bg-[#02060c] selection:bg-primary/30">
                {/* Bioluminescent Background Layer */}
                <div className="fixed inset-0 bg-[#02060c] pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary-dark/5 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                </div>

                <TopNav />
                <div className="flex flex-1 overflow-hidden relative z-10">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto bg-transparent p-8 custom-scrollbar">
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}

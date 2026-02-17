"use client";

import { PDFPreview } from "@/components/quote/PDFPreview";
import { QuoteSidebar } from "@/components/quote/QuoteSidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuotePage() {
    return (
        <div className="flex h-full -m-8 relative">
            {/* Main Content (PDF Preview) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100/50">
                {/* Toolbar */}
                <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-slate-900 font-bold text-lg leading-tight">Quote #CF-2025-8492</h1>
                            <p className="text-xs text-slate-500">Last saved 2 mins ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-2">View Mode:</span>
                        <button className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200 transition-colors">Web</button>
                        <button className="px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-900 text-xs font-medium shadow-sm">PDF Print</button>
                    </div>
                </div>

                {/* Scrollable Preview Area */}
                <div className="flex-1 overflow-y-auto p-8 flex justify-center">
                    <div className="w-full max-w-[850px]">
                        <PDFPreview />
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Quote Management) */}
            <QuoteSidebar />
        </div>
    );
}

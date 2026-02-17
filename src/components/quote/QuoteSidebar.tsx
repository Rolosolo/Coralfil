"use client";

import { Edit2, Mail, Phone, CheckCircle, Send, Download, Palette, MoreHorizontal, ChevronDown } from "lucide-react";
import { useState } from "react";

export function QuoteSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside className="w-[360px] min-h-full bg-white dark:bg-[#1a2c2e] border-l border-gray-200 dark:border-gray-700 flex flex-col shadow-sm shrink-0">
            {/* SECTION 1: Client Info */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Client Details</h3>
                    <button className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-50 dark:hover:bg-white/5">
                        <Edit2 size={16} />
                    </button>
                </div>
                <div className="flex items-start gap-4">
                    <div
                        className="h-12 w-12 shrink-0 rounded-full bg-cover bg-center border border-gray-100 dark:border-gray-700"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3mXgHKlIXL8ikyRR5zvl1wfuQZqtNtKR5cIJKSXAAyDpdBfz2dinBl8qPf-Ot8h2qAfI9_maYZOy1TkLWw7n_HnzNWwf5t55JdN1lJKQkkBsGMYmWAa7eBDuw8HubUo4ZvIPrzH8hVzgKToUTB3c_oTeraODLI6TRNvGVQCOpnZQrE1tN0Gze2AMYznOf0fuqIlwaO23RI3OW1Sd8r4XL9tT1IHT-Nz__CAiYKFfG4jmKdlkgnz7j0w9MZRTitzeRJW7SFgoj-BA')" }}
                    ></div>
                    <div className="flex flex-col">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight mb-1">Marine Conservation Society</h2>
                        <div className="text-gray-500 dark:text-gray-400 text-sm font-normal space-y-0.5">
                            <p className="flex items-center gap-1.5">
                                <Mail size={14} className="text-primary/70" />
                                sarah.jenkins@marine-cs.org
                            </p>
                            <p className="flex items-center gap-1.5">
                                <Phone size={14} className="text-primary/70" />
                                +44 20 7123 4567
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Status Badge */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700/50">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Status</h3>
                <div className="flex items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20">
                        <CheckCircle size={16} className="text-primary font-bold" />
                        <span className="text-sm font-bold text-primary tracking-wide">SENT</span>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">Updated 2h ago</span>
                </div>
            </div>

            {/* SECTION 3: Action Buttons */}
            <div className="p-6 space-y-3 border-b border-gray-100 dark:border-gray-700/50">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Actions</h3>
                <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all active:scale-[0.98]">
                    <Send size={18} />
                    Send to Client
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-transparent border border-primary text-primary hover:bg-primary/5 font-medium py-2.5 px-4 rounded-lg transition-all active:scale-[0.98]">
                    <Download size={18} />
                    Download PDF
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-transparent border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 font-medium py-2.5 px-4 rounded-lg transition-all active:scale-[0.98]">
                    <Palette size={18} />
                    Edit Design
                </button>
            </div>

            {/* SECTION 4: Activity Timeline */}
            <div className="p-6 flex-grow overflow-y-auto">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Activity Timeline</h3>
                <div className="relative pl-2">
                    {/* Vertical Line */}
                    <div className="absolute left-[7px] top-2 bottom-4 w-[2px] bg-gray-100 dark:bg-gray-700">
                        <div className="absolute left-0 top-0 w-full h-3/4 bg-gradient-to-b from-primary/50 to-primary"></div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="relative flex gap-4 items-start group">
                            <div className="relative z-10 w-4 h-4 rounded-full bg-white dark:bg-[#1a2c2e] border-2 border-primary shrink-0 mt-0.5"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-gray-200">Quote created</p>
                                <p className="text-xs text-gray-400 mt-0.5">Oct 24, 10:00 AM</p>
                            </div>
                        </div>
                        <div className="relative flex gap-4 items-start group">
                            <div className="relative z-10 w-4 h-4 rounded-full bg-white dark:bg-[#1a2c2e] border-2 border-primary shrink-0 mt-0.5"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-gray-200">Design approved</p>
                                <p className="text-xs text-gray-400 mt-0.5">Oct 25, 2:30 PM</p>
                            </div>
                        </div>
                        <div className="relative flex gap-4 items-start group">
                            <div className="relative z-10 w-4 h-4 rounded-full bg-primary shrink-0 mt-0.5 ring-4 ring-primary/20"></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Site surveyed</p>
                                <p className="text-xs text-primary font-medium mt-0.5">Oct 26, 9:15 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5: Internal Notes */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20 w-full mb-auto md:mb-0">
                <details className="group" open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-sm text-slate-900 dark:text-gray-200 select-none">
                        <span>Internal Notes</span>
                        <span className={`transition ${isOpen ? 'rotate-180' : ''}`}>
                            <ChevronDown size={16} className="text-gray-400" />
                        </span>
                    </summary>
                    <div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        <div className="relative">
                            <textarea
                                className="w-full min-h-[80px] text-sm p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1a2c2e] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none placeholder:text-gray-400 dark:text-gray-200 dark:text-white"
                                placeholder="Add a private note about this client or quote..."
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button className="text-xs font-medium text-primary hover:text-primary-dark">Save Note</button>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </aside>
    );
}

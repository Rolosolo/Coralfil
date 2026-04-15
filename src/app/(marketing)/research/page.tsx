import type { Metadata } from "next";
import { Suspense } from "react";
import {
    BookOpen,
    Shield,
    Flame,
    Crosshair,
    FileText,
    Download,
} from "lucide-react";
import GuideDownloadForm from "./GuideDownloadForm";

export const metadata: Metadata = {
    title: "Research",
    description:
        "Science for a Stronger Seafloor. Coralfil's research into immune support, climate resilience, and precision delivery for sessile marine species.",
    alternates: {
        canonical: "https://coralfil.com/research",
    },
};

// ─────────────────────────────────────────────────────────────
// DATA — no client bundle cost, rendered at build/request time
// ─────────────────────────────────────────────────────────────

const RESEARCH_PILLARS = [
    {
        icon: Shield,
        label: "Immune Support",
        body: "Microbiome stabilization helps organisms naturally resist diseases like Vibrio and POMS.",
        accent: "#00D9C0",
    },
    {
        icon: Flame,
        label: "Climate Resilience",
        body: 'Targeted supplemental interventions provide the "metabolic fuel" needed to survive extreme heat and acidifying waters.',
        accent: "#FF6B35",
    },
    {
        icon: Crosshair,
        label: "Precision Delivery",
        body: '"Slow-decay" systems keep nutrients on the seafloor, ensuring protection isn\'t lost to deep-sea currents.',
        accent: "#4ECAFF",
    },
];

const ARTICLES = [
    {
        id: "next-gen-monitoring",
        category: "Innovation Report",
        title: "Next-Gen Monitoring: Sensing the Seafloor in Real Time",
        description:
            "Coralfil's newest telemetry initiative couples in-situ biosensors with cloud-based analytics to track sessile-species health indicators—temperature, dissolved oxygen, and microbial load—at a per-farm resolution previously impossible.",
        date: "2026",
        readTime: "8 min read",
        href: "/research/pdfs/Coralfil_Innovation_Report_NextGen_Monitoring.pdf",
    },
    {
        id: "press-milestones-2026",
        category: "Press Release",
        title: "Coralfil 2026 Milestones: From Lab to Seafloor at Scale",
        description:
            "A summary of the key clinical benchmarks, regulatory filings, and commercial partnerships achieved in the first half of 2026 as Coralfil accelerates its path to market across BC shellfish operations.",
        date: "Apr 2026",
        readTime: "5 min read",
        href: "/research/pdfs/Coralfil_Press_Release_2026_Milestones.pdf",
    },
    {
        id: "ecology-of-closure",
        category: "White Paper",
        title: "The Ecology of Closure: Economic Risks of Sessile Species Loss",
        description:
            "A rigorous analysis of cascade failure in coastal aquaculture ecosystems when filter-feeding populations collapse—and what targeted nutritional interventions can do to arrest the cycle before regulatory closures occur.",
        date: "Mar 2026",
        readTime: "14 min read",
        href: "/research/pdfs/Coralfil_White_Paper_Ecology_of_Closure.pdf",
    },
    {
        id: "engineering-resilience",
        category: "Engineering Brief",
        title: "Engineering Resilience: CoralStick™ Cationic Polymer Nutrient Delivery",
        description:
            "A dual-track formulation and sourcing blueprint for CoralStick™—covering the polymer matrix design, release-kinetics modelling, and procurement strategy required to keep costs viable at commercial scale.",
        date: "Feb 2026",
        readTime: "18 min read",
        href: "/research/pdfs/Engineering_Resilience_CoralStick_Formulation.pdf",
    },
];

const CATEGORY_COLORS: Record<string, string> = {
    "Innovation Report": "#00D9C0",
    "Press Release": "#A78BFA",
    "White Paper": "#4ECAFF",
    "Engineering Brief": "#FF6B35",
};

// ─────────────────────────────────────────────────────────────
// PAGE (Server Component — zero extra JS weight for static UI)
// ─────────────────────────────────────────────────────────────

export default function ResearchPage() {
    return (
        <div className="flex-grow pt-28 pb-40 bg-[#010307]">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* ── HERO ─────────────────────────────────────────────── */}
                <header className="flex flex-col gap-5 mb-16 max-w-4xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00D9C0]/20 rounded-lg text-[#00D9C0]" aria-hidden="true">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-[10px] font-black text-[#00D9C0] uppercase tracking-[0.4em]">
                            Research &amp; Science
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                        Intelligence <br />
                        <span style={{ color: "#00D9C0" }} className="brightness-125">
                            Repository.
                        </span>
                    </h1>
                </header>

                {/* ── SCIENCE SECTION ──────────────────────────────────── */}
                <section
                    aria-label="Science for a Stronger Seafloor"
                    className="mb-28 rounded-[48px] border border-white/5 bg-white/[0.025] overflow-hidden"
                >
                    {/* top accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#00D9C0] via-[#4ECAFF] to-[#A78BFA]" />

                    <div className="p-10 md:p-16 space-y-10">
                        {/* headline + intro */}
                        <div className="max-w-3xl space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                                Science for a&nbsp;
                                <span style={{ color: "#00D9C0" }}>Stronger Seafloor</span>
                            </h2>
                            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
                                Coralfil focuses on the ocean&rsquo;s most vital but overlooked
                                residents—<strong className="text-white font-semibold">sessile species</strong>.
                                These &ldquo;anchored&rdquo; organisms, such as oysters, corals, and sponges, filter
                                our water and protect our coasts. Unlike mobile marine life, they cannot swim away
                                from rising temperatures or shifting ocean chemistry.
                            </p>
                            <p className="text-base md:text-lg text-slate-300 font-light leading-relaxed">
                                Advanced research at Coralfil helps these vital species survive. The development of
                                ocean-safe, time-released nutrition strengthens marine life from the inside out.
                                Current research initiatives target three key areas:
                            </p>
                        </div>

                        {/* three pillars */}
                        <ul className="grid md:grid-cols-3 gap-6 list-none p-0 m-0">
                            {RESEARCH_PILLARS.map(({ icon: Icon, label, body, accent }) => (
                                <li
                                    key={label}
                                    className="p-7 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4"
                                    style={{ borderTopColor: accent, borderTopWidth: 2 }}
                                >
                                    <div
                                        className="p-2.5 rounded-xl w-fit"
                                        style={{ backgroundColor: `${accent}22` }}
                                        aria-hidden="true"
                                    >
                                        <Icon size={22} style={{ color: accent }} />
                                    </div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                        {label}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-light">{body}</p>
                                </li>
                            ))}
                        </ul>

                        {/* closing statement */}
                        <blockquote className="border-l-2 border-[#00D9C0]/40 pl-6 text-slate-300 text-base md:text-lg font-light leading-relaxed italic max-w-3xl">
                            As Canada&rsquo;s first biotech firm dedicated exclusively to the seafloor, Coralfil is
                            building the natural infrastructure required to keep our oceans healthy and resilient.
                        </blockquote>
                    </div>
                </section>

                {/* ── ARTICLE GRID + SIDEBAR ───────────────────────────── */}
                <div className="grid lg:grid-cols-3 gap-12 mb-32">

                    {/* Articles */}
                    <div className="lg:col-span-2 space-y-12">
                        {ARTICLES.map((article) => {
                            const accentColor = CATEGORY_COLORS[article.category] ?? "#00D9C0";
                            return (
                                <article
                                    key={article.id}
                                    className="group flex flex-col md:flex-row gap-8 items-start"
                                >
                                    {/* icon tile */}
                                    <div
                                        className="w-full md:w-56 h-40 rounded-3xl shrink-0 border border-white/10 flex items-center justify-center"
                                        style={{ background: `${accentColor}0d` }}
                                        aria-hidden="true"
                                    >
                                        <FileText size={48} style={{ color: accentColor, opacity: 0.6 }} />
                                    </div>

                                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                                        {/* meta row */}
                                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-widest">
                                            <span
                                                className="px-2.5 py-1 rounded-full font-black text-black"
                                                style={{ backgroundColor: accentColor }}
                                            >
                                                {article.category}
                                            </span>
                                            <span className="text-slate-500">{article.date}</span>
                                            <span className="text-slate-600">·</span>
                                            <span className="text-slate-500">{article.readTime}</span>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-[#00D9C0] transition-colors leading-tight">
                                            {article.title}
                                        </h2>

                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            {article.description}
                                        </p>

                                        <a
                                            href={article.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-1 text-[10px] font-black uppercase tracking-widest text-[#00D9C0] hover:gap-4 transition-all"
                                            aria-label={`Read ${article.title}`}
                                        >
                                            Read Paper
                                            <Download size={13} />
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Sidebar — sticky, no JS */}
                    <aside>
                        <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-8 sticky top-32">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                Research Areas
                            </h3>
                            <ul className="space-y-3 list-none p-0 m-0">
                                {[
                                    "Sessile Species Biology",
                                    "Microbiome Stabilization",
                                    "Polymer Nutrient Delivery",
                                    "Thermal Stress Interventions",
                                    "Ocean Acidification Defense",
                                ].map((cat) => (
                                    <li
                                        key={cat}
                                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs font-bold uppercase tracking-widest text-slate-400"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9C0]/60 shrink-0" aria-hidden="true" />
                                        {cat}
                                    </li>
                                ))}
                            </ul>

                            {/* Canada's first badge */}
                            <div className="pt-6 border-t border-white/5">
                                <div className="p-5 rounded-3xl bg-[#00D9C0]/5 border border-[#00D9C0]/15 space-y-3">
                                    <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[#00D9C0]">
                                        Canada&rsquo;s First
                                    </p>
                                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                                        Biotech firm dedicated exclusively to seafloor sessile
                                        species health &amp; resilience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* ── GUIDE DOWNLOAD BANNER ─────────────────────────────── */}
                <section
                    aria-label="BC Shellfish Grower's Survival Guide 2026"
                    className="relative rounded-[60px] bg-gradient-to-br from-[#00D9C0]/10 via-transparent to-[#4ECAFF]/5 border border-[#00D9C0]/20 overflow-hidden"
                >
                    {/* decorative bg glyph */}
                    <div className="absolute top-0 right-0 p-10 opacity-[0.04] pointer-events-none select-none" aria-hidden="true">
                        <svg width="360" height="360" viewBox="0 0 24 24" fill="currentColor" className="text-[#00D9C0]">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-10 md:p-16 items-center">
                        {/* left copy */}
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00D9C0] rounded-full text-black text-[10px] font-black uppercase tracking-widest">
                                New Guide · 2026
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                BC Shellfish Grower&rsquo;s <br />
                                <span style={{ color: "#00D9C0" }}>Survival Guide 2026</span>
                            </h2>
                            <p className="text-base text-slate-300 font-light leading-relaxed max-w-lg">
                                The definitive operational resilience playbook for BC shellfish
                                producers—covering Vibrio risk windows, intervention timing, climate
                                heat thresholds, and Coralfil nutrient delivery protocols for your
                                operation.
                            </p>
                        </div>

                        {/* right — email gate form, lazy loaded */}
                        <Suspense
                            fallback={
                                <div className="h-52 rounded-3xl bg-white/5 animate-pulse" />
                            }
                        >
                            <GuideDownloadForm />
                        </Suspense>
                    </div>
                </section>

            </div>
        </div>
    );
}

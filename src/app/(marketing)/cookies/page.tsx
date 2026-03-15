import Link from "next/link";

export default function CookiePolicyPage() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black text-white uppercase tracking-tight">Cookie Policy</h1>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Effective Date: March 14, 2026</p>
            </header>

            <section className="prose prose-invert prose-slate max-w-none">
                <p className="text-lg text-slate-300 leading-relaxed">
                    This Policy explains how Coralfil uses cookies and similar technologies to enhance your experience on the ReefMaker™ platform.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">1. What are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device that help us remember your preferences, such as your selected project location, dashboard theme, and species selection matrix.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">2. Types of Cookies We Use</h2>
                <ul className="list-disc pl-6 space-y-4 text-slate-400">
                    <li>
                        <strong>Essential Cookies:</strong> Required for the Neural Stack to function, including session management and security.
                    </li>
                    <li>
                        <strong>Performance Cookies:</strong> We use Vercel Analytics and Speed Insights to monitor platform stability and design loading times.
                    </li>
                    <li>
                        <strong>Preference Cookies:</strong> Remember your dashboard configuration and regional spatial intelligence settings.
                    </li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">3. Consent in Canada</h2>
                <p>
                    Under Canadian law, we utilize implied consent for essential and performance-enhancing cookies that do not collect sensitive personal information. You can adjust your browser settings to block cookies, though some features of the ReefMaker™ design suite may become unavailable.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">4. Third-Party Technologies</h2>
                <p>
                    We leverage industry-standard spatial data layers (ACA, NOAA) and cloud infrastructure (Vercel, Supabase). These partners may utilize their own tracking technologies as part of their service delivery.
                </p>
            </section>
            
            <footer className="pt-12 border-t border-white/5">
                <Link href="/" className="text-sm font-bold text-primary hover:underline">← Back to Overview</Link>
            </footer>
        </main>
    );
}

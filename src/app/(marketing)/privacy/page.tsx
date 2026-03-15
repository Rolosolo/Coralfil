import Link from "next/link";

export default function PrivacyPage() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black text-white uppercase tracking-tight">Privacy Policy</h1>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Effective Date: March 14, 2026</p>
            </header>

            <section className="prose prose-invert prose-slate max-w-none">
                <p className="text-lg text-slate-300 leading-relaxed">
                    At Coralfil Inc. ("Coralfil"), we are committed to protecting the privacy and security of your personal information. As a company operating out of North Cowichan, British Columbia, we adhere to the <strong>Personal Information Protection Act (PIPA)</strong> of British Columbia.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
                <p>
                    We collect personal information necessary to provide our reef restoration services, satellite-linked spatial data, and design consultation through the ReefMaker™ platform. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-400">
                    <li>Contact information (name, email, institutional affiliation).</li>
                    <li>Technical data (IP addresses, neural stack synchronization logs).</li>
                    <li>Geospatial coordinates related to project planning.</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">2. Purpose of Collection</h2>
                <p>
                    We collect information to authenticate users for the Reefmaker AI™ design interface, fulfill Coraltex Sea Bricks (C-Bricks)™ manufacturing orders, and ensure compliance with international maritime and restoration regulations.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">3. Consent</h2>
                <p>
                    By using our platform, you provide implied consent for the collection of data necessary for site analysis. For marketing or secondary uses, we will obtain explicit opt-in consent as required under BC PIPA.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">4. Storage and Security</h2>
                <p>
                    Your data is stored securely using encrypted cloud infrastructure. While we leverage global services, we prioritize data residency considerations aligned with Canadian privacy standards.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">5. Access and Correction</h2>
                <p>
                    You have the right to request access to the personal information we hold about you. Please contact our <strong>Privacy Officer</strong> at <code>legal@coralfil.com</code> to initiate a request or report a correction.
                </p>

                <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-sm text-slate-400 italic">
                        Coralfil Inc. <br />
                        Attn: Privacy Officer <br />
                        North Cowichan, BC, Canada
                    </p>
                </div>
            </section>
            
            <footer className="pt-12 border-t border-white/5">
                <Link href="/" className="text-sm font-bold text-primary hover:underline">← Back to Overview</Link>
            </footer>
        </main>
    );
}

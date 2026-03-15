import Link from "next/link";

export default function TermsPage() {
    return (
        <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-12">
            <header className="space-y-4">
                <h1 className="text-4xl font-black text-white uppercase tracking-tight">Terms of Use</h1>
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Effective Date: March 14, 2026</p>
            </header>

            <section className="prose prose-invert prose-slate max-w-none">
                <p className="text-lg text-slate-300 leading-relaxed">
                    Welcome to Coralfil Inc. By accessing our platform, you agree to comply with the following terms and conditions, which are governed by the laws of <strong>British Columbia, Canada</strong>.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">1. Use of Design Intellectual Property</h2>
                <p>
                    All designs generated within the Reefmaker AI™ platform, including Coraltex Sea Bricks (C-Bricks)™ structural schematics and Coralstick Smart Pellet™ ionic formulations, are the intellectual property of Coralfil Inc. unless otherwise specified in a separate manufacturing agreement.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">2. Spatial Data Integration</h2>
                <p>
                    User-submitted coordinates and site analysis data are processed via the Allen Coral Atlas and NOAA integration layers. Users are responsible for ensuring they have the legal right to design and deploy restoration units at the specified locations.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">3. Limitation of Liability</h2>
                <p>
                    Coralfil Inc. provides design tools for ecological restoration. We are not liable for environmental outcomes, structural failures due to incorrect parameters, or regulatory changes in local maritime jurisdictions.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">4. Governing Law</h2>
                <p>
                    Any disputes arising from the use of this platform shall be settled in the courts of the Province of British Columbia.
                </p>

                <h2 className="text-xl font-bold text-white mt-12 mb-4">5. Account Termination</h2>
                <p>
                    We reserve the right to suspend access to the Neural Stack if a user is found to be utilizing our technology for harmful environmental practices or violating international reef protection treaties.
                </p>
            </section>
            
            <footer className="pt-12 border-t border-white/5">
                <Link href="/" className="text-sm font-bold text-primary hover:underline">← Back to Overview</Link>
            </footer>
        </main>
    );
}

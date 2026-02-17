import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background-dark border-t border-white/5 py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-white">
                    <span className="text-primary font-bold text-lg">◎</span>
                    <span className="font-bold text-lg">CoralFil</span>
                </div>
                <div className="flex gap-8 text-sm text-slate-500">
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    <Link href="mailto:info@coralfill.com" className="hover:text-primary transition-colors">Contact</Link>
                </div>
                <div className="text-sm text-slate-600">
                    © 2024 CoralFil Inc.
                </div>
            </div>
        </footer>
    );
}

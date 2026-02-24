import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background-dark border-t border-white/5 py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 text-white">
                    <div className="size-5 rounded-sm bg-primary/10 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                            <polygon points="9,1 16.5,5 16.5,13 9,17 1.5,13 1.5,5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg">
                        CoralFi<span className="logo-dotted-l">l</span>
                    </span>
                </div>
                <div className="flex gap-8 text-sm text-slate-500">
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                    <Link href="mailto:info@coralfill.com" className="hover:text-primary transition-colors">Contact</Link>
                </div>
                <div className="text-sm text-slate-600">
                    © 2026 CoralFil
                </div>
            </div>
        </footer>
    );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | CoralFil",
    description: "Terms and conditions for using CoralFil's ReefMaker AI platform and restoration services.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#02060c] text-white pt-24 px-6 flex items-center justify-center">
            <div className="max-w-2xl text-center">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p className="text-slate-400">This is a demo environment for demonstration purposes only.</p>
            </div>
        </div>
    );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | CoralFil",
    description: "CoralFil's commitment to data privacy and security in marine restoration technology.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#02060c] text-white pt-24 px-6 flex items-center justify-center">
            <div className="max-w-2xl text-center">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-slate-400">This is a demo environment. No real data is collected.</p>
            </div>
        </div>
    );
}

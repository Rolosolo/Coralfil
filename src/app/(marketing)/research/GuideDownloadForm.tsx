"use client";

import { useState } from "react";
import { Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function GuideDownloadForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setState("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/guide-download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error ?? "Something went wrong.");
            }

            setState("success");
            // trigger download
            const a = document.createElement("a");
            a.href = "/bc-shellfish-growers-survival-guide-2026.pdf";
            a.download = "BC-Shellfish-Growers-Survival-Guide-2026.pdf";
            a.click();
        } catch (err: unknown) {
            setState("error");
            setErrorMsg(err instanceof Error ? err.message : "Please try again.");
        }
    }

    if (state === "success") {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-[#00D9C0]/10 border border-[#00D9C0]/30 text-center">
                <CheckCircle size={40} className="text-[#00D9C0]" />
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    Your Guide is Downloading
                </h3>
                <p className="text-sm text-slate-400 font-light">
                    Thank you, {name.split(" ")[0]}! If the download didn&rsquo;t start,{" "}
                    <a
                        href="/bc-shellfish-growers-survival-guide-2026.pdf"
                        download="BC-Shellfish-Growers-Survival-Guide-2026.pdf"
                        className="text-[#00D9C0] underline underline-offset-2"
                    >
                        click here
                    </a>
                    .
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 space-y-5 backdrop-blur-sm"
            aria-label="Download the BC Shellfish Grower's Survival Guide 2026"
        >
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#00D9C0]">
                Free Download — Enter Details to Access
            </p>

            <div className="space-y-1">
                <label htmlFor="guide-name" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Full Name
                </label>
                <input
                    id="guide-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Grower"
                    disabled={state === "submitting"}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00D9C0]/50 transition-colors disabled:opacity-50"
                />
            </div>

            <div className="space-y-1">
                <label htmlFor="guide-email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Work Email
                </label>
                <input
                    id="guide-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@yourfarm.ca"
                    disabled={state === "submitting"}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00D9C0]/50 transition-colors disabled:opacity-50"
                />
            </div>

            {state === "error" && (
                <div role="alert" className="flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle size={14} />
                    {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={state === "submitting" || !name || !email}
                className="w-full flex items-center justify-center gap-3 py-4 bg-[#00D9C0] text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {state === "submitting" ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Unlocking…
                    </>
                ) : (
                    <>
                        <Download size={16} />
                        Download Free Guide
                    </>
                )}
            </button>

            <p className="text-[9px] text-slate-600 text-center leading-relaxed">
                No spam. Coralfil respects your privacy. Unsubscribe any time.
            </p>
        </form>
    );
}

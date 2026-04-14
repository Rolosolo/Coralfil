import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

// Use the service role key so we can bypass RLS for inserts
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();

        if (!name || !email) {
            return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        const { error } = await supabase.from("guide_downloads").insert({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            guide_slug: "bc-shellfish-growers-survival-guide-2026",
            ip_address: req.headers.get("x-forwarded-for") ?? null,
            user_agent: req.headers.get("user-agent") ?? null,
        });

        if (error) {
            console.error("[guide-download] Supabase insert error:", error.message);
            return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[guide-download] Unexpected error:", err);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}

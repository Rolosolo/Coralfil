import { InvestorsClient } from "@/components/marketing/InvestorsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Investors | Capitalizing on Regenerative Infrastructure",
    description: "Join CoralFil in building the definitive operating system for the Blue Economy. View our pipeline, IP moat, and download our Q1 2026 R&D Technical Brief.",
};

export default function InvestorPage() {
    return <InvestorsClient />;
}

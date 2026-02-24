import { CompanyClient } from "@/components/marketing/CompanyClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About CoralFil | Rebuilding the Oceans 'Brick by Brick'",
    description: "CoralFil is building the structural and chemical foundation for 100,000+ hectares of reef restoration by 2035. Meet our maritime and tech leadership team.",
};

export default function CompanyPage() {
    return <CompanyClient />;
}

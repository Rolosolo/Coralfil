import VibrioDashboard from "@/components/dashboard/VibrioDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vibrio Alert | Coralfil Regional Sentinel",
    description: "Real-time mortality surveillance and environmental telemetry for BC shellfish aquaculture.",
};

export default function VibrioPage() {
    return <VibrioDashboard />;
}

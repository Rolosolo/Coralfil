import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/scripts/migrate-data";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await seedDatabase();
        return NextResponse.json({ message: "Seeding complete" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

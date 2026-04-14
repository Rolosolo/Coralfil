import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase environment variables not configured.');
    return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const startYear = parseInt(searchParams.get('startYear') ?? '2015', 10);
        const endYear   = parseInt(searchParams.get('endYear')   ?? '2024', 10);

        const supabase = getAdminClient();

        const { data, error } = await supabase
            .from('mortality_events')
            .select('*, bc_shellfish_farms(farm_name, region, location_lat, location_lng)')
            .gte('event_start_date', `${startYear}-01-01`)
            .lte('event_start_date', `${endYear}-12-31`)
            .order('event_start_date', { ascending: false });

        if (error) {
            console.error('[vibrio/mortality-events] Supabase error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data: data ?? [] });
    } catch (err: any) {
        console.error('[vibrio/mortality-events] Unexpected error:', err.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

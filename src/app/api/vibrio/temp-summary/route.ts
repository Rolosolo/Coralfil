import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getAdminClient() {
    const url = process.env.VIBRIO_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.VIBRIO_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase environment variables not configured.');
    return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET() {
    try {
        const supabase = getAdminClient();

        const { data, error } = await supabase
            .from('vw_annual_temp_summary')
            .select('*')
            .order('year', { ascending: true });

        if (error) {
            console.error('[vibrio/temp-summary] Supabase error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data: data ?? [] });
    } catch (err: any) {
        console.error('[vibrio/temp-summary] Unexpected error:', err.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

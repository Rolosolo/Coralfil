import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the service-role key on the server so RLS policies are still enforced
// but we bypass anon-key rate limits for internal dashboard calls.
function getAdminClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        throw new Error('Supabase environment variables not configured.');
    }
    return createClient(url, key, {
        auth: { persistSession: false }
    });
}

export async function GET() {
    try {
        const supabase = getAdminClient();

        const { data, error } = await supabase
            .from('vw_farm_risk_scores')
            .select('*')
            .order('risk_score', { ascending: false });

        if (error) {
            console.error('[vibrio/risk-scores] Supabase error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data: data ?? [] });
    } catch (err: any) {
        console.error('[vibrio/risk-scores] Unexpected error:', err.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

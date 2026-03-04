import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { query, topK = 5 } = await req.json();

        if (!query) {
            return NextResponse.json({ error: 'Query is required' }, { status: 400 });
        }

        // 1. Generate embedding for the query
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: query,
        });
        const queryEmbedding = embeddingResponse.data[0].embedding;

        // 2. Search for similar papers using RPC
        const { data: papers, error: searchError } = await supabase.rpc(
            'search_papers_by_embedding',
            {
                query_embedding: queryEmbedding,
                similarity_threshold: 0.5,
                match_count: topK,
            }
        );

        if (searchError) {
            console.error('Search error:', searchError);
            return NextResponse.json({ error: 'Failed to search knowledge base' }, { status: 500 });
        }

        // 3. Return results
        return NextResponse.json({
            results: papers?.map((p: any) => ({
                id: p.id,
                title: p.title,
                doi: p.doi,
                authors: p.authors,
                year: p.publication_year,
                relevance: Math.round(p.similarity * 100)
            })) || []
        });

    } catch (error: any) {
        console.error('Query API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import * as fs from 'fs';
import * as path from 'path';
import pdf from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const KNOWLEDGE_DIR = 'C:\\Users\\User\\Documents\\Coralfill\\Knowledge';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENAI_API_KEY) {
    console.error('❌ Missing environment variables. Check .env.local');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Recursively get all PDFs in a directory
function getPDFs(dir: string): string[] {
    const results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...getPDFs(fullPath));
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
            results.push(fullPath);
        }
    }
    return results;
}

async function ingestPDFs() {
    console.log('🚀 Starting PDF Ingestion Pipeline...\n');

    const files = getPDFs(KNOWLEDGE_DIR);
    console.log(`📚 Found ${files.length} PDF files across all subdirectories.\n`);

    let success = 0;
    let failed = 0;

    for (const filePath of files) {
        const fileName = path.basename(filePath);
        const relativePath = filePath.replace(KNOWLEDGE_DIR + '\\', '');
        console.log(`📄 Processing: ${relativePath}`);

        try {
            // Check if already ingested
            const { data: existing } = await supabase
                .from('papers')
                .select('id')
                .eq('title', fileName.replace('.pdf', ''))
                .single();

            if (existing) {
                console.log(`   ⏭️  Already ingested — skipping.\n`);
                continue;
            }

            // Parse PDF
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            const text = data.text?.trim();

            if (!text || text.length < 50) {
                console.warn(`   ⚠️  Skipped: No readable text found (possible scanned image PDF).\n`);
                failed++;
                continue;
            }

            // Truncate to ~8000 chars for embedding (safe token limit)
            const embeddingInput = text.substring(0, 8000);

            // Generate OpenAI embedding
            const embeddingResponse = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: embeddingInput,
            });
            const embedding = embeddingResponse.data[0].embedding;

            // Insert into Supabase
            const { error } = await supabase.from('papers').insert({
                title: fileName.replace('.pdf', ''),
                full_text: text,
                extracted_text: text.substring(0, 50000),
                embedding: embedding,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });

            if (error) {
                console.error(`   ❌ DB Error: ${error.message}\n`);
                failed++;
            } else {
                console.log(`   ✅ Ingested successfully (${text.length.toLocaleString()} chars)\n`);
                success++;
            }

        } catch (err: any) {
            console.error(`   ❌ Failed: ${err.message}\n`);
            failed++;
        }
    }

    console.log('─'.repeat(50));
    console.log(`🏁 Ingestion Complete.`);
    console.log(`   ✅ Success: ${success}`);
    console.log(`   ❌ Failed/Skipped: ${failed}`);
    console.log(`   📊 Total: ${files.length}`);
}

ingestPDFs().catch(console.error);

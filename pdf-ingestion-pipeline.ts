// pdf-ingestion-pipeline.ts

import { createClient } from '@supabase/supabase-js';
import { PDFDocument } from 'pdf-lib';

// Initialize Supabase client
const supabaseUrl = 'https://your.supabase.url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to process PDF
async function processPDF(pdfBuffer: Buffer) {
    // Load PDF document
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    // Extract text from all pages
    const text = await extractTextFromPDF(pdfDoc);
    // Save extracted entities to Supabase
    await saveEntitiesToSupabase(text);
}

// Function to extract text from each page
async function extractTextFromPDF(pdfDoc: PDFDocument): Promise<string> {
    let fullText = '';
    const numPages = pdfDoc.getPageCount();
    for (let i = 0; i < numPages; i++) {
        const page = pdfDoc.getPage(i);
        const text = await page.getTextContent();
        fullText += text.items.map((item: any) => item.str).join(' ') + '\n';
    }
    return fullText;
}

// Function to save extracted entities to Supabase
async function saveEntitiesToSupabase(text: string) {
    const { data, error } = await supabase
        .from('entities')
        .insert([{ content: text }]);

    if (error) {
        console.error('Error inserting entities:', error);
    } else {
        console.log('Entities saved to Supabase:', data);
    }
}

// Export the processing function
export { processPDF };
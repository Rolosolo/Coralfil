import { Index } from "@upstash/vector";

const url = process.env.UPSTASH_VECTOR_REST_URL || "";
const token = process.env.UPSTASH_VECTOR_REST_TOKEN || "";

if (!url || !token) {
    console.warn("Upstash Vector credentials missing. Ensure UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN are set in .env.local");
}

export const context7 = new Index({
    url: url,
    token: token,
});

/**
 * Retrieves biomimetic context based on species and environment type.
 * Queries Upstash Vector for similar restoration data points.
 */
export async function getBiomimeticContext(speciesId: string, environmentType: string) {
    if (!url || !token) return null;

    try {
        const query = `Restoration success for ${speciesId} in ${environmentType} conditions`;
        const result = await context7.query({
            data: query,
            topK: 1,
            includeMetadata: true,
        });

        if (result && result.length > 0) {
            return result[0].metadata;
        }
        return null;
    } catch (e) {
        console.error("Context7 retrieval error:", e);
        return null;
    }
}

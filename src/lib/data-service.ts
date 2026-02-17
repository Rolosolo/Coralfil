import { supabase } from "./supabase";
import { Project, SpeciesProfile, CBrickType } from "./demo-data";

export const dataService = {
    // Projects
    async getProjects(): Promise<Project[]> {
        const { data, error } = await supabase
            .from("projects")
            .select("*");

        if (error) {
            console.error("Error fetching projects:", error);
            return [];
        }

        return data.map((p: any) => ({
            id: p.id,
            name: p.name,
            location: p.location,
            client: p.client,
            status: p.status,
            progress: p.progress,
            lastUpdated: p.last_updated,
            coordinates: [p.lat, p.lng],
            targetSpecies: p.target_species || []
        }));
    },

    async getProjectById(id: string): Promise<Project | null> {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();

        if (error) return null;

        return {
            id: data.id,
            name: data.name,
            location: data.location,
            client: data.client,
            status: data.status,
            progress: data.progress,
            lastUpdated: data.last_updated,
            coordinates: [data.lat, data.lng],
            targetSpecies: data.target_species || []
        };
    },

    // Species
    async getSpecies(): Promise<SpeciesProfile[]> {
        const { data, error } = await supabase
            .from("species")
            .select("*");

        if (error) return [];

        return data.map((s: any) => ({
            id: s.id,
            commonName: s.common_name,
            scientificName: s.scientific_name,
            growthRate: s.growth_rate,
            preferredDepth: [s.min_depth, s.max_depth],
            resilienceScore: s.resilience_score,
            imageUrl: s.image_url
        }));
    },

    // C-Bricks
    async getCBricks(): Promise<CBrickType[]> {
        const { data, error } = await supabase
            .from("cbricks")
            .select("*");

        if (error) return [];

        return data.map((b: any) => ({
            id: b.id,
            name: b.name,
            description: b.description,
            suitability: b.suitability || [],
            costPerUnit: b.cost_per_unit,
            co2Sequestration: b.co2_sequestration
        }));
    },

    // Coralfill Formulas (The Brain)
    async getCoralfillFormula(speciesId: string): Promise<any> {
        const { data, error } = await supabase
            .from("coralfill_formulas")
            .select("*")
            .eq("target_species_id", speciesId)
            .limit(1)
            .maybeSingle();

        if (error) {
            console.error("Formula retrieval error:", error);
            return null;
        }

        return data;
    }
};

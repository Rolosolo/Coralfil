import { supabase } from "./supabase";
import { Project, SpeciesProfile, CBrickType, MOCK_PROJECTS, SPECIES_DB, C_BRICK_TYPES } from "./demo-data";

export const dataService = {
    // Projects
    async getProjects(): Promise<Project[]> {
        const { data, error } = await supabase
            .from("projects")
            .select("*");

        if (error || !data || data.length === 0) {
            console.warn("No projects found in DB, falling back to mock data.");
            return MOCK_PROJECTS;
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
            targetSpecies: p.target_species || [],
            environmentType: p.environment_type
        }));
    },

    async getProjectById(id: string): Promise<Project | null> {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            console.warn(`Project ${id} not found in DB, checking mock data.`);
            return MOCK_PROJECTS.find(p => p.id === id) || null;
        }

        return {
            id: data.id,
            name: data.name,
            location: data.location,
            client: data.client,
            status: data.status,
            progress: data.progress,
            lastUpdated: data.last_updated,
            coordinates: [data.lat, data.lng],
            targetSpecies: data.target_species,
            environmentType: data.environment_type
        };
    },

    // Species
    async getSpecies(): Promise<SpeciesProfile[]> {
        const { data, error } = await supabase
            .from("species")
            .select("*");

        if (error || !data || data.length === 0) {
            console.warn("No species found in DB, falling back to mock data.");
            return SPECIES_DB;
        }

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

        if (error || !data || data.length === 0) {
            console.warn("No C-bricks found in DB, falling back to mock data.");
            return C_BRICK_TYPES;
        }

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
    },

    // Automation Hooks (Orchestration mapping via YepCode/Prefect/Rube)
    async triggerProjectInit(projectId: string) {
        console.log(`[YepCode] Triggering environmental analysis for project ${projectId}...`);
        // In a real scenario, we would call the YepCode MCP tool here
    },

    async triggerDesignExport(projectId: string) {
        console.log(`[Prefect] Queueing manufacturing batch for project ${projectId}...`);
        // In a real scenario, we would call the Prefect MCP tool here
    },

    async triggerMilestoneSuccess(projectId: string) {
        console.log(`[Rube] Dispatching stakeholder notifications for project ${projectId}...`);
        // In a real scenario, we would call the Rube MCP tool here
    },

    // Spatial Intelligence (ACA/NOAA)
    async saveSpatialData(projectId: string, source: string, dataType: string, payload: any, metadata: any = {}) {
        const { error } = await supabase
            .from("spatial_data")
            .insert([{
                project_id: projectId,
                source,
                data_type: dataType,
                payload,
                metadata
            }]);

        if (error) console.error("Error saving spatial data:", error);
    },

    async getSpatialData(projectId: string): Promise<any[]> {
        const { data, error } = await supabase
            .from("spatial_data")
            .select("*")
            .eq("project_id", projectId);

        if (error) return [];
        return data;
    }
};

import { supabase } from "../supabase";
import { MOCK_PROJECTS, SPECIES_DB, C_BRICK_TYPES } from "../demo-data";

/**
 * Migration script to seed Supabase with initial demo data.
 * NOTE: Ensure the schema in supabase/schema.sql has been applied first.
 */
export async function seedDatabase() {
    console.log("Starting database seeding...");

    // 1. Seed Species
    console.log("Seeding species...");
    const { error: speciesError } = await supabase
        .from("species")
        .upsert(
            SPECIES_DB.map(s => ({
                id: s.id,
                common_name: s.commonName,
                scientific_name: s.scientificName,
                growth_rate: s.growthRate,
                min_depth: s.preferredDepth[0],
                max_depth: s.preferredDepth[1],
                resilience_score: s.resilienceScore,
                image_url: s.imageUrl
            }))
        );
    if (speciesError) console.error("Species seeding error:", speciesError);

    // 2. Seed C-Bricks
    console.log("Seeding C-Bricks...");
    const { error: brickError } = await supabase
        .from("cbricks")
        .upsert(
            C_BRICK_TYPES.map(b => ({
                id: b.id,
                name: b.name,
                description: b.description,
                suitability: b.suitability,
                cost_per_unit: b.costPerUnit,
                co2_sequestration: b.co2Sequestration
            }))
        );
    if (brickError) console.error("C-Brick seeding error:", brickError);

    // 3. Seed Projects
    console.log("Seeding projects...");
    const { error: projectError } = await supabase
        .from("projects")
        .upsert(
            MOCK_PROJECTS.map(p => ({
                id: p.id,
                name: p.name,
                location: p.location,
                client: p.client,
                status: p.status,
                progress: p.progress,
                last_updated: new Date().toISOString(),
                lat: p.coordinates[0],
                lng: p.coordinates[1],
                target_species: p.targetSpecies
            }))
        );
    if (projectError) console.error("Project seeding error:", projectError);

    // 4. Seed Coralfill Formulas (The Brain)
    console.log("Seeding Coralfill formulas...");
    const { error: formulaError } = await supabase
        .from("coralfill_formulas")
        .upsert([
            {
                target_species_id: "sp_acropora",
                environment_type: "shallow_tropical",
                amino_acid_profile: { aspartic_acid: 45, glutamic_acid: 30, taurine: 25 },
                mineral_profile: { calcium: 85, magnesium: 10, strontium: 4, potassium: 1 },
                oyster_shell_ratio: 45,
                alginate_ratio: 30,
                chitosan_ratio: 25,
                settlement_multiplier: 2.4,
                growth_acceleration: 1.8,
                biomimicry_score: 94
            },
            {
                target_species_id: "sp_boulder",
                environment_type: "turbid_inshore",
                amino_acid_profile: { aspartic_acid: 20, glutamic_acid: 50, taurine: 30 },
                mineral_profile: { calcium: 70, magnesium: 20, strontium: 8, potassium: 2 },
                oyster_shell_ratio: 35,
                alginate_ratio: 40,
                chitosan_ratio: 25,
                settlement_multiplier: 1.9,
                growth_acceleration: 1.4,
                biomimicry_score: 88
            },
            {
                target_species_id: "sp_brain",
                environment_type: "shallow_tropical",
                amino_acid_profile: { aspartic_acid: 15, glutamic_acid: 60, taurine: 25 },
                mineral_profile: { calcium: 80, magnesium: 12, strontium: 6, potassium: 2 },
                oyster_shell_ratio: 50,
                alginate_ratio: 30,
                chitosan_ratio: 20,
                settlement_multiplier: 2.1,
                growth_acceleration: 1.2,
                biomimicry_score: 91
            }
        ]);
    if (formulaError) console.error("Formula seeding error:", formulaError);

    console.log("Seeding complete.");
}


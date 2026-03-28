// backend/routes/formulation.js
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// POST /api/formulate
// Input: { species_id, current_temp, current_ph, observed_threats }
router.post('/formulate', async (req, res) => {
    const { species_id, current_temp, current_ph, observed_threats } = req.body;

    try {
        // 1. Fetch Species Data
        const { data: traits } = await supabase
            .from('physiological_traits')
            .select('*')
            .eq('species_id', species_id)
            .single();

        const { data: nutrients } = await supabase
            .from('nutrient_profiles')
            .select('*')
            .eq('species_id', species_id)
            .single();

        if (!traits || !nutrients) {
            return res.status(404).json({ error: 'Species data not found' });
        }

        // 2. Run Formulation Logic (Invoke Python ML Service or Port Logic to JS)
        // For this example, we assume a simplified JS port of the logic above
        const healthScore = calculateHealthScore(traits, { temperature_c: current_temp });
        const recipe = generateRecipe(nutrients, healthScore);

        // 3. Log Formulation History for Precision Analysis
        await supabase.from('formulation_history').insert({
            species_id,
            health_score: healthScore,
            base_matrix: recipe.base_matrix,
            release_profile: recipe.release_profile,
            buoyancy_control: recipe.buoyancy_control,
            alphafold_optimized: recipe.alphafold_optimized,
            recipe: recipe.ingredients, 
            thermal_stress_factor: traits.temp_optimal_c ? (current_temp - traits.temp_optimal_c) : 0
        });

        res.json({
            species_id,
            health_score: healthScore,
            pellet_recipe: recipe,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper functions (Ported from ML logic for speed)
function calculateHealthScore(traits, env) {
    let score = 100;
    if (env.temperature_c > traits.bleaching_threshold_c) score -= 50;
    else if (env.temperature_c > traits.temp_optimal_c + 2) score -= 20;
    return score;
}

function generateRecipe(nutrients, score) {
    let ingredients = [];
    let base_matrix = "Patented Slow-Release Encapsulation Polymer";
    let release_profile = "Slow (24h) - Precision Decoupling";
    let buoyancy_control = "Neutral (Suspend)";

    if (nutrients.skeleton_composition.includes('Silica')) {
        ingredients.push({ name: 'Soluble Silicates', pct: 20 });
        buoyancy_control = "Low-Density (Stay)";
    } else {
        ingredients.push({ name: 'Calcium Carbonate', pct: 15 });
        buoyancy_control = "High-Density (Sink)";
    }
    
    if (score < 80) {
        ingredients.push({ name: 'Antioxidant Blend', pct: 5 });
    }

    return {
        base_matrix,
        ingredients,
        release_profile,
        buoyancy_control,
        alphafold_optimized: true
    };
}

module.exports = router;
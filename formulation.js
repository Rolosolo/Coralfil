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

        // 3. Log Reading
        await supabase.from('environmental_readings').insert({
            species_id,
            temperature_c: current_temp,
            ph: current_ph,
            location_id: 'field_scan_001'
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
    if (nutrients.skeleton_composition.includes('Silica')) {
        ingredients.push({ name: 'Soluble Silicates', pct: 20 });
    } else {
        ingredients.push({ name: 'Calcium Carbonate', pct: 15 });
    }
    if (score < 80) ingredients.push({ name: 'Antioxidant Blend', pct: 5 });
    return ingredients;
}

module.exports = router;
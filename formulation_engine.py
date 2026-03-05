# ml/formulation_engine.py
import json
from typing import Dict, List

class CoralHealthFormulator:
    def __init__(self):
        self.base_score = 100
    
    def calculate_environmental_factor(self, species_traits: Dict, current_env: Dict) -> float:
        """Calculates 0-1 factor based on temp/pH deviation from optimal."""
        factor = 1.0
        
        # Temperature Penalty
        opt_temp = species_traits.get('temp_optimal_c', 26)
        curr_temp = current_env.get('temperature_c', 26)
        temp_diff = abs(curr_temp - opt_temp)
        if temp_diff > 2: factor -= 0.2
        if temp_diff > 4: factor -= 0.3
        
        # Bleaching Threshold Check
        bleach_thresh = species_traits.get('bleaching_threshold_c')
        if bleach_thresh and curr_temp >= bleach_thresh:
            factor -= 0.5 # Severe penalty
            
        return max(0.1, factor)

    def calculate_threat_penalty(self, threats: List[str]) -> int:
        """Calculates penalty based on known threats from CSV."""
        penalty = 0
        high_risk_threats = ['White Band Disease', 'Bottom Trawling', 'Bleaching']
        for threat in threats:
            if any(hr in threat for hr in high_risk_threats):
                penalty += 15
        return min(penalty, 50) # Cap at 50

    def generate_nutrient_pellet(self, species_profile: Dict, env_factor: float) -> Dict:
        """Generates smart pellet recipe based on profile and stress."""
        skeleton = species_profile.get('biochemical_needs', {}).get('skeleton_material')
        symbiont = species_profile.get('symbiont_type')
        
        recipe = {
            "base_matrix": "Alginate",
            "ingredients": [],
            "release_profile": "Slow (24h)"
        }
        
        # 1. Skeleton Support
        if skeleton == 'Calcium Carbonate':
            recipe['ingredients'].append({'name': 'Calcium Chloride', ' pct': 15})
            recipe['ingredients'].append({'name': 'Magnesium Sulfate', 'pct': 5})
        elif skeleton == 'Silica (SiO2)':
            recipe['ingredients'].append({'name': 'Soluble Silicates', 'pct': 20}) # Critical for BC Sponges
        
        # 2. Energy Support (Based on Symbionts)
        if symbiont == 'Zooxanthellate':
            recipe['ingredients'].append({'name': 'Lipid Complex (Omega-3)', 'pct': 10})
            if env_factor < 0.7: # Stressed
                recipe['ingredients'].append({'name': 'Antioxidants (Vit E/C)', 'pct': 5})
        else: # Azooxanthellate (BC Corals/Sponges)
            recipe['ingredients'].append({'name': 'Protein Meal (Plankton)', 'pct': 25})
            recipe['release_profile'] = "Extended (7d)" # Deep water slower metabolism
            
        return recipe

    def assess_and_formulate(self, species_traits: Dict, nutrient_profile: Dict, current_env: Dict, threats: List[str]) -> Dict:
        # 1. Calculate Health Score (Notebook Framework)
        env_factor = self.calculate_environmental_factor(species_traits, current_env)
        bio_factor = 1.0 # Assume 1.0 unless visual data provided
        threat_penalty = self.calculate_threat_penalty(threats)
        
        health_score = (self.base_score * env_factor * bio_factor) - threat_penalty
        
        # 2. Generate Pellet
        pellet = self.generate_nutrient_pellet(nutrient_profile, env_factor)
        
        return {
            "species_id": species_traits.get('species_id'),
            "health_score": round(health_score, 2),
            "health_status": "Critical" if health_score < 50 else "Stressed" if health_score < 80 else "Healthy",
            "nutrient_pellet_recipe": pellet,
            "environmental_factor": round(env_factor, 2),
            "threat_penalty": threat_penalty
        }

# Example Usage
if __name__ == "__main__":
    engine = CoralHealthFormulator()
    
    # Mock Data based on CSV/Notebook
    traits = {"species_id": "CAR_001", "temp_optimal_c": 26, "bleaching_threshold_c": 30}
    nutrients = {"biochemical_needs": {"skeleton_material": "Calcium Carbonate", "symbiont_type": "Zooxanthellate"}}
    env = {"temperature_c": 31} # Heat stress
    threats = ["White Band Disease", "Bleaching"]
    
    result = engine.assess_and_formulate(traits, nutrients, env, threats)
    print(json.dumps(result, indent=2))
# ml/ingest_species_data.py
import pandas as pd
import os
from supabase import create_client, Client

# Initialize Supabase
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def load_data():
    df = pd.read_csv('data/coral_species_database.csv')
    
    # 1. Insert Species
    species_data = df[['Species_ID', 'Scientific_Name', 'Common_Name', 'Region', 'Family', 'Status', 'Image_URL']].to_dict('records')
    for row in species_data:
        supabase.table('species').upsert(row).execute()

    # 2. Insert Traits
    traits_data = df[['Species_ID', 'Growth_Form', 'Growth_Rate_mm_year', 'Max_Size_cm', 
                      'Depth_Min_m', 'Depth_Max_m', 'Temp_Min_C', 'Temp_Max_C', 
                      'Temp_Optimal_C', 'Bleaching_Threshold_C', 'pH_Min', 'pH_Max', 
                      'Skeleton_Composition']].to_dict('records')
    for row in traits_data:
        supabase.table('physiological_traits').insert(row).execute()

    # 3. Insert Nutrient Profiles
    nutrient_data = []
    for _, row in df.iterrows():
        # Construct biochemical needs based on Notebook logic
        bio_needs = {
            "symbiont_type": row['Symbiont_Type'],
            "feeding_mode": row['Feeding_Mode'],
            "skeleton_material": row['Skeleton_Composition'],
            "region": row['Region']
        }
        nutrient_data.append({
            "species_id": row['Species_ID'],
            "symbiont_type": row['Symbiont_Type'],
            "feeding_mode": row['Feeding_Mode'],
            "nitrate_ppm_range": row['Nitrate_ppm'],
            "phosphate_ppm_range": row['Phosphate_ppm'],
            "biochemical_needs": bio_needs
        })
    
    for row in nutrient_data:
        supabase.table('nutrient_profiles').insert(row).execute()

    print("Data ingestion complete.")

if __name__ == "__main__":
    load_data()
-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  client TEXT NOT NULL,
  status TEXT CHECK (status IN ('planning', 'analyzing', 'designing', 'deployment', 'monitoring')),
  progress INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  lat FLOAT8,
  lng FLOAT8,
  target_species TEXT[],
  environment_type TEXT DEFAULT 'shallow_tropical'
);

-- Species Table
CREATE TABLE IF NOT EXISTS species (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  growth_rate FLOAT4,
  min_depth FLOAT4,
  max_depth FLOAT4,
  resilience_score INTEGER,
  image_url TEXT
);

-- C-Bricks Table
CREATE TABLE IF NOT EXISTS cbricks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  suitability UUID[], -- Array of species IDs
  cost_per_unit NUMERIC,
  co2_sequestration FLOAT4
);

-- Design Configs Table (Stores specific formulation and parameter choices)
CREATE TABLE IF NOT EXISTS design_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  brick_id UUID REFERENCES cbricks(id),
  bio_mix_ratio INTEGER, -- Bio-enhancer mix percentage
  coralstick_config JSONB, -- formulation for CoralStick (UV, Nutrients, agents)
  parameters JSONB, -- Other HUD parameters
  mode TEXT CHECK (mode IN ('planning', 'simulation')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Additives Table (Master list of available additives like CoralStick)
CREATE TABLE IF NOT EXISTS additives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- e.g., 'ionic_coating', 'nutrient_release'
  description TEXT,
  properties JSONB -- Specific attributes like UV protection rating
);

-- Coralfill Formulas Table (The Brain)
-- Stores precise ML-driven chemical matrices for synthesis
CREATE TABLE IF NOT EXISTS coralfill_formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_species_id UUID REFERENCES species(id),
  environment_type TEXT NOT NULL, -- e.g., 'shallow_tropical', 'deep_shelf', 'turbid_inshore'
  
  -- Chemical Matrix (Amino Acids & Trace Minerals)
  amino_acid_profile JSONB DEFAULT '{"aspartic_acid": 0, "glutamic_acid": 0, "taurine": 0}',
  mineral_profile JSONB DEFAULT '{"calcium": 0, "magnesium": 0, "strontium": 0, "potassium": 0}',
  
  -- Biopolymer Ratio (Tripartite Synthesis)
  -- Ratio of Oyster Shell Powder : Alginate : Chitosan
  oyster_shell_ratio NUMERIC NOT NULL DEFAULT 40,
  alginate_ratio NUMERIC NOT NULL DEFAULT 35,
  chitosan_ratio NUMERIC NOT NULL DEFAULT 25,
  
  -- AI/ML Synthesis Metadata
  settlement_multiplier FLOAT4 DEFAULT 1.0, -- Growth support factor
  growth_acceleration FLOAT4 DEFAULT 1.0, -- Acceleration factor
  biomimicry_score INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB -- For Context7 retrieval pairing
);

-- Update Design Configs to link to a specific Formula
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='design_configs' AND column_name='coralfill_formula_id') THEN
    ALTER TABLE design_configs ADD COLUMN coralfill_formula_id UUID REFERENCES coralfill_formulas(id);
  END IF;
END $$;

-- Spatial Data Table (ACA/NOAA Persistence Layer)
CREATE TABLE IF NOT EXISTS spatial_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  source TEXT NOT NULL, -- e.g., 'Allen Coral Atlas', 'NOAA'
  data_type TEXT NOT NULL, -- e.g., 'benthic', 'geomorphic', 'turbidity', 'sst'
  payload JSONB NOT NULL, -- The actual data object
  metadata JSONB, -- Resolution, confidence, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

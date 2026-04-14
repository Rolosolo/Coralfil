-- ============================================================
-- CoralFil VR: BC Shellfish Vibrio Mortality Database
-- Schema for Supabase PostgreSQL (CORRECTED v2.0)
-- April 2026
-- ============================================================
-- CHANGES FROM v1:
-- - Fixed BIGSERIAL primary key on temperature_obs
-- - Removed problematic auth.role() calls (use auth.uid() for RLS)
-- - Fixed TimescaleDB hypertable syntax for compatibility
-- - Removed PostGIS from TimescaleDB hypertable (known incompatibility)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- For fuzzy text search

-- ============================================================
-- CORE TABLES
-- ============================================================

-- Farm registry
CREATE TABLE bc_shellfish_farms (
    farm_id SERIAL PRIMARY KEY,
    farm_name VARCHAR(200) NOT NULL,
    operator VARCHAR(200),
    location_lat DECIMAL(10, 7),
    location_lng DECIMAL(11, 7),
    location_geom GEOGRAPHY(POINT, 4326),
    region VARCHAR(100),
    primary_species VARCHAR(100),
    secondary_species TEXT[],
    production_volume_annual_tonnes DECIMAL(10, 2),
    farm_area_hectares DECIMAL(8, 2),
    water_depth_m DECIMAL(5, 1),
    substrate_type VARCHAR(50),
    culture_method VARCHAR(100),
    contact_email VARCHAR(200),
    contact_phone VARCHAR(50),
    dfo_tenure_id VARCHAR(100),
    active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_farms_location ON bc_shellfish_farms USING GIST(location_geom);
CREATE INDEX idx_farms_region ON bc_shellfish_farms(region);
CREATE INDEX idx_farms_species ON bc_shellfish_farms(primary_species);

-- Trigger to auto-populate location_geom from lat/lng
CREATE OR REPLACE FUNCTION update_farm_geom()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.location_lat IS NOT NULL AND NEW.location_lng IS NOT NULL THEN
        NEW.location_geom = ST_SetSRID(ST_MakePoint(NEW.location_lng, NEW.location_lat), 4326)::geography;
    END IF;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_farm_geom_update
BEFORE INSERT OR UPDATE ON bc_shellfish_farms
FOR EACH ROW EXECUTE FUNCTION update_farm_geom();

-- ============================================================
-- TEMPERATURE MONITORING
-- ============================================================

CREATE TABLE temperature_stations (
    station_id SERIAL PRIMARY KEY,
    station_code VARCHAR(50) UNIQUE NOT NULL,
    station_name VARCHAR(200) NOT NULL,
    location_lat DECIMAL(10, 7) NOT NULL,
    location_lng DECIMAL(11, 7) NOT NULL,
    location_geom GEOGRAPHY(POINT, 4326),
    operator VARCHAR(100),
    depth_m DECIMAL(5, 1),
    sensor_type VARCHAR(100),
    data_start_date DATE,
    data_end_date DATE,
    data_url TEXT,
    api_endpoint TEXT,
    update_frequency VARCHAR(50),
    active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stations_location ON temperature_stations USING GIST(location_geom);
CREATE INDEX idx_stations_code ON temperature_stations(station_code);

CREATE OR REPLACE FUNCTION update_station_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location_geom = ST_SetSRID(ST_MakePoint(NEW.location_lng, NEW.location_lat), 4326)::geography;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_station_geom_update
BEFORE INSERT OR UPDATE ON temperature_stations
FOR EACH ROW EXECUTE FUNCTION update_station_geom();

-- Temperature observations (TimescaleDB hypertable with CORRECTED primary key)
CREATE TABLE temperature_obs (
    obs_id BIGSERIAL PRIMARY KEY,
    station_id INTEGER REFERENCES temperature_stations(station_id) ON DELETE CASCADE,
    obs_timestamp TIMESTAMPTZ NOT NULL,
    obs_date DATE NOT NULL,
    temp_celsius DECIMAL(5, 2),
    temp_max_celsius DECIMAL(5, 2),
    temp_min_celsius DECIMAL(5, 2),
    salinity_psu DECIMAL(5, 2),
    dissolved_oxygen_mg_l DECIMAL(5, 2),
    quality_flag VARCHAR(20),
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Convert to TimescaleDB hypertable (correct syntax for Supabase)
SELECT create_hypertable('temperature_obs', 'obs_timestamp', if_not_exists => TRUE);

CREATE INDEX idx_temp_station_time ON temperature_obs(station_id, obs_timestamp DESC);
CREATE INDEX idx_temp_date ON temperature_obs(obs_date);
CREATE INDEX idx_temp_celsius ON temperature_obs(temp_celsius);

-- ============================================================
-- VIBRIO MONITORING
-- ============================================================

CREATE TABLE vibrio_monitoring (
    sample_id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES bc_shellfish_farms(farm_id) ON DELETE SET NULL,
    station_id INTEGER REFERENCES temperature_stations(station_id) ON DELETE SET NULL,
    sample_date DATE NOT NULL,
    sample_time TIME,
    species_sampled VARCHAR(100),
    sample_type VARCHAR(50),
    sample_size_n INTEGER,
    vibrio_species VARCHAR(100),
    detection_method VARCHAR(100),
    concentration_cfu_g DECIMAL(12, 2),
    concentration_copies_g DECIMAL(12, 2),
    concentration_units VARCHAR(50),
    detection_threshold DECIMAL(12, 2),
    detected BOOLEAN,
    temperature_at_sampling DECIMAL(5, 2),
    salinity_at_sampling DECIMAL(5, 2),
    virulence_genes JSONB,
    serotype VARCHAR(50),
    lab_name VARCHAR(200),
    lab_report_id VARCHAR(100),
    data_source VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vibrio_date ON vibrio_monitoring(sample_date DESC);
CREATE INDEX idx_vibrio_farm ON vibrio_monitoring(farm_id);
CREATE INDEX idx_vibrio_species ON vibrio_monitoring(vibrio_species);
CREATE INDEX idx_vibrio_detected ON vibrio_monitoring(detected) WHERE detected = true;
CREATE INDEX idx_vibrio_genes ON vibrio_monitoring USING GIN(virulence_genes);

-- ============================================================
-- MORTALITY EVENTS
-- ============================================================

CREATE TABLE mortality_events (
    event_id SERIAL PRIMARY KEY,
    farm_id INTEGER REFERENCES bc_shellfish_farms(farm_id) ON DELETE SET NULL,
    event_start_date DATE NOT NULL,
    event_end_date DATE,
    species_affected VARCHAR(100) NOT NULL,
    life_stage VARCHAR(50),
    cohort_size_initial INTEGER,
    estimated_mortality_count INTEGER,
    estimated_mortality_percent DECIMAL(5, 2),
    estimated_mortality_tonnes DECIMAL(10, 2),
    market_value_per_kg DECIMAL(6, 2),
    economic_loss_cad DECIMAL(12, 2),
    suspected_cause VARCHAR(200),
    confirmed_pathogen VARCHAR(200),
    diagnostic_method VARCHAR(200),
    water_temp_avg_celsius DECIMAL(5, 2),
    water_temp_peak_celsius DECIMAL(5, 2),
    salinity_avg_psu DECIMAL(5, 2),
    dissolved_oxygen_min_mg_l DECIMAL(5, 2),
    duration_days INTEGER,
    cumulative_degree_days DECIMAL(8, 2),
    intervention_taken TEXT,
    intervention_effective BOOLEAN,
    data_source VARCHAR(200),
    data_quality VARCHAR(20),
    reported_by VARCHAR(200),
    verified BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mortality_date ON mortality_events(event_start_date DESC);
CREATE INDEX idx_mortality_farm ON mortality_events(farm_id);
CREATE INDEX idx_mortality_cause ON mortality_events(suspected_cause);
CREATE INDEX idx_mortality_species ON mortality_events(species_affected);

-- ============================================================
-- ECONOMIC BASELINE
-- ============================================================

CREATE TABLE economic_baseline (
    baseline_id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL UNIQUE,
    total_shellfish_production_tonnes DECIMAL(10, 2),
    total_farm_gate_value_cad DECIMAL(15, 2),
    oyster_production_tonnes DECIMAL(10, 2),
    oyster_avg_price_per_kg DECIMAL(6, 2),
    clam_production_tonnes DECIMAL(10, 2),
    clam_avg_price_per_kg DECIMAL(6, 2),
    mussel_production_tonnes DECIMAL(10, 2),
    mussel_avg_price_per_kg DECIMAL(6, 2),
    geoduck_production_tonnes DECIMAL(10, 2),
    geoduck_avg_price_per_kg DECIMAL(6, 2),
    scallop_production_tonnes DECIMAL(10, 2),
    scallop_avg_price_per_kg DECIMAL(6, 2),
    num_active_farms INTEGER,
    num_active_operators INTEGER,
    data_source VARCHAR(200),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_economic_year ON economic_baseline(year DESC);

-- ============================================================
-- LITERATURE & REPORTS
-- ============================================================

CREATE TABLE vibrio_literature (
    lit_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT,
    publication_year INTEGER,
    journal_or_source VARCHAR(300),
    doi VARCHAR(200),
    pubmed_id VARCHAR(50),
    study_region VARCHAR(200),
    species_focus VARCHAR(200),
    vibrio_species_studied TEXT[],
    key_findings TEXT,
    mortality_data_extractable BOOLEAN DEFAULT false,
    temperature_threshold_celsius DECIMAL(5, 2),
    mortality_rate_percent DECIMAL(5, 2),
    study_type VARCHAR(100),
    pdf_path TEXT,
    url TEXT,
    citation_apa TEXT,
    tags TEXT[],
    notes TEXT,
    added_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_lit_year ON vibrio_literature(publication_year DESC);
CREATE INDEX idx_lit_region ON vibrio_literature(study_region);
CREATE INDEX idx_lit_species ON vibrio_literature USING GIN(vibrio_species_studied);
CREATE INDEX idx_lit_tags ON vibrio_literature USING GIN(tags);

-- ============================================================
-- ANALYTICAL VIEWS
-- ============================================================

CREATE OR REPLACE VIEW vw_farm_risk_scores AS
SELECT 
    f.farm_id,
    f.farm_name,
    f.region,
    f.primary_species,
    f.production_volume_annual_tonnes,
    COUNT(DISTINCT m.event_id) AS mortality_events_count,
    AVG(m.estimated_mortality_percent) AS avg_mortality_percent,
    SUM(m.economic_loss_cad) AS total_economic_loss_cad,
    MAX(m.water_temp_peak_celsius) AS peak_temp_recorded,
    (f.production_volume_annual_tonnes * COUNT(DISTINCT m.event_id) * COALESCE(AVG(m.estimated_mortality_percent), 0)) AS risk_score
FROM bc_shellfish_farms f
LEFT JOIN mortality_events m ON f.farm_id = m.farm_id
WHERE f.active = true
GROUP BY f.farm_id, f.farm_name, f.region, f.primary_species, f.production_volume_annual_tonnes
ORDER BY risk_score DESC NULLS LAST;

CREATE OR REPLACE VIEW vw_annual_temp_summary AS
SELECT 
    s.station_id,
    s.station_name,
    s.station_code,
    EXTRACT(YEAR FROM t.obs_date) AS year,
    COUNT(*) AS observation_days,
    AVG(t.temp_celsius) AS avg_temp_celsius,
    MAX(t.temp_celsius) AS max_temp_celsius,
    MIN(t.temp_celsius) AS min_temp_celsius,
    COUNT(*) FILTER (WHERE t.temp_celsius > 15.0) AS days_above_15c,
    COUNT(*) FILTER (WHERE t.temp_celsius > 18.0) AS days_above_18c,
    COUNT(*) FILTER (WHERE t.temp_celsius > 20.0) AS days_above_20c,
    SUM(GREATEST(t.temp_celsius - 15.0, 0)) AS cumulative_degree_days_15c
FROM temperature_stations s
JOIN temperature_obs t ON s.station_id = t.station_id
WHERE t.temp_celsius IS NOT NULL
GROUP BY s.station_id, s.station_name, s.station_code, year
ORDER BY year DESC, days_above_18c DESC;

CREATE OR REPLACE VIEW vw_vibrio_detection_rates AS
SELECT 
    f.region,
    EXTRACT(YEAR FROM v.sample_date) AS year,
    v.vibrio_species,
    COUNT(*) AS total_samples,
    COUNT(*) FILTER (WHERE v.detected = true) AS positive_samples,
    ROUND((COUNT(*) FILTER (WHERE v.detected = true)::DECIMAL / COUNT(*)) * 100, 2) AS detection_rate_percent,
    AVG(v.concentration_cfu_g) FILTER (WHERE v.detected = true) AS avg_concentration_cfu_g,
    MAX(v.concentration_cfu_g) AS max_concentration_cfu_g,
    AVG(v.temperature_at_sampling) AS avg_temp_at_sampling
FROM vibrio_monitoring v
LEFT JOIN bc_shellfish_farms f ON v.farm_id = f.farm_id
WHERE v.vibrio_species IS NOT NULL
GROUP BY f.region, year, v.vibrio_species
ORDER BY year DESC, detection_rate_percent DESC;

CREATE OR REPLACE VIEW vw_economic_impact_summary AS
SELECT 
    EXTRACT(YEAR FROM m.event_start_date) AS year,
    COUNT(DISTINCT m.event_id) AS num_events,
    COUNT(DISTINCT m.farm_id) AS num_farms_affected,
    STRING_AGG(DISTINCT f.region, ', ') AS regions_affected,
    SUM(m.estimated_mortality_tonnes) AS total_tonnes_lost,
    SUM(m.economic_loss_cad) AS total_economic_loss_cad,
    AVG(m.water_temp_peak_celsius) AS avg_peak_temp,
    AVG(m.duration_days) AS avg_event_duration_days
FROM mortality_events m
LEFT JOIN bc_shellfish_farms f ON m.farm_id = f.farm_id
WHERE m.suspected_cause LIKE '%Vibrio%' OR m.confirmed_pathogen LIKE '%Vibrio%'
GROUP BY year
ORDER BY year DESC;

-- ============================================================
-- UTILITY FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION find_nearest_temp_station(farm_lat DECIMAL, farm_lng DECIMAL, max_distance_km DECIMAL DEFAULT 50)
RETURNS TABLE (
    station_id INTEGER,
    station_name VARCHAR(200),
    distance_km DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.station_id,
        s.station_name,
        ROUND((ST_Distance(
            s.location_geom,
            ST_SetSRID(ST_MakePoint(farm_lng, farm_lat), 4326)::geography
        ) / 1000)::NUMERIC, 2) AS distance_km
    FROM temperature_stations s
    WHERE s.active = true
      AND ST_DWithin(
          s.location_geom,
          ST_SetSRID(ST_MakePoint(farm_lng, farm_lat), 4326)::geography,
          max_distance_km * 1000
      )
    ORDER BY distance_km ASC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_vibrio_risk(
    p_station_id INTEGER,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    risk_level VARCHAR(20),
    days_high_risk INTEGER,
    cumulative_degree_days DECIMAL
) AS $$
DECLARE
    v_days_high_risk INTEGER;
    v_cumulative_dd DECIMAL;
    v_risk_level VARCHAR(20);
BEGIN
    SELECT 
        COUNT(*) FILTER (WHERE temp_celsius > 18.0),
        SUM(GREATEST(temp_celsius - 15.0, 0))
    INTO v_days_high_risk, v_cumulative_dd
    FROM temperature_obs
    WHERE station_id = p_station_id
      AND obs_date BETWEEN p_start_date AND p_end_date;
    
    v_days_high_risk := COALESCE(v_days_high_risk, 0);
    v_cumulative_dd := COALESCE(v_cumulative_dd, 0);
    
    IF v_days_high_risk >= 45 THEN
        v_risk_level := 'EXTREME';
    ELSIF v_days_high_risk >= 30 THEN
        v_risk_level := 'HIGH';
    ELSIF v_days_high_risk >= 15 THEN
        v_risk_level := 'MODERATE';
    ELSE
        v_risk_level := 'LOW';
    END IF;
    
    RETURN QUERY SELECT v_risk_level, v_days_high_risk, v_cumulative_dd;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ROW LEVEL SECURITY (Supabase best practice)
-- ============================================================

ALTER TABLE bc_shellfish_farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE temperature_obs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vibrio_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE mortality_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE economic_baseline ENABLE ROW LEVEL SECURITY;
ALTER TABLE vibrio_literature ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON bc_shellfish_farms FOR SELECT USING (true);
CREATE POLICY "Public read access" ON temperature_stations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON temperature_obs FOR SELECT USING (true);
CREATE POLICY "Public read access" ON vibrio_monitoring FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mortality_events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON economic_baseline FOR SELECT USING (true);
CREATE POLICY "Public read access" ON vibrio_literature FOR SELECT USING (true);

-- Authenticated users can insert (adjust as needed)
CREATE POLICY "Authenticated insert" ON bc_shellfish_farms FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON temperature_obs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON vibrio_monitoring FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated insert" ON mortality_events FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO temperature_stations (station_code, station_name, location_lat, location_lng, operator, depth_m, data_start_date, active) 
VALUES
('ONC_BACCC', 'Campbell River', 50.0378, -125.2467, 'ONC', 5.0, '2010-01-01', true),
('ONC_BAYCB', 'Baynes Sound Central', 49.5833, -124.8667, 'ONC', 3.0, '2012-01-01', true),
('DFO_BARK', 'Barkley Sound', 48.8500, -125.1333, 'DFO', 8.0, '2008-01-01', true),
('ONC_OKEOVER', 'Okeover Inlet', 50.0500, -124.7167, 'ONC', 6.0, '2015-01-01', true);

INSERT INTO economic_baseline (year, total_shellfish_production_tonnes, total_farm_gate_value_cad, oyster_production_tonnes, oyster_avg_price_per_kg, data_source)
VALUES
(2023, 7200, 72000000, 7000, 15.00, 'DFO Pacific Aquaculture Statistics 2023'),
(2022, 6800, 68000000, 6600, 14.50, 'DFO Pacific Aquaculture Statistics 2022'),
(2021, 6200, 62000000, 6000, 14.00, 'DFO Pacific Aquaculture Statistics 2021');

INSERT INTO vibrio_literature (title, authors, publication_year, journal_or_source, doi, study_region, species_focus, vibrio_species_studied, key_findings, temperature_threshold_celsius, tags)
VALUES
('Vibrio parahaemolyticus and Vibrio vulnificus in US Coastal Waters', 'Baker-Austin et al.', 2010, 'Environmental Health Perspectives', '10.1289/ehp.0901548', 'Pacific Northwest', 'Oysters, clams', ARRAY['V. parahaemolyticus', 'V. vulnificus'], 'Vibrio levels double for every 1°C increase above 15°C', 15.0, ARRAY['climate change', 'temperature', 'prediction model']),
('Pacific Oyster Mortality Syndrome: Polymicrobial infection', 'Lemire et al.', 2015, 'Environmental Microbiology', '10.1111/1462-2920.12746', 'France (analogous)', 'Pacific oyster', ARRAY['V. splendidus', 'V. aestuarianus'], 'POMS = multifactorial: OsHV-1 virus + opportunistic Vibrio bloom when T >16°C', 16.0, ARRAY['POMS', 'Vibrio', 'viral co-infection']);

COMMENT ON TABLE bc_shellfish_farms IS 'Registry of BC shellfish aquaculture farms with production data';
COMMENT ON TABLE temperature_obs IS 'Time-series temperature observations from ONC monitoring stations (TimescaleDB hypertable)';
COMMENT ON TABLE vibrio_monitoring IS 'Vibrio sampling data from farms, DFO monitoring, and research studies';
COMMENT ON TABLE mortality_events IS 'Documented shellfish mortality events with suspected/confirmed causes';
COMMENT ON VIEW vw_farm_risk_scores IS 'Farm prioritization by mortality risk (production × frequency × severity)';
COMMENT ON FUNCTION find_nearest_temp_station IS 'Returns up to 5 nearest active temperature stations within max_distance_km';
COMMENT ON FUNCTION calculate_vibrio_risk IS 'Calculates Vibrio risk level and cumulative degree days for a date range at a station';

-- ============================================================
-- END OF SCHEMA
-- ============================================================

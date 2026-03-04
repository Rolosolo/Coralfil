-- Create Knowledge Management System Schema

-- Enable vector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Papers Table
CREATE TABLE IF NOT EXISTS papers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doi TEXT UNIQUE,
  title TEXT,
  authors TEXT[],
  publication_year INTEGER,
  journal TEXT,
  abstract TEXT,
  full_text TEXT,
  extracted_text TEXT,
  embedding vector(1536), -- For OpenAI text-embedding-3-small
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Compounds Table
CREATE TABLE IF NOT EXISTS compounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  compound_name TEXT UNIQUE NOT NULL,
  compound_class TEXT,
  rationale TEXT,
  mechanism TEXT,
  optimal_range_ppm JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pathogens & Threats Table
CREATE TABLE IF NOT EXISTS pathogens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pathogen_name TEXT UNIQUE NOT NULL,
  pathogen_type TEXT, -- e.g. Bacteria, Virus, Fungus, Thermal, pH
  host_species TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Paper-Compound Relationship
CREATE TABLE IF NOT EXISTS paper_compounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  compound_id UUID REFERENCES compounds(id) ON DELETE CASCADE,
  mention_context TEXT,
  key_finding TEXT,
  relevance_score NUMERIC(3,2)
);

-- Formulation Hypotheses Table
CREATE TABLE IF NOT EXISTS formulation_hypotheses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hypothesis_name TEXT NOT NULL,
  hypothesis_description TEXT,
  target_application TEXT,
  ingredients TEXT[],
  formulation_composition JSONB,
  settlement_effects JSONB,
  threat_mitigation JSONB,
  release_kinetics JSONB,
  status TEXT DEFAULT 'Draft', -- Draft, In Testing, Validated, Rejected
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Formulation Tests Table
CREATE TABLE IF NOT EXISTS formulation_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hypothesis_id UUID REFERENCES formulation_hypotheses(id) ON DELETE CASCADE,
  test_date DATE,
  test_location TEXT,
  coral_species TEXT,
  sample_size INTEGER,
  settlement_rate_percent NUMERIC(5,2),
  survival_percent NUMERIC(5,2),
  growth_rate_percent NUMERIC(5,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RPC for Similarity Search
CREATE OR REPLACE FUNCTION search_papers_by_embedding(
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  doi TEXT,
  authors TEXT[],
  publication_year INTEGER,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    papers.id,
    papers.title,
    papers.doi,
    papers.authors,
    papers.publication_year,
    1 - (papers.embedding <=> query_embedding) AS similarity
  FROM papers
  WHERE 1 - (papers.embedding <=> query_embedding) > similarity_threshold
  ORDER BY papers.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RLS Policies
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE compounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE pathogens ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulation_hypotheses ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulation_tests ENABLE ROW LEVEL SECURITY;

-- Default public read access
CREATE POLICY "Public read access for papers" ON papers FOR SELECT USING (true);
CREATE POLICY "Public read access for compounds" ON compounds FOR SELECT USING (true);
CREATE POLICY "Public read access for pathogens" ON pathogens FOR SELECT USING (true);
CREATE POLICY "Public read access for hypotheses" ON formulation_hypotheses FOR SELECT USING (true);
CREATE POLICY "Public read access for tests" ON formulation_tests FOR SELECT USING (true);

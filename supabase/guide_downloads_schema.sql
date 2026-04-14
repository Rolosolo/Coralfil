-- ============================================================
-- Guide Downloads / Lead Capture Table
-- Stores email gate form submissions from the Research page
-- April 2026
-- ============================================================

CREATE TABLE IF NOT EXISTS guide_downloads (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    guide_slug  TEXT NOT NULL DEFAULT 'bc-shellfish-growers-survival-guide-2026',
    ip_address  TEXT,
    user_agent  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_guide_downloads_email ON guide_downloads(email);
CREATE INDEX idx_guide_downloads_created ON guide_downloads(created_at DESC);

-- Enable RLS
ALTER TABLE guide_downloads ENABLE ROW LEVEL SECURITY;

-- Only service role (backend) can insert and read
CREATE POLICY "Service role insert" ON guide_downloads
    FOR INSERT WITH CHECK (true);

-- No public read — admin only via service role
-- (Supabase dashboard / service key access unrestricted)

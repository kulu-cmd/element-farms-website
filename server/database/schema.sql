-- CropFit Submissions Table
-- Run this SQL in your Supabase project: Dashboard > SQL Editor > New query

CREATE TABLE IF NOT EXISTS cropfit_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Form inputs (all stored)
  inputs JSONB NOT NULL,
  region TEXT,
  season TEXT,
  water_access TEXT,
  soil_type TEXT,
  management_level TEXT,
  farm_scale TEXT,

  -- Claude analysis results
  analysis JSONB,
  top_crops TEXT[],

  -- Optional contact info supplied by farmer
  contact_email TEXT,
  contact_name TEXT,
  farm_name TEXT,

  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  error_message TEXT,

  -- Processing metadata
  model_used TEXT,
  processing_ms INTEGER
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_cf_submissions_created_at ON cropfit_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cf_submissions_region ON cropfit_submissions(region);
CREATE INDEX IF NOT EXISTS idx_cf_submissions_season ON cropfit_submissions(season);
CREATE INDEX IF NOT EXISTS idx_cf_submissions_status ON cropfit_submissions(status);

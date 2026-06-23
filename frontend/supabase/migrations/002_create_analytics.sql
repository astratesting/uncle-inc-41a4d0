-- 002_create_analytics.sql
-- Analytics events table for tracking page views, signups, and funnel events

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  path TEXT,
  referrer TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups by event type
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON public.analytics_events(user_id);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Service role can insert analytics events
CREATE POLICY "Service role can insert analytics"
  ON public.analytics_events
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can read their own events
CREATE POLICY "Users can read own analytics"
  ON public.analytics_events
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

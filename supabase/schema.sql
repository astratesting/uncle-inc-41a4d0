-- Uncle Inc. Database Schema
-- Run this in the Supabase SQL Editor to set up the required tables.

-- ============================================================
-- 1. SIGNUPS TABLE
-- Captures every registration: email, name, company, source,
--    timestamp, and email-verification status.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.signups (
  id            UUID  DEFAULT gen_random_uuid() PRIMARY KEY,
  email         TEXT  NOT NULL,
  name          TEXT,
  company       TEXT,
  signup_source TEXT  NOT NULL DEFAULT 'organic',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified      BOOLEAN NOT NULL DEFAULT false
);

-- Unique index on email so we don't duplicate entries
CREATE UNIQUE INDEX IF NOT EXISTS signups_email_idx ON public.signups (email);

-- ============================================================
-- 2. ROW-LEVEL SECURITY
-- ============================================================

ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can insert — public signup / waitlist
CREATE POLICY "Allow public inserts on signups"
  ON public.signups
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can read all signups (for admin dashboard)
CREATE POLICY "Authenticated users can read signups"
  ON public.signups
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Users can update their own signup (e.g. mark verified via callback)
CREATE POLICY "Authenticated users can update signups"
  ON public.signups
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- 3. PROFILES TABLE (auto-populated by Supabase Auth trigger)
--    Optional — provides a denormalised view for the dashboard.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  name       TEXT,
  plan       TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Auto-create a profile row when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

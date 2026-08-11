-- ==========================================================
-- MRL PACKERS & MOVERS - PRODUCTION SUPABASE SCHEMA & RLS
-- ==========================================================

-- 1. Create Primary `quote_requests` Table
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  pickup_location TEXT NOT NULL,
  drop_location TEXT NOT NULL,
  moving_date DATE NOT NULL,
  moving_time TEXT DEFAULT 'Morning (8 AM - 12 PM)',
  service_type TEXT DEFAULT 'Household Shifting',
  vehicle_type TEXT DEFAULT '2BHK',
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backward compatibility view/table alias for `bookings`
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT UNIQUE,
  customer_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT,
  pickup_address TEXT NOT NULL,
  drop_address TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT DEFAULT 'Morning (8 AM - 12 PM)',
  vehicle_type TEXT DEFAULT '2BHK',
  service_type TEXT DEFAULT 'Household Shifting',
  notes TEXT,
  estimated_price NUMERIC(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_quote_requests_quote_id ON public.quote_requests(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_phone ON public.quote_requests(phone);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- 3. Enable Row Level Security (RLS) - PUBLIC PRIVACY ENFORCEMENT
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. Strict RLS Policies for `quote_requests`
-- Public Anonymous visitors are ONLY permitted to INSERT new quote requests.
DROP POLICY IF EXISTS "Allow public quote submission" ON public.quote_requests;
CREATE POLICY "Allow public quote submission" ON public.quote_requests
  FOR INSERT WITH CHECK (true);

-- Anonymous visitors are strictly DENIED SELECT (cannot read all customer names/phones/emails).
DROP POLICY IF EXISTS "Deny public select on quote_requests" ON public.quote_requests;
CREATE POLICY "Deny public select on quote_requests" ON public.quote_requests
  FOR SELECT USING (false);

-- Anonymous visitors are strictly DENIED UPDATE and DELETE.
DROP POLICY IF EXISTS "Deny public update on quote_requests" ON public.quote_requests;
CREATE POLICY "Deny public update on quote_requests" ON public.quote_requests
  FOR UPDATE USING (false);

DROP POLICY IF EXISTS "Deny public delete on quote_requests" ON public.quote_requests;
CREATE POLICY "Deny public delete on quote_requests" ON public.quote_requests
  FOR DELETE USING (false);

-- 5. RLS Policies for `bookings`
DROP POLICY IF EXISTS "Allow customer booking creation" ON public.bookings;
CREATE POLICY "Allow customer booking creation" ON public.bookings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Deny public select on bookings" ON public.bookings;
CREATE POLICY "Deny public select on bookings" ON public.bookings
  FOR SELECT USING (false);

-- 6. Auto Update Trigger for updated_at
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_quote_requests_timestamp ON public.quote_requests;
CREATE TRIGGER update_quote_requests_timestamp
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

DROP TRIGGER IF EXISTS update_bookings_timestamp ON public.bookings;
CREATE TRIGGER update_bookings_timestamp
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE update_timestamp_column();

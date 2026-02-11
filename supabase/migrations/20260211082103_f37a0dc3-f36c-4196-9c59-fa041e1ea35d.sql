
-- Cruise Lines table
CREATE TABLE public.cruise_lines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  description TEXT,
  founded_year INT,
  headquarters TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cruises table
CREATE TABLE public.cruises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cruise_line_id UUID NOT NULL REFERENCES public.cruise_lines(id),
  destination_id UUID NOT NULL REFERENCES public.destinations(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  ship_name TEXT NOT NULL,
  departure_port TEXT NOT NULL,
  arrival_port TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  duration_days INT NOT NULL,
  base_price_usd NUMERIC(10,2) NOT NULL,
  discount_percent INT DEFAULT 0,
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  highlights TEXT[] DEFAULT '{}',
  included TEXT[] DEFAULT '{}',
  not_included TEXT[] DEFAULT '{}',
  rating NUMERIC(2,1) DEFAULT 4.5,
  review_count INT DEFAULT 0,
  max_passengers INT DEFAULT 3000,
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'available' CHECK (status IN ('available','sold_out','coming_soon')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cabin types (Interior, Ocean View, Balcony, Suite, etc.)
CREATE TABLE public.cabin_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cruise_id UUID NOT NULL REFERENCES public.cruises(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('interior','ocean_view','balcony','suite','penthouse')),
  description TEXT,
  size_sqft INT,
  max_occupancy INT DEFAULT 2,
  base_price_usd NUMERIC(10,2) NOT NULL,
  original_price_usd NUMERIC(10,2),
  image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  beds TEXT DEFAULT '2 Twin or 1 King',
  deck TEXT,
  available_count INT DEFAULT 20,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings table (guest checkout)
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_ref TEXT NOT NULL UNIQUE,
  cruise_id UUID NOT NULL REFERENCES public.cruises(id),
  cabin_type_id UUID NOT NULL REFERENCES public.cabin_types(id),
  guest_first_name TEXT NOT NULL,
  guest_last_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  num_guests INT NOT NULL DEFAULT 2,
  guest_details JSONB DEFAULT '[]',
  total_price_usd NUMERIC(10,2) NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending','confirmed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cruise_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cruises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cabin_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public read access for browsing
CREATE POLICY "Public read cruise_lines" ON public.cruise_lines FOR SELECT USING (true);
CREATE POLICY "Public read destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public read cruises" ON public.cruises FOR SELECT USING (true);
CREATE POLICY "Public read cabin_types" ON public.cabin_types FOR SELECT USING (true);

-- Anyone can create a booking (guest checkout)
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
-- Bookings can be read by email (we'll handle this in the app)
CREATE POLICY "Public read bookings by ref" ON public.bookings FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_cruises_destination ON public.cruises(destination_id);
CREATE INDEX idx_cruises_cruise_line ON public.cruises(cruise_line_id);
CREATE INDEX idx_cruises_departure ON public.cruises(departure_date);
CREATE INDEX idx_cruises_featured ON public.cruises(is_featured) WHERE is_featured = true;
CREATE INDEX idx_cabin_types_cruise ON public.cabin_types(cruise_id);
CREATE INDEX idx_bookings_ref ON public.bookings(booking_ref);

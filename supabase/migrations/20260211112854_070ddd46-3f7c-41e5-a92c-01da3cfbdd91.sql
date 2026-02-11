
-- Dining venues table
CREATE TABLE public.dining_venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cruise_line_id UUID NOT NULL REFERENCES public.cruise_lines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cuisine_type TEXT,
  meal_periods TEXT[] DEFAULT '{}',
  dress_code TEXT DEFAULT 'Smart Casual',
  surcharge_usd NUMERIC DEFAULT 0,
  image_url TEXT,
  is_included BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.dining_venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read dining_venues" ON public.dining_venues FOR SELECT USING (true);

-- Entertainment venues table
CREATE TABLE public.entertainment_venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cruise_line_id UUID NOT NULL REFERENCES public.cruise_lines(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'shows',
  schedule TEXT,
  image_url TEXT,
  is_complimentary BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.entertainment_venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read entertainment_venues" ON public.entertainment_venues FOR SELECT USING (true);

-- Deck plans table
CREATE TABLE public.deck_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cruise_line_id UUID NOT NULL REFERENCES public.cruise_lines(id) ON DELETE CASCADE,
  deck_number INTEGER NOT NULL,
  deck_name TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  cabin_categories TEXT[] DEFAULT '{}',
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.deck_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read deck_plans" ON public.deck_plans FOR SELECT USING (true);

-- Ship profiles table for cruise-line-specific ship stats
CREATE TABLE public.ship_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cruise_line_id UUID NOT NULL REFERENCES public.cruise_lines(id) ON DELETE CASCADE,
  ship_name TEXT NOT NULL,
  tonnage INTEGER,
  length_ft INTEGER,
  passenger_decks INTEGER DEFAULT 16,
  crew_count INTEGER,
  dining_venues_count INTEGER DEFAULT 12,
  pool_count INTEGER DEFAULT 5,
  year_built INTEGER,
  year_refurbished INTEGER,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ship_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read ship_profiles" ON public.ship_profiles FOR SELECT USING (true);

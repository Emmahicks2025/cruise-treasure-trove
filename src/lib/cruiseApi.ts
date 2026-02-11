import { supabase } from "@/integrations/supabase/client";

export interface CruiseLine {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  image_url: string | null;
}

export interface Cruise {
  id: string;
  name: string;
  slug: string;
  ship_name: string;
  departure_port: string;
  arrival_port: string;
  departure_date: string;
  return_date: string;
  duration_days: number;
  base_price_usd: number;
  discount_percent: number;
  image_url: string | null;
  gallery_urls: string[];
  itinerary: Array<{ day: number; port: string; description: string }>;
  highlights: string[];
  included: string[];
  not_included: string[];
  rating: number;
  review_count: number;
  max_passengers: number;
  is_featured: boolean;
  status: string;
  cruise_lines: CruiseLine;
  destinations: Destination;
}

export interface CabinType {
  id: string;
  cruise_id: string;
  name: string;
  category: string;
  description: string | null;
  size_sqft: number;
  max_occupancy: number;
  base_price_usd: number;
  original_price_usd: number | null;
  image_url: string | null;
  amenities: string[];
  beds: string;
  deck: string | null;
  available_count: number;
}

export async function fetchCruises(filters?: {
  destination?: string;
  cruiseLine?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: string;
  search?: string;
}) {
  let query = supabase
    .from("cruises")
    .select("*, cruise_lines(*), destinations(*)")
    .eq("status", "available")
    .order("is_featured", { ascending: false })
    .order("base_price_usd", { ascending: true });

  if (filters?.destination) {
    query = query.eq("destination_id", filters.destination);
  }
  if (filters?.cruiseLine) {
    query = query.eq("cruise_line_id", filters.cruiseLine);
  }
  if (filters?.minPrice) {
    query = query.gte("base_price_usd", filters.minPrice);
  }
  if (filters?.maxPrice) {
    query = query.lte("base_price_usd", filters.maxPrice);
  }
  if (filters?.duration === "1-5") {
    query = query.lte("duration_days", 5);
  } else if (filters?.duration === "6-9") {
    query = query.gte("duration_days", 6).lte("duration_days", 9);
  } else if (filters?.duration === "10+") {
    query = query.gte("duration_days", 10);
  }
  if (filters?.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as unknown as Cruise[];
}

export async function fetchCruiseBySlug(slug: string) {
  const { data, error } = await supabase
    .from("cruises")
    .select("*, cruise_lines(*), destinations(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as Cruise | null;
}

export async function fetchCabinTypes(cruiseId: string) {
  const { data, error } = await supabase
    .from("cabin_types")
    .select("*")
    .eq("cruise_id", cruiseId)
    .order("base_price_usd", { ascending: true });
  if (error) throw error;
  return data as CabinType[];
}

export async function fetchDestinations() {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Destination[];
}

export async function fetchCruiseLines() {
  const { data, error } = await supabase
    .from("cruise_lines")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as CruiseLine[];
}

export async function createBooking(booking: {
  cruise_id: string;
  cabin_type_id: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone?: string;
  num_guests: number;
  guest_details?: any[];
  total_price_usd: number;
  special_requests?: string;
}) {
  const bookingRef = "CRU-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
  
  const { data, error } = await supabase
    .from("bookings")
    .insert({ ...booking, booking_ref: bookingRef })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function fetchBookingByRef(ref: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cruises(*, cruise_lines(*), destinations(*)), cabin_types(*)")
    .eq("booking_ref", ref)
    .maybeSingle();
  if (error) throw error;
  return data;
}

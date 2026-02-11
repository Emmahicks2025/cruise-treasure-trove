
-- Tighten bookings insert to validate required fields exist via check constraint
-- The WITH CHECK (true) is intentional since this is guest checkout with no auth
-- Add validation constraints instead
ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_email_format CHECK (guest_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT bookings_num_guests_range CHECK (num_guests BETWEEN 1 AND 10),
  ADD CONSTRAINT bookings_price_positive CHECK (total_price_usd > 0);

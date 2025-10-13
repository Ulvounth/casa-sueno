-- Add booking_status and payment_reference columns to bookings table
-- Status: 'pending' (awaiting payment), 'paid' (payment confirmed), 'expired' (not paid within 24h)

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_status TEXT DEFAULT 'pending';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_reference TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS booking_expires_at TIMESTAMP;

-- Create index for booking status lookups
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_ref ON bookings(payment_reference);

-- Update existing bookings to 'paid' status (they were Stripe payments)
UPDATE bookings SET booking_status = 'paid' WHERE booking_status IS NULL OR booking_status = 'pending';
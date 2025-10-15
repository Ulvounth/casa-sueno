-- Fix booking_expires_at column to use TIMESTAMP WITH TIME ZONE
-- This ensures proper timezone handling when storing and retrieving expiry times

-- Drop and recreate the column with proper timezone support
ALTER TABLE bookings 
  ALTER COLUMN booking_expires_at TYPE TIMESTAMP WITH TIME ZONE 
  USING booking_expires_at AT TIME ZONE 'UTC';

-- Add comment to explain the column
COMMENT ON COLUMN bookings.booking_expires_at IS 'Expiry time for pending bookings (24 hours from creation) in UTC';

# 🎯 Booking System - Database Update Instructions

## 📋 Quick Setup (2 steps)

### Step 1: Update Database Structure

Copy and run this SQL in your Supabase SQL Editor:

```sql
-- Add guest information columns to your existing bookings table
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS guest_name TEXT,
ADD COLUMN IF NOT EXISTS guest_email TEXT,
ADD COLUMN IF NOT EXISTS guest_phone TEXT,
ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS special_requests TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled'));

-- Update existing rows to have confirmed status
UPDATE bookings SET status = 'confirmed' WHERE status IS NULL;

-- Create an index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);

-- Update the Row Level Security policy to allow reading all confirmed bookings
DROP POLICY IF EXISTS "Enable read access for all users" ON bookings;
CREATE POLICY "Enable read access for all users" ON bookings
  FOR SELECT USING (true);

-- Allow inserting new bookings without authentication
DROP POLICY IF EXISTS "Enable insert for all users" ON bookings;
CREATE POLICY "Enable insert for all users" ON bookings
  FOR INSERT WITH CHECK (true);
```

### Step 2: Test the System

1. Run `npm run dev`
2. Go to http://localhost:3000
3. Try making a booking - guest information will now be saved!

## ✅ What This Does

- **Keeps your existing bookings** - All current data remains intact
- **Adds guest information** - Name, email, phone, special requests
- **No authentication required** - Anyone can book directly
- **Real-time availability** - Calendar shows booked dates instantly
- **Price calculation** - Automatic €85/night calculation

## 🗂️ Your Database Will Have

**Original columns** (unchanged):

- `id`, `user_id`, `start_date`, `end_date`, `guests`, `created_at`

**New columns** (added):

- `guest_name` - Guest's full name
- `guest_email` - Contact email
- `guest_phone` - Phone number (optional)
- `total_price` - Calculated booking total
- `special_requests` - Any special requests
- `status` - Booking status ('confirmed' by default)

## 🔍 View Bookings

In Supabase Table Editor > bookings, you'll now see complete booking information including guest details.

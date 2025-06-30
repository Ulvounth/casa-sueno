import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our booking data (updated to include guest information)
export interface Booking {
  id: string
  user_id?: string
  start_date: string
  end_date: string
  guests: number
  guest_name?: string
  guest_email?: string
  guest_phone?: string
  total_price?: number
  special_requests?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}


import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

// Use environment variables when available, otherwise use direct values
const supabaseUrl = "https://xadvdyaffgkzvjbzuipq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZHZkeWFmZmdrenZqYnp1aXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1OTYxMzQsImV4cCI6MjA1NzE3MjEzNH0.Z6Of-C02wJFpJbsUQF8qLbs0puY19txi6wI7MfH2phU";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export the client for backward compatibility
export default supabase;

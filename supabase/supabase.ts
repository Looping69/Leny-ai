import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

// Use environment variables with fallback URLs for development
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://vnixswtxvuqtytneqgos.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuaXhzd3R4dnVxdHl0bmVxZ29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjUyNDMsImV4cCI6MjA1NzMwMTI0M30.-qsxItJdRegH2_wQogU7sntv_tXhi1S1tjK6fkmYHyk";

// Log the URL to help with debugging (remove in production)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Check your environment variables.",
  );
}

// Create the Supabase client with proper typing and additional options
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  global: {
    fetch: (...args) => {
      // Add custom fetch options if needed
      return fetch(...args);
    },
  },
  // Add retryable fetch options
  retryOnError: {
    maxRetries: 3,
    retryInterval: 1000, // 1 second between retries
  },
});

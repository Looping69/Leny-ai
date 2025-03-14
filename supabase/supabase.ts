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

// Custom fetch with timeout
const fetchWithTimeout = (
  url: RequestInfo | URL,
  options: RequestInit = {},
  timeout = 10000,
) => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    fetch(url, {
      ...options,
      signal: controller.signal,
    })
      .then((response) => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

// Create the Supabase client with proper typing and additional options
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
  global: {
    fetch: (...args) => {
      // Use our custom fetch with timeout
      return fetchWithTimeout(args[0], args[1], 10000) as Promise<Response>;
    },
  },
  // Add retryable fetch options
  retryOnError: {
    maxRetries: 3,
    retryInterval: 1000, // 1 second between retries
  },
});

// Add a health check function to test connectivity
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error("Supabase connection check failed:", error);
    return false;
  }
};

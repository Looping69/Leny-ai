-- Fix for "user_profiles already in supabase_realtime publication" error
-- This migration checks if the table is already in the publication before adding it

DO $$
BEGIN
  -- Check if user_profiles is already in the publication
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'user_profiles'
  ) THEN
    -- Only add it if it's not already there
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.user_profiles;';
  END IF;
END
$$;
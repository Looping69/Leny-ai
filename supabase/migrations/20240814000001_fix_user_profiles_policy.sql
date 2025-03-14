-- Fix for infinite recursion in user_profiles policy

-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

-- Create simplified policies
CREATE POLICY "Users can view their own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'master');

CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add policy for master users to view all profiles
CREATE POLICY "Master users can view all profiles"
ON public.user_profiles
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM user_profiles
  WHERE id = auth.uid() AND role = 'master'
));

-- Add policy for inserting profiles
CREATE POLICY "Users can insert their own profile"
ON public.user_profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Enable RLS on the table if not already enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

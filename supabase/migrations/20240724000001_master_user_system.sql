-- Enable RLS on user_profiles table if not already enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for master users to access all data
DROP POLICY IF EXISTS "Master users can access all data" ON public.user_profiles;
CREATE POLICY "Master users can access all data"
  ON public.user_profiles
  USING (auth.uid() IN (
    SELECT id FROM public.user_profiles WHERE role = 'master'
  ));

-- Create policy for users to access their own data
DROP POLICY IF EXISTS "Users can access their own data" ON public.user_profiles;
CREATE POLICY "Users can access their own data"
  ON public.user_profiles
  USING (auth.uid() = id);

-- Create function to set user as master
CREATE OR REPLACE FUNCTION public.set_user_as_master(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles
  SET role = 'master'
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to revoke master privileges
CREATE OR REPLACE FUNCTION public.revoke_master_privileges(user_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles
  SET role = 'admin'
  WHERE id = user_id AND role = 'master';
END;
$$ LANGUAGE plpgsql;

-- Enable realtime for user_profiles
alter publication supabase_realtime add table public.user_profiles;

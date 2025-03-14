-- Create audit log table for tracking master user actions
CREATE TABLE IF NOT EXISTS public.master_user_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  action_type TEXT NOT NULL,
  action_details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on audit logs
ALTER TABLE public.master_user_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for master users to view all audit logs
DROP POLICY IF EXISTS "Master users can view all audit logs" ON public.master_user_audit_logs;
CREATE POLICY "Master users can view all audit logs"
  ON public.master_user_audit_logs
  FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM public.user_profiles WHERE role = 'master'
  ));

-- Create policy for inserting audit logs
DROP POLICY IF EXISTS "Users can insert their own audit logs" ON public.master_user_audit_logs;
CREATE POLICY "Users can insert their own audit logs"
  ON public.master_user_audit_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to log master user actions
CREATE OR REPLACE FUNCTION public.log_master_user_action(
  action_type TEXT,
  action_details JSONB,
  ip_address TEXT DEFAULT NULL,
  user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.master_user_audit_logs (user_id, action_type, action_details, ip_address, user_agent)
  VALUES (auth.uid(), action_type, action_details, ip_address, user_agent)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for audit logs
alter publication supabase_realtime add table public.master_user_audit_logs;

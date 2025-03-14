-- Create table for external AI integrations
CREATE TABLE IF NOT EXISTS external_ai_integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  api_key TEXT NOT NULL,
  api_endpoint TEXT,
  specialty TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  configuration JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE external_ai_integrations ENABLE ROW LEVEL SECURITY;

-- Only master users can view external AI integrations
CREATE POLICY "Master users can view external AI integrations"
ON external_ai_integrations FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM user_profiles
  WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'master'
));

-- Only master users can insert external AI integrations
CREATE POLICY "Master users can insert external AI integrations"
ON external_ai_integrations FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM user_profiles
  WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'master'
));

-- Only master users can update external AI integrations
CREATE POLICY "Master users can update external AI integrations"
ON external_ai_integrations FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM user_profiles
  WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'master'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM user_profiles
  WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'master'
));

-- Only master users can delete external AI integrations
CREATE POLICY "Master users can delete external AI integrations"
ON external_ai_integrations FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM user_profiles
  WHERE user_profiles.id = auth.uid() AND user_profiles.role = 'master'
));

-- Add to realtime publication
alter publication supabase_realtime add table external_ai_integrations;

-- Create function to securely access external AI integrations
CREATE OR REPLACE FUNCTION get_external_ai_integration(integration_id UUID)
RETURNS JSONB
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Get integration data but exclude sensitive information for non-master users
  IF EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'master') THEN
    -- Master users get full access including API keys
    SELECT jsonb_build_object(
      'id', id,
      'name', name,
      'provider', provider,
      'api_key', api_key,
      'api_endpoint', api_endpoint,
      'specialty', specialty,
      'description', description,
      'is_active', is_active,
      'configuration', configuration,
      'created_at', created_at,
      'updated_at', updated_at
    ) INTO result
    FROM external_ai_integrations
    WHERE id = integration_id;
  ELSE
    -- Non-master users get limited information (no API keys)
    SELECT jsonb_build_object(
      'id', id,
      'name', name,
      'provider', provider,
      'specialty', specialty,
      'description', description,
      'is_active', is_active,
      'created_at', created_at
    ) INTO result
    FROM external_ai_integrations
    WHERE id = integration_id AND is_active = true;
  END IF;
  
  RETURN result;
END;
$$;

-- Create AI Agents table
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50) NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Subscription Tiers table
CREATE TABLE IF NOT EXISTS subscription_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10, 2),
  price_annual DECIMAL(10, 2),
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create User Subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier_id UUID REFERENCES subscription_tiers(id),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT false,
  payment_method_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  patient_id VARCHAR(255),
  patient_name VARCHAR(255),
  query TEXT,
  symptoms JSONB,
  status VARCHAR(50) NOT NULL DEFAULT 'in-progress',
  consensus_level INTEGER,
  final_recommendation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Consultation Agents table (for tracking which agents participated in a consultation)
CREATE TABLE IF NOT EXISTS consultation_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
  confidence INTEGER,
  opinion TEXT,
  reasoning TEXT,
  sources JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(consultation_id, agent_id)
);

-- Create Consultation Files table (for tracking uploaded files and images)
CREATE TABLE IF NOT EXISTS consultation_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  file_path TEXT NOT NULL,
  is_image BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_files ENABLE ROW LEVEL SECURITY;

-- Create policies
-- AI Agents - Everyone can view
DROP POLICY IF EXISTS "Anyone can view AI agents" ON ai_agents;
CREATE POLICY "Anyone can view AI agents"
  ON ai_agents FOR SELECT
  USING (true);

-- Subscription Tiers - Everyone can view
DROP POLICY IF EXISTS "Anyone can view subscription tiers" ON subscription_tiers;
CREATE POLICY "Anyone can view subscription tiers"
  ON subscription_tiers FOR SELECT
  USING (true);

-- User Subscriptions - Users can only view and update their own subscriptions
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON user_subscriptions;
CREATE POLICY "Users can view their own subscriptions"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own subscriptions" ON user_subscriptions;
CREATE POLICY "Users can update their own subscriptions"
  ON user_subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- Consultations - Users can only view and update their own consultations
DROP POLICY IF EXISTS "Users can view their own consultations" ON consultations;
CREATE POLICY "Users can view their own consultations"
  ON consultations FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own consultations" ON consultations;
CREATE POLICY "Users can insert their own consultations"
  ON consultations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own consultations" ON consultations;
CREATE POLICY "Users can update their own consultations"
  ON consultations FOR UPDATE
  USING (auth.uid() = user_id);

-- Consultation Agents - Users can only view agents for their own consultations
DROP POLICY IF EXISTS "Users can view agents for their own consultations" ON consultation_agents;
CREATE POLICY "Users can view agents for their own consultations"
  ON consultation_agents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM consultations
      WHERE consultations.id = consultation_id
      AND consultations.user_id = auth.uid()
    )
  );

-- Consultation Files - Users can only view files for their own consultations
DROP POLICY IF EXISTS "Users can view files for their own consultations" ON consultation_files;
CREATE POLICY "Users can view files for their own consultations"
  ON consultation_files FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM consultations
      WHERE consultations.id = consultation_id
      AND consultations.user_id = auth.uid()
    )
  );

-- Enable realtime for all tables
alter publication supabase_realtime add table ai_agents;
alter publication supabase_realtime add table subscription_tiers;
alter publication supabase_realtime add table user_subscriptions;
alter publication supabase_realtime add table consultations;
alter publication supabase_realtime add table consultation_agents;
alter publication supabase_realtime add table consultation_files;

-- Insert default data
-- Default AI Agents
INSERT INTO ai_agents (name, specialty, description, icon_name, is_premium) VALUES
('Central AI Orchestrator', 'Multi-specialty coordination', 'Coordinates between specialist AIs to provide comprehensive insights and recommendations.', 'Brain', false),
('Cardiology AI', 'Heart & Circulatory System', 'Specializes in heart conditions, ECG analysis, and cardiovascular treatment recommendations.', 'HeartPulse', false),
('Neurology AI', 'Brain & Nervous System', 'Focuses on neurological disorders, brain imaging analysis, and cognitive assessments.', 'Brain', false),
('Radiology AI', 'Medical Imaging', 'Analyzes X-rays, MRIs, CT scans and other medical images to assist in diagnosis.', 'Microscope', true),
('General Medicine AI', 'Primary Care', 'Provides general medical advice, preventive care recommendations, and initial assessments.', 'Stethoscope', false),
('Pediatrics AI', 'Child & Adolescent Health', 'Specializes in the health and development of children and adolescents.', 'Stethoscope', true),
('Dermatology AI', 'Skin Conditions', 'Analyzes skin conditions, lesions, and rashes to assist in dermatological diagnosis.', 'Microscope', true),
('Psychiatry AI', 'Mental Health', 'Assists with mental health assessments, treatment recommendations, and therapy guidance.', 'Brain', true)
ON CONFLICT DO NOTHING;

-- Default Subscription Tiers
INSERT INTO subscription_tiers (name, description, price_monthly, price_annual, features) VALUES
('Free', 'Basic access to AI medical assistants', 0, 0, '{"max_agents": 3, "premium_agents": false, "advanced_collaboration": false, "priority_support": false}'),
('Premium', 'Full access to all AI medical assistants', 49.99, 499.99, '{"max_agents": null, "premium_agents": true, "advanced_collaboration": true, "priority_support": true}')
ON CONFLICT DO NOTHING;
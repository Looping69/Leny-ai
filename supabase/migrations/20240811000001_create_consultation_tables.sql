-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  patient_id TEXT,
  patient_name TEXT,
  query TEXT,
  status TEXT NOT NULL DEFAULT 'in-progress',
  consensus_level INTEGER,
  final_recommendation TEXT,
  symptoms JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultation_messages table
CREATE TABLE IF NOT EXISTS consultation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  ai_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultation_agents table
CREATE TABLE IF NOT EXISTS consultation_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES ai_agents(id),
  opinion TEXT,
  reasoning TEXT,
  confidence INTEGER,
  sources JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consultation_files table
CREATE TABLE IF NOT EXISTS consultation_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  is_image BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_files ENABLE ROW LEVEL SECURITY;

-- Create policies for consultations
CREATE POLICY "Users can view their own consultations"
  ON consultations FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own consultations"
  ON consultations FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own consultations"
  ON consultations FOR UPDATE
  USING (user_id = auth.uid());

-- Create policies for consultation_messages
CREATE POLICY "Users can view messages for their consultations"
  ON consultation_messages FOR SELECT
  USING ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

CREATE POLICY "Users can insert messages for their consultations"
  ON consultation_messages FOR INSERT
  WITH CHECK ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

-- Create policies for consultation_agents
CREATE POLICY "Users can view agent contributions for their consultations"
  ON consultation_agents FOR SELECT
  USING ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

CREATE POLICY "Users can insert agent contributions for their consultations"
  ON consultation_agents FOR INSERT
  WITH CHECK ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

CREATE POLICY "Users can update agent contributions for their consultations"
  ON consultation_agents FOR UPDATE
  USING ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

-- Create policies for consultation_files
CREATE POLICY "Users can view files for their consultations"
  ON consultation_files FOR SELECT
  USING ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

CREATE POLICY "Users can insert files for their consultations"
  ON consultation_files FOR INSERT
  WITH CHECK ((SELECT user_id FROM consultations WHERE id = consultation_id) = auth.uid());

-- Add master user policies for all tables
CREATE POLICY "Master users can view all consultations"
  ON consultations FOR SELECT
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) = 'master');

CREATE POLICY "Master users can view all consultation messages"
  ON consultation_messages FOR SELECT
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) = 'master');

CREATE POLICY "Master users can view all consultation agents"
  ON consultation_agents FOR SELECT
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) = 'master');

CREATE POLICY "Master users can view all consultation files"
  ON consultation_files FOR SELECT
  USING ((SELECT role FROM user_profiles WHERE id = auth.uid()) = 'master');

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE consultations;
ALTER PUBLICATION supabase_realtime ADD TABLE consultation_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE consultation_agents;
ALTER PUBLICATION supabase_realtime ADD TABLE consultation_files;

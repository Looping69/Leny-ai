-- Drop existing policies before creating new ones to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can insert their own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can update their own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can delete their own consultations" ON consultations;

-- Recreate policies with IF NOT EXISTS clause
CREATE POLICY "Users can view their own consultations" ON consultations
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own consultations" ON consultations
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consultations" ON consultations
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own consultations" ON consultations
FOR DELETE USING (auth.uid() = user_id);

-- Do the same for consultation_messages table
DROP POLICY IF EXISTS "Users can view their consultation messages" ON consultation_messages;
DROP POLICY IF EXISTS "Users can insert consultation messages" ON consultation_messages;

-- Recreate consultation_messages policies
CREATE POLICY "Users can view their consultation messages" ON consultation_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM consultations
    WHERE consultations.id = consultation_messages.consultation_id
    AND consultations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert consultation messages" ON consultation_messages
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM consultations
    WHERE consultations.id = consultation_messages.consultation_id
    AND consultations.user_id = auth.uid()
  )
);

-- Fix policies for consultation_agents table
DROP POLICY IF EXISTS "Users can view their consultation agents" ON consultation_agents;
DROP POLICY IF EXISTS "Users can insert consultation agents" ON consultation_agents;

-- Recreate consultation_agents policies
CREATE POLICY "Users can view their consultation agents" ON consultation_agents
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM consultations
    WHERE consultations.id = consultation_agents.consultation_id
    AND consultations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert consultation agents" ON consultation_agents
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM consultations
    WHERE consultations.id = consultation_agents.consultation_id
    AND consultations.user_id = auth.uid()
  )
);

-- Fix policies for consultation_files table
DROP POLICY IF EXISTS "Users can view their consultation files" ON consultation_files;
DROP POLICY IF EXISTS "Users can insert consultation files" ON consultation_files;

-- Recreate consultation_files policies
CREATE POLICY "Users can view their consultation files" ON consultation_files
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM consultations
    WHERE consultations.id = consultation_files.consultation_id
    AND consultations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert consultation files" ON consultation_files
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM consultations
    WHERE consultations.id = consultation_files.consultation_id
    AND consultations.user_id = auth.uid()
  )
);

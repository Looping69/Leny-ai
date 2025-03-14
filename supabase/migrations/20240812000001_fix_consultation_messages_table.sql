-- Create the consultation_messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS consultation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  content TEXT NOT NULL,
  ai_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE consultation_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for consultation_messages
DROP POLICY IF EXISTS "Users can view their own consultation messages" ON consultation_messages;
CREATE POLICY "Users can view their own consultation messages"
ON consultation_messages
FOR SELECT
USING (
  consultation_id IN (
    SELECT id FROM consultations WHERE user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert their own consultation messages" ON consultation_messages;
CREATE POLICY "Users can insert their own consultation messages"
ON consultation_messages
FOR INSERT
WITH CHECK (
  consultation_id IN (
    SELECT id FROM consultations WHERE user_id = auth.uid()
  )
);

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE consultation_messages;

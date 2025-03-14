-- Create a storage bucket for consultation files
INSERT INTO storage.buckets (id, name, public)
VALUES ('consultation-files', 'consultation-files', true);

-- Set up security policies for the bucket
CREATE POLICY "Public Access to Consultation Files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'consultation-files');

CREATE POLICY "Authenticated users can upload consultation files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'consultation-files' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own consultation files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'consultation-files' AND owner = auth.uid());

CREATE POLICY "Users can delete their own consultation files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'consultation-files' AND owner = auth.uid());

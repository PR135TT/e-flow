
-- Create a storage bucket for property images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'properties-images',
  'properties-images',
  true,
  5242880, -- 5MB limit
  '{image/png,image/jpeg,image/gif,image/webp}'
)
ON CONFLICT (id) DO NOTHING;

-- Set up a policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'properties-images');

-- Set up a policy to allow anyone to view images
CREATE POLICY "Allow public access to property images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'properties-images');

-- Set up a policy to allow users to delete their own images
CREATE POLICY "Allow users to delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'properties-images' AND (storage.foldername(name))[1] = auth.uid()::text);

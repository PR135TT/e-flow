
-- Add foreign key constraint to properties table for owner_id
ALTER TABLE IF EXISTS public.properties
  ADD CONSTRAINT properties_owner_id_fkey
  FOREIGN KEY (owner_id)
  REFERENCES public.users(id)
  ON DELETE SET NULL;

-- Make sure the properties table structure is correct
ALTER TABLE IF EXISTS public.properties
  ALTER COLUMN owner_id TYPE UUID USING owner_id::UUID;

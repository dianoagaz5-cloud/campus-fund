
-- Créer le bucket de stockage campusfund-uploads (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'campusfund-uploads',
  'campusfund-uploads',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "campusfund read" ON storage.objects;
DROP POLICY IF EXISTS "campusfund insert" ON storage.objects;
DROP POLICY IF EXISTS "campusfund update" ON storage.objects;
DROP POLICY IF EXISTS "campusfund delete" ON storage.objects;

-- Recréer les policies avec accès complet pour tous (anon + authenticated)
CREATE POLICY "campusfund public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'campusfund-uploads');

CREATE POLICY "campusfund public insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'campusfund-uploads');

CREATE POLICY "campusfund public update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'campusfund-uploads');

CREATE POLICY "campusfund public delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'campusfund-uploads');

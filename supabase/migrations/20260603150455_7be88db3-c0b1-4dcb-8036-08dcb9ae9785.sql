
CREATE POLICY "campusfund read" ON storage.objects FOR SELECT USING (bucket_id = 'campusfund-uploads');
CREATE POLICY "campusfund insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'campusfund-uploads');

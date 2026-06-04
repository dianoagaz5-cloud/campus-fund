-- Enable real-time for public.loan_requests and public.capital_settings
-- This allows the admin and user spaces to update instantly when changes occur.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'loan_requests'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE loan_requests;
    END IF;
    
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'capital_settings'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE capital_settings;
    END IF;
  END IF;
END $$;

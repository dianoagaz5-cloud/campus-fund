-- Créer la table capital_settings
CREATE TABLE IF NOT EXISTS public.capital_settings (
  id text PRIMARY KEY DEFAULT 'default',
  capital_actuel numeric NOT NULL DEFAULT 0,
  objectif_capital numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Accorder les permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.capital_settings TO anon, authenticated;
GRANT ALL ON public.capital_settings TO service_role;

-- Activer RLS
ALTER TABLE public.capital_settings ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si existantes
DROP POLICY IF EXISTS "public read capital_settings" ON public.capital_settings;
DROP POLICY IF EXISTS "public write capital_settings" ON public.capital_settings;

-- Créer les politiques pour la lecture et l'écriture publiques
CREATE POLICY "public read capital_settings" ON public.capital_settings FOR SELECT USING (true);
CREATE POLICY "public write capital_settings" ON public.capital_settings FOR ALL USING (true) WITH CHECK (true);

-- Initialiser la ligne par défaut
INSERT INTO public.capital_settings (id, capital_actuel, objectif_capital)
VALUES ('default', 0, 0)
ON CONFLICT (id) DO NOTHING;

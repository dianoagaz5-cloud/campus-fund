-- Ajouter les colonnes approved_at et les pourcentages de répartition des bénéfices

-- 1. Ajouter approved_at à loan_requests si elle n'existe pas
ALTER TABLE public.loan_requests 
ADD COLUMN IF NOT EXISTS approved_at timestamptz;

-- 2. Ajouter les pourcentages de bénéfices à capital_settings s'ils n'existent pas
ALTER TABLE public.capital_settings 
ADD COLUMN IF NOT EXISTS pct_personnel numeric NOT NULL DEFAULT 50,
ADD COLUMN IF NOT EXISTS pct_associe numeric NOT NULL DEFAULT 10,
ADD COLUMN IF NOT EXISTS pct_reinvesti numeric NOT NULL DEFAULT 40;


CREATE TABLE public.loan_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  age int not null,
  field_of_study text,
  profession text,
  address text,
  id_doc_type text,
  id_doc_number text,
  id_photo_url text,
  person_photo_url text,
  guarantee_photo_url text,
  signature_url text,
  guarantee text,
  whatsapp_number text not null,
  loan_amount numeric not null,
  interest_rate numeric not null default 30,
  repayment_amount numeric,
  request_date date,
  honor_declaration boolean default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected','reimbursed')),
  user_email text,
  created_at timestamptz not null default now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.loan_requests TO anon, authenticated;
GRANT ALL ON public.loan_requests TO service_role;

ALTER TABLE public.loan_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read loan_requests" ON public.loan_requests FOR SELECT USING (true);
CREATE POLICY "public insert loan_requests" ON public.loan_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "public update loan_requests" ON public.loan_requests FOR UPDATE USING (true) WITH CHECK (true);

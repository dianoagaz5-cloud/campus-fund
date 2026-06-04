
-- Ajouter la politique DELETE manquante sur loan_requests
-- C'est ce qui empêchait la suppression de fonctionner
CREATE POLICY "public delete loan_requests" ON public.loan_requests FOR DELETE USING (true);

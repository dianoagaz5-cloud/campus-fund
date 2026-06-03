import { supabase } from "@/integrations/supabase/client";

export const BUCKET = "campusfund-uploads";

export async function uploadFile(file: File, folder: string): Promise<string> {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Fichier trop volumineux (max 5 Mo)");
  }
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export async function getSignedUrl(path: string, expires = 3600): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, expires);
  return data?.signedUrl ?? null;
}

export function formatFCFA(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " FCFA";
}

export const WHATSAPP_URL = "https://wa.me/2290150085142";
export const WHATSAPP_DISPLAY = "+229 01 50 08 51 42";
export const SUPPORT_EMAIL = "ahihovitale@gmail.com";

export const ADMIN_EMAILS = ["dianoagaz5@gmail.com", "ahihovitale@gmail.com"];

export async function checkIsAdmin(email: string | undefined): Promise<boolean> {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}


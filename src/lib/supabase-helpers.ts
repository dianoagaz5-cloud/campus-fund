import { supabase } from "@/integrations/supabase/client";
import imageCompression from "browser-image-compression";

export const BUCKET = "campusfund-uploads";

/**
 * Compresse une image côté client avant upload pour accélérer le transfert.
 * Réduit la taille à max 800px de largeur et max 300 Ko.
 */
async function compressImage(file: File): Promise<File> {
  // Ne compresser que les images
  if (!file.type.startsWith("image/")) return file;

  const options = {
    maxSizeMB: 0.3, // 300 Ko max
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    initialQuality: 0.7,
  };

  try {
    const compressed = await imageCompression(file, options);
    return compressed;
  } catch {
    // En cas d'échec de compression, renvoyer le fichier original
    return file;
  }
}

export async function uploadFile(file: File, folder: string): Promise<string> {
  const isImage = file.type.startsWith("image/");
  
  // Limite initiale : 25 Mo pour les images (qui seront compressées), 5 Mo pour les autres fichiers (PDFs, etc.)
  const initialLimit = isImage ? 25 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > initialLimit) {
    throw new Error(isImage ? "Image trop volumineuse (max 25 Mo)" : "Fichier trop volumineux (max 5 Mo)");
  }

  // Compresser l'image avant upload
  const processedFile = await compressImage(file);

  // Vérifier la taille finale après compression
  if (processedFile.size > 5 * 1024 * 1024) {
    throw new Error("Le fichier dépasse encore la limite de 5 Mo après compression");
  }

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, processedFile, {
    cacheControl: "31536000", // Cache 1 an (les fichiers ne changent pas)
    upsert: false,
  });
  if (error) throw error;
  return path;
}

/**
 * Retourne l'URL publique directe du fichier (plus rapide que signed URL).
 * Fonctionne car le bucket est public.
 */
export function getPublicUrl(path: string): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl ?? null;
}

/**
 * @deprecated Utiliser getPublicUrl() pour de meilleures performances
 */
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

import { s as supabase } from "./client-BbGhPpkX.mjs";
import { i as imageCompression } from "../_libs/browser-image-compression.mjs";
const BUCKET = "campusfund-uploads";
async function compressImage(file) {
  if (!file.type.startsWith("image/")) return file;
  const options = {
    maxSizeMB: 0.3,
    // 300 Ko max
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    initialQuality: 0.7
  };
  try {
    const compressed = await imageCompression(file, options);
    return compressed;
  } catch {
    return file;
  }
}
async function uploadFile(file, folder) {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Fichier trop volumineux (max 5 Mo)");
  }
  const processedFile = await compressImage(file);
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, processedFile, {
    cacheControl: "31536000",
    // Cache 1 an (les fichiers ne changent pas)
    upsert: false
  });
  if (error) throw error;
  return path;
}
function getPublicUrl(path) {
  if (!path) return null;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl ?? null;
}
function formatFCFA(n) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " FCFA";
}
const WHATSAPP_URL = "https://wa.me/2290150085142";
const WHATSAPP_DISPLAY = "+229 01 50 08 51 42";
const SUPPORT_EMAIL = "ahihovitale@gmail.com";
const ADMIN_EMAILS = ["dianoagaz5@gmail.com", "ahihovitale@gmail.com"];
async function checkIsAdmin(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email);
}
export {
  ADMIN_EMAILS as A,
  SUPPORT_EMAIL as S,
  WHATSAPP_URL as W,
  WHATSAPP_DISPLAY as a,
  checkIsAdmin as c,
  formatFCFA as f,
  getPublicUrl as g,
  uploadFile as u
};

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

export function getRemainingDays(startDateStr: string | null | undefined, createdAtStr: string) {
  const start = startDateStr || createdAtStr;
  const deadline = new Date(start).getTime() + 14 * 24 * 3600 * 1000;
  const diff = deadline - Date.now();
  const isOverdue = diff < 0;
  const absDiff = Math.abs(diff);
  const days = Math.floor(absDiff / (24 * 3600 * 1000));
  const hours = Math.floor((absDiff % (24 * 3600 * 1000)) / (3600 * 1000));
  
  if (isOverdue) {
    return {
      text: days > 0 ? `Retard ${days}j` : `Retard ${hours}h`,
      isOverdue: true,
      days
    };
  } else {
    return {
      text: days > 0 ? `Reste ${days}j` : `Reste ${hours}h`,
      isOverdue: false,
      days
    };
  }
}

export function downloadContractPDF(loan: any) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Veuillez autoriser les popups pour télécharger le contrat.");
    return;
  }
  
  const formattedAmount = formatFCFA(loan.loan_amount);
  const formattedRepayment = formatFCFA(loan.loan_amount * 1.3);
  const fullName = `${loan.first_name} ${loan.last_name}`;
  const dateStr = loan.request_date ? new Date(loan.request_date).toLocaleDateString("fr-FR") : new Date(loan.created_at || new Date()).toLocaleDateString("fr-FR");
  const signatureUrl = loan.signature_url ? getPublicUrl(loan.signature_url) : null;

  printWindow.document.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contrat de Prêt - ${fullName}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #111827;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          @media (min-width: 640px) {
            body {
              padding: 40px;
            }
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0d3d2e;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            color: #0d3d2e;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          @media (min-width: 640px) {
            .title {
              font-size: 24px;
            }
          }
          .subtitle {
            font-size: 12px;
            color: #6b7280;
            margin-top: 5px;
          }
          @media (min-width: 640px) {
            .subtitle {
              font-size: 14px;
            }
          }
          .section {
            margin-bottom: 25px;
          }
          .article-title {
            font-weight: bold;
            color: #0d3d2e;
            margin-bottom: 5px;
            font-size: 14px;
            border-bottom: 1px solid #f4f0e8;
            padding-bottom: 3px;
          }
          @media (min-width: 640px) {
            .article-title {
              font-size: 16px;
            }
          }
          .article-body {
            font-size: 13px;
            text-align: justify;
          }
          @media (min-width: 640px) {
            .article-body {
              font-size: 14px;
            }
          }
          .signatures {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            page-break-inside: avoid;
            gap: 20px;
          }
          .signature-box {
            width: 48%;
          }
          .signature-title {
            font-weight: bold;
            color: #0d3d2e;
            font-size: 12px;
            margin-bottom: 10px;
          }
          @media (min-width: 640px) {
            .signature-title {
              font-size: 14px;
            }
          }
          .signature-line {
            border-bottom: 1px dashed #6b7280;
            height: 70px;
            margin-top: 10px;
            position: relative;
          }
          .signature-img {
            max-height: 60px;
            max-width: 100%;
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
          }
          .metadata {
            margin-top: 30px;
            font-size: 11px;
            color: #6b7280;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
          }
          @media (min-width: 640px) {
            .metadata {
              font-size: 12px;
            }
          }
          @media print {
            body {
              padding: 20px;
            }
            .no-print {
              display: none;
            }
          }
          .print-btn {
            display: block;
            width: 100%;
            max-width: 280px;
            margin: 10px auto 30px auto;
            padding: 12px 24px;
            background-color: #0d3d2e;
            color: #c9a84c;
            text-align: center;
            border: none;
            border-radius: 9999px;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: all 0.2s;
          }
          .print-btn:hover {
            background-color: #0a2f23;
            transform: translateY(-1px);
          }
        </style>
      </head>
      <body>
        <button class="print-btn no-print" onclick="window.print()">Imprimer / Enregistrer en PDF</button>
        <div class="header">
          <div class="title">CONTRAT DE PRÊT CAMPUSFUND</div>
          <div class="subtitle">Référence du prêt : ${loan.id} | Date de signature : ${dateStr}</div>
        </div>
        
        <div class="section">
          <div class="article-title">ARTICLE 1 — PARTIES AU CONTRAT</div>
          <div class="article-body">
            Entre le créancier <strong>CampusFund</strong> et le débiteur <strong>${fullName}</strong>, 
            âgé(e) de ${loan.age} ans, résidant à ${loan.address || "—"}, 
            titulaire du document d'identité ${loan.id_doc_type || "—"} sous le numéro ${loan.id_doc_number || "—"}.
          </div>
        </div>

        <div class="section">
          <div class="article-title">ARTICLE 2 — MONTANT ET INTÉRÊTS</div>
          <div class="article-body">
            Le montant du principal prêté s'élève à <strong>${formattedAmount}</strong>. 
            Les intérêts sont fixés à un taux de 30% du montant du principal, soit <strong>${formatFCFA(loan.loan_amount * 0.3)}</strong>. 
            Le montant total dû et exigible au remboursement s'élève à <strong>${formattedRepayment}</strong>.
          </div>
        </div>

        <div class="section">
          <div class="article-title">ARTICLE 3 — DURÉE ET REMBOURSEMENT</div>
          <div class="article-body">
            La durée du prêt est de <strong>14 jours</strong> (2 semaines) à compter de la date de prise de créance (remise des fonds). 
            Le remboursement total doit être effectué au plus tard au terme de ce délai.
          </div>
        </div>

        <div class="section">
          <div class="article-title">ARTICLE 4 — GARANTIE MATÉRIELLE</div>
          <div class="article-body">
            En garantie du remboursement de sa créance, le débiteur a fourni l'objet suivant : 
            <strong>${loan.guarantee || "—"}</strong>. Le créancier conserve la garde ou les informations relatives à cet objet 
            jusqu'au remboursement complet.
          </div>
        </div>

        <div class="section">
          <div class="article-title">ARTICLE 5 — CLAUSE DE PUBLICATION PUBLIQUE</div>
          <div class="article-body">
            En cas de défaut de paiement à l'échéance convenue, le débiteur autorise de manière irrévocable CampusFund 
            à publier ses données personnelles (identité, photos d'identité et de sa personne, montant restant dû) 
            sur les réseaux sociaux (Facebook, Instagram, Snapchat, Twitter/X et WhatsApp) afin d'assurer le recouvrement, 
            et de procéder à la saisie définitive de la garantie matérielle.
          </div>
        </div>

        <div class="section">
          <div class="article-title">ARTICLE 6 — DÉCLARATION SUR L'HONNEUR</div>
          <div class="article-body">
            Le débiteur certifie sur l'honneur l'exactitude de toutes les informations fournies dans le cadre de cette demande, 
            et déclare accepter les termes et conditions du présent contrat.
          </div>
        </div>

        <div class="signatures">
          <div class="signature-box">
            <div class="signature-title">Le créancier (CampusFund)</div>
            <div class="signature-line" style="border-bottom: none; display: flex; align-items: flex-end; font-weight: bold; font-size: 20px; color: #0d3d2e; height: 80px;">
              CAMPUSFUND
            </div>
          </div>
          <div class="signature-box" style="text-align: right;">
            <div class="signature-title" style="text-align: right;">Le débiteur (${fullName})</div>
            <div class="signature-line">
              ${signatureUrl ? `<img class="signature-img" src="${signatureUrl}" alt="Signature" />` : ''}
            </div>
          </div>
        </div>

        <div class="metadata">
          Contrat signé numériquement. Validation par déclaration sur l'honneur.<br>
          CampusFund — Solution de financement étudiant.
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, Loader2, CheckCircle, Shield, MessageCircle, Mail } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, formatFCFA, WHATSAPP_URL, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/supabase-helpers";
import { toast } from "sonner";

export const Route = createFileRoute("/loan-application")({
  head: () => ({ meta: [{ title: "Demande de prêt — CampusFund" }] }),
  component: LoanApplication,
});

type FormData = {
  first_name: string;
  last_name: string;
  age: string;
  field_of_study: string;
  profession: string;
  address: string;
  id_doc_type: string;
  id_doc_number: string;
  id_photo_url: string;
  person_photo_url: string;
  whatsapp_number: string;
  loan_amount: string;
  guarantee: string;
  guarantee_photo_url: string;
  request_date: string;
  signature_url: string;
  honor_declaration: boolean;
  user_email: string;
};

const initial: FormData = {
  first_name: "", last_name: "", age: "", field_of_study: "", profession: "",
  address: "", id_doc_type: "", id_doc_number: "", id_photo_url: "",
  person_photo_url: "", whatsapp_number: "", loan_amount: "", guarantee: "",
  guarantee_photo_url: "", request_date: new Date().toISOString().slice(0, 10),
  signature_url: "", honor_declaration: false,
  user_email: typeof window !== "undefined" ? (JSON.parse(localStorage.getItem("cf_user") || "{}").email || "") : "",
};

const TOTAL = 14;

const CODES = ["+229", "+228", "+225", "+227", "+226", "+221", "+223", "+234", "+33"];

const parseWhatsApp = (num: string) => {
  if (!num) {
    return { code: "+229", rest: "01" };
  }
  const foundCode = CODES.find((c) => num.startsWith(c));
  if (foundCode) {
    let rest = num.slice(foundCode.length);
    if (foundCode === "+229") {
      if (!rest.startsWith("01")) {
        rest = "01" + rest;
      }
    }
    return { code: foundCode, rest };
  }
  if (num.startsWith("+")) {
    const match = num.match(/^(\+\d{1,4})(.*)$/);
    if (match) {
      const code = match[1];
      let rest = match[2];
      if (code === "+229") {
        if (!rest.startsWith("01")) {
          rest = "01" + rest;
        }
      }
      return { code, rest };
    }
  }
  let rest = num;
  if (!rest.startsWith("01")) {
    rest = "01" + rest;
  }
  return { code: "+229", rest };
};

function LoanApplication() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setData((p) => ({ ...p, user_email: user.email || "" }));
        if (user.user_metadata?.first_name) {
          setData((p) => ({ ...p, first_name: user.user_metadata.first_name }));
        }
        if (user.user_metadata?.whatsapp) {
          setData((p) => ({ ...p, whatsapp_number: user.user_metadata.whatsapp }));
        }
      }
    });
  }, []);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((p) => ({ ...p, [k]: v }));

  const next = () => { setDirection(1); setStep((s) => Math.min(TOTAL, s + 1)); };
  const prev = () => { setDirection(-1); setStep((s) => Math.max(1, s - 1)); };

  const isStepValid = () => {
    switch (step) {
      case 1: return data.first_name.trim() && data.last_name.trim();
      case 2: return !!data.age;
      case 3: return data.address.trim();
      case 4: return data.id_doc_type && data.id_doc_number.trim();
      case 5: return !!data.id_photo_url;
      case 6: return !!data.person_photo_url;
      case 7: {
        const { code, rest } = parseWhatsApp(data.whatsapp_number);
        const digits = rest.replace(/\D/g, "");
        if (code === "+229") {
          return digits.length === 10 && digits.startsWith("01");
        }
        return digits.length >= 6;
      }
      case 8: return Number(data.loan_amount) > 0;
      case 10: return data.guarantee.trim();
      case 11: return !!data.guarantee_photo_url;
      case 12: return !!data.request_date;
      case 13: return !!data.signature_url;
      case 14: return data.honor_declaration;
      default: return true;
    }
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const amt = Number(data.loan_amount);
      const { error } = await supabase.from("loan_requests").insert({
        first_name: data.first_name,
        last_name: data.last_name,
        age: Number(data.age),
        field_of_study: data.field_of_study,
        profession: data.profession,
        address: data.address,
        id_doc_type: data.id_doc_type,
        id_doc_number: data.id_doc_number,
        id_photo_url: data.id_photo_url,
        person_photo_url: data.person_photo_url,
        guarantee_photo_url: data.guarantee_photo_url,
        signature_url: data.signature_url,
        guarantee: data.guarantee,
        whatsapp_number: data.whatsapp_number,
        loan_amount: amt,
        interest_rate: 30,
        repayment_amount: amt * 1.3,
        request_date: data.request_date,
        honor_declaration: data.honor_declaration,
        status: "pending",
        user_email: data.user_email || null,
      });
      if (error) throw error;
      setDone(true);
    } catch (e: any) {
      toast.error("Erreur lors de l'envoi : " + (e.message || "inconnue"));
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <SuccessScreen whatsapp={data.whatsapp_number} />;

  return (
    <PageShell>
      <section className="py-10 px-4 max-w-2xl mx-auto">
        <ProgressBar step={step} />
        <div className="card-premium p-6 md:p-10 mt-6 min-h-[420px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.3 }}
            >
              <StepContent 
                step={step} 
                data={data} 
                update={update} 
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button onClick={prev} className="px-5 py-2.5 rounded-full font-medium text-[#0d3d2e] hover:bg-[#f4f0e8] flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>
          ) : <div />}

          {step < TOTAL ? (
            <button
              onClick={next}
              disabled={!isStepValid()}
              className="ml-auto px-7 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 disabled:hover:scale-100"
              style={{ background: "#0d3d2e", color: "#c9a84c" }}
            >
              Continuer <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!isStepValid() || submitting}
              className="ml-auto px-7 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-40"
              style={{ background: "#c9a84c", color: "#0d3d2e" }}
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</> : "Soumettre la demande"}
            </button>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / TOTAL) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-semibold text-[#0d3d2e]">Étape {step} / {TOTAL}</span>
        <span className="text-[#6b7280]">{pct}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f4f0e8" }}>
        <motion.div className="h-full rounded-full" style={{ background: "#c9a84c" }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-[#0d3d2e] mb-2">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition" />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition min-h-[110px]" />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition bg-white" />;
}

function StepTitle({ n, t, s }: { n: string; t: string; s?: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#c9a84c" }}>Étape {n}</div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#0d3d2e]">{t}</h2>
      {s && <p className="text-[#6b7280] mt-2 text-sm">{s}</p>}
    </div>
  );
}

function UploadField({ value, onChange, folder, label }: { value: string; onChange: (p: string) => void; folder: string; label: string }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = async (f: File) => {
    const isImage = f.type.startsWith("image/");
    const limit = isImage ? 25 * 1024 * 1024 : 5 * 1024 * 1024;
    if (f.size > limit) {
      toast.error(isImage ? "Image trop volumineuse (max 25 Mo)" : "Fichier trop volumineux (max 5 Mo)");
      return;
    }
    setPreview(URL.createObjectURL(f));
    setLoading(true);
    try {
      const path = await uploadFile(f, folder);
      onChange(path);
      toast.success("Fichier envoyé");
    } catch (e: any) {
      toast.error(e.message || "Erreur upload");
      setPreview(null);
    } finally { setLoading(false); }
  };

  return (
    <div>
      <Label>{label}</Label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[180px] transition-colors"
        style={{ borderColor: value ? "#c9a84c" : "#d4d4d8", background: value ? "#fffaee" : "#fafafa" }}
      >
        {loading ? (
          <><Loader2 className="w-8 h-8 animate-spin mb-2" style={{ color: "#c9a84c" }} /><span className="text-sm text-[#6b7280]">Chargement…</span></>
        ) : preview || value ? (
          <>
            {preview && <img src={preview} alt="" className="max-h-32 rounded-lg mb-2 object-cover" />}
            <span className="text-sm font-medium" style={{ color: "#c9a84c" }}>✓ Cliquer pour changer</span>
          </>
        ) : (
          <><Upload className="w-8 h-8 mb-2" style={{ color: "#c9a84c" }} /><span className="text-sm font-medium text-[#0d3d2e]">Cliquer pour téléverser</span><span className="text-xs text-[#6b7280] mt-1">Max 5 Mo</span></>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])} />
    </div>
  );
}

function StepContent({ 
  step, 
  data, 
  update
}: { 
  step: number; 
  data: FormData; 
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
}) {
  switch (step) {
    case 1: return (
      <>
        <StepTitle n="01" t="Vos identités" s="Indiquez vos nom et prénoms tels qu'ils figurent sur votre pièce." />
        <div className="space-y-4">
          <div><Label>Nom *</Label><Input value={data.last_name} onChange={(e) => update("last_name", e.target.value)} placeholder="Ex : Dossou" /></div>
          <div><Label>Prénoms *</Label><Input value={data.first_name} onChange={(e) => update("first_name", e.target.value)} placeholder="Ex : Arnaud" /></div>
        </div>
      </>
    );
    case 2: return (
      <>
        <StepTitle n="02" t="Votre parcours" />
        <div className="space-y-4">
          <div><Label>Âge *</Label><Input type="number" value={data.age} onChange={(e) => update("age", e.target.value)} placeholder="Ex : 22" /></div>
          <div><Label>Filière</Label><Input value={data.field_of_study} onChange={(e) => update("field_of_study", e.target.value)} placeholder="Ex : Informatique" /></div>
          <div><Label>Profession (si applicable)</Label><Input value={data.profession} onChange={(e) => update("profession", e.target.value)} placeholder="Ex : Étudiant" /></div>
        </div>
      </>
    );
    case 3: return (
      <>
        <StepTitle n="03" t="Votre adresse" s="Adresse complète où vous résidez actuellement." />
        <Label>Adresse *</Label>
        <Textarea value={data.address} onChange={(e) => update("address", e.target.value)} placeholder="Quartier, ville, repère…" />
      </>
    );
    case 4: return (
      <>
        <StepTitle n="04" t="Pièce d'identité" />
        <div className="space-y-4">
          <div>
            <Label>Type de document *</Label>
            <Select value={data.id_doc_type} onChange={(e) => update("id_doc_type", e.target.value)}>
              <option value="">— Sélectionnez —</option>
              <option>CNI</option><option>Passeport</option><option>Carte étudiant</option><option>Attestation</option>
            </Select>
          </div>
          <div><Label>Numéro du document *</Label><Input value={data.id_doc_number} onChange={(e) => update("id_doc_number", e.target.value.replace(/\D/g, ""))} /></div>
        </div>
      </>
    );
    case 5: return (
      <>
        <StepTitle n="05" t="Photo du document d'identité" s="Photo nette, lisible, recto." />
        <UploadField value={data.id_photo_url} onChange={(p) => update("id_photo_url", p)} folder="id" label="Document d'identité" />
      </>
    );
    case 6: return (
      <>
        <StepTitle n="06" t="Photo du demandeur" />
        <UploadField value={data.person_photo_url} onChange={(p) => update("person_photo_url", p)} folder="person" label="Votre photo récente" />
        <div className="mt-5 p-4 rounded-xl flex gap-3" style={{ background: "#fffaee", border: "1px solid #e3c97a" }}>
          <Shield className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#c9a84c" }} />
          <p className="text-sm text-[#5b4413]"><strong>Sécurité :</strong> seule cette personne pourra récupérer les fonds en main propre.</p>
        </div>
      </>
    );
    case 7: {
      const { code, rest } = parseWhatsApp(data.whatsapp_number);
      return (
        <>
          <StepTitle n="07" t="Numéro WhatsApp" />
          <Label>Numéro WhatsApp *</Label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <Select 
                value={code} 
                onChange={(e) => {
                  const newCode = e.target.value;
                  if (newCode === "+229") {
                    update("whatsapp_number", newCode + "01" + rest.replace(/^01/, ""));
                  } else {
                    update("whatsapp_number", newCode + rest.replace(/^01/, ""));
                  }
                }}
              >
                <option value="+229">Bénin (+229)</option>
                <option value="+228">Togo (+228)</option>
                <option value="+225">Côte d'Ivoire (+225)</option>
                <option value="+227">Niger (+227)</option>
                <option value="+226">Burkina Faso (+226)</option>
                <option value="+221">Sénégal (+221)</option>
                <option value="+223">Mali (+223)</option>
                <option value="+234">Nigeria (+234)</option>
                <option value="+33">France (+33)</option>
              </Select>
            </div>
            <div className="flex-1 flex">
              <input 
                type="text"
                value={rest} 
                onKeyDown={(e) => {
                  if (code === "+229") {
                    const start = e.currentTarget.selectionStart ?? 0;
                    const end = e.currentTarget.selectionEnd ?? 0;
                    if (e.key === "Backspace") {
                      if (start === end && start <= 2) {
                        e.preventDefault();
                      } else if (start !== end && start < 2) {
                        e.preventDefault();
                      }
                    } else if (e.key === "Delete") {
                      if (start === end && start < 2) {
                        e.preventDefault();
                      } else if (start !== end && start < 2) {
                        e.preventDefault();
                      }
                    }
                  }
                }}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (code === "+229") {
                    if (!val.startsWith("01")) {
                      val = "01" + val.replace(/^01?/, "");
                      e.target.value = val;
                    }
                    update("whatsapp_number", code + val);
                  } else {
                    update("whatsapp_number", code + val);
                  }
                }} 
                className="w-full px-4 py-3 border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition rounded-xl"
                placeholder={code === "+229" ? "01XXXXXXXX" : "Numéro de téléphone"} 
              />
            </div>
          </div>
          {code === "+229" && (
            <p className="mt-1.5 text-xs text-[#6b7280]">
              Format Bénin : préfixe 01 (fixe) suivi de 8 chiffres ({(rest.length > 2 ? rest.length - 2 : 0)}/8 saisis)
            </p>
          )}
          {code === "+229" && rest.length > 2 && rest.length !== 10 && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              ⚠️ Le numéro béninois doit comporter exactement 8 chiffres après le 01.
            </p>
          )}
          {code !== "+229" && rest.length > 0 && rest.length < 6 && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">
              ⚠️ Le numéro doit comporter au moins 6 chiffres.
            </p>
          )}
          <p className="mt-4 text-sm text-[#6b7280]">⚠️ Vérifiez bien que ce numéro est actif sur WhatsApp — c'est par lui que nous vous contacterons.</p>
        </>
      );
    }
    case 8: {
      const amt = Number(data.loan_amount) || 0;
      return (
        <>
          <StepTitle n="08" t="Montant du prêt" />
          <Label>Montant souhaité (FCFA) *</Label>
          <Input type="number" value={data.loan_amount} onChange={(e) => update("loan_amount", e.target.value)} placeholder="Ex : 20000" />
          {amt > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-5 rounded-2xl text-white" style={{ background: "#0d3d2e" }}>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#c9a84c" }}>Total à rembourser</div>
              <div className="text-3xl font-bold mt-1" style={{ fontFamily: "var(--font-display)" }}>{formatFCFA(amt * 1.3)}</div>
              <div className="text-xs text-white/60 mt-1">Capital {formatFCFA(amt)} + 30% intérêts</div>
            </motion.div>
          )}
        </>
      );
    }
    case 9: return (
      <>
        <StepTitle n="09" t="Taux d'intérêt" s="Taux fixe et transparent — affiché ici pour confirmation." />
        <div className="rounded-2xl p-10 text-center text-white" style={{ background: "linear-gradient(160deg, #0d3d2e, #071f1c)" }}>
          <div className="text-7xl md:text-8xl font-bold" style={{ color: "#c9a84c", fontFamily: "var(--font-display)" }}>30%</div>
          <div className="mt-3 text-white/70">d'intérêts fixes, applicables à 100% des prêts</div>
        </div>
      </>
    );
    case 10: return (
      <>
        <StepTitle n="10" t="Garantie matérielle" />
        <Label>Description de la garantie *</Label>
        <Textarea value={data.guarantee} onChange={(e) => update("guarantee", e.target.value)} placeholder="Ex : Téléphone Samsung A53, ordinateur Lenovo IdeaPad…" />
        <div className="mt-5 p-4 rounded-xl text-sm" style={{ background: "#fff5f5", color: "#7f1d1d", border: "1px solid #fca5a5" }}>
          ⚠️ Cette garantie pourra être saisie en cas de non-remboursement.
        </div>
      </>
    );
    case 11: return (
      <>
        <StepTitle n="11" t="Photo de la garantie" />
        <UploadField value={data.guarantee_photo_url} onChange={(p) => update("guarantee_photo_url", p)} folder="guarantee" label="Photo de l'objet" />
      </>
    );
    case 12: return (
      <>
        <StepTitle n="12" t="Date de la demande" />
        <Label>Date *</Label>
        <Input type="date" value={data.request_date} onChange={(e) => update("request_date", e.target.value)} />
      </>
    );
    case 13: return (
      <>
        <StepTitle n="13" t="Votre signature" s="Photographiez votre signature manuscrite sur une feuille blanche." />
        <UploadField value={data.signature_url} onChange={(p) => update("signature_url", p)} folder="signature" label="Signature" />
      </>
    );
    case 14: return <Contract data={data} update={update} />;
    default: return null;
  }
}

function Contract({ data, update }: { data: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  const amt = Number(data.loan_amount) || 0;
  const fullName = `${data.first_name} ${data.last_name}`.trim();
  return (
    <>
      <StepTitle n="14" t="Contrat numérique" s="Veuillez lire attentivement, puis signer la déclaration." />
      <div className="rounded-2xl p-6 max-h-[420px] overflow-y-auto text-sm leading-relaxed" style={{ background: "#fafaf6", border: "1px solid #e5e7eb" }}>
        <div className="text-center mb-5 pb-4 border-b border-gray-200">
          <div className="font-bold text-lg text-[#0d3d2e]" style={{ fontFamily: "var(--font-display)" }}>CONTRAT DE PRÊT CAMPUSFUND</div>
          <div className="text-xs text-[#6b7280] mt-1">Le {data.request_date}</div>
        </div>
        <Article n="1" t="Parties au contrat">
          Entre <strong>CampusFund</strong> (le créancier) et <strong>{fullName || "—"}</strong>, {data.age} ans, demeurant à {data.address || "—"},
          titulaire du document {data.id_doc_type} n°{data.id_doc_number} (le débiteur).
        </Article>
        <Article n="2" t="Montant et intérêts">
          Capital prêté : <strong>{formatFCFA(amt)}</strong>. Taux d'intérêt fixe : <strong>30%</strong>.
          Montant total à rembourser : <strong>{formatFCFA(amt * 1.3)}</strong>.
        </Article>
        <Article n="3" t="Durée">
          La somme est remboursable dans un délai de <strong>2 semaines</strong> à compter de la remise des fonds.
        </Article>
        <Article n="4" t="Garantie">
          Le débiteur fournit la garantie suivante : <em>{data.guarantee || "—"}</em>, dont une photo est annexée au dossier.
        </Article>
        <Article n="5" t="Clause de publication publique">
          En cas de non-remboursement dans les délais, le débiteur autorise expressément CampusFund à publier ses informations
          personnelles (nom, photo, montant impayé) sur Facebook, Instagram, Snapchat, Twitter/X et WhatsApp, et à saisir la garantie.
        </Article>
        <Article n="6" t="Déclaration sur l'honneur">
          Le débiteur déclare avoir lu et accepté l'intégralité des conditions ci-dessus, sans réserve.
        </Article>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-gray-200 text-xs">
          <div><div className="font-semibold text-[#0d3d2e]">CampusFund</div><div className="text-[#6b7280]">Le créancier</div></div>
          <div className="text-right"><div className="font-semibold text-[#0d3d2e]">{fullName || "—"}</div><div className="text-[#6b7280]">Le débiteur</div></div>
        </div>
      </div>
      <label className="mt-5 flex items-start gap-3 cursor-pointer p-4 rounded-xl" style={{ background: "#fffaee", border: "1px solid #e3c97a" }}>
        <input type="checkbox" checked={data.honor_declaration} onChange={(e) => update("honor_declaration", e.target.checked)} className="mt-0.5 w-5 h-5 accent-[#c9a84c]" />
        <span className="text-sm text-[#0d3d2e]">
          Je soussigné(e) <strong>{fullName || "[votre nom complet]"}</strong> déclare sur l'honneur avoir lu et
          accepté les termes de ce contrat de prêt.
        </span>
      </label>
    </>
  );
}

function Article({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="font-semibold text-[#0d3d2e] mb-1">Article {n} — {t}</div>
      <div className="text-[#374151]">{children}</div>
    </div>
  );
}

function SuccessScreen({ whatsapp }: { whatsapp: string }) {
  return (
    <PageShell>
      <section className="py-20 px-6 max-w-2xl mx-auto text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.6 }}>
          <CheckCircle className="w-24 h-24 mx-auto" style={{ color: "#c9a84c" }} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mt-6 text-[#0d3d2e]">Demande créée !</h1>
        <p className="text-[#6b7280] mt-3 text-lg">Notre équipe va étudier votre dossier et vous répondre sur WhatsApp.</p>
        <p className="mt-2 font-bold text-xl text-[#0d3d2e]">{whatsapp}</p>

        <div className="card-premium mt-8 p-6 text-left text-sm" style={{ background: "#fffaee", borderTop: "3px solid #c9a84c" }}>
          <strong className="text-[#0d3d2e]">Récupération des fonds :</strong>
          <span className="text-[#6b7280]"> l'endroit et l'heure vous seront communiqués via WhatsApp. Seule la
          personne dont la photo a été fournie pourra récupérer les fonds en main propre.</span>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="px-6 py-3 rounded-full font-semibold text-white flex items-center gap-2" style={{ background: "#25D366" }}>
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="px-6 py-3 rounded-full font-semibold flex items-center gap-2" style={{ background: "#c9a84c", color: "#0d3d2e" }}>
            <Mail className="w-4 h-4" /> Email
          </a>
          <Link to="/" className="px-6 py-3 rounded-full font-semibold border border-[#0d3d2e] text-[#0d3d2e]">Accueil</Link>
        </div>
        <p className="text-xs text-[#6b7280] mt-6">Support : {WHATSAPP_DISPLAY}</p>
      </section>
    </PageShell>
  );
}

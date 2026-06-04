import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-l4Ct8XwF.mjs";
import { s as supabase } from "./client-BbGhPpkX.mjs";
import { W as WHATSAPP_URL, S as SUPPORT_EMAIL, a as WHATSAPP_DISPLAY, f as formatFCFA, u as uploadFile } from "./supabase-helpers-BRcV-BoS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/browser-image-compression.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { A as ArrowLeft, b as ArrowRight, c as LoaderCircle, d as CircleCheckBig, M as MessageCircle, a as Mail, e as Shield, U as Upload } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const initial = {
  first_name: "",
  last_name: "",
  age: "",
  field_of_study: "",
  profession: "",
  address: "",
  id_doc_type: "",
  id_doc_number: "",
  id_photo_url: "",
  person_photo_url: "",
  whatsapp_number: "",
  loan_amount: "",
  guarantee: "",
  guarantee_photo_url: "",
  request_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  signature_url: "",
  honor_declaration: false,
  user_email: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cf_user") || "{}").email || "" : ""
};
const TOTAL = 14;
function LoanApplication() {
  const [step, setStep] = reactExports.useState(1);
  const [direction, setDirection] = reactExports.useState(1);
  const [data, setData] = reactExports.useState(initial);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getUser().then(({
      data: {
        user
      }
    }) => {
      if (user?.email) {
        setData((p) => ({
          ...p,
          user_email: user.email || ""
        }));
        if (user.user_metadata?.first_name) {
          setData((p) => ({
            ...p,
            first_name: user.user_metadata.first_name
          }));
        }
        if (user.user_metadata?.whatsapp) {
          setData((p) => ({
            ...p,
            whatsapp_number: user.user_metadata.whatsapp
          }));
        }
      }
    });
  }, []);
  const update = (k, v) => setData((p) => ({
    ...p,
    [k]: v
  }));
  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(TOTAL, s + 1));
  };
  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
  };
  const isStepValid = () => {
    switch (step) {
      case 1:
        return data.first_name.trim() && data.last_name.trim();
      case 2:
        return !!data.age;
      case 3:
        return data.address.trim();
      case 4:
        return data.id_doc_type && data.id_doc_number.trim();
      case 5:
        return !!data.id_photo_url;
      case 6:
        return !!data.person_photo_url;
      case 7:
        return data.whatsapp_number.trim();
      case 8:
        return Number(data.loan_amount) > 0;
      case 10:
        return data.guarantee.trim();
      case 11:
        return !!data.guarantee_photo_url;
      case 12:
        return !!data.request_date;
      case 13:
        return !!data.signature_url;
      case 14:
        return data.honor_declaration;
      default:
        return true;
    }
  };
  const submit = async () => {
    setSubmitting(true);
    try {
      const amt = Number(data.loan_amount);
      const {
        error
      } = await supabase.from("loan_requests").insert({
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
        user_email: data.user_email || null
      });
      if (error) throw error;
      setDone(true);
    } catch (e) {
      toast.error("Erreur lors de l'envoi : " + (e.message || "inconnue"));
    } finally {
      setSubmitting(false);
    }
  };
  if (done) return /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessScreen, { whatsapp: data.whatsapp_number });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-10 px-4 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { step }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-6 md:p-10 mt-6 min-h-[420px] relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { custom: direction, initial: {
      opacity: 0,
      x: direction * 60
    }, animate: {
      opacity: 1,
      x: 0
    }, exit: {
      opacity: 0,
      x: direction * -60
    }, transition: {
      duration: 0.3
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepContent, { step, data, update }) }, step) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between gap-3", children: [
      step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: prev, className: "px-5 py-2.5 rounded-full font-medium text-[#0d3d2e] hover:bg-[#f4f0e8] flex items-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Retour"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      step < TOTAL ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: next, disabled: !isStepValid(), className: "ml-auto px-7 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 disabled:hover:scale-100", style: {
        background: "#0d3d2e",
        color: "#c9a84c"
      }, children: [
        "Continuer ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: submit, disabled: !isStepValid() || submitting, className: "ml-auto px-7 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-40", style: {
        background: "#c9a84c",
        color: "#0d3d2e"
      }, children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
        " Envoi…"
      ] }) : "Soumettre la demande" })
    ] })
  ] }) });
}
function ProgressBar({
  step
}) {
  const pct = Math.round(step / TOTAL * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[#0d3d2e]", children: [
        "Étape ",
        step,
        " / ",
        TOTAL
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#6b7280]", children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full overflow-hidden", style: {
      background: "#f4f0e8"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full rounded-full", style: {
      background: "#c9a84c"
    }, initial: {
      width: 0
    }, animate: {
      width: `${pct}%`
    }, transition: {
      duration: 0.4
    } }) })
  ] });
}
function Label({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[#0d3d2e] mb-2", children });
}
function Input(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...props, className: "w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition" });
}
function Textarea(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ...props, className: "w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition min-h-[110px]" });
}
function Select(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("select", { ...props, className: "w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 outline-none transition bg-white" });
}
function StepTitle({
  n,
  t,
  s
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest font-semibold mb-2", style: {
      color: "#c9a84c"
    }, children: [
      "Étape ",
      n
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#0d3d2e]", children: t }),
    s && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] mt-2 text-sm", children: s })
  ] });
}
function UploadField({
  value,
  onChange,
  folder,
  label
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const handle = async (f) => {
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Fichier > 5 Mo");
      return;
    }
    setPreview(URL.createObjectURL(f));
    setLoading(true);
    try {
      const path = await uploadFile(f, folder);
      onChange(path);
      toast.success("Fichier envoyé");
    } catch (e) {
      toast.error(e.message || "Erreur upload");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => inputRef.current?.click(), className: "w-full p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[180px] transition-colors", style: {
      borderColor: value ? "#c9a84c" : "#d4d4d8",
      background: value ? "#fffaee" : "#fafafa"
    }, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin mb-2", style: {
        color: "#c9a84c"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#6b7280]", children: "Chargement…" })
    ] }) : preview || value ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      preview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "", className: "max-h-32 rounded-lg mb-2 object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", style: {
        color: "#c9a84c"
      }, children: "✓ Cliquer pour changer" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 mb-2", style: {
        color: "#c9a84c"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#0d3d2e]", children: "Cliquer pour téléverser" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#6b7280] mt-1", children: "Max 5 Mo" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => e.target.files?.[0] && handle(e.target.files[0]) })
  ] });
}
function StepContent({
  step,
  data,
  update
}) {
  switch (step) {
    case 1:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "01", t: "Vos identités", s: "Indiquez vos nom et prénoms tels qu'ils figurent sur votre pièce." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nom *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.last_name, onChange: (e) => update("last_name", e.target.value), placeholder: "Ex : Dossou" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Prénoms *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.first_name, onChange: (e) => update("first_name", e.target.value), placeholder: "Ex : Arnaud" })
          ] })
        ] })
      ] });
    case 2:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "02", t: "Votre parcours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Âge *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: data.age, onChange: (e) => update("age", e.target.value), placeholder: "Ex : 22" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Filière" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.field_of_study, onChange: (e) => update("field_of_study", e.target.value), placeholder: "Ex : Informatique" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Profession (si applicable)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.profession, onChange: (e) => update("profession", e.target.value), placeholder: "Ex : Étudiant" })
          ] })
        ] })
      ] });
    case 3:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "03", t: "Votre adresse", s: "Adresse complète où vous résidez actuellement." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Adresse *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: data.address, onChange: (e) => update("address", e.target.value), placeholder: "Quartier, ville, repère…" })
      ] });
    case 4:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "04", t: "Pièce d'identité" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type de document *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: data.id_doc_type, onChange: (e) => update("id_doc_type", e.target.value), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— Sélectionnez —" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "CNI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Passeport" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Carte étudiant" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Attestation" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Numéro du document *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.id_doc_number, onChange: (e) => update("id_doc_number", e.target.value) })
          ] })
        ] })
      ] });
    case 5:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "05", t: "Photo du document d'identité", s: "Photo nette, lisible, recto." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UploadField, { value: data.id_photo_url, onChange: (p) => update("id_photo_url", p), folder: "id", label: "Document d'identité" })
      ] });
    case 6:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "06", t: "Photo du demandeur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UploadField, { value: data.person_photo_url, onChange: (p) => update("person_photo_url", p), folder: "person", label: "Votre photo récente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-xl flex gap-3", style: {
          background: "#fffaee",
          border: "1px solid #e3c97a"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 mt-0.5 shrink-0", style: {
            color: "#c9a84c"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#5b4413]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sécurité :" }),
            " seule cette personne pourra récupérer les fonds en main propre."
          ] })
        ] })
      ] });
    case 7:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "07", t: "Numéro WhatsApp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Numéro WhatsApp *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: data.whatsapp_number, onChange: (e) => update("whatsapp_number", e.target.value), placeholder: "+229 ..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-[#6b7280]", children: "⚠️ Vérifiez bien que ce numéro est actif sur WhatsApp — c'est par lui que nous vous contacterons." })
      ] });
    case 8: {
      const amt = Number(data.loan_amount) || 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "08", t: "Montant du prêt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Montant souhaité (FCFA) *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: data.loan_amount, onChange: (e) => update("loan_amount", e.target.value), placeholder: "Ex : 20000" }),
        amt > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 8
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "mt-5 p-5 rounded-2xl text-white", style: {
          background: "#0d3d2e"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", style: {
            color: "#c9a84c"
          }, children: "Total à rembourser" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-bold mt-1", style: {
            fontFamily: "var(--font-display)"
          }, children: formatFCFA(amt * 1.3) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-white/60 mt-1", children: [
            "Capital ",
            formatFCFA(amt),
            " + 30% intérêts"
          ] })
        ] })
      ] });
    }
    case 9:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "09", t: "Taux d'intérêt", s: "Taux fixe et transparent — affiché ici pour confirmation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-10 text-center text-white", style: {
          background: "linear-gradient(160deg, #0d3d2e, #071f1c)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl md:text-8xl font-bold", style: {
            color: "#c9a84c",
            fontFamily: "var(--font-display)"
          }, children: "30%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-white/70", children: "d'intérêts fixes, applicables à 100% des prêts" })
        ] })
      ] });
    case 10:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "10", t: "Garantie matérielle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description de la garantie *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: data.guarantee, onChange: (e) => update("guarantee", e.target.value), placeholder: "Ex : Téléphone Samsung A53, ordinateur Lenovo IdeaPad…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 p-4 rounded-xl text-sm", style: {
          background: "#fff5f5",
          color: "#7f1d1d",
          border: "1px solid #fca5a5"
        }, children: "⚠️ Cette garantie pourra être saisie en cas de non-remboursement." })
      ] });
    case 11:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "11", t: "Photo de la garantie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UploadField, { value: data.guarantee_photo_url, onChange: (p) => update("guarantee_photo_url", p), folder: "guarantee", label: "Photo de l'objet" })
      ] });
    case 12:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "12", t: "Date de la demande" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: data.request_date, onChange: (e) => update("request_date", e.target.value) })
      ] });
    case 13:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "13", t: "Votre signature", s: "Photographiez votre signature manuscrite sur une feuille blanche." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UploadField, { value: data.signature_url, onChange: (p) => update("signature_url", p), folder: "signature", label: "Signature" })
      ] });
    case 14:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Contract, { data, update });
    default:
      return null;
  }
}
function Contract({
  data,
  update
}) {
  const amt = Number(data.loan_amount) || 0;
  const fullName = `${data.first_name} ${data.last_name}`.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepTitle, { n: "14", t: "Contrat numérique", s: "Veuillez lire attentivement, puis signer la déclaration." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 max-h-[420px] overflow-y-auto text-sm leading-relaxed", style: {
      background: "#fafaf6",
      border: "1px solid #e5e7eb"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-5 pb-4 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg text-[#0d3d2e]", style: {
          fontFamily: "var(--font-display)"
        }, children: "CONTRAT DE PRÊT CAMPUSFUND" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6b7280] mt-1", children: [
          "Le ",
          data.request_date
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Article, { n: "1", t: "Parties au contrat", children: [
        "Entre ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "CampusFund" }),
        " (le créancier) et ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: fullName || "—" }),
        ", ",
        data.age,
        " ans, demeurant à ",
        data.address || "—",
        ", titulaire du document ",
        data.id_doc_type,
        " n°",
        data.id_doc_number,
        " (le débiteur)."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Article, { n: "2", t: "Montant et intérêts", children: [
        "Capital prêté : ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatFCFA(amt) }),
        ". Taux d'intérêt fixe : ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "30%" }),
        ". Montant total à rembourser : ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatFCFA(amt * 1.3) }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Article, { n: "3", t: "Durée", children: [
        "La somme est remboursable dans un délai de ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "2 semaines" }),
        " à compter de la remise des fonds."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Article, { n: "4", t: "Garantie", children: [
        "Le débiteur fournit la garantie suivante : ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: data.guarantee || "—" }),
        ", dont une photo est annexée au dossier."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Article, { n: "5", t: "Clause de publication publique", children: "En cas de non-remboursement dans les délais, le débiteur autorise expressément CampusFund à publier ses informations personnelles (nom, photo, montant impayé) sur Facebook, Instagram, Snapchat, Twitter/X et WhatsApp, et à saisir la garantie." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Article, { n: "6", t: "Déclaration sur l'honneur", children: "Le débiteur déclare avoir lu et accepté l'intégralité des conditions ci-dessus, sans réserve." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-gray-200 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0d3d2e]", children: "CampusFund" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#6b7280]", children: "Le créancier" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0d3d2e]", children: fullName || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#6b7280]", children: "Le débiteur" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mt-5 flex items-start gap-3 cursor-pointer p-4 rounded-xl", style: {
      background: "#fffaee",
      border: "1px solid #e3c97a"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: data.honor_declaration, onChange: (e) => update("honor_declaration", e.target.checked), className: "mt-0.5 w-5 h-5 accent-[#c9a84c]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-[#0d3d2e]", children: [
        "Je soussigné(e) ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: fullName || "[votre nom complet]" }),
        " déclare sur l'honneur avoir lu et accepté les termes de ce contrat de prêt."
      ] })
    ] })
  ] });
}
function Article({
  n,
  t,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-[#0d3d2e] mb-1", children: [
      "Article ",
      n,
      " — ",
      t
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#374151]", children })
  ] });
}
function SuccessScreen({
  whatsapp
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 px-6 max-w-2xl mx-auto text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      scale: 0.5,
      opacity: 0
    }, animate: {
      scale: 1,
      opacity: 1
    }, transition: {
      type: "spring",
      duration: 0.6
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-24 h-24 mx-auto", style: {
      color: "#c9a84c"
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mt-6 text-[#0d3d2e]", children: "Demande créée !" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] mt-3 text-lg", children: "Notre équipe va étudier votre dossier et vous répondre sur WhatsApp." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-bold text-xl text-[#0d3d2e]", children: whatsapp }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium mt-8 p-6 text-left text-sm", style: {
      background: "#fffaee",
      borderTop: "3px solid #c9a84c"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-[#0d3d2e]", children: "Récupération des fonds :" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6b7280]", children: " l'endroit et l'heure vous seront communiqués via WhatsApp. Seule la personne dont la photo a été fournie pourra récupérer les fonds en main propre." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener", className: "px-6 py-3 rounded-full font-semibold text-white flex items-center gap-2", style: {
        background: "#25D366"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
        " WhatsApp"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${SUPPORT_EMAIL}`, className: "px-6 py-3 rounded-full font-semibold flex items-center gap-2", style: {
        background: "#c9a84c",
        color: "#0d3d2e"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4" }),
        " Email"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "px-6 py-3 rounded-full font-semibold border border-[#0d3d2e] text-[#0d3d2e]", children: "Accueil" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6b7280] mt-6", children: [
      "Support : ",
      WHATSAPP_DISPLAY
    ] })
  ] }) });
}
export {
  LoanApplication as component
};

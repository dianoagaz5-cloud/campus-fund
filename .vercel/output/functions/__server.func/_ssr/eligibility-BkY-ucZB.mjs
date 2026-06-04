import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, s as stagger, f as fadeUp } from "./PageShell-l4Ct8XwF.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { G as GraduationCap, F as FileCheck, M as MessageCircle, g as Lock, W as Wallet, P as PenTool, T as TriangleAlert, b as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const criteria = [{
  icon: GraduationCap,
  t: "Étudiant actif inscrit",
  d: "Vous devez être inscrit dans un établissement reconnu au Bénin."
}, {
  icon: FileCheck,
  t: "Document d'identité valide",
  d: "CNI, Passeport, Carte étudiant ou attestation officielle."
}, {
  icon: MessageCircle,
  t: "WhatsApp actif",
  d: "Un numéro WhatsApp opérationnel pour la communication."
}, {
  icon: Lock,
  t: "Garantie matérielle",
  d: "Téléphone, ordinateur ou autre bien comme garantie."
}, {
  icon: Wallet,
  t: "Montant raisonnable",
  d: "Proportionnel à votre capacité de remboursement (sous 2 semaines)."
}, {
  icon: PenTool,
  t: "Engagement de remboursement",
  d: "Vous vous engagez à rembourser le capital + 30% d'intérêts."
}];
function Eligibility() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-white py-24 px-6 text-center", style: {
      background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "text-5xl md:text-6xl font-bold mb-4", children: [
        "Critères d'",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "Éligibilité" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 max-w-2xl mx-auto text-lg", children: "Voici les conditions à remplir pour bénéficier d'un prêt CampusFund." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 px-6 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: stagger, className: "grid md:grid-cols-2 gap-6", children: criteria.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, className: "card-premium p-7 flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", style: {
          background: "#f4f0e8",
          color: "#0d3d2e"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold mb-1.5 text-[#0d3d2e]", children: c.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] text-sm leading-relaxed", children: c.d })
        ] })
      ] }, c.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: fadeUp, className: "mt-10 p-7 rounded-2xl border-2", style: {
        background: "#fff5f5",
        borderColor: "#fca5a5"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-7 h-7 text-red-600 shrink-0 mt-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-red-800 mb-2", children: "Avertissement important" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-900/85 text-sm leading-relaxed", children: [
            "⚠️ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "En cas de non-remboursement" }),
            " : publication publique de vos informations personnelles sur Facebook, Instagram, Snapchat, Twitter/X et WhatsApp + saisie de la garantie fournie."
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/loan-application", className: "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105", style: {
        background: "#c9a84c",
        color: "#0d3d2e"
      }, children: [
        "Je suis éligible — Demander un prêt ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] }) })
    ] })
  ] });
}
export {
  Eligibility as component
};

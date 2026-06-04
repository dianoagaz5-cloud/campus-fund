import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./PageShell-l4Ct8XwF.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { f as ChevronDown } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const items = [{
  q: "Qui peut bénéficier d'un prêt CampusFund ?",
  a: "Tout étudiant actif inscrit dans un établissement reconnu au Bénin et disposant d'une pièce d'identité valide (CNI, passeport, carte étudiant ou attestation)."
}, {
  q: "Quel est le montant maximum que je peux emprunter ?",
  a: "Il n'y a pas de plafond fixe. Le montant accordé est proportionnel à votre capacité de remboursement sous 2 semaines et à la garantie fournie."
}, {
  q: "Comment fonctionnent les 30% d'intérêts ?",
  a: "C'est un taux fixe et transparent. Exemple : si vous empruntez 10 000 FCFA, vous remboursez 13 000 FCFA (10 000 + 30%)."
}, {
  q: "Quel est le délai de réponse ?",
  a: "Généralement sous 24 heures via WhatsApp. Notre équipe étudie chaque dossier et vous contacte rapidement."
}, {
  q: "Que se passe-t-il en cas de non-remboursement ?",
  a: "En cas de non-remboursement, vos informations personnelles seront publiées publiquement sur Facebook, Instagram, Snapchat, Twitter/X et WhatsApp, et la garantie fournie sera saisie."
}, {
  q: "Comment se passe la récupération des fonds ?",
  a: "L'endroit et l'heure sont communiqués via WhatsApp. La présence physique est obligatoire — seule la personne dont la photo a été fournie peut récupérer les fonds."
}, {
  q: "Mes données sont-elles en sécurité ?",
  a: "Oui. Toutes les données et fichiers sont stockés de manière sécurisée sur notre infrastructure (Supabase) avec accès restreint."
}, {
  q: "Comment vous contacter ?",
  a: "Via WhatsApp au +229 01 50 08 51 42 ou par email à ahihovitale@gmail.com."
}];
function FAQ() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "text-white py-20 px-6 text-center", style: {
      background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "text-5xl md:text-6xl font-bold", children: [
      "Questions ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "fréquentes" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6 max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.04
      }, className: "card-premium overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(isOpen ? null : i), className: "w-full px-6 py-5 flex items-center justify-between gap-4 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#0d3d2e]", children: item.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { animate: {
            rotate: isOpen ? 180 : 0
          }, transition: {
            duration: 0.2
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5", style: {
            color: "#c9a84c"
          } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          height: 0,
          opacity: 0
        }, animate: {
          height: "auto",
          opacity: 1
        }, exit: {
          height: 0,
          opacity: 0
        }, transition: {
          duration: 0.25
        }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-5 text-[#6b7280] leading-relaxed", children: item.a }) }) })
      ] }, i);
    }) }) })
  ] });
}
export {
  FAQ as component
};

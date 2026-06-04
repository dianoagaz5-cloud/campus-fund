import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, s as stagger, f as fadeUp } from "./PageShell-l4Ct8XwF.mjs";
import { f as formatFCFA } from "./supabase-helpers-BRcV-BoS.mjs";
import "../_libs/browser-image-compression.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { S as Star } from "../_libs/lucide-react.mjs";
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
import "./client-BbGhPpkX.mjs";
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
const testimonials = [{
  name: "Awa Koné",
  field: "Médecine, UAC",
  amount: 25e3,
  color: "#0d3d2e",
  quote: "CampusFund m'a sauvée à un moment critique. J'avais besoin de fonds pour acheter du matériel médical pour mon stage. La réponse a été rapide et le processus très clair. Je recommande à 100%."
}, {
  name: "Koffi Mensah",
  field: "Droit, FADESP",
  amount: 15e3,
  color: "#c9a84c",
  quote: "Un service vraiment dédié aux étudiants. Pas de paperasse compliquée, tout se fait en ligne. Le taux est annoncé clairement dès le départ — pas de mauvaise surprise."
}, {
  name: "Mariama Diallo",
  field: "Informatique, EPAC",
  amount: 3e4,
  color: "#8b5cf6",
  quote: "J'ai pu acheter mon ordinateur portable pour mes projets de fin d'année grâce à CampusFund. L'équipe a été à l'écoute et professionnelle du début à la fin."
}, {
  name: "Toussaint Gbèhou",
  field: "Économie, FASEG",
  amount: 2e4,
  color: "#0ea5e9",
  quote: "Très satisfait. La transparence sur les 30% d'intérêts m'a mis en confiance. J'ai remboursé dans les délais sans aucun souci. Bravo pour l'initiative."
}, {
  name: "Fatoumata Traoré",
  field: "Pharmacie",
  amount: 35e3,
  color: "#dc2626",
  quote: "Service rapide et humain. J'ai apprécié la communication via WhatsApp, c'est plus pratique qu'un email. Et l'équipe répond vite. Merci CampusFund !"
}, {
  name: "Arnaud Dossou",
  field: "BTS Commerce",
  amount: 12e3,
  color: "#16a34a",
  quote: "Petit montant mais énorme dépannage. J'avais besoin de payer une formation certifiante et je n'avais pas l'argent à temps. CampusFund a sauvé la mise."
}, {
  name: "Blessing Adeyemi",
  field: "Architecture",
  amount: 5e4,
  color: "#f59e0b",
  quote: "Le plus gros prêt que j'ai sollicité — c'était pour mes maquettes et impressions de fin d'études. Tout s'est passé parfaitement, je referai appel à eux."
}, {
  name: "Cédric Houénou",
  field: "Génie Civil",
  amount: 18e3,
  color: "#9333ea",
  quote: "Le formulaire est bien conçu, étape par étape, pas stressant. La signature numérique du contrat est rassurante. Vraiment du sérieux."
}];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-white py-20 px-6 text-center", style: {
      background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "text-5xl md:text-6xl font-bold mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "Témoignages" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-8 mt-8", children: [{
        v: "200+",
        l: "étudiants"
      }, {
        v: "98%",
        l: "satisfaction"
      }, {
        v: "24h",
        l: "délai moyen"
      }].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl md:text-4xl font-bold", style: {
          color: "#c9a84c",
          fontFamily: "var(--font-display)"
        }, children: m.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/70 text-sm", children: m.l })
      ] }, m.l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
      once: true
    }, variants: stagger, className: "grid md:grid-cols-2 gap-6", children: testimonials.map((t) => {
      const initials = t.name.split(" ").map((n) => n[0]).join("");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, className: "card-premium p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current", style: {
          color: "#c9a84c"
        } }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-medium mb-3", style: {
          background: "#f4f0e8",
          color: "#0d3d2e"
        }, children: t.field }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[#1f2937] text-[15px] leading-relaxed italic mb-5", children: [
          '"',
          t.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full flex items-center justify-center text-white font-bold", style: {
              background: t.color
            }, children: initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0d3d2e]", children: t.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", style: {
            color: "#c9a84c"
          }, children: formatFCFA(t.amount) })
        ] })
      ] }, t.name);
    }) }) })
  ] });
}
export {
  Testimonials as component
};

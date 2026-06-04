import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell, s as stagger, f as fadeUp } from "./PageShell-l4Ct8XwF.mjs";
import { W as WHATSAPP_URL, S as SUPPORT_EMAIL } from "./supabase-helpers-BRcV-BoS.mjs";
import "../_libs/browser-image-compression.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { M as MessageCircle, a as Mail, C as Clock, T as TriangleAlert } from "../_libs/lucide-react.mjs";
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
function Contact() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-white py-20 px-6 text-center", style: {
      background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "text-5xl md:text-6xl font-bold", children: [
        "Nous ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "contacter" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mt-4", children: "Réponse rapide via WhatsApp ou email." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 px-6 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: stagger, className: "grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.a, { variants: fadeUp, href: WHATSAPP_URL, target: "_blank", rel: "noopener", className: "card-premium p-8 hover:scale-[1.02] transition-transform", style: {
          borderTop: "4px solid #25D366"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-5", style: {
            background: "#25D366"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2 text-[#0d3d2e]", children: "WhatsApp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] mb-3", children: "Réponse la plus rapide." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0d3d2e]", children: "Discuter avec un conseiller" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.a, { variants: fadeUp, href: `mailto:${SUPPORT_EMAIL}`, className: "card-premium p-8 hover:scale-[1.02] transition-transform", style: {
          borderTop: "4px solid #c9a84c"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl flex items-center justify-center mb-5", style: {
            background: "#c9a84c"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-7 h-7 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2 text-[#0d3d2e]", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] mb-3", children: "Pour les demandes détaillées." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#0d3d2e]", children: "Nous envoyer un e-mail" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "card-premium mt-8 p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6", style: {
            color: "#c9a84c"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-[#0d3d2e]", children: "Horaires" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4 text-sm", children: [{
          d: "Lundi – Vendredi",
          h: "8h – 20h"
        }, {
          d: "Samedi",
          h: "9h – 17h"
        }, {
          d: "Dimanche",
          h: "Urgences uniquement"
        }].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl", style: {
          background: "#f4f0e8"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[#0d3d2e]", children: r.d }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#6b7280] mt-1", children: r.h })
        ] }, r.d)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-6 rounded-2xl border-2 flex gap-4", style: {
        background: "#fff5f5",
        borderColor: "#fca5a5"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6 text-red-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-900/90 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Avertissement :" }),
          " CampusFund ne demande jamais de paiement à l'avance. Méfiez-vous des fraudes utilisant notre nom."
        ] })
      ] })
    ] })
  ] });
}
export {
  Contact as component
};

import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell, s as stagger, f as fadeUp } from "./PageShell-l4Ct8XwF.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as Sparkles, b as ArrowRight, Z as Zap, e as Shield, m as Users } from "../_libs/lucide-react.mjs";
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
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[92vh] flex items-center text-white overflow-hidden", style: {
      background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30 pointer-events-none", style: {
        background: "radial-gradient(circle at 80% 10%, rgba(201,168,76,0.25), transparent 50%), radial-gradient(circle at 10% 90%, rgba(201,168,76,0.15), transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-6 py-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs uppercase tracking-widest mb-8", style: {
          borderColor: "#c9a84c",
          color: "#e3c97a"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          "Micro-fonds Financier Étudiant"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 24
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.1
        }, className: "text-5xl md:text-7xl font-bold leading-[1.05] mb-6", style: {
          fontFamily: "var(--font-display)"
        }, children: [
          "Bienvenue sur",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "CampusFund" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.25
        }, className: "text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10", children: "Le micro-fonds dédié aux étudiants du Bénin. Un prêt rapide, sécurisé et 100% numérique, pour avancer sans attendre." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.4
        }, className: "flex flex-wrap gap-4 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/loan-application", className: "px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-105", style: {
            background: "#c9a84c",
            color: "#0d3d2e"
          }, children: [
            "CONTRACTER UN PRÊT ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eligibility", className: "px-7 py-3.5 rounded-full font-semibold border-2 border-white/90 hover:bg-white hover:text-[#0d3d2e] transition-all", children: "Conditions d'éligibilité" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: stagger, initial: "hidden", animate: "show", className: "mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto", children: [{
          icon: Zap,
          label: "Réponse rapide"
        }, {
          icon: Shield,
          label: "Sécurisé"
        }, {
          icon: Users,
          label: "Communauté"
        }].map(({
          icon: Icon,
          label
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, className: "flex items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", style: {
            color: "#c9a84c"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label })
        ] }, label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: fadeUp, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest font-semibold mb-3", style: {
          color: "#c9a84c"
        }, children: "Notre mission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold mb-6 text-[#0d3d2e]", children: "Qu'est-ce que CampusFund ?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] text-lg leading-relaxed mb-4", children: "CampusFund est un micro-fonds financier conçu spécifiquement pour les étudiants du Bénin. Notre but : offrir un accès rapide à de petits prêts pour couvrir les besoins urgents — frais de scolarité, matériel, transport, santé." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] text-lg leading-relaxed", children: "Tout se passe en ligne, en toute confiance, avec un taux fixe et transparent de 30%." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: stagger, className: "grid grid-cols-2 gap-4", children: [{
        v: "30%",
        l: "Taux fixe"
      }, {
        v: "⚡",
        l: "Réponse rapide"
      }, {
        v: "100%",
        l: "Numérique"
      }, {
        v: "🎓",
        l: "Pour étudiants"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, className: "card-premium p-6 text-center aspect-square flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl md:text-5xl font-bold mb-2", style: {
          color: "#0d3d2e",
          fontFamily: "var(--font-display)"
        }, children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-[#6b7280] font-medium", children: s.l })
      ] }, s.l)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6", style: {
      background: "#f4f0e8"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest font-semibold mb-3", style: {
          color: "#c9a84c"
        }, children: "Étape par étape" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-[#0d3d2e]", children: "Comment ça fonctionne ?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: {
        once: true
      }, variants: stagger, className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: [{
        n: "01",
        t: "Formulaire",
        d: "Remplissez votre dossier en ligne en quelques minutes."
      }, {
        n: "02",
        t: "Signature",
        d: "Signez le contrat numérique et joignez vos pièces."
      }, {
        n: "03",
        t: "Soumission",
        d: "Votre demande est envoyée à notre équipe."
      }, {
        n: "04",
        t: "Réponse WhatsApp",
        d: "Recevez la décision et les fonds via WhatsApp."
      }].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUp, className: "card-premium p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full flex items-center justify-center mb-5 font-bold text-xl", style: {
          background: "#0d3d2e",
          color: "#c9a84c",
          fontFamily: "var(--font-display)"
        }, children: step.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2 text-[#0d3d2e]", children: step.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#6b7280] text-sm leading-relaxed", children: step.d })
      ] }, step.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 text-white text-center", style: {
      background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl md:text-5xl font-bold mb-5", children: [
        "Prêt à ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "avancer" }),
        " ?"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mb-8 text-lg", children: "Lancez votre demande dès maintenant — réponse sous 24h." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/loan-application", className: "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105", style: {
        background: "#c9a84c",
        color: "#0d3d2e"
      }, children: [
        "Demander un prêt ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};

import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { X, p as Menu } from "../_libs/lucide-react.mjs";
function Logo({ size = "md" }) {
  const dim = size === "sm" ? 32 : size === "lg" ? 56 : 40;
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-full flex items-center justify-center font-bold text-[#0d3d2e]",
        style: {
          width: dim,
          height: dim,
          background: "linear-gradient(135deg, #e3c97a 0%, #c9a84c 100%)",
          boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
          fontFamily: "var(--font-display)",
          fontSize: dim * 0.42
        },
        children: "CF"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-display font-bold leading-none ${text}`, style: { fontFamily: "var(--font-display)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "CAMPUS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#c9a84c" }, children: "FUND" })
    ] })
  ] });
}
const links = [
  { to: "/", label: "Accueil" },
  { to: "/eligibility", label: "Éligibilité" },
  { to: "/testimonials", label: "Témoignages" },
  { to: "/user-space", label: "Mon Espace" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [open, setOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  const path = location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50", style: { background: "#0d3d2e" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-7", children: [
        links.map((l) => {
          const active = path === l.to;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              className: "text-sm font-medium transition-colors",
              style: { color: active ? "#c9a84c" : "rgba(255,255,255,0.85)" },
              children: l.label
            },
            l.to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/loan-application",
            className: "ml-2 px-5 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105",
            style: { background: "#c9a84c", color: "#0d3d2e" },
            children: "Demander un prêt"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "lg:hidden text-white p-2",
          onClick: () => setOpen(!open),
          "aria-label": "Menu",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {})
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden border-t border-white/10 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex flex-col gap-3", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          onClick: () => setOpen(false),
          className: "text-base",
          style: { color: path === l.to ? "#c9a84c" : "rgba(255,255,255,0.9)" },
          children: l.label
        },
        l.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/loan-application",
          onClick: () => setOpen(false),
          className: "mt-2 text-center px-5 py-2.5 rounded-full font-semibold",
          style: { background: "#c9a84c", color: "#0d3d2e" },
          children: "Demander un prêt"
        }
      )
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { style: { background: "#0d3d2e" }, className: "text-white py-12 mt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: "lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-sm font-medium tracking-wide mt-2",
        style: { color: "#c9a84c", fontFamily: "var(--font-display)" },
        children: "Accessibilité • Confiance • Organisation Professionnelle"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50 mt-4", children: "© 2026 CampusFund — Tous droits réservés" })
  ] }) });
}
function PageShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", style: { background: "#fafaf8" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.main,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
        className: "flex-1",
        children
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};
export {
  PageShell as P,
  fadeUp as f,
  stagger as s
};

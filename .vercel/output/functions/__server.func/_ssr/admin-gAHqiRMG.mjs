import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-l4Ct8XwF.mjs";
import { s as supabase } from "./client-BbGhPpkX.mjs";
import { c as checkIsAdmin, f as formatFCFA, A as ADMIN_EMAILS, g as getPublicUrl } from "./supabase-helpers-BRcV-BoS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as utils, w as writeFileSync } from "../_libs/xlsx.mjs";
import "../_libs/browser-image-compression.mjs";
import { L as LogOut, h as Search, D as Download, i as ChartColumn, W as Wallet, j as CircleAlert, k as TrendingUp, l as User, m as Users, f as ChevronDown, n as Trash2 } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, P as PieChart, b as Pie, C as Cell, L as Legend, c as LineChart, d as Line } from "../_libs/recharts.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const ADMIN_PASSWORD_FALLBACK = "campusfund2024";
function Admin() {
  const [authed, setAuthed] = reactExports.useState(false);
  const [tab, setTab] = reactExports.useState("requests");
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const checkAuth = async () => {
      const isSessionAdmin = sessionStorage.getItem("cf_admin") === "1";
      if (isSessionAdmin) {
        setAuthed(true);
        return;
      }
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const isAdmin = await checkIsAdmin(session.user.email);
        if (isAdmin) {
          sessionStorage.setItem("cf_admin", "1");
          setAuthed(true);
        }
      }
    };
    checkAuth();
  }, []);
  if (!authed) return /* @__PURE__ */ jsxRuntimeExports.jsx(Login, { onOk: () => setAuthed(true) });
  const logout = async () => {
    sessionStorage.removeItem("cf_admin");
    await supabase.auth.signOut();
    setAuthed(false);
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-10 px-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: {
          color: "#c9a84c"
        }, children: "Administration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#0d3d2e]", children: "Tableau de bord" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: logout, className: "flex items-center gap-2 px-4 py-2 rounded-full border border-[#0d3d2e] text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
        " Déconnexion"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-6", children: [{
      k: "requests",
      l: "Demandes"
    }, {
      k: "analytics",
      l: "Analytics"
    }, {
      k: "capital",
      l: "Capital"
    }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t.k), className: "px-5 py-2 rounded-full text-sm font-semibold transition-all", style: {
      background: tab === t.k ? "#0d3d2e" : "#f4f0e8",
      color: tab === t.k ? "#c9a84c" : "#6b7280"
    }, children: t.l }, t.k)) }),
    tab === "requests" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RequestsTab, {}) : tab === "analytics" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsTab, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(CapitalTab, {})
  ] }) });
}
function Login({
  onOk
}) {
  const [email, setEmail] = reactExports.useState("");
  const [pwd, setPwd] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password: pwd
      });
      if (!error && data.session) {
        const uEmail = data.session.user.email;
        const isAdmin = await checkIsAdmin(uEmail);
        if (isAdmin) {
          sessionStorage.setItem("cf_admin", "1");
          toast.success("Connexion réussie !");
          onOk();
          return;
        } else {
          await supabase.auth.signOut();
          toast.error("Vous n'êtes pas autorisé à accéder à cet espace.");
          return;
        }
      }
      if (ADMIN_EMAILS.includes(email) && pwd === ADMIN_PASSWORD_FALLBACK) {
        sessionStorage.setItem("cf_admin", "1");
        toast.success("Connexion administrateur locale réussie");
        onOk();
        return;
      }
      throw error || new Error("Identifiants invalides");
    } catch (err) {
      toast.error(err.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 px-6 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-center mb-6 text-[#0d3d2e]", children: "Connexion Admin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "card-premium p-7 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 rounded-xl border", disabled: loading, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "Mot de passe", value: pwd, onChange: (e) => setPwd(e.target.value), className: "w-full px-4 py-3 rounded-xl border", disabled: loading, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full px-6 py-3 rounded-full font-semibold disabled:opacity-50", style: {
        background: "#0d3d2e",
        color: "#c9a84c"
      }, disabled: loading, children: loading ? "Connexion..." : "Se connecter" })
    ] })
  ] }) });
}
function RequestsTab() {
  const [loans, setLoans] = reactExports.useState([]);
  const [status, setStatus] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [expanded, setExpanded] = reactExports.useState(null);
  const load = () => supabase.from("loan_requests").select("*").order("created_at", {
    ascending: false
  }).then(({
    data
  }) => setLoans(data || []));
  reactExports.useEffect(() => {
    load();
  }, []);
  const filtered = reactExports.useMemo(() => loans.filter((l) => {
    const okStatus = status === "all" || l.status === status;
    const q = search.toLowerCase();
    const okSearch = !q || `${l.first_name} ${l.last_name}`.toLowerCase().includes(q);
    return okStatus && okSearch;
  }), [loans, status, search]);
  const exportExcel = () => {
    const data = loans.map((l) => ({
      "ID": l.id,
      "Prénom": l.first_name,
      "Nom": l.last_name,
      "Âge": l.age,
      "WhatsApp": l.whatsapp_number,
      "Montant prêté (FCFA)": l.loan_amount,
      "À rembourser (FCFA)": l.repayment_amount,
      "Statut": l.status === "pending" ? "En attente" : l.status === "approved" ? "Approuvé" : l.status === "rejected" ? "Rejeté" : "Remboursé",
      "Date demande": l.request_date || "",
      "Date création": new Date(l.created_at).toLocaleDateString("fr-FR"),
      "Email": l.user_email || "",
      "Filière": l.field_of_study || "",
      "Profession": l.profession || "",
      "Adresse": l.address || "",
      "Garantie": l.guarantee || ""
    }));
    const ws = utils.json_to_sheet(data);
    ws["!cols"] = Object.keys(data[0] || {}).map((key) => ({
      wch: Math.max(key.length, ...data.map((r) => String(r[key] || "").length).slice(0, 20)) + 2
    }));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Demandes");
    writeFileSync(wb, `campusfund_demandes_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`);
    toast.success("Fichier Excel téléchargé");
  };
  const setLoanStatus = async (id, newStatus) => {
    const {
      error
    } = await supabase.from("loan_requests").update({
      status: newStatus
    }).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Statut mis à jour");
    load();
  };
  const deleteLoan = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer définitivement cette demande ? Cette action est irréversible.")) return;
    const {
      error
    } = await supabase.from("loan_requests").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Demande supprimée avec succès");
    load();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-4 mb-5 flex flex-wrap gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "px-4 py-2 rounded-xl border text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Tous statuts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "En attente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "approved", children: "Approuvé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rejected", children: "Rejeté" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "reimbursed", children: "Remboursé" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px] relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Rechercher par nom…", className: "w-full pl-9 pr-4 py-2 rounded-xl border text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportExcel, className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold", style: {
        background: "#c9a84c",
        color: "#0d3d2e"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
        " Export Excel"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(LoanRow, { loan: l, expanded: expanded === l.id, onToggle: () => setExpanded(expanded === l.id ? null : l.id), onStatusChange: setLoanStatus, onDelete: deleteLoan }, l.id)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-8 text-center text-[#6b7280]", children: "Aucune demande" })
    ] })
  ] });
}
const STATUS_META = {
  pending: {
    l: "En attente",
    bg: "#fef3c7",
    fg: "#92400e"
  },
  approved: {
    l: "Approuvé",
    bg: "#d1fae5",
    fg: "#065f46"
  },
  rejected: {
    l: "Rejeté",
    bg: "#fee2e2",
    fg: "#991b1b"
  },
  reimbursed: {
    l: "Remboursé",
    bg: "#dbeafe",
    fg: "#1e40af"
  }
};
function LoanRow({
  loan,
  expanded,
  onToggle,
  onStatusChange,
  onDelete
}) {
  const s = STATUS_META[loan.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, className: "card-premium overflow-hidden border border-gray-100/50 hover:border-gray-200 transition-all duration-300", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onToggle, className: "w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-[#fcfbf9]/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm", style: {
          background: "#0d3d2e"
        }, children: [
          loan.first_name?.[0],
          loan.last_name?.[0]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-[#0d3d2e] truncate", children: [
            loan.first_name,
            " ",
            loan.last_name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6b7280]", children: [
            new Date(loan.created_at).toLocaleDateString("fr-FR"),
            " · ",
            loan.whatsapp_number
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[#0d3d2e] hidden sm:block", children: formatFCFA(loan.loan_amount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full text-xs font-semibold shrink-0", style: {
          background: s.bg,
          color: s.fg
        }, children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
          rotate: expanded ? 180 : 0
        }, transition: {
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }, className: "text-[#6b7280] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-[#f4f0e8] grid md:grid-cols-2 gap-6 text-sm bg-[#faf8f5]/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs uppercase tracking-wider text-[#6b7280] mb-2", children: "Informations personnelles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Âge", value: loan.age }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Filière", value: loan.field_of_study }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Profession", value: loan.profession }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Adresse", value: loan.address }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Doc identité", value: `${loan.id_doc_type} · ${loan.id_doc_number}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: loan.user_email || "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs uppercase tracking-wider text-[#6b7280] mb-2", children: "Détails du prêt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Montant prêté", value: formatFCFA(loan.loan_amount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "À rembourser", value: formatFCFA(loan.repayment_amount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date demande", value: loan.request_date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Garantie", value: loan.guarantee })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs uppercase tracking-wider text-[#6b7280] mb-2", children: "Pièces jointes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [["id_photo_url", "Identité"], ["person_photo_url", "Personne"], ["guarantee_photo_url", "Garantie"], ["signature_url", "Signature"]].map(([k, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoThumb, { path: loan[k], label: l }, k)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex flex-wrap gap-2 pt-4 border-t border-[#f4f0e8] items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          loan.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onStatusChange(loan.id, "approved"), className: "px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] transition-colors shadow-sm shadow-emerald-100", children: "Approuver" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onStatusChange(loan.id, "rejected"), className: "px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors shadow-sm shadow-red-100", children: "Rejeter" })
          ] }),
          loan.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onStatusChange(loan.id, "reimbursed"), className: "px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-blue-100", children: "Marquer remboursé" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onStatusChange(loan.id, "rejected"), className: "px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors shadow-sm shadow-red-100", children: "Rejeter" })
          ] }),
          (loan.status === "rejected" || loan.status === "reimbursed") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#6b7280] bg-gray-100 px-3 py-1.5 rounded-full", children: "Demande clôturée" })
        ] }),
        (loan.status === "rejected" || loan.status === "reimbursed") && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onDelete(loan.id), className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border border-red-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
          " Supprimer la demande"
        ] })
      ] })
    ] }) }) })
  ] });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-[#6b7280]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#0d3d2e] font-medium", children: value || "—" })
  ] });
}
function PhotoThumb({
  path,
  label
}) {
  const url = path ? getPublicUrl(path) : null;
  if (!path) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square rounded-xl bg-gray-100 flex items-center justify-center text-xs text-[#6b7280]", children: [
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    "—"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: url || "#", target: "_blank", rel: "noopener", className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-gray-100", children: url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: label, className: "w-full h-full object-cover", loading: "lazy" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full animate-pulse" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-center mt-1 text-[#6b7280]", children: label })
  ] });
}
function AnalyticsTab() {
  const [loans, setLoans] = reactExports.useState([]);
  reactExports.useEffect(() => {
    supabase.from("loan_requests").select("*").then(({
      data
    }) => setLoans(data || []));
  }, []);
  const stats = reactExports.useMemo(() => {
    const total = loans.length;
    const totalLent = loans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
    const toCollect = loans.filter((l) => l.status === "approved").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
    const profit = loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.loan_amount || 0) * 0.3, 0);
    return {
      total,
      totalLent,
      toCollect,
      profit
    };
  }, [loans]);
  const bar = reactExports.useMemo(() => {
    const lent = loans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
    const received = loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
    return [{
      name: "Capital prêté",
      amount: lent
    }, {
      name: "Remboursements reçus",
      amount: received
    }];
  }, [loans]);
  const pie = reactExports.useMemo(() => {
    const counts = {
      pending: 0,
      approved: 0,
      rejected: 0,
      reimbursed: 0
    };
    loans.forEach((l) => {
      counts[l.status] = (counts[l.status] || 0) + 1;
    });
    return Object.entries(counts).map(([k, v]) => ({
      name: STATUS_META[k]?.l || k,
      value: v,
      key: k
    }));
  }, [loans]);
  const pieColors = ["#fbbf24", "#22c55e", "#ef4444", "#3b82f6"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: ChartColumn, label: "Total demandes", value: String(stats.total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: Wallet, label: "Total prêté", value: formatFCFA(stats.totalLent) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: CircleAlert, label: "À recouvrer", value: formatFCFA(stats.toCollect) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { icon: TrendingUp, label: "Profit réalisé", value: formatFCFA(stats.profit) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4 text-[#0d3d2e]", children: "Capital prêté vs remboursements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: bar, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatFCFA(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amount", fill: "#c9a84c", radius: [8, 8, 0, 0] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4 text-[#0d3d2e]", children: "Répartition des statuts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: pie, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 90, label: true, children: pie.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: pieColors[i] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) })
      ] })
    ] })
  ] });
}
function Kpi({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[#6b7280] text-xs uppercase mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-[#0d3d2e]", style: {
      fontFamily: "var(--font-display)"
    }, children: value })
  ] });
}
function CapitalTab() {
  const [loans, setLoans] = reactExports.useState([]);
  const [settings, setSettings] = reactExports.useState({
    capital_actuel: 0,
    objectif_capital: 0
  });
  const [inputCapital, setInputCapital] = reactExports.useState("");
  const [inputObjectif, setInputObjectif] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const loadData = async () => {
    setLoading(true);
    try {
      const {
        data: loanData
      } = await supabase.from("loan_requests").select("*");
      setLoans(loanData || []);
      const {
        data: settingsData
      } = await supabase.from("capital_settings").select("*").eq("id", "default").maybeSingle();
      if (settingsData) {
        setSettings({
          capital_actuel: Number(settingsData.capital_actuel),
          objectif_capital: Number(settingsData.objectif_capital)
        });
        setInputCapital(String(settingsData.capital_actuel));
        setInputObjectif(String(settingsData.objectif_capital));
      }
    } catch (err) {
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadData();
  }, []);
  const handleSaveCapital = async (e) => {
    e.preventDefault();
    const val = Number(inputCapital);
    if (isNaN(val) || val < 0) {
      toast.error("Veuillez saisir un montant valide.");
      return;
    }
    const {
      error
    } = await supabase.from("capital_settings").upsert({
      id: "default",
      capital_actuel: val
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Capital actuel enregistré");
      loadData();
    }
  };
  const handleSaveObjectif = async (e) => {
    e.preventDefault();
    const val = Number(inputObjectif);
    if (isNaN(val) || val < 0) {
      toast.error("Veuillez saisir un montant valide.");
      return;
    }
    const {
      error
    } = await supabase.from("capital_settings").upsert({
      id: "default",
      objectif_capital: val
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Objectif de capital enregistré");
      loadData();
    }
  };
  const Capital_Actuel = settings.capital_actuel;
  const Objectif_Capital = settings.objectif_capital;
  const Total_Prete = reactExports.useMemo(() => {
    return loans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
  }, [loans]);
  const Total_Rembourse = reactExports.useMemo(() => {
    return loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
  }, [loans]);
  const Prets_En_Cours = reactExports.useMemo(() => {
    return loans.filter((l) => l.status === "approved").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
  }, [loans]);
  const Benefices_Nets = reactExports.useMemo(() => {
    return loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.loan_amount || 0) * 0.3, 0);
  }, [loans]);
  const progressPercent = reactExports.useMemo(() => {
    if (Objectif_Capital <= 0) return 0;
    return Math.min(Capital_Actuel / Objectif_Capital * 100, 100);
  }, [Capital_Actuel, Objectif_Capital]);
  const lineChartData = reactExports.useMemo(() => {
    const months = [{
      name: "Avril",
      index: 3
    }, {
      name: "Mai",
      index: 4
    }, {
      name: "Juin",
      index: 5
    }, {
      name: "Juillet",
      index: 6
    }, {
      name: "Août",
      index: 7
    }, {
      name: "Septembre",
      index: 8
    }, {
      name: "Octobre",
      index: 9
    }, {
      name: "Novembre",
      index: 10
    }, {
      name: "Décembre",
      index: 11
    }];
    const loansByMonth = months.map((m) => {
      const monthLoans = loans.filter((l) => {
        const d = new Date(l.created_at);
        return d.getMonth() === m.index && d.getFullYear() === 2026;
      });
      const lent = monthLoans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
      const repaid = monthLoans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
      const activeRepayments = monthLoans.filter((l) => l.status === "approved").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
      return {
        mIndex: m.index,
        name: m.name,
        lent,
        repaid,
        activeRepayments
      };
    });
    const values = {};
    values[5] = Capital_Actuel;
    for (let i = 4; i >= 3; i--) {
      const nextMonthData = loansByMonth.find((m) => m.mIndex === i + 1);
      const repaidNext = nextMonthData ? nextMonthData.repaid : 0;
      const lentNext = nextMonthData ? nextMonthData.lent : 0;
      values[i] = Math.max(0, values[i + 1] - repaidNext + lentNext);
    }
    for (let i = 6; i <= 11; i++) {
      const prevVal = values[i - 1];
      let activeRepaidProjection = 0;
      if (i === 6) {
        const juneData = loansByMonth.find((m) => m.mIndex === 5);
        activeRepaidProjection = juneData ? juneData.activeRepayments : 0;
      }
      const gapToGoal = Math.max(0, Objectif_Capital - prevVal);
      const organicGrowth = gapToGoal * 0.15;
      values[i] = Math.round(prevVal + activeRepaidProjection + organicGrowth);
    }
    return months.map((m) => ({
      name: m.name,
      "Capital réel / projeté": values[m.index] || 0,
      "Objectif cible": Objectif_Capital
    }));
  }, [loans, Capital_Actuel, Objectif_Capital]);
  const barChartData = reactExports.useMemo(() => {
    return [{
      name: "Flux",
      "Capital prêté": Total_Prete,
      "Capital remboursé": Total_Rembourse
    }];
  }, [Total_Prete, Total_Rembourse]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 animate-fadeIn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0d3d2e] text-lg mb-4", children: "Capital actuel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveCapital, className: "flex gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "Renseignez le capital actuel disponible...", value: inputCapital, onChange: (e) => setInputCapital(e.target.value), className: "flex-1 px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0d3d2e]", disabled: loading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#0d3d2e] hover:bg-[#0a2f23] transition-colors", disabled: loading, children: "Enregistrer" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase text-[#6b7280]", children: "Capital actuel disponible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-[#0d3d2e] mt-1", children: formatFCFA(Capital_Actuel) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0d3d2e] text-lg mb-4", children: "Objectif de capital" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveObjectif, className: "flex gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "Renseignez l'objectif à atteindre...", value: inputObjectif, onChange: (e) => setInputObjectif(e.target.value), className: "flex-1 px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0d3d2e]", disabled: loading }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#0d3d2e] hover:bg-[#0a2f23] transition-colors", disabled: loading, children: "Enregistrer" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase text-[#6b7280]", children: "Cible à atteindre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-[#c9a84c] mt-1", children: formatFCFA(Objectif_Capital) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0d3d2e] text-lg mb-4", children: "Bilan Financier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6b7280]", children: "Capital de départ renseigné" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#111827]", children: formatFCFA(Capital_Actuel) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6b7280]", children: "Total prêté (hors refusés)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#c9a84c]", children: formatFCFA(Total_Prete) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6b7280]", children: "Total remboursé + intérêts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#16a34a]", children: formatFCFA(Total_Rembourse) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6b7280]", children: "Prêts en cours (risque)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#dc2626]", children: formatFCFA(Prets_En_Cours) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#6b7280]", children: "Bénéfices nets (intérêts)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#7c3aed]", children: formatFCFA(Benefices_Nets) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0d3d2e] text-lg mb-2", children: "Suivi de l'Objectif" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-[#6b7280] mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Objectif ",
            formatFCFA(Objectif_Capital)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[#0d3d2e]", children: [
            progressPercent.toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 h-3 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#0d3d2e] h-full rounded-full transition-all duration-500", style: {
          width: `${progressPercent}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm text-[#0d3d2e] mb-4", children: "Graphique de croissance et projections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: lineChartData, margin: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 20
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (v) => `${v / 1e3}k`, tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatFCFA(Number(v)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "Capital réel / projeté", stroke: "#16a34a", strokeWidth: 3, dot: {
            r: 4
          }, activeDot: {
            r: 6
          }, name: "Capital projeté" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "Objectif cible", stroke: "#c9a84c", strokeDasharray: "5 5", strokeWidth: 2, dot: false, activeDot: false, name: `Objectif ${formatFCFA(Objectif_Capital)}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { verticalAlign: "bottom", wrapperStyle: {
            paddingTop: "15px"
          } })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0d3d2e] text-lg", children: "Répartition des bénéfices nets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#faf8f5]/40 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-[#0d3d2e]/10 flex items-center justify-center text-[#0d3d2e]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6b7280] font-medium", children: "Vous - 50%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-[#0d3d2e]", children: formatFCFA(Benefices_Nets * 0.5) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#faf8f5]/40 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6b7280] font-medium", children: "Associé - 20%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-[#c9a84c]", children: formatFCFA(Benefices_Nets * 0.2) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#faf8f5]/40 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#6b7280] font-medium", children: "Réinvesti - 30%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-[#7c3aed]", children: formatFCFA(Benefices_Nets * 0.3) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#6b7280] text-center pt-2", children: [
        "Calculé sur ",
        formatFCFA(Benefices_Nets),
        " de bénéfices nets générés"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#0d3d2e] text-lg mb-6", children: "Comparaison des Flux Financiers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: barChartData, margin: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
          fontSize: 11
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (v) => `${v / 1e3}k`, tick: {
          fontSize: 11
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => formatFCFA(Number(v)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { verticalAlign: "top", wrapperStyle: {
          paddingBottom: "20px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Capital prêté", fill: "#0d3d2e", radius: [8, 8, 0, 0], maxBarSize: 60 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "Capital remboursé", fill: "#c9a84c", radius: [8, 8, 0, 0], maxBarSize: 60 })
      ] }) }) })
    ] })
  ] });
}
export {
  Admin as component
};

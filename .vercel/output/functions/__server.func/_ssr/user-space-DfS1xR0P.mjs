import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageShell } from "./PageShell-l4Ct8XwF.mjs";
import { s as supabase } from "./client-BbGhPpkX.mjs";
import { c as checkIsAdmin, f as formatFCFA, W as WHATSAPP_URL, S as SUPPORT_EMAIL } from "./supabase-helpers-BRcV-BoS.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/browser-image-compression.mjs";
import { L as LogOut, M as MessageCircle, a as Mail, T as TriangleAlert, C as Clock } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
function UserSpace() {
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loans, setLoans] = reactExports.useState([]);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      if (session?.user) {
        const uEmail = session.user.email || "";
        setUser({
          firstName: session.user.user_metadata.first_name || uEmail.split("@")[0],
          email: uEmail,
          whatsapp: session.user.user_metadata.whatsapp || ""
        });
        checkIsAdmin(uEmail).then((res) => {
          setIsAdmin(res);
          if (res) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({
              to: "/admin"
            });
          }
        });
      }
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const uEmail = session.user.email || "";
        setUser({
          firstName: session.user.user_metadata.first_name || uEmail.split("@")[0],
          email: uEmail,
          whatsapp: session.user.user_metadata.whatsapp || ""
        });
        checkIsAdmin(uEmail).then((res) => {
          setIsAdmin(res);
          if (res) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({
              to: "/admin"
            });
          }
        });
      } else {
        setUser(null);
        setIsAdmin(false);
        sessionStorage.removeItem("cf_admin");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  reactExports.useEffect(() => {
    if (!user) return;
    supabase.from("loan_requests").select("*").eq("user_email", user.email).order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setLoans(data || []));
  }, [user]);
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScreen, { onLogin: setUser });
  const logout = async () => {
    await supabase.auth.signOut();
  };
  const active = loans.filter((l) => l.status === "pending" || l.status === "approved");
  const history = loans.filter((l) => l.status === "rejected" || l.status === "reimbursed");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-12 px-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-10 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: {
          color: "#c9a84c"
        }, children: "Mon Espace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-bold text-[#0d3d2e]", children: [
          "Bonjour ",
          user.firstName,
          " 👋"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d3d2e] text-[#c9a84c] hover:scale-105 transition-transform text-sm font-semibold", children: "Espace Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: logout, className: "flex items-center gap-2 px-4 py-2 rounded-full border border-[#0d3d2e] text-[#0d3d2e] hover:bg-[#0d3d2e] hover:text-white transition-colors text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
          " Déconnexion"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Demandes actives", loans: active, empty: "Vous n'avez aucune demande en cours." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Historique", loans: history, empty: "Aucune demande dans l'historique." }) })
  ] }) });
}
function Section({
  title,
  loans,
  empty
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-4 text-[#0d3d2e]", children: title }),
    loans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-premium p-8 text-center text-[#6b7280]", children: empty }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: loans.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(LoanCard, { loan: l }, l.id)) })
  ] });
}
const STATUS = {
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
function LoanCard({
  loan
}) {
  const s = STATUS[loan.status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "card-premium p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-[#6b7280]", children: "Montant prêté" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[#0d3d2e]", style: {
          fontFamily: "var(--font-display)"
        }, children: formatFCFA(loan.loan_amount) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full text-xs font-semibold", style: {
        background: s.bg,
        color: s.fg
      }, children: s.l })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-[#6b7280]", children: [
      "À rembourser : ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-[#0d3d2e]", children: formatFCFA(loan.repayment_amount) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[#6b7280] mt-1", children: [
      "Demandé le ",
      new Date(loan.created_at).toLocaleDateString("fr-FR")
    ] }),
    loan.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(Countdown, { createdAt: loan.created_at }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-gray-100 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener", className: "flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5", style: {
        background: "#25D366"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
        " WhatsApp"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${SUPPORT_EMAIL}`, className: "flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5", style: {
        background: "#c9a84c",
        color: "#0d3d2e"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
        " Email"
      ] })
    ] })
  ] });
}
function Countdown({
  createdAt
}) {
  const [now, setNow] = reactExports.useState(Date.now());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 6e4);
    return () => clearInterval(id);
  }, []);
  const deadline = new Date(createdAt).getTime() + 14 * 24 * 3600 * 1e3;
  const diff = deadline - now;
  const overdue = diff < 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / (24 * 3600 * 1e3));
  const hours = Math.floor(abs % (24 * 3600 * 1e3) / (3600 * 1e3));
  const mins = Math.floor(abs % (3600 * 1e3) / 6e4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 rounded-xl flex items-center gap-2 text-sm", style: {
    background: overdue ? "#fee2e2" : "#fffaee",
    color: overdue ? "#991b1b" : "#5b4413"
  }, children: [
    overdue ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: overdue ? `Dépassé de ${days}j ${hours}h` : `Reste : ${days}j ${hours}h ${mins}min` })
  ] });
}
function AuthScreen({
  onLogin
}) {
  const [mode, setMode] = reactExports.useState("login");
  const [firstName, setFirstName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password || mode === "signup" && (!firstName || !whatsapp)) {
      toast.error("Tous les champs sont requis");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          data: authData,
          error: authError
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              whatsapp
            }
          }
        });
        if (authError) throw authError;
        if (authData.session) {
          const uEmail = authData.session.user.email || "";
          onLogin({
            firstName,
            email: uEmail,
            whatsapp
          });
          toast.success("Compte créé et connecté !");
          const isAdmin = await checkIsAdmin(uEmail);
          if (isAdmin) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({
              to: "/admin"
            });
          }
        } else {
          toast.success("Inscription réussie ! Veuillez vérifier vos e-mails de confirmation.");
          setMode("login");
        }
      } else {
        const {
          data: authData,
          error: authError
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (authError) throw authError;
        if (authData.session) {
          const uEmail = authData.session.user.email || "";
          onLogin({
            firstName: authData.session.user.user_metadata.first_name || uEmail.split("@")[0],
            email: uEmail,
            whatsapp: authData.session.user.user_metadata.whatsapp || ""
          });
          toast.success("Connexion réussie !");
          const isAdmin = await checkIsAdmin(uEmail);
          if (isAdmin) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({
              to: "/admin"
            });
          }
        }
      }
    } catch (err) {
      toast.error(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-16 px-6 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-bold text-center mb-2 text-[#0d3d2e]", children: [
      "Mon ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "Espace" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[#6b7280] mb-8", children: "Suivez vos demandes de prêt" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-full p-1 mb-6", style: {
      background: "#f4f0e8"
    }, children: ["login", "signup"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(m), className: "flex-1 py-2 rounded-full text-sm font-semibold transition-all", style: {
      background: mode === m ? "#0d3d2e" : "transparent",
      color: mode === m ? "#c9a84c" : "#6b7280"
    }, children: m === "login" ? "Connexion" : "Inscription" }, m)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "card-premium p-7 space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[#0d3d2e] mb-2", children: "Prénom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: firstName, onChange: (e) => setFirstName(e.target.value), className: "w-full px-4 py-3 rounded-xl border", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[#0d3d2e] mb-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full px-4 py-3 rounded-xl border", required: true })
      ] }),
      mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[#0d3d2e] mb-2", children: "WhatsApp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: whatsapp, onChange: (e) => setWhatsapp(e.target.value), className: "w-full px-4 py-3 rounded-xl border", required: true, placeholder: "+229 ..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[#0d3d2e] mb-2", children: "Mot de passe" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full px-4 py-3 rounded-xl border", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full px-6 py-3 rounded-full font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50", style: {
        background: "#0d3d2e",
        color: "#c9a84c"
      }, children: loading ? "Chargement..." : mode === "login" ? "Me connecter" : "Créer mon compte" })
    ] })
  ] }) });
}
export {
  UserSpace as component
};

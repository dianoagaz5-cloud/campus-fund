import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, MessageCircle, Mail, Clock, AlertTriangle, Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { formatFCFA, WHATSAPP_URL, SUPPORT_EMAIL, checkIsAdmin, getRemainingDays, downloadContractPDF } from "@/lib/supabase-helpers";
import { toast } from "sonner";

export const Route = createFileRoute("/user-space")({
  head: () => ({ meta: [{ title: "Mon Espace — CampusFund" }] }),
  component: UserSpace,
});

type LocalUser = { firstName: string; email: string; whatsapp: string };

type Loan = {
  id: string; loan_amount: number; repayment_amount: number; created_at: string;
  status: "pending" | "approved" | "rejected" | "reimbursed"; request_date: string;
  approved_at?: string | null; signature_url?: string | null;
  age?: number; address?: string; id_doc_type?: string; id_doc_number?: string; guarantee?: string;
  first_name?: string; last_name?: string;
};

function UserSpace() {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté via Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const uEmail = session.user.email || "";
        setUser({
          firstName: session.user.user_metadata.first_name || uEmail.split("@")[0],
          email: uEmail,
          whatsapp: session.user.user_metadata.whatsapp || "",
        });
        checkIsAdmin(uEmail).then((res) => {
          setIsAdmin(res);
          if (res) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({ to: "/admin" });
          }
        });
      }
    });

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const uEmail = session.user.email || "";
        setUser({
          firstName: session.user.user_metadata.first_name || uEmail.split("@")[0],
          email: uEmail,
          whatsapp: session.user.user_metadata.whatsapp || "",
        });
        checkIsAdmin(uEmail).then((res) => {
          setIsAdmin(res);
          if (res) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({ to: "/admin" });
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

  useEffect(() => {
    if (!user) return;
    
    const loadLoans = () => {
      supabase.from("loan_requests").select("*").eq("user_email", user.email).order("created_at", { ascending: false })
        .then(({ data }) => setLoans((data as any) || []));
    };

    loadLoans();

    const channel = supabase
      .channel(`user-loans-changes-${user.email}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loan_requests" },
        () => {
          loadLoans();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!user) return <AuthScreen onLogin={setUser} />;

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const active = loans.filter((l) => l.status === "pending" || l.status === "approved");
  const history = loans.filter((l) => l.status === "rejected" || l.status === "reimbursed");

  return (
    <PageShell>
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
          <div>
            <p className="text-sm" style={{ color: "#c9a84c" }}>Mon Espace</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0d3d2e]">Bonjour {user.firstName} 👋</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d3d2e] text-[#c9a84c] hover:scale-105 transition-transform text-sm font-semibold"
              >
                Espace Admin
              </Link>
            )}
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#0d3d2e] text-[#0d3d2e] hover:bg-[#0d3d2e] hover:text-white transition-colors text-sm">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>

        <Section title="Demandes actives" loans={active} empty="Vous n'avez aucune demande en cours." />
        <div className="mt-10"><Section title="Historique" loans={history} empty="Aucune demande dans l'historique." /></div>
      </section>
    </PageShell>
  );
}

function Section({ title, loans, empty }: { title: string; loans: Loan[]; empty: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#0d3d2e]">{title}</h2>
      {loans.length === 0 ? (
        <div className="card-premium p-8 text-center text-[#6b7280]">{empty}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">{loans.map((l) => <LoanCard key={l.id} loan={l} />)}</div>
      )}
    </div>
  );
}

const STATUS: Record<string, { l: string; bg: string; fg: string }> = {
  pending: { l: "En attente", bg: "#fef3c7", fg: "#92400e" },
  approved: { l: "Approuvé", bg: "#d1fae5", fg: "#065f46" },
  rejected: { l: "Rejeté", bg: "#fee2e2", fg: "#991b1b" },
  reimbursed: { l: "Remboursé", bg: "#dbeafe", fg: "#1e40af" },
};

function LoanCard({ loan }: { loan: Loan }) {
  const s = STATUS[loan.status];
  const remaining = loan.status === "approved" ? getRemainingDays(loan.approved_at, loan.created_at) : null;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-premium p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-xs uppercase text-[#6b7280]">Montant prêté</div>
          <div className="text-2xl font-bold text-[#0d3d2e]" style={{ fontFamily: "var(--font-display)" }}>{formatFCFA(loan.loan_amount)}</div>
        </div>
        <div className="flex items-center gap-2">
          {remaining && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{
                background: remaining.isOverdue ? "#fee2e2" : "#fffaee",
                color: remaining.isOverdue ? "#991b1b" : "#5b4413",
              }}
            >
              {remaining.text}
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.fg }}>{s.l}</span>
        </div>
      </div>
      <div className="text-sm text-[#6b7280]">À rembourser : <strong className="text-[#0d3d2e]">{formatFCFA(loan.repayment_amount)}</strong></div>
      <div className="text-xs text-[#6b7280] mt-1">Demandé le {new Date(loan.created_at).toLocaleDateString("fr-FR")}</div>

      {loan.status === "approved" && <Countdown approvedAt={loan.approved_at} createdAt={loan.created_at} />}

      <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <button
          onClick={() => downloadContractPDF(loan)}
          className="w-full text-center px-3 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-gray-100 hover:bg-[#fcfbf9] cursor-pointer"
          style={{ background: "#f4f0e8", color: "#0d3d2e" }}
        >
          <Download className="w-3.5 h-3.5" /> Télécharger le contrat (PDF)
        </button>
        <div className="flex gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5" style={{ background: "#25D366" }}>
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="flex-1 text-center px-3 py-2 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5" style={{ background: "#c9a84c", color: "#0d3d2e" }}>
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Countdown({ approvedAt, createdAt }: { approvedAt?: string | null; createdAt: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(id); }, []);
  const start = approvedAt || createdAt;
  const deadline = new Date(start).getTime() + 14 * 24 * 3600 * 1000;
  const diff = deadline - now;
  const overdue = diff < 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / (24 * 3600 * 1000));
  const hours = Math.floor((abs % (24 * 3600 * 1000)) / (3600 * 1000));
  const mins = Math.floor((abs % (3600 * 1000)) / 60000);

  return (
    <div className="mt-4 p-3 rounded-xl flex items-center gap-2 text-sm" style={{ background: overdue ? "#fee2e2" : "#fffaee", color: overdue ? "#991b1b" : "#5b4413" }}>
      {overdue ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
      <span>{overdue ? `Dépassé de ${days}j ${hours}h` : `Reste : ${days}j ${hours}h ${mins}min`}</span>
    </div>
  );
}

function AuthScreen({ onLogin }: { onLogin: (u: LocalUser) => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && (!firstName || !whatsapp))) {
      toast.error("Tous les champs sont requis");
      return;
    }
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              whatsapp: whatsapp,
            }
          }
        });
        if (authError) throw authError;

        if (authData.session) {
          const uEmail = authData.session.user.email || "";
          onLogin({
            firstName,
            email: uEmail,
            whatsapp,
          });
          toast.success("Compte créé et connecté !");
          const isAdmin = await checkIsAdmin(uEmail);
          if (isAdmin) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({ to: "/admin" });
          }
        } else {
          toast.success("Inscription réussie ! Veuillez vérifier vos e-mails de confirmation.");
          setMode("login");
        }
      } else {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;

        if (authData.session) {
          const uEmail = authData.session.user.email || "";
          onLogin({
            firstName: authData.session.user.user_metadata.first_name || uEmail.split("@")[0],
            email: uEmail,
            whatsapp: authData.session.user.user_metadata.whatsapp || "",
          });
          toast.success("Connexion réussie !");
          const isAdmin = await checkIsAdmin(uEmail);
          if (isAdmin) {
            sessionStorage.setItem("cf_admin", "1");
            navigate({ to: "/admin" });
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <section className="py-16 px-6 max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#0d3d2e]">Mon <span className="text-gold-gradient">Espace</span></h1>
        <p className="text-center text-[#6b7280] mb-8">Suivez vos demandes de prêt</p>

        <div className="flex rounded-full p-1 mb-6" style={{ background: "#f4f0e8" }}>
          {(["login", "signup"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className="flex-1 py-2 rounded-full text-sm font-semibold transition-all" style={{ background: mode === m ? "#0d3d2e" : "transparent", color: mode === m ? "#c9a84c" : "#6b7280" }}>
              {m === "login" ? "Connexion" : "Inscription"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="card-premium p-7 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-semibold text-[#0d3d2e] mb-2">Prénom</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3 rounded-xl border" required />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#0d3d2e] mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border" required />
          </div>
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-semibold text-[#0d3d2e] mb-2">WhatsApp</label>
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-4 py-3 rounded-xl border" required placeholder="+229 ..." />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#0d3d2e] mb-2">Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border" required />
          </div>
          <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-full font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50" style={{ background: "#0d3d2e", color: "#c9a84c" }}>
            {loading ? "Chargement..." : mode === "login" ? "Me connecter" : "Créer mon compte"}
          </button>
        </form>
      </section>
    </PageShell>
  );
}

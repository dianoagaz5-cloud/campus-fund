import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Download, Search, TrendingUp, Wallet, AlertCircle, BarChart3, Trash2, ChevronDown, User, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { formatFCFA, getSignedUrl, checkIsAdmin, ADMIN_EMAILS } from "@/lib/supabase-helpers";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — CampusFund" }] }),
  component: Admin,
});

const ADMIN_PASSWORD_FALLBACK = "campusfund2024";

type Loan = any;

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"requests" | "analytics" | "capital">("requests");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isSessionAdmin = sessionStorage.getItem("cf_admin") === "1";
      if (isSessionAdmin) {
        setAuthed(true);
        return;
      }

      // Vérifier si une session Supabase active correspond à un admin
      const { data: { session } } = await supabase.auth.getSession();
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

  if (!authed) return <Login onOk={() => setAuthed(true)} />;

  const logout = async () => {
    sessionStorage.removeItem("cf_admin");
    await supabase.auth.signOut();
    setAuthed(false);
    navigate({ to: "/" });
  };

  return (
    <PageShell>
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-sm" style={{ color: "#c9a84c" }}>Administration</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0d3d2e]">Tableau de bord</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#0d3d2e] text-sm">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {([
            { k: "requests", l: "Demandes" },
            { k: "analytics", l: "Analytics" },
            { k: "capital", l: "Capital" },
          ] as const).map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)} className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{ background: tab === t.k ? "#0d3d2e" : "#f4f0e8", color: tab === t.k ? "#c9a84c" : "#6b7280" }}>
              {t.l}
            </button>
          ))}
        </div>

        {tab === "requests" ? (
          <RequestsTab />
        ) : tab === "analytics" ? (
          <AnalyticsTab />
        ) : (
          <CapitalTab />
        )}
      </section>
    </PageShell>
  );
}

function Login({ onOk }: { onOk: () => void }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Tenter la connexion via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pwd,
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

      // 2. Repli local (fallback) si Supabase échoue ou n'est pas configuré
      if (ADMIN_EMAILS.includes(email) && pwd === ADMIN_PASSWORD_FALLBACK) {
        sessionStorage.setItem("cf_admin", "1");
        toast.success("Connexion administrateur locale réussie");
        onOk();
        return;
      }

      throw error || new Error("Identifiants invalides");
    } catch (err: any) {
      toast.error(err.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <section className="py-20 px-6 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#0d3d2e]">Connexion Admin</h1>
        <form onSubmit={submit} className="card-premium p-7 space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border" disabled={loading} required />
          <input type="password" placeholder="Mot de passe" value={pwd} onChange={(e) => setPwd(e.target.value)} className="w-full px-4 py-3 rounded-xl border" disabled={loading} required />
          <button type="submit" className="w-full px-6 py-3 rounded-full font-semibold disabled:opacity-50" style={{ background: "#0d3d2e", color: "#c9a84c" }} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </section>
    </PageShell>
  );
}

function RequestsTab() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => supabase.from("loan_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setLoans((data as any) || []));
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => loans.filter((l) => {
    const okStatus = status === "all" || l.status === status;
    const q = search.toLowerCase();
    const okSearch = !q || `${l.first_name} ${l.last_name}`.toLowerCase().includes(q);
    return okStatus && okSearch;
  }), [loans, status, search]);

  const exportCSV = () => {
    const headers = ["id", "first_name", "last_name", "age", "whatsapp", "loan_amount", "repayment_amount", "status", "created_at", "email"];
    const rows = loans.map((l) => [l.id, l.first_name, l.last_name, l.age, l.whatsapp_number, l.loan_amount, l.repayment_amount, l.status, l.created_at, l.user_email].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "campusfund_demandes.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const setLoanStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("loan_requests").update({ status: newStatus }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Statut mis à jour");
    load();
  };

  const deleteLoan = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer définitivement cette demande ? Cette action est irréversible.")) return;
    const { error } = await supabase.from("loan_requests").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Demande supprimée avec succès");
    load();
  };

  return (
    <>
      <div className="card-premium p-4 mb-5 flex flex-wrap gap-3 items-center">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 rounded-xl border text-sm">
          <option value="all">Tous statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvé</option>
          <option value="rejected">Rejeté</option>
          <option value="reimbursed">Remboursé</option>
        </select>
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher par nom…" className="w-full pl-9 pr-4 py-2 rounded-xl border text-sm" />
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "#c9a84c", color: "#0d3d2e" }}>
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((l) => (
          <LoanRow key={l.id} loan={l} expanded={expanded === l.id} onToggle={() => setExpanded(expanded === l.id ? null : l.id)} onStatusChange={setLoanStatus} onDelete={deleteLoan} />
        ))}
        {filtered.length === 0 && <div className="card-premium p-8 text-center text-[#6b7280]">Aucune demande</div>}
      </div>
    </>
  );
}

const STATUS_META: Record<string, { l: string; bg: string; fg: string }> = {
  pending: { l: "En attente", bg: "#fef3c7", fg: "#92400e" },
  approved: { l: "Approuvé", bg: "#d1fae5", fg: "#065f46" },
  rejected: { l: "Rejeté", bg: "#fee2e2", fg: "#991b1b" },
  reimbursed: { l: "Remboursé", bg: "#dbeafe", fg: "#1e40af" },
};

function LoanRow({ loan, expanded, onToggle, onStatusChange, onDelete }: { loan: Loan; expanded: boolean; onToggle: () => void; onStatusChange: (id: string, s: string) => void; onDelete: (id: string) => void }) {
  const s = STATUS_META[loan.status];
  return (
    <motion.div layout className="card-premium overflow-hidden border border-gray-100/50 hover:border-gray-200 transition-all duration-300">
      <button onClick={onToggle} className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-[#fcfbf9]/50 transition-colors">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm" style={{ background: "#0d3d2e" }}>
            {loan.first_name?.[0]}{loan.last_name?.[0]}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-[#0d3d2e] truncate">{loan.first_name} {loan.last_name}</div>
            <div className="text-xs text-[#6b7280]">{new Date(loan.created_at).toLocaleDateString("fr-FR")} · {loan.whatsapp_number}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="font-bold text-[#0d3d2e] hidden sm:block">{formatFCFA(loan.loan_amount)}</div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold shrink-0" style={{ background: s.bg, color: s.fg }}>{s.l}</span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#6b7280] shrink-0"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-[#f4f0e8] grid md:grid-cols-2 gap-6 text-sm bg-[#faf8f5]/30">
              <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#6b7280] mb-2">Informations personnelles</h4>
                <Field label="Âge" value={loan.age} />
                <Field label="Filière" value={loan.field_of_study} />
                <Field label="Profession" value={loan.profession} />
                <Field label="Adresse" value={loan.address} />
                <Field label="Doc identité" value={`${loan.id_doc_type} · ${loan.id_doc_number}`} />
                <Field label="Email" value={loan.user_email || "—"} />
              </div>
              <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#6b7280] mb-2">Détails du prêt</h4>
                  <Field label="Montant prêté" value={formatFCFA(loan.loan_amount)} />
                  <Field label="À rembourser" value={formatFCFA(loan.repayment_amount)} />
                  <Field label="Date demande" value={loan.request_date} />
                  <Field label="Garantie" value={loan.guarantee} />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#6b7280] mb-2">Pièces jointes</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[["id_photo_url", "Identité"], ["person_photo_url", "Personne"], ["guarantee_photo_url", "Garantie"], ["signature_url", "Signature"]].map(([k, l]) => (
                    <PhotoThumb key={k} path={loan[k]} label={l} />
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-2 pt-4 border-t border-[#f4f0e8] items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {loan.status === "pending" && (
                    <>
                      <button onClick={() => onStatusChange(loan.id, "approved")} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] transition-colors shadow-sm shadow-emerald-100">Approuver</button>
                      <button onClick={() => onStatusChange(loan.id, "rejected")} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors shadow-sm shadow-red-100">Rejeter</button>
                    </>
                  )}
                  {loan.status === "approved" && (
                    <>
                      <button onClick={() => onStatusChange(loan.id, "reimbursed")} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-blue-100">Marquer remboursé</button>
                      <button onClick={() => onStatusChange(loan.id, "rejected")} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors shadow-sm shadow-red-100">Rejeter</button>
                    </>
                  )}
                  {(loan.status === "rejected" || loan.status === "reimbursed") && (
                    <span className="text-sm font-medium text-[#6b7280] bg-gray-100 px-3 py-1.5 rounded-full">Demande clôturée</span>
                  )}
                </div>

                {(loan.status === "rejected" || loan.status === "reimbursed") && (
                  <button
                    onClick={() => onDelete(loan.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors border border-red-200"
                  >
                    <Trash2 className="w-4 h-4" /> Supprimer la demande
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-xs uppercase text-[#6b7280]">{label}</div>
      <div className="text-[#0d3d2e] font-medium">{value || "—"}</div>
    </div>
  );
}

function PhotoThumb({ path, label }: { path?: string; label: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => { if (path) getSignedUrl(path).then(setUrl); }, [path]);
  if (!path) return <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center text-xs text-[#6b7280]">{label}<br />—</div>;
  return (
    <a href={url || "#"} target="_blank" rel="noopener" className="block">
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
        {url ? <img src={url} alt={label} className="w-full h-full object-cover" /> : <div className="w-full h-full animate-pulse" />}
      </div>
      <div className="text-xs text-center mt-1 text-[#6b7280]">{label}</div>
    </a>
  );
}

function AnalyticsTab() {
  const [loans, setLoans] = useState<Loan[]>([]);
  useEffect(() => { supabase.from("loan_requests").select("*").then(({ data }) => setLoans((data as any) || [])); }, []);

  const stats = useMemo(() => {
    const total = loans.length;
    const totalLent = loans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
    const toCollect = loans.filter((l) => l.status === "approved").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
    const profit = loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.loan_amount || 0) * 0.3, 0);
    return { total, totalLent, toCollect, profit };
  }, [loans]);

  const bar = useMemo(() => {
    const lent = loans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
    const received = loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
    return [
      { name: "Capital prêté", amount: lent },
      { name: "Remboursements reçus", amount: received },
    ];
  }, [loans]);

  const pie = useMemo(() => {
    const counts: Record<string, number> = { pending: 0, approved: 0, rejected: 0, reimbursed: 0 };
    loans.forEach((l) => { counts[l.status] = (counts[l.status] || 0) + 1; });
    return Object.entries(counts).map(([k, v]) => ({ name: STATUS_META[k]?.l || k, value: v, key: k }));
  }, [loans]);

  const pieColors = ["#fbbf24", "#22c55e", "#ef4444", "#3b82f6"];

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Kpi icon={BarChart3} label="Total demandes" value={String(stats.total)} />
        <Kpi icon={Wallet} label="Total prêté" value={formatFCFA(stats.totalLent)} />
        <Kpi icon={AlertCircle} label="À recouvrer" value={formatFCFA(stats.toCollect)} />
        <Kpi icon={TrendingUp} label="Profit réalisé" value={formatFCFA(stats.profit)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card-premium p-6">
          <h3 className="font-bold mb-4 text-[#0d3d2e]">Capital prêté vs remboursements</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={bar}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => formatFCFA(Number(v))} />
              <Bar dataKey="amount" fill="#c9a84c" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-premium p-6">
          <h3 className="font-bold mb-4 text-[#0d3d2e]">Répartition des statuts</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {pie.map((_, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function Kpi({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="card-premium p-5">
      <div className="flex items-center gap-2 text-[#6b7280] text-xs uppercase mb-2"><Icon className="w-4 h-4" /> {label}</div>
      <div className="text-xl font-bold text-[#0d3d2e]" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </div>
  );
}

function CapitalTab() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [settings, setSettings] = useState({ capital_actuel: 0, objectif_capital: 0 });
  const [inputCapital, setInputCapital] = useState("");
  const [inputObjectif, setInputObjectif] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: loanData } = await supabase.from("loan_requests").select("*");
      setLoans(loanData || []);

      const { data: settingsData } = await supabase.from("capital_settings").select("*").eq("id", "default").maybeSingle();
      if (settingsData) {
        setSettings({
          capital_actuel: Number(settingsData.capital_actuel),
          objectif_capital: Number(settingsData.objectif_capital),
        });
        setInputCapital(String(settingsData.capital_actuel));
        setInputObjectif(String(settingsData.objectif_capital));
      }
    } catch (err: any) {
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveCapital = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(inputCapital);
    if (isNaN(val) || val < 0) {
      toast.error("Veuillez saisir un montant valide.");
      return;
    }
    const { error } = await supabase.from("capital_settings").upsert({ id: "default", capital_actuel: val });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Capital actuel enregistré");
      loadData();
    }
  };

  const handleSaveObjectif = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(inputObjectif);
    if (isNaN(val) || val < 0) {
      toast.error("Veuillez saisir un montant valide.");
      return;
    }
    const { error } = await supabase.from("capital_settings").upsert({ id: "default", objectif_capital: val });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Objectif de capital enregistré");
      loadData();
    }
  };

  const Capital_Actuel = settings.capital_actuel;
  const Objectif_Capital = settings.objectif_capital;

  const Total_Prete = useMemo(() => {
    return loans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
  }, [loans]);

  const Total_Rembourse = useMemo(() => {
    return loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
  }, [loans]);

  const Prets_En_Cours = useMemo(() => {
    return loans.filter((l) => l.status === "approved").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
  }, [loans]);

  const Benefices_Nets = useMemo(() => {
    return loans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.loan_amount || 0) * 0.3, 0);
  }, [loans]);

  const progressPercent = useMemo(() => {
    if (Objectif_Capital <= 0) return 0;
    return Math.min((Capital_Actuel / Objectif_Capital) * 100, 100);
  }, [Capital_Actuel, Objectif_Capital]);

  const lineChartData = useMemo(() => {
    const months = [
      { name: "Avril", index: 3 },
      { name: "Mai", index: 4 },
      { name: "Juin", index: 5 },
      { name: "Juillet", index: 6 },
      { name: "Août", index: 7 },
      { name: "Septembre", index: 8 },
      { name: "Octobre", index: 9 },
      { name: "Novembre", index: 10 },
      { name: "Décembre", index: 11 },
    ];

    const loansByMonth = months.map((m) => {
      const monthLoans = loans.filter((l) => {
        const d = new Date(l.created_at);
        return d.getMonth() === m.index && d.getFullYear() === 2026;
      });

      const lent = monthLoans.filter((l) => l.status !== "rejected").reduce((s, l) => s + Number(l.loan_amount || 0), 0);
      const repaid = monthLoans.filter((l) => l.status === "reimbursed").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);
      const activeRepayments = monthLoans.filter((l) => l.status === "approved").reduce((s, l) => s + Number(l.repayment_amount || 0), 0);

      return { mIndex: m.index, name: m.name, lent, repaid, activeRepayments };
    });

    const values: Record<number, number> = {};
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
      "Objectif cible": Objectif_Capital,
    }));
  }, [loans, Capital_Actuel, Objectif_Capital]);

  const barChartData = useMemo(() => {
    return [
      {
        name: "Flux",
        "Capital prêté": Total_Prete,
        "Capital remboursé": Total_Rembourse,
      }
    ];
  }, [Total_Prete, Total_Rembourse]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Bloc 1 : Saisie et Paramétrage */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Section Capital Actuel */}
        <div className="card-premium p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#0d3d2e] text-lg mb-4">Capital actuel</h3>
            <form onSubmit={handleSaveCapital} className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Renseignez le capital actuel disponible..."
                value={inputCapital}
                onChange={(e) => setInputCapital(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0d3d2e]"
                disabled={loading}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#0d3d2e] hover:bg-[#0a2f23] transition-colors"
                disabled={loading}
              >
                Enregistrer
              </button>
            </form>
          </div>
          <div>
            <span className="text-xs uppercase text-[#6b7280]">Capital actuel disponible</span>
            <div className="text-3xl font-extrabold text-[#0d3d2e] mt-1">
              {formatFCFA(Capital_Actuel)}
            </div>
          </div>
        </div>

        {/* Section Objectif de Capital */}
        <div className="card-premium p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#0d3d2e] text-lg mb-4">Objectif de capital</h3>
            <form onSubmit={handleSaveObjectif} className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Renseignez l'objectif à atteindre..."
                value={inputObjectif}
                onChange={(e) => setInputObjectif(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-1 focus:ring-[#0d3d2e]"
                disabled={loading}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#0d3d2e] hover:bg-[#0a2f23] transition-colors"
                disabled={loading}
              >
                Enregistrer
              </button>
            </form>
          </div>
          <div>
            <span className="text-xs uppercase text-[#6b7280]">Cible à atteindre</span>
            <div className="text-3xl font-extrabold text-[#c9a84c] mt-1">
              {formatFCFA(Objectif_Capital)}
            </div>
          </div>
        </div>
      </div>

      {/* Bloc 2 : Bilan Financier */}
      <div className="card-premium p-6">
        <h3 className="font-bold text-[#0d3d2e] text-lg mb-4">Bilan Financier</h3>
        <div className="divide-y divide-gray-100">
          <div className="flex justify-between py-3">
            <span className="text-[#6b7280]">Capital de départ renseigné</span>
            <span className="font-semibold text-[#111827]">{formatFCFA(Capital_Actuel)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#6b7280]">Total prêté (hors refusés)</span>
            <span className="font-semibold text-[#c9a84c]">{formatFCFA(Total_Prete)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#6b7280]">Total remboursé + intérêts</span>
            <span className="font-semibold text-[#16a34a]">{formatFCFA(Total_Rembourse)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#6b7280]">Prêts en cours (risque)</span>
            <span className="font-semibold text-[#dc2626]">{formatFCFA(Prets_En_Cours)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-[#6b7280]">Bénéfices nets (intérêts)</span>
            <span className="font-semibold text-[#7c3aed]">{formatFCFA(Benefices_Nets)}</span>
          </div>
        </div>
      </div>

      {/* Bloc 3 : Suivi de l'Objectif et Graphique */}
      <div className="card-premium p-6 space-y-6">
        <div>
          <h3 className="font-bold text-[#0d3d2e] text-lg mb-2">Suivi de l'Objectif</h3>
          <div className="flex justify-between text-sm text-[#6b7280] mb-2">
            <span>Objectif {formatFCFA(Objectif_Capital)}</span>
            <span className="font-bold text-[#0d3d2e]">{progressPercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#0d3d2e] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-bold text-sm text-[#0d3d2e] mb-4">Graphique de croissance et projections</h4>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ left: 10, right: 10, top: 10, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: any) => formatFCFA(Number(v))} />
                <Line
                  type="monotone"
                  dataKey="Capital réel / projeté"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Capital projeté"
                />
                <Line
                  type="monotone"
                  dataKey="Objectif cible"
                  stroke="#c9a84c"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  name={`Objectif ${formatFCFA(Objectif_Capital)}`}
                />
                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "15px" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bloc 4 : Répartition des bénéfices nets */}
      <div className="card-premium p-6 space-y-6">
        <h3 className="font-bold text-[#0d3d2e] text-lg">Répartition des bénéfices nets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Carte 1 */}
          <div className="bg-[#faf8f5]/40 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#0d3d2e]/10 flex items-center justify-center text-[#0d3d2e]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#6b7280] font-medium">Vous - 50%</div>
              <div className="text-lg font-bold text-[#0d3d2e]">{formatFCFA(Benefices_Nets * 0.50)}</div>
            </div>
          </div>
          {/* Carte 2 */}
          <div className="bg-[#faf8f5]/40 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#6b7280] font-medium">Associé - 20%</div>
              <div className="text-lg font-bold text-[#c9a84c]">{formatFCFA(Benefices_Nets * 0.20)}</div>
            </div>
          </div>
          {/* Carte 3 */}
          <div className="bg-[#faf8f5]/40 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#7c3aed]/10 flex items-center justify-center text-[#7c3aed]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-[#6b7280] font-medium">Réinvesti - 30%</div>
              <div className="text-lg font-bold text-[#7c3aed]">{formatFCFA(Benefices_Nets * 0.30)}</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#6b7280] text-center pt-2">
          Calculé sur {formatFCFA(Benefices_Nets)} de bénéfices nets générés
        </p>
      </div>

      {/* Bloc 5 : Graphique de comparaison des Flux */}
      <div className="card-premium p-6">
        <h3 className="font-bold text-[#0d3d2e] text-lg mb-6">Comparaison des Flux Financiers</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: any) => formatFCFA(Number(v))} />
              <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "20px" }} />
              <Bar dataKey="Capital prêté" fill="#0d3d2e" radius={[8, 8, 0, 0]} maxBarSize={60} />
              <Bar dataKey="Capital remboursé" fill="#c9a84c" radius={[8, 8, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

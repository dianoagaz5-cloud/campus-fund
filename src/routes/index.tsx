import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Shield, Users, ArrowRight, Sparkles } from "lucide-react";
import { PageShell, fadeUp, stagger } from "@/components/PageShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusFund — Micro-fonds Financier Étudiant" },
      { name: "description", content: "Bienvenue sur CampusFund : prêts étudiants rapides, 30% taux fixe, réponse sous 24h." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section
        className="relative min-h-[92vh] flex items-center text-white overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 10%, rgba(201,168,76,0.25), transparent 50%), radial-gradient(circle at 10% 90%, rgba(201,168,76,0.15), transparent 50%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs uppercase tracking-widest mb-8"
            style={{ borderColor: "#c9a84c", color: "#e3c97a" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Micro-fonds Financier Étudiant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Bienvenue sur{" "}
            <span className="text-gold-gradient">CampusFund</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-10"
          >
            Le micro-fonds dédié aux étudiants du Bénin. Un prêt rapide, sécurisé
            et 100% numérique, pour avancer sans attendre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/loan-application"
              className="px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-transform hover:scale-105"
              style={{ background: "#c9a84c", color: "#0d3d2e" }}
            >
              CONTRACTER UN PRÊT <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/eligibility"
              className="px-7 py-3.5 rounded-full font-semibold border-2 border-white/90 hover:bg-white hover:text-[#0d3d2e] transition-all"
            >
              Conditions d'éligibilité
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Zap, label: "Réponse rapide" },
              { icon: Shield, label: "Sécurisé" },
              { icon: Users, label: "Communauté" },
            ].map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center justify-center gap-3 py-3 px-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <Icon className="w-5 h-5" style={{ color: "#c9a84c" }} />
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* QU'EST-CE QUE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#c9a84c" }}>
              Notre mission
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0d3d2e]">
              Qu'est-ce que CampusFund&nbsp;?
            </h2>
            <p className="text-[#6b7280] text-lg leading-relaxed mb-4">
              CampusFund est un micro-fonds financier conçu spécifiquement pour les
              étudiants du Bénin. Notre but : offrir un accès rapide à de petits
              prêts pour couvrir les besoins urgents — frais de scolarité,
              matériel, transport, santé.
            </p>
            <p className="text-[#6b7280] text-lg leading-relaxed">
              Tout se passe en ligne, en toute confiance, avec un taux fixe et
              transparent de 30%.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { v: "30%", l: "Taux fixe" },
              { v: "⚡", l: "Réponse rapide" },
              { v: "100%", l: "Numérique" },
              { v: "🎓", l: "Pour étudiants" },
            ].map((s) => (
              <motion.div
                key={s.l}
                variants={fadeUp}
                className="card-premium p-6 text-center aspect-square flex flex-col items-center justify-center"
              >
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: "#0d3d2e", fontFamily: "var(--font-display)" }}
                >
                  {s.v}
                </div>
                <div className="text-sm text-[#6b7280] font-medium">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMMENT ÇA FONCTIONNE */}
      <section className="py-24 px-6" style={{ background: "#f4f0e8" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#c9a84c" }}>
              Étape par étape
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0d3d2e]">
              Comment ça fonctionne&nbsp;?
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { n: "01", t: "Formulaire", d: "Remplissez votre dossier en ligne en quelques minutes." },
              { n: "02", t: "Signature", d: "Signez le contrat numérique et joignez vos pièces." },
              { n: "03", t: "Soumission", d: "Votre demande est envoyée à notre équipe." },
              { n: "04", t: "Réponse WhatsApp", d: "Recevez la décision et les fonds via WhatsApp." },
            ].map((step) => (
              <motion.div key={step.n} variants={fadeUp} className="card-premium p-7">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 font-bold text-xl"
                  style={{ background: "#0d3d2e", color: "#c9a84c", fontFamily: "var(--font-display)" }}
                >
                  {step.n}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#0d3d2e]">{step.t}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{step.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 text-white text-center"
        style={{ background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Prêt à <span className="text-gold-gradient">avancer</span>&nbsp;?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Lancez votre demande dès maintenant — réponse sous 24h.
          </p>
          <Link
            to="/loan-application"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105"
            style={{ background: "#c9a84c", color: "#0d3d2e" }}
          >
            Demander un prêt <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

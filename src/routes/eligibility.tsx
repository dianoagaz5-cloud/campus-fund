import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, FileCheck, MessageCircle, Lock, Wallet, PenTool, AlertTriangle, ArrowRight } from "lucide-react";
import { PageShell, fadeUp, stagger } from "@/components/PageShell";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Éligibilité — CampusFund" },
      { name: "description", content: "Critères d'éligibilité pour bénéficier d'un prêt CampusFund." },
    ],
  }),
  component: Eligibility,
});

const criteria = [
  { icon: GraduationCap, t: "Étudiant actif inscrit", d: "Vous devez être inscrit dans un établissement reconnu au Bénin." },
  { icon: FileCheck, t: "Document d'identité valide", d: "CNI, Passeport, Carte étudiant ou attestation officielle." },
  { icon: MessageCircle, t: "WhatsApp actif", d: "Un numéro WhatsApp opérationnel pour la communication." },
  { icon: Lock, t: "Garantie matérielle", d: "Téléphone, ordinateur ou autre bien comme garantie." },
  { icon: Wallet, t: "Montant raisonnable", d: "Proportionnel à votre capacité de remboursement (sous 2 semaines)." },
  { icon: PenTool, t: "Engagement de remboursement", d: "Vous vous engagez à rembourser le capital + 30% d'intérêts." },
];

function Eligibility() {
  return (
    <PageShell>
      <section
        className="text-white py-24 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Critères d'<span className="text-gold-gradient">Éligibilité</span>
        </motion.h1>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          Voici les conditions à remplir pour bénéficier d'un prêt CampusFund.
        </p>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6"
        >
          {criteria.map((c) => (
            <motion.div key={c.t} variants={fadeUp} className="card-premium p-7 flex gap-5">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "#f4f0e8", color: "#0d3d2e" }}
              >
                <c.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1.5 text-[#0d3d2e]">{c.t}</h3>
                <p className="text-[#6b7280] text-sm leading-relaxed">{c.d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 p-7 rounded-2xl border-2"
          style={{ background: "#fff5f5", borderColor: "#fca5a5" }}
        >
          <div className="flex gap-4">
            <AlertTriangle className="w-7 h-7 text-red-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Avertissement important</h3>
              <p className="text-red-900/85 text-sm leading-relaxed">
                ⚠️ <strong>En cas de non-remboursement</strong> : publication publique de
                vos informations personnelles sur Facebook, Instagram, Snapchat,
                Twitter/X et WhatsApp + saisie de la garantie fournie.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            to="/loan-application"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105"
            style={{ background: "#c9a84c", color: "#0d3d2e" }}
          >
            Je suis éligible — Demander un prêt <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

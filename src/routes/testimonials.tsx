import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PageShell, fadeUp, stagger } from "@/components/PageShell";
import { formatFCFA } from "@/lib/supabase-helpers";

export const Route = createFileRoute("/testimonials")({
  head: () => ({ meta: [{ title: "Témoignages — CampusFund" }] }),
  component: Testimonials,
});

const testimonials = [
  { name: "Awa Koné", field: "Médecine, UAC", amount: 25000, color: "#0d3d2e", quote: "CampusFund m'a sauvée à un moment critique. J'avais besoin de fonds pour acheter du matériel médical pour mon stage. La réponse a été rapide et le processus très clair. Je recommande à 100%." },
  { name: "Koffi Mensah", field: "Droit, FADESP", amount: 15000, color: "#c9a84c", quote: "Un service vraiment dédié aux étudiants. Pas de paperasse compliquée, tout se fait en ligne. Le taux est annoncé clairement dès le départ — pas de mauvaise surprise." },
  { name: "Mariama Diallo", field: "Informatique, EPAC", amount: 30000, color: "#8b5cf6", quote: "J'ai pu acheter mon ordinateur portable pour mes projets de fin d'année grâce à CampusFund. L'équipe a été à l'écoute et professionnelle du début à la fin." },
  { name: "Toussaint Gbèhou", field: "Économie, FASEG", amount: 20000, color: "#0ea5e9", quote: "Très satisfait. La transparence sur les 30% d'intérêts m'a mis en confiance. J'ai remboursé dans les délais sans aucun souci. Bravo pour l'initiative." },
  { name: "Fatoumata Traoré", field: "Pharmacie", amount: 35000, color: "#dc2626", quote: "Service rapide et humain. J'ai apprécié la communication via WhatsApp, c'est plus pratique qu'un email. Et l'équipe répond vite. Merci CampusFund !" },
  { name: "Arnaud Dossou", field: "BTS Commerce", amount: 12000, color: "#16a34a", quote: "Petit montant mais énorme dépannage. J'avais besoin de payer une formation certifiante et je n'avais pas l'argent à temps. CampusFund a sauvé la mise." },
  { name: "Blessing Adeyemi", field: "Architecture", amount: 50000, color: "#f59e0b", quote: "Le plus gros prêt que j'ai sollicité — c'était pour mes maquettes et impressions de fin d'études. Tout s'est passé parfaitement, je referai appel à eux." },
  { name: "Cédric Houénou", field: "Génie Civil", amount: 18000, color: "#9333ea", quote: "Le formulaire est bien conçu, étape par étape, pas stressant. La signature numérique du contrat est rassurante. Vraiment du sérieux." },
];

function Testimonials() {
  return (
    <PageShell>
      <section
        className="text-white py-20 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)" }}
      >
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gold-gradient">Témoignages</span>
        </motion.h1>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            { v: "200+", l: "étudiants" },
            { v: "98%", l: "satisfaction" },
            { v: "24h", l: "délai moyen" },
          ].map((m) => (
            <div key={m.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: "#c9a84c", fontFamily: "var(--font-display)" }}>
                {m.v}
              </div>
              <div className="text-white/70 text-sm">{m.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => {
            const initials = t.name.split(" ").map((n) => n[0]).join("");
            return (
              <motion.div key={t.name} variants={fadeUp} className="card-premium p-7">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#c9a84c" }} />
                  ))}
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3" style={{ background: "#f4f0e8", color: "#0d3d2e" }}>
                  {t.field}
                </span>
                <p className="text-[#1f2937] text-[15px] leading-relaxed italic mb-5">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold" style={{ background: t.color }}>
                      {initials}
                    </div>
                    <div className="font-semibold text-[#0d3d2e]">{t.name}</div>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: "#c9a84c" }}>
                    {formatFCFA(t.amount)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </PageShell>
  );
}

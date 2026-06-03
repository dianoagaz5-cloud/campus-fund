import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Mail, AlertTriangle, Clock } from "lucide-react";
import { PageShell, fadeUp, stagger } from "@/components/PageShell";
import { WHATSAPP_URL, WHATSAPP_DISPLAY, SUPPORT_EMAIL } from "@/lib/supabase-helpers";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — CampusFund" }] }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section
        className="text-white py-20 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)" }}
      >
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold">
          Nous <span className="text-gold-gradient">contacter</span>
        </motion.h1>
        <p className="text-white/70 mt-4">Réponse rapide via WhatsApp ou email.</p>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-6">
          <motion.a
            variants={fadeUp}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            className="card-premium p-8 hover:scale-[1.02] transition-transform"
            style={{ borderTop: "4px solid #25D366" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#25D366" }}>
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0d3d2e]">WhatsApp</h3>
            <p className="text-[#6b7280] mb-3">Réponse la plus rapide.</p>
            <p className="font-semibold text-[#0d3d2e]">{WHATSAPP_DISPLAY}</p>
          </motion.a>

          <motion.a
            variants={fadeUp}
            href={`mailto:${SUPPORT_EMAIL}`}
            className="card-premium p-8 hover:scale-[1.02] transition-transform"
            style={{ borderTop: "4px solid #c9a84c" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "#c9a84c" }}>
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#0d3d2e]">Email</h3>
            <p className="text-[#6b7280] mb-3">Pour les demandes détaillées.</p>
            <p className="font-semibold text-[#0d3d2e]">{SUPPORT_EMAIL}</p>
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-premium mt-8 p-8">
          <div className="flex items-center gap-3 mb-5">
            <Clock className="w-6 h-6" style={{ color: "#c9a84c" }} />
            <h3 className="text-xl font-bold text-[#0d3d2e]">Horaires</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { d: "Lundi – Vendredi", h: "8h – 20h" },
              { d: "Samedi", h: "9h – 17h" },
              { d: "Dimanche", h: "Urgences uniquement" },
            ].map((r) => (
              <div key={r.d} className="p-4 rounded-xl" style={{ background: "#f4f0e8" }}>
                <div className="font-semibold text-[#0d3d2e]">{r.d}</div>
                <div className="text-[#6b7280] mt-1">{r.h}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 p-6 rounded-2xl border-2 flex gap-4" style={{ background: "#fff5f5", borderColor: "#fca5a5" }}>
          <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <p className="text-red-900/90 text-sm">
            <strong>Avertissement :</strong> CampusFund ne demande jamais de
            paiement à l'avance. Méfiez-vous des fraudes utilisant notre nom.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

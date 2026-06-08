import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — CampusFund" }] }),
  component: FAQ,
});

const items = [
  { q: "Qui peut bénéficier d'un prêt CampusFund ?", a: "Tout étudiant actif inscrit dans un établissement reconnu au Bénin et disposant d'une pièce d'identité valide (CNI, passeport, carte étudiant ou attestation)." },
  { q: "Quel est le montant maximum que je peux emprunter ?", a: "Il n'y a pas de plafond fixe. Le montant accordé est proportionnel à votre capacité de remboursement sous 2 semaines et à la garantie fournie." },
  { q: "Comment fonctionnent les 30% d'intérêts ?", a: "C'est un taux fixe et transparent. Exemple : si vous empruntez 10 000 FCFA, vous remboursez 13 000 FCFA (10 000 + 30%)." },
  { q: "Quel est le délai de réponse ?", a: "Généralement sous 24 heures via WhatsApp. Notre équipe étudie chaque dossier et vous contacte rapidement." },
  { q: "Que se passe-t-il en cas de non-remboursement ?", a: "En cas de non-remboursement, vos informations personnelles seront publiées publiquement sur Facebook, Instagram, Snapchat, Twitter/X et WhatsApp, et la garantie fournie sera saisie." },
  { q: "Comment se passe la récupération des fonds ?", a: "L'endroit et l'heure sont communiqués via WhatsApp. La présence physique est obligatoire — seule la personne dont la photo a été fournie peut récupérer les fonds." },
  { q: "Mes données sont-elles en sécurité ?", a: "Oui. Toutes les données et fichiers sont stockés de manière sécurisée sur notre infrastructure (Supabase) avec accès restreint." },
  {
    q: "Comment vous contacter ?",
    a: (
      <span>
        Via WhatsApp au{" "}
        <a
          href="https://wa.me/2290150085142"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c9a84c] underline hover:text-[#b0923f] transition-colors font-medium"
        >
          +229 01 50 08 51 42
        </a>{" "}
        ou par email à{" "}
        <a
          href="mailto:ahihovitale@gmail.com"
          className="text-[#c9a84c] underline hover:text-[#b0923f] transition-colors font-medium"
        >
          ahihovitale@gmail.com
        </a>.
      </span>
    ),
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <PageShell>
      <section
        className="text-white py-20 px-6 text-center"
        style={{ background: "linear-gradient(160deg, #0d3d2e 0%, #071f1c 100%)" }}
      >
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold">
          Questions <span className="text-gold-gradient">fréquentes</span>
        </motion.h1>
      </section>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-premium overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-semibold text-[#0d3d2e]">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5" style={{ color: "#c9a84c" }} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#6b7280] leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Combien de temps pour avoir mon site ou mon assistant IA ?",
    a: "Un site Express est livré en 7 à 14 jours. Un assistant IA est opérationnel en quelques jours après la collecte de vos informations.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Nos offres démarrent à 100 000 FCFA. Le tarif exact dépend de vos besoins — on vous le donne clairement après l'audit gratuit, avec un prix fixe et sans surprise.",
  },
  {
    q: "Est-ce que ça marche avec mes outils actuels (WhatsApp, Instagram) ?",
    a: "Oui. On branche nos solutions sur vos canaux existants. Vous n'avez rien à changer.",
  },
  {
    q: "Est-ce que l'assistant IA répond en dehors des heures de bureau ?",
    a: "Oui. L'assistant répond 24h/24, 7j/7 — nuits, week-ends et jours fériés inclus. Aucun client ne reste sans réponse.",
  },
  {
    q: "Et si quelque chose ne fonctionne pas ?",
    a: "On assure le suivi et la maintenance. Un problème, un message, on intervient. Vous n'êtes jamais seul.",
  },
  {
    q: "Comment vous payer ?",
    a: "Wave, Orange Money ou carte. Paiement échelonné possible sur les projets plus importants.",
  },
];

function FAQItem({ faq, index, inView }: { faq: typeof faqs[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl overflow-hidden"
      style={{
        border: open ? "1px solid rgba(0,212,255,0.2)" : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s ease",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        style={{ background: open ? "rgba(0,212,255,0.04)" : "rgba(255,255,255,0.02)" }}
      >
        <span className="font-display font-semibold text-white text-sm md:text-base leading-snug">
          {faq.q}
        </span>
        <motion.span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-sm"
          style={{
            background: open ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.05)",
            color: open ? "#00D4FF" : "rgba(255,255,255,0.3)",
            border: open ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
          }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="px-6 pb-5 text-white/55 text-sm leading-relaxed"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="block pt-4">{faq.a}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-20 md:py-28 px-4 md:px-12">
      <div className="section-line mb-16 md:mb-20" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-electric/50 uppercase block mb-4">
            Questions fréquentes
          </span>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            FAQ
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom nudge */}
        <motion.p
          className="mt-10 text-center text-white/30 text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Une autre question ?{" "}
          <a href="#contact" className="text-electric/60 hover:text-electric transition-colors underline underline-offset-4">
            Écrivez-nous directement.
          </a>
        </motion.p>
      </div>
    </section>
  );
}

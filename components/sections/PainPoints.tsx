"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    icon: "📵",
    title: "Des demandes qui se perdent",
    text: "Des messages WhatsApp et des appels après 18h ou le week-end, quand personne ne répond. Chacun est un client qui va voir ailleurs.",
    color: "#00D4FF",
  },
  {
    icon: "🧊",
    title: "Des prospects qui refroidissent",
    text: "Des contacts intéressés, mais personne pour les relancer à temps. Vos listes dorment pendant que la concurrence avance.",
    color: "#8B5CF6",
  },
  {
    icon: "🔍",
    title: "Une présence en ligne faible",
    text: "Pas de site, ou un site dépassé qui n'inspire pas confiance. Vos clients vous cherchent et ne vous trouvent pas.",
    color: "#A855F7",
  },
];

export default function PainPoints() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-electric/50 uppercase block mb-4">
            Diagnostic
          </span>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Vous reconnaissez-vous ?
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-6 md:p-8 flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{
                  background: `${card.color}14`,
                  border: `1px solid ${card.color}22`,
                }}
              >
                {card.icon}
              </div>
              <h3
                className="font-display font-semibold text-white"
                style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
              >
                {card.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition line */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="mx-auto text-white/60 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", maxWidth: "640px" }}
          >
            Bonne nouvelle : chacun de ces problèmes a une solution simple.{" "}
            <span className="text-white font-medium">
              C'est exactement ce que WEBCORE installe pour vous.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

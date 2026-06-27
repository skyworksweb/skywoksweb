"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const rows = [
  {
    offer: "Site Express",
    color: "#00D4FF",
    entry: "150 000 FCFA",
    monthly: "15 000 – 30 000 FCFA",
    monthlyNote: "maintenance, option",
  },
  {
    offer: "Réception 24/7",
    color: "#8B5CF6",
    entry: "150 000 FCFA",
    monthly: "35 000 – 75 000 FCFA",
    monthlyNote: "",
  },
  {
    offer: "Leads",
    color: "#A855F7",
    entry: "200 000 FCFA",
    monthly: "50 000 – 100 000 FCFA",
    monthlyNote: "",
  },
  {
    offer: "Contenu",
    color: "#10B981",
    entry: "100 000 FCFA",
    monthly: "75 000 – 150 000 FCFA",
    monthlyNote: "",
  },
  {
    offer: "Projets sur mesure",
    color: "rgba(255,255,255,0.25)",
    entry: "Sur devis",
    monthly: "Sur devis",
    monthlyNote: "",
    custom: true,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tarifs" className="relative py-20 md:py-28 px-4 md:px-12">
      <div className="section-line mb-16 md:mb-20" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-electric/50 uppercase block mb-4">
            Investissement
          </span>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Des tarifs pensés pour
            <span className="gradient-text-blue"> les PME africaines</span>
          </h2>
        </motion.div>

        {/* Table — desktop */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Table head */}
            <div
              className="grid grid-cols-3 px-6 py-4"
              style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {["Offre", "À partir de", "Abonnement mensuel"].map((h) => (
                <span key={h} className="font-mono text-[10px] tracking-widest uppercase text-white/30">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={row.offer}
                className="grid grid-cols-3 px-6 py-5 items-center transition-colors"
                style={{
                  borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                }}
              >
                {/* Offer name */}
                <div className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: row.color }}
                  />
                  <span
                    className="font-display font-semibold text-sm"
                    style={{ color: row.custom ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.85)" }}
                  >
                    {row.offer}
                  </span>
                </div>

                {/* Entry price */}
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: row.custom ? "rgba(255,255,255,0.3)" : row.color }}
                >
                  {row.entry}
                </span>

                {/* Monthly */}
                <div>
                  <span
                    className="font-mono text-sm"
                    style={{ color: row.custom ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.6)" }}
                  >
                    {row.monthly}
                  </span>
                  {row.monthlyNote && (
                    <span className="font-mono text-[10px] text-white/25 ml-2">
                      ({row.monthlyNote})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Table — mobile (cards) */}
        <motion.div
          className="md:hidden space-y-3"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {rows.map((row) => (
            <div
              key={row.offer}
              className="rounded-xl p-4"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${row.custom ? "rgba(255,255,255,0.06)" : row.color + "20"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: row.color }} />
                <span
                  className="font-display font-semibold text-sm"
                  style={{ color: row.custom ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.85)" }}
                >
                  {row.offer}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-white/25 mb-1">À partir de</p>
                  <p className="font-mono text-sm font-bold" style={{ color: row.custom ? "rgba(255,255,255,0.3)" : row.color }}>
                    {row.entry}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-white/25 mb-1">Mensuel</p>
                  <p className="font-mono text-xs text-white/55">{row.monthly}</p>
                  {row.monthlyNote && (
                    <p className="font-mono text-[9px] text-white/25">({row.monthlyNote})</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pack highlight */}
        <motion.div
          className="mt-8 rounded-2xl p-6 md:p-8"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(139,92,246,0.06) 100%)",
            border: "1px solid rgba(0,212,255,0.18)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-1">
              <span className="font-mono text-[10px] tracking-widest uppercase text-electric/60 block mb-2">
                Pack recommandé
              </span>
              <h3 className="font-display font-bold text-white text-lg md:text-xl tracking-tight mb-2">
                Site Express + Réception 24/7
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Être en ligne ET ne plus rater un seul client — en une seule offre.{" "}
                <span className="text-white/35">Tarif préférentiel sur demande.</span>
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 font-mono text-xs tracking-widest uppercase px-5 py-3 rounded-xl transition-all duration-300 hover:bg-electric/20 text-center"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00D4FF",
              }}
            >
              Demander ce pack →
            </a>
          </div>
        </motion.div>

        {/* Payment mention */}
        <motion.p
          className="mt-6 text-center font-mono text-xs text-white/25 tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Paiement échelonné possible · Wave, Orange Money et carte acceptés
        </motion.p>
      </div>
    </section>
  );
}

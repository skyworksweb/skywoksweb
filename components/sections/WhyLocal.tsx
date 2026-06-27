"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const advantages = [
  {
    icon: "🇸🇳",
    title: "100 % local",
    text: "On comprend le marché de Dakar, vos clients et leurs habitudes. Pas une agence étrangère hors-sol.",
    color: "#00D4FF",
  },
  {
    icon: "💳",
    title: "Paiement mobile",
    text: "Wave, Orange Money, carte. Intégrés à vos solutions dès le départ.",
    color: "#10B981",
  },
  {
    icon: "⚡",
    title: "Réactivité",
    text: "Une réponse sous 48h, un interlocuteur unique, pas de bureaucratie.",
    color: "#F59E0B",
  },
];

export default function WhyLocal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-electric/50 uppercase block mb-4">
            Notre différence
          </span>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Une agence qui connaît
            <span className="gradient-text-blue"> votre marché</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              className="flex gap-5 p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon */}
              <div
                className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: `${adv.color}12`,
                  border: `1px solid ${adv.color}22`,
                }}
              >
                {adv.icon}
              </div>

              {/* Text */}
              <div>
                <h3
                  className="font-display font-semibold text-white mb-1.5"
                  style={{ fontSize: "1rem" }}
                >
                  {adv.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {adv.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

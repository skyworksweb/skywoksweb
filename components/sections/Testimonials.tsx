"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="relative py-20 md:py-28 px-4 md:px-12">
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
            Engagement
          </span>
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Notre promesse
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Guarantee card */}
          <motion.div
            className="rounded-2xl p-7 md:p-9"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(0,0,0,0.5) 100%)",
              border: "1px solid rgba(0,212,255,0.18)",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-3xl mb-5">🛡️</div>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight mb-4">
              Satisfait ou installation remboursée.
            </h3>
            <p className="text-white/55 text-sm md:text-base leading-relaxed">
              On est une jeune agence et on le prouve : si notre travail ne vous convient pas,{" "}
              <span className="text-white/80 font-medium">on vous rembourse l'installation.</span>{" "}
              Aucun risque de votre côté.
            </p>
          </motion.div>

          {/* Launch offer card */}
          <motion.div
            className="rounded-2xl p-7 md:p-9"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.07) 0%, rgba(0,0,0,0.5) 100%)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-3xl mb-5">🚀</div>
            <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight mb-4">
              Vous serez parmi nos premiers partenaires.
            </h3>
            <p className="text-white/55 text-sm md:text-base leading-relaxed">
              Et vous en bénéficiez :{" "}
              <span className="text-white/80 font-medium">suivi VIP et tarifs de lancement.</span>{" "}
              Les premières places sont limitées — les premiers à nous faire confiance sont ceux qu'on sert le mieux.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#contact" className="btn-primary text-sm">
            Demander un audit gratuit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

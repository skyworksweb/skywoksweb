"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Audit gratuit",
    description: "On analyse votre situation et on identifie où vous perdez des clients. Gratuit, sans engagement.",
    color: "#00D4FF",
    badge: "Gratuit",
  },
  {
    num: "02",
    title: "Proposition sur mesure",
    description: "On vous présente une solution claire, avec un prix fixe et un délai précis.",
    color: "#38BDF8",
    badge: null,
  },
  {
    num: "03",
    title: "Conception & développement",
    description: "On construit votre site et/ou votre assistant IA. Vous validez à chaque étape.",
    color: "#8B5CF6",
    badge: null,
  },
  {
    num: "04",
    title: "Mise en ligne & intégration",
    description: "On déploie, on branche vos canaux (WhatsApp, Instagram), on teste tout.",
    color: "#A855F7",
    badge: null,
  },
  {
    num: "05",
    title: "Suivi & optimisation",
    description: "On reste à vos côtés : maintenance, ajustements, améliorations continues.",
    color: "#10B981",
    badge: "Continu",
  },
];

export default function Process() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-20 md:py-28 px-4 md:px-12" ref={containerRef}>
      <div className="section-line mb-16 md:mb-20" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-14"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-electric/50 uppercase block mb-4">
            Notre méthode
          </span>
          <h2
            className="font-display font-bold text-white leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            Comment ça se passe
          </h2>
          <p className="text-white/40 text-sm md:text-base">
            Simple, transparent, sans jargon.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated vertical line — desktop */}
          <div className="hidden md:block absolute left-[1.6rem] top-3 bottom-3 w-px overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #00D4FF, #38BDF8, #8B5CF6, #A855F7, #10B981)",
              }}
            />
          </div>

          <div className="space-y-2">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex gap-6 md:gap-10 py-6 md:py-7"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Dot */}
                <div className="shrink-0 flex flex-col items-center" style={{ width: "3.2rem" }}>
                  <div
                    className="relative w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0"
                    style={{
                      background: `${step.color}14`,
                      border: `1.5px solid ${step.color}50`,
                    }}
                  >
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3
                      className="font-display font-bold text-white text-lg md:text-xl tracking-tight"
                    >
                      {step.title}
                    </h3>
                    {step.badge && (
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded"
                        style={{
                          background: `${step.color}14`,
                          border: `1px solid ${step.color}30`,
                          color: step.color,
                        }}
                      >
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#contact"
            className="btn-primary text-sm"
          >
            Commencer par l'audit gratuit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    num: "01",
    title: "Stratégie",
    description:
      "Analyse approfondie de votre marché, vos concurrents et vos objectifs. On définit ensemble la vision et la roadmap.",
    details: ["Audit digital", "Recherche utilisateur", "Benchmark concurrentiel", "Roadmap projet"],
    color: "#00D4FF",
    icon: "◎",
  },
  {
    num: "02",
    title: "Design",
    description:
      "Conception d'une identité visuelle forte. Wireframes, prototypes interactifs, design system complet.",
    details: ["Moodboard", "Wireframes", "UI Design", "Prototypes Figma"],
    color: "#8B5CF6",
    icon: "⬡",
  },
  {
    num: "03",
    title: "Développement",
    description:
      "Code production-ready, animations avancées, intégrations API, optimisation performance.",
    details: ["Next.js + React", "Animations GSAP/Framer", "Intégrations API", "Tests & QA"],
    color: "#0EA5E9",
    icon: "◈",
  },
  {
    num: "04",
    title: "Optimisation",
    description:
      "Performance maximale, SEO technique, Core Web Vitals, accessibilité WCAG 2.1.",
    details: ["Core Web Vitals", "SEO Technique", "A/B Testing", "Analytics"],
    color: "#06B6D4",
    icon: "⬟",
  },
  {
    num: "05",
    title: "Lancement",
    description:
      "Déploiement zéro-downtime, monitoring, support post-lancement et optimisations continues.",
    details: ["Déploiement CI/CD", "Monitoring 24/7", "Support dédié", "Évolutions"],
    color: "#10B981",
    icon: "◆",
  },
];

export default function Process() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-32 px-6 md:px-12" ref={containerRef}>
      <div className="section-line mb-24" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-24"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            custom={0}
            className="font-mono text-xs tracking-[0.3em] text-electric/60 uppercase block mb-4"
          >
            Notre méthode
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="font-display font-bold tracking-tighter text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Process
            <span className="gradient-text-blue"> éprouvé</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="mt-6 text-white/40 max-w-lg text-base leading-relaxed"
          >
            Un processus structuré qui garantit des résultats. Aucune surprise,
            une communication transparente à chaque étape.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-[3.5rem] top-0 bottom-0 w-px bg-white/05 overflow-hidden">
            <motion.div
              className="w-full"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #00D4FF, #8B5CF6, #06B6D4, #10B981)",
              }}
            />
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative flex flex-col md:flex-row gap-8 md:gap-16 py-12"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  borderBottom:
                    i < steps.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                {/* Step indicator */}
                <div className="flex-shrink-0 flex items-start md:items-center gap-4 md:gap-0">
                  {/* Timeline dot */}
                  <div
                    className="relative w-7 h-7 rounded-full flex items-center justify-center z-10 flex-shrink-0"
                    style={{
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}40`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: step.color }}
                    />
                  </div>

                  {/* Number */}
                  <span
                    className="font-mono text-xs tracking-widest md:hidden"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-8 md:gap-16 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="font-mono text-xs tracking-widest hidden md:inline"
                        style={{ color: step.color + "60" }}
                      >
                        {step.num}
                      </span>
                      <span className="text-2xl" style={{ color: step.color }}>
                        {step.icon}
                      </span>
                      <h3
                        className="font-display font-bold text-2xl text-white tracking-tight"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/40 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3">
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-2 text-sm text-white/40"
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: step.color }} />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

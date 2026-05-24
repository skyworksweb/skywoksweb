"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "WEBCORE a transformé notre présence digitale. Le site qu'ils ont créé nous a permis de tripler notre taux de conversion en 3 mois. Un travail absolument exceptionnel.",
    author: "Alexandre Moreau",
    role: "CEO · NexusTech",
    initials: "AM",
    color: "#00D4FF",
    rating: 5,
  },
  {
    quote:
      "Une équipe d'un niveau technique rare. Ils ont livré un site WebGL immersif qui nous a valu le SOTD Awwwards. Notre marque a gagné une crédibilité internationale.",
    author: "Sarah Chen",
    role: "CMO · Aurora Ventures",
    initials: "SC",
    color: "#8B5CF6",
    rating: 5,
  },
  {
    quote:
      "L'intégration IA qu'ils ont développée pour notre plateforme e-commerce a augmenté notre AOV de 180%. Un ROI qui dépasse toutes nos attentes initiales.",
    author: "Marc Dubois",
    role: "Fondateur · Quantum Store",
    initials: "MD",
    color: "#0EA5E9",
    rating: 5,
  },
  {
    quote:
      "Professionnels, créatifs et toujours à la pointe. Chaque projet avec WEBCORE est une collaboration où l'on sait que le résultat sera spectaculaire.",
    author: "Léa Martin",
    role: "Directrice Digitale · Elysium Group",
    initials: "LM",
    color: "#10B981",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="relative py-32 px-6 md:px-12">
      <div className="section-line mb-24" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            custom={0}
            className="font-mono text-xs tracking-[0.3em] text-electric/60 uppercase block mb-4"
          >
            Témoignages
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="font-display font-bold tracking-tighter text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Clients
            <span className="gradient-text-blue"> satisfaits</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-2xl cursor-none group"
              style={{
                background:
                  active === i
                    ? `linear-gradient(135deg, rgba(${hexToRgb(t.color)},0.07) 0%, rgba(5,5,5,0.9) 100%)`
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${active === i ? t.color + "30" : "rgba(255,255,255,0.05)"}`,
                transition: "all 0.4s ease",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActive(i)}
            >
              {/* Quote mark */}
              <div
                className="font-display text-6xl leading-none mb-4 select-none"
                style={{ color: t.color + "30" }}
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <span key={s} style={{ color: t.color }} className="text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 leading-relaxed text-base mb-8 italic">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs flex-shrink-0"
                  style={{
                    background: `${t.color}15`,
                    border: `1px solid ${t.color}30`,
                    color: t.color,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white">{t.author}</div>
                  <div className="font-mono text-[11px] text-white/30 tracking-widest">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 font-mono text-xs tracking-widest uppercase mb-6">
            Rejoignez 50+ clients satisfaits
          </p>
          <a href="#contact" className="btn-primary">
            Démarrer votre transformation →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "0,212,255";
}

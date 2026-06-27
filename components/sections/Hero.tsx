"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay z-[1] opacity-40" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,212,255,0.04) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3]"
        style={{
          background: "linear-gradient(to top, #050505, transparent)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-[10] text-center px-6 max-w-7xl mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div
            className="h-px w-12"
            style={{ background: "linear-gradient(90deg, transparent, #00D4FF)" }}
          />
          <span className="font-mono text-xs tracking-[0.35em] text-electric/70 uppercase">
            Agence Web & IA · Dakar
          </span>
          <div
            className="h-px w-12"
            style={{ background: "linear-gradient(90deg, #00D4FF, transparent)" }}
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-bold leading-none tracking-tighter text-white mb-8"
          style={{ fontSize: "clamp(2.6rem, 8vw, 7.5rem)", letterSpacing: "-0.04em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Ne perdez plus
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block gradient-text-blue"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              jamais un client.
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-2xl mx-auto text-white/50 leading-relaxed mb-10"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          WEBCORE crée des sites web et des assistants IA qui répondent, qualifient
          et convertissent vos visiteurs en clients — 24h/24.{" "}
          <span className="text-white/30">Pensé pour les PME sénégalaises.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#contact" className="btn-primary text-sm">
            Demander un audit gratuit →
          </a>
          <a href="#services" className="text-white/40 font-mono text-xs tracking-widest uppercase hover:text-white/70 transition-colors">
            Voir nos services
          </a>
        </motion.div>

        {/* Reassurance */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {[
            "Réponse sous 48h",
            "Gratuit & sans engagement",
            "Paiement Wave / Orange Money accepté",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5 font-mono text-[11px] text-white/35">
              <span className="text-electric/70">✓</span>
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">Scroll</span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "50%",
              background: "linear-gradient(to bottom, #00D4FF, transparent)",
            }}
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

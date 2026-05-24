"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const words = ["DOMINATE", "INNOVATE", "DISRUPT", "ELEVATE"];

function AnimatedWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden" style={{ height: "1em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="gradient-text-blue inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {words[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

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
            Agence Web Premium
          </span>
          <div
            className="h-px w-12"
            style={{ background: "linear-gradient(90deg, #00D4FF, transparent)" }}
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display font-bold leading-none tracking-tighter text-white mb-6"
          style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", letterSpacing: "-0.04em" }}
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
              WE BUILD
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
            >
              DIGITAL EXPERIENCES
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              THAT{" "}
              <AnimatedWord />
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-xl mx-auto text-white/40 leading-relaxed mb-12"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.05rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Nous créons des expériences web qui captivent, convertissent
          et dominent leur marché. Design haut de gamme, développement
          avancé, IA intégrée.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#contact" className="btn-primary text-sm">
            Démarrer votre projet →
          </a>
          <a href="#projects" className="btn-outline text-sm">
            Voir nos projets
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-12 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          {[
            { num: "50+", label: "Projets livrés" },
            { num: "100%", label: "Satisfaction client" },
            { num: "3×", label: "Taux de conversion moyen" },
            { num: "60fps", label: "Animations garanties" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display font-bold gradient-text-blue"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                {stat.num}
              </div>
              <div className="font-mono text-xs text-white/30 tracking-widest uppercase mt-1">
                {stat.label}
              </div>
            </div>
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

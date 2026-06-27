"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const features = [
  {
    title: "Chatbots Intelligents",
    description: "Agents IA conversationnels formés sur votre données pour une assistance client 24/7.",
    icon: "⬡",
    color: "#00D4FF",
  },
  {
    title: "Génération de Contenu",
    description: "Automatisation de la création de textes, images et vidéos avec les derniers modèles IA.",
    icon: "◎",
    color: "#8B5CF6",
  },
  {
    title: "Automatisation des processus",
    description: "Workflows intelligents qui éliminent les tâches répétitives et multiplient la productivité.",
    icon: "◆",
    color: "#0EA5E9",
  },
  {
    title: "Analyse & Prédiction",
    description: "Tableaux de bord analytiques avec IA prédictive pour anticiper les tendances du marché.",
    icon: "⬟",
    color: "#10B981",
  },
  {
    title: "Personnalisation IA",
    description: "Expériences utilisateur adaptées en temps réel selon le comportement de chaque visiteur.",
    icon: "◈",
    color: "#A855F7",
  },
  {
    title: "Optimisation Continue",
    description: "Algorithmes d'apprentissage qui améliorent vos performances automatiquement chaque jour.",
    icon: "⬢",
    color: "#06B6D4",
  },
];

function NeuralNetwork() {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    x: 20 + (i % 4) * 25 + (Math.floor(i / 4) % 2) * 12,
    y: 15 + Math.floor(i / 4) * 30,
    delay: i * 0.1,
  }));

  return (
    <div className="relative w-full h-64 md:h-80">
      <svg viewBox="0 0 100 90" className="w-full h-full">
        {/* Connections */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1, i + 3).map((target, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke="rgba(0,212,255,0.15)"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: (i + j) * 0.08 }}
            />
          ))
        )}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={1.2}
            fill="#00D4FF"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: node.delay + 0.5 }}
          >
            <animate
              attributeName="r"
              values="1.2;1.8;1.2"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur={`${2 + i * 0.3}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}

        {/* Data flow pulses */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            r={1}
            fill="#8B5CF6"
            opacity={0.8}
            animate={{
              cx: [nodes[i * 3]?.x ?? 20, nodes[i * 3 + 3]?.x ?? 70],
              cy: [nodes[i * 3]?.y ?? 20, nodes[i * 3 + 3]?.y ?? 70],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.7,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function AISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai" className="relative py-32 px-6 md:px-12">
      <div className="section-line mb-24" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-end"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div>
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] text-plasma/60 uppercase block mb-4"
            >
              Intelligence artificielle
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="font-display font-bold tracking-tighter text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              L'IA qui
              <span className="gradient-text-plasma"> travaille pour vous</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="text-white/40 leading-relaxed text-base"
          >
            Nos assistants IA répondent, qualifient et relancent vos clients
            automatiquement — pendant que vous vous concentrez sur votre métier.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Neural network visual */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.05) 0%, rgba(5,5,5,0.8) 100%)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
                  Réseau neuronal · Actif
                </span>
              </div>
              <NeuralNetwork />
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Précision", value: "99.2%" },
                  { label: "Réponse", value: "< 1 min" },
                  { label: "Canaux", value: "5+" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display font-bold text-lg gradient-text-plasma">{s.value}</div>
                    <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="relative p-6 rounded-xl cursor-none group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  y: -4,
                  borderColor: `${f.color}30`,
                  backgroundColor: `rgba(${f.color.slice(1).match(/.{2}/g)?.map(h => parseInt(h, 16)).join(',') ?? '0,212,255'}, 0.05)`,
                }}
              >
                <span className="text-2xl mb-3 block" style={{ color: f.color }}>
                  {f.icon}
                </span>
                <h4 className="font-display font-bold text-base text-white mb-2 tracking-tight">
                  {f.title}
                </h4>
                <p className="text-white/35 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const projects = [
  {
    id: "01",
    name: "NEXUS PLATFORM",
    category: "SaaS Dashboard",
    description:
      "Plateforme B2B avec visualisations de données en temps réel, animations WebGL et interface ultra-responsive.",
    tech: ["Next.js", "Three.js", "D3.js", "WebSockets"],
    color: "#00D4FF",
    year: "2024",
    metrics: [
      { label: "Conversion", value: "+340%" },
      { label: "Performance", value: "99/100" },
    ],
  },
  {
    id: "02",
    name: "AURORA BRAND",
    category: "Branding & Web",
    description:
      "Identité de marque complète et site immersif pour une startup tech avec expérience 3D signature.",
    tech: ["React", "GSAP", "Spline", "Framer"],
    color: "#8B5CF6",
    year: "2024",
    metrics: [
      { label: "Engagement", value: "+280%" },
      { label: "Bounce Rate", value: "-65%" },
    ],
  },
  {
    id: "03",
    name: "QUANTUM STORE",
    category: "E-Commerce Premium",
    description:
      "Boutique haut de gamme avec IA de recommandation, configurateur 3D produit et checkout optimisé.",
    tech: ["Next.js", "Shopify", "R3F", "OpenAI"],
    color: "#06B6D4",
    year: "2025",
    metrics: [
      { label: "Revenue", value: "+520%" },
      { label: "AOV", value: "+180%" },
    ],
  },
  {
    id: "04",
    name: "VOID PROTOCOL",
    category: "Portfolio Immersif",
    description:
      "Portfolio créatif avec environnement WebGL entier, navigation spatiale et expérience multi-sensorielle.",
    tech: ["Three.js", "GLSL", "GSAP", "Lenis"],
    color: "#A855F7",
    year: "2025",
    metrics: [
      { label: "Awwwards", value: "SOTD" },
      { label: "FWA", value: "Winner" },
    ],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      ref={ref}
      className="relative group cursor-none"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500"
        style={{
          border: `1px solid ${hovered ? project.color + "30" : "rgba(255,255,255,0.05)"}`,
          background: hovered
            ? `linear-gradient(135deg, rgba(${hexToRgb(project.color)}, 0.05) 0%, rgba(5,5,5,0.9) 100%)`
            : "rgba(255,255,255,0.01)",
        }}
      >
        {/* Visual placeholder (cinematic) */}
        <div
          className="relative h-64 md:h-80 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}15 0%, rgba(5,5,5,0.8) 60%, ${project.color}08 100%)`,
          }}
        >
          {/* Animated grid inside card */}
          <div className="absolute inset-0 grid-overlay opacity-20" />

          {/* Floating number */}
          <motion.div
            className="absolute top-8 left-8 font-display font-bold leading-none select-none"
            style={{
              fontSize: "8rem",
              color: `${project.color}10`,
              fontVariantNumeric: "tabular-nums",
            }}
            animate={{ y: hovered ? -8 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {project.id}
          </motion.div>

          {/* Glow orb inside */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 200,
              height: 200,
              background: `radial-gradient(circle, ${project.color}25 0%, transparent 70%)`,
              filter: "blur(30px)",
            }}
            animate={{ scale: hovered ? 1.3 : 1, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.6 }}
          />

          {/* Tech badge */}
          <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded backdrop-blur-sm"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Hover overlay arrow */}
          <motion.div
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              color: project.color,
            }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            ↗
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase block mb-2">
                {project.category} · {project.year}
              </span>
              <h3
                className="font-display font-bold text-2xl tracking-tight text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <p className="text-white/40 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Metrics */}
          <div
            className="flex gap-6 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="font-display font-bold text-lg"
                  style={{ color: project.color }}
                >
                  {m.value}
                </div>
                <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "0,212,255";
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 px-6 md:px-12">
      <div className="section-line mb-24" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <div>
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] text-electric/60 uppercase block mb-4"
            >
              Notre travail
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="font-display font-bold tracking-tighter text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              Projets
              <span className="gradient-text-plasma"> sélectionnés</span>
            </motion.h2>
          </div>

          <motion.a
            variants={fadeInUp}
            custom={0.2}
            href="#contact"
            className="btn-outline text-xs self-end md:self-auto"
          >
            Voir tout le portfolio →
          </motion.a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

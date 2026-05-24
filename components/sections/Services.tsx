"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    id: "01",
    title: "Sites Haut de Gamme",
    description:
      "Des sites web qui imposent le respect. Design Awwwards-level, animations cinématiques, performances élite.",
    icon: "◈",
    color: "#00D4FF",
    tags: ["Next.js", "Three.js", "GSAP"],
    size: "large",
  },
  {
    id: "02",
    title: "UI/UX Design",
    description:
      "Interfaces qui convertissent. Chaque pixel est intentionnel, chaque interaction est mémorable.",
    icon: "⬡",
    color: "#8B5CF6",
    tags: ["Figma", "Prototypage", "Design System"],
    size: "small",
  },
  {
    id: "03",
    title: "Développement Avancé",
    description:
      "Code propre, scalable, performant. Architecture moderne qui résiste à l'épreuve du temps.",
    icon: "◎",
    color: "#0EA5E9",
    tags: ["React", "TypeScript", "API"],
    size: "small",
  },
  {
    id: "04",
    title: "Automatisation IA",
    description:
      "Intégrez l'intelligence artificielle dans vos processus. Chatbots, automatisation, génération de contenu.",
    icon: "⬟",
    color: "#A855F7",
    tags: ["OpenAI", "LangChain", "Zapier"],
    size: "large",
  },
  {
    id: "05",
    title: "Branding Digital",
    description:
      "Identité visuelle forte, cohérente et mémorable. De l'idée à l'exécution parfaite.",
    icon: "◆",
    color: "#06B6D4",
    tags: ["Logo", "Guidelines", "Motion"],
    size: "small",
  },
  {
    id: "06",
    title: "Performance & SEO",
    description:
      "Vitesse, référencement, conversion. Votre site visible, rapide et optimisé pour le succès.",
    icon: "⬢",
    color: "#10B981",
    tags: ["Core Web Vitals", "SEO", "Analytics"],
    size: "small",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-none group ${
        service.size === "large" ? "md:col-span-2" : "md:col-span-1"
      }`}
      variants={fadeInUp}
      custom={index * 0.1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(${hexToRgb(service.color)},0.08) 0%, rgba(0,0,0,0.4) 100%)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? service.color + "40" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.4s ease",
      }}
    >
      {/* Glow orb */}
      <motion.div
        className="absolute -top-16 -right-16 rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${service.color}20 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <span
              className="font-mono text-xs tracking-widest"
              style={{ color: service.color + "80" }}
            >
              {service.id}
            </span>
            <motion.span
              className="text-3xl leading-none"
              style={{ color: service.color }}
              animate={{ rotate: hovered ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              {service.icon}
            </motion.span>
          </div>

          <h3 className="font-display font-bold text-2xl mb-3 tracking-tight text-white">
            {service.title}
          </h3>
          <p className="text-white/40 leading-relaxed text-sm">{service.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded"
              style={{
                background: `${service.color}12`,
                border: `1px solid ${service.color}25`,
                color: service.color + "90",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 font-mono text-xs"
          style={{ color: service.color }}
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : "0,212,255";
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-32 px-6 md:px-12">
      {/* Section line */}
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
            Ce que nous construisons
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="font-display font-bold tracking-tighter text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Services
            <span className="gradient-text-blue"> premium</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="mt-6 text-white/40 max-w-lg text-base leading-relaxed"
          >
            Chaque service est calibré pour un impact maximum. Nous ne faisons pas
            dans la médiocrité — uniquement l'excellence.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

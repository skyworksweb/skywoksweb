"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const offers = [
  {
    id: "01",
    featured: true,
    icon: "◈",
    color: "#00D4FF",
    title: "Site Express",
    pitch: "Un site web professionnel, rapide et optimisé mobile, pensé pour transformer vos visiteurs en contacts.",
    detail: "3 à 5 pages, prêt à accueillir votre assistant IA.",
    ideal: "Toute entreprise sans site, ou avec un site dépassé.",
    features: [
      "3 à 5 pages optimisées mobile",
      "Formulaire de contact & WhatsApp intégré",
      "SEO de base — trouvable sur Google",
      "Chargement rapide, même en 3G",
      "Compatible avec un assistant IA WEBCORE",
      "Livraison en 10 à 14 jours ouvrés",
    ],
    pricing: [
      { formula: "À partir de", price: "150 000 FCFA", includes: "3 pages, responsive, formulaire contact, hébergement 1 an" },
      { formula: "Maintenance (option)", price: "15 000 – 30 000 FCFA/mois", includes: "Mises à jour, sauvegardes, support technique" },
    ],
  },
  {
    id: "02",
    featured: false,
    icon: "◎",
    color: "#8B5CF6",
    title: "Réception 24/7",
    pitch: "Un assistant IA qui répond à chaque client sur WhatsApp, Instagram et votre site en moins d'une minute, 24h/24.",
    detail: "Il qualifie la demande et prend le rendez-vous automatiquement. Disponible en français.",
    ideal: "Cliniques, salons, écoles, restaurants, immobilier.",
    features: [
      "Réponse automatique WhatsApp & Instagram",
      "Prise de rendez-vous sans intervention humaine",
      "Qualification des demandes avant transfert",
      "Disponible 7j/7, nuits et week-ends inclus",
      "En français — adapté au contexte sénégalais",
      "Tableau de bord pour suivre les conversations",
    ],
    pricing: [
      { formula: "À partir de", price: "150 000 FCFA", includes: "Installation + configuration, 1 canal (WhatsApp ou site), FAQ + prise de RDV" },
      { formula: "Abonnement mensuel", price: "35 000 – 75 000 FCFA/mois", includes: "Maintenance, optimisations, support, conversations illimitées" },
    ],
  },
  {
    id: "03",
    featured: false,
    icon: "⬟",
    color: "#A855F7",
    title: "Leads",
    pitch: "Un système qui capte vos prospects et les relance automatiquement jusqu'au contact.",
    detail: "Fini les listes de contacts qui dorment.",
    ideal: "Immobilier, services B2B, formations, e-commerce.",
    features: [
      "Formulaire de capture optimisé pour la conversion",
      "Relances automatiques par WhatsApp ou email",
      "Scoring et priorisation des prospects chauds",
      "Intégration avec votre agenda ou CRM",
      "Suivi en temps réel — tableau de bord simple",
      "Rapport hebdomadaire des performances",
    ],
    pricing: [
      { formula: "À partir de", price: "200 000 FCFA", includes: "Mise en place du système de capture et relances automatiques" },
      { formula: "Abonnement mensuel", price: "50 000 – 100 000 FCFA/mois", includes: "Suivi, optimisations, rapport hebdomadaire des performances" },
    ],
  },
  {
    id: "04",
    featured: false,
    icon: "⬡",
    color: "#10B981",
    title: "Contenu",
    pitch: "Un flux de contenu régulier produit avec l'IA pour Instagram, TikTok et LinkedIn, calé sur votre marque.",
    detail: "Posts, visuels, vidéos — livrés chaque semaine.",
    ideal: "Coachs, commerces, restaurants, marques personnelles.",
    features: [
      "Calendrier éditorial mensuel sur mesure",
      "Posts Instagram & Facebook — texte + visuel",
      "Vidéos courtes pour TikTok & Reels",
      "Contenus LinkedIn pour les profils B2B",
      "Charte graphique respectée à chaque publication",
      "Rapport mensuel : portée, engagement, croissance",
    ],
    pricing: [
      { formula: "À partir de", price: "100 000 FCFA", includes: "Lancement, création de la charte éditoriale et des premiers contenus" },
      { formula: "Abonnement mensuel", price: "75 000 – 150 000 FCFA/mois", includes: "Flux régulier posts + visuels, jusqu'à 3 réseaux, rapport mensuel" },
    ],
  },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "0,212,255";
}

/* ──────── MODAL ──────── */
function OfferModal({
  offer,
  onClose,
}: {
  offer: (typeof offers)[0];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl z-10"
          style={{
            background: "rgba(8,8,8,0.97)",
            border: `1px solid ${offer.color}30`,
            boxShadow: `0 0 60px ${offer.color}12`,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b" style={{ borderColor: `${offer.color}15` }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] tracking-widest" style={{ color: offer.color + "60" }}>
                    OFFRE {offer.id}
                  </span>
                  <span className="text-2xl" style={{ color: offer.color }}>{offer.icon}</span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-1">
                  {offer.title}
                </h3>
                <p className="text-white/40 text-sm">{offer.pitch}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-7">
            {/* Ideal for */}
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: `rgba(${hexToRgb(offer.color)},0.06)`, border: `1px solid ${offer.color}20` }}
            >
              <span style={{ color: offer.color }} className="text-sm mt-0.5 shrink-0">★</span>
              <p className="text-sm text-white/70">
                <span className="font-semibold text-white">Idéal pour : </span>
                {offer.ideal}
              </p>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: offer.color + "80" }}>
                Ce qui est inclus
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {offer.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: offer.color }} className="mt-0.5 text-xs shrink-0">▸</span>
                    <span className="text-white/60 text-sm leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h4 className="font-mono text-[10px] tracking-widest uppercase mb-4" style={{ color: offer.color + "80" }}>
                Tarifs
              </h4>
              <div className="space-y-2">
                {offer.pricing.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{
                      background: i === 0 ? `rgba(${hexToRgb(offer.color)},0.07)` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i === 0 ? offer.color + "25" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <span className="font-display font-bold text-white text-sm">{p.formula}</span>
                      <span className="font-mono text-xs font-bold" style={{ color: offer.color }}>{p.price}</span>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">{p.includes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#cta"
              onClick={onClose}
              className="block w-full py-4 text-center font-mono text-sm tracking-widest uppercase rounded-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(${hexToRgb(offer.color)},0.15), rgba(${hexToRgb(offer.color)},0.05))`,
                border: `1px solid ${offer.color}40`,
                color: offer.color,
              }}
            >
              Réserver mon audit gratuit →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ──────── SECTION ──────── */
export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<(typeof offers)[0] | null>(null);

  const featured = offers[0];
  const rest = offers.slice(1);

  return (
    <>
      <section id="services" className="relative py-24 md:py-32 px-4 md:px-12">
        <div className="section-line mb-16 md:mb-24" />

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
              Nos offres
            </span>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Ce que WEBCORE
              <span className="gradient-text-blue"> installe pour vous</span>
            </h2>
          </motion.div>

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden cursor-pointer mb-4 group"
            onClick={() => setSelected(featured)}
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, rgba(0,0,0,0.6) 100%)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
            whileHover={{ y: -4 }}
          >
            {/* Glow top-right */}
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-40"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)", filter: "blur(30px)" }}
            />

            <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono text-[10px] tracking-widest px-2 py-0.5 rounded"
                    style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)", color: "#00D4FF" }}
                  >
                    LE PLUS POPULAIRE
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-white/30">OFFRE 01</span>
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight mb-3">
                  {featured.title}
                </h3>
                <p className="text-white/55 leading-relaxed text-sm md:text-base max-w-xl">
                  {featured.pitch}{" "}
                  <span className="text-white/30">{featured.detail}</span>
                </p>
                <p className="mt-3 font-mono text-xs text-electric/60">
                  ★ Idéal pour : {featured.ideal}
                </p>
              </div>
              <div className="shrink-0 flex md:flex-col items-center md:items-end gap-4">
                <span className="text-4xl" style={{ color: "#00D4FF" }}>{featured.icon}</span>
                <span
                  className="font-mono text-xs tracking-widest uppercase px-4 py-2.5 rounded-lg transition-all duration-300 group-hover:bg-electric/20"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
                >
                  En savoir plus →
                </span>
              </div>
            </div>
          </motion.div>

          {/* 3 remaining cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelected(offer)}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{ y: -5, borderColor: offer.color + "40" }}
              >
                <div className="p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-widest text-white/25">OFFRE {offer.id}</span>
                    <span className="text-2xl" style={{ color: offer.color }}>{offer.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white tracking-tight mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {offer.pitch}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-white/25 mt-auto pt-2">
                    ★ {offer.ideal}
                  </p>
                  <motion.span
                    className="font-mono text-xs"
                    style={{ color: offer.color }}
                    initial={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1 }}
                  >
                    En savoir plus →
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom projects — discreet mention */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="font-mono text-xs text-white/20 tracking-widest">
              Besoin d'un projet plus complexe ?{" "}
              <a
                href="#contact"
                className="text-white/35 underline underline-offset-4 hover:text-white/55 transition-colors"
              >
                Projets sur mesure — sur devis
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <OfferModal offer={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

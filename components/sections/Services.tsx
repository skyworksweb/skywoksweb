"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const services = [
  {
    id: "01",
    title: "Création de Sites Web",
    tagline: "Votre présence digitale, conçue pour convertir",
    icon: "◈",
    color: "#00D4FF",
    tags: ["Next.js", "React", "SEO"],
    size: "large",
    description:
      "WebCore conçoit des sites web performants, optimisés pour mobile et adaptés aux vitesses de connexion africaines. De la vitrine simple à la plateforme e-commerce complexe, chaque site est pensé pour votre marché et vos objectifs business.",
    features: [
      "Site vitrine / institutionnel (1 à 15 pages)",
      "E-commerce avec paiement Wave, Orange Money, carte",
      "Landing page optimisée pour la conversion",
      "Portail ou plateforme web sur mesure",
      "Refonte et modernisation de site existant",
      "SEO on-page, score Lighthouse 90+, hébergement inclus",
    ],
    pricing: [
      { formula: "Starter", price: "150 000 – 300 000 FCFA", includes: "Vitrine jusqu'à 5 pages, responsive, formulaire de contact, hébergement 1 an" },
      { formula: "Business", price: "300 000 – 600 000 FCFA", includes: "Jusqu'à 12 pages, blog, SEO, Google Analytics, support 3 mois" },
      { formula: "E-commerce", price: "600 000 – 1 500 000 FCFA", includes: "Catalogue produits, panier, paiement mobile money, tableau de bord admin" },
      { formula: "Premium", price: "Sur devis", includes: "Plateforme complexe, espace membre, API tierces, design sur mesure" },
      { formula: "Maintenance", price: "50 000 – 120 000 FCFA/mois", includes: "Mises à jour, sauvegardes, monitoring, support technique illimité" },
    ],
  },
  {
    id: "02",
    title: "SaaS Privés",
    tagline: "Vos processus métier, automatisés et scalables",
    icon: "⬡",
    color: "#8B5CF6",
    tags: ["Node.js", "React", "PostgreSQL"],
    size: "small",
    description:
      "Nous développons des applications SaaS sur mesure pour automatiser vos opérations internes, centraliser vos données et créer de la valeur durable. Ces logiciels sont hébergés sur le cloud et accessibles depuis n'importe quel appareil.",
    features: [
      "CRM — gestion clients, pipeline commercial, relances",
      "Outils RH — fiches employés, congés, paie simplifiée",
      "Logiciels de facturation et comptabilité légère",
      "Plateformes de réservation et planification",
      "Systèmes de gestion de stock et d'inventaire",
      "Tableaux de bord analytics et reporting automatisé",
    ],
    pricing: [
      { formula: "MVP", price: "500 000 – 1 200 000 FCFA", includes: "Version minimale viable, 1 module principal, hébergement 6 mois" },
      { formula: "Standard", price: "1 200 000 – 2 500 000 FCFA", includes: "2–4 modules, multi-utilisateurs, rôles, tableau de bord, support 6 mois" },
      { formula: "Avancé", price: "2 500 000 – 5 000 000 FCFA", includes: "Modules multiples, intégrations API, analytics avancés, support 12 mois" },
      { formula: "Enterprise", price: "Sur devis", includes: "Solution complète, architecture scalable, SLA garanti, équipe dédiée" },
      { formula: "Maintenance", price: "80 000 – 200 000 FCFA/mois", includes: "Hébergement, monitoring 24/7, mises à jour, support utilisateurs" },
    ],
  },
  {
    id: "03",
    title: "SaaS Publics",
    tagline: "Valorisez vos données, ouvrez-vous au grand public",
    icon: "◎",
    color: "#0EA5E9",
    tags: ["Multi-tenant", "Paiement", "API"],
    size: "small",
    description:
      "Un SaaS Public est une plateforme logicielle accessible à plusieurs clients simultanément via abonnement. WebCore conçoit et lance ces plateformes de A à Z : marketplace, plateforme de mise en relation, outil SaaS B2B multi-clients.",
    features: [
      "Architecture multi-tenant — un système, plusieurs clients",
      "Abonnement et paiement récurrent (Wave, Orange Money, Stripe)",
      "Tableau de bord admin pour gérer utilisateurs et contenus",
      "Espace utilisateur personnalisé selon le rôle",
      "API ouverte pour intégrations partenaires",
      "Scalabilité cloud — tient la montée en charge",
    ],
    pricing: [
      { formula: "MVP Public", price: "600 000 – 1 500 000 FCFA", includes: "Plateforme fonctionnelle, inscription utilisateurs, 1–2 modules core" },
      { formula: "Standard", price: "1 500 000 – 3 500 000 FCFA", includes: "Multi-rôles, paiements intégrés, tableau de bord admin, support 6 mois" },
      { formula: "Marketplace", price: "3 500 000 – 8 000 000 FCFA", includes: "Multi-vendeurs, commissions, messagerie, notation, API" },
      { formula: "Enterprise", price: "Sur devis", includes: "Architecture scalable dédiée, SLA, équipe produit, roadmap évolutive" },
      { formula: "Maintenance", price: "100 000 – 250 000 FCFA/mois", includes: "Hébergement, monitoring, mises à jour, support, évolutions mineures" },
    ],
  },
  {
    id: "04",
    title: "AI Voice Agents",
    tagline: "Accueil client 24h/24 en français et langues locales",
    icon: "⬟",
    color: "#A855F7",
    tags: ["Vapi.ai", "ElevenLabs", "Wolof"],
    size: "large",
    description:
      "Les agents vocaux IA de WebCore automatisent vos interactions téléphoniques grâce à la reconnaissance vocale et l'IA conversationnelle. Ils comprennent le français, l'anglais, le wolof et d'autres langues locales selon votre marché.",
    features: [
      "Accueil téléphonique automatisé et routage intelligent",
      "Prise de rendez-vous et gestion de planning en temps réel",
      "FAQ vocale — réponses aux questions fréquentes 24h/24",
      "Qualification de prospects et collecte d'informations",
      "Notifications et rappels vocaux automatisés",
      "Transcription et analyse des appels pour amélioration continue",
    ],
    pricing: [
      { formula: "Starter Voice", price: "200 000 – 400 000 FCFA", includes: "Agent vocal simple, FAQ + prise de RDV, 1 flux conversationnel" },
      { formula: "Business Voice", price: "400 000 – 900 000 FCFA", includes: "Jusqu'à 5 flux, intégration CRM, tableau de bord des appels, rapport mensuel" },
      { formula: "Premium Voice", price: "900 000 – 2 000 000 FCFA", includes: "Multi-langues (FR/EN/Wolof), IA personnalisée, intégrations API avancées" },
      { formula: "Enterprise", price: "Sur devis", includes: "Infrastructure dédiée, SLA, formation équipe, amélioration continue mensuelle" },
      { formula: "Maintenance", price: "70 000 – 180 000 FCFA/mois", includes: "Monitoring, optimisation des flux, mises à jour IA, support technique" },
    ],
  },
  {
    id: "05",
    title: "AI Consulting",
    tagline: "Stratégie IA sur mesure pour votre transformation digitale",
    icon: "◆",
    color: "#06B6D4",
    tags: ["Audit IA", "Roadmap", "Formation"],
    size: "small",
    description:
      "Le consulting IA de WebCore aide les dirigeants à comprendre l'intelligence artificielle, identifier les opportunités concrètes et déployer une roadmap de transformation digitale réaliste. Nos recommandations sont toujours contextualisées et actionnables.",
    features: [
      "Audit IA — évaluation de votre maturité digitale",
      "Stratégie IA — roadmap sur 12 à 36 mois avec ROI estimé",
      "Sélection technologique — recommandation des outils adaptés",
      "Formation dirigeants — ateliers IA sans jargon technique",
      "POC — déploiement rapide d'un cas d'usage pilote",
      "Cahier des charges pour appel d'offres IA",
    ],
    pricing: [
      { formula: "Audit IA", price: "150 000 – 300 000 FCFA", includes: "Diagnostic 2 jours, rapport complet, session de restitution dirigeante" },
      { formula: "Atelier IA", price: "100 000 – 200 000 FCFA", includes: "Formation demi-journée ou journée, jusqu'à 15 personnes" },
      { formula: "Stratégie IA", price: "300 000 – 700 000 FCFA", includes: "Audit + Roadmap 12-24 mois + présentation executive + 2 sessions suivi" },
      { formula: "Accompagnement", price: "120 000 – 250 000 FCFA/mois", includes: "Suivi mensuel, points stratégiques, ajustements roadmap, veille techno" },
      { formula: "POC IA", price: "400 000 – 1 500 000 FCFA", includes: "Déploiement d'un cas d'usage pilote : conception, build, mesure d'impact" },
    ],
  },
  {
    id: "06",
    title: "AI Chatbots",
    tagline: "Support client intelligent sur tous vos canaux",
    icon: "⬢",
    color: "#10B981",
    tags: ["WhatsApp", "IA", "Multi-canal"],
    size: "small",
    description:
      "Les chatbots IA de WebCore automatisent vos interactions client tout en offrant une expérience personnalisée et naturelle. Déployables sur WhatsApp, votre site web, Facebook Messenger, Telegram ou toute autre plateforme.",
    features: [
      "FAQ intelligente — réponses automatiques 24h/24",
      "Qualification et capture de leads avec transfert commercial",
      "Prise de rendez-vous intégrée avec votre agenda",
      "Suivi de commandes et statut de livraison en temps réel",
      "Escalade vers agent humain avec historique de conversation",
      "Analytics — volume, satisfaction, taux de résolution",
    ],
    pricing: [
      { formula: "Starter Bot", price: "150 000 – 300 000 FCFA", includes: "Chatbot FAQ simple, 20–50 intentions, déploiement WhatsApp ou site web" },
      { formula: "Business Bot", price: "300 000 – 700 000 FCFA", includes: "IA conversationnelle, prise de RDV, capture leads, 2 canaux, analytics" },
      { formula: "Premium Bot", price: "700 000 – 1 500 000 FCFA", includes: "Multi-canaux, intégration CRM, logique complexe, IA personnalisée" },
      { formula: "Enterprise", price: "Sur devis", includes: "Infrastructure dédiée, SLA, multi-bots, équipe de support dédiée" },
      { formula: "Maintenance", price: "50 000 – 120 000 FCFA/mois", includes: "Optimisation continue, nouvelles intentions, mises à jour IA, support" },
    ],
  },
];

function hexToRgb(hex: string): string {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}` : "0,212,255";
}

/* ──────── SERVICE MODAL ──────── */
function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof services)[0];
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
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Panel */}
        <motion.div
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl z-10"
          style={{
            background: "rgba(8,8,8,0.95)",
            border: `1px solid ${service.color}30`,
            boxShadow: `0 0 60px ${service.color}15, 0 0 120px ${service.color}08`,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="p-6 md:p-8 border-b"
            style={{ borderColor: `${service.color}15` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: service.color + "70" }}
                  >
                    {service.id}
                  </span>
                  <span className="text-2xl" style={{ color: service.color }}>
                    {service.icon}
                  </span>
                </div>
                <h3
                  className="font-display font-bold text-2xl md:text-3xl text-white mb-2 tracking-tight"
                >
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm italic">{service.tagline}</p>
              </div>
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Description */}
            <p className="text-white/60 leading-relaxed text-sm">{service.description}</p>

            {/* Features */}
            <div>
              <h4
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: service.color + "80" }}
              >
                Ce que nous livrons
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: service.color }} className="mt-0.5 text-xs shrink-0">▸</span>
                    <span className="text-white/60 text-sm leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h4
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: service.color + "80" }}
              >
                Tarifs & Formules
              </h4>
              <div className="space-y-2">
                {service.pricing.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{
                      background: i === 0
                        ? `rgba(${hexToRgb(service.color)},0.06)`
                        : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i === 0 ? service.color + "25" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <span className="font-display font-bold text-white text-sm">{p.formula}</span>
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: service.color }}
                      >
                        {p.price}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">{p.includes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={onClose}
              className="block w-full py-4 text-center font-mono text-sm tracking-widest uppercase rounded-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(${hexToRgb(service.color)},0.15), rgba(${hexToRgb(service.color)},0.05))`,
                border: `1px solid ${service.color}40`,
                color: service.color,
              }}
            >
              Démarrer ce projet →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ──────── SERVICE CARD ──────── */
function ServiceCard({
  service,
  index,
  onClick,
}: {
  service: (typeof services)[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
        service.size === "large" ? "md:col-span-2" : "md:col-span-1"
      }`}
      variants={fadeInUp}
      custom={index * 0.1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(${hexToRgb(service.color)},0.08) 0%, rgba(0,0,0,0.5) 100%)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? service.color + "40" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.4s ease",
      }}
    >
      {/* Glow */}
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

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px]">
        <div>
          <div className="flex items-start justify-between mb-5">
            <span className="font-mono text-xs tracking-widest" style={{ color: service.color + "80" }}>
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

          <h3 className="font-display font-bold text-xl md:text-2xl mb-2 tracking-tight text-white">
            {service.title}
          </h3>
          <p className="text-white/40 leading-relaxed text-sm line-clamp-2">
            {service.tagline}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded"
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
          <motion.span
            className="font-mono text-xs"
            style={{ color: service.color }}
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.5 }}
          >
            Voir les tarifs →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────── SECTION ──────── */
export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);

  return (
    <>
      <section id="services" className="relative py-24 md:py-32 px-4 md:px-12">
        <div className="section-line mb-16 md:mb-24" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={ref}
            className="mb-12 md:mb-20"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              custom={0}
              className="font-mono text-xs tracking-[0.3em] text-electric/60 uppercase block mb-4"
            >
              Nos expertises
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="font-display font-bold tracking-tighter text-white leading-none"
              style={{ fontSize: "clamp(2rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              Services
              <span className="gradient-text-blue"> IA & Digital</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="mt-6 text-white/40 max-w-lg text-sm md:text-base leading-relaxed"
            >
              6 expertises pour propulser votre business. Solutions sur mesure pour les PME
              africaines qui veulent intégrer l'IA dans leur activité.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                index={i}
                onClick={() => setSelectedService(s)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}

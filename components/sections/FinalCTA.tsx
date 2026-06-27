"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ← Remplace par ton numéro WhatsApp au format international (ex: 221771234567)
const WHATSAPP_NUMBER = "221xxxxxxxxx";
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour WEBCORE, je souhaite un audit gratuit");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative py-20 md:py-28 px-4 md:px-12">
      <div className="section-line mb-16 md:mb-20" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative" ref={ref}>
        {/* Label */}
        <motion.span
          className="font-mono text-xs tracking-[0.3em] text-electric/50 uppercase block mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Passez à l'action
        </motion.span>

        {/* Title */}
        <motion.h2
          className="font-display font-bold text-white leading-tight mb-5"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Prêt à ne plus
          <br />
          <span className="gradient-text-blue">perdre de clients ?</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-white/50 leading-relaxed mb-10"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          Réservez un audit gratuit de 30 minutes. On identifie ensemble
          vos opportunités — sans engagement.
        </motion.p>

        {/* CTA block */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* WhatsApp button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-flex items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Réserver mon appel gratuit
          </a>

          {/*
            EMPLACEMENT CALENDRIER (Cal.com / Calendly)
            Décommente et remplace l'URL quand tu as ton lien :

          <a
            href="https://cal.com/TON_LIEN"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest uppercase text-white/35 hover:text-white/60 transition-colors"
          >
            Ou choisir un créneau dans l'agenda →
          </a>
          */}
        </motion.div>

        {/* Reassurance */}
        <motion.p
          className="mt-8 font-mono text-xs text-white/20 tracking-wide"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
        >
          Gratuit · Sans engagement · Réponse sous 48h
        </motion.p>
      </div>
    </section>
  );
}

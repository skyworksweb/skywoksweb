"use client";
import { motion } from "framer-motion";
import Marquee from "@/components/ui/Marquee";

const marqueeItems = [
  "WEBCORE",
  "DIGITAL EXPERIENCES",
  "PREMIUM DESIGN",
  "NEXT.JS",
  "THREE.JS",
  "WEBGL",
  "GSAP",
  "FRAMER MOTION",
  "INNOVATION",
  "PERFORMANCE",
];

const links = {
  Services: ["Sites Haut de Gamme", "UI/UX Design", "Développement", "Automatisation IA", "Branding", "SEO & Performance"],
  Agence: ["À propos", "Projets", "Process", "Témoignages", "Blog"],
  Contact: ["hello@webcore.agency", "Démarrer un projet", "Consultation gratuite"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pt-8 pb-12 overflow-hidden">
      <div className="section-line mb-0" />

      {/* Marquee strip */}
      <div className="py-6 border-b border-white/[0.04]">
        <Marquee items={marqueeItems} speed={30} className="opacity-100" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr] gap-12 py-16 border-b border-white/[0.04]">
          {/* Brand */}
          <div>
            <div
              className="font-display text-3xl font-bold tracking-tighter mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              WEB<span className="gradient-text-blue">CORE</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Agence web premium spécialisée dans la création d'expériences digitales
              qui dominent leur marché.
            </p>
            <div className="flex gap-3">
              {["LinkedIn", "Twitter", "GitHub", "Dribbble"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-mono text-[10px] tracking-widest text-white/25 hover:text-electric/70 transition-colors duration-300 uppercase"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-mono text-[10px] tracking-[0.25em] text-white/30 uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/80 text-sm transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <span className="font-mono text-[11px] text-white/20 tracking-widest">
            © {year} WEBCORE AGENCY · TOUS DROITS RÉSERVÉS
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-[11px] text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="font-mono text-[11px] text-white/20 hover:text-white/40 tracking-widest uppercase transition-colors">
              Mentions légales
            </a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/20 tracking-widest">
              DISPONIBLE POUR NOUVEAUX PROJETS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

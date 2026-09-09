"use client";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative pt-0 pb-10 overflow-hidden">
      <div className="section-line mb-0" />

      <div className="max-w-6xl mx-auto px-4 md:px-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr] gap-10 py-14 border-b border-white/[0.05]">
          {/* Brand */}
          <div>
            <div
              className="font-display text-3xl font-bold tracking-tighter mb-4"
              style={{ letterSpacing: "-0.04em" }}
            >
              WEB<span className="gradient-text-blue">CORE</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
              Sites web et assistants IA pour les PME sénégalaises.
              On vous aide à ne plus jamais rater un client.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-widest text-white/35 hover:text-electric/70 transition-colors duration-300 uppercase flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white/75 text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.25em] text-white/25 uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:buildbywc@gmail.com"
                  className="text-white/40 hover:text-electric/70 text-sm transition-colors duration-300 break-all"
                >
                  buildbywc@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="#cta"
                  className="text-white/40 hover:text-white/75 text-sm transition-colors duration-300"
                >
                  Audit gratuit
                </a>
              </li>
              <li>
                <span className="font-mono text-[11px] text-white/20 tracking-wide">
                  Dakar, Sénégal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-7">
          <span className="font-mono text-[11px] text-white/20 tracking-widest">
            © WEBCORE 2026 · Tous droits réservés
          </span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/20 tracking-widest">
              Disponible · Dakar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

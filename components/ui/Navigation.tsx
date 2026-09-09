"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between rounded-xl px-6 py-3 transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(5,5,5,0.85)"
              : "transparent",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            backdropFilter: scrolled ? "blur(20px)" : "none",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-bold tracking-tighter select-none"
            style={{ letterSpacing: "-0.04em" }}
          >
            WEB<span className="gradient-text-blue">CORE</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors duration-300 relative group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "linear-gradient(90deg, #00D4FF, #8B5CF6)" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#cta"
              onClick={(e) => handleNavClick(e, "#cta")}
              className="btn-primary text-xs py-2.5 px-5"
            >
              Audit gratuit
            </a>
          </div>

          {/* Burger */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-none p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              className="block h-px w-6 bg-white"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />
            <motion.span
              className="block h-px w-4 bg-white"
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
            />
            <motion.span
              className="block h-px w-6 bg-white"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(30px)" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-display text-4xl font-bold tracking-tight text-white/80 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#cta"
                onClick={(e) => handleNavClick(e, "#cta")}
                className="btn-primary mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Audit gratuit
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

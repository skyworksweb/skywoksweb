"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const budgets = ["< 5 000€", "5 000 – 15 000€", "15 000 – 50 000€", "50 000€ +"];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12">
      <div className="section-line mb-24" />

      {/* Background effects */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "30vw",
          height: "30vw",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            custom={0}
            className="font-mono text-xs tracking-[0.3em] text-electric/60 uppercase block mb-4"
          >
            Prêt à dominer ?
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="font-display font-bold tracking-tighter text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.04em" }}
          >
            Construisons
            <br />
            <span className="gradient-text-blue">quelque chose</span>
            <br />
            de légendaire.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="mt-8 text-white/40 max-w-lg mx-auto leading-relaxed"
          >
            Chaque grand projet commence par une conversation. Parlez-nous de votre vision
            et on vous dira comment la rendre inoubliable.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-16 items-start">
          {/* Info column */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              {
                label: "Email",
                value: "hello@webcore.agency",
                icon: "→",
                color: "#00D4FF",
              },
              {
                label: "Réponse",
                value: "Sous 24h garanties",
                icon: "◎",
                color: "#8B5CF6",
              },
              {
                label: "Consultation",
                value: "Gratuite & sans engagement",
                icon: "◆",
                color: "#10B981",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-lg" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <div>
                  <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-white/80 text-sm font-medium">{item.value}</div>
                </div>
              </div>
            ))}

            {/* "Not just a vendor" box */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(139,92,246,0.05) 100%)",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <p className="text-white/50 text-sm leading-relaxed italic">
                "Nous ne sommes pas juste un prestataire. Nous sommes partenaires de
                votre croissance — votre succès est notre succès."
              </p>
              <div className="mt-3 font-mono text-xs text-electric/60">— L'équipe WEBCORE</div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(5,5,5,0.8) 100%)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl mb-4 text-green-400">◆</div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Message envoyé !
                </h3>
                <p className="text-white/40 text-sm">
                  Notre équipe vous contacte sous 24h. Préparez-vous à quelque chose
                  d'exceptionnel.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Nom complet"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <InputField
                  label="Entreprise / Projet"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />

                {/* Budget selector */}
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-white/30 uppercase block mb-2">
                    Budget estimé
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className="font-mono text-xs py-2.5 px-3 rounded transition-all duration-200 cursor-none"
                        style={{
                          background:
                            form.budget === b
                              ? "rgba(0,212,255,0.12)"
                              : "rgba(255,255,255,0.02)",
                          border:
                            form.budget === b
                              ? "1px solid rgba(0,212,255,0.3)"
                              : "1px solid rgba(255,255,255,0.06)",
                          color: form.budget === b ? "#00D4FF" : "rgba(255,255,255,0.35)",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-white/30 uppercase block mb-2">
                    Parlez-nous de votre projet
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none rounded-lg px-4 py-3 text-sm text-white/80 focus:outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      fontFamily: "inherit",
                    }}
                    placeholder="Décrivez votre vision, vos objectifs, votre timing..."
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.25)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.06)";
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 font-mono text-sm tracking-widest uppercase rounded-lg relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#fafafa",
                  }}
                  whileHover={{
                    boxShadow: "0 0 30px rgba(0,212,255,0.2)",
                    borderColor: "rgba(0,212,255,0.5)",
                  }}
                  whileTap={{ scale: 0.99 }}
                  disabled={sending}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        ◎
                      </motion.span>
                      Envoi en cours...
                    </span>
                  ) : (
                    "Envoyer le message →"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest text-white/30 uppercase block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg px-4 py-3 text-sm text-white/80 focus:outline-none transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          fontFamily: "inherit",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(0,212,255,0.25)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.06)";
        }}
      />
    </div>
  );
}

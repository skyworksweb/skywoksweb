"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const COMPANY_EMAIL = "buildbywc@gmail.com";

/**
 * Clé d'accès Web3Forms.
 * → À récupérer sur https://web3forms.com (gratuit, 30 secondes) :
 *   on saisit buildbywc@gmail.com, la clé arrive par email, on la colle ici.
 *
 * Cette clé n'est PAS un secret : Web3Forms la conçoit pour être publique
 * et embarquée dans le code client. Elle ne donne accès à rien d'autre
 * qu'à l'envoi d'un message vers l'adresse qui lui est associée.
 */
const WEB3FORMS_KEY: string = "11cb778c-6993-45fe-9010-8432205ade64";

const budgets = [
  "< 150 000 FCFA",
  "150 000 – 300 000 FCFA",
  "300 000 – 600 000 FCFA",
  "Je ne sais pas encore",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
    website: "", // honeypot anti-spam — jamais visible ni rempli par un humain
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [errorDetail, setErrorDetail] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    // Anti-spam : honeypot. Les robots remplissent ce champ invisible,
    // les humains jamais. On abandonne silencieusement l'envoi.
    if (form.website) {
      setSubmitted(true);
      setSending(false);
      return;
    }

    // Garde-fou : sans clé valide, on echoue explicitement plutot que
    // de laisser croire a un envoi. Le repli mail/WhatsApp reste propose.
    if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "REMPLACER_PAR_LA_CLE") {
      setError(true);
      setErrorDetail("Formulaire pas encore configuré (clé Web3Forms manquante).");
      setSending(false);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouveau projet WebCore — ${form.company || form.name}`,
          from_name: "Site WEBCORE",
          name: form.name,
          email: form.email,
          entreprise: form.company || "—",
          budget: form.budget || "Non spécifié",
          message: form.message,
          botcheck: form.website, // honeypot natif Web3Forms
        }),
      });

      // On ne se fie PAS au code HTTP seul : l'API peut repondre 200 en
      // refusant l'envoi. La verite est dans le champ `success`.
      let payload: { success?: boolean; message?: string } = {};
      try {
        payload = await res.json();
      } catch {
        /* reponse non-JSON */
      }

      if (payload.success === true) {
        setSubmitted(true);
      } else {
        setError(true);
        setErrorDetail(
          payload.message || (res.ok ? "Envoi refusé par le service." : `Code ${res.status}`)
        );
      }
    } catch (err) {
      setError(true);
      setErrorDetail(
        err instanceof TypeError
          ? "Requête bloquée par le navigateur ou réseau indisponible."
          : "Erreur inattendue."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-4 md:px-12">
      <div className="section-line mb-16 md:mb-24" />

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

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12 md:mb-20 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            custom={0}
            className="font-mono text-xs tracking-[0.3em] text-electric/60 uppercase block mb-4"
          >
            Démarrer un projet
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="font-display font-bold tracking-tighter text-white leading-none"
            style={{ fontSize: "clamp(2rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
          >
            Construisons
            <br />
            <span className="gradient-text-blue">votre vision</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={0.2}
            className="mt-6 text-white/40 max-w-lg mx-auto leading-relaxed text-sm md:text-base"
          >
            Consultation gratuite · Devis sous 48h · Aucun engagement.
            Votre business mérite des outils IA de qualité.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.6fr] gap-10 md:gap-16 items-start">
          {/* Info column */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { label: "Email", value: COMPANY_EMAIL, icon: "→", color: "#00D4FF" },
              { label: "Réponse", value: "Sous 48h garanties", icon: "◎", color: "#8B5CF6" },
              { label: "Localisation", value: "Dakar, Sénégal", icon: "◆", color: "#A855F7" },
              { label: "Consultation", value: "Gratuite & sans engagement", icon: "★", color: "#10B981" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-lg shrink-0" style={{ color: item.color }}>
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-white/80 text-sm font-medium break-all">{item.value}</div>
                </div>
              </div>
            ))}

            <div
              className="p-5 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(139,92,246,0.05))",
                border: "1px solid rgba(0,212,255,0.12)",
              }}
            >
              <p className="text-white/50 text-sm leading-relaxed italic">
                "Nous concevons des solutions technologiques sur mesure pour les PME africaines
                — sans les contraintes des grandes agences internationales."
              </p>
              <div className="mt-3 font-mono text-xs text-electric/60">— L'équipe WebCore · Dakar</div>
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
                className="flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(5,5,5,0.8))",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl mb-4 text-green-400">◆</div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Message envoyé !
                </h3>
                <p className="text-white/50 text-sm max-w-xs">
                  Notre équipe vous contacte sous 48h. Préparez-vous à transformer
                  votre business grâce à l'IA.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6 md:p-8 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
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

                {/* Honeypot anti-spam — invisible et hors du flux de tabulation.
                    Un robot le remplit, un humain ne le voit jamais. */}
                <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
                  <label htmlFor="website">Ne pas remplir ce champ</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="font-mono text-[10px] tracking-widest text-white/30 uppercase block mb-2">
                    Budget estimé (FCFA)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className="font-mono text-xs py-2.5 px-3 rounded transition-all duration-200 text-left"
                        style={{
                          background: form.budget === b
                            ? "rgba(0,212,255,0.12)"
                            : "rgba(255,255,255,0.02)",
                          border: form.budget === b
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
                    Décrivez votre projet
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full resize-none rounded-lg px-4 py-3 text-sm text-white/80 focus:outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      fontFamily: "inherit",
                    }}
                    placeholder="Votre activité, vos objectifs, vos délais..."
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.25)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; }}
                  />
                </div>

                {error && (
                  <div
                    className="rounded-lg p-4 space-y-2"
                    style={{
                      background: "rgba(248,113,113,0.06)",
                      border: "1px solid rgba(248,113,113,0.2)",
                    }}
                  >
                    <p className="text-red-400/90 text-sm">
                      L'envoi a échoué. Écrivez-nous directement :
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${COMPANY_EMAIL}`}
                        className="font-mono text-xs text-electric hover:underline break-all"
                      >
                        {COMPANY_EMAIL}
                      </a>
                      <a
                        href="#cta"
                        className="font-mono text-xs text-electric hover:underline"
                      >
                        ou via WhatsApp →
                      </a>
                    </div>
                    {errorDetail && (
                      <p className="font-mono text-[10px] text-white/25">
                        Détail technique : {errorDetail}
                      </p>
                    )}
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-4 font-mono text-sm tracking-widest uppercase rounded-xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#fafafa",
                  }}
                  whileHover={{ boxShadow: "0 0 30px rgba(0,212,255,0.2)", borderColor: "rgba(0,212,255,0.5)" }}
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

                <p className="text-white/20 text-center text-xs font-mono">
                  Consultation gratuite · Aucun engagement
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InputField({
  label, name, value, onChange, type = "text", required = false,
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
        onFocus={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.25)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; }}
      />
    </div>
  );
}

"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

import Loader from "@/components/ui/Loader";
import Navigation from "@/components/ui/Navigation";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import WhyLocal from "@/components/sections/WhyLocal";
import AISection from "@/components/sections/AISection";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const marqueeTopItems = [
  "SITES WEB",
  "ASSISTANTS IA",
  "WHATSAPP & INSTAGRAM",
  "GÉNÉRATION DE LEADS",
  "CONTENU IA",
  "RÉCEPTION 24H/24",
  "PME SÉNÉGALAISES",
  "DAKAR",
];

export default function Home() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  useLenis();

  return (
    <>
      {/* Overlay rapide — ne bloque plus le rendu du contenu */}
      <Loader visible={loaderVisible} onComplete={() => setLoaderVisible(false)} />

      <main className="relative bg-void min-h-screen">
        <CustomCursor />
        <Navigation />

        {/* Hero */}
        <Hero />

        {/* Pain Points */}
        <PainPoints />

        {/* Marquee separator */}
        <div className="py-4 overflow-hidden border-t border-b border-white/[0.04]">
          <Marquee
            items={marqueeTopItems}
            speed={20}
            className="text-white/20"
            separator="·"
          />
        </div>

        {/* Services */}
        <Services />

        {/* Pricing */}
        <Pricing />

        {/* Process */}
        <Process />

        {/* Why Local */}
        <WhyLocal />

        {/* AI Section */}
        <AISection />

        {/* Marquee separator 2 */}
        <div className="py-4 overflow-hidden border-t border-b border-white/[0.04]">
          <Marquee
            items={["AUDIT GRATUIT", "PRIX FIXE", "SANS SURPRISE", "LIVRAISON RAPIDE", "SUIVI INCLUS", "PAIEMENT WAVE"]}
            speed={18}
            direction="right"
            separator="✦"
          />
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <FinalCTA />

        {/* Contact */}
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

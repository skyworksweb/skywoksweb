"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Loader from "@/components/ui/Loader";
import Navigation from "@/components/ui/Navigation";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import AISection from "@/components/sections/AISection";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const marqueeTopItems = [
  "SITES WEB PREMIUM",
  "UI/UX DESIGN",
  "DÉVELOPPEMENT AVANCÉ",
  "AUTOMATISATION IA",
  "WEBGL",
  "THREE.JS",
  "NEXT.JS",
  "FRAMER MOTION",
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      {loaded && (
        <main
          className="relative bg-void min-h-screen"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
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

          {/* Projects */}
          <Projects />

          {/* Process */}
          <Process />

          {/* AI Section */}
          <AISection />

          {/* Marquee separator 2 */}
          <div className="py-4 overflow-hidden border-t border-b border-white/[0.04]">
            <Marquee
              items={["WE BUILD", "WE INNOVATE", "WE DOMINATE", "WE CREATE", "WE DISRUPT"]}
              speed={18}
              direction="right"
              separator="✦"
            />
          </div>

          {/* Testimonials */}
          <Testimonials />

          {/* Contact */}
          <Contact />

          {/* Footer */}
          <Footer />
        </main>
      )}
    </>
  );
}

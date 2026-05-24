"use client";
import { useEffect, useRef } from "react";

export function useLenis() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenis: any;
    let raf: number;

    const initLenis = async () => {
      const Lenis = (await import("@studio-freight/lenis")).default;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function loop(time: number) {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      }

      raf = requestAnimationFrame(loop);
    };

    initLenis();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  return lenisRef;
}

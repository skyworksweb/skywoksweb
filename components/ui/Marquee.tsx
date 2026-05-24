"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  separator?: string;
}

export default function Marquee({
  items,
  speed = 25,
  direction = "left",
  className = "",
  separator = "✦",
}: MarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display font-bold text-white/10 uppercase tracking-widest text-sm px-4">
              {item}
            </span>
            <span className="text-electric/30 text-xs">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollMarquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="flex items-center whitespace-nowrap" style={{ x }}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-display font-bold uppercase tracking-tight text-6xl md:text-8xl text-white/[0.04] px-8"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

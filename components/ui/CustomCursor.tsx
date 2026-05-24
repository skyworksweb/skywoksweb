"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringConfig = { damping: 22, stiffness: 180, mass: 0.8 };

  const dotX = useSpring(rawX, springConfig);
  const dotY = useSpring(rawY, springConfig);
  const ringX = useSpring(rawX, ringConfig);
  const ringY = useSpring(rawY, ringConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isVisible, rawX, rawY]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={cursorDot}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full"
          style={{
            width: isHovered ? 10 : 8,
            height: isHovered ? 10 : 8,
            background: "#00D4FF",
            transition: "width 0.2s, height 0.2s",
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(0, 212, 255, 0.5)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width: isHovered ? 56 : 36,
          height: isHovered ? 56 : 36,
          borderColor: isHovered
            ? "rgba(139, 92, 246, 0.7)"
            : "rgba(0, 212, 255, 0.5)",
          backgroundColor: isHovered
            ? "rgba(139, 92, 246, 0.05)"
            : "transparent",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}

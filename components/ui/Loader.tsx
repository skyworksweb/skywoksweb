"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    let current = 0;
    const steps = [
      { target: 30, speed: 40 },
      { target: 60, speed: 25 },
      { target: 85, speed: 35 },
      { target: 100, speed: 20 },
    ];

    let stepIndex = 0;
    const tick = () => {
      if (stepIndex >= steps.length) {
        setPhase("done");
        setTimeout(onComplete, 900);
        return;
      }

      const step = steps[stepIndex];
      if (current < step.target) {
        current = Math.min(current + 1, step.target);
        setProgress(current);
        setTimeout(tick, step.speed);
      } else {
        stepIndex++;
        setTimeout(tick, 100);
      }
    };

    setTimeout(tick, 300);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-overlay opacity-30" />

          {/* Glow orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              className="font-display text-5xl font-bold tracking-tighter"
              style={{ letterSpacing: "-0.04em" }}
            >
              WEB
              <span className="gradient-text-blue">CORE</span>
            </span>
            <div
              className="absolute -bottom-2 left-0 h-px"
              style={{
                width: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
              }}
            />
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Track */}
            <div className="h-px bg-white/10 w-full rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00D4FF, #8B5CF6)",
                  boxShadow: "0 0 10px rgba(0, 212, 255, 0.8)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between mt-4 items-center">
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase">
                Initializing
              </span>
              <motion.span
                className="font-mono text-xs tracking-widest"
                style={{ color: "#00D4FF" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                {progress.toString().padStart(3, "0")}%
              </motion.span>
            </div>
          </motion.div>

          {/* Status text */}
          <motion.div
            className="absolute bottom-12 font-mono text-xs text-white/20 tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress < 40
              ? "LOADING ASSETS"
              : progress < 70
              ? "INITIALIZING 3D ENGINE"
              : progress < 90
              ? "COMPILING SHADERS"
              : "READY"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

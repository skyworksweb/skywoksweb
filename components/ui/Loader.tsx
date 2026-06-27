"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({
  visible,
  onComplete,
}: {
  visible: boolean;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onComplete, 800);
    return () => clearTimeout(t);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.span
            className="font-display text-4xl font-bold tracking-tighter select-none"
            style={{ letterSpacing: "-0.04em" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            WEB<span className="gradient-text-blue">CORE</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slideInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const clipReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1, delay, ease: [0.76, 0, 0.24, 1] },
  }),
};

export const letterReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (delay = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

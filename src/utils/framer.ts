export const framerYSpring = {
  initial: { y: 100, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { type: "spring", duration: 0.5, delay: 0.3 },
  viewport: { once: true },
};

export const framerXSpring = {
  initial: { x: -100, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  transition: { type: "spring", duration: 0.5, delay: 0 },
  viewport: { once: true },
};

export const framerFadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.3, delay: 0, ease: "linear" },
  viewport: { once: true },
};

export const framerHover = {
  whileHover: { scale: 1.1, transition: { type: "spring", duration: 0.5 } },
};

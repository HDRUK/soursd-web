export const errorVariants = {
  initial: { boxShadow: "none" },
  error: {
    boxShadow: ["none", "0 0 3px 3px red", "none"],
    transition: {
      duration: 0.4,
      repeat: 3,
      repeatType: "reverse",
    },
  },
};

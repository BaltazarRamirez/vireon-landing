import { motion, useReducedMotion } from "motion/react";
import logo from "../assets/vireon-logo.svg";

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative mx-auto mb-8 flex h-28 w-full max-w-md items-center justify-center sm:mb-10 sm:h-32">
        <img
          src={logo}
          alt="Vireon"
          className="relative z-10 h-14 w-auto sm:h-16 lg:h-[4.5rem]"
        />
      </div>
    );
  }

  return (
    <div className="relative mx-auto mb-8 flex h-28 w-full max-w-md items-center justify-center sm:mb-10 sm:h-32">
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="animate-hero-aurora h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl sm:h-52 sm:w-52" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="h-px w-full max-w-xs bg-linear-to-r from-transparent via-cyan-300/40 to-transparent" />
      </motion.div>
      <motion.img
        src={logo}
        alt="Vireon"
        className="animate-hero-glow relative z-10 h-14 w-auto sm:h-16 lg:h-[4.5rem]"
        initial={{ opacity: 0, y: 24, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 14,
          delay: 0.1,
        }}
      />
    </div>
  );
}

export default HeroVisual;

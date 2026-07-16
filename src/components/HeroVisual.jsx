import { motion, useReducedMotion } from "motion/react";
import logo from "../assets/vireon-logo.svg";

function HeroVisual({ ready = true }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="relative mx-auto mb-5 flex flex-col items-center sm:mb-6">
        <img
          src={logo}
          alt="Vireon"
          className="relative z-10 h-14 w-auto sm:h-16 lg:h-[4.25rem]"
        />
        <div className="mt-4 h-px w-16 bg-linear-to-r from-transparent via-cyan-300/70 to-transparent" />
        <p className="mt-3 text-[11px] font-medium tracking-[0.3em] text-cyan-200/85 uppercase sm:text-xs">
          Desarrollo de software
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mb-5 flex flex-col items-center sm:mb-6">
      <div className="relative flex h-[4.5rem] w-full max-w-md items-center justify-center sm:h-[5rem]">
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={
            ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
          }
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="animate-hero-aurora h-28 w-28 rounded-full bg-cyan-400/25 blur-3xl sm:h-36 sm:w-36" />
        </motion.div>

        <motion.img
          src={logo}
          alt="Vireon"
          className="animate-hero-glow relative z-10 h-14 w-auto sm:h-16 lg:h-[4.25rem]"
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={
            ready
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 18, scale: 0.9 }
          }
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 15,
            delay: ready ? 0.06 : 0,
          }}
        />
      </div>

      <motion.div
        className="mt-3.5 h-px origin-center bg-linear-to-r from-transparent via-cyan-300/75 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={
          ready ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
        }
        transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "4.5rem" }}
      />

      <motion.p
        className="mt-3 text-[11px] font-medium tracking-[0.3em] text-cyan-200/85 uppercase sm:text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.28, type: "spring", stiffness: 170, damping: 18 }}
      >
        Desarrollo de software
      </motion.p>
    </div>
  );
}

export default HeroVisual;

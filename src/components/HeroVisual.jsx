import { motion, useTransform } from "motion/react";
import logo from "../assets/vireon-logo.svg";
import { easeOutExpo } from "../lib/motion";

const rings = [
  { size: "9.5rem", className: "hero-orbit-a", delay: 0.12 },
  { size: "13.5rem", className: "hero-orbit-b", delay: 0.2 },
  { size: "18rem", className: "hero-orbit-c", delay: 0.28 },
];

function HeroVisual({ play = true, rich = false, pointerX, pointerY }) {
  const tiltX = useTransform(pointerY, [-1, 1], [10, -10]);
  const tiltY = useTransform(pointerX, [-1, 1], [-12, 12]);

  return (
    <motion.div
      className="relative mx-auto mb-2 flex flex-col items-center sm:mb-3"
      style={
        rich
          ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }
          : undefined
      }
    >
      <div className="relative flex h-28 w-[18rem] items-center justify-center [perspective:900px] sm:h-32 sm:w-[22rem]">
        {rich ? (
          <>
            {rings.map((ring) => (
              <motion.div
                key={ring.size}
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: ring.size, height: ring.size }}
                initial={play ? { opacity: 0, scale: 0.82 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: ring.delay,
                  duration: 1.1,
                  ease: easeOutExpo,
                }}
              >
                <div className={`hero-orbit ${ring.className}`}>
                  <span className="hero-orbit-node" />
                </div>
              </motion.div>
            ))}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl sm:h-44 sm:w-44"
              animate={
                play
                  ? { opacity: [0.45, 0.85, 0.45], scale: [0.92, 1.08, 0.92] }
                  : undefined
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-2xl"
            aria-hidden="true"
          />
        )}

        <motion.img
          src={logo}
          alt="Vireon"
          className="relative z-10 h-14 w-auto sm:h-16 lg:h-[4.25rem]"
          initial={play ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        />
      </div>

      <motion.div
        className="relative mt-1 h-px w-16 overflow-hidden bg-white/10"
        initial={play ? { scaleX: 0, opacity: 0 } : false}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.7, ease: easeOutExpo }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/70 to-transparent"
        />
      </motion.div>

      <motion.p
        className="mt-3 text-[11px] font-medium tracking-[0.32em] text-white/45 uppercase sm:text-xs"
        initial={play ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: easeOutExpo }}
      >
        Desarrollo de software
      </motion.p>
    </motion.div>
  );
}

export default HeroVisual;

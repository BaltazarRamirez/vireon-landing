import { motion } from "motion/react";
import { useEffect, useState } from "react";
import logo from "../assets/vireon-logo.svg";

const MIN_VISIBLE_MS = 3200;
const EXIT_DURATION_MS = 900;
const MAX_WAIT_MS = 6000;

const motes = [
  { left: "18%", top: "28%", delay: 0.1, size: 2 },
  { left: "78%", top: "24%", delay: 0.35, size: 2 },
  { left: "22%", top: "72%", delay: 0.55, size: 1 },
  { left: "74%", top: "68%", delay: 0.2, size: 2 },
  { left: "50%", top: "18%", delay: 0.45, size: 1 },
  { left: "46%", top: "80%", delay: 0.65, size: 1 },
];

function PageIntro({ onFinish }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      onFinish();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let finished = false;
    let exitTimer;
    let doneTimer;
    let safetyTimer;
    const startedAt = performance.now();

    const revealTimer = window.setTimeout(() => setPhase("hold"), 140);

    const beginExit = () => {
      if (finished) {
        return;
      }
      finished = true;

      const elapsed = performance.now() - startedAt;
      const waitMore = Math.max(0, MIN_VISIBLE_MS - elapsed);

      exitTimer = window.setTimeout(() => setPhase("exit"), waitMore);
      doneTimer = window.setTimeout(
        () => onFinish(),
        waitMore + EXIT_DURATION_MS,
      );
    };

    if (document.readyState === "complete") {
      beginExit();
    } else {
      window.addEventListener("load", beginExit, { once: true });
      safetyTimer = window.setTimeout(beginExit, MAX_WAIT_MS);
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("load", beginExit);
      window.clearTimeout(revealTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-slate-950"
      initial={false}
      animate={
        phase === "exit"
          ? { opacity: 0, scale: 1.03 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: phase === "exit" ? "none" : "auto" }}
      aria-hidden={phase === "exit"}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`intro-breathe absolute top-1/2 left-1/2 h-[22rem] w-[22rem] rounded-full bg-cyan-400/20 blur-[90px] transition-opacity duration-1000 sm:h-[26rem] sm:w-[26rem] ${
            phase === "enter" ? "opacity-0" : "opacity-100"
          }`}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-blue-500/15 blur-[70px]"
          style={{ x: "-50%", y: "-50%" }}
          initial={{ opacity: 0 }}
          animate={
            phase === "hold"
              ? { opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.08, 0.95] }
              : { opacity: 0 }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className={`intro-ring absolute top-1/2 left-1/2 h-56 w-56 rounded-full border border-dashed border-cyan-300/20 transition-opacity duration-800 sm:h-64 sm:w-64 ${
            phase === "hold" ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`intro-ring-reverse absolute top-1/2 left-1/2 h-72 w-72 rounded-full border border-cyan-200/10 transition-opacity duration-1000 sm:h-80 sm:w-80 ${
            phase === "hold" ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute inset-x-0 top-[18%] h-px overflow-hidden bg-linear-to-r from-transparent via-cyan-300/35 to-transparent transition duration-1000 ${
            phase === "enter" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="intro-scan absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-cyan-200/70 to-transparent" />
        </div>
        <div
          className={`absolute inset-x-0 bottom-[18%] h-px overflow-hidden bg-linear-to-r from-transparent via-blue-400/25 to-transparent transition duration-1000 delay-100 ${
            phase === "enter" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="intro-scan absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-sky-300/50 to-transparent [animation-delay:0.8s]" />
        </div>

        {motes.map((mote) => (
          <motion.span
            key={`${mote.left}-${mote.top}`}
            className="absolute rounded-full bg-cyan-100/80"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === "hold"
                ? { opacity: [0, 0.85, 0], y: [8, -10, -22] }
                : { opacity: 0 }
            }
            transition={{
              duration: 2.6,
              delay: mote.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 22, scale: 0.9 }}
        animate={
          phase === "enter"
            ? { opacity: 0, y: 22, scale: 0.9 }
            : phase === "exit"
              ? { opacity: 0, y: -16, scale: 1.06 }
              : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <motion.img
          src={logo}
          alt="Vireon"
          className="h-12 w-auto sm:h-14"
          animate={
            phase === "hold"
              ? {
                  filter: [
                    "drop-shadow(0 0 16px rgba(34,211,238,0.2))",
                    "drop-shadow(0 0 34px rgba(34,211,238,0.48))",
                    "drop-shadow(0 0 16px rgba(34,211,238,0.2))",
                  ],
                  y: [0, -3, 0],
                }
              : {
                  filter: "drop-shadow(0 0 16px rgba(34,211,238,0.2))",
                  y: 0,
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.p
          className="mt-5 text-[10px] font-medium tracking-[0.38em] text-cyan-100/70 uppercase"
          initial={{ opacity: 0, y: 8 }}
          animate={
            phase === "hold"
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Desarrollo de software
        </motion.p>

        <div className="relative mt-6 h-px w-36 overflow-hidden rounded-full bg-white/10">
          <div
            className={`absolute inset-y-0 left-0 w-full origin-left rounded-full bg-linear-to-r from-cyan-300/40 via-cyan-200 to-cyan-300/40 ${
              phase === "hold" ? "intro-progress" : "scale-x-0"
            }`}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PageIntro;

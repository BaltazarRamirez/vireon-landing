import { useEffect, useState } from "react";
import logo from "../assets/vireon-logo.svg";

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

    const revealTimer = window.setTimeout(() => setPhase("hold"), 80);
    const exitTimer = window.setTimeout(() => setPhase("exit"), 1700);
    const doneTimer = window.setTimeout(() => onFinish(), 2450);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(revealTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-slate-950 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        phase === "exit"
          ? "pointer-events-none scale-[1.02] opacity-0"
          : "opacity-100"
      }`}
      aria-hidden={phase === "exit"}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-[100px] transition duration-1000 ${
            phase === "enter" ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <div
          className={`absolute inset-x-0 top-[18%] h-px bg-linear-to-r from-transparent via-cyan-300/40 to-transparent transition duration-1000 ${
            phase === "enter" ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-[18%] h-px bg-linear-to-r from-transparent via-blue-400/25 to-transparent transition duration-1000 delay-100 ${
            phase === "enter" ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div
        className={`relative flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          phase === "enter"
            ? "translate-y-5 scale-[0.92] opacity-0"
            : phase === "exit"
              ? "-translate-y-4 scale-105 opacity-0"
              : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        <img
          src={logo}
          alt="Vireon"
          className="h-12 w-auto drop-shadow-[0_0_28px_rgba(34,211,238,0.28)] sm:h-14"
        />
        <div
          className={`mt-7 h-px origin-center bg-linear-to-r from-transparent via-cyan-300/80 to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === "hold"
              ? "w-28 scale-x-100 opacity-100"
              : "w-28 scale-x-0 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}

export default PageIntro;

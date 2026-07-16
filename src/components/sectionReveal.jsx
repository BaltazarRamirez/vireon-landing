import { motion, useReducedMotion } from "motion/react";
import {
  introContainer,
  introItem,
  introRule,
  viewportOnce,
} from "../lib/motion";

export function SectionRevealIntro({ id, eyebrow, title, description }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div id={id || undefined} className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:mt-4 sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
        <div
          className="mt-5 h-px w-24 origin-left bg-linear-to-r from-cyan-300/70 to-transparent sm:mt-6"
          aria-hidden="true"
        />
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:mt-5 sm:text-[17px] sm:leading-8">
          {description}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      id={id || undefined}
      className="max-w-2xl"
      variants={introContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.p
        variants={introItem}
        className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={introItem}
        className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:mt-4 sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={introRule}
        className="mt-5 h-px w-24 origin-left bg-linear-to-r from-cyan-300/70 to-transparent sm:mt-6"
        aria-hidden="true"
      />
      <motion.p
        variants={introItem}
        className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:mt-5 sm:text-[17px] sm:leading-8"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export function RevealItem({
  visible,
  index = 0,
  baseDelay = 0,
  step = 70,
  children,
  className = "",
  setRef,
}) {
  return (
    <div
      ref={setRef}
      data-reveal-index={index}
      className={`reveal-card ${visible ? "is-revealed" : ""} ${className}`}
      style={{
        transitionDelay: visible ? `${baseDelay + index * step}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

import { motion, useReducedMotion } from "motion/react";
import { useRichMotion } from "../hooks/useRichMotion";
import {
  introContainer,
  introContainerLight,
  introItem,
  introItemLight,
  introRule,
  introRuleLight,
  viewportOnce,
} from "../lib/motion";

export function SectionRevealIntro({ id, eyebrow, title, description }) {
  const reduceMotion = useReducedMotion();
  const rich = useRichMotion();

  if (reduceMotion) {
    return (
      <div
        id={id || undefined}
        data-section-anchor=""
        className="max-w-2xl scroll-mt-[calc(var(--site-header-h,7.5rem)+1.75rem)]"
      >
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
      data-section-anchor=""
      className="max-w-2xl scroll-mt-[calc(var(--site-header-h,7.5rem)+1.75rem)]"
      variants={rich ? introContainer : introContainerLight}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <motion.p
        variants={rich ? introItem : introItemLight}
        className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/90"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={rich ? introItem : introItemLight}
        className="mt-3 text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:mt-4 sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={rich ? introRule : introRuleLight}
        className="mt-5 h-px w-24 origin-left bg-linear-to-r from-cyan-300/70 to-transparent sm:mt-6"
        aria-hidden="true"
      />
      <motion.p
        variants={rich ? introItem : introItemLight}
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

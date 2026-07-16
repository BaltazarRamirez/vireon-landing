import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import { useRichMotion } from "../hooks/useRichMotion";
import { useSectionReveal } from "../hooks/useReveal";
import SectionAnchor from "./SectionAnchor";
import { SectionRevealIntro } from "./sectionReveal";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const listVariantsLight = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    x: -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
      mass: 0.9,
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const stepVariantsLight = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

const stepItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  },
};

const cardVariantsRich = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    clipPath: "inset(0 10% 0 0)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
      clipPath: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

const cardVariantsLight = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProcessSection({ steps, intro }) {
  const { sectionRef, visible } = useSectionReveal();
  const reduceMotion = useReducedMotion();
  const rich = useRichMotion();
  const listRef = useRef(null);
  const fillRef = useRef(null);
  const lastProgress = useRef(-1);

  const updateProgress = useCallback(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) {
      return;
    }

    const rect = list.getBoundingClientRect();
    const viewport = window.innerHeight;
    const start = viewport * 0.78;
    const end = viewport * 0.28;
    const total = Math.max(1, rect.height + (start - end));
    const raw = (start - rect.top) / total;
    const next = Math.min(1, Math.max(0, raw));

    if (Math.abs(lastProgress.current - next) < 0.002) {
      return;
    }

    lastProgress.current = next;
    fill.style.transform = `scaleY(${next})`;
  }, []);

  useLenis(() => {
    updateProgress();
  });

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  return (
    <section
      ref={sectionRef}
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionAnchor />
      <SectionRevealIntro {...intro} visible={visible} id={undefined} />

      <div ref={listRef} className="relative mt-10 max-w-3xl sm:mt-14">
        <div
          className="absolute top-3 bottom-3 left-[15px] w-px overflow-hidden bg-white/10 sm:left-[19px]"
          aria-hidden="true"
        >
          <div
            ref={fillRef}
            className="h-full w-full origin-top bg-linear-to-b from-cyan-300 via-cyan-300/70 to-cyan-300/20"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {reduceMotion ? (
          <ol>
            {steps.map((step) => (
              <li
                key={step.title}
                className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
              >
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/50 bg-slate-950 text-[11px] font-semibold tracking-[0.08em] text-cyan-100 sm:h-10 sm:w-10 sm:text-xs">
                    {step.number}
                  </span>
                </div>
                <div className="min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-950/40 px-5 py-5 sm:px-6 sm:py-6">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400 sm:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <motion.ol
            variants={rich ? listVariants : listVariantsLight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12, margin: "0px 0px 10% 0px" }}
          >
            {steps.map((step) => (
              <motion.li
                key={step.title}
                variants={rich ? stepVariants : stepVariantsLight}
                className="relative flex gap-5 overflow-visible pb-10 last:pb-0 sm:gap-7"
              >
                <div className="relative z-10 flex shrink-0 flex-col items-center overflow-visible">
                  {rich ? (
                    <motion.span
                      variants={badgeVariants}
                      className="animate-timeline-pulse grid h-8 w-8 place-items-center rounded-full border border-cyan-300/50 bg-slate-950 text-[11px] font-semibold tracking-[0.08em] text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2)] sm:h-10 sm:w-10 sm:text-xs"
                    >
                      {step.number}
                    </motion.span>
                  ) : (
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/50 bg-slate-950 text-[11px] font-semibold tracking-[0.08em] text-cyan-100 sm:h-10 sm:w-10 sm:text-xs">
                      {step.number}
                    </span>
                  )}
                </div>

                <motion.div
                  variants={rich ? cardVariantsRich : cardVariantsLight}
                  whileTap={{ scale: 0.985 }}
                  className="group relative min-w-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 px-5 py-5 transition duration-300 sm:px-6 sm:py-6 lg:hover:-translate-y-1 lg:hover:border-cyan-200/35 lg:hover:bg-slate-950/70"
                >
                  <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_14rem)] opacity-0 transition duration-300 lg:group-hover:opacity-100" />
                  <div className="relative">
                    {rich ? (
                      <motion.h3
                        variants={stepItemVariants}
                        className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl"
                      >
                        {step.title}
                      </motion.h3>
                    ) : (
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                        {step.title}
                      </h3>
                    )}
                    {rich ? (
                      <motion.p
                        variants={stepItemVariants}
                        className="mt-2 text-sm leading-7 text-slate-400 sm:text-[15px]"
                      >
                        {step.description}
                      </motion.p>
                    ) : (
                      <p className="mt-2 text-sm leading-7 text-slate-400 sm:text-[15px]">
                        {step.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </section>
  );
}

export default ProcessSection;

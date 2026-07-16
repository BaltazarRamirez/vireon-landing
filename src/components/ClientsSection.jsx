import { motion, useReducedMotion } from "motion/react";
import { useRichMotion } from "../hooks/useRichMotion";
import { easeOutExpo, viewportOnce } from "../lib/motion";
import SectionAnchor from "./SectionAnchor";
import { SectionRevealIntro } from "./sectionReveal";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

function cardVariantsRich(index) {
  const fromLeft = index % 2 === 0;
  return {
    hidden: {
      opacity: 0,
      y: 42,
      scale: 0.9,
      rotateY: fromLeft ? -14 : 14,
      clipPath: "inset(0 0 30% 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        type: "spring",
        stiffness: 135,
        damping: 15,
        mass: 0.85,
        clipPath: { duration: 0.7, ease: easeOutExpo },
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };
}

function cardVariantsMobile(index) {
  const fromLeft = index % 2 === 0;
  return {
    hidden: {
      opacity: 0,
      y: 28,
      x: fromLeft ? -22 : 22,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: easeOutExpo,
      },
    },
  };
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.78, y: 12 },
  visible: {
    opacity: 0.85,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 190, damping: 14, delay: 0.08 },
  },
};

const logoVariantsMobile = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 0.88,
    scale: 1,
    transition: { duration: 0.55, ease: easeOutExpo, delay: 0.05 },
  },
};

const shineVariants = {
  hidden: { x: "-120%", opacity: 0 },
  visible: {
    x: "120%",
    opacity: [0, 0.55, 0],
    transition: { delay: 0.25, duration: 0.85, ease: easeOutExpo },
  },
};

function ClientsSection({ clients, intro }) {
  const reduceMotion = useReducedMotion();
  const rich = useRichMotion();

  return (
    <section
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionAnchor />
      <SectionRevealIntro {...intro} id={undefined} />

      {reduceMotion ? (
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 lg:grid-cols-4 lg:gap-4">
          {clients.map((client) => (
            <article
              key={client.id}
              className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 px-5 sm:h-52 lg:h-64 lg:px-6"
            >
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="relative max-h-20 w-auto max-w-[min(16rem,90%)] object-contain opacity-80 sm:max-h-24 lg:max-h-28 lg:max-w-[17rem]"
              />
            </article>
          ))}
        </div>
      ) : (
        <motion.div
          className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 lg:grid-cols-4 lg:gap-4"
          style={rich ? { perspective: 1100 } : undefined}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {clients.map((client, index) => (
            <motion.article
              key={client.id}
              variants={
                rich ? cardVariantsRich(index) : cardVariantsMobile(index)
              }
              whileTap={{ scale: 0.98 }}
              whileHover={
                rich
                  ? {
                      y: -6,
                      rotateY: index % 2 === 0 ? 3 : -3,
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      },
                    }
                  : undefined
              }
              className="group relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 px-5 sm:h-52 lg:h-64 lg:px-6"
              style={rich ? { transformStyle: "preserve-3d" } : undefined}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_70%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              {rich ? (
                <motion.div
                  aria-hidden="true"
                  variants={shineVariants}
                  className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/15 to-transparent"
                />
              ) : null}
              <motion.img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                variants={rich ? logoVariants : logoVariantsMobile}
                className="relative max-h-20 w-auto max-w-[min(16rem,90%)] object-contain transition duration-500 group-hover:scale-105 group-hover:opacity-100 sm:max-h-24 lg:max-h-28 lg:max-w-[17rem]"
              />
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ClientsSection;

import { motion, useReducedMotion } from "motion/react";
import { useRichMotion } from "../hooks/useRichMotion";
import { easeOutExpo, viewportOnce } from "../lib/motion";

const cardVariantsRich = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.96,
    clipPath: "inset(6% 4% 6% 4% round 1rem)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 1rem)",
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
      clipPath: { duration: 0.75, ease: easeOutExpo },
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const cardVariantsMobile = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easeOutExpo,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 18 },
  },
};

const itemVariantsMobile = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

const chipVariantsMobile = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M7.05 9.25H4.7v9.05h2.35V9.25zm-.05-3.1a1.4 1.4 0 11-2.8 0 1.4 1.4 0 012.8 0zM19.3 13.55c0-2.55-1.35-3.75-3.15-3.75-1.45 0-2.1.8-2.45 1.35V9.25h-2.35c.05.8 0 9.05 0 9.05h2.35v-5.05c0-.27.02-.54.1-.73.22-.54.72-1.1 1.56-1.1 1.1 0 1.54.84 1.54 2.07v4.81h2.4v-5.65z"
      />
    </svg>
  );
}

function FounderCard({ founder }) {
  const reduceMotion = useReducedMotion();
  const rich = useRichMotion();
  const card = rich ? cardVariantsRich : cardVariantsMobile;
  const item = rich ? itemVariants : itemVariantsMobile;
  const chips = rich ? chipVariants : chipVariantsMobile;

  if (reduceMotion) {
    return (
      <section className="relative mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8 sm:pb-6 sm:pt-10 lg:pt-12">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/55">
          <div className="relative flex flex-col items-center gap-4 px-4 py-5 sm:grid sm:grid-cols-[140px_1fr] sm:gap-0 sm:p-0 lg:grid-cols-[168px_1fr]">
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-white/10 sm:h-auto sm:min-h-[11.5rem] sm:w-full sm:rounded-none sm:border-0 sm:border-r">
            {founder.image ? (
              <img
                src={founder.image}
                alt={founder.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_18%] sm:object-top"
              />
            ) : null}
            </div>
            <div className="px-4 text-center sm:px-5 sm:py-5 sm:text-left">
              <p className="text-[10px] tracking-[0.22em] text-white/40">
                {founder.role}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">
                {founder.name}
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                &ldquo;{founder.bio}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8 sm:pb-6 sm:pt-10 lg:pt-12">
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/55"
        variants={card}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        whileTap={{ scale: 0.99 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_16rem)] opacity-70" />

        <div className="relative flex flex-col items-center gap-4 px-4 py-5 sm:grid sm:grid-cols-[140px_1fr] sm:items-stretch sm:gap-0 sm:p-0 lg:grid-cols-[168px_1fr]">
          <motion.div
            variants={item}
            className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-auto sm:min-h-[11.5rem] sm:w-full sm:rounded-none sm:border-0 sm:border-r"
          >
            {founder.image ? (
              <img
                src={founder.image}
                alt={founder.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_18%] transition duration-700 ease-out group-hover:scale-[1.03] sm:object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-neutral-900 via-black to-neutral-950">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-white/12 bg-white/8 text-sm font-semibold tracking-[0.16em] text-white">
                  {founder.initials}
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-transparent to-black/25 sm:block" />
          </motion.div>

          <div className="relative flex flex-col justify-center gap-3 text-center sm:px-5 sm:py-5 sm:text-left lg:px-6">
            <motion.div variants={item}>
              <p className="text-[10px] font-medium tracking-[0.22em] text-white/40">
                {founder.role}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                {founder.name}
              </h3>
            </motion.div>

            <motion.p
              variants={item}
              className="max-w-xl text-sm leading-6 text-slate-400"
            >
              &ldquo;{founder.bio}&rdquo;
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col items-center gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1"
            >
              {founder.phone && (
                <a
                  href={`tel:${founder.phone}`}
                  className="text-[12px] font-medium text-slate-300 transition hover:text-white"
                >
                  {founder.phoneLabel || founder.phone}
                </a>
              )}
              {founder.email && (
                <a
                  href={`mailto:${founder.email}`}
                  className="text-[12px] font-medium text-slate-300 transition hover:text-white"
                >
                  {founder.email}
                </a>
              )}
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn de Baltazar Ramirez"
                  className="inline-flex items-center justify-center transition duration-300 hover:scale-105"
                >
                  <LinkedInIcon />
                </a>
              )}
            </motion.div>

            {founder.highlights?.length > 0 ? (
              <motion.ul
                className="flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 sm:justify-start"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
                  },
                }}
              >
                {founder.highlights.map((item, index) => (
                  <motion.li
                    key={item}
                    variants={chips}
                    className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.02em] text-slate-500"
                  >
                    {index > 0 && (
                      <span
                        className="h-1 w-1 rounded-full bg-white/45"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default FounderCard;

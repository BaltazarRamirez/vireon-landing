import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useSectionReveal } from "../hooks/useReveal";
import SectionAnchor from "./SectionAnchor";
import { SectionRevealIntro } from "./sectionReveal";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariantsDesktop = {
  hidden: {
    opacity: 0,
    y: 64,
    scale: 0.9,
    rotateX: 24,
    rotateY: -6,
    clipPath: "inset(18% 0 0 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
      mass: 0.9,
      clipPath: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const cardVariantsMobile = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
};

const itemVariantsMobile = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const chipContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 18 },
  },
};

const chipVariantsMobile = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

function useFinePointer() {
  const [fine, setFine] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches
      : false,
  );

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const onChange = () => setFine(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return fine;
}

function ServiceCardBody({ service, index, chipHover, light = false }) {
  const item = light ? itemVariantsMobile : itemVariants;
  const chips = light ? chipVariantsMobile : chipVariants;

  return (
    <>
      {!light ? (
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-linear-to-r from-transparent via-cyan-300/85 to-transparent"
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-cyan-300/85 to-transparent"
        />
      )}

      <div
        className="pointer-events-none absolute -right-12 -top-14 hidden h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl transition duration-700 group-hover:bg-cyan-300/25 lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-14 hidden h-40 w-40 rounded-full bg-blue-500/12 blur-3xl lg:block"
        aria-hidden="true"
      />

      {!light ? (
        <motion.span
          aria-hidden="true"
          variants={{
            hidden: { opacity: 0, x: 16 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="pointer-events-none absolute -right-1 top-0 text-[5.75rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.045] sm:text-[7rem]"
        >
          {service.number}
        </motion.span>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 top-0 text-[5.75rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.045] sm:text-[7rem]"
        >
          {service.number}
        </span>
      )}

      <motion.div
        variants={item}
        className="relative z-10 flex items-center gap-3"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/35 bg-cyan-300/12 text-[11px] font-semibold tracking-[0.14em] text-cyan-100">
          {service.number}
        </span>
        <div className="h-px flex-1 origin-left bg-linear-to-r from-cyan-300/40 via-white/10 to-transparent" />
        <span className="text-[10px] font-medium tracking-[0.22em] text-slate-600 uppercase">
          0{index + 1}
        </span>
      </motion.div>

      <motion.div
        variants={item}
        className="relative z-10 mt-5 flex flex-1 flex-col"
      >
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-[1.4rem]">
          {service.title}
        </h3>

        <p className="mt-2.5 max-w-md text-sm leading-6 text-slate-400">
          {service.description}
        </p>

        <motion.ul
          className="mt-auto flex flex-wrap gap-2 pt-6"
          variants={chipContainerVariants}
        >
          {service.points.map((point) => (
            <motion.li
              key={point}
              variants={chips}
              whileHover={
                chipHover
                  ? {
                      y: -3,
                      backgroundColor: "rgba(34,211,238,0.14)",
                      borderColor: "rgba(165,243,252,0.35)",
                      color: "rgb(226 232 240)",
                    }
                  : undefined
              }
              className="cursor-default rounded-full border border-white/10 bg-white/[0.045] px-2.5 py-1 text-[11px] font-medium tracking-[0.02em] text-slate-400"
            >
              {point}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </>
  );
}

function DesktopServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 26 });
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${springX}px ${springY}px, rgba(34,211,238,0.2), transparent 55%)`;

  const handleMouseMove = (event) => {
    if (!cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={cardVariantsDesktop}
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -10,
        scale: 1.015,
        transition: { type: "spring", stiffness: 280, damping: 20 },
      }}
      className="group relative flex h-full min-h-[16rem] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/65 p-5 shadow-[0_22px_70px_rgba(2,6,23,0.4)] sm:min-h-[17.25rem] sm:rounded-3xl sm:p-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
        aria-hidden="true"
      />
      <ServiceCardBody service={service} index={index} chipHover />
    </motion.article>
  );
}

function MobileServiceCard({ service, index }) {
  return (
    <motion.article
      variants={cardVariantsMobile}
      whileTap={{ scale: 0.985 }}
      className="group relative flex h-full min-h-[16rem] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/65 p-5 shadow-[0_16px_48px_rgba(2,6,23,0.35)] sm:min-h-[17.25rem] sm:rounded-3xl sm:p-6"
    >
      <ServiceCardBody
        service={service}
        index={index}
        chipHover={false}
        light
      />
    </motion.article>
  );
}

function ServicesSection({ services, intro }) {
  const { sectionRef, visible } = useSectionReveal();
  const reduceMotion = useReducedMotion();
  const enhance = useFinePointer() && !reduceMotion;

  if (reduceMotion) {
    return (
      <section
        ref={sectionRef}
        id={intro?.id}
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
      >
        <SectionAnchor />
        <SectionRevealIntro {...intro} visible={visible} id={undefined} />
        <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="relative flex min-h-[16rem] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-6"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-cyan-200">
                {service.number}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {service.description}
              </p>
              <p className="mt-auto pt-6 text-[12px] text-slate-500">
                {service.points.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionAnchor />
      <SectionRevealIntro {...intro} visible={visible} id={undefined} />

      <motion.div
        className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4"
        style={enhance ? { perspective: 1400 } : undefined}
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12, margin: "0px 0px 10% 0px" }}
      >
        {services.map((service, index) =>
          enhance ? (
            <DesktopServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ) : (
            <MobileServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ),
        )}
      </motion.div>
    </section>
  );
}

export default ServicesSection;

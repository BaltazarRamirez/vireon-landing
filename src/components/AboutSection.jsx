import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { useSectionReveal } from "../hooks/useReveal";
import { SectionRevealIntro } from "./sectionReveal";

function StoryCard({ item, index, total, progress, active }) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const blend = Math.min(0.065, segment * 0.22);

  let input;
  let opacityOutput;
  let yOutput;
  let scaleOutput;

  if (index === 0) {
    input = [0, end - blend, end, 1];
    opacityOutput = [1, 1, 0, 0];
    yOutput = [0, 0, -28, -28];
    scaleOutput = [1, 1, 0.985, 0.985];
  } else if (index === total - 1) {
    input = [0, start - blend, start, 1];
    opacityOutput = [0, 0, 1, 1];
    yOutput = [28, 28, 0, 0];
    scaleOutput = [0.985, 0.985, 1, 1];
  } else {
    input = [0, start - blend, start, end - blend, end, 1];
    opacityOutput = [0, 0, 1, 1, 0, 0];
    yOutput = [28, 28, 0, 0, -28, -28];
    scaleOutput = [0.985, 0.985, 1, 1, 0.985, 0.985];
  }

  const opacity = useTransform(progress, input, opacityOutput);
  const y = useTransform(progress, input, yOutput);
  const scale = useTransform(progress, input, scaleOutput);

  return (
    <motion.article
      style={{ opacity, y, scale }}
      aria-hidden={!active}
      className={`absolute inset-0 flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-9 ${
        active ? "z-10" : "pointer-events-none z-0"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-[11px] font-semibold tracking-[0.12em] text-cyan-100 sm:h-10 sm:w-10">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">
            Principio {index + 1}
          </span>
        </div>
        <span className="text-xs tabular-nums text-slate-600">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="relative">
        <span
          className="pointer-events-none absolute -top-14 right-0 text-[5rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.035] sm:-top-20 sm:text-[7.5rem]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="relative max-w-xl text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl lg:text-[2rem]">
          {item.title}
        </h3>
        <p className="relative mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          {item.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-linear-to-r from-cyan-300/40 via-cyan-300/10 to-transparent" />
        <span className="text-[10px] font-medium tracking-[0.18em] text-slate-600 uppercase">
          Vireon
        </span>
      </div>
    </motion.article>
  );
}

function StaticAboutSection({ items, intro, visible }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionRevealIntro {...intro} visible={visible} />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"
          >
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-200">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutSection({ items, intro }) {
  const { sectionRef: revealRef, visible } = useSectionReveal();
  const sequenceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 32,
    mass: 0.25,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextIndex = Math.min(
      items.length - 1,
      Math.floor(Math.min(0.999, Math.max(0, latest)) * items.length),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  if (reducedMotion) {
    return (
      <StaticAboutSection items={items} intro={intro} visible={visible} />
    );
  }

  return (
    <section
      ref={(node) => {
        revealRef.current = node;
        sequenceRef.current = node;
      }}
      className="relative mx-auto max-w-7xl px-5 sm:px-8"
      style={{ height: `calc(100svh + ${items.length * 62}svh)` }}
    >
      <div className="sticky top-[7.5rem] flex h-[calc(100svh-7.5rem)] items-center overflow-hidden py-4 sm:top-36 sm:h-[calc(100svh-9rem)] sm:py-8">
        <div className="grid w-full gap-5 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div>
            <SectionRevealIntro {...intro} visible={visible} />

            <div className="mt-5 flex items-center gap-4 sm:mt-8">
              <div className="relative h-1 w-28 overflow-hidden rounded-full bg-white/10 sm:w-36">
                <motion.div
                  className="absolute inset-0 origin-left rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.45)]"
                  style={{ scaleX: smoothProgress }}
                />
              </div>
              <p
                className="text-[11px] font-medium tabular-nums tracking-[0.16em] text-slate-500"
                aria-live="polite"
              >
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          <div className="relative h-[clamp(14rem,38svh,22rem)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 shadow-[0_28px_90px_rgba(2,6,23,0.5)] sm:rounded-[2rem]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_22rem)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-cyan-200/50 to-transparent"
              aria-hidden="true"
            />

            {items.map((item, index) => {
              return (
                <StoryCard
                  key={item.title}
                  item={item}
                  index={index}
                  total={items.length}
                  progress={smoothProgress}
                  active={index === activeIndex}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

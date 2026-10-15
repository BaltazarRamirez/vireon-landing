import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import SectionAnchor from "./SectionAnchor";
import { SectionRevealIntro } from "./sectionReveal";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

function MobileAboutSection({ items, intro }) {
  return (
    <section
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
    >
      <SectionAnchor />
      <SectionRevealIntro {...intro} id={undefined} />

      <div data-reveal-group className="mt-8 flex flex-col gap-3 sm:mt-10">
        {items.map((item, index) => (
          <article
            key={item.title}
            data-reveal
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-5 sm:p-6"
          >
            <span className="text-[11px] font-medium tracking-[0.24em] text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StoryCard({ item, index, total, progress, active }) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const blend = Math.min(segment * 0.35, 0.12);

  let input;
  let opacityOutput;
  let yOutput;

  if (index === 0) {
    input = [0, end - blend, end, 1];
    opacityOutput = [1, 1, 0, 0];
    yOutput = [0, 0, -20, -20];
  } else if (index === total - 1) {
    input = [0, start - blend, start, 1];
    opacityOutput = [0, 0, 1, 1];
    yOutput = [20, 20, 0, 0];
  } else {
    input = [0, start - blend, start, end - blend, end, 1];
    opacityOutput = [0, 0, 1, 1, 0, 0];
    yOutput = [20, 20, 0, 0, -20, -20];
  }

  const opacity = useTransform(progress, input, opacityOutput);
  const y = useTransform(progress, input, yOutput);

  return (
    <motion.article
      style={{ opacity, y }}
      aria-hidden={!active}
      className={`absolute inset-0 flex flex-col justify-between p-7 sm:p-8 lg:p-10 ${
        active ? "z-10" : "pointer-events-none z-0"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] font-medium tracking-[0.24em] text-white/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-xs tabular-nums text-slate-600">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div>
        <h3 className="max-w-lg text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
          {item.description}
        </p>
      </div>

      <div className="h-px w-full bg-linear-to-r from-white/20 via-white/10 to-transparent" />
    </motion.article>
  );
}

function StickyAboutSection({ items, intro }) {
  const sequenceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start 144px", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(0.999, Math.max(0, latest));
    const nextIndex = Math.min(
      items.length - 1,
      Math.floor(clamped * items.length),
    );
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section
      ref={sequenceRef}
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 sm:px-8"
      style={{ height: `calc(${items.length * 100}svh)` }}
    >
      <div className="sticky top-[calc(var(--site-header-h,7.5rem)+1rem)] flex h-[calc(100svh-var(--site-header-h,7.5rem)-2.5rem)] items-center py-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-16">
          <div className="min-w-0">
            <SectionAnchor />
            <SectionRevealIntro {...intro} id={undefined} />

            <div data-reveal className="mt-8 flex items-center gap-4">
              <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-white"
                  style={{ scaleX: scrollYProgress }}
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

            <ul className="mt-6 space-y-2.5" aria-hidden="true">
              {items.map((item, index) => {
                const active = index === activeIndex;
                return (
                  <li
                    key={item.title}
                    className={`flex items-center gap-3 text-sm transition duration-300 ${
                      active ? "text-white" : "text-slate-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition duration-300 ${
                        active ? "bg-white" : "bg-slate-700"
                      }`}
                    />
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            data-reveal
            className="relative h-[min(22rem,52svh)] min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/75 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_20rem)]"
              aria-hidden="true"
            />

            {items.map((item, index) => (
              <StoryCard
                key={item.title}
                item={item}
                index={index}
                total={items.length}
                progress={scrollYProgress}
                active={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ items, intro }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  if (!isDesktop || reducedMotion) {
    return <MobileAboutSection items={items} intro={intro} />;
  }

  return <StickyAboutSection items={items} intro={intro} />;
}

export default AboutSection;

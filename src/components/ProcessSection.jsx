import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useItemReveal, useSectionReveal } from "../hooks/useReveal";
import { SectionRevealIntro } from "./sectionReveal";

function ProcessSection({ steps, intro }) {
  const { sectionRef, visible } = useSectionReveal();
  const { visibleItems, setItemRef } = useItemReveal(steps.length, {
    threshold: 0.28,
    rootMargin: "0px 0px -12% 0px",
  });
  const listRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const rect = list.getBoundingClientRect();
    const viewport = window.innerHeight;
    const start = viewport * 0.78;
    const end = viewport * 0.28;
    const total = Math.max(1, rect.height + (start - end));
    const raw = (start - rect.top) / total;
    const next = Math.min(1, Math.max(0, raw));

    setProgress((current) =>
      Math.abs(current - next) < 0.001 ? current : next,
    );
  }, []);

  // Lenis fires this every animation frame while scrolling, so the bar
  // tracks the smooth scroll instead of catching up when it stops.
  useLenis(() => {
    updateProgress();
  });

  // Fallback for reduced-motion / no Lenis, plus first paint + resize.
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
      <SectionRevealIntro {...intro} visible={visible} id={undefined} />

      <ol ref={listRef} className="relative mt-10 max-w-3xl sm:mt-14">
        <div
          className="absolute top-3 bottom-3 left-[15px] w-px overflow-hidden bg-white/10 sm:left-[19px]"
          aria-hidden="true"
        >
          <div
            className="w-full origin-top bg-linear-to-b from-cyan-300 via-cyan-300/70 to-cyan-300/20 will-change-[height]"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isVisible = visibleItems[index];

          return (
            <li
              key={step.title}
              ref={setItemRef(index)}
              data-reveal-index={index}
              className={`reveal-card-soft relative flex gap-5 pb-10 last:pb-0 sm:gap-7 ${
                isVisible ? "is-revealed" : ""
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 90}ms` : "0ms",
              }}
            >
              <div className="relative z-10 flex shrink-0 flex-col items-center">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border bg-slate-950 text-[11px] font-semibold tracking-[0.08em] transition duration-1000 sm:h-10 sm:w-10 sm:text-xs ${
                    isVisible
                      ? "animate-timeline-pulse border-cyan-300/50 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
                      : "border-white/15 text-slate-500"
                  }`}
                >
                  {step.number}
                </span>
              </div>

              <div
                className={`group relative min-w-0 flex-1 overflow-hidden rounded-3xl border px-5 py-5 transition duration-500 sm:px-6 sm:py-6 ${
                  isVisible
                    ? "border-white/10 bg-slate-950/40 hover:-translate-y-1 hover:border-cyan-200/35 hover:bg-slate-950/70"
                    : "border-white/5 bg-slate-950/20"
                }`}
              >
                <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_14rem)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400 sm:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default ProcessSection;

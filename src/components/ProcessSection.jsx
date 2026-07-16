import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return undefined;
    }

    let frame = 0;

    const updateProgress = () => {
      const rect = list.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.75;
      const end = viewport * 0.25;
      const total = rect.height + (start - end);
      const raw = (start - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionRevealIntro {...intro} visible={visible} />

      <ol ref={listRef} className="relative mt-10 max-w-3xl sm:mt-14">
        <div
          className="absolute top-3 bottom-3 left-[15px] w-px overflow-hidden bg-white/10 sm:left-[19px]"
          aria-hidden="true"
        >
          <div
            className="w-full origin-top bg-linear-to-b from-cyan-300 via-cyan-300/70 to-cyan-300/20 transition-[height] duration-500 ease-out"
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

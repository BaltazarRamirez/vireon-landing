import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef } from "react";
import SectionAnchor from "./SectionAnchor";
import { SectionRevealIntro } from "./sectionReveal";

function ProcessSection({ steps, intro }) {
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
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionAnchor />
      <SectionRevealIntro {...intro} id={undefined} />

      <div ref={listRef} className="relative mt-10 max-w-3xl sm:mt-14">
        <div
          className="absolute top-3 bottom-3 left-[15px] w-px overflow-hidden bg-white/10 sm:left-[19px]"
          aria-hidden="true"
        >
          <div
            ref={fillRef}
            className="h-full w-full origin-top bg-linear-to-b from-white via-white/40 to-white/10"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <ol data-reveal-group>
          {steps.map((step) => (
            <li
              key={step.title}
              data-reveal
              className="relative flex gap-5 pb-10 last:pb-0 sm:gap-7"
            >
              <div className="relative z-10 flex shrink-0 flex-col items-center">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black text-[11px] font-semibold tracking-[0.08em] text-white sm:h-10 sm:w-10 sm:text-xs">
                  {step.number}
                </span>
              </div>
              <div className="page-card min-w-0 flex-1 rounded-3xl border border-white/10 bg-black/40 px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-400 sm:text-[15px]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProcessSection;

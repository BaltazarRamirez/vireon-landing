import { useEffect, useRef, useState } from "react";

function ProcessTimeline({ steps }) {
  const listRef = useRef(null);
  const stepRefs = useRef([]);
  const [visibleSteps, setVisibleSteps] = useState(() =>
    steps.map(() => false),
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = Number(entry.target.dataset.index);
          setVisibleSteps((current) => {
            if (current[index]) {
              return current;
            }
            const next = [...current];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [steps]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return undefined;
    }

    const updateProgress = () => {
      const rect = list.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.75;
      const end = viewport * 0.25;
      const total = rect.height + (start - end);
      const raw = (start - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-10 max-w-3xl sm:mt-14">
      <div
        className="absolute top-3 bottom-3 left-[15px] w-px overflow-hidden bg-white/10 sm:left-[19px]"
        aria-hidden="true"
      >
        <div
          className="w-full origin-top bg-linear-to-b from-cyan-300 via-cyan-300/70 to-cyan-300/20 transition-[height] duration-300 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {steps.map((step, index) => {
        const isVisible = visibleSteps[index];

        return (
          <li
            key={step.title}
            ref={(node) => {
              stepRefs.current[index] = node;
            }}
            data-index={index}
            className={`relative flex gap-5 pb-10 last:pb-0 sm:gap-7 transition duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
          >
            <div className="relative z-10 flex shrink-0 flex-col items-center">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border bg-slate-950 text-[11px] font-semibold tracking-[0.08em] transition duration-700 sm:h-10 sm:w-10 sm:text-xs ${
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
  );
}

export default ProcessTimeline;

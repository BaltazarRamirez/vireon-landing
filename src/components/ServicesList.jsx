import { useEffect, useRef, useState } from "react";

function ServicesList({ services }) {
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState(() =>
    services.map(() => false),
  );

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean);
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
          setVisibleCards((current) => {
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
        threshold: 0.28,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [services]);

  return (
    <div className="mt-8 flex w-full flex-col gap-4 sm:mt-12">
      {services.map((service, index) => {
        const isVisible = visibleCards[index];
        const fromLeft = index % 2 === 0;

        return (
          <article
            key={service.title}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            data-index={index}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 px-5 py-6 transition duration-700 ease-out hover:border-cyan-200/40 hover:bg-slate-950/75 sm:px-7 sm:py-7 ${
              isVisible
                ? "translate-x-0 translate-y-0 opacity-100"
                : fromLeft
                  ? "-translate-x-8 translate-y-3 opacity-0"
                  : "translate-x-8 translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 60}ms` : "0ms" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_18rem)] opacity-0 transition duration-500 group-hover:opacity-100" />

            <div className="relative grid gap-5 lg:grid-cols-[88px_1.1fr_0.9fr] lg:items-center">
              <span
                className={`text-sm font-medium tracking-[0.22em] text-cyan-200/80 transition duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${120 + index * 60}ms` : "0ms",
                }}
              >
                {service.number}
              </span>

              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                {service.points.map((point, pointIndex) => (
                  <span
                    key={point}
                    className={`rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400 transition duration-500 ease-out ${
                      isVisible
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-2 scale-90 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isVisible
                        ? `${220 + index * 40 + pointIndex * 90}ms`
                        : "0ms",
                    }}
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ServicesList;

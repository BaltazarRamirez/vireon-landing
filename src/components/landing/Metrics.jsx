import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import { countUp } from "../../lib/gsap";

const METRICS = [
  { value: 10,prefix: "+", label: "Sistemas en producción", detail: "Usados todos los días" },
  { value: 1000, prefix: "+", label: "Operaciones diarias", detail: "Gestionados a empresas" },
  { value: 3, label: "Sucursales conectadas", detail: "Operando en tiempo real" },
  { value: 100, suffix: "%", label: "Desarrollo a medida", detail: "Sin plantillas genéricas" },
];

function Metrics() {
  const rootRef = useRef(null);

  useGsap(rootRef, ({ scope, gsap }) => {
    const trigger = { trigger: scope, start: "top 80%", once: true };
    gsap.from(".mt-item", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: trigger,
    });
    gsap.from(".mt-rule", {
      scaleX: 0,
      duration: 1.4,
      ease: "expo.inOut",
      stagger: 0.1,
      scrollTrigger: trigger,
    });
    scope.querySelectorAll(".mt-value").forEach((el, index) => {
      countUp(el, {
        duration: 2,
        delay: 0.2 + index * 0.1,
        scrollTrigger: trigger,
      });
    });
  });

  return (
    <section ref={rootRef} id="metricas" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <span data-section-anchor className="block h-0" />
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {METRICS.map((metric) => (
          <div key={metric.label} className="mt-item">
            <span className="mt-rule block h-px w-full origin-left bg-linear-to-r from-white/40 to-white/5" />
            <p
              className="mt-value mt-8 text-6xl font-semibold tracking-[-0.06em] text-white tabular-nums sm:text-7xl"
              data-value={metric.value}
              data-prefix={metric.prefix ?? ""}
              data-suffix={metric.suffix ?? ""}
            >
              {metric.prefix}
              {metric.value}
              {metric.suffix}
            </p>
            <p className="mt-4 text-[15px] font-medium text-zinc-200">{metric.label}</p>
            <p className="mt-1 text-[14px] text-zinc-500">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Metrics;

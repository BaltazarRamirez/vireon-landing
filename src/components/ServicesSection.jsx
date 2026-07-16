import { useItemReveal, useSectionReveal } from "../hooks/useReveal";
import {
  RevealItem,
  SectionRevealIntro,
} from "./sectionReveal";

function ServicesSection({ services, intro }) {
  const { sectionRef, visible } = useSectionReveal();
  const { visibleItems, setItemRef } = useItemReveal(services.length);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionRevealIntro {...intro} visible={visible} />

      <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
        {services.map((service, index) => (
          <RevealItem
            key={service.title}
            index={index}
            visible={visibleItems[index]}
            setRef={setItemRef(index)}
            baseDelay={0}
            step={0}
          >
            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition duration-300 hover:border-cyan-200/35 hover:bg-slate-950/80 sm:p-6">
              <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

              <div className="relative flex items-center justify-between gap-3">
                <span className="text-[11px] font-medium tracking-[0.24em] text-cyan-200/70 transition-colors duration-300 group-hover:text-cyan-200">
                  {service.number}
                </span>
                <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent transition duration-300 group-hover:from-cyan-300/40" />
              </div>

              <h3 className="relative mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
                {service.title}
              </h3>

              <p className="relative mt-2 text-sm leading-6 text-slate-400">
                {service.description}
              </p>

              <p className="relative mt-5 text-[12px] leading-5 tracking-[0.02em] text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
                {service.points.join(" · ")}
              </p>
            </article>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;

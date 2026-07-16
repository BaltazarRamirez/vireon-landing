import { useItemReveal, useSectionReveal } from "../hooks/useReveal";
import { RevealItem, SectionRevealIntro } from "./sectionReveal";

function ClientsSection({ clients, intro }) {
  const { sectionRef, visible } = useSectionReveal();
  const { visibleItems, setItemRef } = useItemReveal(clients.length, {
    threshold: 0.15,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <section
      ref={sectionRef}
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionRevealIntro {...intro} visible={visible} id={undefined} />

      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 lg:grid-cols-4 lg:gap-4">
        {clients.map((client, index) => (
          <RevealItem
            key={client.id}
            index={index}
            visible={visibleItems[index]}
            setRef={setItemRef(index)}
            baseDelay={80}
            step={0}
          >
            <article className="group relative flex h-44 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 px-5 transition duration-300 hover:border-cyan-200/30 hover:bg-slate-950/75 sm:h-52 lg:h-64 lg:px-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_70%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <img
                src={client.logo}
                alt={client.name}
                className="relative max-h-20 w-auto max-w-[min(16rem,90%)] object-contain opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100 sm:max-h-24 lg:max-h-28 lg:max-w-[17rem]"
              />
            </article>
          </RevealItem>
        ))}
      </div>
    </section>
  );
}

export default ClientsSection;

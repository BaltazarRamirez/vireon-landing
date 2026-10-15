import SectionAnchor from "./SectionAnchor";
import { SectionRevealIntro } from "./sectionReveal";

const defaultLogoClass =
  "max-h-20 max-w-[min(16rem,90%)] sm:max-h-24 lg:max-h-28 lg:max-w-[17rem]";

function ClientsSection({ clients, intro, onOpenClient }) {
  return (
    <section
      id={intro?.id}
      className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
    >
      <SectionAnchor />
      <SectionRevealIntro {...intro} id={undefined} />

      <div
        data-reveal-group
        className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 lg:grid-cols-4 lg:gap-4"
      >
        {clients.map((client) => (
          <button
            key={client.id}
            type="button"
            data-reveal
            onClick={() => onOpenClient?.(client)}
            aria-label={`Ver proyecto de ${client.name}`}
            className="page-card group relative flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/45 px-5 text-left sm:h-52 lg:h-64 lg:px-6"
          >
            <img
              src={client.logo}
              alt={client.name}
              loading="lazy"
              decoding="async"
              className={`relative w-auto object-contain opacity-80 transition duration-500 group-hover:opacity-100 ${client.logoClass || defaultLogoClass}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default ClientsSection;

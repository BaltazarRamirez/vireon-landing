import { useSectionReveal } from "../hooks/useReveal";

function FlagshipProject({ project, onOpen }) {
  const { sectionRef, visible } = useSectionReveal({
    threshold: 0.12,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
    >
      <div className={`max-w-2xl ${visible ? "reveal-copy is-revealed" : "reveal-copy"}`}>
        <p className="text-xs font-medium tracking-[0.32em] text-cyan-200/90 uppercase">
          Producto propio
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          También desarrollamos Hotelus.
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-[15px]">
          Nuestra plataforma hotelera para operar uno o muchos alojamientos
          desde un mismo sistema.
        </p>
      </div>

      <article
        className={`reveal-card group relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65 sm:mt-10 ${
          visible ? "is-revealed" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_18rem)]" />

        <div className="relative grid sm:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
          <div className="flex h-44 items-center justify-center border-b border-white/10 bg-slate-950/40 px-5 py-6 sm:h-auto sm:min-h-[12rem] sm:border-b-0 sm:border-r lg:min-h-[13rem]">
            {project.image ? (
              <img
                src={project.image}
                alt={project.name}
                className="h-auto w-full max-w-[92%] object-contain transition duration-700 group-hover:scale-105 sm:max-h-32 lg:max-h-36"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-200/30 bg-cyan-300/10 text-lg font-semibold tracking-[0.12em] text-cyan-100">
                  H
                </div>
                <p className="text-[10px] tracking-[0.18em] text-slate-500 uppercase">
                  Logo pronto
                </p>
              </div>
            )}
          </div>

          <div className="relative flex flex-col justify-center gap-3 px-4 py-5 sm:px-5 sm:py-5 lg:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                {project.badge}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                {project.category}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                {project.name}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-300">
                {project.tagline}
              </p>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              {project.description}
            </p>

            <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
              {project.highlights.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.02em] text-slate-500"
                >
                  {index > 0 && (
                    <span
                      className="h-1 w-1 rounded-full bg-cyan-300/50"
                      aria-hidden="true"
                    />
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onOpen(project)}
              className="mt-0.5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-white/10"
            >
              Ver Hotelus
              <span className="transition duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default FlagshipProject;

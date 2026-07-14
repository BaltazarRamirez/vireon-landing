function FeaturedProjectCard({ project, onOpen }) {
  return (
    <article className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 shadow-[0_18px_60px_rgba(2,6,23,0.45)] transition duration-500 hover:-translate-y-1.5 hover:border-cyan-200/50 hover:shadow-[0_24px_80px_rgba(8,145,178,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_18rem)] opacity-70 transition duration-500 group-hover:opacity-100" />

      <div className="relative grid lg:grid-cols-[240px_1fr]">
        <button
          type="button"
          onClick={onOpen}
          className="relative block h-40 w-full overflow-hidden border-b border-white/10 text-left lg:h-auto lg:min-h-0 lg:border-b-0 lg:border-r"
          aria-label={`Explorar proyecto ${project.name}`}
        >
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-slate-950/25" />
        </button>

        <div className="relative flex flex-col justify-center gap-4 p-5 sm:px-6 sm:py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-100">
                {project.category}
              </span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="mt-2.5 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
              {project.name}
            </h3>

            <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-400">
              {project.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-xs font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Explorar proyecto
            <span className="transition duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default FeaturedProjectCard;

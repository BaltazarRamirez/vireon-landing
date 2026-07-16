import { useSectionReveal } from "../hooks/useReveal";

function FounderCard({ founder }) {
  const { sectionRef, visible } = useSectionReveal({
    threshold: 0.2,
    rootMargin: "0px 0px -6% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8 sm:pb-6 sm:pt-10 lg:pt-12"
    >
      <div
        className={`reveal-card group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/55 ${
          visible ? "is-revealed" : ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_16rem)] opacity-70" />

        <div className="relative flex flex-col items-center gap-4 px-4 py-5 sm:grid sm:grid-cols-[140px_1fr] sm:items-stretch sm:gap-0 sm:p-0 lg:grid-cols-[168px_1fr]">
          <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-auto sm:min-h-[11.5rem] sm:w-full sm:rounded-none sm:border-0 sm:border-r">
            {founder.image ? (
              <img
                src={founder.image}
                alt={founder.name}
                className="h-full w-full object-cover object-[center_18%] transition duration-700 ease-out group-hover:scale-[1.03] sm:object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-900 via-slate-950 to-cyan-950/40">
                <div className="grid h-14 w-14 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-sm font-semibold tracking-[0.16em] text-cyan-100">
                  {founder.initials}
                </div>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-transparent to-slate-950/25 sm:block" />
          </div>

          <div className="relative flex flex-col justify-center gap-3 text-center sm:px-5 sm:py-5 sm:text-left lg:px-6">
            <div>
              <p className="text-[10px] font-medium tracking-[0.22em] text-cyan-200/75">
                {founder.role}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                {founder.name}
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-400">
              {founder.bio}
            </p>

            <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
              {founder.phone && (
                <a
                  href={`tel:${founder.phone}`}
                  className="text-[12px] font-medium text-slate-300 transition hover:text-cyan-200"
                >
                  {founder.phoneLabel || founder.phone}
                </a>
              )}
              {founder.email && (
                <a
                  href={`mailto:${founder.email}`}
                  className="text-[12px] font-medium text-slate-300 transition hover:text-cyan-200"
                >
                  {founder.email}
                </a>
              )}
            </div>

            {founder.highlights?.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 sm:justify-start">
                {founder.highlights.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.02em] text-slate-500"
                  >
                    {index > 0 && (
                      <span
                        className="h-1 w-1 rounded-full bg-cyan-300/45"
                        aria-hidden="true"
                      />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderCard;
